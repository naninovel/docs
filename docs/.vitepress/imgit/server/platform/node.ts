import fs from "node:fs";
import afs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { Platform } from "./platform";

export const node: Readonly<Platform> = {
    fs: {
        exists: async path => fs.existsSync(path),
        read: path => afs.readFile(path, "utf-8"),
        write: (path, content) => {
            if (typeof content === "string") return afs.writeFile(path, content, "utf-8");
            return finished(Readable.fromWeb(<never>content).pipe(fs.createWriteStream(path)));
        },
        remove: afs.unlink,
        mkdir: (path: string) => afs.mkdir(path, { recursive: true }).then()
    },
    path: {
        join: path.join,
        basename: path.basename,
        dirname: path.dirname
    },
    exec: async cmd => {
        const execAsync = promisify(exec);
        const { stdout, stderr } = await execAsync(cmd);
        return { out: stdout, err: stderr?.length > 0 ? Error(stderr) : undefined };
    },
    fetch: (url, abort) => fetch(url, { signal: abort })
};
