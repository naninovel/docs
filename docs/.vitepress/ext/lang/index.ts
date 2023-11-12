import { resolve } from "path";

// https://github.com/shikijs/shiki/blob/main/docs/languages.md#supporting-your-own-languages-with-shiki

export default {
    id: "naniscript",
    aliases: ["nani"],
    scopeName: "source.naniscript",
    path: resolve("./docs/.vitepress/ext/lang/textmate.json")
};
