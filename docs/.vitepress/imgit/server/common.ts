import { platform } from "./platform";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export async function ensureDir(dir: string): Promise<void> {
    if (!(await platform.fs.exists(dir)))
        await platform.fs.mkdir(dir);
}

export function getExtension(path: string): string {
    const start = path.lastIndexOf(".") + 1;
    if (start >= path.length) return "";
    return path.substring(start);
}

export function logTTY(msg: string): void {
    if (!process?.stdout?.isTTY) {
        console.info(msg);
        return;
    }
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(msg);
}
