import { Platform } from "./platform";
export { Platform } from "./platform";

/** Current active platform APIs. */
export const std: Readonly<Platform> = <never>{};

/** Binds platform APIs or attempts to auto-detect when not specified. */
export async function bind(std?: Platform) {
    std ??= await detect();
    for (const prop of Object.getOwnPropertyNames(std))
        (<Record<string, unknown>>std)[prop] = std[prop];
}

async function detect(): Promise<Platform> {
    // TODO: Bundlers statically parse conditional imports choke on deno's url imports.
    // if (typeof Deno !== "undefined") return (await import("./deno")).deno;
    if (process.versions.bun) return (await import("./bun")).bun;
    if (process.versions.node) return (await import("./node")).node;
    throw Error("Failed to detect JavaScript runtime; specify 'platform' via plugin parameter.");
}
