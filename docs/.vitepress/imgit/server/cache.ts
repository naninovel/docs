import { cfg } from "./config";
import { std } from "./platform";
import { SourceInfo, ensureDir } from "./common";

/** Cached results of a previous build operation.
 *  Each property is persisted throughout build runs;
 *  custom properties can be added when used from extensions. */
export type Cache = Record<string, unknown> & {
    /** Results of assets probing. */
    probes: Record<string, SourceInfo | undefined>
};

export async function load(): Promise<Cache> {
    const cache: Cache = { probes: {} };
    if (!cfg.cache) return cache;
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        if (await std.fs.exists(filepath))
            (<Record<string, unknown>>cache)[prop] = await read(filepath);
    }
    return cache;
}

export async function save(cache: Cache): Promise<void> {
    if (!cfg.cache) return;
    await ensureDir(cfg.cache.root);
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        await write(filepath, (<Record<string, unknown>>cache)[prop]);
    }
}

async function read(filepath: string) {
    return JSON.parse(await std.fs.read(filepath));
}

function write(filepath: string, object: unknown) {
    return std.fs.write(filepath, JSON.stringify(object));
}

function buildCacheFilePath(prop: string) {
    return std.path.join(cfg.cache!.root, `${prop}.json`);
}
