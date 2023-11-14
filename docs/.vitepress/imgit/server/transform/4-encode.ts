import { ProbedAsset, EncodedAsset, AssetType } from "../asset";
import { config } from "../config";
import { platform } from "../platform";

const encoding = new Map<string, Promise<EncodedAsset>>;

/** Creates optimized versions of the source asset files. */
export function encode(assets: ProbedAsset[]): Promise<EncodedAsset[]> {
    return Promise.all(assets.map(encodeDistinct));
}

async function encodeDistinct(asset: ProbedAsset): Promise<EncodedAsset> {
    if (!shouldEncode()) return asset;
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!;
    const info = asset.sourceInfo!;
    const sourcePath = asset.sourcePath!;
    const encodedPath = buildEncodedPath();
    const task = encodeAsset();
    encoding.set(asset.sourceUrl, task);
    return task;

    function shouldEncode() {
        if (!asset.sourcePath || !asset.sourceInfo) return false;
        return asset.type === AssetType.Image && config.encode.image ||
            asset.type === AssetType.Animation && config.encode.animation ||
            asset.type === AssetType.Video && config.encode.video;
    }

    function buildEncodedPath() {
        const extIndex = sourcePath.lastIndexOf(".");
        const base = sourcePath.substring(0, extIndex) + config.suffix;
        if (asset.type === AssetType.Video) return `${base}.mp4`;
        return `${base}.avif`;
    }

    async function encodeAsset(): Promise<EncodedAsset> {
        const { err } = await platform.exec(`ffmpeg ${buildArgs()}`);
        if (err) config.log?.err?.(`ffmpeg error: ${err}`);
        return { ...asset, encodedPath };
    }

    function buildArgs(): string {
        const options = asset.type === AssetType.Image ? config.encode.image :
            asset.type === AssetType.Animation ? config.encode.animation : config.encode.video;
        const map = asset.sourceInfo?.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
        return `-i "${sourcePath}" ${options} ${buildFilter()} ${map} "${encodedPath}"`;
    }

    function buildFilter(): string {
        const scale = config.width && info.width > config.width;
        const rgb = scale ? `[0:v]scale=${config.width}:-1[rgb];` : `[0:v]copy[rgb];`;
        const alpha = info.alpha ? `[0:v]alphaextract[a]` : "";
        return `-filter_complex "${rgb}${alpha}"`;
    }
}
