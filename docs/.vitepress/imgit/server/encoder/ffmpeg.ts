import { platform } from "../platform";
import { config } from "../config";
import { getExtension } from "../common";
import { EncodeProps } from "./encoder";

export async function ffmpeg(props: EncodeProps): Promise<void> {
    const { err } = await platform.exec(`ffmpeg ${buildArgs()}`);
    if (err) config.log?.err?.(`ffmpeg error: ${err}`);

    function buildArgs(): string {
        // https://trac.ffmpeg.org/wiki/Encode/AV1
        const still = isImage(props.input) ? "-still-picture 1" : null;
        const codec = isVideo(props.input) ? "-c:v libaom-av1" : null;
        const quality = `-crf ${lerp(63, 23, props.quality)} -cpu-used ${props.speed * 10}`;
        const filter = buildFilter();
        const map = props.probe.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
        const options = ["-loglevel error", "-y", still, codec, quality, filter, map].filter(x => x).join(" ");
        return `-i "${(props.input)}" ${options} "${(props.output)}"`;
    }

    function buildFilter(): string | undefined {
        // https://trac.ffmpeg.org/wiki/FilteringGuide
        const select = !isImage(props.input) && props.single ? "select=eq(n\\,0)" : null;
        const scale = props.width ? `scale=${(props.width)}:-1` : "copy";
        const box = props.blur ? `boxblur=${props.blur * 10}` : null;
        const rgb = [select, scale, box].filter(x => x).join(",");
        const a = [select, "alphaextract", scale, box].filter(x => x).join(",");
        return `-filter_complex "[0:v]${rgb}[rgb];${props.probe.alpha ? `[0:v]${a}[a]` : ""}"`;
    }
}

function isImage(path: string) {
    const xt = getExtension(path);
    return config.image.includes(xt);
}

function isVideo(path: string) {
    const xt = getExtension(path);
    return config.video.includes(xt);
}

function lerp(a: number, b: number, w: number) {
    return a + w * (b - a);
}
