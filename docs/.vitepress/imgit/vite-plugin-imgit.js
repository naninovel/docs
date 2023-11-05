import { transform } from "./server/transform";
import { configure } from "./server/options";

/** @param {(import("./server/options").Options & { ext?: string, enforce?: "pre" | "post" })?} options
 *  @return {import("vite").Plugin} */
export default function (options = undefined) {
    if (options) configure(options);
    return {
        name: "vite-plugin-imgit",
        enforce: options?.enforce,
        transform(source, filename) {
            if (!options?.ext || filename.endsWith(options.ext))
                return transform(source);
            return source;
        }
    };
};
