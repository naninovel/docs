module.exports = {
    title: 'Naninovel',
    description: 'Unity-powered visual novel engine',
    contentLoading: true,
    head: [
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
    ],
    themeConfig: {
        editLinks: false,
        nav: [
            {
                text: 'News',
                items: [
                    {text: 'Twitter', link: 'https://twitter.com/naniengine'},
                    {text: 'Facebook', link: 'https://www.facebook.com/naniengine'},
                    {text: 'VK', link: 'https://vk.com/naninovel'}
                ]
            },
            {text: 'Guide', link: '/guide/'},
            {text: 'API Reference', link: '/api/'},
            {text: 'Issue Tracker', link: 'https://github.com/Elringus/NaninovelWeb/issues'},
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
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'engine-services',
                'custom-novel-actions',
                'custom-actor-implementations',
            ]
        }
    ]
}
