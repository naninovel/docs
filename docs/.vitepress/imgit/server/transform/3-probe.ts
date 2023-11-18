import { platform } from "../platform";
import { config } from "../config";
import { cache } from "../cache";
import { DownloadedAsset, ProbedAsset, SourceInfo } from "../asset";

const probing = new Map<string, Promise<SourceInfo | undefined>>;

/** Probes downloaded asset files to evaluate their width and height. */
export function probe(assets: DownloadedAsset[]): Promise<ProbedAsset[]> {
    return Promise.all(assets.map(probeDistinct));
}

async function probeDistinct(asset: DownloadedAsset): Promise<ProbedAsset> {
    if (!asset.sourcePath) return asset;
    let info: SourceInfo | undefined;
    const url = asset.sourceUrl;
    const modified = (await platform.fs.stat(asset.sourcePath)).modified;
    const cached = getCached();
    if (cached) info = cached;
    else if (probing.has(url)) info = await probing.get(url)!;
    else info = cache.probes[url] = await probeAsset();
    return { ...asset, sourceInfo: info, dirty: !cached };

    function getCached(): SourceInfo | undefined {
        if (!cache.probes.hasOwnProperty(url)) return undefined;
        const cached = cache.probes[url]!;
        if (modified !== cached.modified) return undefined;
        return cached;
    }

    async function probeAsset(): Promise<SourceInfo | undefined> {
        let resolve: (value: (SourceInfo | undefined)) => void;
        probing.set(url, new Promise<SourceInfo | undefined>(r => resolve = r));
        info = { ...(await config.encode.encoder.probe(asset.sourcePath!)), modified };
        resolve!(info);
        return info;
    }
}
