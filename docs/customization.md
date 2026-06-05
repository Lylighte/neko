---
layout: page
---

# Customization

Make the template your own — change the branding, colors, and layout.

## Site Identity

Edit `.vitepress/config.ts`:

```ts
export default defineConfig({
  title: 'My Site',
  description: 'A pixel-themed site built with VitePress',
  // ...
})
```

## Logo

Replace `public/logo.svg` with your own SVG logo. The logo appears in the navigation bar and home page hero.

## Navigation

Add, remove, or reorder nav items in `config.ts`:

```ts
themeConfig: {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'About', link: '/about' },
    { text: 'Docs', link: '/docs/' },
  ],
}
```

## Colors

All colors are defined as CSS custom properties in `.vitepress/theme/styles/vars.css`. Override them to match your brand:

| Variable | Default | Description |
|----------|---------|-------------|
| `--pixel-green` | `#3c8527` | Primary accent color |
| `--pixel-green-light` | `#6cc349` | Light accent (hover states) |
| `--pixel-green-dark` | `#2a641c` | Dark accent (active states) |
| `--pixel-gray-light` | `#747271` | Light gray (borders) |
| `--pixel-gray` | `#3d3938` | Mid gray (card backgrounds) |
| `--pixel-gray-dark` | `#262524` | Dark gray (surface) |
| `--pixel-dark` | `#171615` | Page background |
| `--background-card` | `#313131` | Card/panel background |

Example — switch to a blue theme:

```css
:root {
  --pixel-green: #2563eb;
  --pixel-green-light: #60a5fa;
  --pixel-green-dark: #1d4ed8;
}
```

## Background Images

Replace images in `public/background/`:

| File | Used In |
|------|---------|
| `hero-bg.jpg` | Home page hero section |
| `bg.jpg` | Home page feature sections |
| `15.jpg` | Home page / About page |
| `44.jpg` | Home page / Blog cards |
| `bgbtn.jpg` | Classic button texture |

## Footer

Edit the footer in `config.ts`:

```ts
footer: {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2025 My Site',
}
```

## Social Links

Add GitHub, Twitter, Discord, etc.:

```ts
socialLinks: [
  { icon: 'github', link: 'https://github.com/you' },
  { icon: 'twitter', link: 'https://twitter.com/you' },
]
```