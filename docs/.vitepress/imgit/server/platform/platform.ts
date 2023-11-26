/** Platform-specific APIs used in build operations. */
export type Platform = Record<string, unknown> & {
    /** Local file system access APIs. */
    fs: {
        /** Returns whether directory or file with specified path exists. */
        exists: (path: string) => Promise<boolean>;
        /** Returns last modified time of the file with specified path, in ms since epoch. */
        stat: (path: string) => Promise<{ modified: number }>;
        /** Returns content of the file with specified path and encoding. */
        read: <T extends "bin" | "utf8">(path: string, encoding: T)
            => Promise<T extends "bin" ? Uint8Array : string>;
        /** Writes binary array or UTF-8 encoded string to the file with specified path. */
        write: (path: string, content: Uint8Array | string) => Promise<void>;
        /** Deletes file with specified path. */
        remove: (path: string) => Promise<void>;
        /** Creates directory with specified path (recursive). */
        mkdir: (path: string) => Promise<void>;
    };
    /** File system path APIs. All results are expected with forward slashes (even on Windows). */
    path: {
        /** Joins specified path parts and normalizes the result. */
        join: (...paths: string[]) => string;
        /** Builds absolute path from specified parts and normalizes the result. */
        resolve: (...paths: string[]) => string;
        /** Extracts file name with extension from specified path. */
        basename: (path: string) => string;
        /** Extracts directory name from specified path and normalizes the result. */
        dirname: (path: string) => string;
    };
    /** Executes specified command in system shell. */
    exec: (cmd: string) => Promise<{ out: string, err?: Error }>;
    /** Fetches a remote resource with specified url. */
    fetch: (url: string, abort?: AbortSignal) => Promise<Response>;
    /** Returns promise resolved after specified number of seconds. */
    wait: (seconds: number) => Promise<void>;
    /** Encodes specified binary data to base64 string. */
    base64: (data: Uint8Array) => Promise<string>;
};
