import { Platform } from "./platform";

export { Platform } from "./platform";

/** Current active platform. */
export const platform: Readonly<Platform> = <never>{};

/** Assigns platform APIs or attempts to auto-detect when not specified. */
export async function bind(api?: Platform) {
    api ??= await detect();
    for (const prop of Object.getOwnPropertyNames(api))
        (<Record<string, unknown>>platform)[prop] = api[prop];
}

async function detect(): Promise<Platform> {
    if (typeof window === "object" && "Deno" in window)
        return (await import("./deno")).deno;
    if (typeof process === "object" && "bun" in process.versions)
        return (await import("./bun")).bun;
    if (typeof process === "object" && "node" in process.versions)
        return (await import("./node")).node;
    throw Error("Failed to detect JavaScript runtime; specify 'platform' via plugin parameter.");
}
