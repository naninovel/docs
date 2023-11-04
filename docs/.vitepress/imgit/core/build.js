const yt = "youtube.com/watch?v=";

/** Builds HTML tag for the asset with specified title and source.
 *  @param {string} title Title of the asset.
 *  @param {string} src Path to the asset file or YouTube URL.
 *  When path, expected to contain width and height URI args. */
export function buildHtml(title, src) {
    if (src.includes(yt))
        return buildYouTube(title, src.split(yt)[1]);
    switch (getFileExtension(src)) {
    case "png":
    case "jpg":
    case "jpeg":
        return buildImage(title, src);
    case "gif":
    case "mp4":
        return buildVideo(title, src);
    default:
        throw Error(`Failed to build HTML for asset: "${src}".`);
    }
}

/** @param {string} title
 *  @param {string} src */
function buildImage(title, src) {
    const { width, height } = getMediaSize(src);
    return `<img class="imgit-image" loading="lazy" src="${src}" alt="${title}" style="width: ${width}; height: ${height}">`;
}

/** @param {string} title
 *  @param {string} src */
function buildVideo(title, src) {
    const { width, height } = getMediaSize(src);
    const source = `<source data-src="${src}" type="video/mp4">`;
    return `<video class="imgit-video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" style="width: ${width}px; height: ${height}px">${source}</video>`;
}

/** @param {string} title
 *  @param {string} id */
function buildYouTube(title, id) {
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `<span class="imgit-youtube"><iframe title="${title}" src="${source}" allowfullscreen></iframe></span>`;
}

/** @param {string} path */
function getMediaSize(path) {
    const start = path.lastIndexOf("?");
    const url = new URL("https://domain.com" + path.substring(start));
    return { width: `${url.searchParams.get("width")}px`, height: `${url.searchParams.get("height")}px` };
}

/** @param {string} path */
function getFileExtension(path) {
    const start = path.lastIndexOf(".") + 1;
    const end = path.lastIndexOf("?");
    return end > start ? path.substring(start, end) : "";
}
