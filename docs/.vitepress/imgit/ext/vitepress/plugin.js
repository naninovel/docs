import { configure } from "../../core/options.js";
import { observeVideos } from "../../core/observe";
import { Plugin as MarkdownItPlugin } from "../markdown-it/plugin";
import { Plugin as VitePlugin } from "../vite/plugin";

/** @param {import("vitepress").UserConfig} config
 *  @param {import("../../core/options").options?} options
 *  @return {import("vitepress").UserConfig} */
export function installConfig(config, options = undefined) {
    if (options) configure(options);
    config.markdown.config = configMarkdownIt(config.markdown.config);
    config.vite.plugins?.push(VitePlugin());
    return config;
}

/** @param {import("vitepress").EnhanceAppContext} app */
export function installApp(app) {
    const existing = app.router.onAfterRouteChanged;
    app.router.onAfterRouteChanged = async to => {
        if (existing) await existing(to);
        void setTimeout(observeVideos, 0);
    };
}

function configMarkdownIt(config) {
    return (md) => {
        config?.(md);
        md.disable(["image"]);
        md.use(MarkdownItPlugin());
    };
}
