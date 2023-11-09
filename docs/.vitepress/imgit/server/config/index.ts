import { Options } from "./options";
import { defaults } from "./defaults";

/** Current active build server configuration. */
export const config: typeof defaults = <never>{};

/** Set current active build server configuration. */
export function configure(options: Options) {
    for (const prop of Object.getOwnPropertyNames(options))
        (<Record<string, unknown>>config)[prop] = options[prop];
}
