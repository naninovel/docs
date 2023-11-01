import { AppendIconToExternalLinks } from "./md-link";
import { Replacer } from "./md-replacer";
import { NaniScript } from "../language/language";

/** @type import("vitepress").MarkdownOptions */
export const Markdown = {
    config: installPlugins,
    languages: [NaniScript],
    theme: {
        light: "../../../docs/.vitepress/ext/language/theme-light",
        dark: "../../../docs/.vitepress/ext/language/theme-dark"
    },
    attrs: { disable: true } // https://github.com/vuejs/vitepress/issues/2440
};

/** @return import("vitepress").MarkdownRenderer */
function installPlugins(md) {
    md.disable(["image"]);
    md.use(Replacer(/\[@(\w+?)]/, buildCommandTags));
    md.use(Replacer(/!\[(.*?)]\((.+?\.(?:png|jpe?g|svg|gif).*?)\)/m, buildImageTags));
    md.use(Replacer(/!\[(.*?)]\((.+?\.mp4.*?)\)/m, buildVideoTags));
    md.use(Replacer(/!\[(.*?)]\(https:\/\/www\.youtube\.com\/watch\?v=(.+?)\)/m, buildYouTubeTags));
    md.use(AppendIconToExternalLinks);
}

/** @param {string[]} match
 *  @param import("vitepress").MarkdownEnv env */
function buildCommandTags(match, env) {
    let url = `/api/#${match[1].toLowerCase()}`;
    if (env.relativePath.startsWith("ja/")) url = "/ja" + url;
    else if (env.relativePath.startsWith("zh/")) url = "/zh" + url;
    else if (env.relativePath.startsWith("ru/")) url = "/ru" + url;
    return `<a href="${url}" target="_blank"><code>@${match[1]}</code></a>`;
}

/** @param {string[]} match */
function buildImageTags(match) {
    const size = getMediaSize(match[2]);
    return `<img class="image" loading="lazy" src="${match[2]}" alt="${match[1]}" width="${size.width}" height="${size.height}">`;
}

/** @param {string[]} match */
function buildVideoTags(match) {
    const size = getMediaSize(match[2]);
    // const source = `<source data-src="${match[2]}" type="video/mp4">`;
    const source = `<source src="${match[2]}" type="video/mp4">`;
    return `<video class="video" preload="none" loop autoplay muted playsinline poster="/assets/img/video-poster.svg" width="${size.width}" height="${size.height}">${source}</video>`;
}

/** @param {string[]} match */
function buildYouTubeTags(match) {
    const source = `https://www.youtube-nocookie.com/embed/${match[2]}`;
    return `<span class="youtube"><iframe title="yt-${match[1]}" src="${source}" allowfullscreen width="720" height="405"></iframe></span>`;
}

/** @param {string} uri */
function getMediaSize(uri) {
    const start = uri.lastIndexOf("?");
    const url = new URL("https://domain.com" + uri.substring(start));
    return { width: url.searchParams.get("width"), height: url.searchParams.get("height") };
}
