import { transform } from "./transform";
import { configure } from "./options";

/** @typedef {import("./options.js").Options} Options */

/** @param {(Options & { ext?: string, enforce?: "pre" | "post" })?} options
 *  @return {import("vite").Plugin} */
export default function (options = undefined) {
    if (options) configure(options);
    return {
        name: "imgit",
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
