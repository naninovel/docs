import { existsSync, readFileSync, writeFileSync } from "fs";
import { AssetSize } from "./asset";
import { ensureDir } from "./common";
import { options } from "./options";

export const cache = {
    size: {} as Record<string, AssetSize>
};

const files = {
    size: `${options.cache}/size.json`
} as Record<string, string>;

export function load() {
    for (const prop in files)
        if (existsSync(files[prop]))
            (<Record<string, unknown>>cache)[prop] = readCached(files[prop]);
}

export function save() {
    ensureDir(options.cache);
    for (const prop in files)
        writeCached(files[prop], (<Record<string, unknown>>cache)[prop]);
}

function readCached(file: string) {
    return JSON.parse(readFileSync(file, "utf-8"));
}

function writeCached(file: string, object: unknown) {
    return writeFileSync(file, JSON.stringify(object), "utf-8");
}
