export function buildImage(title: string, uri: string) {
    const { width, height } = getMediaSize(uri);
    return `<img class="imgit-image" loading="lazy" decoding="async" src="${uri}" alt="${title}" style="width: ${width}; height: ${height}"/>`;
}

export function buildVideo(_: string, uri: string) {
    const { width, height } = getMediaSize(uri);
    const source = `<source data-src="${uri}" type="video/mp4">`;
    return `<video class="imgit-video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" style="width: ${width}; height: ${height}">${source}</video>`;
}

export function buildYouTube(title: string, uri: string) {
    const id = uri.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `<span class="imgit-youtube"><iframe title="${title}" src="${source}" allowfullscreen></iframe></span>`;
}

function getMediaSize(path: string) {
    const start = path.lastIndexOf("?");
    const url = new URL("https://domain.com" + path.substring(start));
    return { width: `${url.searchParams.get("width")}px`, height: `${url.searchParams.get("height")}px` };
}
