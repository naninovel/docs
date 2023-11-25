import { std } from "../platform";

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
