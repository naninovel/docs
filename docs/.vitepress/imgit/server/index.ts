import { Options, configure } from "./config";
import { defaults } from "./config/defaults";
import { Platform, bind } from "./platform";
import * as cache from "./cache";

export { Platform } from "./platform";
export { transform } from "./transform";
export { defaults };
export * from "./config/options";

/** Initializes build server with specified options.
 *  Expected to be invoked before any other server APIs.
 *  @param options Plugin preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export async function boot(options?: Options, platform?: Platform): Promise<void> {
    configure({ ...defaults, ...(options ?? []) });
    await bind(platform);
    cache.load();
}

/** De-initializes build server caching results for subsequent runs.
 *  Expected to be invoked before finishing the build process.  */
export function exit(): void {
    cache.save();
}
