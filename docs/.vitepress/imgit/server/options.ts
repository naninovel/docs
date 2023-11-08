import { CapturedAsset, FetchedAsset, ProbedAsset, EncodedAsset, BuiltAsset } from "./asset";

/** Configures plugin behaviour. */
export type Options = Record<string, unknown> & {
    /** Local directory where the asset files are stored; <code>./public/assets</code> by default. */
    local?: string;
    /** URL prefix for served asset sources: relative to host or absolute when serving from a CDN;
     *  <code>/assets</code> by default. */
    serve?: string;
    /** Regular expression to use for capturing transformed assets syntax.
     *  Expects <code>title</code> and <code>uri</code> capture groups.
     *  By default, captures Markdown image syntax: <code>/!\[(?<title>.*?)]\((?<uri>.+?)\)/g</code>. */
    regex?: RegExp;
    /** Text to append to the name of encoded asset files; <code>-imgit</code> by default. */
    suffix?: string;
    /** Width limit for the transformed assets, in pixels. When source asset is larger,
     *  will resize the content (given encoding is not disabled). No limit by default. */
    width?: number;
    /** File extensions (w/o dot) to encode into av1 still frame under avif container
     *  and transform into HTML picture (with fallback to source); default: png, jpg, jpeg and gif. */
    image?: string[];
    /** File extensions (w/o dot) to encode into av1 video under mp4 container
     *  and transform into HTML video (with fallback to source); default: mp4. */
    video?: string[];
    /** Whether to transform YouTube links as videos; enabled by default. */
    youtube?: boolean;
    /** Source of an image to use for all video posters. When undefined automatically generates
     *  unique image for each video; assign <code>false</code> to disable posters completely. */
    poster?: string | boolean;
    /** Configure logging behaviour; assign <code>false</code> to disable logging. */
    log?: LogOptions | boolean;
    /** Configure remote assets fetching. */
    fetch?: FetchOptions;
    /** Configure assets encoding. */
    encode?: EncodeOptions;
    /** Configure HTML building for source assets of specific types. */
    build?: BuildOptions;
    /** Configure document transformation process. */
    transform?: TransformOptions;
};

/** Configures logging behaviour. */
export type LogOptions = {
    /** Logs informational message, such as which assets were downloaded and encoded;
     *  assign <code>false</code> to disable logging informational messages. */
    info?: ((msg: string) => void) | boolean;
    /** Logs warning message, such as a non-fatal issue with encoding process;
     *  assign <code>false</code> to disable logging warning messages. */
    warn?: ((msg: string) => void) | boolean;
    /** Logs error message associated with a failed procedure;
     *  assign <code>false</code> to disable logging error messages. */
    err?: ((msg: string) => void) | boolean;
};

/** Configures remote assets fetching behaviour. */
export type FetchOptions = {
    /** How long to wait when downloading remote asset, in seconds; 30 by default. */
    timeout?: number;
    /** How many times to restart the download when request fails; 3 by default. */
    retries?: number;
    /** How long to wait before restarting a failed download, in seconds; 6 by default.*/
    delay?: number;
};

/** Configures asset encoding and optimization. */
export type EncodeOptions = {
    /** ffmpeg arguments specified when encoding still image assets (png, jpg);
     *  assign <code>false</code> to disable images encoding. */
    image?: string | boolean;
    /** ffmpeg arguments specified when encoding animated image assets (gif);
     *  assign <code>false</code> to disable animated images encoding. */
    animation?: string | boolean;
    /** ffmpeg arguments specified when encoding video assets (mp4);
     *  assign <code>false</code> to disable video encoding.*/
    video?: string | boolean;
};

/** Configures HTML building for source assets of specific types. */
export type BuildOptions = {
    /** Returns HTML string for specified source image asset. */
    image?: (asset: EncodedAsset) => Promise<string>;
    /** Returns HTML string for specified source video asset. */
    video?: (asset: EncodedAsset) => Promise<string>;
    /** Returns HTML string for specified source YouTube asset. */
    youtube?: (asset: EncodedAsset) => Promise<string>;
};

/** Configures document transformation process. */
export type TransformOptions = {
    /** 1st phase: finds assets to transform in the document with specified file path and content. */
    capture?: (path: string, content: string) => Promise<CapturedAsset[]>;
    /** 2nd phase: fetches file content for the captured source assets from the specified document file path. */
    fetch?: (path: string, assets: CapturedAsset[]) => Promise<FetchedAsset[]>;
    /** 3rd phase: probes fetched files content to evaluate their width and height. */
    probe?: (path: string, assets: FetchedAsset[]) => Promise<ProbedAsset[]>;
    /** 4th phase: creates optimized versions of the source asset files. */
    encode?: (path: string, assets: ProbedAsset[]) => Promise<EncodedAsset[]>;
    /** 5th phase: builds HTML for the optimized assets to overwrite source syntax. */
    build?: (path: string, assets: EncodedAsset[]) => Promise<BuiltAsset[]>;
    /** 6th phase: rewrites content of the document with specified assets; returns modified document content. */
    rewrite?: (path: string, content: string, assets: BuiltAsset[]) => Promise<string>;
};

export const defaults = Object.freeze({
    local: "./public/assets",
    serve: "/assets",
    regex: /!\[(?<title>.*?)]\((?<uri>.+?)\)/g,
    suffix: "-imgit",
    width: undefined,
    image: ["png", "jpg", "jpeg", "gif"],
    video: ["mp4"],
    youtube: true,
    poster: undefined,
    fetch: {
        timeout: 30,
        retries: 3,
        delay: 6
    },
    encode: {
        image: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=4:quantizer=100:still_picture=true",
        animation: "-loglevel warning -stats -c:v librav1e -rav1e-params speed=6:quantizer=150",
        video: "-loglevel warning -stats -c:v libsvtav1 -preset 4"
    },
    build: {
        image: undefined,
        video: undefined,
        youtube: undefined
    },
    transform: {
        capture: undefined,
        fetch: undefined,
        probe: undefined,
        encode: undefined,
        build: undefined,
        rewrite: undefined
    }
});

export const options = { ...defaults };

export function configure(settings: Options) {
    for (const prop in settings)
        if (options.hasOwnProperty(prop))
            (<Record<string, unknown>>options)[prop] = settings[prop];
}
