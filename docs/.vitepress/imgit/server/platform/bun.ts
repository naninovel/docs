import fs from "node:fs/promises";
import path from "node:path";
import { Platform } from "./platform";

declare module Bun {
    // https://bun.sh/docs/api/file-io
    const file: (path: string) => {
        exists: () => Promise<boolean>;
        text: () => Promise<string>;
    };
    const write: (path: string, content: string | Blob) => Promise<number>;
    // https://bun.sh/docs/api/streams
    const readableStreamToBlob: (stream: ReadableStream) => Promise<Blob>;
    // https://bun.sh/docs/api/spawn
    const spawn: (cmd: string[]) => {
        exited: Promise<void>;
        exitCode: number;
        stdout: ReadableStream;
        stderr: ReadableStream;
    };
}

export const bun: Readonly<Platform> = {
    fs: {
        exists: path => Bun.file(path).exists(),
        read: path => Bun.file(path).text(),
        write: async (path, content) => {
            if (typeof content === "string") return Bun.write(path, content).then();
            return Bun.write(path, await Bun.readableStreamToBlob(content)).then();
        },
        remove: fs.unlink,
        mkdir: (path: string) => fs.mkdir(path, { recursive: true }).then()
    },
    path: {
        join: path.join,
        basename: path.basename,
        dirname: path.dirname
    },
    exec: async cmd => {
        const proc = Bun.spawn([cmd]);
        await proc.exited;
        const failed = proc.exitCode !== 0;
        const out = await new Response(proc.stdout).text();
        const err = failed ? Error(await new Response(proc.stderr).text()) : undefined;
        return { out, err };
    },
    fetch: (url, abort) => fetch(url, { signal: abort })
};
