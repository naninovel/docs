// @ts-ignore
import * as fs from "https://deno.land/std/fs/mod.ts";
// @ts-ignore
import * as path from "https://deno.land/std/path/mod.ts";
// @ts-ignore
import { encodeBase64 } from "https://deno.land/std/encoding/base64.ts";
import { Platform } from "./platform";

// https://github.com/denoland/deno/releases/download/v1.38.1/lib.deno.d.ts

declare module Deno {
    const readFile: (path: string) => Promise<Uint8Array>;
    const readTextFile: (path: string) => Promise<string>;
    const writeFile: (path: string, content: Uint8Array) => Promise<void>;
    const writeTextFile: (path: string, content: string) => Promise<void>;
    const remove: (path: string) => Promise<void>;
    const mkdir: (path: string, options: { recursive: boolean }) => Promise<void>;
    const stat: (path: string) => Promise<{ size: number }>;
    export class Command {
        constructor(command: string);
        output(): Promise<{ success: boolean, stdout: BufferSource, stderr: BufferSource }>;
    }
}

export const deno: Readonly<Platform> = {
    fs: {
        exists: fs.exists,
        size: path => Deno.stat(path).then(s => s.size),
        read: (path, encoding) => <never>(encoding === "bin" ? Deno.readFile(path) : Deno.readTextFile(path)),
        write: async (path, content) => {
            if (typeof content === "string") return Deno.writeTextFile(path, content);
            return Deno.writeFile(path, content);
        },
        remove: Deno.remove,
        mkdir: (path: string) => Deno.mkdir(path, { recursive: true }),
    },
    path: {
        join: (...p) => path.join(...p).replaceAll("\\", "/"),
        resolve: (...p) => path.resolve(...p).replaceAll("\\", "/"),
        relative: (from, to) => path.relative(from, to).replaceAll("\\", "/"),
        basename: path.basename,
        dirname: p => path.dirname(p).replaceAll("\\", "/"),
        fileUrlToPath: url => path.fromFileUrl(url).replaceAll("\\", "/")
    },
    exec: async cmd => {
        const proc = new Deno.Command(cmd);
        const { success, stdout, stderr } = await proc.output();
        const out = new TextDecoder().decode(stdout);
        const err = success ? undefined : Error(new TextDecoder().decode(stderr));
        return { out, err };
    },
    fetch: (url, abort) => fetch(url, { signal: abort }),
    wait: (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000)),
    base64: async data => encodeBase64(data)
};
