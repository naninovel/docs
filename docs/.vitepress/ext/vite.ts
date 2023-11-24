import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import { defaults } from "../imgit/server";
import imgit from "../imgit/plugin/vite";

export const vite: UserConfig = {
    plugins: [imgit({
        enforce: "pre",
        skip: (_, id) => !id.endsWith(".md"),
        local: "./docs/public/assets",
        cache: { ...defaults.cache!, root: "./docs/public/assets/remote/.cache" },
        width: 720
    })],
    resolve: {
        alias: [
            override("NotFound", "not-found"),
            { find: /\.(:?tif|tiff|bmp|tga|psd)$/, replacement: ".jpg" }
        ]
    }
};

// https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
function override(original: string, override: string): Alias {
    return {
        find: new RegExp(`^.*\\/${original}\\.vue$`),
        replacement: fileURLToPath(new URL(`../theme/${override}.vue`, import.meta.url))
    };
}
