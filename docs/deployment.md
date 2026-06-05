---
layout: page
---

# Deployment

Build your site for production and deploy to static hosting.

## Build

```bash
npm run build
```

The output goes to `.vitepress/dist/`. This folder contains static HTML, CSS, JS, and assets — ready to serve.

## Preview Locally

```bash
npm run preview
```

This serves the built output so you can verify everything looks correct before deploying.

## Deploy to GitHub Pages

1. Push your repository to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Create `.github/workflows/deploy.yml`:

```yaml
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
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vitepress/dist
```

## Deploy to Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.vitepress/dist`
4. Deploy!

## Deploy to Vercel

1. Import your Git repository on Vercel
2. Framework preset: **VitePress**
3. Vercel auto-detects build settings — just click Deploy

## Custom Domain

All platforms support custom domains. Follow their respective documentation to set up DNS and SSL.