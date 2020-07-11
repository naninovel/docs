module.exports = {
    title: 'Naninovel',
    description: 'A full-featured, writer-friendly and completely customizable visual novel extension for Unity game engine.',
    contentLoading: true,
    head: [
        ['link', {rel: 'icon', href: 'assets/img/logo.png'}],
        ['link', {rel: 'manifest', href: 'manifest.json'}],
        ['meta', {name: 'theme-color', content: '#4985c2'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['meta', {name: 'og:image', content: 'assets/img/og.jpg'}],
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        ['link', {rel: 'apple-touch-icon', href: 'assets/icons/apple-touch-icon-152x152.png'}],
        ['link', {rel: 'mask-icon', href: 'assets/icons/safari-pinned-tab.svg', color: '#3eaf7c'}],
        ['meta', {name: 'msapplication-TileImage', content: 'assets/icons/msapplication-icon-144x144.png'}],
        ['meta', {name: 'msapplication-TileColor', content: '#000000'}],
        ['meta', {name: 'google-site-verification', content: 'cdvgJ2XFFbaGErDKJtTbFj9u9frfReZ9rzUnsf9F6nI'}]
    ],
    themeConfig: {
        editLinks: false,
        algolia: {
            apiKey: '20269a916e878ffcef4392d31af4f4d2',
            indexName: 'naninovel',
            algoliaOptions: {
                hitsPerPage: 6,
            }
        },
        locales: {
            '/': {
                selectText: 'Language',
                ariaLabel: 'Language',
                label: 'English',
                nav: [
                    {text: 'FAQ', link: '/faq/'},
                    {text: 'Guide', link: '/guide/'},
                    {text: 'Commands', link: '/api/'},
                    {text: 'Support', link: '/support/'}
                ],
                sidebar: {
                    '/guide/': getGuideSidebar('Guide', 'Advanced', 'Extensions')
                },
                lastUpdated: 'Last Updated'
            },
            '/ja/': {
                selectText: '言語',
                ariaLabel: '言語',
                label: '日本語',
                nav: [
                    {text: 'FAQ', link: '/ja/faq/'},
                    {text: 'ガイド', link: '/ja/guide/'},
                    {text: 'コマンド', link: '/ja/api/'},
                    {text: 'サポート', link: '/ja/support/'}
                ],
                sidebar: {
                    '/ja/guide/': getGuideSidebar('ガイド', 'アドバンスド', 'エクステンション')
                },
                lastUpdated: '最終更新 日'
            },
            '/zh/': {
                selectText: '語言',
                ariaLabel: '語言',
                label: '中文',
                nav: [
                    {text: 'FAQ', link: '/zh/faq/'},
                    {text: '指南', link: '/zh/guide/'},
                    {text: '指令', link: '/zh/api/'},
                    {text: '支持', link: '/zh/support/'}
                ],
                sidebar: {
                    '/zh/guide/': getGuideSidebar('指南', '高級', '擴展名')
                },
                lastUpdated: '最近更新時間'
            },
            '/ru/': {
                selectText: 'Язык',
                ariaLabel: 'Язык',
                label: 'Русский',
                nav: [
                    {text: 'FAQ', link: '/ru/faq/'},
                    {text: 'Руководство', link: '/ru/guide/'},
                    {text: 'Команды', link: '/ru/api/'},
                    {text: 'Поддержка', link: '/ru/support/'}
                ],
                sidebar: {
                    '/ru/guide/': getGuideSidebar('Руководство', 'Программирование', 'Расширения')
                },
                lastUpdated: 'Обновлено'
            }
        }
    },
    plugins: [
        ['@vuepress/google-analytics', {ga: 'UA-62903242-4'}],
        ['@vuepress/last-updated', {dateOptions: {year: 'numeric', month: 'long', day: 'numeric'}}],
        ['vuepress-plugin-container', {type: 'note', defaultTitle: {'/':'NOTICE', '/ja/':'通知', '/zh/':'注意', '/ru/':'ПРИМЕЧАНИЕ'}}],
        ['vuepress-plugin-container', {type: 'example', defaultTitle: {'/':'EXAMPLE', '/ja/':'例', '/zh/':'例', '/ru/':'ПРИМЕР'}}],
        ['vuepress-plugin-container', {type: 'warn', defaultTitle: {'/':'WARNING', '/ja/':'警告', '/zh/':'警告', '/ru/':'ВНИМАНИЕ'}}]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-regexp')(/\[@(\w+?)]/, function(match, utils) {
                return `<a href="/api/#${match[1].toLowerCase()}" class="" target="_blank"><code>@${match[1]}</code></a>`; }));
            md.use(require('markdown-it-regexp')(/\[!(\w+?)]/, function(match, utils) {
                return `<video class="video" loop autoplay muted><source src="https://i.gyazo.com/${match[1]}.mp4" type="video/mp4"></video>`; }));
            md.use(require('markdown-it-regexp')(/\[!!(.+?)]/, function(match, utils) {
                return `<div class="video-container"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`; }));
        }
    },
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Naninovel',
            description: 'A full-featured, writer-friendly and completely customizable visual novel extension for Unity game engine.'
        },
        '/ja/': {
            lang: 'ja-JP',
            title: 'Naninovel',
            description: 'Unityゲームエンジン用のフル機能を備えた、ライター向けで完全にカスタマイズ可能なビジュアルノベル拡張。'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Naninovel',
            description: '功能齊全，易於編寫且易於自定義的Unity遊戲引擎视觉小说擴展。'
        },
        '/ru/': {
            lang: 'ru-RU',
            title: 'Naninovel',
            description: 'Расширение игрового движка Unity для создания визуальных новелл.'
        }
    }
};

function getGuideSidebar (groupA, groupB, groupC) {
    return [
        {
            title: groupA,
            collapsable: true,
            children: [
                '',
                'compatibility',
                'getting-started',
                'configuration',
                'naninovel-scripts',
                'text-printers',
                'characters',
                'backgrounds',
                'transition-effects',
                'special-effects',
                'audio',
                'voicing',
                'movies',
                'choices',
                'user-interface',
                'save-load-system',
                'game-settings',
                'input-processing',
                'unlockable-items',
                'custom-variables',
                'script-expressions',
                'managed-text',
                'localization',
                'resource-providers',
                'community-modding',
                'development-console'
            ]
        },
        {
            title: groupB,
            collapsable: true,
            children: [
                'engine-architecture',
                'engine-services',
                'custom-commands',
                'custom-configuration',
                'custom-actor-implementations',
                'custom-actor-shader',
                'state-management',
                'integration-options',
                'render-pipelines',
                'custom-build-environment'
            ]
        },
        {
            title: groupC,
            collapsable: true,
            children: [
                'playmaker',
                'bolt',
                'adventure-creator',
                'inventory',
                'unitask'
            ]
        }
    ]
}
