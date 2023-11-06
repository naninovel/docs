import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { options } from "./options.js";

/** @type {Map<string, Promise<void>>} */
const fetches = new Map;
/** @type {Map<string, number>} */
const retries = new Map;

/** @param {string} uri
 *  @param {string} filePath
 *  @return {Promise<void>}*/
export function fetchQueued(uri, filepath) {
    const { localDir, fetchTimeout, fetchRetries, fetchDelay } = options;
    if (fetches.has(filepath)) return fetches.get(filepath);
    fetches.set(filepath, fs.existsSync(filepath)
        ? Promise.resolve()
        : fetchWithRetries(uri, filepath));
    return fetches.get(filepath);

    /** @param {string} uri
     *  @param {string} filepath */
    async function fetchWithRetries(uri, filepath) {
        console.info(`Downloading ${uri} to ${localDir}`);
        try { return fetchWithTimeout(uri, filepath); }
        catch (error) {
            retries.set(filepath, (retries.get(filepath) ?? 0) + 1);
            if (retries.get(filepath) > fetchRetries) {
                fs.unlink(filepath, _ => {});
                throw error;
            }
            console.warn(`Failed to download ${uri}, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * fetchDelay));
            return fetchWithRetries(uri, filepath);
        }
    }

    /** @param {string} uri
     *  @param {string} filepath */
    function fetchWithTimeout(uri, filepath) {
        const abort = new AbortController();
        const timeout = setTimeout(abort.abort, fetchTimeout * 1000);
        try { return fetchAndWriteTo(uri, filepath, abort.signal); }
        finally { clearTimeout(timeout); }
    }

    /** @param {string} uri
     *  @param {string} filepath
     *  @param {AbortSignal} signal */
    async function fetchAndWriteTo(uri, filepath, signal) {
        const response = await fetch(uri, { signal });
        if (response.status === 429) return handleRetryResponse(response);
        return write(response, filepath);
    }

    /** @param {Response} response
     *  @return {Promise<void>} */
    async function handleRetryResponse(response) {
        const delay = response.headers["retry-after"];
        if (typeof delay !== "number") throw Error(`${uri}: 429 without retry-after header.`);
        console.warn(`Too many fetch requests; the host asked to wait ${delay} seconds.`);
        await wait(delay + 1);
        return fetchWithTimeout(uri, filepath);
    }
}

/** @param {Response} response
 *  @param {string} filepath
 *  @return {Promise<void>} */
function write(response, filepath) {
    ensureDir(path.dirname(filepath));
    // noinspection JSCheckFunctionSignatures
    const body = Readable.fromWeb(response.body);
    const stream = fs.createWriteStream(filepath);
    return finished(body.pipe(stream));
}

/** @param {number} seconds
 *  @return {Promise<void>} */
function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/** @param {string} dir */
function ensureDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}
