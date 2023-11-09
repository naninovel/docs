import fs from "fs";
import path from "path";
import { AssetSize } from "./asset";
import { ensureDir } from "./common";
import { config } from "./config";

export const cache = {
    size: {} as Record<string, AssetSize>
};

export function load() {
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        if (fs.existsSync(filepath))
            (<Record<string, unknown>>cache)[prop] = read(filepath);
    }
}

export function save() {
    ensureDir(config.cache);
    for (const prop of Object.getOwnPropertyNames(cache)) {
        const filepath = buildCacheFilePath(prop);
        write(filepath, (<Record<string, unknown>>cache)[prop]);
    }
}

function read(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

function write(filepath: string, object: unknown) {
    return fs.writeFileSync(filepath, JSON.stringify(object), "utf-8");
}

function buildCacheFilePath(prop: string) {
    return path.join(config.cache, `${prop}.json`);
}
