import { DefaultTheme, LocaleConfig } from "vitepress";
import * as sidebars from "./sidebars";

export const config: LocaleConfig<DefaultTheme.Config> = {
    root: {
        lang: "en-US",
        label: "English",
        description: "Writer-friendly visual novel engine.",
        themeConfig: {
            langMenuLabel: "Language",
            lastUpdated: { text: "Updated", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "Menu",
            darkModeSwitchLabel: "Appearance",
            returnToTopLabel: "Return to top",
            outline: { label: "On this page", level: "deep" },
            sidebar: { "/guide/": sidebars.en },
            docFooter: { prev: "Previous page", next: "Next page" },
            nav: buildNav(["FAQ", "Guide", "Commands", "Support"]),
            editLink: buildEditLink("Edit this page on GitHub")
        }
    },
    ja: {
        lang: "ja-JP",
        label: "日本語",
        description: "Unityゲームエンジン用のフル機能を備えた、ライター向けで完全にカスタマイズ可能なビジュアルノベル拡張。",
        themeConfig: {
            langMenuLabel: "言語",
            lastUpdated: { text: "最終更新 日", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "メニュー",
            darkModeSwitchLabel: "外観",
            returnToTopLabel: "トップに戻る",
            outline: { label: "このページでは", level: "deep" },
            sidebar: { "/ja/guide/": sidebars.js },
            docFooter: { prev: "前のページ", next: "次のページ" },
            nav: buildNav(["FAQ", "ガイド", "コマンド", "サポート"], "ja"),
            editLink: buildEditLink("GitHub でこのページを編集する")
        }
    },
    zh: {
        lang: "zh-CN",
        label: "中文",
        description: "功能齐全、易于编写且完全可自定义的Unity游戏引擎视觉小说插件。",
        themeConfig: {
            langMenuLabel: "语言",
            lastUpdated: { text: "最近更新时间", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "菜单",
            darkModeSwitchLabel: "外貌",
            returnToTopLabel: "返回顶部",
            outline: { label: "在本页", level: "deep" },
            sidebar: { "/zh/guide/": sidebars.zn },
            docFooter: { prev: "上一页", next: "下一页" },
            nav: buildNav(["常见问题", "指南", "指令", "技术支持"], "zh"),
            editLink: buildEditLink("在 GitHub 上编辑此页面")
        }
    },
    ru: {
        lang: "ru-RU",
        label: "Русский",
        description: "Расширение игрового движка Unity для создания визуальных новелл.",
        themeConfig: {
            langMenuLabel: "Язык",
            lastUpdated: { text: "Обновлено", formatOptions: { dateStyle: "medium" } },
            sidebarMenuLabel: "Меню",
            darkModeSwitchLabel: "Оформление",
            returnToTopLabel: "Вернуться наверх",
            outline: { label: "На этой странице", level: "deep" },
            sidebar: { "/ru/guide/": sidebars.ru },
            docFooter: { prev: "Предыдущая страница", next: "Следующая страница" },
            nav: buildNav(["FAQ", "Руководство", "Команды", "Поддержка"], "ru"),
            editLink: buildEditLink("Редактировать эту страницу на GitHub")
        }
    }
};

export const search: Record<string, Partial<DefaultTheme.AlgoliaSearchOptions>> = {
    ja: {
        placeholder: "文書を検索する",
        translations: {
            button: {
                buttonText: "文書を検索する",
                buttonAriaLabel: "文書を検索する"
            },
            modal: {
                searchBox: {
                    resetButtonTitle: "明確なクエリ基準",
                    resetButtonAriaLabel: "明確なクエリ基準",
                    cancelButtonText: "キャンセル",
                    cancelButtonAriaLabel: "キャンセル"
                },
                startScreen: {
                    recentSearchesTitle: "検索履歴",
                    noRecentSearchesText: "検索履歴がありません",
                    saveRecentSearchButtonTitle: "検索履歴に保存",
                    removeRecentSearchButtonTitle: "検索履歴から削除する",
                    favoriteSearchesTitle: "収集",
                    removeFavoriteSearchButtonTitle: "お気に入りから削除"
                },
                errorScreen: {
                    titleText: "結果が得られない",
                    helpText: "インターネット接続を確認する必要がある場合があります"
                },
                footer: {
                    selectText: "選ぶ",
                    navigateText: "切り替える",
                    closeText: "閉鎖",
                    searchByText: "で検索"
                },
                noResultsScreen: {
                    noResultsText: "結果がありません",
                    suggestedQueryText: "クエリを試すことができます",
                    reportMissingResultsText: "クエリには結果が必要だと考えている？",
                    reportMissingResultsLinkText: "クリックフィードバック"
                }
            }
        }
    },
    zh: {
        placeholder: "搜索文档",
        translations: {
            button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档"
            },
            modal: {
                searchBox: {
                    resetButtonTitle: "清除查询条件",
                    resetButtonAriaLabel: "清除查询条件",
                    cancelButtonText: "取消",
                    cancelButtonAriaLabel: "取消"
                },
                startScreen: {
                    recentSearchesTitle: "搜索历史",
                    noRecentSearchesText: "没有搜索历史",
                    saveRecentSearchButtonTitle: "保存至搜索历史",
                    removeRecentSearchButtonTitle: "从搜索历史中移除",
                    favoriteSearchesTitle: "收藏",
                    removeFavoriteSearchButtonTitle: "从收藏中移除"
                },
                errorScreen: {
                    titleText: "无法获取结果",
                    helpText: "你可能需要检查你的网络连接"
                },
                footer: {
                    selectText: "选择",
                    navigateText: "切换",
                    closeText: "关闭",
                    searchByText: "搜索依据"
                },
                noResultsScreen: {
                    noResultsText: "无法找到相关结果",
                    suggestedQueryText: "你可以尝试查询",
                    reportMissingResultsText: "你认为该查询应该有结果？",
                    reportMissingResultsLinkText: "点击反馈"
                }
            }
        }
    },
    ru: {
        placeholder: "Искать документы",
        translations: {
            button: {
                buttonText: "Поиск",
                buttonAriaLabel: "Поиск"
            },
            modal: {
                searchBox: {
                    resetButtonTitle: "Сброс",
                    resetButtonAriaLabel: "Сброс",
                    cancelButtonText: "Отмена",
                    cancelButtonAriaLabel: "Отмена"
                },
                startScreen: {
                    recentSearchesTitle: "Последние запросы",
                    noRecentSearchesText: "Нет последних запросов",
                    saveRecentSearchButtonTitle: "Сохранить",
                    removeRecentSearchButtonTitle: "Удалить",
                    favoriteSearchesTitle: "Сохранённые запросы",
                    removeFavoriteSearchButtonTitle: "Удалить"
                },
                errorScreen: {
                    titleText: "Невозможно выполнить поиск",
                    helpText: "Проверьте соединение с сетью"
                },
                footer: {
                    selectText: "Выбрать",
                    navigateText: "Навигация",
                    closeText: "Закрыть",
                    searchByText: "Поиск предоставлен"
                },
                noResultsScreen: {
                    noResultsText: "Ничего не найдено",
                    suggestedQueryText: "Возможно вы искали"
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
            text: "v1.19", items: [
                { text: "Changelog", link: "https://github.com/naninovel/docs/releases/tag/v1.19" },
                { text: "Contributing", link: "https://github.com/naninovel/docs/blob/master/CONTRIBUTING.md" }
            ]
        }
    ];

    function buildLink(baseUri: string) {
        if (lang == null) return `/${baseUri}/`;
        return `/${lang}/${baseUri}/`;
    }
}

function buildEditLink(text: string): DefaultTheme.EditLink {
    return { pattern: "https://github.com/naninovel/docs/edit/master/docs/:path", text };
}
