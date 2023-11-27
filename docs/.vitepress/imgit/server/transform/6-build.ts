import { EncodedAsset, BuiltAsset, AssetContent, AssetType } from "../asset";
import { std, cfg, cache } from "../common";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export function build(assets: EncodedAsset[]): Promise<BuiltAsset[]> {
    return Promise.all(assets.map(buildAsset));
}

async function buildAsset(asset: EncodedAsset): Promise<BuiltAsset> {
    let html: string;
    if (asset.type === AssetType.Image) html = await cfg.build.image(asset);
    else if (asset.type === AssetType.Animation) html = await cfg.build.animation(asset);
    else if (asset.type === AssetType.Video) html = await cfg.build.video(asset);
    else html = await cfg.build.youtube(asset);
    return { ...asset, html };
}

export function buildImage(asset: EncodedAsset): Promise<string> {
    return buildPicture(asset);
}

export function buildAnimation(asset: EncodedAsset): Promise<string> {
    return buildPicture(asset);
}

export async function buildVideo(asset: EncodedAsset): Promise<string> {
    const { src, encodedSrc } = await buildSources(asset);
    const cls = `class="${cfg.build.style.className.video}"`;
    const size = buildSizes(asset.content);
    // https://jakearchibald.com/2022/html-codecs-parameter-for-av1
    const codec = "av01.0.04M.08"; // TODO: Resolve for each file in probe.
    return `
<div class="${cfg.build.style.className.container}">
    <video data-imgit preload="none" loop autoplay muted playsinline ${cls} ${size}>
        ${encodedSrc ? `<source data-src="${encodedSrc}" type="video/mp4; codecs=${codec}">` : ""}
        <source data-src="${src}" type="video/mp4">
    </video>
    ${await buildPoster(asset, size)}
</div>`;
}

export async function buildYouTube(asset: EncodedAsset): Promise<string> {
    const title = asset.title ?? "";
    const cls = `class="${cfg.build.style.className.youtube}"`;
    const id = asset.sourceUrl.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `
<div ${cls}>
    <iframe title="${title}" src="${source}" allowfullscreen></iframe>
</div>`;
}

async function buildPicture(asset: EncodedAsset): Promise<string> {
    const { src, encodedSrc, encoded2xSrc } = await buildSources(asset);
    const alt = asset.title ?? "";
    const size = buildSizes(asset.content);
    const cls = asset.type === AssetType.Image
        ? cfg.build.style.className.image
        : cfg.build.style.className.animation;
    const x2 = encoded2xSrc ? `, ${encoded2xSrc} 2x` : "";
    const lazy = asset.spec?.lazy !== false;
    const load = lazy ? `loading="lazy" decoding="async"` : `decoding="sync"`;
    return `
<div class="${cfg.build.style.className.container}">
    <picture>
        ${encodedSrc ? `<source srcset="${encodedSrc} 1x${x2}" type="image/avif"/>` : ""}
        <img data-imgit src="${src}" alt="${alt}" class="${cls}" ${size} ${load}/>
    </picture>
    ${await buildPoster(asset, size)}
</div>`;
}

async function buildSources(asset: EncodedAsset) {
    return {
        src: await serve(asset.contentPath!, asset),
        encodedSrc: asset.encodedPath && await serve(asset.encodedPath, asset),
        encoded2xSrc: asset.encoded2xPath && await serve(asset.encoded2xPath, asset)
    };
}

function serve(fullPath: string, asset: EncodedAsset): string | Promise<string> {
    const fullRoot = std.path.resolve(cfg.root);
    const relativePath = fullPath.substring(fullRoot.length + 1);
    if (cfg.serve === "auto") return `${cfg.host}/${relativePath}`;
    return cfg.serve(relativePath, asset);
}

function buildSizes(info?: AssetContent): string {
    if (!info) return "";
    const mod = cfg.width && info.width > cfg.width ? cfg.width / info.width : 1;
    const width = Math.floor(info.width * mod);
    const height = Math.floor(info.height * mod);
    return `width="${width}" height="${height}"`;
}

async function buildPoster(asset: EncodedAsset, size: string): Promise<string> {
    if (!cfg.poster) return "";
    const cls = cfg.build.style.className.poster;
    const avif = asset.encodedPosterPath
        ? await getPosterBase64(asset.sourceUrl, asset.encodedPosterPath, asset.dirty)
        : undefined;
    return `
<picture data-imgit-poster>
    ${avif ? `<source srcset="${avif}" type="image/avif"/>` : ""}
    <img src="${cfg.poster}" alt="poster" class="${cls}" ${size} decoding="sync"/>
</picture>`;
}

async function getPosterBase64(src: string, path: string, dirty?: boolean): Promise<string> {
    const data = !dirty && cache.posters.hasOwnProperty(src)
        ? cache.posters[src]
        : cache.posters[src] = await std.base64(await std.fs.read(path, "bin"));
    return `data:image/avif;base64,${data}`;
}
