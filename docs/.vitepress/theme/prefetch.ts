// Deep prefetch: when VitePress prefetches a page chunk, also prefetch its dependencies.
// This eliminates navigation lag caused by loading dynamic imports chunks, such as imgit.

const prefetched = new Set<string>();
const importRegexp = /\bimport\s*(?:[^"']*?from\s*)?["'](\.[^"']+)["']/g;

export function init(): void {
    if (typeof window === "undefined") return;
    new MutationObserver(mutations => {
        for (const mutation of mutations)
            for (const node of mutation.addedNodes)
                if (node instanceof HTMLLinkElement && node.rel === "prefetch")
                    void prefetchUrl(node.href);
    }).observe(document.head, { childList: true });
}

async function prefetchUrl(url: string): Promise<void> {
    if (prefetched.has(url) || !url.endsWith(".js")) return;
    prefetched.add(url);
    const text = await fetch(url).then(r => r.text()).catch(() => "");
    const base = new URL(url);
    for (const [, path] of text.matchAll(importRegexp)) {
        const dep = new URL(path, base).href;
        if (prefetched.has(dep)) continue;
        prefetched.add(dep);
        const link = document.createElement("link");
        link.rel = "modulepreload";
        link.href = dep;
        document.head.appendChild(link);
    }
}
