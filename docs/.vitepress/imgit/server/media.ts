import { exec, ExecException } from "node:child_process";
import { options } from "./options";

export type MediaInfo = {
    width: number;
    height: number;
};

const resolves = new Map<string, Promise<MediaInfo>>;

export async function resolveMediaInfo(filepath: string): Promise<MediaInfo> {
    if (resolves.has(filepath)) return resolves.get(filepath)!;
    let resolve: (value: (MediaInfo)) => void;
    resolves.set(filepath, new Promise<MediaInfo>(r => resolve = r));
    exec(`ffprobe ${options.probe.args} "${filepath}"`,
        (err, out) => handleProbe(resolve, err, out));
    return resolves.get(filepath)!;
}

function handleProbe(resolve: (info: MediaInfo) => void, error: (ExecException | null), out: string) {
    if (error) options.log?.err?.(`error: ${error.message}`);
    resolve(parseOut(out));
}

function parseOut(out: string): MediaInfo {
    if (!out?.includes("x")) return { width: 0, height: 0 };
    const parts = out.split("x");
    return { width: Number(parts[0]), height: Number(parts[1]) };
}
