import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pixel Eco',
  description: 'A VitePress template with retro pixel-style UI components',
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
      { icon: 'github', link: 'https://github.com', text: 'GitHub Repo' } as any,
    ],
    footer: {
      copyright: '© 2026-Present Pixel Eco. All rights reserved.',
    },
  },
})
