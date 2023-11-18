import { ProbedAsset, EncodedAsset, AssetType } from "../asset";
import { config } from "../config";
import { platform } from "../platform";
import { getExtension, wait } from "../common";

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
        if (compatibleSourcePath && (!(await platform.fs.exists(compatibleSourcePath)) || asset.dirty))
            await ffmpeg(originalSourcePath, compatibleSourcePath, { noscale: true });
        if (!(await platform.fs.exists(encodedPath)) || asset.dirty)
            await ffmpeg(sourcePath, encodedPath);
        if (encoded2xPath && (!(await platform.fs.exists(encoded2xPath)) || asset.dirty))
            await ffmpeg(sourcePath, encoded2xPath, { noscale: true });
        if (posterPath && (!(await platform.fs.exists(posterPath)) || asset.dirty))
            await ffmpeg(sourcePath, posterPath, { poster: true });
    }

    async function hasEverythingEncoded() {
        return await platform.fs.exists(encodedPath) && !asset.dirty &&
            (!compatibleSourcePath || await platform.fs.exists(compatibleSourcePath)) &&
            (!encoded2xPath || await platform.fs.exists(encoded2xPath)) &&
            (!posterPath || await platform.fs.exists(posterPath));
    }

    async function ffmpeg(src: string, out: string, meta?: { poster?: boolean, noscale?: boolean }): Promise<void> {
        const poster = meta?.poster;
        const noscale = meta?.noscale;
        const cmd = `ffmpeg ${buildArgs()}`;
        const { err } = await platform.exec(cmd);
        if (err) config.log?.err?.(`ffmpeg error: ${err}`);
        await wait(0.01); // Prevent oversaturating CPU utilization.

        function buildArgs(): string {
            let options;
            if (asset.type === AssetType.Image) options = config.encode.image;
            else if (asset.type === AssetType.Animation) options = config.encode.animation;
            else if (asset.type === AssetType.Video) options = config.encode.video;
            else options = config.encode.poster.args;
            const map = info.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
            return `-i "${src}" ${options} ${buildFilter()} ${map} "${out}"`;
        }

        function buildFilter(): string {
            const scaling = poster || !noscale && (threshold && info.width > threshold);
            const scaleModifier = poster ? config.encode.poster.scale : 1;
            const scale = (scaling ? threshold ?? info.width : info.width) * scaleModifier;
            const blur = poster && config.encode.poster.filter ? `,${config.encode.poster.filter}` : "";
            const select = poster && asset.type !== AssetType.Image ? "select=eq(n\\,0)," : "";
            const rgb = scaling
                ? `[0:v]${select}scale=${scale}:-1${blur}[rgb];`
                : `[0:v]${select}copy${blur}[rgb];`;
            const alphaScale = scaling && info.alpha ? `,scale=${scale}:-1` : "";
            const alpha = info.alpha ? `[0:v]${select}alphaextract${alphaScale}${blur}[a]` : "";
            return `-filter_complex "${rgb}${alpha}"`;
        }
    }
}
