import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import imgit from "../../imgit/server/vite";

export const Vite: UserConfig = {
    plugins: [imgit({ ext: ".md", enforce: "pre", local: "./docs/public/assets/remote", serve: "/assets/remote" })],
    resolve: { alias: [override("NotFound", "not-found")] }
};

// https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
function override(original: string, override: string): Alias {
    return {
        find: new RegExp(`^.*\\/${original}\\.vue$`),
        replacement: fileURLToPath(new URL(`../../theme/${override}.vue`, import.meta.url))
    };
}
