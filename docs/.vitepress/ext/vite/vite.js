import { fileURLToPath } from "url";
import { EmbedAssets } from "./vite-embed";

/** @type import("vite").UserConfig */
export const Vite = {
    resolve: { alias: [override("NotFound", "not-found")] },
    plugins: [
        EmbedAssets({ assetsDir: "./docs/.vitepress/cache/.remote-assets" }),
        // A hack due to vite not resolving "data-source" attr: https://github.com/vitejs/vite/issues/5098
        {
            name: "data-source",
            transformIndexHtml: (html) => html.replace(
                new RegExp(/<source data-src="(.+?)"/g), "<source data-src=\"$1\" src=\"$1\"")
        }
    ]
};

/** https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
 *  @param {string} original
 *  @param {string} override
 *  @return import("vite").Alias */
function override(original, override) {
    return {
        find: new RegExp(`^.*\\/${original}\\.vue$`),
        replacement: fileURLToPath(new URL(`../../theme/${override}.vue`, import.meta.url))
    };
}
