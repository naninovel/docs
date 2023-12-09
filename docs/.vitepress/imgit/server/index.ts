import { Prefs, configure, cfg } from "./config";
import { Platform, bind } from "./platform";
import * as cache from "./cache";
import { clear as clearContext } from "./context";

export { Platform, std } from "./platform";
export { Prefs, cfg, defaults } from "./config";
export { Plugin } from "./config/plugin";
export { ctx } from "./context";
export { Cache, cache } from "./cache";
export { transform } from "./transform";

/** Initializes build context with specified options.
 *  @param prefs Build preferences; will use pre-defined defaults when not assigned.
 *  @param platform Runtime APIs to use; will attempt to detect automatically when not assigned. */
export async function boot(prefs?: Prefs, platform?: Platform): Promise<void> {
    await bind(platform);
    if (prefs) configure(prefs);
    if (cfg.cache) Object.assign(cache, await cache.load());
}

/** Resets build context and caches results. */
export async function exit(): Promise<void> {
    clearContext();
    if (cfg.cache) await cache.save(cache.cache);
}
