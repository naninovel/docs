import { Plugin } from "../server";
import { BuiltAsset, ResolvedAsset } from "../server/asset";
import { Cache, cache, std, cfg } from "../server";

type YouTubeCache = Cache & {
    /** Resolved thumbnail URLs mapped by YouTube video ID. */
    youtube: Record<string, string>;
}

/** YouTube thumbnail variants; each video is supposed to have at least "default". */
const thumbs = ["maxresdefault", "hqdefault", "mqdefault", "sddefault", "default"];

/** Allows embedding YouTube videos with imgit.
 *  @example ![](https://www.youtube.com/watch?v=J7UwSVsiwzI) */
export default function (): Plugin {
    if (!cache.hasOwnProperty("youtube")) cache.youtube = {};
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

async function resolveThumbnailUrl(id: string): Promise<string> {
    if ((<YouTubeCache>cache).youtube.hasOwnProperty(id))
        return (<YouTubeCache>cache).youtube[id];
    let response: Response;
    for (const variant of thumbs)
        if ((response = await std.fetch(buildThumbnailUrl(id, variant))).ok) break;
    if (!response!.ok) cfg.log?.warn?.(`Failed to resolve thumbnail for "${id}" YouTube video.`);
    else (<YouTubeCache>cache).youtube[id] = response!.url;
    return response!.url;
}

function buildThumbnailUrl(id: string, variant: string): string {
    return `https://i.ytimg.com/vi_webp/${id}/${variant}.webp`;
}
