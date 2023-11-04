import { Replacer } from "ext/markdown-it/replacer";
import { Plugin as MarkdownItPlugin } from "ext/markdown-it/plugin";
import { Plugin as VitePlugin } from "ext/vite/plugin";
import { installConfig, installApp } from "ext/vitepress/plugin";

export default {
    markdownit: { Plugin: MarkdownItPlugin, Replacer },
    vite: { Plugin: VitePlugin },
    vitepress: { installConfig, installApp }
};
