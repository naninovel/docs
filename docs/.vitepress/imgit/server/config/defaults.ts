import { Options } from "./options";
import { capture } from "../transform/1-capture";
import { download } from "../transform/2-download";
import { probe } from "../transform/3-probe";
import { encode } from "../transform/4-encode";
import * as builds from "../transform/5-build";
import { rewrite } from "../transform/6-rewrite";

/** Default build server configuration. */
export const defaults: Readonly<Required<Options>> = {
    local: "./public/assets",
    cache: "./node_modules/.cache/imgit",
    serve: "/assets",
    remote: "remote",
    regex: /!\[(?<title>.*?)]\((?<uri>.+?)\)/g,
    suffix: "-imgit",
    width: null,
    image: ["png", "jpg", "jpeg"],
    animation: ["gif"],
    video: ["mp4"],
    youtube: true,
    poster: null,
    log: {
        info: console.info,
        warn: console.warn,
        err: console.error
    },
    download: {
        timeout: 30,
        retries: 3,
        delay: 6
    },
    probe: {
        args: "-loglevel error -select_streams v -show_entries stream=width,height -of csv=p=0:s=x"
    },
    encode: {
        image: "-loglevel error -still-picture 1 -crf 23 -cpu-used 6",
        animation: "-loglevel error -crf 63 -cpu-used 6",
        video: "-loglevel error -c:v libaom-av1 -crf 45 -cpu-used 6",
        poster: {
            args: "-loglevel error -still-picture 1 -crf 50 -cpu-used 6",
            filter: "boxblur=2"
        }
    },
    build: {
        image: builds.buildImage,
        animation: builds.buildAnimation,
        video: builds.buildVideo,
        youtube: builds.buildYouTube
    },
    transform: {
        capture,
        download,
        probe,
        encode,
        build: builds.build,
        rewrite
    },
    platform: <never>undefined
};
