import { CapturedAsset } from "../asset";
import { cfg } from "../common";

/** Finds assets to transform in the document with specified content. */
export async function capture(content: string): Promise<CapturedAsset[]> {
    const captures = new Array<CapturedAsset>();
    for (const regex of cfg.regex) // TODO: Test if caching by content hash and cfg.regex is worth it.
        for (const match of content.matchAll(new RegExp(regex)))
            handleMatch(match);
    return captures;

    function handleMatch(match: RegExpMatchArray) {
        if (!match.groups) return;
        captures.push({
            syntax: {
                text: match[0],
                index: match.index!,
                url: match.groups.url,
                alt: match.groups.alt,
                spec: match.groups.spec
            }
        });
    }
}
