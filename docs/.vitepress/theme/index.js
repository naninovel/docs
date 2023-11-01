import DefaultTheme from "vitepress/theme";
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
            ctx.router.onAfterRouteChanged = watchVideos;
        }
    }
};

function watchVideos() {
    if (typeof document !== "object") return;
    const videos = document.querySelectorAll("video.video");
    const observer = new IntersectionObserver(handleIntersections);
    for (const video of videos)
        observer.observe(video);
}

function handleIntersections(videos, observer) {
    for (const video of videos)
        handleIntersection(video, observer);
}

function handleIntersection(video, observer) {
    if (!video.isIntersecting) return;
    // for (const id in video.target.children) {
    //     const source = video.target.children[id];
    //     if (typeof source.tagName === "string" && source.tagName === "SOURCE")
    //         source.src = source.dataset.src;
    // }
    video.target.src = video.target.dataset.src;
    video.target.load();
    observer.unobserve(video.target);
}
