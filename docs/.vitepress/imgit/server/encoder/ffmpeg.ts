import { std, cfg } from "../common";
import { ProbeResult, EncodeSpec } from "./encoder";

export async function ffmpeg(src: string, out: string, probe: ProbeResult, spec: EncodeSpec): Promise<void> {
    const { err } = await std.exec(`ffmpeg ${buildArgs()}`);
    if (err) cfg.log?.err?.(`ffmpeg error: ${err}`);

    function buildArgs(): string {
        // https://trac.ffmpeg.org/wiki/Encode/AV1
        const codec = out.endsWith(".avif") || out.endsWith(".mp4") ? "-c:v libaom-av1" : null;
        const crf = `-crf ${lerp(63, 23, spec.quality)}`;
        const cpu = `-cpu-used ${spec.speed * 10}`;
        const filter = buildFilter();
        const map = probe.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
        const specs = [codec, "-an", crf, cpu, filter, map].filter(x => x).join(" ");
        return `-y -loglevel error -i "${(src)}" ${specs} "${(out)}"`;
    }

    function buildFilter(): string | undefined {
        // https://trac.ffmpeg.org/wiki/FilteringGuide
        const select = spec.select ? `select=eq(n\\,${spec.select})` : null;
        const scale = spec.scale ? `scale=iw*${(spec.scale)}:-1` : "copy";
        const box = spec.blur ? `boxblur=${spec.blur * 10}` : null;
        const rgb = [select, scale, box].filter(x => x).join(",");
        const a = [select, "alphaextract", scale, box].filter(x => x).join(",");
        return `-filter_complex "[0:v]${rgb}[rgb];${probe.alpha ? `[0:v]${a}[a]` : ""}"`;
    }
}

function lerp(a: number, b: number, w: number) {
    return a + w * (b - a);
}
