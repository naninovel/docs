import { MediaInfo } from "../encoder";
import { EncodedAsset, BuiltAsset, EncodedContent } from "../asset";
import { std, cfg, cache } from "../common";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export async function build(assets: EncodedAsset[]): Promise<BuiltAsset[]> {
    const merges = new Array<BuiltAsset>;
    for (let i = assets.length - 1; i >= 0; i--)
        if (assets[i].spec.merge) merges.push(<BuiltAsset>assets[i]);
        else await buildAsset(<BuiltAsset>assets[i], merges).then(() => merges.length = 0);
    return <BuiltAsset[]>assets;
}

async function buildAsset(asset: BuiltAsset, merges: BuiltAsset[]): Promise<void> {
    for (const builder of cfg.builders)
        if (await builder(asset, merges)) return;
    for (const merge of merges) merge.html = "";
    if (!asset.main) throw Error(`Failed to build HTML for '${asset.syntax.url}': missing content.`);
    if (asset.main.info.type.startsWith("image/")) return buildPicture(asset.main, asset, merges);
    if (asset.main.info.type.startsWith("video/")) return buildVideo(asset.main, asset, merges);
    throw Error(`Failed to build HTML for '${asset.syntax.url}': unknown type (${asset.main.info.type}).`);
}

async function buildPicture(content: EncodedContent, asset: BuiltAsset, merges: BuiltAsset[]): Promise<void> {
    const size = buildSizeAttributes(content.info);
    const lazy = asset.spec?.eager == null;
    const load = lazy ? `loading="lazy" decoding="async"` : `decoding="sync"`;
    let sourcesHtml = await buildPictureSources(content, asset);
    for (const merge of merges)
        if (merge.main) sourcesHtml += await buildPictureSources(merge.main, merge);
    sourcesHtml += `<img data-imgit-loadable alt="${asset.syntax.alt}" ${size} ${load}/>`;
    asset.html = `
<div class="imgit-picture" data-imgit-container>
    <picture>${sourcesHtml}</picture>
    ${await buildCover(asset, size, merges)}
</div>`;
}

async function buildPictureSources(content: EncodedContent, asset: BuiltAsset) {
    const safe = await serve(content.safe ?? content.local, asset);
    const encoded = await serve(content.encoded, asset);
    const dense = content.dense && await serve(content.dense, asset);
    return buildPictureSource(encoded, "image/avif", dense, asset.spec.media) +
        buildPictureSource(safe, undefined, undefined, asset.spec.media);
}

function buildPictureSource(src: string, type?: string, dense?: string, media?: string): string {
    const srcset = `${src} 1x${dense ? `, ${dense} 2x` : ""}`;
    const mediaAttr = media ? `media="${media}"` : "";
    const typeAttr = type ? `type="${type}"` : "";
    return `<source srcset="${srcset}" ${typeAttr} ${mediaAttr}/>`;
}

async function buildVideo(content: EncodedContent, asset: BuiltAsset, merges: BuiltAsset[]): Promise<void> {
    const safe = await serve(content.safe ?? content.local, asset);
    const encoded = await serve(content.encoded, asset);
    const size = buildSizeAttributes(content.info);
    const media = asset.spec.media ? `media="${asset.spec.media}"` : "";
    // https://jakearchibald.com/2022/html-codecs-parameter-for-av1
    const codec = "av01.0.04M.08"; // TODO: Resolve actual spec at the encoding stage.
    asset.html = `
<div class="imgit-video" data-imgit-container>
    <video data-imgit-loadable preload="none" loop autoplay muted playsinline ${size}>
        <source data-imgit-src="${encoded}" type="video/mp4; codecs=${codec}" ${media}/>
        <source data-imgit-src="${safe}" type="video/mp4"/>
    </video>
    ${await buildCover(asset, size, merges)}
</div>`;
}

async function buildCover(asset: EncodedAsset, size: string, merges: BuiltAsset[]): Promise<string> {
    if (!cfg.cover) return "";
    const path = asset.poster?.cover ?? asset.main?.cover;
    let sourcesHtml = path ? await buildCoverSource(path, asset) : "";
    for (const merge of merges) {
        const path = merge.poster?.cover ?? merge.main?.cover;
        if (path && merge.main) sourcesHtml += await buildCoverSource(path, merge);
    }
    sourcesHtml += `<img src="${cfg.cover}" alt="cover" ${size} decoding="sync"/>`;
    return `<picture class="imgit-cover">${sourcesHtml}</picture>`;
}

async function buildCoverSource(path: string, asset: EncodedAsset): Promise<string> {
    const avif = await getCoverBase64(asset.syntax.url, path, asset.dirty);
    const mediaAttr = asset.spec.media ? `media="${asset.spec.media}"` : "";
    return `<source srcset="${avif}" type="image/avif" ${mediaAttr}/>`;
}

async function getCoverBase64(src: string, path: string, dirty?: boolean): Promise<string> {
    const data = !dirty && cache.covers.hasOwnProperty(src)
        ? cache.covers[src]
        : cache.covers[src] = await std.base64(await std.fs.read(path, "bin"));
    return `data:image/avif;base64,${data}`;
}

function buildSizeAttributes(info: MediaInfo): string {
    const mod = cfg.width && info.width > cfg.width ? cfg.width / info.width : 1;
    const width = Math.floor(info.width * mod);
    const height = Math.floor(info.height * mod);
    return `width="${width}" height="${height}"`;
}

async function serve(path: string, asset: EncodedAsset): Promise<string> {
    for (const server of cfg.servers) {
        const src = await server(path, asset);
        if (src) return src;
    }
    return `/${std.path.relative(cfg.root, std.path.dirname(path))}/${std.path.basename(path)}`;
}
