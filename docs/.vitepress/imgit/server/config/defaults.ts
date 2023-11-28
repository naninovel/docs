import { Options } from "./options";
import { logTTY } from "../common";
import * as cache from "../cache";
import { ffprobe, ffmpeg } from "../encoder";
import { capture } from "../transform/1-capture";
import { resolve } from "../transform/2-resolve";
import { fetch } from "../transform/3-fetch";
import { probe } from "../transform/4-probe";
import { encode } from "../transform/5-encode";
import { build } from "../transform/6-build";
import { rewrite } from "../transform/7-rewrite";

/** Default build server configuration. */
export const defaults: Readonly<Options> = {
    root: "./public",
    regex: [/!\[(?<alt>.*?)(?<spec>\?\S+?)?]\((?<url>.+?)\)/g],
    resolvers: [],
    builders: [],
    servers: [],
    poster: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", // empty gif (smallest valid src)
    width: null,
    log: {
        info: logTTY,
        warn: console.warn,
        err: console.error
    },
    cache: {
        root: "./node_modules/.cache/imgit",
        save: cache.save,
        load: cache.load
    },
    fetch: {
        root: "./node_modules/.cache/imgit/fetched",
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        root: "./node_modules/.cache/imgit/encoded",
        encoder: { probe: ffprobe, encode: ffmpeg },
        specs: [
            [/^image\/.+/, { quality: 1, speed: 0.5 }],
            [/^video\/.+/, { quality: 0.5, speed: 0.5 }]
        ],
        poster: { quality: 0.3, speed: 0.5, select: 0, scale: 0.1, blur: 0.2, suffix: "-poster" },
        suffix: "-imgit"
    },
    transform: { capture, resolve, fetch, probe, encode, build, rewrite }
};
