/** Shared mutable state of a build operation. */
export type Context = {
    /** Fetch operations performed during current build. */
    fetches: Array<Promise<void>>;
};

/** Shared mutable state of the current build operation. */
export const ctx: Context = { fetches: [] };
