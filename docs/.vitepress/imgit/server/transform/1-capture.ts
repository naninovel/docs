import { CapturedAsset, AssetSyntax } from "../asset";
import { cfg, ctx } from "../common";

/** Finds assets to transform in the document with specified content. */
export async function captureAll(id: string, content: string): Promise<CapturedAsset[]> {
    const assets = ctx.assets.pop() ?? new Array<CapturedAsset>;
    if (await captureWithPlugins(id, content, assets)) return assets;
    capture(content, assets);
    return assets;
}

/** Used regexp defined in options to capture the assets syntax. */
export function capture(content: string, assets: CapturedAsset[]) {
    for (const regex of cfg.regex.map(r => new RegExp(r)))
        for (const match of content.matchAll(regex))
            if (match.groups) assets.push({ syntax: createSyntax(match) });
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

async function captureWithPlugins(id: string, content: string, assets: CapturedAsset[]): Promise<boolean> {
    if (!cfg.plugins) return false;
    for (const plugin of cfg.plugins)
        if (plugin.capture && await plugin.capture(id, content, assets))
            return true;
    return false;
}
