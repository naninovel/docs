import { CapturedAsset, ResolvedAsset, AssetSpec } from "../asset";
import { cfg } from "../common";

/** Resolves content locations and specs of the captured syntax. */
export async function resolveAll(assets: CapturedAsset[]): Promise<ResolvedAsset[]> {
    for (const asset of assets)
        if (!(await resolveWithPlugins(<ResolvedAsset>asset)))
            resolve(<ResolvedAsset>asset);
    return <ResolvedAsset[]>assets;
}

/** Resolves asset types supported by default. */
export function resolve(asset: ResolvedAsset): void {
    asset.content = { src: asset.syntax.url };
    asset.spec = asset.syntax.spec ? resolveSpec(asset.syntax.spec) : {};
}

/** Resolves spec formatted as URL query parameters. */
export function resolveSpec(query: string): AssetSpec {
    const params = new URLSearchParams(query);
    return {
        eager: params.has("eager") ? true : undefined,
        merge: params.has("merge") ? true : undefined,
        width: params.has("width") ? parseInt(params.get("width")!) : undefined,
        media: params.get("media") ?? undefined,
        class: params.get("class") ?? undefined
    };
}

async function resolveWithPlugins(asset: ResolvedAsset): Promise<boolean> {
    if (!cfg.plugins) return false;
    for (const plugin of cfg.plugins)
        if (plugin.resolve && await plugin.resolve(asset))
            return true;
    return false;
}
