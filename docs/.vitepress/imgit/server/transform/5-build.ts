import { platform } from "../platform";
import { EncodedAsset, BuiltAsset, SourceInfo, AssetType } from "../asset";
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
    const size = buildSizes(asset.sourceInfo);
    const cls = `class="${config.style.className.video}"`;
    return `
<div data-imgit-video class="${config.style.className.container}">
    <video preload="none" loop autoplay muted playsinline ${cls} ${size}>
        ${encodedSrc ? `<source data-src="${encodedSrc}" type="video/mp4; codecs=av01.0.05M.08">` : ""}
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
<div data-imgit-youtube ${cls}>
    <iframe title="${title}" src="${source}" allowfullscreen></iframe>
</div>`;
}

function buildPicture(asset: EncodedAsset): string {
    const { src, encodedSrc, encoded2xSrc, posterSrc } = buildSources(asset);
    const alt = asset.title ?? "";
    const size = buildSizes(asset.sourceInfo);
    const cls = asset.type === AssetType.Image ? config.style.className.image : config.style.className.animation;
    const x2 = encoded2xSrc ? `, ${encoded2xSrc} 2x` : "";
    const lazy = asset.meta?.lazy === false ? "" : `loading="lazy" decoding="async"`;
    return `
<div data-imgit-picture class="${config.style.className.container}">
    <picture>
        ${encodedSrc ? `<source srcset="${encodedSrc} 1x${x2}" type="image/avif"/>` : ""}
        <img src="${src}" alt="${alt}" class="${cls}" ${size} ${lazy}/>
    </picture>
    ${posterSrc ? buildPoster(posterSrc, size) : ""}
</div>`;
}

function buildSources(asset: EncodedAsset) {
    const path = platform.path;
    const root = buildServeRoot(asset);
    const src = path.join(root, path.basename(asset.sourceUrl));
    const encodedSrc = asset.encodedPath ? path.join(root, path.basename(asset.encodedPath)) : undefined;
    const encoded2xSrc = asset.encoded2xPath ? path.join(root, path.basename(asset.encoded2xPath)) : undefined;
    const posterSrc = asset.posterPath ? path.join(root, path.basename(asset.posterPath)) : config.poster ?? undefined;
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
    return `<img src="${src}" class="${config.style.className.poster}" ${size} decoding="sync"/>`;
}
