/** Low-level APIs used by the plugin. */
export type Platform = Record<string, unknown> & {
    /** Local file system access APIs. */
    fs: {
        /** Returns whether directory or file with specified path exists. */
        exists: (path: string) => Promise<boolean>;
        /** Returns last modified time of the file with specified path, in ms since epoch. */
        stat: (path: string) => Promise<{ modified: number }>;
        /** Returns UTF-8 encoded content of text file with specified path. */
        read: (path: string) => Promise<string>;
        /** Writes UTF-8 encoded string or stream to the file with specified path. */
        write: (path: string, content: string | ReadableStream) => Promise<void>;
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
};
