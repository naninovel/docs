import { EncodedAsset, BuiltAsset, AssetType, AssetSize } from "../asset";
import { config } from "../config";
import path from "node:path";

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
    const src = path.join(config.build.root(asset), path.basename(asset.sourceUrl));
    const alt = asset.title ?? "";
    const style = buildStyle(asset.size);
    return `<img class="imgit-image" loading="lazy" decoding="async" src="${src}" alt="${alt}" ${style}/>`;
}

export async function buildAnimation(asset: EncodedAsset): Promise<string> {
    return buildImage(asset);
}

export async function buildVideo(asset: EncodedAsset): Promise<string> {
    const src = path.join(config.build.root(asset), path.basename(asset.sourceUrl));
    const style = buildStyle(asset.size);
    const source = `<source data-src="${src}" type="video/mp4">`;
    return `<video class="imgit-video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" ${style}>${source}</video>`;
}

export async function buildYouTube(asset: EncodedAsset): Promise<string> {
    const title = asset.title ?? "";
    const id = asset.sourceUrl.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `<span class="imgit-youtube"><iframe title="${title}" src="${source}" allowfullscreen></iframe></span>`;
}

export function buildServeRoot(asset: EncodedAsset): string {
    if (asset.sourceUrl.startsWith(config.serve))
        return asset.sourceUrl.substring(0, asset.sourceUrl.lastIndexOf("/"));
    return path.join(config.serve, config.remote);
}

function buildStyle(size: AssetSize) {
    return `style="width: ${size.width}px; height: ${size.height}px"`;
}
