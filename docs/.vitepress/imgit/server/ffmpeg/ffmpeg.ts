import { ContentInfo } from "../asset";
import { EncodeSpec } from "../config";
import { std, cfg, ensureDir } from "../common";

export async function ffmpeg(path: string, out: string, info: ContentInfo, spec: EncodeSpec): Promise<void> {
    await ensureDir(std.path.dirname(out));
    const args = buildArgs(path, out, info, spec);
    const { err } = await std.exec(`ffmpeg ${args}`);
    if (err) cfg.log?.err?.(`ffmpeg error: ${err}`);
}

function buildArgs(path: string, out: string, info: ContentInfo, spec: EncodeSpec): string {
    // https://ffmpeg.org/ffmpeg.html
    const codec = spec.codec ? `-c:v ${spec.codec}` : null;
    const filter = buildFilter(info, spec);
    const map = info.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
    const specs = [codec, "-an", filter, map].filter(x => x).join(" ");
    return `-y -loglevel error -i "${(path)}" ${specs} "${out}"`;
}

function buildFilter(info: ContentInfo, spec: EncodeSpec): string | null {
    // https://trac.ffmpeg.org/wiki/FilteringGuide
    const select = spec.select !== undefined ? `select=eq(n\\,${spec.select})` : null;
    const scale = spec.scale ? `scale=iw*${spec.scale}:${spec.codec ? "-1" : "-2"}` : "copy";
    const box = spec.blur ? `boxblur=${evalBlur(spec.blur, info, spec.scale)}` : null;
    const rgb = [select, scale, box].filter(x => x).join(",");
    const a = [select, "alphaextract", scale, box].filter(x => x).join(",");
    return `-filter_complex "[0:v]${rgb}[rgb];${info.alpha ? `[0:v]${a}[a]` : ""}"`;
}

function evalBlur(ratio: number, info: ContentInfo, scale?: number): number {
    // boxblur must be less or equal min. input (width or height) divided by 2
    const max = (Math.min(info.width, info.height) * (scale ?? 1)) / 2;
    return Math.floor(lerp(0, max, ratio));
}

function lerp(a: number, b: number, w: number) {
    return a + w * (b - a);
}
