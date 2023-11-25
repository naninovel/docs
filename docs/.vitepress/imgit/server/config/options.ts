import { Context, CapturedAsset, DownloadedAsset, ProbedAsset, EncodedAsset, BuiltAsset } from "../common";
import { Encoder } from "../encoder";
import { Cache } from "../cache";

/** Configures build behaviour. */
export type Options = {
    /** Local root directory under which project's asset files are stored;
     *  <code>./public/assets</code> by default. */
    root: string;
    /** Remote root directory under which asset files are served when deployed;
     *  <code>/assets</code> by default. */
    host: string;
    /** Given file path to an asset (relative to <code>root</code>), returns URL under which
     *  the asset will be served. Use to upload generated asset to a CDN and return designated URL
     *  or resolve relative URL when self-hosted; resolves to <code>{host}/{path}</code> by default. */
    serve: (path: string, asset: EncodedAsset, ctx: Context) => string | Promise<string>;
    /** Regular expressions to use for capturing transformed assets syntax. Expects <code><url></code>,
     *  <code><title></code> and <code><meta></code> capture groups (title and meta are optional).
     *  By default, captures Markdown image syntax with meta JSON specified after title:
     *  <code>/!\[(?<title>.*?(?<meta>{.+?})?)]\((?<url>.+?)\)/g</code>. */
    regex: RegExp[];
    /** Image file extensions (w/o dot) to optimize;
     *  default: png, jpg, jpeg, webp, avif, bmp, tif, tiff, tga and psd. */
    image: string[];
    /** Animation file extensions (w/o dot) to optimize; default: gif and apng. */
    animation: string[];
    /** Video file extensions (w/o dot) to optimize; default: mp4 and webm. */
    video: string[];
    /** Whether to transform YouTube links as videos; enabled by default. */
    youtube: boolean;
    /** Remote source of an image to use for all posters. When undefined automatically generates
     *  unique image for each asset; assign <code>null</code> to disable posters completely. */
    poster: string | null | "auto";
    /** Default width threshold for the transformed assets, in pixels. When source asset is larger,
     *  will downscale it while preserving the original aspect. In case the source is 2x or larger,
     *  images and animations will as well get additional variant for high-density displays.
     *  Default threshold is ignored when asset has individual threshold specified via meta syntax. */
    width: number | null;
    /** Configure logging behaviour; assign <code>null</code> to disable logging. */
    log: LogOptions | null;
    /** Configure caching behaviour; assign <code>null</code> to disable caching. */
    cache: CacheOptions | null;
    /** Configure remote assets downloading. */
    download: DownloadOptions;
    /** Configure assets encoding. */
    encode: EncodeOptions;
    /** Configure HTML building for source assets of specific types. */
    build: BuildOptions;
    /** Configure document transformation process. */
    transform: TransformOptions;
};

/** Configures logging behaviour. */
export type LogOptions = {
    /** Logs informational message, such as which assets were downloaded and encoded;
     *  assign <code>null</code> to disable logging informational messages. */
    info: ((msg: string) => void) | null;
    /** Logs warning message, such as a non-fatal issue with encoding process;
     *  assign <code>null</code> to disable logging warning messages. */
    warn: ((msg: string) => void) | null;
    /** Logs error message associated with a failed procedure;
     *  assign <code>null</code> to disable logging error messages. */
    err: ((msg: string) => void) | null;
};

/** Configures server cache. */
export type CacheOptions = {
    /** Local directory where the cache files are stored;
     *  <code>./node_modules/.cache/imgit</code> by default. */
    root: string;
    /** Persists specified cache instance for consequent run. */
    save: (cache: Cache) => Promise<void>;
    /** Loads cache instance of the previous run. */
    load: () => Promise<Cache>;
}

/** Configures remote assets downloading behaviour. */
export type DownloadOptions = {
    /** Local directory to store downloaded assets and optimized files generated for them;
     *  <code>./public/assets/remote</code> by default. */
    root: string;
    /** How long to wait when downloading remote asset, in seconds; 30 by default. */
    timeout: number;
    /** How many times to restart the download when request fails; 3 by default. */
    retries: number;
    /** How long to wait before restarting a failed download, in seconds; 6 by default.*/
    delay: number;
};

