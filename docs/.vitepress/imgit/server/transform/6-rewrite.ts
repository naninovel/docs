import { BuiltAsset } from "../asset";

/** Rewrites content of the document with specified assets; returns modified document content. */
export async function rewrite (content: string, assets: BuiltAsset[]): Promise<string> {
    // const html = await buildHtml(type, match.groups.title, match.groups.uri);
    // content = content.replaceAll(match[0], html);
}
