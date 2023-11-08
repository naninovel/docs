import ffprobe from "ffprobe";
import probes from "ffprobe-static";

type MediaStream = {
    index: number,
    width: number,
    height: number
};

export type MediaInfo = {
    streams: MediaStream[]
};

const resolves = new Map<string, Promise<MediaInfo>>;

export async function resolveMediaInfo(filepath: string): Promise<MediaInfo> {
    if (resolves.has(filepath))
        return resolves.get(filepath)!;
    resolves.set(filepath, ffprobe(filepath, { path: probes.path }));
    return resolves.get(filepath)!;
}
