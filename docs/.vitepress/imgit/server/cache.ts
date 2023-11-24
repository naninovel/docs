import { platform } from "./platform";
import { config } from "./config";
import { SourceInfo, ensureDir } from "./common";

/** Cached results of a previous build operation. */
export type Cache = {
    /** Results of assets probing. */
    probes: Record<string, SourceInfo | undefined>
};

export async function load(): Promise<Cache> {
    const cache: Cache = { probes: {} };
    if (!config.cache) return cache;
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        if (await platform.fs.exists(filepath))
            (<Record<string, unknown>>cache)[prop] = await read(filepath);
    }
    return cache;
}

export async function save(cache: Cache): Promise<void> {
    if (!config.cache) return;
    await ensureDir(config.cache.root);
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        await write(filepath, (<Record<string, unknown>>cache)[prop]);
    }
}

async function read(filepath: string) {
    return JSON.parse(await platform.fs.read(filepath));
}

function write(filepath: string, object: unknown) {
    return platform.fs.write(filepath, JSON.stringify(object));
}

function buildCacheFilePath(prop: string) {
    return platform.path.join(config.cache!.root, `${prop}.json`);
}
