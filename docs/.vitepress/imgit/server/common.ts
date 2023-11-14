import { platform } from "./platform";
import { config } from "./config";

export function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export async function ensureDir(dir: string) {
    if (!(await platform.fs.exists(dir)))
        await platform.fs.mkdir(dir);
}

export function buildLocalPath(url: string) {
    const path = platform.path;
    return path.resolve(buildLocalRoot(url), path.basename(url));
}

function buildLocalRoot(url: string): string {
    const path = platform.path;
    if (!url.startsWith(config.serve))
        return path.join(config.local, config.remote);
    const endIdx = url.length - path.basename(url).length;
    const subdir = url.substring(config.serve.length, endIdx);
    return path.join(config.local, subdir);
}
