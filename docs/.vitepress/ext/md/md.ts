import { MarkdownOptions, MarkdownRenderer, MarkdownEnv } from "vitepress";
import { AppendIconToExternalLinks } from "./md-link";
import { Replacer } from "./md-replacer";
import naniscript from "../lang";

export const md: MarkdownOptions = {
    config: installPlugins,
    languages: [naniscript],
    theme: {
        light: "../../../docs/.vitepress/ext/lang/theme-light",
        dark: "../../../docs/.vitepress/ext/lang/theme-dark"
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
