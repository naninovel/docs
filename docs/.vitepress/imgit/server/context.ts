import { CapturedAsset } from "./asset";
import { MediaInfo } from "./encoder";

/** Shared mutable state of the current build operation. */
export const ctx = {
    /** Transformed asset arrays pool. */
    assets: new Array<CapturedAsset[]>,
    /** Fetched remote content mapped by source location (URL). */
    fetches: new Map<string, Promise<void>>(),
    /** Fetch retry count mapped by fetched content location (URL). */
    retries: new Map<string, number>(),
    /** Probing operations mapped by source content location (URL). */
    probes: new Map<string, Promise<MediaInfo>>,
    /** Encode operations mapped by source content location (URL) + encode target. */
    encodes: new Map<string, Promise<void>>
};

/** Resets context state. */
export function clear() {
    for (const assets of ctx.assets)
        assets.length = 0;
    ctx.fetches.clear();
    ctx.retries.clear();
    ctx.probes.clear();
    ctx.encodes.clear();
}
