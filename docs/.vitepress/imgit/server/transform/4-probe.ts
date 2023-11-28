import { FetchedAsset, ProbedAsset, AssetContent } from "../asset";
import { std, cfg, ctx, cache } from "../common";

const probing = new Map<string, Promise<AssetContent | undefined>>;

/** Probes downloaded asset files to evaluate their width and height. */
export async function probe(assets: FetchedAsset[]): Promise<ProbedAsset[]> {
    await everythingIsDownloaded();
    return Promise.all(assets.map(probeDistinct));
}

// Bundlers typically process files in parallel, so we end up encoding
// while some files are still downloading; encoding multiple files
// in parallel tend to oversaturate CPU utilization, which degrades fetching.
async function everythingIsDownloaded(): Promise<void> {
    let length = 0;
    while (length < ctx.fetches.length) {
        length = ctx.fetches.length;
        await Promise.all(ctx.fetches);
        await std.wait(0);
    }
}

async function probeDistinct(asset: FetchedAsset): Promise<ProbedAsset> {
    if (!asset.contentPath) return asset;
    let info: AssetContent | undefined;
    const url = asset.sourceUrl;
    const modified = (await std.fs.stat(asset.contentPath)).modified;
    const cached = getCached();
    if (cached) info = cached;
    else if (probing.has(url)) info = await probing.get(url)!;
    else info = cache.probes[url] = await probeAsset();
    return { ...asset, content: info, dirty: !cached };

    function getCached(): AssetContent | undefined {
        if (!cache.probes.hasOwnProperty(url)) return undefined;
        const cached = cache.probes[url]!;
        if (modified > cached.modified) return undefined;
        return cached;
    }

    async function probeAsset(): Promise<AssetContent | undefined> {
        let resolve: (value: (AssetContent | undefined)) => void;
        probing.set(url, new Promise<AssetContent | undefined>(r => resolve = r));
        info = { ...(await cfg.encode.encoder.probe(asset.contentPath!)), modified };
        resolve!(info);
        return info;
    }
}
