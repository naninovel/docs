import { Platform, Prefs, Plugin, boot, exit, transform, std } from "../server";

/** Configures vite plugin behaviour. */
export type VitePrefs = Prefs & {
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post";
    /** Specify condition when document shouldn't be transformed by the plugin. */
    skip?: (code: string, id: string, options?: { ssr?: boolean; }) => boolean;
    /** Whether to inject imgit runtime JavaScript module to index HTML; enabled by default. */
    inject?: boolean;
};

// https://vitejs.dev/guide/api-plugin
declare type VitePlugin = {
    name: string;
    enforce?: "pre" | "post";
    buildStart?: (options: unknown) => Promise<void> | void;
    transform?: (code: string, id: string, options?: { ssr?: boolean; }) => Promise<string> | string;
    transformIndexHtml?: (html: string) => HtmlTagDescriptor[] | string;
    buildEnd?: (error?: Error) => Promise<void> | void;
};

// https://vitejs.dev/guide/api-plugin#transformindexhtml
declare type HtmlTagDescriptor = {
    tag: string;
    attrs?: Record<string, string | boolean>;
    children?: string | HtmlTagDescriptor[];
    injectTo?: "head" | "body" | "head-prepend" | "body-prepend";
};

/** Creates imgit plugin instance for vite.
 *  @param prefs Plugin preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export default function (prefs?: VitePrefs, platform?: Platform): VitePlugin {
    return {
        name: "imgit",
        enforce: prefs?.enforce,
        buildStart: _ => boot(prefs, platform),
        transform: (code, id, opt) => prefs?.skip?.(code, id, opt) ? code : transform(id, code),
        transformIndexHtml: html => prefs?.inject !== false ? inject(<never>prefs?.plugins) : html,
        buildEnd: exit
    };
};

function inject(plugins?: Plugin[]): HtmlTagDescriptor[] {
    const dir = std.path.dirname(std.path.fileUrlToPath(import.meta.url));
    const src = "/@fs/" + std.path.resolve(`${dir}/../client/index.ts`);
    const tags = [buildScriptTag(src)];
    if (plugins) for (const plugin of plugins) if (plugin.inject)
        tags.push(buildScriptTag("/@fs/" + plugin.inject()));
    return tags;
}

function buildScriptTag(src: string): HtmlTagDescriptor {
    return { tag: "script", injectTo: "body", attrs: { "type": "module", "src": src } };
}
