/** Low-level APIs used by the plugin. */
export type Platform = Record<string, unknown> & {
    /** Local file system access APIs. */
    fs: {
        /** Returns whether directory or file with specified path exists. */
        exists: (path: string) => boolean;
        /** Returns UTF-8 encoded content of text file with specified path. */
        read: (path: string) => string;
        /** Writes UTF-8 encoded content to the file with specified path. */
        write: (path: string, content: string) => void;
        /** Asynchronously writes specified byte stream to the file with specified path. */
        stream: (path: string, stream: ReadableStream<Uint8Array>) => Promise<void>;
        /** Deletes file with specified path. */
        remove: (path: string) => void;
        /** Creates directory with specified path (recursive). */
        mkdir: (path: string) => void;
    };
    /** File system path APIs. */
    path: {
        /** Joins specified path parts and normalizes the result. */
        join: (...paths: string[]) => string;
        /** Extracts file name with extension from specified path. */
        basename: (path: string) => string;
        /** Extracts directory name from specified path. */
        dirname: (path: string) => string;
    };
    /** Executes specified command in system shell. */
    exec: (cmd: string, onexit: (err: Error | null, out: string) => void) => void;
    // TODO: Fetch.
};

/** Current active platform. */
export const platform: Readonly<Platform> = <never>{};

/** Assigns platform APIs or attempts to auto-detect when not specified. */
export async function bind(api?: Platform) {
    api ??= await detect();
    for (const prop of Object.getOwnPropertyNames(api))
        (<Record<string, unknown>>platform)[prop] = api[prop];
}

async function detect(): Promise<Platform> {
    if (typeof process === "object" && "bun" in process.versions)
        return (await import("./bun")).bun;
    if (typeof window === "object" && "Deno" in window)
        return (await import("./deno")).deno;
    if (typeof process === "object" && "node" in process.versions)
        return (await import("./node")).node;
    throw Error("Failed to detect JavaScript runtime; specify 'platform' via plugin parameter.");
}
