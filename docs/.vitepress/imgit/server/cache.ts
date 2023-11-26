import { std, cfg, ensureDir } from "./common";
import { SourceInfo } from "./asset";

/** Cached results of the build operations.
 *  Each property is persisted between build runs;
 *  custom properties can be added when used from extensions. */
export type Cache = Record<string, unknown> & {
    /** Results of assets probing mapped by source asset URL. */
    probes: Record<string, SourceInfo | undefined>;
    /** Base64-encoded poster images mapped by source asset URL. */
    posters: Record<string, string>;
};

/** Default initial cache state. */
export const empty: Readonly<Cache> = { probes: {}, posters: {} };
/** Cached results of the build operations. */
export const cache: Cache = empty;

/** Persists specified cache instance for consequent runs. */
export async function save(cache: Cache): Promise<void> {
    if (!cfg.cache) return;
    await ensureDir(cfg.cache.root);
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        await write(filepath, (<Record<string, unknown>>cache)[prop]);
    }
}

/** Loads cache instance of a previous run. */
export async function load(): Promise<Cache> {
    const cache: Cache = empty;
    if (!cfg.cache) return cache;
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        if (await std.fs.exists(filepath))
            (<Record<string, unknown>>cache)[prop] = await read(filepath);
    }
    return cache;
}

async function read(filepath: string) {
    return JSON.parse(await std.fs.read(filepath, "utf8"));
}

function write(filepath: string, object: unknown) {
    return std.fs.write(filepath, JSON.stringify(object));
}

function buildCacheFilePath(prop: string) {
    return std.path.join(cfg.cache!.root, `${prop}.json`);
}
