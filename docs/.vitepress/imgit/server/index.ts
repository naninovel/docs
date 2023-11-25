import { Prefs, configure, cfg } from "./config";
import { Platform, bind } from "./platform";
import { Context } from "./common";

export { Context } from "./common";
export { Prefs, defaults } from "./config";
export { Platform } from "./platform";
export { transform } from "./transform";

/** Creates new build context with specified options.
 *  @param prefs Plugin preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export async function boot(prefs?: Prefs, platform?: Platform): Promise<Context> {
    if (prefs) configure(prefs);
    await bind(platform);
    return {
        fetches: [],
        cache: cfg.cache ? await cfg.cache.load() : { probes: {} }
    };
}

/** De-initializes build server and caches results. */
export async function exit(ctx: Context): Promise<void> {
    if (cfg.cache) await cfg.cache.save(ctx.cache);
}
