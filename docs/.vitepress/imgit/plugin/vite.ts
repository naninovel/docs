import { Context, Platform, Prefs, boot, exit, transform } from "../server";

/** Configures vite plugin behaviour. */
export type VitePrefs = Prefs & {
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post";
    /** Specify condition when document shouldn't be transformed by the plugin. */
    skip?: (code: string, id: string, options?: { ssr?: boolean; }) => boolean;
};

declare type VitePlugin = {
    name: string;
    enforce?: "pre" | "post";
    buildStart?: (options: unknown) => Promise<void> | void;
    transform?: (code: string, id: string, options?: { ssr?: boolean; }) => Promise<string> | string;
    buildEnd?: (error?: Error) => Promise<void> | void;
}

/** Creates imgit plugin instance for vite.
 *  @param prefs Plugin preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export default function (prefs?: VitePrefs, platform?: Platform): VitePlugin {
    let ctx: Context;
    return {
        name: "imgit",
        enforce: prefs?.enforce,
        buildStart: async _ => void (ctx = await boot(prefs, platform)),
        transform: (code, id, opt) => prefs?.skip?.(code, id, opt) ? code : transform(code, ctx),
        buildEnd: _ => exit(ctx)
    };
};
