import fs from "node:fs";
import path from "node:path";
import proc from "node:child_process";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { Platform } from "./platform";

export const node: Readonly<Platform> = {
    fs: {
        exists: fs.existsSync,
        read: path => fs.readFileSync(path, "utf-8"),
        write: (path, text) => fs.writeFileSync(path, text, "utf-8"),
        stream: (path, stream) => finished(Readable.fromWeb(<never>stream).pipe(fs.createWriteStream(path))),
        remove: fs.unlinkSync,
        mkdir: (path: string) => fs.mkdirSync(path, { recursive: true })
    },
    path: {
        join: path.join,
        basename: path.basename,
        dirname: path.dirname
    },
    exec: proc.exec,
    fetch: (url, abort) => fetch(url, { signal: abort })
};
