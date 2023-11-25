import { Options } from "./options";
import { defaults } from "./defaults";

export { defaults } from "./defaults";
export * from "./options";

/** User-defined build preferences. */
export type Prefs = { [P in keyof Options]?: Partial<Options[P]>; };

/** Current active build server configuration. */
export const cfg: Readonly<Options> = defaults;

/** Specifies build server configuration. */
export function configure(prefs: Prefs) {
    for (const prop of Object.getOwnPropertyNames(prefs))
        assign(prefs, cfg, prop);
}

function assign(from: Record<string, unknown>, to: Record<string, unknown>, prop: string) {
    if (typeof from[prop] === "object")
        for (const inner of Object.getOwnPropertyNames(from[prop]))
            assign(<never>from[prop], <never>to[prop], inner);
    else to[prop] = from[prop];
}
