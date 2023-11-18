import { ProbedAsset, EncodedAsset, AssetType } from "../asset";
import { config } from "../config";
import { platform } from "../platform";
import { getExtension } from "../common";

const compatibleExt = new Set<string>(["png", "jpg", "jpeg", "webp"]);
const encoding = new Map<string, Promise<void>>;

/** Creates optimized versions of the source asset files. */
export function encode(assets: ProbedAsset[]): Promise<EncodedAsset[]> {
    return Promise.all(assets.map(encodeDistinct));
}

async function encodeDistinct(asset: ProbedAsset): Promise<EncodedAsset> {
    if (!shouldEncode()) return asset;
    const info = asset.sourceInfo!;
    const threshold = asset.meta?.width ?? config.width;
    const originalSourcePath = asset.sourcePath!;
    const compatibleSourcePath = buildCompatibleSourcePath();
    const sourcePath = compatibleSourcePath ?? originalSourcePath;
    const encodedPath = buildEncodedPath();
    const encoded2xPath = buildEncoded2xPath();
    const posterPath = buildPosterPath();
    const encodedAsset = { ...asset, sourcePath, encodedPath, encoded2xPath, posterPath };
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!.then(() => encodedAsset);
    return encoding.set(asset.sourceUrl, encodeAsset()).get(asset.sourceUrl)!.then(() => encodedAsset);

    function shouldEncode() {
        if (!asset.sourcePath || !asset.sourceInfo) return false;
        return asset.type === AssetType.Image && config.encode.image ||
            asset.type === AssetType.Animation && config.encode.animation ||
            asset.type === AssetType.Video && config.encode.video;
    }

    function buildCompatibleSourcePath() {
        if (asset.type !== AssetType.Image) return undefined;
        const ext = getExtension(originalSourcePath);
        if (compatibleExt.has(ext)) return undefined;
        const base = originalSourcePath.substring(0, originalSourcePath.length - ext.length);
        return base + (info.alpha ? "png" : "jpg");
    }

    function buildEncodedPath() {
        const base = buildBasePath();
        if (asset.type === AssetType.Video) return `${base}.mp4`;
        return `${base}.avif`;
    }

    function buildEncoded2xPath() {
        if (asset.type !== AssetType.Video && threshold && info.width >= threshold * 2)
            return `${buildBasePath()}-2x.avif`;
        return undefined;
    }

    function buildPosterPath() {
        if (config.poster === "auto")
            return `${buildBasePath()}-poster.avif`;
        return undefined;
    }

    function buildBasePath() {
        const extIdx = sourcePath.lastIndexOf(".");
        return sourcePath.substring(0, extIdx) + config.suffix;
    }

    async function encodeAsset(): Promise<void> {
        if (await hasEverythingEncoded()) return;
        config.log?.info?.(`Encoding ${asset.sourceUrl}`);
        const quality = asset.type === AssetType.Image
            ? config.encode.image! : asset.type === AssetType.Animation
                ? config.encode.animation! : config.encode.video!;
        if (compatibleSourcePath && (!(await platform.fs.exists(compatibleSourcePath)) || asset.dirty))
            await config.encode.encoder.encode({
                probe: info, input: originalSourcePath,
                output: compatibleSourcePath, ...quality
            });
        if (!(await platform.fs.exists(encodedPath)) || asset.dirty)
            await config.encode.encoder.encode({
                probe: info, input: sourcePath, output: encodedPath,
                width: threshold ?? undefined, ...quality
            });
        if (encoded2xPath && (!(await platform.fs.exists(encoded2xPath)) || asset.dirty))
            await config.encode.encoder.encode({
                probe: info, input: sourcePath,
                output: encoded2xPath, ...quality
            });
        if (posterPath && (!(await platform.fs.exists(posterPath)) || asset.dirty))
            await config.encode.encoder.encode({
                probe: info, input: sourcePath, output: posterPath,
                width: config.encode.poster!.scale ? config.encode.poster!.scale * info.width : undefined,
                blur: config.encode.poster!.blur ?? undefined,
                quality: config.encode.poster!.quality,
                speed: config.encode.poster!.speed
            });
    }

    async function hasEverythingEncoded() {
        return await platform.fs.exists(encodedPath) && !asset.dirty &&
            (!compatibleSourcePath || await platform.fs.exists(compatibleSourcePath)) &&
            (!encoded2xPath || await platform.fs.exists(encoded2xPath)) &&
            (!posterPath || await platform.fs.exists(posterPath));
    }
}
