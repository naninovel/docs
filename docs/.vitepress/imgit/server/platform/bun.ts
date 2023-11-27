import fs from "node:fs/promises";
import path from "node:path";
import { Platform } from "./platform";

// https://github.com/oven-sh/bun/tree/main/packages/bun-types

declare module Bun {
    const file: (path: string) => {
        exists: () => Promise<boolean>;
        arrayBuffer: () => Promise<ArrayBuffer>;
        text: () => Promise<string>;
    };
    const write: (path: string, content: string | Uint8Array) => Promise<number>;
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
        stat: path => fs.stat(path).then(s => ({ modified: Math.floor(s.mtimeMs / 1000) })),
        read: async (path, encoding) => {
            const file = Bun.file(path);
            if (encoding === "utf8") return <never>await file.text();
            return <never>new Uint8Array(await file.arrayBuffer());
        },
        write: async (path, content) => {
            if (typeof content === "string") return Bun.write(path, content).then();
            return Bun.write(path, content).then();
        },
        remove: fs.unlink,
        mkdir: (path: string) => fs.mkdir(path, { recursive: true }).then()
    },
    path: {
        join: (...p) => path.join(...p).replaceAll("\\", "/"),
        resolve: (...p) => path.resolve(...p).replaceAll("\\", "/"),
        basename: path.basename,
        dirname: p => path.dirname(p).replaceAll("\\", "/")
    },
    exec: async cmd => {
        const proc = Bun.spawn(cmd.split(" "));
        await proc.exited;
        const failed = proc.exitCode !== 0;
        const out = await new Response(proc.stdout).text();
        const err = failed ? Error(await new Response(proc.stderr).text()) : undefined;
        return { out, err };
    },
    fetch: (url, abort) => fetch(url, { signal: abort }),
    wait: (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000)),
    base64: async data => Buffer.from(data).toString("base64")
};
