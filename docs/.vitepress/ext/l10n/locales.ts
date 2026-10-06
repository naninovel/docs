import { DefaultTheme, LocaleConfig } from "vitepress";
import * as guide from "./sidebar";

export const config: LocaleConfig<DefaultTheme.Config> = {
    root: {
        lang: "en-US",
        label: "English",
        description: "Create visual novels, branching dialogues and interactive cutscenes with an all-in-one suite of writer-friendly storytelling tools.",
        themeConfig: {
            langMenuLabel: "Language",
            lastUpdated: { text: "Updated", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "Menu",
            darkModeSwitchLabel: "Appearance",
            returnToTopLabel: "Return to top",
            outline: { label: "On this page", level: "deep" },
            sidebar: { "/guide/": guide.en },
            docFooter: { prev: "Previous page", next: "Next page" },
            nav: buildNav(["FAQ", "Guide", "API", "Support", "Changelog", "Contributing"]),
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
            lightModeSwitchTitle: "ライトテーマに切り替える",
            darkModeSwitchTitle: "ダークテーマに切り替える",
            skipToContentLabel: "コンテンツにスキップ",
            returnToTopLabel: "トップに戻る",
            outline: { label: "このページの内容", level: "deep" },
            sidebar: { "/ja/guide/": guide.ja },
            docFooter: { prev: "前のページ", next: "次のページ" },
            nav: buildNav(["FAQ", "ガイド", "API", "サポート", "変更履歴", "コントリビューション"], "ja"),
            editLink: buildEditLink("GitHubでこのページを編集する")
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
            lightModeSwitchTitle: "切换到浅色主题",
            darkModeSwitchTitle: "切换到深色主题",
            skipToContentLabel: "跳转到内容",
            returnToTopLabel: "返回顶部",
            outline: { label: "本页内容", level: "deep" },
            sidebar: { "/zh/guide/": guide.zh },
            docFooter: { prev: "上一页", next: "下一页" },
            nav: buildNav(["常见问题", "指南", "API", "技术支持", "更新日志", "参与贡献"], "zh"),
            editLink: buildEditLink("在 GitHub 上编辑此页面")
        }
    }
};

export const search: Record<string, Partial<DefaultTheme.LocalSearchOptions>> = {
    ja: {
        translations: {
            button: {
                buttonText: "検索",
                buttonAriaLabel: "検索"
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
                noResultsText: "未找到相关结果",
                footer: {
                    selectText: "选择",
                    selectKeyAriaLabel: "回车键",
                    navigateText: "切换",
                    navigateUpKeyAriaLabel: "上箭头",
                    navigateDownKeyAriaLabel: "下箭头",
                    closeText: "关闭",
                    closeKeyAriaLabel: "Esc 键"
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
            text: "v1.22", items: [
                { text: text[4], link: "/releases" },
                { text: text[5], link: "https://github.com/naninovel/docs/blob/main/CONTRIBUTING.md" },
                { text: "v1.21-stable", link: "https://naninovel.com/guide" }
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
