import { config } from "./config";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function ensureDir(dir: string) {
    const fs = config.platform.fs;
    if (!fs.exists(dir)) fs.mkdir(dir);
}
