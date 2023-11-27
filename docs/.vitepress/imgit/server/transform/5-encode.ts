import { ProbedAsset, EncodedAsset, AssetType } from "../asset";
import { std, cfg, getExtension } from "../common";
import { PosterEncodeOptions } from "../config";

const compatibleExt = new Set<string>(["png", "jpg", "jpeg", "webp"]);
const encoding = new Map<string, Promise<void>>;

/** Creates optimized versions of the source asset files. */
export function encode(assets: ProbedAsset[]): Promise<EncodedAsset[]> {
    return Promise.all(assets.map(encodeDistinct));
}

async function encodeDistinct(asset: ProbedAsset): Promise<EncodedAsset> {
    if (!shouldEncode()) return asset;
    const info = asset.content!;
    const threshold = evaluateThreshold();
    const originalSourcePath = asset.contentPath!;
    const compatibleSourcePath = buildCompatibleSourcePath();
    const sourcePath = compatibleSourcePath ?? originalSourcePath;
    const encodedPath = buildEncodedPath();
    const encoded2xPath = buildEncoded2xPath();
    const posterPath = buildPosterPath();
    const encodedAsset = { ...asset, sourcePath, encodedPath, encoded2xPath, posterPath };
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!.then(() => encodedAsset);
    return encoding.set(asset.sourceUrl, encodeAsset()).get(asset.sourceUrl)!.then(() => encodedAsset);

    function shouldEncode() {
        if (!asset.contentPath || !asset.content) return false;
        return asset.type === AssetType.Image && cfg.encode.image ||
            asset.type === AssetType.Animation && cfg.encode.animation ||
            asset.type === AssetType.Video && cfg.encode.video;
    }

    function evaluateThreshold(): number | undefined {
        if (asset.spec?.width) return asset.spec.width;
        if (!cfg.width) return undefined;
        return info.width > cfg.width ? cfg.width : undefined;
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
        if (cfg.poster && cfg.encode.poster)
            return `${buildBasePath()}${cfg.encode.poster.suffix}.avif`;
        return undefined;
    }

    function buildBasePath() {
        const extIdx = sourcePath.lastIndexOf(".");
        return sourcePath.substring(0, extIdx) + cfg.encode.suffix;
    }

    async function encodeAsset(): Promise<void> {
        if (await hasEverythingEncoded()) return;
        cfg.log?.info?.(`Encoding ${asset.sourceUrl}`);
        const quality = asset.type === AssetType.Image
            ? cfg.encode.image! : asset.type === AssetType.Animation
                ? cfg.encode.animation! : cfg.encode.video!;
        if (compatibleSourcePath && (!(await std.fs.exists(compatibleSourcePath)) || asset.dirty))
            await cfg.encode.encoder.encode({
                probe: info, input: originalSourcePath,
                output: compatibleSourcePath, ...quality
            });
        if (!(await std.fs.exists(encodedPath)) || asset.dirty)
            await cfg.encode.encoder.encode({
                probe: info, input: sourcePath, output: encodedPath,
                width: threshold ?? undefined, ...quality
            });
        if (encoded2xPath && (!(await std.fs.exists(encoded2xPath)) || asset.dirty))
            await cfg.encode.encoder.encode({
                probe: info, input: sourcePath,
                output: encoded2xPath, ...quality
            });
        if (posterPath && (!(await std.fs.exists(posterPath)) || asset.dirty))
            await cfg.encode.encoder.encode({
                probe: info, input: sourcePath, output: posterPath, single: true,
                width: evalPosterWidth(cfg.encode.poster!),
                blur: cfg.encode.poster!.blur ?? undefined,
                quality: cfg.encode.poster!.quality,
                speed: cfg.encode.poster!.speed
            });
    }

    async function hasEverythingEncoded() {
        return await std.fs.exists(encodedPath) && !asset.dirty &&
            (!compatibleSourcePath || await std.fs.exists(compatibleSourcePath)) &&
            (!encoded2xPath || await std.fs.exists(encoded2xPath)) &&
            (!posterPath || await std.fs.exists(posterPath));
    }

    function evalPosterWidth(poster: PosterEncodeOptions) {
        if (!poster.scale) return undefined;
        return poster.scale * (threshold ? threshold : info.width);
    }
}
