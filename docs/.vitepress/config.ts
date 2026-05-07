import { defineConfig } from 'vitepress'
import { buildSidebar } from './sidebar'

/** GitHub Project Pages: https://eniac-tech.github.io/FlexDocumentation/ */
const BASE = '/FlexDocumentation/'

export default defineConfig({
  title: 'FlexDocumentation',
  description: 'Flexbar product documentation',
  base: BASE,
  srcDir: '.',
  srcExclude: ['**/source/**'],
  ignoreDeadLinks: [/^\/assets\//, /^\/image\//],
  themeConfig: {
    search: { provider: 'local' },
    i18nRouting: true,
  },
  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        siteTitle: 'FlexDocumentation',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Getting Started', link: '/en/getting_started' },
        ],
        sidebar: { '/en/': buildSidebar('en') },
      },
    },
    zh_CN: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh_CN/',
      themeConfig: {
        siteTitle: 'Flex 文档',
        nav: [
          { text: '首页', link: '/zh_CN/' },
          { text: '快速入门', link: '/zh_CN/getting_started' },
        ],
        sidebar: { '/zh_CN/': buildSidebar('zh_CN') },
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: {
        siteTitle: 'Flex ドキュメント',
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: 'はじめに', link: '/ja/getting_started' },
        ],
        sidebar: { '/ja/': buildSidebar('ja') },
      },
    },
  },
})
