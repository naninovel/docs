import { platform } from "../platform";
import { config } from "../config";
import { cache } from "../cache";
import { DownloadedAsset, ProbedAsset, MediaInfo } from "../asset";

const probing = new Map<string, Promise<MediaInfo | undefined>>;
const args = "-loglevel error -select_streams v:0 -show_entries stream=width,height,pix_fmt -of csv=p=0";

/** Probes downloaded asset files to evaluate their width and height. */
export function probe(assets: DownloadedAsset[]): Promise<ProbedAsset[]> {
    return Promise.all(assets.map(probeDistinct));
}

async function probeDistinct(asset: DownloadedAsset): Promise<ProbedAsset> {
    if (!asset.sourcePath) return asset;
    let info: MediaInfo | undefined;
    const url = asset.sourceUrl;
    if (cache.probes.hasOwnProperty(url)) info = cache.probes[url];
    else if (probing.has(url)) info = await probing.get(url)!;
    else info = cache.probes[url] = await probeAsset(asset.sourcePath, url);
    return { ...asset, sourceInfo: info };
}

async function probeAsset(path: string, url: string): Promise<MediaInfo | undefined> {
    let resolve: (value: (MediaInfo | undefined)) => void;
    probing.set(url, new Promise<MediaInfo | undefined>(r => resolve = r));
    const { out, err } = await platform.exec(`ffprobe ${args} "${path}"`);
    if (err) config.log?.err?.(`ffprobe error: ${err}`);
    const info = parseOut(out);
    resolve!(info);
    return info;
}

function parseOut(out: string): MediaInfo | undefined {
    if (!out?.includes(",")) return undefined;
    const parts = out.split(",");
    const alpha = alphaFormats.has(parts[2].trim());
    return { width: Number(parts[0]), height: Number(parts[1]), alpha };
}

// region alpha formats
// print list of all the known formats with alpha channel (may vary with ffprobe version):
// ffprobe -show_entries pixel_format=name:flags=alpha -of csv=p=0
const alphaFormats = new Set<string>([
    "pal8",
    "argb",
    "rgba",
    "abgr",
    "bgra",
    "yuva420p",
    "ya8",
    "yuva422p",
    "yuva444p",
    "yuva420p9be",
    "yuva420p9le",
    "yuva422p9be",
    "yuva422p9le",
    "yuva444p9be",
    "yuva444p9le",
    "yuva420p10be",
    "yuva420p10le",
    "yuva422p10be",
    "yuva422p10le",
    "yuva444p10be",
    "yuva444p10le",
    "yuva420p16be",
    "yuva420p16le",
    "yuva422p16be",
    "yuva422p16le",
    "yuva444p16be",
    "yuva444p16le",
    "rgba64be",
    "rgba64le",
    "bgra64be",
    "bgra64le",
    "ya16be",
    "ya16le",
    "gbrap",
    "gbrap16be",
    "gbrap16le",
    "ayuv64le",
    "ayuv64be",
    "gbrap12be",
    "gbrap12le",
    "gbrap10be",
    "gbrap10le",
    "gbrapf32be",
    "gbrapf32le",
    "yuva422p12be",
    "yuva422p12le",
    "yuva444p12be",
    "yuva444p12le",
    "vuya",
    "rgbaf16be",
    "rgbaf16le",
    "rgbaf32be",
    "rgbaf32le"
]);
// endregion
