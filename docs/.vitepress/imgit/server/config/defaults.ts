import { LogOptions } from "./options";
import { capture } from "../transform/1-capture";
import { download, buildLocalRoot } from "../transform/2-download";
import { probe } from "../transform/3-probe";
import { encode } from "../transform/4-encode";
import * as builds from "../transform/5-build";
import { rewrite } from "../transform/6-rewrite";

/** Default build server configuration. */
export const defaults = Object.freeze({
    local: "./public/assets",
    cache: "./node_modules/.cache/imgit",
    serve: "/assets",
    remote: "remote",
    regex: Object.freeze(/!\[(?<title>.*?)]\((?<uri>.+?)\)/g),
    suffix: "-imgit",
    width: undefined,
    image: Object.freeze(["png", "jpg", "jpeg"]),
    animation: Object.freeze(["gif"]),
    video: Object.freeze(["mp4"]),
    youtube: true,
    poster: undefined,
    log: Object.freeze({
        info: console.info,
        warn: console.warn,
        err: console.error
    }) as Readonly<LogOptions | null>,
    download: Object.freeze({
        timeout: 30,
        retries: 3,
        delay: 6,
        buildLocalRoot
    }),
    probe: Object.freeze({
        args: "-loglevel error -select_streams v -show_entries stream=width,height -of csv=p=0:s=x"
    }),
    encode: Object.freeze({
        image: "-loglevel error -still-picture 1 -crf 23 -cpu-used 6",
        animation: "-loglevel error -crf 63 -cpu-used 6",
        video: "-loglevel error -c:v libaom-av1 -crf 45 -cpu-used 6",
        poster: Object.freeze({
            args: "-loglevel error -still-picture 1 -crf 50 -cpu-used 6",
            blur: "boxblur=2"
        })
    }),
    build: Object.freeze({
        image: builds.buildImage,
        animation: builds.buildAnimation,
        video: builds.buildVideo,
        youtube: builds.buildYouTube,
        root: builds.buildServeRoot
    }),
    transform: Object.freeze({
        capture,
        download,
        probe,
        encode,
        build: builds.build,
        rewrite
    })
});
