import { EncodedAsset, BuiltAsset, SourceInfo, AssetType, Context } from "../common";
import { std } from "../platform";
import { cfg } from "../config";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export function build(assets: EncodedAsset[], ctx: Context): Promise<BuiltAsset[]> {
    return Promise.all(assets.map(a => buildAsset(a, ctx)));
}

async function buildAsset(asset: EncodedAsset, ctx: Context): Promise<BuiltAsset> {
    let html: string;
    if (asset.type === AssetType.Image) html = await cfg.build.image(asset, ctx);
    else if (asset.type === AssetType.Animation) html = await cfg.build.animation(asset, ctx);
    else if (asset.type === AssetType.Video) html = await cfg.build.video(asset, ctx);
    else html = await cfg.build.youtube(asset, ctx);
    return { ...asset, html };
}

export function buildImage(asset: EncodedAsset, ctx: Context): Promise<string> {
    return buildPicture(asset, ctx);
}

export function buildAnimation(asset: EncodedAsset, ctx: Context): Promise<string> {
    return buildPicture(asset, ctx);
}

export async function buildVideo(asset: EncodedAsset, ctx: Context): Promise<string> {
    const { src, encodedSrc, posterSrc } = await buildSources(asset, ctx);
    const cls = `class="${cfg.build.style.className.video}"`;
    const size = buildSizes(asset.sourceInfo);
    // https://jakearchibald.com/2022/html-codecs-parameter-for-av1
    const codec = "av01.0.04M.08"; // TODO: Resolve for each file in probe.
    return `
<div class="${cfg.build.style.className.container}">
    <video data-imgit-lazy preload="none" loop autoplay muted playsinline ${cls} ${size}>
        ${encodedSrc ? `<source data-src="${encodedSrc}" type="video/mp4; codecs=${codec}">` : ""}
        <source data-src="${src}" type="video/mp4">
    </video>
    ${posterSrc ? buildPoster(posterSrc, size) : ""}
</div>`;
}

export async function buildYouTube(asset: EncodedAsset): Promise<string> {
    const title = asset.title ?? "";
    const cls = `class="${cfg.build.style.className.youtube}"`;
    const id = asset.sourceUrl.split("youtube.com/watch?v=")[1];
    const source = `https://www.youtube-nocookie.com/embed/${id}`;
    return `
<div ${cls}>
    <iframe title="${title}" src="${source}" allowfullscreen></iframe>
</div>`;
}

async function buildPicture(asset: EncodedAsset, ctx: Context): Promise<string> {
    const { src, encodedSrc, encoded2xSrc, posterSrc } = await buildSources(asset, ctx);
    const alt = asset.title ?? "";
    const size = buildSizes(asset.sourceInfo);
    const cls = asset.type === AssetType.Image
        ? cfg.build.style.className.image
        : cfg.build.style.className.animation;
    const x2 = encoded2xSrc ? `, ${encoded2xSrc} 2x` : "";
    const lazy = asset.meta?.lazy !== false;
    const load = lazy ? `loading="lazy" decoding="async"` : `decoding="sync"`;
    const data = lazy ? `data-imgit-lazy` : "";
    return `
<div class="${cfg.build.style.className.container}">
    <picture>
        ${encodedSrc ? `<source srcset="${encodedSrc} 1x${x2}" type="image/avif"/>` : ""}
        <img ${data} src="${src}" alt="${alt}" class="${cls}" ${size} ${load}/>
    </picture>
    ${lazy && posterSrc ? buildPoster(posterSrc, size) : ""}
</div>`;
}

async function buildSources(asset: EncodedAsset, ctx: Context) {
    const src = await cfg.serve(relativeToRoot(asset.sourcePath!), asset, ctx);
    const encodedSrc = asset.encodedPath
        ? await cfg.serve(relativeToRoot(asset.encodedPath), asset, ctx)
        : undefined;
    const encoded2xSrc = asset.encoded2xPath
        ? await cfg.serve(relativeToRoot(asset.encoded2xPath), asset, ctx)
        : undefined;
    const posterSrc = asset.posterPath
        ? await cfg.serve(relativeToRoot(asset.posterPath), asset, ctx)
        : (cfg.poster === "auto" ? undefined : cfg.poster);
    return { src, encodedSrc, encoded2xSrc, posterSrc };
}

function relativeToRoot(path: string) {
    const root = std.path.resolve(cfg.root);
    return path.substring(root.length);
}

function buildSizes(info?: SourceInfo): string {
    if (!info) return "";
    const mod = cfg.width && info.width > cfg.width ? cfg.width / info.width : 1;
    const width = Math.floor(info.width * mod);
    const height = Math.floor(info.height * mod);
    return `width="${width}" height="${height}"`;
}

function buildPoster(src: string, size: string): string {
    const cls = cfg.build.style.className.poster;
    const avif = src.endsWith(".avif");
    const blank = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    return `
<picture data-imgit-poster>
    ${avif ? `<source srcset="${src}" type="image/avif"/>` : ""}
    <img src="${avif ? blank : src}" alt="poster" class="${cls}" ${size} decoding="sync"/>
</picture>`;
}
