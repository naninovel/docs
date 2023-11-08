import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { options } from "./options.js";

const fetching = new Map<string, Promise<void>>;
const retrying = new Map<string, number>;

export async function fetchQueued(uri: string, filepath: string): Promise<void> {
    const { local } = options;
    const { timeout, retries, delay } = options.fetch;
    if (fetching.has(filepath)) return fetching.get(filepath);
    fetching.set(filepath, fs.existsSync(filepath)
        ? Promise.resolve()
        : fetchWithRetries(uri, filepath));
    return fetching.get(filepath);

    async function fetchWithRetries(uri: string, filepath: string): Promise<void> {
        console.info(`Downloading ${uri} to ${local}`);
        try { return fetchWithTimeout(uri, filepath); } catch (error) {
            retrying.set(filepath, (retrying.get(filepath) ?? 0) + 1);
            if (retrying.get(filepath)! > retries) {
                fs.unlink(filepath, _ => {});
                throw error;
            }
            console.warn(`Failed to download ${uri}, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * delay));
            return fetchWithRetries(uri, filepath);
        }
    }

    function fetchWithTimeout(uri: string, filepath: string): Promise<void> {
        const abort = new AbortController();
        const timeoutId = setTimeout(abort.abort, timeout * 1000);
        try { return fetchAndWriteTo(uri, filepath, abort.signal); } finally { clearTimeout(timeoutId); }
    }

    async function fetchAndWriteTo(uri: string, filepath: string, signal: AbortSignal): Promise<void> {
        const response = await fetch(uri, { signal });
        if (response.status === 429) return handleRetryResponse(response);
        return write(response, filepath);
    }

    async function handleRetryResponse(response: Response): Promise<void> {
        const delay = Number(response.headers.get("retry-after"));
        if (isNaN(delay)) throw Error(`${uri}: 429 without retry-after header (${delay}).`);
        console.warn(`Too many fetch requests; the host asked to wait ${delay} seconds.`);
        await wait(delay + 1);
        return fetchWithTimeout(uri, filepath);
    }
}

function write(response: Response, filepath: string): Promise<void> {
    ensureDir(path.dirname(filepath));
    const body = Readable.fromWeb(<never>response.body);
    const stream = fs.createWriteStream(filepath);
    return finished(body.pipe(stream));
}

function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function ensureDir(dir: string) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}
