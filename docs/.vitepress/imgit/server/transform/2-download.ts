import { Context, CapturedAsset, DownloadedAsset, AssetType, ensureDir } from "../common";
import { std } from "../platform";
import { cfg } from "../config";

const fetching = new Map<string, Promise<void>>;
const retrying = new Map<string, number>;

/** Downloads file content for the captured assets. */
export async function download(assets: CapturedAsset[], ctx: Context): Promise<DownloadedAsset[]> {
    const downloaded = new Array<DownloadedAsset>;
    for (const asset of assets)
        downloaded.push(await downloadAsset(asset, ctx));
    await Promise.all(fetching.values());
    return downloaded;
}

async function downloadAsset(asset: CapturedAsset, ctx: Context): Promise<DownloadedAsset> {
    if (asset.type === AssetType.YouTube) return asset;
    const { fs, path, wait } = std;
    const { timeout, retries, delay } = cfg.download;
    const sourcePath = path.resolve(buildLocalRoot(asset.sourceUrl), path.basename(asset.sourceUrl));
    const downloadedAsset: DownloadedAsset = { ...asset, sourcePath };
    if (await fs.exists(sourcePath) || fetching.has(sourcePath)) return downloadedAsset;
    const fetchPromise = fetchWithRetries(asset.sourceUrl, sourcePath);
    fetching.set(sourcePath, fetchPromise);
    ctx.fetches.push(fetchPromise);
    return fetchPromise.then(() => downloadedAsset);

    function buildLocalRoot(url: string): string {
        if (!url.startsWith("/")) return cfg.download.root;
        const endIdx = url.length - path.basename(url).length;
        const subdir = url.substring(cfg.host.length, endIdx);
        return path.join(cfg.root, subdir);
    }

    async function fetchWithRetries(url: string, filepath: string): Promise<void> {
        cfg.log?.info?.(`Downloading ${url} to ${cfg.download.root}`);
        try {
            return fetchWithTimeout(url, filepath);
        } catch (error) {
            retrying.set(filepath, (retrying.get(filepath) ?? 0) + 1);
            if (retrying.get(filepath)! > retries) {
                await fs.remove(filepath);
                throw error;
            }
            cfg.log?.warn?.(`Failed to download ${url}, retrying. (error: ${error})`);
            await wait(Math.floor(Math.random() * delay));
            return fetchWithRetries(url, filepath);
        }
    }

    function fetchWithTimeout(url: string, filepath: string): Promise<void> {
        const abort = new AbortController();
        const timeoutId = setTimeout(abort.abort, timeout * 1000);
        try { return fetchAndWriteTo(url, filepath, abort.signal); }
        finally { clearTimeout(timeoutId); }
    }

    async function fetchAndWriteTo(url: string, filepath: string, signal: AbortSignal): Promise<void> {
        const response = await std.fetch(url, signal);
        if (response.status === 429) return handleRetryResponse(response);
        await ensureDir(path.dirname(filepath));
        return fs.write(filepath, response.body!);
    }

    async function handleRetryResponse(response: Response): Promise<void> {
        const delay = Number(response.headers.get("retry-after"));
        if (isNaN(delay)) throw Error(`${asset.sourceUrl}: 429 without retry-after header (${delay}).`);
        cfg.log?.warn?.(`Too many fetch requests; the host asked to wait ${delay} seconds.`);
        await wait(delay);
        return fetchWithTimeout(asset.sourceUrl, sourcePath);
    }
}
