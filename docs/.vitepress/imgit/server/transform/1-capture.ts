import { CapturedAsset, AssetType, getExtension } from "../common";
import { cfg } from "../config";

/** Finds assets to transform in the document with specified content. */
export async function capture(content: string): Promise<CapturedAsset[]> {
    const captures = new Array<CapturedAsset>();
    for (const regex of cfg.regex)
        for (const match of content.matchAll(new RegExp(regex)))
            handleMatch(match);
    return captures;

    function handleMatch(match: RegExpMatchArray) {
        if (!match.groups) return;
        const type = resolveType(match.groups.url);
        if (type === undefined) {
            cfg.log?.warn?.(`Captured syntax '${match[0]}' will be ignored due to unidentified asset type.`);
            return;
        }
        captures.push({
            syntax: match[0],
            index: match.index!,
            sourceUrl: match.groups.url,
            type,
            title: match.groups.title,
            meta: match.groups.meta ? JSON.parse(match.groups.meta) : undefined
        });
    }
}

function resolveType(url: string): AssetType | undefined {
    const { image, animation, video, youtube } = cfg;
    if (url.includes("youtube.com/watch?v="))
        return youtube ? AssetType.YouTube : undefined;
    const ext = getExtension(url).toLowerCase();
    if (image?.includes(ext)) return AssetType.Image;
    if (animation?.includes(ext)) return AssetType.Animation;
    if (video?.includes(ext)) return AssetType.Video;
    return undefined;
}
