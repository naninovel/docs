import DefaultTheme from "vitepress/theme-without-fonts";
import "./style.css";

// https://vitepress.dev/guide/extending-default-theme
export default { extends: { Layout: DefaultTheme.Layout } };
