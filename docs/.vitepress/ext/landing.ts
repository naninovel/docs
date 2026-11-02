import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { transformWithEsbuild } from "vite";
import type { SiteConfig } from "vitepress";

export async function inlineLanding({ outDir }: SiteConfig) {
    const css = await minify(resolve(outDir, "assets/landing.css"));
    const js = await minify(resolve(outDir, "assets/landing.js"));
    for (const page of ["index.html", "ja/index.html", "zh/index.html"]) {
        const path = resolve(outDir, page);
        const html = (await readFile(path, "utf8"))
            .replace(/<link rel="stylesheet" href="\/?assets\/landing\.css">/, () => `<style>${css}</style>`)
            .replace(/<script type="module" src="\/?assets\/landing\.js"><\/script>/, () => `<script type="module">${js}</script>`);
        await writeFile(path, html);
    }
}

async function minify(path: string) {
    return (await transformWithEsbuild(await readFile(path, "utf8"), path, { minify: true, sourcemap: false })).code;
}
