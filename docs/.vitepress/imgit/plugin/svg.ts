import { Plugin, std } from "../server";
import { CapturedAsset, BuiltAsset } from "../server/asset";

/** Adds support for inlining SVG assets with imgit.
 *  @example ![](/assets/diagram.svg) */
export default function (): Plugin {
    // Skipping probe and encode stages; we'll just embed SVG content into HTML.
    return { probe: isSvg, encode: isSvg, build };
};

function isSvg(asset: CapturedAsset): boolean {
    return asset.syntax.url.endsWith(".svg");
}

async function build(asset: BuiltAsset): Promise<boolean> {
    if (!isSvg(asset)) return false;
    const cls = `imgit-svg ${asset.spec.class ?? ""}`;
    const svg = await std.fs.read(asset.content.local, "utf8");
    asset.html = `<div class="${cls}" data-imgit-container>${svg}</div>`;
    return true;
}
