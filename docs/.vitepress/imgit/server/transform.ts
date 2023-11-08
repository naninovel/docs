import path from "node:path";
import { options } from "./options";
import { fetchQueued } from "./fetch";
import { resolveMediaInfo, MediaInfo } from "./media";
import { AssetType, resolveAssetType } from "./asset";
import { buildImage, buildVideo, buildYouTube } from "./build";

/** @param source The content in which to transform the assets.
 *  @return Transformed content. */
export async function transform(source: string): Promise<string> {
    const matches = new Set<string>;
    const { regex, local, serve } = options;
    for (const match of source.matchAll(new RegExp(regex)))
        await handleMatch(match);
    return source;

    async function handleMatch(match: RegExpMatchArray) {
        if (!match.groups || matches.has(match[0])) return;
        matches.add(match[0]);
        const type = resolveAssetType(match.groups.uri);
        if (!type) return;
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
        const fileName = path.basename(uri);
        const filePath = path.resolve(local, fileName);
        await fetchQueued(uri, filePath);
        const info = await resolveMediaInfo(filePath);
        return appendMediaSize(`${serve}/${fileName}`, info);
    }
}

function appendMediaSize(uri: string, info: MediaInfo) {
    const width = info.streams[0].width;
    const height = info.streams[0].height;
    return `${uri}?width=${width}&height=${height}`;
}
