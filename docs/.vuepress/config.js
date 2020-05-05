module.exports = {
    title: 'Naninovel',
    description: 'Unity-powered visual novel engine',
    contentLoading: true,
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#4985c2'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png'}],
        ['link', {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c'}],
        ['meta', {name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png'}],
        ['meta', {name: 'msapplication-TileColor', content: '#000000'}],
        ['meta', {name: 'google-site-verification', content: 'cdvgJ2XFFbaGErDKJtTbFj9u9frfReZ9rzUnsf9F6nI'}]
    ],
    themeConfig: {
        editLinks: false,
        algolia: {
            apiKey: '20269a916e878ffcef4392d31af4f4d2',
            indexName: 'naninovel'
        },
        locales: {
            '/': {
                selectText: 'Language',
                ariaLabel: 'Language',
                label: 'English',
                nav: [
                    {
                        text: 'News',
                        items: [
                            {text: 'Twitter', link: 'https://twitter.com/naniengine'},
                            {text: 'Facebook', link: 'https://www.facebook.com/naniengine'},
                            {text: 'Unity Forum', link: 'https://forum.unity.com/threads/601966'},
                            {text: 'Discord', link: 'https://discord.gg/BfkNqem'}
                        ]
                    },
                    {text: 'FAQ', link: '/faq/'},
                    {text: 'Guide', link: '/guide/'},
                    {text: 'API Reference', link: '/api/'},
                    {text: 'Support', link: '/support/'}
                ],
                sidebar: {
                    '/guide/': getGuideSidebar('Guide', 'Advanced', 'Extensions')
                },
                lastUpdated: 'Last Updated'
            },
            '/ru/': {
                selectText: 'Язык',
                ariaLabel: 'Язык',
                label: 'Русский',
                nav: [
                    {
                        text: 'Новости',
                        items: [
                            {text: 'Twitter', link: 'https://twitter.com/naniengine'},
                            {text: 'Facebook', link: 'https://www.facebook.com/naniengine'},
                            {text: 'Unity Forum', link: 'https://forum.unity.com/threads/601966'},
                            {text: 'Discord', link: 'https://discord.gg/BfkNqem'}
                            // {text: 'VK', link: 'https://vk.com/naninovel'}
                        ]
                    },
                    {text: 'FAQ', link: '/ru/faq/'},
                    {text: 'Руководство', link: '/ru/guide/'},
                    {text: 'Команды', link: '/api/'},
                    {text: 'Поддержка', link: '/ru/support/'}
                ],
                lastUpdated: 'Обновлено'
            }
        }
    },
    plugins: [
        ['@vuepress/google-analytics', {ga: 'UA-62903242-4'}],
        ['@vuepress/last-updated', {dateOptions: {year: 'numeric', month: 'long', day: 'numeric'}}],
        ['vuepress-plugin-container', {type: 'note', defaultTitle: {'/': 'NOTICE', '/ru/': 'ПРИМЕЧАНИЕ'}}],
        ['vuepress-plugin-container', {type: 'example', defaultTitle: {'/': 'EXAMPLE', '/ru/': 'ПРИМЕР'}}],
        ['vuepress-plugin-container', {type: 'warn', defaultTitle: {'/': 'WARNING', '/ru/': 'ВНИМАНИЕ'}}]
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
            description: 'Unity-powered visual novel engine'
        },
        '/ru/': {
            lang: 'ru-RU',
            title: 'Naninovel',
            description: 'Движок для визуальных новелл на основе Unity'
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
                'unitask'
            ]
        }
    ]
}
