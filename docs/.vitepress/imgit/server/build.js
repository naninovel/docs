/** @param {string} title
 *  @param {string} uri */
export function buildImage(title, uri) {
    const { width, height } = getMediaSize(uri);
    return `<img class="imgit-image" loading="lazy" src="${uri}" alt="${title}" style="width: ${width}; height: ${height}"/>`;
}

/** @param {string} title
 *  @param {string} uri */
export function buildVideo(title, uri) {
    const { width, height } = getMediaSize(uri);
    const source = `<source data-src="${uri}" type="video/mp4">`;
    return `<video class="imgit-video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" style="width: ${width}; height: ${height}">${source}</video>`;
}

/** @param {string} title
 *  @param {string} uri */
export function buildYouTube(title, uri) {
    const id = uri.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `<span class="imgit-youtube"><iframe title="${title}" src="${source}" allowfullscreen></iframe></span>`;
}

/** @param {string} path */
function getMediaSize(path) {
    const start = path.lastIndexOf("?");
    const url = new URL("https://domain.com" + path.substring(start));
    return { width: `${url.searchParams.get("width")}px`, height: `${url.searchParams.get("height")}px` };
}
