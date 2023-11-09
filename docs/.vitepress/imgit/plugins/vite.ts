import { Plugin } from "vite";
import { boot, exit, transform, Options } from "../server";

/** Configures plugin behaviour. */
export type ViteOptions = Options & {
    /** Extension of the source files to transform. */
    ext?: string,
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post"
};

/** Creates imgit plugin instance for vite. */
export default function (options?: ViteOptions): Plugin {
    boot(options);
    return {
        name: "imgit",
        enforce: options?.enforce,
        transform: handleTransform,
        buildEnd: exit
    };

    async function handleTransform(source: string, filename: string): Promise<string> {
        if (!options?.ext || filename.endsWith(options.ext))
            return await transform(source);
        return source;
    }
};
