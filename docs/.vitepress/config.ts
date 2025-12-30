import { defineConfig } from "vitepress";
import { l10n, md, vite } from "./ext";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Naninovel",
    titleTemplate: ":title • Naninovel",
    appearance: "dark",
    cleanUrls: true,
    rewrites: { "en/:rest*": ":rest*" },
    lastUpdated: true,
    head: [
        ["link", { rel: "icon", href: "/favicon.svg" }],
        ["link", { rel: "preload", href: "/assets/fonts/inter.woff2", as: "font", type: "font/woff2", crossorigin: "" }],
        ["link", { rel: "preload", href: "/assets/fonts/jb.woff2", as: "font", type: "font/woff2", crossorigin: "" }],
        ["meta", { name: "og:image", content: "/assets/img/og.jpg" }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }]
    ],
    themeConfig: {
        logo: { src: "/favicon.svg" },
        logoLink: { link: "/", target: "_self" },
        search: { provider: "local", options: { detailedView: true, locales: l10n.search } },
        socialLinks: [
            { icon: "github", link: "https://github.com/naninovel" },
            { icon: "discord", link: "https://discord.gg/BfkNqem" },
            { icon: "x", link: "https://x.com/naniengine" },
            { icon: "bluesky", link: "https://bsky.app/profile/naninovel.com" }
        ]
    },
    scrollOffset: 85,
    sitemap: { hostname: "https://naninovel.com" },
    locales: l10n.config,
    markdown: md,
    vite: vite
});
