// noinspection JSUnusedGlobalSymbols

import DefaultTheme from "vitepress/theme-without-fonts";
import * as prefetch from "./prefetch";
import "./style.css";

// Have to import client assets manually due to vitepress
// bug: https://github.com/vuejs/vitepress/issues/3314
import "imgit/styles";
import "imgit/styles/youtube";
import "imgit/client";
import "imgit/client/youtube";

export default {
    extends: { Layout: DefaultTheme.Layout },
    enhanceApp: () => prefetch.init()
};
