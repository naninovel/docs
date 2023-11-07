import { MarkdownOptions, MarkdownRenderer, MarkdownEnv } from "vitepress";
import { AppendIconToExternalLinks } from "./md-link";
import { Replacer } from "./md-replacer";
import { NaniScript } from "../language/language";

export const Markdown: MarkdownOptions = {
    config: installPlugins,
    languages: [NaniScript],
    theme: {
        light: "../../../docs/.vitepress/ext/language/theme-light",
        dark: "../../../docs/.vitepress/ext/language/theme-dark"
    },
    attrs: { disable: true } // https://github.com/vuejs/vitepress/issues/2440
};

function installPlugins(md: MarkdownRenderer) {
    md.use(Replacer(/\[@(\w+?)]/m, buildCommandTags));
    md.use(AppendIconToExternalLinks);
}

function buildCommandTags(match: string[], env: MarkdownEnv) {
    let url = `/api/#${match[1].toLowerCase()}`;
    if (env.relativePath.startsWith("ja/")) url = "/ja" + url;
    else if (env.relativePath.startsWith("zh/")) url = "/zh" + url;
    else if (env.relativePath.startsWith("ru/")) url = "/ru" + url;
    return `<a href="${url}" target="_blank"><code>@${match[1]}</code></a>`;
}
