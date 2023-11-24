import { Options, configure, config } from "./config";
import { defaults } from "./config/defaults";
import { Platform, bind } from "./platform";
import { Context } from "./common";

export { Platform } from "./platform";
export { transform } from "./transform";
export { defaults };
export * from "./config/options";
export * from "./common";

/** Creates new build server context with specified options.
 *  @param options Plugin preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export async function boot(options?: Options, platform?: Platform): Promise<Context> {
    configure({ ...defaults, ...(options ?? []) });
    await bind(platform);
    return {
        fetches: [],
        cache: config.cache ? await config.cache.load() : { probes: {} }
    };
}

/** De-initializes build server caching results for subsequent runs. */
export async function exit(ctx: Context): Promise<void> {
    if (config.cache) await config.cache.save(ctx.cache);
}
