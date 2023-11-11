import { CapturedAsset, DownloadedAsset, AssetType } from "../asset";
import { ensureDir, wait } from "../common";
import { config } from "../config";

const fetching = new Map<string, Promise<void>>;
const retrying = new Map<string, number>;

/** Downloads file content for the captured assets. */
export async function download(assets: CapturedAsset[]): Promise<DownloadedAsset[]> {
    const downloaded = new Array<DownloadedAsset>;
    for (const asset of assets)
        downloaded.push(await downloadAsset(asset));
    await Promise.all(fetching.values());
    return downloaded;
}

async function downloadAsset(asset: CapturedAsset): Promise<DownloadedAsset> {
    if (asset.type === AssetType.YouTube) return { ...asset, sourcePath: "" };
    const { local, log } = config;
    const { timeout, retries, delay } = config.download;
    const { path, fs } = config.platform;
    const sourcePath = path.join(buildLocalRoot(asset),
        path.basename(asset.sourceUrl)).replaceAll("\\", "/");
    const downloadedAsset: DownloadedAsset = { ...asset, sourcePath };
    if (fs.exists(sourcePath) || fetching.has(sourcePath)) return downloadedAsset;
    const fetchPromise = fetchWithRetries(asset.sourceUrl, sourcePath);
    fetching.set(sourcePath, fetchPromise);
    return fetchPromise.then(() => downloadedAsset);

    async function fetchWithRetries(uri: string, filepath: string): Promise<void> {
        log?.info?.(`Downloading ${uri} to ${local}`);
        try { return fetchWithTimeout(uri, filepath); } catch (error) {
            retrying.set(filepath, (retrying.get(filepath) ?? 0) + 1);
            if (retrying.get(filepath)! > retries) {
                fs.remove(filepath);
                throw error;
            }
            log?.warn?.(`Failed to download ${uri}, retrying. (error: ${error})`);
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
        if (isNaN(delay)) throw Error(`${asset.sourceUrl}: 429 without retry-after header (${delay}).`);
        log?.warn?.(`Too many fetch requests; the host asked to wait ${delay} seconds.`);
        await wait(delay + 1);
        return fetchWithTimeout(asset.sourceUrl, sourcePath);
    }
}

function buildLocalRoot(asset: CapturedAsset): string {
    const path = config.platform.path;
    if (!asset.sourceUrl.startsWith(config.serve))
        return path.join(config.local, config.remote);
    const endIdx = asset.sourceUrl.length - path.basename(asset.sourceUrl).length;
    const subdir = asset.sourceUrl.substring(config.serve.length, endIdx);
    return path.join(config.local, subdir);
}

function write(response: Response, filepath: string): Promise<void> {
    const { path, fs } = config.platform;
    ensureDir(path.dirname(filepath));
    return fs.stream(filepath, response.body!);
}
