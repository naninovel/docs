import { Cache } from "../cache";

/** Shared state of server. */
export type Context = {
    /** Cached results of the previous server runs. */
    cache: Cache;
    /** Fetch operations performed by the server during current run. */
    fetches: Array<Promise<void>>;
};
