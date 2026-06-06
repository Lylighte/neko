import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '像素生态 - Pixel Eco',
  description: '基于 VitePress 的像素风格 UI 组件模板',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
  ],
  srcExclude: ['dev-notes/**', 'AGENTS.md', 'CHANGELOG.md', 'README.md', 'LICENSE'],
  markdown: {
    theme: 'github-dark',
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'News', link: '/news/' },
      { text: 'About', link: '/about' },
      { text: 'Docs', link: '/docs/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com', text: '仓库地址' } as any,
    ],
    footer: {
      copyright: '© 2026-Present Pixel Eco. 保留所有权利。',
    },
  },
})
