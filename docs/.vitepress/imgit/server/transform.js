import path from "node:path";
import { options } from "./options";
import { fetchQueued } from "./fetch";
import { resolveMediaInfo } from "./media";
import { AssetType, resolveAssetType } from "./asset";
import { buildImage, buildVideo, buildYouTube } from "./build";

/** @param {string} source The content in which to transform the assets.
 *  @return {Promise<string>} Transformed content. */
export async function transform(source) {
    /** @type {Set<string>} */
    const matches = new Set;
    const { regex, localDir, serveDir } = options;
    for (const match of source.matchAll(new RegExp(regex)))
        await handleMatch(match);
    return source;

    /** @param {RegExpMatchArray} match */
    async function handleMatch(match) {
        if (matches.has(match[0])) return;
        matches.add(match[0]);
        const type = resolveAssetType(match.groups.uri);
        if (!type) return;
        const html = await buildHtml(type, match.groups.title, match.groups.uri);
        source = source.replaceAll(match[0], html);
    }

    /** @param {AssetType} type
     *  @param {string} title
     *  @param {string} uri */
    async function buildHtml(type, title, uri) {
        if (type === AssetType.YouTube)
            return buildYouTube(title, uri);
        const source = await resolveSource(title, uri);
        return type === AssetType.Image
            ? buildImage(title, source)
            : buildVideo(title, source);
    }

    /** @param {string} title
     *  @param {string} uri */
    async function resolveSource(title, uri) {
        const fileName = path.basename(uri);
        const filePath = path.resolve(localDir, fileName);
        await fetchQueued(uri, filePath);
        const info = await resolveMediaInfo(filePath);
        return appendMediaSize(`${serveDir}/${fileName}`, info);
    }
}

/** @param {string} uri
 *  @param {MediaInfo} info */
function appendMediaSize(uri, info) {
    const width = info.streams[0].width;
    const height = info.streams[0].height;
    return `${uri}?width=${width}&height=${height}`;
}
