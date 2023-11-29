import { resolve } from "path";
import { ILanguageRegistration } from "shiki";

// https://github.com/shikijs/shiki/blob/main/docs/languages.md#supporting-your-own-languages-with-shiki

export default {
    id: "naniscript",
    aliases: ["nani"],
    scopeName: "source.naniscript",
    path: resolve("./docs/.vitepress/ext/lang/textmate.json")
} as ILanguageRegistration;
