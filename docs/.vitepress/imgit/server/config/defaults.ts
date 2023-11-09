import { LogOptions } from "./options";
import { capture } from "../transform/1-capture";
import { download } from "../transform/2-download";
import { probe } from "../transform/3-probe";
import { encode } from "../transform/4-encode";
import { build, buildImage, buildAnimation, buildVideo, buildYouTube } from "../transform/5-build";
import { rewrite } from "../transform/6-rewrite";

/** Default build server configuration. */
export const defaults = Object.freeze({
    local: "./public/assets",
    cache: "./node_modules/.cache/imgit",
    serve: "/assets",
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
    fetch: Object.freeze({
        timeout: 30,
        retries: 3,
        delay: 6
    }),
    probe: Object.freeze({
        args: "-loglevel error -select_streams v -show_entries stream=width,height -of csv=p=0:s=x"
    }),
    encode: Object.freeze({
        image: "-loglevel error -c:v librav1e -rav1e-params speed=4:quantizer=100:still_picture=true",
        animation: "-loglevel error -c:v librav1e -rav1e-params speed=6:quantizer=150",
        video: "-loglevel error -c:v libsvtav1 -preset 4"
    }),
    build: Object.freeze({
        image: buildImage,
        animation: buildAnimation,
        video: buildVideo,
        youtube: buildYouTube
    }),
    transform: Object.freeze({
        capture,
        download,
        probe,
        encode,
        build,
        rewrite
    })
});
