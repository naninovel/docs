import path from "node:path";
import { options } from "./options";
import { download } from "./download";
import { probe } from "./probe";
import { AssetType, resolveAssetType } from "./asset";
import { buildImage, buildVideo, buildYouTube } from "./build";

/** Transforms document (eg, .md, .js or .html) with specified filename and content.
 *  @param filename Full file path of the transformed document.
 *  @param content The content in which to transform the assets.
 *  @return Transformed content. */
export async function transform(filename: string, content: string): Promise<string> {
    const { regex, local, serve } = options;
    const matches = new Set<string>;
    for (const match of content.matchAll(new RegExp(regex)))
        await handleMatch(match);
    return content;

    async function handleMatch(match: RegExpMatchArray) {
        if (!match.groups || matches.has(match[0])) return;
        matches.add(match[0]);
        const type = resolveAssetType(match.groups.uri);
        if (type === undefined) return;
        const html = await buildHtml(type, match.groups.title, match.groups.uri);
        content = content.replaceAll(match[0], html);
    }

    async function buildHtml(type: AssetType, title: string, url: string): Promise<string> {
        if (type === AssetType.YouTube)
            return buildYouTube(title, url);
        const source = await resolveSource(url);
        return type === AssetType.Image
            ? buildImage(title, source)
            : buildVideo(title, source);
    }

    async function resolveSource(uri: string): Promise<string> {
        const filename = path.basename(uri);
        const filepath = path.resolve(local, filename);
        await download(uri, filepath);
        const info = await probe(filepath);
        return `${serve}/${filename}?width=${info.width}&height=${info.height}`;
    }
}
