import fs from "node:fs";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function ensureDir(dir: string) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}
