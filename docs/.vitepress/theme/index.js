import DefaultTheme from "vitepress/theme-without-fonts";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./style.css";

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols

export default {
    extends: {
        Layout: DefaultTheme.Layout,
        /** @param {import("vitepress").EnhanceAppContext} ctx */
        enhanceApp: (ctx) => {
            DefaultTheme.enhanceApp(ctx);
            ctx.router.onAfterRouteChanged = () => void setTimeout(observeVideos, 0);
        }
    }
};

function observeVideos() {
    if (!canObserve()) return;
    const observer = new IntersectionObserver(handleIntersections);
    for (const element of document.querySelectorAll("video.video"))
        observer.observe(element);
}

function canObserve() {
    return typeof document === "object" && "IntersectionObserver" in window;
}

function handleIntersections(entries, observer) {
    for (const entry of entries)
        if (entry.isIntersecting)
            handleIntersection(entry, observer);
}

function handleIntersection(entry, observer) {
    for (const child of entry.target.children)
        if (typeof child.tagName === "string" && child.tagName === "SOURCE")
            child.src = child.dataset.src;
    entry.target.load();
    observer.unobserve(entry.target);
}
