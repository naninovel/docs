import { Platform } from "./platform";

export type { Platform } from "./platform";

/** Current active platform. */
export const platform: Readonly<Platform> = <never>{};

/** Assigns platform bindings. */
export function bind(bindings: Platform) {
    for (const prop of Object.getOwnPropertyNames(bindings))
        (<Record<string, unknown>>platform)[prop] = bindings[prop];
}
