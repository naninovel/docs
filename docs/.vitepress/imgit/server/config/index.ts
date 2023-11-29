import { Options } from "./options";

export * from "./options";

/** Current active build server configuration. */
export const config: Readonly<Required<Options>> = <never>{};

/** Set current active build server configuration. */
export function configure(options: Options) {
    for (const prop of Object.getOwnPropertyNames(options))
        (<Record<string, unknown>>config)[prop] = options[prop];
}
