import { boot, exit, transform, Options } from "../server";

/** Configures vite plugin behaviour. */
export type ViteOptions = Options & {
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post";
    /** Specify condition when document shouldn't be transformed by the plugin. */
    skip?: (code: string, id: string, options?: { ssr?: boolean; }) => boolean;
};

declare interface VitePlugin {
    name: string;
    enforce?: "pre" | "post";
    buildStart?: (options: unknown) => Promise<void> | void;
    transform?: (code: string, id: string, options?: { ssr?: boolean; }) => Promise<string> | string;
    buildEnd?: (error?: Error) => void;
}

/** Creates imgit plugin instance for vite. */
export default function (options?: ViteOptions): VitePlugin {
    return {
        name: "imgit",
        enforce: options?.enforce,
        buildStart: _ => boot(options),
        transform: (code, id, opt) => options?.skip?.(code, id, opt) ? code : transform(code),
        buildEnd: exit
    };
};
