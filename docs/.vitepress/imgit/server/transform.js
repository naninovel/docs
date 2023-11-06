import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { options } from "./options";
import { AssetType, resolveAssetType } from "./asset";
import { resolveMediaInfo } from "./media";
import { buildImage, buildVideo, buildYouTube } from "./build";

/** @type {Map<string, Promise<void>>} */
const downloads = new Map;
/** @type {Map<string, number>} */
const retries = new Map;

/** @param {string} source The content in which to capture and optimize assets. */
export async function transform(source) {
    const { regex, localDir, serveDir, fetchTimeout, fetchRetries, fetchDelay } = options;
    /** @type {Set<string>} */
    const matches = new Set;
    ensureDir(localDir);
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
        await downloadQueued(uri, filePath);
        const info = await resolveMediaInfo(filePath);
        return appendMediaSize(`${serveDir}/${fileName}`, info);
    }

    /** @param {string} uri
     *  @param {string} filePath */
    function downloadQueued(uri, filepath) {
        if (downloads.has(filepath)) return downloads.get(filepath);
        downloads.set(filepath, fs.existsSync(filepath)
            ? Promise.resolve()
            : downloadWithRetries(uri, filepath));
        return downloads.get(filepath);
    }

    /** @param {string} uri
     *  @param {string} filepath */
    async function downloadWithRetries(uri, filepath) {
        console.info(`Downloading ${uri} to ${localDir}`);
        try { return downloadWithTimeout(uri, filepath); }
        catch (error) {
            retries.set(filepath, (retries.get(filepath) ?? 0) + 1);
            if (retries.get(filepath) > fetchRetries) {
                fs.unlink(filepath, _ => {});
                throw error;
            }
            console.warn(`Download of ${uri} failed, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * fetchDelay));
            return downloadWithRetries(uri, filepath);
        }
    }

    /** @param {string} uri
     *  @param {string} filepath */
    function downloadWithTimeout(uri, filepath) {
        const abort = new AbortController();
        const timeout = setTimeout(abort.abort, fetchTimeout * 1000);
        try { return downloadTo(uri, filepath, abort.signal); }
        finally { clearTimeout(timeout); }
    }

    /** @param {string} uri
     *  @param {string} filepath
     *  @param {AbortSignal} signal */
    async function downloadTo(uri, filepath, signal) {
        const response = await fetch(uri, { signal });
        if (response.status === 429) {
            const delay = response.headers["retry-after"];
            if (typeof delay !== "number") throw Error(`${uri}: 429 without retry-after header.`);
            console.warn(`Too many download requests; the host asked to wait ${delay} seconds.`);
            await wait(delay + 1);
            return downloadWithTimeout(uri, filepath);
        }
        // noinspection JSCheckFunctionSignatures
        const body = Readable.fromWeb(response.body);
        const stream = fs.createWriteStream(filepath);
        return finished(body.pipe(stream));
    }
}

/** @param {string} dir */
function ensureDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}

/** @param {number} seconds
 *  @return {Promise<void>} */
function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/** @param {string} uri
 *  @param {MediaInfo} info */
function appendMediaSize(uri, info) {
    const width = info.streams[0].width;
    const height = info.streams[0].height;
    return `${uri}?width=${width}&height=${height}`;
}
