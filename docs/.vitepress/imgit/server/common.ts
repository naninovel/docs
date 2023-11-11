import { platform } from "./platform";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function ensureDir(dir: string) {
    if (!platform.fs.exists(dir))
        platform.fs.mkdir(dir);
}
