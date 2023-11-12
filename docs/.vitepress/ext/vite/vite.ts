import { fileURLToPath } from "url";
import { UserConfig, Alias } from "vite";
import { defaults } from "../../imgit/server";
import imgit from "../../imgit/plugin/vite";

export const Vite: UserConfig = {
    plugins: [imgit({
        enforce: "pre",
        skip: (_, id) => !id.endsWith(".md"),
        local: "./docs/public/assets",
        cache: "./docs/public/assets/remote/.cache",
        width: 720,
        build: { // Hack for chrome. TODO: Remove after implementing posters w/o video.poster attribute.
            ...defaults.build,
            video: async asset => {
                const base = await defaults.build.video(asset);
                const mod = asset.sourceInfo.width > 720 ? 720 / asset.sourceInfo.width : 1;
                const width = Math.floor(asset.sourceInfo.width * mod);
                const height = Math.floor(asset.sourceInfo.height * mod);
                return base.replace("width=", `style="width: ${width}px; height: ${height}px;" width=`);
            }
        }
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
