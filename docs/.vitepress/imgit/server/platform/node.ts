import fs from "node:fs";
import afs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import { Platform } from "./platform";

export const node: Readonly<Platform> = {
    fs: {
        exists: async path => fs.existsSync(path),
        size: path => afs.stat(path).then(s => s.size),
        read: async (path, encoding) => {
            if (encoding === "utf8") return <never>await afs.readFile(path, "utf-8");
            return <never>new Uint8Array(await afs.readFile(path));
        },
        write: (path, content) => {
            if (typeof content === "string") return afs.writeFile(path, content, "utf-8");
            return afs.writeFile(path, content);
        },
        remove: afs.unlink,
        mkdir: (path: string) => afs.mkdir(path, { recursive: true }).then()
    },
    path: {
        join: (...p) => path.join(...p).replaceAll("\\", "/"),
        resolve: (...p) => path.resolve(...p).replaceAll("\\", "/"),
        relative: (from, to) => path.relative(from, to).replaceAll("\\", "/"),
        basename: path.basename,
        dirname: p => path.dirname(p).replaceAll("\\", "/")
    },
    exec: async cmd => {
        const execAsync = promisify(exec);
        const { stdout, stderr } = await execAsync(cmd);
        return { out: stdout, err: stderr?.length > 0 ? Error(stderr) : undefined };
    },
    fetch: (url, abort) => fetch(url, { signal: abort }),
    wait: (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000)),
    base64: async data => Buffer.from(data).toString("base64")
};
