import { CapturedAsset, ResolvedAsset, AssetSpec } from "../asset";
import { cfg, getExtension } from "../common";

/** Resolves type, content locations and specs of the captured syntax. */
export function resolve(assets: CapturedAsset[]): Promise<ResolvedAsset[]> {
    return Promise.all(assets.map(resolveAsset));
}

async function resolveAsset(asset: CapturedAsset): Promise<ResolvedAsset> {
    for (const resolver of cfg.resolvers) {
        const resolved = await resolver(asset);
        if (resolved) return resolved;
    }
    const type = resolveType(asset.syntax.url);
    const main = resolveMain(type, asset.syntax.url);
    const poster = resolvePoster(type, asset.syntax.url);
    const spec = resolveSpec(asset.syntax.spec);
    return { ...asset, type, remote: { main, poster }, spec };
}

function resolveType(url: string): string {
    if (url.includes("youtube.com/watch?v=")) return "youtube";
    const ext = getExtension(url).toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "tif" || ext === "tiff") return "image/tiff";
    if (ext === "png") return "image/png";
    if (ext === "webp") return "image/webp";
    if (ext === "avif") return "image/avif";
    if (ext === "bmp") return "image/bmp";
    if (ext === "tga") return "image/tga";
    if (ext === "psd") return "image/psd";
    if (ext === "gif") return "image/gif";
    if (ext === "apng") return "image/apng";
    if (ext === "mp4") return "video/mp4";
    if (ext === "webm") return "video/webm";
    cfg.log?.warn?.(`Failed to identify type of asset with '${url}' URL.`);
    return "unknown";
}

function resolveMain(type: string, url: string): string | undefined {
    if (type === "youtube") return undefined;
    return url;
}

function resolvePoster(type: string, url: string): string | undefined {
    if (type !== "youtube") return undefined;
    // ...
    return "";
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
