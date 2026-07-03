import { DefaultTheme, LocaleConfig } from "vitepress";
import * as guide from "./sidebar";

export const config: LocaleConfig<DefaultTheme.Config> = {
    root: {
        lang: "en-US",
        label: "English",
        description: "Create visual novels, branching dialogues, and interactive cutscenes with an all-in-one suite of writer-friendly storytelling tools.",
        themeConfig: {
            langMenuLabel: "Language",
            lastUpdated: { text: "Updated", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "Menu",
            darkModeSwitchLabel: "Appearance",
            returnToTopLabel: "Return to top",
            outline: { label: "On this page", level: "deep" },
            sidebar: { "/guide/": guide.en },
            docFooter: { prev: "Previous page", next: "Next page" },
            nav: buildNav(["FAQ", "Guide", "API", "Support"]),
            editLink: buildEditLink("Edit this page on GitHub")
        }
    },
    ja: {
        lang: "ja-JP",
        label: "日本語",
        description: "ライターフレンドリーなストーリーテリングツールを揃えたオールインワンスイートで、ビジュアルノベル、分岐ダイアログ、インタラクティブなカットシーンを制作。",
        themeConfig: {
            langMenuLabel: "言語",
            lastUpdated: { text: "最終更新日", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "メニュー",
            darkModeSwitchLabel: "外観",
            returnToTopLabel: "トップに戻る",
            outline: { label: "このページでは", level: "deep" },
            sidebar: { "/ja/guide/": guide.ja },
            docFooter: { prev: "前のページ", next: "次のページ" },
            nav: buildNav(["FAQ", "ガイド", "API", "サポート"], "ja"),
            editLink: buildEditLink("GitHub でこのページを編集する")
        }
    },
    zh: {
        lang: "zh-CN",
        label: "中文",
        description: "使用集写作友好型叙事工具于一体的全能套件，创作视觉小说、分支对话和互动过场动画。",
        themeConfig: {
            langMenuLabel: "语言",
            lastUpdated: { text: "最近更新时间", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "菜单",
            darkModeSwitchLabel: "外观",
            returnToTopLabel: "返回顶部",
            outline: { label: "在本页", level: "deep" },
            sidebar: { "/zh/guide/": guide.zh },
            docFooter: { prev: "上一页", next: "下一页" },
            nav: buildNav(["常见问题", "使用手册", "API", "技术支持"], "zh"),
            editLink: buildEditLink("在 GitHub 上编辑此页面")
        }
    }
};

export const search: Record<string, Partial<DefaultTheme.LocalSearchOptions>> = {
    ja: {
        translations: {
            button: {
                buttonText: "文書を検索する",
                buttonAriaLabel: "文書を検索する"
            },
            modal: {
                displayDetails: "詳細リストを表示",
                resetButtonTitle: "検索をリセット",
                backButtonTitle: "検索を閉じる",
                noResultsText: "結果が見つかりません",
                footer: {
                    selectText: "選択",
                    selectKeyAriaLabel: "Enter",
                    navigateText: "移動",
                    navigateUpKeyAriaLabel: "上矢印",
                    navigateDownKeyAriaLabel: "下矢印",
                    closeText: "閉じる",
                    closeKeyAriaLabel: "Esc"
                }
            }
        }
    },
    zh: {
        translations: {
            button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索"
            },
            modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有结果",
                footer: {
                    selectText: "选择",
                    selectKeyAriaLabel: "输入",
                    navigateText: "导航",
                    navigateUpKeyAriaLabel: "上箭头",
                    navigateDownKeyAriaLabel: "下箭头",
                    closeText: "关闭",
                    closeKeyAriaLabel: "esc"
                }
            }
        }
    }
};

function buildNav(text: string[], lang?: string): DefaultTheme.NavItem[] {
    return [
        { text: text[0], link: buildLink("faq") },
        { text: text[1], link: buildLink("guide"), activeMatch: "/guide/" },
        { text: text[2], link: buildLink("api") },
        { text: text[3], link: buildLink("support") },
        {
            text: "v1.21", items: [
                { text: "Changelog", link: "/releases" },
                { text: "Contributing", link: "https://github.com/naninovel/docs/blob/main/CONTRIBUTING.md" },
                { text: "v1.22-preview", link: "https://pre.naninovel.com/guide" }
            ]
        }
    ];

    function buildLink(baseUri: string) {
        if (lang == null) return `/${baseUri}/`;
        return `/${lang}/${baseUri}/`;
    }
}

function buildEditLink(text: string): DefaultTheme.EditLink {
    return { pattern: "https://github.com/naninovel/docs/edit/main/docs/:path", text };
}
