import { Options } from "./options";
import { logTTY } from "../common";

/** Default build server configuration. */
export const defaults: Readonly<Options> = {
    root: "./public",
    regex: [/!\[(?<alt>.*?)(?<spec>\?\S+?)?]\((?<url>.+?)\)/g],
    width: null,
    log: {
        info: logTTY,
        warn: console.warn,
        err: console.error
    },
    cache: { root: "./node_modules/.cache/imgit" },
    fetch: {
        root: "./node_modules/.cache/imgit/fetched",
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        root: "./node_modules/.cache/imgit/encoded",
        specs: [
            // https://trac.ffmpeg.org/wiki/Encode/AV1#libaom
            [/^image\/(?:gif|apng)$/, { codec: "libaom-av1 -crf 23 -cpu-used 5" }],
            [/^image\/.+/, { codec: "libaom-av1 -still-picture 1 -crf 23 -cpu-used 5" }],
            [/^video\/.+/, { codec: "libaom-av1 -crf 45 -cpu-used 5" }]
        ],
        cover: {
            codec: "libaom-av1 -still-picture 1 -crf 23 -cpu-used 5",
            suffix: "-cover", select: 0, scale: 0.05, blur: 0.4
        },
        safe: {
            types: [
                /^image\/(?:png|jpeg|webp|gif|apng)$/,
                /^video\/(?:mp4|webm)$/
            ],
            suffix: "-safe"
        },
        dense: { suffix: "-dense" },
        suffix: "-imgit"
    },
    plugins: []
};
