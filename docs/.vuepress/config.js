module.exports = {
    title: 'Naninovel',
    description: 'Unity-powered visual novel engine',
    contentLoading: true,
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#4985c2' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['meta', { name: 'google-site-verification', content: 'cdvgJ2XFFbaGErDKJtTbFj9u9frfReZ9rzUnsf9F6nI' }]
    ],
    themeConfig: {
        editLinks: false,
        nav: [
            {
                text: 'News',
                items: [
                    {text: 'Twitter', link: 'https://twitter.com/naniengine'},
                    {text: 'Facebook', link: 'https://www.facebook.com/naniengine'},
                    // {text: 'VK', link: 'https://vk.com/naninovel'}
                ]
            },
            {text: 'Guide', link: '/guide/'},
            {text: 'API Reference', link: '/api/'},
            {text: 'Support', link: '/support/'}
        ],
        sidebar: {
            '/guide/': getGuideSidebar('Guide', 'Advanced')
        }
    },
    plugins: {
        '@vuepress/google-analytics' : { ga: 'UA-62903242-4' }
    }
};

function getGuideSidebar (groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'compatibility',
                'getting-started',
                'configuration',
                'novel-scripts',
                'text-printers',
                'characters',
                'backgrounds',
                'background-transition-effects',
                'special-effects',
                'background-music',
                'sound-effects',
                'voicing',
                'movies',
                'choices',
                'save-load-system',
                'game-settings',
                'input-processing',
                'printer-backlog',
                'text-skipping',
                'auto-advance-text',
                'ui-toggling',
                'adaptive-ui-layout',
                'ui-customization',
                'managed-text',
                'localization',
                'community-modding'
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'engine-architecture',
                'engine-services',
                'custom-novel-actions',
                'custom-actor-implementations',
                'development-console',
                'google-drive-integration'
            ]
        }
    ]
}
