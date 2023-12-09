import { Plugin } from "../server";
import { ResolvedAsset, BuiltAsset } from "../server/asset";

/** Adds support for SVG assets with imgit.
 *  Requires cover specified in imgit prefs to utilize lazy-load crossfade.
 *  @example ![](/assets/diagram.svg) */
export default function (): Plugin {
    return {
        resolvers: [resolve],
        builders: [build]
    };
};

function resolve(asset: ResolvedAsset): boolean {
    if (!isSvg(asset.syntax.url)) return false;
    asset.content = { src: asset.syntax.url };
    return true;
}

function build(asset: BuiltAsset): boolean {
    if (!isSvg(asset.syntax.url)) return false;
    const cls = `imgit-svg ${asset.spec?.class ?? ""}`;
    asset.html = `
<div class="${cls}" data-imgit-container>
    <object data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
</div>`;
    return true;
}

function isSvg(url: string): boolean {
    return url.endsWith(".svg");
}
