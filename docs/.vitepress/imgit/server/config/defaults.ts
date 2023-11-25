import { Options } from "./options";
import { logTTY } from "../common";
import * as cache from "../cache";
import { ffprobe, ffmpeg } from "../encoder";
import { capture } from "../transform/1-capture";
import { download } from "../transform/2-download";
import { probe } from "../transform/3-probe";
import { encode } from "../transform/4-encode";
import * as builds from "../transform/5-build";
import { rewrite } from "../transform/6-rewrite";

/** Default build server configuration. */
export const defaults: Readonly<Options> = {
    root: "./public/assets",
    host: "/assets",
    serve: path => `${defaults.host}/${path}`,
    regex: [/!\[(?<title>.*?)(?<meta>{.+?})?]\((?<url>.+?)\)/g],
    image: ["png", "jpg", "jpeg", "webp", "avif", "bmp", "tif", "tiff", "tga", "psd"],
    animation: ["gif", "apng"],
    video: ["mp4", "webm"],
    youtube: true,
    poster: "auto",
    width: null,
    log: {
        info: logTTY,
        warn: console.warn,
        err: console.error
    },
    cache: {
        save: cache.save,
        load: cache.load,
        root: "./node_modules/.cache/imgit"
    },
    download: {
        root: "./public/assets/remote",
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        encoder: { probe: ffprobe, encode: ffmpeg },
        image: { quality: 1, speed: 0.6 },
        animation: { quality: 1, speed: 0.6 },
        video: { quality: 0.5, speed: 0.6 },
        poster: { quality: 0.3, speed: 0.6, scale: 0.1, blur: 0.2, suffix: "-poster" },
        suffix: "-imgit"
    },
    build: {
        image: builds.buildImage,
        animation: builds.buildAnimation,
        video: builds.buildVideo,
        youtube: builds.buildYouTube,
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
    },
    transform: {
        capture,
        download,
        probe,
        encode,
        build: builds.build,
        rewrite
    }
};
