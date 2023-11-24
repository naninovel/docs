import { Options } from "./options";
import { logTTY } from "../common";
import { ffprobe, ffmpeg } from "../encoder";
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
    regex: [/!\[(?<title>.*?)(?<meta>{.+?})?]\((?<uri>.+?)\)/g],
    suffix: "-imgit",
    width: null,
    image: ["png", "jpg", "jpeg", "webp", "avif", "bmp", "tif", "tiff", "tga", "psd"],
    animation: ["gif", "apng"],
    video: ["mp4", "webm"],
    youtube: true,
    poster: "auto",
    log: {
        info: logTTY,
        warn: console.warn,
        err: console.error
    },
    download: {
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        encoder: { probe: ffprobe, encode: ffmpeg },
        image: { quality: 1, speed: 0.6 },
        animation: { quality: 1, speed: 0.6 },
        video: { quality: 0.5, speed: 0.6 },
        poster: { quality: 0.3, speed: 0.6, scale: 0.1, blur: 0.2 }
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
    style: {
        className: {
            container: "imgit-container",
            image: "imgit-image",
            animation: "imgit-animation",
            video: "imgit-video",
            youtube: "imgit-youtube",
            poster: "imgit-poster"
        }
    }
};
