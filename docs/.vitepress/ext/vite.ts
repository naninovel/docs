import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import imgit from "imgit/vite";
import svg from "imgit/svg";
import youtube from "imgit/youtube";

export const vite: UserConfig = {
    plugins: [imgit({
        width: 720,
        root: "./docs/public",
        cache: { root: "./docs/public/imgit" },
        fetch: { root: "./docs/public/imgit/fetched" },
        encode: { root: "./docs/public/imgit/encoded" },
        plugins: [svg(), youtube()]
    })],
    resolve: { alias: [override("NotFound", "not-found")] },
    build: { chunkSizeWarningLimit: 1024 } // local search index is ~600KB per locale
};

// https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
function override(original: string, override: string): Alias {
    return {
        find: new RegExp(`^.*\\/${original}\\.vue$`),
        replacement: fileURLToPath(new URL(`../theme/${override}.vue`, import.meta.url))
    };
}
