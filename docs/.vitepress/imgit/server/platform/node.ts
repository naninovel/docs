import fs from "node:fs";
import path from "node:path";
import proc from "node:child_process";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { PlatformOptions } from "../server";

export const node: PlatformOptions = {
    fs: Object.freeze({
        exists: fs.existsSync,
        read: path => fs.readFileSync(path, "utf-8"),
        write: (path, text) => fs.writeFileSync(path, text, "utf-8"),
        stream: (path, stream) => finished(Readable.fromWeb(<never>stream).pipe(fs.createWriteStream(path))),
        remove: fs.unlinkSync,
        mkdir: (path: string) => fs.mkdirSync(path, { recursive: true })
    }),
    path: Object.freeze({
        join: path.join,
        basename: path.basename,
        dirname: path.dirname
    }),
    exec: proc.exec
};
