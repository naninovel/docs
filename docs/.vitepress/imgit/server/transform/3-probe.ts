import { Context, DownloadedAsset, ProbedAsset, SourceInfo } from "../common";
import { std } from "../platform";
import { cfg } from "../config";

const probing = new Map<string, Promise<SourceInfo | undefined>>;

/** Probes downloaded asset files to evaluate their width and height. */
export async function probe(assets: DownloadedAsset[], ctx: Context): Promise<ProbedAsset[]> {
    await everythingIsDownloaded(ctx);
    return Promise.all(assets.map(a => probeDistinct(a, ctx)));
}

// Bundlers typically process files in parallel, so we end up encoding
// while some files are still downloading; encoding multiple files
// in parallel tend to oversaturate CPU utilization, which degrades fetching.
async function everythingIsDownloaded(ctx: Context): Promise<void> {
    let length = 0;
    while (length < ctx.fetches.length) {
        length = ctx.fetches.length;
        await Promise.all(ctx.fetches);
        await std.wait(0);
    }
}

async function probeDistinct(asset: DownloadedAsset, ctx: Context): Promise<ProbedAsset> {
    if (!asset.sourcePath) return asset;
    let info: SourceInfo | undefined;
    const url = asset.sourceUrl;
    const modified = (await std.fs.stat(asset.sourcePath)).modified;
    const cached = getCached();
    if (cached) info = cached;
    else if (probing.has(url)) info = await probing.get(url)!;
    else info = ctx.cache.probes[url] = await probeAsset();
    return { ...asset, sourceInfo: info, dirty: !cached };

    function getCached(): SourceInfo | undefined {
        if (!ctx.cache.probes.hasOwnProperty(url)) return undefined;
        const cached = ctx.cache.probes[url]!;
        if (modified !== cached.modified) return undefined;
        return cached;
    }

    async function probeAsset(): Promise<SourceInfo | undefined> {
        let resolve: (value: (SourceInfo | undefined)) => void;
        probing.set(url, new Promise<SourceInfo | undefined>(r => resolve = r));
        info = { ...(await cfg.encode.encoder.probe(asset.sourcePath!)), modified };
        resolve!(info);
        return info;
    }
}
