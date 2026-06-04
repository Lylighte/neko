import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Your Organization',
  description: 'A Minecraft-themed community portal',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
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
