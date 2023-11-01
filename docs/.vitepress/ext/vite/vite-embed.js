import get from "axios";
import MagicString from "magic-string";
import ffprobe from "ffprobe";
import probes from "ffprobe-static";
import fs from "node:fs";
import afs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

/** @typedef Options
 *  @property {RegExp?} urlRegex The regex to match remote asset URLs.
 *  @property {string?} assetsDir Directory path (relative to the project root) to store downloaded assets.
 *  @property {number?} downloadTimeout How long to wait when downloading each asset, in seconds.
 *  @property {number?} downloadRetryLimit How many times to restart the download when request fails.
 *  @property {number?} downloadRetryDelay How long to wait before restarting a failed download, in seconds.
 *  @property {boolean?} resolveMediaSize Whether to append `?width=number&height=number` to the rewritten asset URLs. */

/** @typedef MediaStream
 *  @property {number} index
 *  @property {number} width
 *  @property {number} height */

/** @typedef MediaInfo
 *  @property {MediaStream[]} streams */

/** @type {Options} */
export const defaultOptions = {
    urlRegex: /\b(https?:\/\/[\w_#&?.\/-]*?\.(?:png|jpe?g|svg|gif|mp4))(?=[`'")\]])/ig,
    assetsDir: "./node_modules/.remote-assets",
    downloadTimeout: 30,
    downloadRetryLimit: 3,
    downloadRetryDelay: 6,
    resolveMediaSize: true
};

/** @param {Options} options
 *  @return {import("vite").Plugin} */
export const EmbedAssets = (options) => {
    const pattern = options?.urlRegex ?? defaultOptions.urlRegex;
    const assetsDir = path.resolve(options?.assetsDir ?? defaultOptions.assetsDir);
    const timeoutSeconds = options?.downloadTimeout ?? defaultOptions.downloadTimeout;
    const retryLimit = options?.downloadRetryLimit ?? defaultOptions.downloadRetryLimit;
    const maxRetryDelay = options?.downloadRetryDelay ?? defaultOptions.downloadRetryDelay;
    const appendSize = options?.resolveMediaSize ?? defaultOptions.resolveMediaSize;

    /** @type {Map<string, Promise<void>>} */
    const downloads = new Map;
    /** @type {Map<string, Promise<MediaInfo>>} */
    const resolves = new Map;
    /** @type {Map<string, number>} */
    const retries = new Map;
    /** @type {import("vite").ResolvedConfig} */
    let config;

    return {
        name: "vite-plugin-dont-move",
        enforce: "pre",
        configResolved: initialize,
        transform,
        transformIndexHtml: async (html, ctx) => (await transform(html, ctx.filename))?.code
    };

    /** @param {import("vite").ResolvedConfig} resolved */
    async function initialize(resolved) {
        config = resolved;
        if (config.server.force)
            await emptyDir(assetsDir);
        ensureDir(assetsDir);
    }

    /** @param {string} code
     *  @param {string} id */
    async function transform(code, id) {
        const regex = new RegExp(pattern, pattern.flags);
        const magic = new MagicString(code);
        for (let match; (match = regex.exec(code));)
            await handleMatch(match, magic, id);
        return !magic.hasChanged() ? null : {
            code: magic.toString(),
            map: config.build.sourcemap ? magic.generateMap({ hires: true }) : null
        };
    }

    /** @param {RegExpExecArray} match
     *  @param {MagicString} magic
     *  @param {string} id */
    async function handleMatch(match, magic, id) {
        const start = match.index;
        const end = start + match[0].length;
        const url = match[0];
        if (isValidHttpUrl(url))
            magic.overwrite(start, end, await resolve(id, url));
    }

    /** @param {string} id
     *  @param {string} url */
    async function resolve(id, url) {
        const fileName = md5(url) + path.extname(url);
        const filePath = path.resolve(assetsDir, fileName);
        await downloadQueued(url, filePath);
        let newUrl = path.relative(path.dirname(id), `${assetsDir}/${fileName}`);
        if (!newUrl.startsWith("./")) newUrl = "./" + newUrl;
        return appendSize ? appendMediaSize(newUrl, await resolveMediaQueued(filePath)) : newUrl;
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
        try { return await downloadTo(url, filepath); }
        catch (error) {
            retries.set(filepath, (retries.get(filepath) ?? 0) + 1);
            if (retries.get(filepath) > retryLimit) {
                fs.unlink(filepath, _ => {});
                throw error;
            }
            console.warn(`Download of ${url} failed, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * maxRetryDelay));
            return downloadWithRetries(url, filepath);
        }
    }

    /** @param {string} url
     *  @param {string} filepath */
    async function downloadTo(url, filepath) {
        // noinspection JSUnusedGlobalSymbols
        const response = await get(url, {
            responseType: "arraybuffer",
            timeout: timeoutSeconds * 1000,
            timeoutErrorMessage: `Failed to download ${url}: timeout > ${timeoutSeconds} seconds.`,
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
};

/** @param {string} str */
function isValidHttpUrl(str) {
    let url;
    try { url = new URL(str); }
    catch (_) { return false; }
    return url.protocol === "http:" || url.protocol === "https:";
}

/** @param {string} url */
function md5(url) {
    return crypto.createHash("md5").update(url).digest("hex");
}

/** @param {number} seconds
 *  @return {Promise<void>} */
function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/** @param {string} dir */
async function emptyDir(dir) {
    for (const file of await afs.readdir(dir))
        fs.unlink(path.join(dir, file), _ => {});
}

/** @param {string} dir */
function ensureDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
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
