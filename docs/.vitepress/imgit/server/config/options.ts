import { Plugin } from "./plugin";

/** Configures server behaviour. */
export type Options = {
    /** Local directory under which project's static files are stored. Required to resolve
     *  file paths of relative content sources; <code>./public</code> by default. */
    root: string;
    /** Regular expressions to use for capturing transformed assets syntax.
     *  Expects <code><url></code>, <code><alt></code> and <code><spec></code> capture groups
     *  (alt and spec are optional). By default, captures Markdown image syntax with spec defined as
     *  query params after alt: <code>!\[(?<alt>.*?)(?<spec>\?\S+?)?]\((?<url>\S+?)\)</code> */
    regex: RegExp[];
    /** Image source to show while content is loading. When cover generation is enabled in encode options,
     *  will use specified source as a fallback for legacy browsers, otherwise will use the
     *  source for all covers. Empty base64-encoded image is used by default for compatibility;
     *  assign <code>null</code> to disable covers completely. */
    cover: string | null;
    /** Default width threshold for the transformed assets, in pixels. When source asset is larger,
     *  will downscale it while preserving the original aspect. In case the source is 2x or larger,
     *  will as well generate additional "dense" variant that will be shown on high-dpi displays.
     *  This option is ignored when asset has width explicitly assigned via spec syntax. */
    width: number | null;
    /** Configure logging; assign <code>null</code> to disable logging. */
    log: LogOptions | null;
    /** Configure build artifacts caching; assign <code>null</code> to disable caching. */
    cache: CacheOptions | null;
    /** Configure remote content fetching. */
    fetch: FetchOptions;
    /** Configure content encoding. */
    encode: EncodeOptions;
    /** External imgit extensions; use to override or extend server behaviour. */
    plugins?: Plugin[];
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
    /** Local directory where the build cache files are stored. When building static apps (SPA) on CI,
     *  consider checking-in the cache directory to boost remote build processes;
     *  <code>./node_modules/.cache/imgit</code> by default. */
    root: string;
}

/** Configures remote assets downloading behaviour. */
export type FetchOptions = {
    /** Local directory to store downloaded remote content files;
     *  <code>./node_modules/.cache/imgit/fetched</code> by default. */
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
    /** Local directory to store encoded content and generated files, such as covers;
     *  <code>./node_modules/.cache/imgit/encoded</code> by default. */
    root: string;
    /** Encode parameters mapped by content MIME type; matched in order. */
    specs: [string | Readonly<RegExp>, Readonly<EncodeSpec>][];
    /** Configure cover generation; specify <code>null</code> to disable per-asset cover generation. */
    cover: EncodeSpec & {
        /** Tag to append to the names of generated cover files; <code>-cover</code> by default. */
        suffix: string;
    } | null;
    /** Configure safe files generation, that is fallbacks used in case source content is not considered
     *  compatible with legacy or any browsers, such as AVIF or PSD; specify <code>null</code> to disable. */
    safe: {
        /** MIME content types considered safe or compatible with most browsers. When source asset content is
         *  not of the specified type, will create a fallback content with a compatible type; otherwise will
         *  use source content for fallback. */
        types: (string | Readonly<RegExp>)[]
        /** Tag to append to the names of generated safe files; <code>-safe</code> by default. */
        suffix: string;
    } | null;
    /** Configure dense files generation, that is variants with 2x the resolution of the main content
     *  shown on high-dpi displays. Dense variants are generated when either global or per-asset spec
     *  "width" option is specified with value less than the source content width by 2x or more;
     *  assign <code>null</code> to disable dense file generation. */
    dense: {
        /** Tag to append to the names of generated dense files; <code>-dense</code> by default. */
        suffix: string;
    } | null;
    /** Tag to append to the names of all the encoded/generated files; <code>-imgit</code> by default. */
    suffix: string;
};

/** Configures transformation to use when encoding. */
export type EncodeSpec = {
    /** Video codec to use; detects automatically based on out file extension when not specified. */
    codec?: string;
    /** Select frame with specified index (0-based) instead of encoding full stream. */
    select?: number;
    /** Scale to the specified ratio preserving the aspect. */
    scale?: number;
    /** Apply blur with intensity in 0.0 to 1.0 range. */
    blur?: number;
};
