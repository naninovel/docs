import { std } from "./platform";

export { std } from "./platform";
export { cfg } from "./config";
export { ctx } from "./context";
export { cache } from "./cache";

/** Creates specified directory in case it doesn't exist (recursive). */
export async function ensureDir(dir: string): Promise<void> {
    if (!(await std.fs.exists(dir)))
        await std.fs.mkdir(dir);
}

/** Returns extension (without dot) of file with specified path. */
export function getExtension(path: string): string {
    const start = path.lastIndexOf(".") + 1;
    if (start >= path.length) return "";
    return path.substring(start);
}

/** When stdout is TTY clears current line and writes the message; logs to console otherwise. */
export function logTTY(msg: string): void {
    if (!process?.stdout?.isTTY) {
        console.info(msg);
        return;
    }
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(msg);
}

/** Whether specified url is a valid YouTube video link. */
export function isYouTube(url: string): boolean {
    return url.includes("youtube.com/watch?v=");
}

/** Given valid url to a YouTube video, extracts video ID. */
export function getYouTubeId(url: string): string {
    return new URL(url).searchParams.get("v")!;
}
