import { ProbedAsset, EncodedAsset, AssetType, MediaInfo } from "../asset";
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
    const posterPath = buildPosterPath();
    if (await platform.fs.exists(encodedPath)) return { ...asset, encodedPath, posterPath };
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!;
    return encoding.set(asset.sourceUrl, encodeAsset()).get(asset.sourceUrl)!;

    function shouldEncode() {
        if (!asset.sourcePath || !asset.sourceInfo) return false;
        return asset.type === AssetType.Image && config.encode.image ||
            asset.type === AssetType.Animation && config.encode.animation ||
            asset.type === AssetType.Video && config.encode.video;
    }

    function buildEncodedPath() {
        const base = buildBasePath();
        if (asset.type === AssetType.Video) return `${base}.mp4`;
        return `${base}.avif`;
    }

    function buildPosterPath() {
        if (config.poster === "auto")
            return `${buildBasePath()}-poster.avif`;
        return undefined;
    }

    function buildBasePath() {
        const extIdx = asset.sourcePath!.lastIndexOf(".");
        return asset.sourcePath!.substring(0, extIdx) + config.suffix;
    }

    async function encodeAsset(): Promise<EncodedAsset> {
        const cmd = `ffmpeg ${buildArgs(asset.type, asset.sourceInfo!, asset.sourcePath!, encodedPath)}`;
        const { err } = await platform.exec(cmd);
        if (err) config.log?.err?.(`ffmpeg error: ${err}`);
        if (posterPath) await encodePoster(posterPath);
        return { ...asset, encodedPath, posterPath };
    }

    async function encodePoster(posterPath: string): Promise<void> {
        const cmd = `ffmpeg ${buildArgs("poster", asset.sourceInfo!, asset.sourcePath!, posterPath)}`;
        const { err } = await platform.exec(cmd);
        if (err) config.log?.err?.(`ffmpeg error: ${err}`);
    }
}

function buildArgs(type: AssetType | "poster", info: MediaInfo, sourcePath: string, encodedPath: string): string {
    let options;
    if (type === AssetType.Image) options = config.encode.image;
    else if (type === AssetType.Animation) options = config.encode.animation;
    else if (type === AssetType.Video) options = config.encode.video;
    else options = config.encode.poster.args;
    const map = info.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
    return `-i "${sourcePath}" ${options} ${buildFilter()} ${map} "${encodedPath}"`;

    function buildFilter(): string {
        const scale = info.width > config.width;
        const width = (scale ? config.width : info.width) * (type === "poster" ? config.encode.poster.scale : 1);
        const blur = type === "poster" && config.encode.poster.filter ? `,${config.encode.poster.filter}` : "";
        const rgb = scale ? `[0:v]scale=${width}:-1${blur}[rgb];` : `[0:v]copy${blur}[rgb];`;
        const alphaScale = scale && info.alpha ? `,scale=${width}:-1` : "";
        const alpha = info.alpha ? `[0:v]alphaextract${alphaScale}${blur}[a]` : "";
        return `-filter_complex "${rgb}${alpha}"`;
    }
}
