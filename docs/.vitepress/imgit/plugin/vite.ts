import { Plugin } from "vite";
import { boot, exit, transform, Options } from "../server";

/** Configures plugin behaviour. */
export type ViteOptions = Options & {
    /** Extension of the source files to transform; transforms all files by default. */
    ext?: string,
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post"
};

/** Creates imgit plugin instance for vite. */
export default function (options?: ViteOptions): Plugin {
    boot(options);
    const skip = (id: string) => options?.ext && !id.endsWith(options.ext);
    return {
        name: "imgit",
        enforce: options?.enforce,
        transform: (code, id) => skip(id) ? code : transform(code),
        buildEnd: exit
    };
};
