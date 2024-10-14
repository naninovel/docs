import { defineConfig } from "vitepress";
import { l10n, md, vite } from "./ext";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Naninovel",
    titleTemplate: ":title • Naninovel",
    appearance: "dark",
    cleanUrls: true,
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
        search: {
            provider: "algolia",
            options: {
                appId: "4PDIF5MCBA",
                apiKey: "61d68d300d7651efc10f2ff65fbbc047",
                indexName: "naninovel",
                locales: l10n.search
            }
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/naninovel" },
            { icon: "discord", link: "https://discord.gg/BfkNqem" },
            { icon: "x", link: "https://x.com/naniengine" }
        ]
    },
    sitemap: { hostname: "https://naninovel.com" },
    locales: l10n.config,
    markdown: md,
    vite: vite
});
