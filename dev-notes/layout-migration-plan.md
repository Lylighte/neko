# Step 12 — Custom Layout Migration Plan

**Status:** 📋 PLANNING
**Goal:** Replace VitePress default layout with custom Minecraft-themed `Layout.vue` to bridge the gap between `template-cleanup` and `template/vitepress`.

---

## Problem

Current `template/vitepress` uses `extends: DefaultTheme`, which means:
- VitePress default nav bar (white/dark text links) renders on top of our content
- Minecraft NavBar (purple slider, dark glass bg, click sound) is **absent**
- Content is wrapped in VitePress's `.VPDoc` container (constrained width, light background)
- VitePress `:root` CSS variables override Minecraft palette → page background is wrong
- SiteFooter rendered inside content area, not as full-width chrome

## Solution

Create `.vitepress/theme/Layout.vue` — a **slot-based wrapper** that:
1. Wraps `<Content />` (VitePress Markdown output) inside our Minecraft chrome
2. Provides NavBar, Footer, and global dark background **outside** VitePress content area
3. Uses `useData()` to access VitePress config for nav items / social links

---

## Architecture

```
.vitepress/theme/Layout.vue          ← NEW: replaces DefaultTheme layout
  ├── <NavBar />                     ← NEW: ported from template-cleanup
  ├── <slot><!-- <Content /> --></slot>  ← VitePress injects Markdown here
  └── <SiteFooter />                 ← EXISTING: already works, just moves outside content
```

```
.vitepress/theme/index.ts
  Layout,                              ← override (was extends: DefaultTheme)
  enhanceApp: unchanged                ← keep component registration
```

---

## Tasks

### 12.1 — Port NavBar from template-cleanup

Source: `src/components/NavBar.vue` on `template-cleanup`

Changes needed:
| Original | New |
|----------|-----|
| `vue-router` (`useRouter`, `onBeforeRouteUpdate`) | `<a>` links + `useRoute()` from `vitepress` |
| `@/lantern/lantern` (festival lantern) | ❌ Remove — NMO-specific decoration |
| `@/data/config` (`siteConfig.nav`) | `useData().theme.nav` from VitePress config |
| Hardcoded nav items | Dynamically from `themeConfig.nav` in `.vitepress/config.ts` |
| Click sound via `Audio()` | Keep as `soundUrl` prop |

**Output:** `.vitepress/theme/components/NavBar.vue`

### 12.2 — Create custom Layout.vue

**Output:** `.vitepress/theme/Layout.vue`

Structure:
```vue
<template>
  <div class="minecraft-layout">
    <NavBar />
    <main class="main-content">
      <Content />
    </main>
    <SiteFooter />
    <ScrollToTop />
  </div>
</template>
```

Key design decisions:
- `.minecraft-layout` global dark background via `vars.css`
- No VitePress sidebar, doc footer, or prev/next links
- `<Content />` is the only VitePress-rendered piece
- `SiteFooter` gets full-width chrome position (not constrained)

### 12.3 — Update theme entry (index.ts)

Changes:
```diff
- extends: DefaultTheme,
+ Layout,
```
Import `Layout` from `./Layout.vue`.

### 12.4 — Update config.ts

Remove `themeConfig.nav` since NavBar reads it via `useData()` — keep it.

Remove `themeConfig.footer` since SiteFooter handles it — keep empty.

Remove `themeConfig.socialLinks` — move to separate config or keep as-is. (Decision: keep in config, SiteFooter reads via `useData()`.)

### 12.5 — Fix CSS variable precedence (do this FIRST)

Since we no longer use `DefaultTheme`, the entire site is under our layout. Override at `:root` level in `vars.css`:

```css
/* Override VitePress default variables with Minecraft palette */
:root {
  --vp-c-bg: var(--background-color);
  --vp-c-bg-elv: var(--background-card);
  --vp-c-bg-soft: var(--background-card);
  --vp-c-text-1: rgba(255, 255, 255, 0.8);
  --vp-c-text-2: rgba(255, 255, 255, 0.6);
  --vp-c-border: #909399;
  --vp-c-divider: #3d3938;
  --vp-c-brand-1: var(--minecraft-green-light);
  --vp-c-brand-2: var(--minecraft-green);
  --vp-c-brand-3: var(--minecraft-green-dark);
}
```

After this step, build and inspect with DevTools to ensure no VitePress light-theme variables remain visible.

### 12.6 — Update HomeHero

Remove `HomeHero` from `index.md` frontmatter hero config → VitePress `layout: home` renders its own hero. Instead, put `<HomeHero>` directly in `index.md` as the first component, and use `layout: page` (or no layout) to avoid VitePress's default hero rendering.

Actually: VitePress `layout: home` gives us the hero section automatically. We need to decide: use VitePress home layout OR custom HomeHero.

**Decision:** Use `layout: page` + `<HomeHero />` in Markdown. This gives us full control.

### 12.7 — Remove dead docs links

`docs/template-migration-report.md` has links to `../src/components/...` — these are dead. Remove or replace with references to `.vitepress/theme/components/`.

**Decision:** Keep the report as-is with `ignoreDeadLinks` already in config. Template users won't read these docs — they're migration artifacts.

---

## Component Changes Summary

| File | Action |
|------|--------|
| `.vitepress/theme/Layout.vue` | ✨ CREATE |
| `.vitepress/theme/components/NavBar.vue` | ✨ CREATE (ported from cleanup) |
| `.vitepress/theme/index.ts` | ✏️ `extends: DefaultTheme` → `Layout` |
| `.vitepress/theme/styles/vars.css` | ✏️ Add VitePress variable overrides |
| `index.md` | ✏️ `layout: home` → `layout: page` |
| `.vitepress/config.ts` | ✏️ Minor — remove unused nav if needed |

---

## Effort Estimate

| Task | Time |
|------|------|
| 12.5 CSS 全覆盖（先做基础验证） | 45 min |
| 12.1 Port NavBar | 60 min |
| 12.2 Create Layout.vue | 30 min |
| 12.3-12.4 Update theme entry + config | 15 min |
| 12.6 Update index.md | 15 min |
| 12.7 Docs cleanup | 15 min |
| Build + full site verification | 45 min |
| README update | 15 min |
| **Total** | **~4.5 hours** |

---

## Execution Order (revised per review)

1. **12.5 first** — CSS overrides on `:root`, verify with browser DevTools
2. **12.1** — Port NavBar standalone, test nav highlight logic
3. **12.2** — Compose Layout.vue with all chrome
4. **12.3-12.4** — Wire theme entry + config
5. **12.6** — Switch `layout: home` → `layout: page` + `<HomeHero />`
6. **Full site walkthrough** — home, about, blog listing, blog post, docs
7. **README** — Note custom layout, no DefaultTheme inheritance

---

## Reviewer Notes (accepted)

1. **CSS `:root` override, not `.minecraft-layout`** — cleaner, no missed edge cases
2. **NavBar highlight logic needs defensive parsing** — `themeConfig.nav` structure differs from `siteConfig.nav`
3. **`layout: page` may have preset max-width** — must break in Layout.vue CSS
4. **Mobile nav menu** — original NavBar has no hamburger. Acceptable for first iteration.
5. **README must state** — "custom Layout replaces DefaultTheme entirely"
