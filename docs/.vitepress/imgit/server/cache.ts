import { existsSync, readFileSync, writeFileSync } from "fs";
import { AssetSize } from "./asset";
import { ensureDir } from "./common";
import { config } from "./config";

export const cache = {
    size: {} as Record<string, AssetSize>
};

const files = {
    size: `${config.cache}/size.json`
} as Record<string, string>;

export function load() {
    for (const prop in files)
        if (existsSync(files[prop]))
            (<Record<string, unknown>>cache)[prop] = readCached(files[prop]);
}

export function save() {
    ensureDir(config.cache);
    for (const prop in files)
        writeCached(files[prop], (<Record<string, unknown>>cache)[prop]);
}

function readCached(file: string) {
    return JSON.parse(readFileSync(file, "utf-8"));
}

function writeCached(file: string, object: unknown) {
    return writeFileSync(file, JSON.stringify(object), "utf-8");
}
