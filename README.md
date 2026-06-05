# Pixel UI Template

A VitePress-based template with retro pixel-style UI components. Designed for community portals, game servers, and creative projects.

## Quick Start

```bash
# Clone the template branch
git clone -b template/vitepress <repo-url> my-site
cd my-site

# Install dependencies
npm install

# Start development server
npm run dev
```

## Customization

### Basic Settings

Edit `.vitepress/config.ts` to change the site title, description, and navigation:

```ts
export default defineConfig({
  title: 'My Community',
  description: 'A place for creators',
  // ...
})
```

### Replace Assets

| File | Purpose |
|------|---------|
| `public/logo.svg` | Site logo (SVG recommended) |
| `public/background/hero-bg.jpg` | Home page hero background |
| `public/background/bg.jpg` | Secondary background image |
| `public/background/15.jpg` | Feature section image |
| `public/background/44.jpg` | Feature section image |
| `public/background/bgbtn.jpg` | Button background texture |

### Edit Content

All page content is in Markdown files at the repository root:

| File | Content |
|------|---------|
| `index.md` | Home page (hero + feature sections) |
| `about.md` | About page |
| `news/index.md` | News listing |
| `news/welcome.md` | Sample news post |
| `news/community-update.md` | Sample news post |
| `docs/index.md` | Documentation hub |

### Add News Posts

Create a new `.md` file in the `news/` directory with frontmatter:

```md
---
title: My New Post
date: 2025-07-01
author: Your Name
---

# My New Post

Content goes here...
```

Then add a `<NewsCard>` to `news/index.md`.

### CSS Variables

Customize colors in `.vitepress/theme/styles/vars.css`:

```css
:root {
  --pixel-green: #3c8527;
  --pixel-green-light: #6cc349;
  --pixel-green-dark: #2a641c;
  --background-color: var(--pixel-dark);
  --background-card: #313131;
}
```

### Fonts

The template uses a three-tier pixel font stack:

| Layer | Font | Applied to |
|-------|------|------------|
| Headings | Ark Pixel 12px | `h1`–`h6` |
| Code | Monocraft | `code`, `pre`, `kbd`, `samp` |
| Body | Unifont | default body text |

All font files are in `public/fonts/`. `@font-face` declarations are in `.vitepress/theme/styles/fonts.css`.

**To replace a font:**

1. Drop your `.woff2` or `.ttf` file into `public/fonts/`
2. Update the `@font-face` in `fonts.css`
3. Update the `font-family` in `vars.css`

**To remove pixel fonts entirely:**

1. Delete `public/fonts/` directory
2. Remove `import './styles/fonts.css'` from `.vitepress/theme/index.ts`
3. Remove the heading/code font-family rules from `vars.css`

**Optional pixel body text** — add `class="pixel-text"` to any element for full pixel rendering.

## Build & Deploy

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

The built files are in `.vitepress/dist/`. Deploy to any static hosting (GitHub Pages, Netlify, Vercel, etc.).
