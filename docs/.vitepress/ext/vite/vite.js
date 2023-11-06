import { fileURLToPath } from "url";
import imgit from "../../imgit/server/vite";

/** @type import("vite").UserConfig */
export const Vite = {
    plugins: [imgit({ ext: ".md", enforce: "pre", serveDir: "/assets/remote", localDir: "./docs/public/assets/remote" })],
    resolve: { alias: [override("NotFound", "not-found")] }
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
