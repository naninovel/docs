import { fileURLToPath } from "url";
import { EmbedAssets } from "./vite-embed";

/** @type import("vite").UserConfig */
export const Vite = {
    resolve: { alias: [override("NotFound", "not-found")] },
    plugins: [EmbedAssets({ serveDir: "/assets/remote", localDir: "./docs/public/assets/remote" })]
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
