# Step 11 — Final Cleanup Plan

**Status:** 📋 PLANNED
**Goal:** Remove all legacy SPA source files from `template/vitepress` branch without breaking the template build.

**Safety rule:** Every batch = `git rm` → `git commit` → `npx vitepress build` → verify pass before next batch.

---

## Files to KEEP

| Path | Why |
|------|-----|
| `.vitepress/` | Template core |
| `public/` | All static assets |
| `index.md` | Home page |
| `about.md` | About page |
| `blog/` | Blog posts |
| `docs/index.md` | Docs browser |
| `dev-notes/` | Development notes (excluded from build) |
| `README.md` | Template README |
| `package.json` | Already cleaned |
| `tsconfig.json` | Will trim in final batch |
| `.gitignore` | Already updated for VitePress |
| `.gitattributes` | Keep as-is |
| `.vscode/` | Keep (editor config) |
| `.github/` | Will remove (old SPA deploy workflow) |

---

## Batches

### Batch 1 — SPA entry points

```bash
git rm src/App.vue src/main.ts src/style.css src/vite-env.d.ts
git commit -m "Step 11.1: rm SPA entry points (App, main, style, vite-env)"
npx vitepress build  # < 2s, should pass
```

Files: 4. Risk: zero — all logic already in `.vitepress/theme/`.

### Batch 2 — vue-router config

```bash
git rm src/router/index.ts
git commit -m "Step 11.2: rm vue-router config"
npx vitepress build
```

Files: 1. Risk: zero — no router imports remain in template.

### Batch 3 — old static data layer

```bash
git rm src/data/config.ts src/data/i18n.ts src/data/static.ts src/data/types.ts
git commit -m "Step 11.3: rm old static data layer (siteConfig, i18n, static, types)"
npx vitepress build
```

Files: 4. Risk: zero — all data ported to `.vitepress/theme/data/docs.ts` or inlined in Markdown frontmatter.

### Batch 4 — lantern (NMO-specific)

```bash
git rm -rf src/lantern/
git commit -m "Step 11.4: rm NMO festival lantern module"
npx vitepress build
```

Files: ~2. Risk: zero — never imported in template.

### Batch 5 — font files

```bash
git rm -rf src/font/
git commit -m "Step 11.5: rm old font assets (not referenced by template)"
npx vitepress build
```

Files: ~3-5. Risk: low — fonts are CSS `font-family` strings, no functional import.

### Batch 6 — FooterBar.vue (ported)

```bash
git rm src/components/FooterBar.vue
git commit -m "Step 11.6: rm FooterBar.vue (ported to SiteFooter.vue)"
npx vitepress build
```

Files: 1. Risk: zero — not imported anywhere in template.

### Batch 7 — NavBar.vue (ported)

```bash
git rm src/components/NavBar.vue
git commit -m "Step 11.7: rm NavBar.vue (ported to .vitepress/theme/components/NavBar.vue)"
npx vitepress build
```

Files: 1. Risk: zero — not imported anywhere in template.

### Batch 8 — IntroItem.vue (replaced)

```bash
git rm src/components/IntroItem.vue
git commit -m "Step 11.8: rm IntroItem.vue (replaced by HomeIntro.vue)"
npx vitepress build
```

Files: 1. Risk: zero — not imported anywhere in template.

### Batch 9 — utils/ leftovers (PdfViewer, TreeViewer)

```bash
git rm -rf src/components/utils/
git commit -m "Step 11.9: rm old utils/ — PdfViewer, TreeViewer (never ported)"
npx vitepress build
```

Files: ~4. Risk: low — these were never ported to template. Check for any vestigial imports first.

### Batch 10 — icons/ leftovers (ListIcon, etc.)

```bash
git rm -rf src/components/icons/
git commit -m "Step 11.10: rm old icons/ — ListIcon etc (never ported)"
npx vitepress build
```

Files: ~2. Risk: low — only Github/Bilibili/QQ/Calendar were ported; rest are unused.

### Batch 11 — all old views

```bash
git rm -rf src/views/
git commit -m "Step 11.11: rm all old view components (Lobby, News, About, Documents, NotFound, HomeView)"
npx vitepress build
```

Files: ~10. Risk: low — all replaced by Markdown pages + custom components.

### Batch 12 — old deploy workflow

```bash
git rm -rf .github/
git commit -m "Step 11.12: rm old GitHub Actions deploy workflow (SPA-era)"
npx vitepress build
```

Files: 1 directory. Risk: zero — template has no CI defined.

### Batch 13 — LICENSE

```bash
git rm LICENSE
git commit -m "Step 11.13: rm LICENSE (template doesn't ship one)"
npx vitepress build
```

Files: 1. Risk: zero — not referenced.

### Batch 14 — trim tsconfig.json

```bash
# Edit tsconfig.json: remove @/* path alias (no longer points to anything useful)
git add tsconfig.json
git commit -m "Step 11.14: trim tsconfig — remove unused @/* path alias"
npx vitepress build
```

Files: 1 edit. Risk: low — `@/*` was used by old SPA; template uses relative imports.

### Batch 15 — final prune + verify

```bash
npm prune
npm install
npx vitepress build
git add package-lock.json
git commit -m "Step 11.15: npm prune, final build verification"
```

Files: package-lock.json. Risk: zero — standard cleanup.

---

## Post-11 state

```
template/vitepress/
├── .vitepress/          # theme + config
├── public/              # assets
├── blog/                # 3 .md posts
├── docs/                # 1 index.md (browser)
├── dev-notes/           # migration plans
├── index.md
├── about.md
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .gitattributes
└── .vscode/
```

No `src/`. No `.github/`. No `LICENSE`. Clean VitePress template.

---

## Effort

| Item | Time |
|------|------|
| 15 batches × (rm + commit + build) | ~25 min |
| Total | **~30 min** |
