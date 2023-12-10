import { EncodedAsset, BuiltAsset, EncodedContent, ContentInfo } from "../asset";
import { std, cfg, cache } from "../common";

/** Builds HTML for the optimized assets to overwrite source syntax. */
export async function buildAll(assets: EncodedAsset[]): Promise<BuiltAsset[]> {
    const merges = new Array<BuiltAsset>;
    for (let i = assets.length - 1; i >= 0; i--)
        if (assets[i].spec?.merge) merges.push(<BuiltAsset>assets[i]);
        else {
            if (!(await buildWithPlugins(<BuiltAsset>assets[i], merges)))
                await build(<BuiltAsset>assets[i], merges);
            merges.length = 0;
        }
    return <BuiltAsset[]>assets;
}

/** Default HTML builder for supported asset types (images and video). */
export async function build(asset: BuiltAsset, merges: BuiltAsset[]): Promise<void> {
    for (const merge of merges) merge.html = "";
    if (!asset.content) throw Error(`Failed to build HTML for '${asset.syntax.url}': missing content.`);
    if (asset.content.info.type.startsWith("image/")) return buildPicture(asset.content, asset, merges);
    if (asset.content.info.type.startsWith("video/")) return buildVideo(asset.content, asset, merges);
    throw Error(`Failed to build HTML for '${asset.syntax.url}': unknown type (${asset.content.info.type}).`);
}

/** Builds serve url for content file with specified full path based on configured root option. */
export function buildContentSource(path: string) {
    return `/${std.path.relative(cfg.root, std.path.dirname(path))}/${std.path.basename(path)}`;
}

async function buildWithPlugins(asset: BuiltAsset, merges: BuiltAsset[]): Promise<boolean> {
    if (!cfg.plugins) return false;
    for (const plugin of cfg.plugins)
        if (plugin.build && await plugin.build(asset, merges))
            return true;
    return false;
}

async function buildPicture(content: EncodedContent, asset: BuiltAsset, merges?: BuiltAsset[]): Promise<void> {
    const size = buildSizeAttributes(content.info);
    const lazy = asset.spec.eager == null;
    const load = lazy ? `loading="lazy" decoding="async"` : `decoding="sync"`;
    const cls = `imgit-picture ${asset.spec.class ?? ""}`;
    let sourcesHtml = await buildPictureSources(content, asset);
    if (merges) for (const merge of merges)
        if (merge.content) sourcesHtml += await buildPictureSources(merge.content, merge);
    sourcesHtml += `<img data-imgit-loadable alt="${asset.syntax.alt}" ${size} ${load}/>`;
    asset.html = `
<div class="${cls}" data-imgit-container>
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
    const cls = `imgit-video ${asset.spec.class ?? ""}`;
    // https://jakearchibald.com/2022/html-codecs-parameter-for-av1
    const codec = "av01.0.04M.08"; // TODO: Resolve actual spec at the encoding stage.
    asset.html = `
<div class="${cls}" data-imgit-container>
    <video data-imgit-loadable preload="none" loop autoplay muted playsinline ${size}>
        <source data-imgit-src="${encoded}" type="video/mp4; codecs=${codec}" ${media}/>
        <source data-imgit-src="${safe}" type="video/mp4"/>
    </video>
    ${await buildCover(asset, size, merges)}
</div>`;
}

async function buildCover(asset: BuiltAsset, size: string, merges?: BuiltAsset[]): Promise<string> {
    if (cfg.cover === null) return "";
    let html = asset.content.cover ? await buildCoverSource(asset, asset.content.cover) : "";
    if (merges) for (const merge of merges) if (merge.content.cover)
        html += await buildCoverSource(merge, merge.content.cover);
    html += `<img src="${cfg.cover ?? "//:0"}" alt="cover" ${size} decoding="sync"/>`;
    return `<picture class="imgit-cover">${html}</picture>`;
}

async function buildCoverSource(asset: BuiltAsset, path: string): Promise<string> {
    const data = await getCoverData(asset, path);
    const mediaAttr = asset.spec.media ? `media="${asset.spec.media}"` : "";
    return `<source srcset="${data}" type="image/avif" ${mediaAttr}/>`;
}

async function getCoverData(asset: BuiltAsset, path: string): Promise<string> {
    const data = !asset.dirty && cache.covers.hasOwnProperty(asset.syntax.url)
        ? cache.covers[asset.syntax.url]
        : cache.covers[asset.syntax.url] = await std.base64(await std.fs.read(path, "bin"));
    return `data:image/avif;base64,${data}`;
}

function buildSizeAttributes(info: ContentInfo): string {
    const mod = cfg.width && info.width > cfg.width ? cfg.width / info.width : 1;
    const width = Math.floor(info.width * mod);
    const height = Math.floor(info.height * mod);
    return `width="${width}" height="${height}"`;
}

async function serve(path: string, asset: BuiltAsset): Promise<string> {
    if (cfg.plugins) for (const plugin of cfg.plugins)
        if (plugin.serve) {
            const src = await plugin.serve(path, asset);
            if (src) return src;
        }
    return buildContentSource(path);
}
