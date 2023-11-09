import { configure } from "./config";
import { Options } from "./config/options";
import * as cache from "./cache";

export * from "./config/options";
export { transform } from "./transform";

/** Initializes build server with specified options.
 *  Expected to be invoked before any other server APIs. */
export function boot(options?: Options) {
    if (options) configure(options);
    cache.load();
}

/** De-initializes build server caching results for subsequent runs.
 *  Expected to be invoked before finishing the build process.  */
export function exit() {
    cache.save();
}
