import { CapturedAsset, ResolvedAsset, AssetSpec, ResolvedContent } from "../asset";
import { cfg, isYouTube, getYouTubeId } from "../common";

/** Resolves content locations and specs of the captured syntax. */
export async function resolve(assets: CapturedAsset[]): Promise<ResolvedAsset[]> {
    for (const asset of assets)
        await resolveAsset(<ResolvedAsset>asset);
    return <ResolvedAsset[]>assets;
}

async function resolveAsset(asset: ResolvedAsset): Promise<void> {
    for (const resolver of cfg.resolvers)
        if (await resolver(asset)) return;
    asset.main = resolveMain(asset.syntax.url);
    asset.poster = resolvePoster(asset.syntax.url);
    asset.spec = resolveSpec(asset.syntax.spec);
}

function resolveMain(url: string): ResolvedContent | undefined {
    if (isYouTube(url)) return undefined;
    return { src: url };
}

function resolvePoster(url: string): ResolvedContent | undefined {
    if (!isYouTube(url)) return undefined;
    return { src: `https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg` };
}

function resolveSpec(query?: string): AssetSpec {
    if (!query) return {};
    const params = new URLSearchParams(query);
    return {
        eager: params.has("eager") ? true : undefined,
        merge: params.has("merge") ? true : undefined,
        width: params.has("width") ? parseInt(params.get("width")!) : undefined,
        media: params.get("media") ?? undefined
    };
}
