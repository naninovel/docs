// Client-side tab switching for :::: group containers (mirrors VitePress code-group behavior).

export function init() {
    if (typeof window === "undefined") return;
    window.addEventListener("click", (e) => {
        const el = e.target as HTMLElement;
        if (!el.matches(".content-group input")) return;
        // input <- .tabs <- .content-group
        const group = el.parentElement?.parentElement;
        if (!group) return;
        const i = Array.from(group.querySelectorAll("input")).indexOf(el as HTMLInputElement);
        if (i < 0) return;
        const blocks = group.querySelector(".blocks");
        if (!blocks) return;
        const current = Array.from(blocks.children).find((child) => child.classList.contains("active"));
        if (!current) return;
        const next = blocks.children[i];
        if (!next || current === next) return;
        current.classList.remove("active");
        next.classList.add("active");
        const label = group.querySelector(`label[for="${(el as HTMLInputElement).id}"]`);
        label?.scrollIntoView({ block: "nearest" });
    });
}
