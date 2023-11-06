import { transform } from "./server/transform";
import { configure } from "./server/options";

/** @param {(import("./server/options").Options & { ext?: string, enforce?: "pre" | "post" })?} options
 *  @return {import("vite").Plugin} */
export default function (options = undefined) {
    if (options) configure(options);
    return {
        name: "vite-plugin-imgit",
        enforce: options?.enforce,
        transform: handleTransform
    };

    /** @param {string} source
     *  @param {string} filename
     *  @return {Promise<string>} */
    async function handleTransform(source, filename) {
        if (!options?.ext || filename.endsWith(options.ext))
            return await transform(source);
        return source;
    }
};
