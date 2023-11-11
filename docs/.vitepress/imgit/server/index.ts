import { configure } from "./config";
import { Options, PlatformOptions } from "./config/options";
import { defaults } from "./config/defaults";
import * as cache from "./cache";

export { transform } from "./transform";
export { defaults };
export * from "./config/options";

/** Initializes build server with specified options.
 *  Expected to be invoked before any other server APIs. */
export async function boot(options?: Options): Promise<void> {
    const platform = await resolvePlatform();
    configure({ ...defaults, ...(options ?? []), platform });
    cache.load();
}

/** De-initializes build server caching results for subsequent runs.
 *  Expected to be invoked before finishing the build process.  */
export function exit(): void {
    cache.save();
}

async function resolvePlatform(options?: Options): Promise<PlatformOptions> {
    if (options?.platform) return options.platform;
    if (typeof process === "object" && "bun" in process.versions)
        return (await import("../platform/bun")).bun;
    if (typeof window === "object" && "Deno" in window)
        return (await import("../platform/deno")).deno;
    if (typeof process === "object" && "node" in process.versions)
        return (await import("../platform/node")).node;
    throw Error("Failed to detect JavaScript runtime; specify 'platform' via plugin options.");
}
