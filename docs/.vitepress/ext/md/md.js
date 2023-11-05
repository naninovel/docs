import { AppendIconToExternalLinks } from "./md-link";
import { Replacer } from "./md-replacer";
import { NaniScript } from "../language/language";

/** @type import("vitepress").MarkdownOptions */
export const Markdown = {
    config: installPlugins,
    languages: [NaniScript],
    theme: {
        light: "../../../docs/.vitepress/ext/language/theme-light",
        dark: "../../../docs/.vitepress/ext/language/theme-dark"
    },
    attrs: { disable: true } // https://github.com/vuejs/vitepress/issues/2440
};

/** @return import("vitepress").MarkdownRenderer */
function installPlugins(md) {
    md.use(Replacer(/\[@(\w+?)]/m, buildCommandTags));
    md.use(AppendIconToExternalLinks);
}

/** @param {string[]} match
 *  @param import("vitepress").MarkdownEnv env */
function buildCommandTags(match, env) {
    let url = `/api/#${match[1].toLowerCase()}`;
    if (env.relativePath.startsWith("ja/")) url = "/ja" + url;
    else if (env.relativePath.startsWith("zh/")) url = "/zh" + url;
    else if (env.relativePath.startsWith("ru/")) url = "/ru" + url;
    return `<a href="${url}" target="_blank"><code>@${match[1]}</code></a>`;
}
