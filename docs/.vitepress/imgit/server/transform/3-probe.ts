import { platform } from "../platform";
import { config } from "../config";
import { cache } from "../cache";
import { DownloadedAsset, ProbedAsset, MediaInfo, AssetType } from "../asset";

const probing = new Map<string, Promise<MediaInfo>>;

/** Probes downloaded asset files to evaluate their width and height. */
export function probe(assets: DownloadedAsset[]): Promise<ProbedAsset[]> {
    return Promise.all(assets.map(probeAsset));
}

async function probeAsset(asset: DownloadedAsset): Promise<ProbedAsset> {
    let info: MediaInfo;
    const url = asset.sourceUrl;
    if (asset.type === AssetType.YouTube) info = { width: 0, height: 0, alpha: false };
    else if (cache.probes.hasOwnProperty(url)) info = cache.probes[url];
    else if (probing.has(url)) info = await probing.get(url)!;
    else info = cache.probes[url] = await probeMedia(asset.sourcePath, url);
    return { ...asset, sourceInfo: info };
}

async function probeMedia(path: string, url: string): Promise<MediaInfo> {
    let resolve: (value: (MediaInfo)) => void;
    probing.set(url, new Promise<MediaInfo>(r => resolve = r));
    const { out, err } = await platform.exec(`ffprobe ${config.probe.args} "${path}"`);
    if (err) config.log?.err?.(`ffprobe error: ${err}`);
    const info = parseOut(out);
    resolve!(info);
    return info;
}

function parseOut(out: string): MediaInfo {
    if (!out?.includes("x")) return { width: NaN, height: NaN, alpha: false };
    const parts = out.split("x");
    return { width: Number(parts[0]), height: Number(parts[1]), alpha: false };
}
