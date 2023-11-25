import { Options } from "./options";
import { defaults } from "./defaults";

export * from "./options";
export { defaults } from "./defaults";

/** User-defined build preferences. */
export type Prefs = { [P in keyof Options]?: Partial<Options[P]>; };

/** Current active build server configuration. */
export const cfg: Readonly<Options> = defaults;

/** Specifies build server configuration. */
export function configure(prefs: Prefs) {
    for (const prop of Object.getOwnPropertyNames(prefs))
        merge(prefs, cfg, prop);
}

function merge(from: Record<string, unknown>, to: Record<string, unknown>, prop: string) {
    if (!isSubOptions(from[prop])) to[prop] = from[prop];
    else for (const sub of Object.getOwnPropertyNames(from[prop]))
        merge(<never>from[prop], <never>to[prop], sub);
}

function isSubOptions(obj: unknown): obj is Record<string, unknown> {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
