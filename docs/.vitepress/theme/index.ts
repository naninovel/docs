import { EnhanceAppContext } from "vitepress";
import { observe } from "../imgit/client/observe";
import DefaultTheme from "vitepress/theme-without-fonts";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./style.css";

// https://vitepress.dev/guide/extending-default-theme
// noinspection JSUnusedGlobalSymbols

export default {
    extends: {
        Layout: DefaultTheme.Layout,
        enhanceApp: (app: EnhanceAppContext) => {
            DefaultTheme.enhanceApp(app);
            app.router.onAfterRouteChanged = _ => void setTimeout(observe, 0);
        }
    }
};
