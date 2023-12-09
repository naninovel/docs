import { BuiltAsset } from "../asset";
import { ctx, cfg } from "../common";

/** Rewrites content of the document with specified assets; returns modified document content. */
export async function rewriteAll(id: string, content: string, assets: BuiltAsset[]): Promise<string> {
    content = (await rewriteWithPlugins(id, content, assets)) ?? rewrite(content, assets);
    poolAssets(assets);
    return content;
}

/** Default rewrite procedure. */
export function rewrite(content: string, assets: BuiltAsset[]): string {
    const replaced = new Set<string>;
    for (const asset of assets) // TODO: Something more efficient?
        content = rewriteAsset(asset, content, replaced);
    return content;
}

function rewriteAsset(asset: BuiltAsset, content: string, replaced: Set<string>): string {
    if (replaced.has(asset.syntax.text)) return content;
    replaced.add(asset.syntax.text);
    return content.replaceAll(asset.syntax.text, asset.html);
}

async function rewriteWithPlugins(id: string, content: string, assets: BuiltAsset[]): Promise<string | null> {
    if (!cfg.plugins) return null;
    for (const plugin of cfg.plugins)
        if (plugin.rewrite) {
            const result = await plugin.rewrite(id, content, assets);
            if (result) return result;
        }
    return null;
}

function poolAssets(assets: BuiltAsset[]) {
    assets.length = 0;
    ctx.assets.push(assets);
}
