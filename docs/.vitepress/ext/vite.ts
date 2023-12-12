import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import imgit from "imgit/vite";
import svg from "imgit/svg";
import youtube from "imgit/youtube";

export const vite: UserConfig = {
    plugins: [imgit({
        enforce: "pre",
        skip: (_, id) => !id.endsWith(".md"),
        width: 720,
        root: "./docs/public",
        cache: { root: "./docs/public/imgit" },
        fetch: { root: "./docs/public/imgit/fetched" },
        encode: { root: "./docs/public/imgit/encoded" },
        plugins: [svg(), youtube()]
    })],
    resolve: {
        alias: [
            override("NotFound", "not-found"),
            { find: /\.(:?tif|tiff|bmp|tga|psd|avi|mkv|mov)$/, replacement: ".webp" }
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
