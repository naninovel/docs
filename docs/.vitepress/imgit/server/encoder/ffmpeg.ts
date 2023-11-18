import { platform } from "../platform";
import { config } from "../config";
import { getExtension } from "../common";
import { EncodeProps } from "./encoder";

const stillXts = new Set<string>(config.image);
const videoXts = new Set<string>(config.video);

export async function ffmpeg(props: EncodeProps): Promise<void> {
    const xt = getExtension(props.input);
    const cmd = `ffmpeg ${buildArgs()}`;
    const { err } = await platform.exec(cmd);
    if (err) config.log?.err?.(`ffmpeg error: ${err}`);

    function buildArgs(): string {
        // https://trac.ffmpeg.org/wiki/Encode/AV1
        const codec = stillXts.has(xt) ? "-still-picture 1" : videoXts.has(xt) ? "-c:v libaom-av1" : null;
        const quality = `-crf ${lerp(63, 23, props.quality)} -cpu-used ${props.speed * 10}`;
        const filter = buildFilter();
        const map = props.probe.alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
        const options = ["-loglevel error", "-y", codec, quality, filter, map].filter(x => x).join(" ");
        return `-i "${(props.input)}" ${options} "${(props.output)}"`;
    }

    function buildFilter(): string | undefined {
        // https://trac.ffmpeg.org/wiki/FilteringGuide
        const select = !stillXts.has(xt) && props.single ? "select=eq(n\\,0)" : null;
        const scale = props.width ? `scale=${(props.width)}:-2` : "copy";
        const box = props.blur ? `boxblur=${props.blur * 10}` : null;
        const rgb = [select, scale, box].filter(x => x).join(",");
        const a = [select, "alphaextract", scale, box].filter(x => x).join(",");
        return `-filter_complex "[0:v]${rgb}[rgb];${props.probe.alpha ? `[0:v]${a}[a]` : ""}"`;
    }
}

function lerp(a: number, b: number, w: number) {
    return a + w * (b - a);
}
