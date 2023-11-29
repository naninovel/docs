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
    const info = asset.sourceInfo!;
    const threshold = asset.meta?.width ?? config.width;
    const sourcePath = asset.sourcePath!;
    const encodedPath = buildEncodedPath();
    const encoded2xPath = buildEncoded2xPath();
    const posterPath = buildPosterPath();
    if (await hasEncoded()) return { ...asset, encodedPath, encoded2xPath, posterPath };
    if (encoding.has(asset.sourceUrl)) return encoding.get(asset.sourceUrl)!;
    return encoding.set(asset.sourceUrl, encodeAsset()).get(asset.sourceUrl)!;

    function shouldEncode() {
        if (!asset.sourcePath || !asset.sourceInfo) return false;
        return asset.type === AssetType.Image && config.encode.image ||
            asset.type === AssetType.Animation && config.encode.animation ||
            asset.type === AssetType.Video && config.encode.video;
    }

    async function hasEncoded() {
        return await platform.fs.exists(encodedPath) &&
            (!encoded2xPath || await platform.fs.exists(encoded2xPath)) &&
            (!posterPath || await platform.fs.exists(posterPath));
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

    async function encodeAsset(): Promise<EncodedAsset> {
        if (!(await platform.fs.exists(encodedPath)))
            await ffmpeg(encodedPath);
        if (encoded2xPath && !(await platform.fs.exists(encoded2xPath)))
            await ffmpeg(encoded2xPath, { x2: true });
        if (posterPath && !(await platform.fs.exists(posterPath)))
            await ffmpeg(posterPath, { poster: true });
        return { ...asset, encodedPath, posterPath };
    }

    async function ffmpeg(out: string, meta?: { poster?: boolean, x2?: boolean }): Promise<void> {
        const poster = meta?.poster;
        const x2 = meta?.x2;
        const cmd = `ffmpeg ${buildArgs()}`;
        const { err } = await platform.exec(cmd);
        if (err) config.log?.err?.(`ffmpeg error: ${err}`);

        function buildArgs(): string {
            let options;
            if (asset.type === AssetType.Image) options = config.encode.image;
            else if (asset.type === AssetType.Animation) options = config.encode.animation;
            else if (asset.type === AssetType.Video) options = config.encode.video;
            else options = config.encode.poster.args;
            const map = info.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
            return `-i "${sourcePath}" ${options} ${buildFilter()} ${map} "${out}"`;
        }

        function buildFilter(): string {
            const scaling = poster || !x2 && (threshold && info.width > threshold);
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
