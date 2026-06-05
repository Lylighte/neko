import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pixel UI',
  description: 'A VitePress template with retro pixel-style UI components',
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
      { icon: 'github', link: 'https://github.com' },
    ],
    footer: {
      message: '',
      copyright: '',
    },
  },
})
