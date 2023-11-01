import { defineConfig } from "vitepress";
import { Locales, Markdown, Vite } from "./ext";

// https://vitepress.dev/reference/site-config

export default defineConfig({
    title: "Naninovel",
    cleanUrls: true,
    lastUpdated: true,
    head: [
        ["link", { rel: "icon", href: "/favicon.svg" }],
        ["meta", { name: "theme-color", content: "#1baeea" }],
        ["meta", { name: "og:image", content: "/assets/img/og.jpg" }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }]
    ],
    themeConfig: {
        logo: { src: "/favicon.svg" },
        logoLink: "https://naninovel.com",
        search: {
            provider: "algolia",
            options: {
                appId: "4PDIF5MCBA",
                apiKey: "61d68d300d7651efc10f2ff65fbbc047",
                indexName: "naninovel",
                locales: Locales.Search
            }
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/Naninovel" },
            { icon: "discord", link: "https://discord.gg/BfkNqem" },
            { icon: "twitter", link: "https://twitter.com/naniengine" }
        ]
    },
    sitemap: { hostname: "https://naninovel.com" },
    locales: Locales.Config,
    markdown: Markdown,
    vite: Vite
});
