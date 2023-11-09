import { CapturedAsset, resolveAssetType } from "./asset";
import { options } from "./options";

/** Finds assets to transform in the document with specified file path and content. */
export async function capture(path: string, content: string): Promise<CapturedAsset[]> {
    const captures = new Array<CapturedAsset>();
    for (const match of content.matchAll(new RegExp(options.regex)))
        handleMatch(match);
    return captures;

    function handleMatch(match: RegExpMatchArray) {
        if (!match.groups) return;
        const type = resolveAssetType(match.groups.uri);
        if (type === undefined) {
            options.log?.warn?.(`Captured syntax '${match[0]}' will be ignored due to unidentified asset type.`);
            return;
        }
        captures.push({
            syntax: match[0],
            startIndex: match.index!,
            endIndex: match.index! + match.length - 1,
            sourceUrl: match.groups.uri,
            type,
            title: match.groups.title
        });
    }
}
