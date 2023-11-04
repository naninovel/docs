import get from "axios";
import MagicString from "magic-string";
import ffprobe from "ffprobe";
import probes from "ffprobe-static";
import fs from "node:fs";
import afs from "node:fs/promises";
import path from "node:path";
import { options } from "./options.js";

/** @typedef MediaStream
 *  @property {number} index
 *  @property {number} width
 *  @property {number} height */

/** @typedef MediaInfo
 *  @property {MediaStream[]} streams */

/** @param {string} source The content in which to capture and replace assets. */
export async function transform(source) {
    const { regex, localDir, serveDir, fetchTimeout, fetchRetries, fetchDelay } = options;

    /** @type {Map<string, Promise<void>>} */
    const downloads = new Map;
    /** @type {Map<string, Promise<MediaInfo>>} */
    const resolves = new Map;
    /** @type {Map<string, number>} */
    const retries = new Map;

    ensureDir(localDir);
    const magic = new MagicString(source);
    for (let match; (match = new RegExp(regex, "ig").exec(source));)
        await handleMatch(match, magic);
    return !magic.hasChanged() ? source : magic.toString();

    /** @param {RegExpExecArray} match
     *  @param {MagicString} magic */
    async function handleMatch(match, magic) {
        const start = match.index;
        const end = start + match[0].length;
        magic.overwrite(start, end, await resolve(match[1], match[2]));
    }

    /** @param {string} title
     *  @param {string} url */
    async function resolve(title, url) {
        const fileName = path.basename(url);
        const filePath = path.resolve(localDir, fileName);
        await downloadQueued(url, filePath);
        const info = await resolveMediaQueued(filePath);
        return `![${title}](${appendMediaSize(`${serveDir}/${fileName}`, info)})`;
    }

    /** @param {string} url
     *  @param {string} filePath */
    function downloadQueued(url, filepath) {
        if (downloads.has(filepath)) return downloads.get(filepath);
        downloads.set(filepath, fs.existsSync(filepath)
            ? Promise.resolve()
            : downloadWithRetries(url, filepath));
        return downloads.get(filepath);
    }

    /** @param {string} filePath */
    async function resolveMediaQueued(filePath) {
        if (resolves.has(filePath)) return resolves.get(filePath);
        resolves.set(filePath, resolveMediaInfo(filePath));
        return resolves.get(filePath);
    }

    /** @param {string} url
     *  @param {string} filepath */
    async function downloadWithRetries(url, filepath) {
        console.info(`Downloading ${url} to ${localDir}`);
        try { return await downloadTo(url, filepath); }
        catch (error) {
            retries.set(filepath, (retries.get(filepath) ?? 0) + 1);
            if (retries.get(filepath) > fetchRetries) {
                fs.unlink(filepath, _ => {});
                throw error;
            }
            console.warn(`Download of ${url} failed, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * fetchDelay));
            return downloadWithRetries(url, filepath);
        }
    }

    /** @param {string} url
     *  @param {string} filepath */
    async function downloadTo(url, filepath) {
        // noinspection JSUnusedGlobalSymbols
        const response = await get(url, {
            responseType: "arraybuffer",
            timeout: fetchTimeout * 1000,
            timeoutErrorMessage: `Failed to download ${url}: timeout > ${fetchTimeout} seconds.`,
            validateStatus: status => (status >= 200 && status < 300) || status === 429
        });

        if (response.status === 429) {
            const delay = response.headers["retry-after"];
            if (typeof delay !== "number") throw Error(`${url}: 429 without retry-after header.`);
            console.warn(`Too many download requests; the host asked to wait ${delay} seconds.`);
            await wait(delay + 1);
            return await downloadTo(url, filepath);
        }

        await afs.writeFile(filepath, response.data);
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

/** @param {string} url
 *  @param {MediaInfo} info */
function appendMediaSize(url, info) {
    const width = info.streams[0].width;
    const height = info.streams[0].height;
    return `${url}?width=${width}&height=${height}`;
}

/** @param {string} filePath
 *  @return {Promise<MediaInfo>} */
async function resolveMediaInfo(filePath) {
    return await ffprobe(filePath, { path: probes.path });
}
