import { FetchedAsset, ProbedAsset, ProbedContent } from "../asset";
import { cfg, ctx, cache } from "../common";

/** Probes downloaded asset files to identify their content properties. */
export async function probe(assets: FetchedAsset[]): Promise<ProbedAsset[]> {
    for (const asset of assets)
        await probeAsset(<ProbedAsset>asset);
    return <ProbedAsset[]>assets;
}

async function probeAsset(asset: ProbedAsset): Promise<void> {
    if (asset.main) await probeContent(asset.main, asset.dirty);
    if (asset.poster) await probeContent(asset.poster, asset.dirty);
}

async function probeContent(content: ProbedContent, dirty?: boolean): Promise<void> {
    const src = content.src;
    if (!dirty && cache.probes.hasOwnProperty(src)) {
        content.info = cache.probes[src]!;
        return;
    }
    if (ctx.probes.has(src)) {
        content.info = await ctx.probes.get(src)!;
        return;
    }
    const promise = cfg.encode.encoder.probe(content.local);
    ctx.probes.set(src, promise);
    cache.probes[src] = content.info = await promise;
}
