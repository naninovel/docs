import { LanguageRegistration } from "shikiji";
import { ThemeOptions } from "vitepress";
import grammar from "./textmate.json";
import themeLight from "./theme-light.json";
import themeDark from "./theme-dark.json";

export const lang: LanguageRegistration = {
    id: "naniscript",
    aliases: ["nani"],
    scopeName: "source.naniscript",
    ...grammar as any
};

export const theme: ThemeOptions = {
    light: themeLight as any,
    dark: themeDark as any
};
