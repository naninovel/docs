import { BuiltAsset } from "../asset";
import { ctx } from "../common";

/** Rewrites content of the document with specified assets; returns modified document content. */
export function rewrite(content: string, assets: BuiltAsset[]): string {
    const replaced = new Set<string>;
    for (const asset of assets) // TODO: Something more efficient?
        content = rewriteAsset(asset, content, replaced);
    poolAssets(assets);
    return content;
}

function rewriteAsset(asset: BuiltAsset, content: string, replaced: Set<string>): string {
    if (replaced.has(asset.syntax.text)) return content;
    replaced.add(asset.syntax.text);
    return content.replaceAll(asset.syntax.text, asset.html);
}

function poolAssets(assets: BuiltAsset[]) {
    assets.length = 0;
    ctx.assets.push(assets);
}
