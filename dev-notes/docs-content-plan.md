# Docs Content Rewrite Plan

**Status:** 📋 PLANNING
**Goal:** Replace 8 placeholder docs from `docs.ts` with real template usage guides.

---

## Current state

`docs.ts` has 8 placeholder docs (Getting Started, FAQ, Troubleshooting, Basic/Advanced Techniques, Tips, API Docs, Changelog) — relics from `static.ts` on cleanup.

## Target: 5 real docs

```
docs/
├── index.md              ← DocsBrowser (DocTree + DocViewer)
└── (content via docs.ts)

Tree:
  📁 Getting Started
    📄 Quick Start
    📄 Customization
    📄 Deployment
  📁 Writing Content
    📄 Blogging Guide
    📄 Component Reference
```

| id | name | content |
|----|------|---------|
| `quick-start` | Quick Start | install, dev, build, project structure overview |
| `customization` | Customization | logo, colors (CSS vars table), hero bg, nav items, footer |
| `deployment` | Deployment | build, preview, GitHub Pages / Netlify / Vercel |
| `blogging` | Blogging Guide | frontmatter fields, ArticleView, BlogCard, add to listing |
| `components` | Component Reference | all 12 components with props tables |

## Changes

| File | Action |
|------|--------|
| `.vitepress/theme/data/docs.ts` | Rewrite — new tree, 5 real docs |
| `dev-notes/docs-content-plan.md` | This file |

## Effort

~30 min. No component changes, no CSS — just rewrite `docs.ts` strings.
