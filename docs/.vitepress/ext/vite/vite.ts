import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import imgit from "../../imgit/plugin/vite";

export const Vite: UserConfig = {
    plugins: [imgit({
        ext: ".md",
        enforce: "pre",
        local: "./docs/public/assets",
        cache: "./docs/public/assets/remote/.cache",
        width: 720
    })],
    resolve: { alias: [override("NotFound", "not-found")] }
};

// https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
function override(original: string, override: string): Alias {
    return {
        find: new RegExp(`^.*\\/${original}\\.vue$`),
        replacement: fileURLToPath(new URL(`../../theme/${override}.vue`, import.meta.url))
    };
}
