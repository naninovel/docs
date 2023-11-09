import { Options, configure } from "./options";
import * as cache from "./cache";

export type { Options } from "./options";
export { transform } from "./transform";

export function boot(options?: Options) {
    if (options) configure(options);
    cache.load();
}

export function exit() {
    cache.save();
}
