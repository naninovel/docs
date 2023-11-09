import { EncodedAsset, BuiltAsset } from "../asset";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export async function build(path: string, assets: EncodedAsset[]): Promise<BuiltAsset[]> {
    // if (type === AssetType.YouTube)
    //     return buildYouTube(title, url);
    // const source = await resolveSource(url);
    // return type === AssetType.Image
    //     ? buildImage(title, source)
    //     : buildVideo(title, source);
}

export async function buildImage(asset: EncodedAsset): Promise<string> {
    const { width, height } = getMediaSize(uri);
    return `<img class="imgit-image" loading="lazy" decoding="async" src="${uri}" alt="${title}" style="width: ${width}; height: ${height}"/>`;
}

export async function buildAnimation(asset: EncodedAsset): Promise<string> {
    return buildImage(asset);
}

export async function buildVideo(asset: EncodedAsset): Promise<string> {
    const { width, height } = getMediaSize(uri);
    const source = `<source data-src="${uri}" type="video/mp4">`;
    return `<video class="imgit-video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" style="width: ${width}; height: ${height}">${source}</video>`;
}

export async function buildYouTube(asset: EncodedAsset): Promise<string> {
    const id = asset.sourceUrl.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `<span class="imgit-youtube"><iframe title="${title}" src="${source}" allowfullscreen></iframe></span>`;
}
