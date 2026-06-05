# Phase 13C — Docs Directory Overhaul

**Status:** 📋 PLANNING
**Goal:** Turn `docs/` from migration artifacts into the template's built-in customization guide.

---

## Context

Current `docs/` on `template/vitepress`:

| File | Type | Action |
|------|------|--------|
| `index.md` | Placeholder "Document archive" | **Rewrite** as guide landing page |
| `backend-strip-plan.md` | Migration artifact | **Delete** (preserved on `template-cleanup`) |
| `layout-migration-plan.md` | Migration artifact | **Delete** |
| `template-migration-report.md` | Migration artifact | **Delete** |
| `template-page-optimization-plan.md` | Migration artifact | **Delete** |
| `view-parity-plan.md` | Migration artifact | **Delete** |
| `vitepress-migration-plan.md` | Migration artifact | **Delete** |
| `vitepress-session-handoff.md` | Migration artifact | **Delete** |

No new branch needed. Migration docs are fully preserved on `template-cleanup`.

---

## New File Structure

```
docs/
├── index.md              ← Guide landing page (links to sub-pages)
├── customization.md      ← Logo, colors, CSS variables, background images
├── blogging.md           ← How to add/edit blog posts, frontmatter reference
├── components.md         ← Available Minecraft UI & layout components
└── deployment.md         ← Build, preview, deploy to static hosting
```

---

## Content Plan

### `index.md` — Getting Started
- Brief intro: what this template is
- Link grid (using `<LinkCard>`) to sub-pages
- Quick links: "Edit this page →"

### `customization.md` — Site Customization
- Change `title`/`description` in `.vitepress/config.ts`
- Replace `logo.svg`
- CSS variable reference table (all `--minecraft-*`, `--btn-*`, `--input-*`)
- Hero backgrounds: swap `public/background/hero-bg.jpg`
- Nav items: edit `themeConfig.nav` in `config.ts`

### `blogging.md` — Writing Blog Posts
- File naming: `blog/my-post.md`
- Frontmatter reference:
  ```yaml
  title: string (required)
  date: YYYY-MM-DD (required)
  author.name: string
  author.avatar: path
  author.tags: [{text, color, bg}]
  cover: path
  category: string
  ```
- Add `<BlogCard>` to `blog/index.md`
- VitePress Markdown features (code blocks, alerts, etc.)

### `components.md` — Component Reference
- UI components: `MinecraftButton`, `MinecraftInput`, etc. (props table)
- Layout components: `HomeHero`, `HomeIntro`, `BlogCard`, `LinkCard` (props table)
- Usage in Markdown: `<Component prop="value">`

### `deployment.md` — Build & Deploy
- `npm run build`
- `npm run preview`
- Deploy to GitHub Pages / Netlify / Vercel

---

## Implementation Steps

| # | Task | Effort |
|---|------|--------|
| 13C.1 | Delete 6 migration artifacts (git rm) | 5 min |
| 13C.2 | Write `index.md` (guide landing + LinkCard grid) | 15 min |
| 13C.3 | Write `customization.md` | 20 min |
| 13C.4 | Write `blogging.md` | 15 min |
| 13C.5 | Write `components.md` | 20 min |
| 13C.6 | Write `deployment.md` | 10 min |
| 13C.7 | Build & verify | 10 min |
| 13C.8 | Update `README.md` — link to docs/ for full guide | 5 min |
| **Total** | | **~1.5 hours** |

---

## What users see

```
Nav:  Home | Blog | About | Docs
                              └── Getting Started
                                   ├── Customization
                                   ├── Blogging
                                   ├── Components
                                   └── Deployment
```

The `docs/` section becomes the template's self-documentation — every template user can read it directly in their own VitePress instance. No external wiki needed.
