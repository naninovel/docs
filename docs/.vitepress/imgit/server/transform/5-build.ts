import { EncodedAsset, BuiltAsset, SourceInfo, AssetType } from "../common";
import { platform } from "../platform";
import { config } from "../config";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export async function build(assets: EncodedAsset[]): Promise<BuiltAsset[]> {
    return Promise.all(assets.map(buildAsset));
}

async function buildAsset(asset: EncodedAsset): Promise<BuiltAsset> {
    let html: string;
    if (asset.type === AssetType.Image) html = await config.build.image(asset);
    else if (asset.type === AssetType.Animation) html = await config.build.animation(asset);
    else if (asset.type === AssetType.Video) html = await config.build.video(asset);
    else html = await config.build.youtube(asset);
    return { ...asset, html };
}

export async function buildImage(asset: EncodedAsset): Promise<string> {
    return buildPicture(asset);
}

export async function buildAnimation(asset: EncodedAsset): Promise<string> {
    return buildPicture(asset);
}

export async function buildVideo(asset: EncodedAsset): Promise<string> {
    const { src, encodedSrc, posterSrc } = buildSources(asset);
    const cls = `class="${config.style.className.video}"`;
    const size = buildSizes(asset.sourceInfo);
    const codec = "av01.0.04M.08"; // https://jakearchibald.com/2022/html-codecs-parameter-for-av1
    return `
<div class="${config.style.className.container}">
    <video data-imgit-lazy preload="none" loop autoplay muted playsinline ${cls} ${size}>
        ${encodedSrc ? `<source data-src="${encodedSrc}" type="video/mp4; codecs=${codec}">` : ""}
        <source data-src="${src}" type="video/mp4">
    </video>
    ${posterSrc ? buildPoster(posterSrc, size) : ""}
</div>`;
}

export async function buildYouTube(asset: EncodedAsset): Promise<string> {
    const title = asset.title ?? "";
    const cls = `class="${config.style.className.youtube}"`;
    const id = asset.sourceUrl.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `
<div ${cls}>
    <iframe title="${title}" src="${source}" allowfullscreen></iframe>
</div>`;
}

function buildPicture(asset: EncodedAsset): string {
    const { src, encodedSrc, encoded2xSrc, posterSrc } = buildSources(asset);
    const alt = asset.title ?? "";
    const size = buildSizes(asset.sourceInfo);
    const cls = asset.type === AssetType.Image ? config.style.className.image : config.style.className.animation;
    const x2 = encoded2xSrc ? `, ${encoded2xSrc} 2x` : "";
    const lazy = asset.meta?.lazy !== false;
    const load = lazy ? `loading="lazy" decoding="async"` : `decoding="sync"`;
    const data = lazy ? `data-imgit-lazy` : "";
    return `
<div class="${config.style.className.container}">
    <picture>
        ${encodedSrc ? `<source srcset="${encodedSrc} 1x${x2}" type="image/avif"/>` : ""}
        <img ${data} src="${src}" alt="${alt}" class="${cls}" ${size} ${load}/>
    </picture>
    ${lazy && posterSrc ? buildPoster(posterSrc, size) : ""}
</div>`;
}

function buildSources(asset: EncodedAsset) {
    const path = platform.path;
    const root = buildServeRoot(asset);
    const src = path.join(root, path.basename(asset.sourcePath ?? asset.sourceUrl));
    const encodedSrc = asset.encodedPath ? path.join(root, path.basename(asset.encodedPath)) : undefined;
    const encoded2xSrc = asset.encoded2xPath ? path.join(root, path.basename(asset.encoded2xPath)) : undefined;
    const posterSrc = asset.posterPath ?
        path.join(root, path.basename(asset.posterPath)) :
        (config.poster === "auto" ? undefined : config.poster);
    return { src, encodedSrc, encoded2xSrc, posterSrc };
}

function buildServeRoot(asset: EncodedAsset): string {
    if (asset.sourceUrl.startsWith(config.serve))
        return asset.sourceUrl.substring(0, asset.sourceUrl.lastIndexOf("/"));
    return platform.path.join(config.serve, config.remote);
}

function buildSizes(info?: SourceInfo): string {
    if (!info) return "";
    const mod = config.width && info.width > config.width ? config.width / info.width : 1;
    const width = Math.floor(info.width * mod);
    const height = Math.floor(info.height * mod);
    return `width="${width}" height="${height}"`;
}

function buildPoster(src: string, size: string): string {
    const cls = config.style.className.poster;
    const avif = src.endsWith(".avif");
    const blank = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    return `
<picture data-imgit-poster>
    ${avif ? `<source srcset="${src}" type="image/avif"/>` : ""}
    <img src="${avif ? blank : src}" alt="poster" class="${cls}" ${size} decoding="sync"/>
</picture>`;
}
