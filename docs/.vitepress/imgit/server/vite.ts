import { Plugin } from "vite";
import { transform } from "./transform";
import { configure, Options } from "./options";

export type ViteOptions = Options & {
    /** Extension of the source files to transform. */
    ext?: string,
    /** Force the plugin to run either before are after other plugins. */
    enforce?: "pre" | "post"
};

export default function (options?: ViteOptions): Plugin {
    if (options) configure(options);
    return {
        name: "imgit",
        enforce: options?.enforce,
        transform: handleTransform
    };

    async function handleTransform(source: string, filename: string): Promise<string> {
        if (!options?.ext || filename.endsWith(options.ext))
            return await transform(source);
        return source;
    }
};
