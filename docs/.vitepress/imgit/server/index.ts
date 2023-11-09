import { configure } from "./config";
import { Options } from "./config/options";
import { defaults } from "./config/defaults";
import * as cache from "./cache";

export { transform } from "./transform";
export * from "./config/options";

/** Initializes build server with specified options.
 *  Expected to be invoked before any other server APIs. */
export function boot(options?: Options) {
    configure(<never>{ ...defaults, ...(options ?? []) });
    cache.load();
}

/** De-initializes build server caching results for subsequent runs.
 *  Expected to be invoked before finishing the build process.  */
export function exit() {
    cache.save();
}
