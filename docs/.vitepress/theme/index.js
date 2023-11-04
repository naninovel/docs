import DefaultTheme from "vitepress/theme-without-fonts";
import imgit from "../imgit";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./style.css";

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols

export default {
    extends: {
        Layout: DefaultTheme.Layout,
        /** @param {import("vitepress").EnhanceAppContext} app */
        enhanceApp: (app) => {
            DefaultTheme.enhanceApp(app);
            imgit.vitepress.installApp(app);
        }
    }
};
