import { platform } from "./platform";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export async function ensureDir(dir: string) {
    if (!(await platform.fs.exists(dir)))
        await platform.fs.mkdir(dir);
}
