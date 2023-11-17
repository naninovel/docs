import { CapturedAsset, AssetType } from "../asset";
import { getExtension } from "../common";
import { config } from "../config";

/** Finds assets to transform in the document with specified content. */
export async function capture(content: string): Promise<CapturedAsset[]> {
    const captures = new Array<CapturedAsset>();
    for (const regex of config.regex)
        for (const match of content.matchAll(new RegExp(regex)))
            handleMatch(match);
    return captures;

    function handleMatch(match: RegExpMatchArray) {
        if (!match.groups) return;
        const type = resolveType(match.groups.uri);
        if (type === undefined) {
            config.log?.warn?.(`Captured syntax '${match[0]}' will be ignored due to unidentified asset type.`);
            return;
        }
        captures.push({
            syntax: match[0],
            index: match.index!,
            sourceUrl: match.groups.uri,
            type,
            title: match.groups.title,
            meta: match.groups.meta ? JSON.parse(match.groups.meta) : undefined
        });
    }
}

function resolveType(uri: string): AssetType | undefined {
    const { image, animation, video, youtube } = config;
    if (uri.includes("youtube.com/watch?v="))
        return youtube ? AssetType.YouTube : undefined;
    const ext = getExtension(uri).toLowerCase();
    if (image?.includes(ext)) return AssetType.Image;
    if (animation?.includes(ext)) return AssetType.Animation;
    if (video?.includes(ext)) return AssetType.Video;
    return undefined;
}
