export interface DocumentNode {
  id: string
  name: string
  children?: DocumentNode[]
}

export interface DocumentDetail {
  name: string
  contributors: string[]
  updateTime: string
  content: string // Markdown string
}

/** Document tree for navigation sidebar */
export const docTree: DocumentNode[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    children: [
      { id: 'quick-start', name: 'Quick Start' },
      { id: 'customization', name: 'Customization' },
      { id: 'deployment', name: 'Deployment' },
    ],
  },
  {
    id: 'writing-content',
    name: 'Writing Content',
    children: [
      { id: 'blogging', name: 'Blogging Guide' },
      { id: 'components', name: 'Component Reference' },
    ],
  },
]

/** Document details keyed by document id */
export const docDetails: Record<string, DocumentDetail> = {
  'quick-start': {
    name: 'Quick Start',
    contributors: ['Template Team'],
    updateTime: '2025-06-05',
    content: `# Quick Start

Get your Pixel-themed site up and running in minutes.

## Prerequisites

- **Node.js** 18 or later
- A code editor (VS Code recommended)

## Setup

\`\`\`bash
# Clone the template
git clone -b template/vitepress <repo-url> my-site
cd my-site

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open http://localhost:5173 in your browser. You should see the home page with the Pixel theme.

## Project Structure

\`\`\`
my-site/
├── .vitepress/
│   ├── config.ts              # Site config (title, nav, etc.)
│   └── theme/
│       ├── index.ts           # Theme entry (registers components)
│       ├── Layout.vue         # Custom page layout
│       ├── components/        # Pixel UI components
│       ├── styles/            # CSS variables & animations
│       └── data/              # Static data (docs, etc.)
├── index.md                   # Home page
├── about.md                   # About page
├── blog/                      # Blog posts
├── docs/                      # Documentation pages
└── public/                    # Static assets
    ├── logo.svg
    ├── background/            # Background images
    └── UI/                    # UI sprite images
\`\`\`

## Key Files

| File | Purpose |
|------|---------|
| \`.vitepress/config.ts\` | Site title, nav links, social links |
| \`.vitepress/theme/styles/vars.css\` | Color palette and CSS variables |
| \`index.md\` | Home page content |
| \`public/logo.svg\` | Site logo |

## Next Steps

- **Customization** — Change colors, logo, and backgrounds
- **Blogging Guide** — Write your first blog post
- **Component Reference** — Explore available UI components
- **Deployment** — Build and publish your site`,
  },
  customization: {
    name: 'Customization',
    contributors: ['Template Team'],
    updateTime: '2025-06-05',
    content: `# Customization

Make the template your own — change the branding, colors, and layout.

## Site Identity

Edit \`.vitepress/config.ts\`:

\`\`\`ts
export default defineConfig({
  title: 'My Site',
  description: 'A pixel-themed site built with VitePress',
  // ...
})
\`\`\`

## Logo

Replace \`public/logo.svg\` with your own SVG logo. The logo appears in the navigation bar and home page hero.

## Navigation

Add, remove, or reorder nav items in \`config.ts\`:

\`\`\`ts
themeConfig: {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'About', link: '/about' },
    { text: 'Docs', link: '/docs/' },
  ],
}
\`\`\`

## Colors

All colors are defined as CSS custom properties in \`.vitepress/theme/styles/vars.css\`. Override them to match your brand:

| Variable | Default | Description |
|----------|---------|-------------|
| \`--pixel-green\` | \`#3c8527\` | Primary accent color |
| \`--pixel-green-light\` | \`#6cc349\` | Light accent (hover states) |
| \`--pixel-green-dark\` | \`#2a641c\` | Dark accent (active states) |
| \`--pixel-gray-light\` | \`#747271\` | Light gray (borders) |
| \`--pixel-gray\` | \`#3d3938\` | Mid gray (card backgrounds) |
| \`--pixel-gray-dark\` | \`#262524\` | Dark gray (surface) |
| \`--pixel-dark\` | \`#171615\` | Page background |
| \`--background-card\` | \`#313131\` | Card/panel background |

Example — switch to a blue theme:

\`\`\`css
:root {
  --pixel-green: #2563eb;
  --pixel-green-light: #60a5fa;
  --pixel-green-dark: #1d4ed8;
}
\`\`\`

## Background Images

Replace images in \`public/background/\`:

| File | Used In |
|------|---------|
| \`hero-bg.jpg\` | Home page hero section |
| \`bg.jpg\` | Home page feature sections |
| \`15.jpg\` | Home page / About page |
| \`44.jpg\` | Home page / Blog cards |
| \`bgbtn.jpg\` | Classic button texture |

## Footer

Edit the footer in \`config.ts\`:

\`\`\`ts
footer: {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2025 My Site',
}
\`\`\`

## Social Links

Add GitHub, Twitter, Discord, etc.:

\`\`\`ts
socialLinks: [
  { icon: 'github', link: 'https://github.com/you' },
  { icon: 'twitter', link: 'https://twitter.com/you' },
]
\`\`\``,
  },
  deployment: {
    name: 'Deployment',
    contributors: ['Template Team'],
    updateTime: '2025-06-05',
    content: `# Deployment

Build your site for production and deploy to static hosting.

## Build

\`\`\`bash
npm run build
\`\`\`

The output goes to \`.vitepress/dist/\`. This folder contains static HTML, CSS, JS, and assets — ready to serve.

## Preview Locally

\`\`\`bash
npm run preview
\`\`\`

This serves the built output so you can verify everything looks correct before deploying.

## Deploy to GitHub Pages

1. Push your repository to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Create \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vitepress/dist
\`\`\`

## Deploy to Netlify

1. Connect your Git repository to Netlify
2. Set build command: \`npm run build\`
3. Set publish directory: \`.vitepress/dist\`
4. Deploy!

## Deploy to Vercel

1. Import your Git repository on Vercel
2. Framework preset: **VitePress**
3. Vercel auto-detects build settings — just click Deploy

## Custom Domain

All platforms support custom domains. Follow their respective documentation to set up DNS and SSL.`,
  },
  blogging: {
    name: 'Blogging Guide',
    contributors: ['Template Team'],
    updateTime: '2025-06-05',
    content: `# Blogging Guide

Write and publish blog posts with rich formatting and metadata.

## Creating a Post

Create a new \`.md\` file in the \`blog/\` directory:

\`\`\`bash
blog/my-first-post.md
\`\`\`

## Frontmatter

Every blog post needs YAML frontmatter at the top:

\`\`\`yaml
---
title: My First Post
date: 2025-06-05
author:
  name: Your Name
  avatar: /background/bgbtn.jpg
  tags:
    - text: Announcement
      color: '#fff'
      bg: '#3c8527'
cover: /background/44.jpg
category: General
---
\`\`\`

| Field | Required | Description |
|-------|----------|-------------|
| \`title\` | Yes | Post title |
| \`date\` | Yes | Publication date (YYYY-MM-DD) |
| \`author.name\` | No | Author display name |
| \`author.avatar\` | No | Author avatar image path |
| \`author.tags\` | No | Badge tags (text, color, bg) |
| \`cover\` | No | Hero cover image path |
| \`category\` | No | Post category label |

## Adding to the Blog Listing

After creating a post, add a \`<BlogCard>\` to \`blog/index.md\`:

\`\`\`html
<BlogCard
  title="My First Post"
  brief="A short description that appears in the card preview."
  image="/background/44.jpg"
  link="/blog/my-first-post"
/>
\`\`\`

| Prop | Description |
|------|-------------|
| \`title\` | Card title |
| \`brief\` | Short description text |
| \`image\` | Card background image |
| \`link\` | URL to the blog post |

## Markdown Features

VitePress supports full Markdown with extensions:

### Code Blocks

\`\`\`ts
const greeting = 'Hello, world!'
console.log(greeting)
\`\`\`

### Alerts

::: tip
This is a helpful tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

### Images

![Alt text](/path/to/image.png)

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`,
  },
  components: {
    name: 'Component Reference',
    contributors: ['Template Team'],
    updateTime: '2025-06-05',
    content: `# Component Reference

All built-in Pixel UI components available for use in your Markdown pages.

## UI Components

### PixelButton

Three button variants with click sound and hover/press states.

\`\`\`html
<PixelButton>Default Button</PixelButton>
<PixelButton dark>Dark Button</PixelButton>
<PixelButton sound-url="">Mute Button</PixelButton>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`dark\` | \`boolean\` | \`false\` | Dark background variant |
| \`sound-url\` | \`string\` | \`/button.click.ogg\` | Click sound URL (empty to mute) |

### PixelButtonClassic

Full-width textured button with hover highlight.

\`\`\`html
<PixelButtonClassic>Classic Button</PixelButtonClassic>
\`\`\`

No props — uses default slot for content.

### PixelButton3D

Pressable 3D button with depth effect.

\`\`\`html
<PixelButton3D>3D Button</PixelButton3D>
<PixelButton3D height="6rem">Tall 3D Button</PixelButton3D>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`height\` | \`string\` | \`4rem\` | Button height (CSS value) |

### PixelInput

Text input with pixel-art border.

\`\`\`html
<PixelInput v-model="myText" />
\`\`\`

Supports \`v-model\` for two-way binding.

### PixelTextarea

Multi-line input with auto-resize.

\`\`\`html
<PixelTextarea v-model="myText" style="width:100%;min-height:6rem" />
\`\`\`

Supports \`v-model\`. Style with \`width\` and \`min-height\`.

### PixelSwitch

Toggle switch with pixel-art styling.

\`\`\`html
<PixelSwitch v-model="isOn" />
\`\`\`

Supports \`v-model\` (boolean).

### PixelDialog

Modal dialog with overlay.

\`\`\`html
<PixelDialog v-model="showDialog">
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
</PixelDialog>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`model-value\` | \`boolean\` | \`false\` | Show/hide dialog (v-model) |

## Layout Components

### HomeHero

Full-width hero section for the home page.

\`\`\`html
<HomeHero
  title="Your Site"
  subtitle="Tagline here"
  description="A brief description of your site."
  logo="/logo.svg"
  background="/background/hero-bg.jpg"
/>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Main heading |
| \`subtitle\` | \`string\` | Secondary heading |
| \`description\` | \`string\` | Description paragraph |
| \`logo\` | \`string\` | Logo image path |
| \`background\` | \`string\` | Background image path |

### HomeIntro

Image + text feature section.

\`\`\`html
<HomeIntro
  title="Feature Title"
  description="Feature description text."
  image="/background/44.jpg"
  :right="false"
/>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`title\` | \`string\` | — | Section heading |
| \`description\` | \`string\` | — | Section text |
| \`image\` | \`string\` | — | Image path |
| \`right\` | \`boolean\` | \`false\` | Image on the right side |

### BlogCard

Blog post preview card.

\`\`\`html
<BlogCard
  title="Post Title"
  brief="Short description."
  image="/background/44.jpg"
  link="/blog/my-post"
/>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Card title |
| \`brief\` | \`string\` | Short description |
| \`image\` | \`string\` | Background image |
| \`link\` | \`string\` | Target URL |

### LinkCard

Image card with link — great for link grids.

\`\`\`html
<LinkCard :link="{
  name: 'GitHub',
  url: 'https://github.com',
  image: '/background/bgbtn.jpg',
  description: 'Browse our open-source projects.'
}" />
\`\`\`

| Field | Type | Description |
|-------|------|-------------|
| \`name\` | \`string\` | Link label |
| \`url\` | \`string\` | Target URL |
| \`image\` | \`string\` | Card background image |
| \`description\` | \`string\` | Card description text |

## Using Components in Markdown

All components are globally registered — just use them directly in any \`.md\` file. For \`v-model\`, add a \`<script setup>\` block:

\`\`\`html
<script setup>
import { ref } from 'vue'
const myText = ref('')
</script>

<PixelInput v-model="myText" />
<p>You typed: {{ myText }}</p>
\`\`\``,
  },
}
