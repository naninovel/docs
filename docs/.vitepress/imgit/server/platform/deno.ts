// @ts-ignore
import * as fs from "https://deno.land/std@0.206.0/fs/mod.ts";
// @ts-ignore
import * as path from "https://deno.land/std@0.206.0/path/mod.ts";
import { Platform } from "./platform";

// https://github.com/denoland/deno/releases/download/v1.38.1/lib.deno.d.ts

declare module Deno {
    const readTextFile: (path: string) => Promise<string>;
    const writeFile: (path: string, content: ReadableStream) => Promise<void>;
    const writeTextFile: (path: string, content: string) => Promise<void>;
    const remove: (path: string) => Promise<void>;
    const mkdir: (path: string, options: { recursive: boolean }) => Promise<void>;
    export class Command {
        constructor(command: string);
        output(): Promise<{ success: boolean, stdout: BufferSource, stderr: BufferSource }>;
    }
}

export const deno: Readonly<Platform> = {
    fs: {
        exists: fs.exists,
        read: Deno.readTextFile,
        write: async (path, content) => {
            if (typeof content === "string") return Deno.writeTextFile(path, content);
            return Deno.writeFile(path, content);
        },
        remove: Deno.remove,
        mkdir: (path: string) => Deno.mkdir(path, { recursive: true })
    },
    path: {
        join: path.join,
        resolve: path.resolve,
        basename: path.basename,
        dirname: path.dirname
    },
    exec: async cmd => {
        const proc = new Deno.Command(cmd);
        const { success, stdout, stderr } = await proc.output();
        const out = new TextDecoder().decode(stdout);
        const err = success ? undefined : Error(new TextDecoder().decode(stderr));
        return { out, err };
    },
    fetch: (url, abort) => fetch(url, { signal: abort })
};
