/** Low-level APIs abstraction required by the plugin. */
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
