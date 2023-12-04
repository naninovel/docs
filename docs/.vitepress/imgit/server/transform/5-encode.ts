import { ProbedAsset, EncodedAsset, EncodedContent, ProbedContent } from "../asset";
import { MediaInfo, EncodeSpec } from "../encoder";
import { std, cfg, ctx, cache } from "../common";

/** Generates optimized versions of the source content files. */
export async function encode(assets: ProbedAsset[]): Promise<EncodedAsset[]> {
    await everythingIsFetched();
    for (const asset of assets)
        await encodeAsset(<EncodedAsset>asset);
    return <EncodedAsset[]>assets;
}

// Bundlers typically process files in parallel, so we end up encoding
// while some files are still downloading; encoding multiple files
// in parallel tend to oversaturate CPU utilization, which degrades fetching.
async function everythingIsFetched(): Promise<void> {
    let size = 0;
    while (size < ctx.fetches.size) {
        size = ctx.fetches.size;
        await Promise.all(ctx.fetches.values());
        await std.wait(0);
    }
}

async function encodeAsset(asset: EncodedAsset): Promise<void> {
    if (asset.main) {
        await encodeMain(asset.main, asset);
        await encodeSafe(asset.main, asset);
        await encodeDense(asset.main, asset);
    }
    if (asset.poster) await encodeCover(asset.poster, asset);
    else if (asset.main) await encodeCover(asset.main, asset);
}

async function encodeMain(content: EncodedContent, asset: EncodedAsset): Promise<void> {
    const spec = getSpec(content.info.type, content.info, asset.spec.width);
    if (!spec) throw Error(`Failed to get encoding spec for ${content.src}.`);
    const ext = content.info.type.startsWith("image/") ? "avif" : "mp4";
    content.encoded = buildEncodedPath(content, ext);
    await encodeContent(`${content.src}@main`, content.local, content.encoded, content.info, spec);
}

async function encodeSafe(content: EncodedContent, asset: EncodedAsset): Promise<void> {
    if (!cfg.encode.safe || isSafe(content.info.type, cfg.encode.safe.types)) return;
    const type = content.info.type.startsWith("image/") ? "image/webp" : "video/mp4";
    const spec = getSpec(type, content.info, asset.spec.width);
    if (!spec) return;
    spec.codec = undefined;
    const ext = type.substring(type.indexOf("/") + 1);
    content.safe = buildEncodedPath(content, ext, cfg.encode.safe.suffix);
    await encodeContent(`${content.src}@safe`, content.local, content.safe, content.info, spec);
}

async function encodeDense(content: EncodedContent, asset: EncodedAsset): Promise<void> {
    if (!cfg.encode.dense || !content.info.type.startsWith("image/")) return;
    const threshold = getThreshold(asset.spec.width);
    if (!threshold || content.info.width < threshold * 2) return;
    const spec = getSpec(content.info.type, content.info, asset.spec.width);
    if (!spec) return;
    spec.scale = undefined;
    content.dense = buildEncodedPath(content, "avif", cfg.encode.dense.suffix);
    await encodeContent(`${content.src}@dense`, content.local, content.dense, content.info, spec);
}

async function encodeCover(content: EncodedContent, asset: EncodedAsset): Promise<void> {
    if (!cfg.cover || !cfg.encode.cover) return;
    const scale = getScale(cfg.encode.cover, content.info, asset.spec.width);
    const spec = { ...cfg.encode.cover, scale };
    content.cover = buildEncodedPath(content, "avif", cfg.encode.cover.suffix);
    await encodeContent(`${content.src}@cover`, content.local, content.cover, content.info, spec);
}

async function encodeContent(key: string, path: string, out: string,
    info: MediaInfo, spec: EncodeSpec, dirty?: boolean): Promise<void> {
    if (!dirty && await cacheValid(key, out, spec)) return;
    if (ctx.encodes.has(key)) return ctx.encodes.get(key)!;
    cfg.log?.info?.(`Encoding ${key}`);
    const promise = cfg.encode.encoder.encode(path, out, info, spec);
    ctx.encodes.set(key, promise);
    await promise;
    cache.specs[key] = spec;
}

async function cacheValid(key: string, out: string, spec: EncodeSpec): Promise<boolean> {
    return await std.fs.exists(out) &&
        cache.specs.hasOwnProperty(key) &&
        equal(cache.specs[key], spec);
}

function equal(a: EncodeSpec, b: EncodeSpec): boolean {
    return a.select === b.select &&
        a.scale === b.scale &&
        a.blur === b.blur;
}

function isSafe(type: string, safe: (string | RegExp)[]): boolean {
    for (const regex of safe)
        if (new RegExp(regex).test(type))
            return true;
    return false;
}

function getSpec(type: string, info: MediaInfo, specWidth?: number): EncodeSpec | undefined {
    for (const [regex, spec] of cfg.encode.specs)
        if (new RegExp(regex).test(type))
            return { ...spec, scale: getScale(spec, info, specWidth) };
    return undefined;
}

function getScale(spec: EncodeSpec, info: MediaInfo, specWidth?: number) {
    const threshold = getThreshold(specWidth);
    const width = (threshold && threshold < info.width) ? threshold : info.width;
    return (spec.scale ?? 1) * (width / info.width);
}

function getThreshold(specWidth?: number): number | undefined {
    return specWidth ?? cfg.width ?? undefined;
}

function buildEncodedPath(content: ProbedContent, ext: string, suffix?: string) {
    const local = content.src.startsWith("/")
        ? content.local.substring(std.path.resolve(cfg.root).length + 2).replaceAll("/", "-")
        : std.path.basename(content.local);
    suffix ??= "";
    return `${std.path.resolve(cfg.encode.root)}/${local}${cfg.encode.suffix}${suffix}.${ext}`;
}
