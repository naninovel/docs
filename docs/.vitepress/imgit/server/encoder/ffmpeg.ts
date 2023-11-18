import { platform } from "../platform";
import { config } from "../config";
import { wait, getExtension } from "../common";
import { EncodeProps } from "./encoder";

const stillExt = new Set<string>(config.image);
const videoExt = new Set<string>(config.video);

export async function ffmpeg({ blur, input, output, probe: { alpha }, width }: EncodeProps): Promise<void> {
    const cmd = `ffmpeg ${buildArgs()}`;
    const { err } = await platform.exec(cmd);
    if (err) config.log?.err?.(`ffmpeg error: ${err}`);
    await wait(0.01); // Prevent oversaturating CPU utilization.

    function buildArgs(): string {
        const ext = getExtension(output);
        const codec = stillExt.has(ext) ? "-still-picture 1" : videoExt.has(ext) ? "-c:v libaom-av1" : "";
        const map = alpha ? `-map "[rgb]" -map "[a]"` : `-map "[rgb]"`;
        return `-i "${input}" -loglevel error -y ${codec} ${buildFilter()} ${map} "${output}"`;
    }

    function buildFilter(): string {
        const select = "select=eq(n\\,0)";
        const scale = width ? `scale=${width}:-1` : "";
        const box = blur ? `boxblur=${blur * 10}` : "";
        const rgb = `[0:v]${select},${scale},${blur}[rgb];`;
        const alpha = `[0:v]${select},alphaextract,${scale},${box}[a]`;
        return `-filter_complex "${rgb}${alpha ? alpha : ""}"`;
    }
}
