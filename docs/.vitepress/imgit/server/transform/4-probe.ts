import { FetchedAsset, ProbedAsset } from "../asset";
import { cfg, ctx, cache } from "../common";
import { ffprobe } from "../ffmpeg";

/** Probes downloaded asset files to identify their content properties. */
export async function probeAll(assets: FetchedAsset[]): Promise<ProbedAsset[]> {
    for (const asset of assets)
        if (!(await probeWithPlugins(<ProbedAsset>asset)))
            await probe(<ProbedAsset>asset);
    return <ProbedAsset[]>assets;
}

/** Probes asset content with ffprobe. */
export async function probe(asset: ProbedAsset): Promise<void> {
    const src = asset.content.src;
    if (!asset.dirty && cache.probes.hasOwnProperty(src)) {
        asset.content.info = cache.probes[src]!;
        return;
    }
    if (ctx.probes.has(src)) {
        asset.content.info = await ctx.probes.get(src)!;
        return;
    }
    const promise = ffprobe(asset.content.local);
    ctx.probes.set(src, promise);
    cache.probes[src] = asset.content.info = await promise;
}

async function probeWithPlugins(asset: ProbedAsset): Promise<boolean> {
    if (!cfg.plugins) return false;
    for (const plugin of cfg.plugins)
        if (plugin.probe && await plugin.probe(asset))
            return true;
    return false;
}
