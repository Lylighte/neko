---
layout: page
---

# Quick Start

Get your Pixel-themed site up and running in minutes.

## Prerequisites

- **Node.js** 18 or later
- A code editor (VS Code recommended)

## Setup

```bash
# Clone the template
git clone -b template/vitepress <repo-url> my-site
cd my-site

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser. You should see the home page with the Pixel theme.

## Project Structure

```
my-site/
├── .vitepress/
│   ├── config.ts              # Site config (title, nav, etc.)
│   └── theme/
│       ├── index.ts           # Theme entry (registers components)
│       ├── Layout.vue         # Custom page layout
│       ├── components/        # Pixel UI components
│       ├── styles/            # CSS variables & animations
│       └── data/              # Static data
├── index.md                   # Home page
├── about.md                   # About page
├── news/                      # News posts
├── docs/                      # Documentation pages
└── public/                    # Static assets
    ├── logo.svg
    ├── background/            # Background images
    └── UI/                    # UI sprite images
```

## Key Files

| File | Purpose |
|------|---------|
| `.vitepress/config.ts` | Site title, nav links, social links |
| `.vitepress/theme/styles/vars.css` | Color palette and CSS variables |
| `index.md` | Home page content |
| `public/logo.svg` | Site logo |

## Next Steps

- **[Customization](/docs/customization)** — Change colors, logo, and backgrounds
- **[News Guide](/docs/news)** — Write your first news post
- **[Component Reference](/docs/components)** — Explore available UI components
- **[Deployment](/docs/deployment)** — Build and publish your site