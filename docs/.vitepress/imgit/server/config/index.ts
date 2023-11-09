import { Options } from "./options";
import { defaults } from "./defaults";

/** Current active build server configuration. */
export const config = { ...defaults };

/** Set current active build server configuration. */
export function configure(options: Options) {
    for (const prop in options)
        if (config.hasOwnProperty(prop) && options[prop] !== undefined)
            (<Record<string, unknown>>config)[prop] = options[prop];
}
