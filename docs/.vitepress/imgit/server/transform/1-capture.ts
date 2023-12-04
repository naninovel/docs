import { CapturedAsset, AssetSyntax } from "../asset";
import { cfg, ctx } from "../common";

/** Finds assets to transform in the document with specified content. */
export function capture(content: string): CapturedAsset[] {
    const captures = ctx.assets.pop() ?? new Array<CapturedAsset>;
    for (const regex of cfg.regex.map(r => new RegExp(r)))
        for (const match of content.matchAll(regex))
            if (match.groups) captures.push({ syntax: createSyntax(match) });
    return captures;
}

function createSyntax(match: RegExpMatchArray): AssetSyntax {
    return {
        text: match[0],
        index: match.index!,
        url: match.groups!.url,
        alt: match.groups!.alt,
        spec: match.groups!.spec
    };
}
