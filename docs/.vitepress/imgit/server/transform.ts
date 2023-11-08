import path from "node:path";
import { options } from "./options";
import { fetchQueued } from "./fetch";
import { resolveMediaInfo } from "./media";
import { AssetType, resolveAssetType } from "./asset";
import { buildImage, buildVideo, buildYouTube } from "./build";

/** @param source The content in which to transform the assets.
 *  @return Transformed content. */
export async function transform(source: string): Promise<string> {
    const { regex, local, serve } = options;
    const matches = new Set<string>;
    for (const match of source.matchAll(new RegExp(regex)))
        await handleMatch(match);
    return source;

    async function handleMatch(match: RegExpMatchArray) {
        if (!match.groups || matches.has(match[0])) return;
        matches.add(match[0]);
        const type = resolveAssetType(match.groups.uri);
        if (type === undefined) return;
        const html = await buildHtml(type, match.groups.title, match.groups.uri);
        source = source.replaceAll(match[0], html);
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
        await fetchQueued(uri, filepath);
        const info = await resolveMediaInfo(filepath);
        return `${serve}/${filename}?width=${info.width}&height=${info.height}`;
    }
}
