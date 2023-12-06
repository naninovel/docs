import { ResolvedAsset, FetchedAsset, FetchedContent } from "../asset";
import { std, cfg, ctx, cache, ensureDir } from "../common";

/** Downloads source content files for the resolved assets. */
export async function fetch(assets: ResolvedAsset[]): Promise<FetchedAsset[]> {
    for (const asset of assets)
        await fetchAsset(<FetchedAsset>asset);
    return <FetchedAsset[]>assets;
}

async function fetchAsset(asset: FetchedAsset): Promise<void> {
    if (asset.content) await fetchContent(asset.content, asset);
}

async function fetchContent(content: FetchedContent, asset: FetchedAsset): Promise<void> {
    const src = content.src;
    const out = content.local = buildLocalPath(src);

    if (src.startsWith("/")) return;
    if (ctx.fetches.has(src)) return ctx.fetches.get(src)!;
    if (!asset.dirty) asset.dirty = await isDirty(src, out);
    if (!asset.dirty) return;

    const fetchPromise = fetchWithRetries(src, out);
    ctx.fetches.set(src, fetchPromise);
    await fetchPromise;
    cache.sizes[src] = await std.fs.size(out);
}

async function fetchWithRetries(src: string, out: string): Promise<void> {
    cfg.log?.info?.(`Downloading ${src} to ${cfg.fetch.root}`);
    try { return fetchWithTimeout(src, out); } catch (error) {
        ctx.retries.set(src, (ctx.retries.get(src) ?? 0) + 1);
        if (ctx.retries.get(src)! > cfg.fetch.retries) {
            await std.fs.remove(out);
            throw error;
        }
        cfg.log?.warn?.(`Failed to download ${src}, retrying. (error: ${error})`);
        await std.wait(Math.floor(Math.random() * cfg.fetch.delay));
        return fetchWithRetries(src, out);
    }
}

function fetchWithTimeout(src: string, out: string): Promise<void> {
    const abort = new AbortController();
    const timeoutId = setTimeout(abort.abort, cfg.fetch.timeout * 1000);
    try { return fetchAndWriteTo(src, out, abort.signal); }
    finally { clearTimeout(timeoutId); }
}

async function fetchAndWriteTo(src: string, out: string, signal: AbortSignal): Promise<void> {
    const response = await std.fetch(src, signal);
    if (response.status === 429) return handleRetryResponse(src, out, response);
    await ensureDir(std.path.dirname(out));
    return std.fs.write(out, new Uint8Array(await response.arrayBuffer()));
}

async function handleRetryResponse(src: string, out: string, response: Response): Promise<void> {
    const delay = Number(response.headers.get("retry-after"));
    if (isNaN(delay)) throw Error(`${src}: 429 without retry-after header (${delay}).`);
    cfg.log?.warn?.(`Too many fetch requests; the host asked to wait ${delay} seconds.`);
    await std.wait(delay);
    return fetchWithTimeout(src, out);
}

function buildLocalPath(src: string): string {
    if (src.startsWith("/")) return `${std.path.resolve(cfg.root)}/${src}`;
    const url = new URL(src);
    const root = std.path.resolve(cfg.fetch.root);
    return `${root}/${url.hostname}${url.pathname.replaceAll("/", "-")}`;
}

async function isDirty(src: string, out: string): Promise<boolean> {
    if (!(await std.fs.exists(out)) || !cache.sizes.hasOwnProperty(src)) return true;
    return (await std.fs.size(out)) !== cache.sizes[src];
}