/** Configures assets encoding. */
export type EncodeOptions = {
    /** Implementation to probe and encode media files with; specify to swap ffmpeg used by default. */
    encoder: Encoder;
    /** Configure image encoding; specify <code>null</code> to disable image encoding. */
    image: EncodeQuality | null;
    /** Configure animation encoding; specify <code>null</code> to disable animation encoding. */
    animation: EncodeQuality | null;
    /** Configure animation encoding; specify <code>null</code> to disable animation encoding. */
    video: EncodeQuality | null;
    /** Configure poster encoding. */
    poster: PosterOptions;
    /** Tag to append to the names of encoded files; <code>-imgit</code> by default. */
    suffix: string;
};

/** Configures encoding quality. */
export type EncodeQuality = {
    /** File size to quality ratio, in 0.0 to 1.0 range; 0 - min. size, 1 - best quality. */
    quality: number;
    /** File size to speed ratio, in 0.0 to 1.0 range; 0 - min. size, 1 - fastest encoding. */
    speed: number;
};

/** Configures poster generation parameters. */
export type PosterOptions = EncodeQuality & {
    /** Scale modifier relative to the source asset to use for generated poster; 0.1 by default.
     *  Specify <code>null</code> to disable poster scaling. */
    scale: number | null;
    /** Blur strength applied to the posters, in 0.0 to 1.0 range; 0.2 by default.
     *  Specify <code>null</code> to disable poster blur. */
    blur: number | null;
    /** Tag to append to the names of generated poster files; <code>-poster</code> by default. */
    suffix: string;
};

/** Configures HTML building for source assets of specific types. */
export type BuildOptions = {
    /** Returns HTML string for specified source image asset. */
    image: (asset: EncodedAsset, ctx: Context) => Promise<string>;
    /** Returns HTML string for specified source animation asset. */
    animation: (asset: EncodedAsset, ctx: Context) => Promise<string>;
    /** Returns HTML string for specified source video asset. */
    video: (asset: EncodedAsset, ctx: Context) => Promise<string>;
    /** Returns HTML string for specified source YouTube asset. */
    youtube: (asset: EncodedAsset, ctx: Context) => Promise<string>;
    /** Configure generated CSS styles for built HTML. */
    style: StyleOptions;
};

/** Configures generated CSS styles. */
export type StyleOptions = {
    /** Class names assigned to generated HTML. */
    className: {
        /** Class name assigned to div containing generated HTML; imgit-container by default. */
        container: string;
        /** Class name assigned to generated images HTML; imgit-image by default. */
        image: string;
        /** Class name assigned to generated video HTML; imgit-video by default. */
        video: string;
        /** Class name assigned to generated animation HTML; imgit-animation by default. */
        animation: string;
        /** Class name assigned to generated YouTube HTML; imgit-youtube by default. */
        youtube: string;
        /** Class name assigned to generated poster HTML; imgit-poster by default. */
        poster: string;
    }
}

/** Configures document transformation process. */
export type TransformOptions = {
    /** 1st phase: finds assets to transform in the document with specified content. */
    capture: (content: string, ctx: Context) => Promise<CapturedAsset[]>;
    /** 2nd phase: downloads file content for the captured assets. */
    download: (assets: CapturedAsset[], ctx: Context) => Promise<DownloadedAsset[]>;
    /** 3rd phase: probes downloaded asset files to evaluate their width and height. */
    probe: (assets: DownloadedAsset[], ctx: Context) => Promise<ProbedAsset[]>;
    /** 4th phase: creates optimized versions of the source asset files. */
    encode: (assets: ProbedAsset[], ctx: Context) => Promise<EncodedAsset[]>;
    /** 5th phase: builds HTML for the optimized assets to overwrite source syntax. */
    build: (assets: EncodedAsset[], ctx: Context) => Promise<BuiltAsset[]>;
    /** 6th phase: rewrites content of the document with specified assets; returns modified document content. */
    rewrite: (content: string, assets: BuiltAsset[], ctx: Context) => Promise<string>;
};
