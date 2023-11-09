import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { AssetSize } from "./asset";
import { ensureDir } from "./common";
import { config } from "./config";

export const cache = {
    size: {} as Record<string, AssetSize>
};

const files = {
    size: "size.json"
} as Record<string, string>;

export function load() {
    for (const prop of Object.getOwnPropertyNames(files)) {
        const path = files[prop] = join(config.cache, files[prop]);
        if (existsSync(path)) (<Record<string, unknown>>cache)[prop] = read(path);
    }
}

export function save() {
    ensureDir(config.cache);
    for (const prop of Object.getOwnPropertyNames(files))
        write(files[prop], (<Record<string, unknown>>cache)[prop]);
}

function read(filepath: string) {
    return JSON.parse(readFileSync(filepath, "utf-8"));
}

function write(filepath: string, object: unknown) {
    return writeFileSync(filepath, JSON.stringify(object), "utf-8");
}
