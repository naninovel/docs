import { Options } from "./options";
import { defaults } from "./defaults";

export * from "./options";
export { defaults } from "./defaults";

/** User-defined build preferences. */
export type Prefs = { [P in keyof Options]?: Partial<Options[P]>; } & {
    /** External imgit extensions injected in order when configuring the build. */
    plugins?: Plugin[];
};

/** External imgit extension. */
export type Plugin = Pick<Partial<Options>, "regex" | "resolvers" | "builders" | "servers">

/** Current build configuration. */
export const cfg: Readonly<Options> = defaults;

/** Specifies current build configuration. */
export function configure(prefs: Prefs) {
    for (const prop of Object.getOwnPropertyNames(prefs))
        if (prop !== "plugins")
            merge(prefs, cfg, prop);
    if (prefs.plugins)
        for (const plugin of prefs.plugins)
            applyPlugin(plugin);
}

function merge(from: Record<string, unknown>, to: Record<string, unknown>, prop: string) {
    if (!isSubOptions(from[prop])) to[prop] = from[prop];
    else for (const sub of Object.getOwnPropertyNames(from[prop]))
        merge(<never>from[prop], <never>to[prop], sub);
}

function isSubOptions(obj: unknown): obj is Record<string, unknown> {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

function applyPlugin(plugin: Plugin) {
    if (plugin.regex) cfg.regex.push(...plugin.regex);
    if (plugin.resolvers) cfg.resolvers.push(...plugin.resolvers);
    if (plugin.builders) cfg.builders.push(...plugin.builders);
    if (plugin.servers) cfg.servers.push(...plugin.servers);
}
