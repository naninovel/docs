import { Plugin } from "../server";
import { BuiltAsset, ResolvedAsset } from "../server/asset";
import { Cache, cache, std, cfg } from "../server";

type YouTubeCache = Cache & {
    /** Resolved thumbnail URLs mapped by YouTube video ID. */
    youtube: Record<string, string>;
}

/** YouTube thumbnail variants; each video is supposed to have at least "0". */
const thumbs = ["maxresdefault", "mqdefault", "0"];
const playButtonSvg = `
<svg height="100%" viewBox="0 0 68 48" width="100%" class="imgit-youtube-play-button">
    <path fill="#f00" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
    <path fill="#fff" d="M 45,24 27,14 27,34"></path>
</svg>`;

/** Allows embedding YouTube videos with imgit.
 *  @example ![](https://www.youtube.com/watch?v=3SjX_X0oGxo) */
export default function (): Plugin {
    if (!cache.hasOwnProperty("youtube")) cache.youtube = {};
    return {
        resolvers: [resolve],
        builders: [build]
    };
};

async function resolve(asset: ResolvedAsset): Promise<boolean> {
    if (!isYouTube(asset.syntax.url)) return false;
    const id = getYouTubeId(asset.syntax.url);
    asset.content = { src: await resolveThumbnailUrl(id) };
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

/** Whether specified url is a valid YouTube video link. */
function isYouTube(url: string): boolean {
    return url.includes("youtube.com/watch?v=");
}

/** Given valid url to a YouTube video, extracts video ID. */
function getYouTubeId(url: string): string {
    return new URL(url).searchParams.get("v")!;
}

async function resolveThumbnailUrl(id: string): Promise<string> {
    if ((<YouTubeCache>cache).youtube.hasOwnProperty(id))
        return (<YouTubeCache>cache).youtube[id];
    let response: Response = <never>null;
    for (const variant of thumbs)
        if ((response = await std.fetch(buildThumbnailUrl(id, variant))).ok) break;
    if (!response.ok) cfg.log?.warn?.(`Failed to resolve thumbnail for "${id}" YouTube video.`);
    else (<YouTubeCache>cache).youtube[id] = response.url;
    return response.url;
}

function buildThumbnailUrl(id: string, variant: string): string {
    return `https://i.ytimg.com/vi_webp/${id}/${variant}.webp`;
}
