import { Cache } from "../cache";

/** Shared state of a build operation. */
export type Context = {
    /** Cached results of a previous build operation. */
    cache: Cache;
    /** Fetch operations performed during current build. */
    fetches: Array<Promise<void>>;
};
