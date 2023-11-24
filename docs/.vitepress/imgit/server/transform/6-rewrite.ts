import { BuiltAsset } from "../common";

/** Rewrites content of the document with specified assets; returns modified document content. */
export async function rewrite(content: string, assets: BuiltAsset[]): Promise<string> {
    const replaced = new Set<string>;
    // TODO: How to replace all at once?
    for (const asset of assets)
        replace(asset.syntax, asset.html);
    return content;

    function replace(search: string, replace: string) {
        if (replaced.has(search)) return;
        content = content.replaceAll(search, replace);
        replaced.add(search);
    }
}
