import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'Flex URL',
  description: 'Zero-dependency utility for parsing and modifying URL params',

  plugins: [
    [
      '@vuepress/search', {
        searchMaxSuggestions: 10
      }
    ]
  ],

  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',

    repo: 'open-southeners/flex-url',

    navbar: [
      {
        text: 'Home',
        link: '/README.md',
      },
      {
        text: 'Guide',
        children: [
          {
            text: 'Installation',
            link: '/guide/README.md'
          },
          '/guide/usage.md',
        ],
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/tyMUxvMnvh'
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          children: [
            {
              text: 'Installation',
              link: '/guide/README.md'
            },
            {
              text: 'Usage',
              link: '/guide/usage.md'
            },
          ]
        },
        // {
        //   text: 'Advanced topics',
        //   children: [
        //     {
        //       text: 'TypeScript',
        //       link: '/guide/typescript.md'
        //     },
        //   ]
        // },
        // {
        //   text: 'Upgrading',
        //   link: '/guide/upgrading.md'
        // },
      ],
    },
  },
})
