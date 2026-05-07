import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { buildSidebar } from './sidebar'

const dir = path.dirname(fileURLToPath(import.meta.url))
const siteBase = JSON.parse(fs.readFileSync(path.join(dir, 'site-base.json'), 'utf8')) as { base: string }
const BASE = siteBase.base.endsWith('/') ? siteBase.base : `${siteBase.base}/`

export default defineConfig({
  title: 'FlexDocumentation',
  description: 'Flexbar product documentation',
  base: BASE,
  srcDir: '.',
  srcExclude: ['**/source/**'],
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}enlinx.png` }],
  ],
  /**
   * Markdown uses root-absolute `/image/` and `/assets/`; VitePress rewrites them with `base` for the browser.
   * The static file checker does not always match `public/` the same way; these patterns avoid false build failures.
   */
  ignoreDeadLinks: [/^\/image\//, /^\/assets\//],
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
        logo: '/enlinx.png',
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
        logo: '/enlinx.png',
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
        logo: '/enlinx.png',
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
