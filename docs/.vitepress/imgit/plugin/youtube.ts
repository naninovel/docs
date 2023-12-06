import { Plugin } from "../server";
import { BuiltAsset, ResolvedAsset } from "../server/asset";

/** Allows embedding YouTube videos with imgit.
 *  @example ![](https://www.youtube.com/watch?v=J7UwSVsiwzI) */
export default function (): Plugin {
    return {
        resolvers: [resolve],
        builders: [build]
    };
};

/** Whether specified url is a valid YouTube video link. */
function isYouTube(url: string): boolean {
    return url.includes("youtube.com/watch?v=");
}

/** Given valid url to a YouTube video, extracts video ID. */
function getYouTubeId(url: string): string {
    return new URL(url).searchParams.get("v")!;
}

function resolve(asset: ResolvedAsset): boolean {
    if (!isYouTube(asset.syntax.url)) return false;
    const id = getYouTubeId(asset.syntax.url);
    asset.poster = { src: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` };
    asset.spec = {};
    return true;
}

function build(asset: BuiltAsset): boolean {
    if (!isYouTube(asset.syntax.url)) return false;
    const id = getYouTubeId(asset.syntax.url);
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    asset.html = `
<div class="imgit-youtube" data-imgit-container>
    <iframe title="${asset.syntax.alt}" src="${source}" allowfullscreen></iframe>
</div>`;
    return true;
}
