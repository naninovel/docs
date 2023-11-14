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
    const encodedPath = buildEncodedPath();
    if (await platform.fs.exists(encodedPath)) return { ...asset, encodedPath };
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!;
    return encoding.set(asset.sourceUrl, encodeAsset()).get(asset.sourceUrl)!;

    function shouldEncode() {
        if (!asset.sourcePath || !asset.sourceInfo) return false;
        return asset.type === AssetType.Image && config.encode.image ||
            asset.type === AssetType.Animation && config.encode.animation ||
            asset.type === AssetType.Video && config.encode.video;
    }

    function buildEncodedPath() {
        const extIdx = asset.sourcePath!.lastIndexOf(".");
        const base = asset.sourcePath!.substring(0, extIdx) + config.suffix;
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
        return `-i "${asset.sourcePath}" ${options} ${buildFilter()} ${map} "${encodedPath}"`;
    }

    function buildFilter(): string {
        const info = asset.sourceInfo!;
        const scale = config.width && info.width > config.width;
        const rgb = scale ? `[0:v]scale=${config.width}:-1[rgb];` : `[0:v]copy[rgb];`;
        const alphaScale = scale && info.alpha ? `,scale=${config.width}:-1` : "";
        const alpha = info.alpha ? `[0:v]alphaextract${alphaScale}[a]` : "";
        return `-filter_complex "${rgb}${alpha}"`;
    }
}
