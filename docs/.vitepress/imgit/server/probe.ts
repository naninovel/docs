import { exec, ExecException } from "node:child_process";
import { options } from "./options";
import { cache } from "./cache";

export type MediaInfo = {
    width: number;
    height: number;
};

type ProbeArgs = {
    filepath: string;
    resolve: (info: MediaInfo) => void;
    error: (ExecException | null);
    out: string;
}

const resolves = new Map<string, Promise<MediaInfo>>;

export async function probe(filepath: string): Promise<MediaInfo> {
    if (cache.media.hasOwnProperty(filepath)) return cache.media[filepath];
    if (resolves.has(filepath)) return resolves.get(filepath)!;
    let resolve: (value: (MediaInfo)) => void;
    resolves.set(filepath, new Promise<MediaInfo>(r => resolve = r));
    exec(`ffprobe ${options.probe.args} "${filepath}"`,
        (error, out) => handleProbe({ filepath, resolve, error, out }));
    return resolves.get(filepath)!;
}

function handleProbe({ error, filepath, out, resolve }: ProbeArgs) {
    if (error) options.log?.err?.(`error: ${error.message}`);
    const info = parseOut(out);
    cache.media[filepath] = info;
    resolve(info);
}

function parseOut(out: string): MediaInfo {
    if (!out?.includes("x")) return { width: 0, height: 0 };
    const parts = out.split("x");
    return { width: Number(parts[0]), height: Number(parts[1]) };
}
