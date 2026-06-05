# VitePress Migration — Session Handoff

## Project Context

This is a Vite + Vue 3 + TypeScript SPA originally built for NMO (Nanjing University Minecraft Association). After backend stripping and template optimization, it's now a functional static SPA. The next phase is to migrate it to a **VitePress template** on a new **branch from `template-cleanup`**.

## Outcome (2025-06-05)

✅ Migration complete on `template/vitepress`. Build passes. Key deliverables:

- Custom `Layout.vue` (replaces DefaultTheme) → Minecraft NavBar, SiteFooter, ScrollToTop
- 12 themed components (Button x3, Input, Textarea, Switch, Dialog, HomeHero, HomeIntro, BlogCard, LinkCard, ArticleView, DocTree, DocViewer)
- CSS variable system with Minecraft palette
- 6 Markdown pages: index, about, blog (3), docs → docs tree browser
- Cleaned public/ (no PDF.js, no NMO assets, 2 curated backgrounds)
- Dev notes moved to `dev-notes/`, excluded from VitePress build

Remaining: Step 11 (git rm src/), push to origin, branch `template/vitepress-docs`.

## Current State

- **Branch:** `template-cleanup` (source material)
- **Plan:** `docs/vitepress-migration-plan.md`
- **Report:** `docs/template-migration-report.md`
- **Previous optimization plan:** `docs/template-page-optimization-plan.md` (completed)

### What's been done (template-cleanup branch)

| Commit | Description |
|--------|-------------|
| `b8c934c` | Created static data layer (`src/data/types.ts`, `static.ts`, `config.ts`), fixed 8 broken views |
| `0b452a7` | Extracted hardcoded content to `siteConfig` (NavBar, FooterBar, App, Lobby) |
| `7f3ccc2` | Deleted List and Activity pages, cleaned router |
| `4158f1d` | Fixed type-check errors, build verification |
| `a3fde84` | Extracted UI text to i18n, removed Chinese hardcoded strings |
| `542ecfb` | Added VitePress migration plan with pre-migration notes |

### Build status
- `npm run type-check` ✅ zero errors
- `npm run build` ✅ 95 modules, 1.20s

## Migration Strategy: Branch from template-cleanup

The VitePress template will be created on a **new branch** (`template/vitepress`) from `template-cleanup`, then transformed in-place:
- `git rm` old SPA files (`src/`, `index.html`, SPA configs)
- Clean `public/` (remove NMO assets, PDF.js, excess backgrounds)
- Install VitePress, create `.vitepress/` theme
- Create Markdown content, write README

This gives:
- Git history continuity (can trace component origins back to `template-cleanup`)
- Single-repo management
- Safe — no `git reset --hard`, no risk of losing `.git`
- Old branches (`main`, `template-cleanup`) remain as source material

## File Structure (Current Repo — Source Material)

```
neko/
├── src/
│   ├── components/utils/     # Minecraft UI components to port
│   │   ├── MinecraftButton.vue
│   │   ├── MinecraftButtonClassic.vue
│   │   ├── MinecraftButton3D.vue
│   │   ├── MinecraftInput.vue
│   │   ├── MinecraftTextarea.vue
│   │   ├── MinecraftSwitch.vue
│   │   ├── MinecraftDialog.vue
│   │   └── ScrollToTop.vue
│   ├── components/icons/     # SVG icons to port
│   │   ├── BilibiliIcon.vue
│   │   ├── CalendarIcon.vue
│   │   ├── GithubIcon.vue
│   │   ├── ListIcon.vue
│   │   └── QQIcon.vue
│   ├── style.css             # CSS variables, animations, mc-border
│   ├── data/
│   │   ├── config.ts         # Site config (reference for VitePress config)
│   │   ├── types.ts          # Type definitions
│   │   └── static.ts         # Sample content data
│   └── views/                # Page content to translate to Markdown
│       ├── Lobby/            # → index.md (home page)
│       ├── News/             # → blog/ (blog listing + posts)
│       ├── About/            # → about.md
│       └── Documents/        # → docs/ (document archive)
├── public/
│   ├── UI/                   # Core UI sprites (port to template)
│   ├── blockbg/              # Block textures (port dirt.png, cobblestone.png)
│   ├── background/           # Background images (port bg.jpg, exclude beidalou.webp)
│   ├── button.click.ogg      # Click sound (port)
│   └── loading.gif           # Loading animation (port)
└── docs/
    └── vitepress-migration-plan.md  # Full migration plan
```

## Migration Steps (from plan)

### Step 1 — Create branch and init VitePress
```bash
git checkout -b template/vitepress
npm install -D vitepress
# Delete old SPA files, clean public/, update .gitignore
# Create .vitepress/ directory structure
```

### Step 2 — Port theme styles
From `src/style.css`: CSS variables, keyframe animations, `.mc-border` class.
**Don't port:** NMO-specific font overrides, console font-smoothing overrides.

### Step 3 — Port theme components (8 components)
From `src/components/utils/`:
- `MinecraftButton.vue` — remove hardcoded sound, make border-image a CSS variable
- `MinecraftButtonClassic.vue` — remove hardcoded sound, make background a CSS variable
- `MinecraftButton3D.vue` — remove hardcoded sound, keep as optional variant
- `MinecraftInput.vue` — remove border-image dependency, use CSS variables
- `MinecraftTextarea.vue` — same as input, normalize styling
- `MinecraftSwitch.vue` — keep as-is
- `MinecraftDialog.vue` — remove `@/data/i18n` dependency, inline default text
- `ScrollToTop.vue` — no changes needed

**Don't port:** PdfViewer, TreeViewer, IntroItem, NavBar, FooterBar.

### Step 4 — Create layout components (4 components)
- `HomeHero.vue` — from `LobbyView.vue` hero section
- `HomeIntro.vue` — from `IntroItem.vue` alternating feature section
- `BlogCard.vue` — from `NewsCard.vue`
- `SiteFooter.vue` — from `FooterBar.vue`

### Step 5 — Configure VitePress
`.vitepress/config.ts`: title, description, nav, social links.
**Disable default footer** (use custom `SiteFooter` instead).

### Step 6 — Create Markdown content
- `index.md` — home page with hero + intro sections
- `about.md` — about page with links
- `blog/index.md` — blog listing
- `blog/welcome.md` — sample post
- `blog/community-update.md` — sample post
- `docs/index.md` — document archive

### Step 7 — Curate static assets
Keep in `public/` (already in place, delete unwanted):
- `UI/` (all sprites)
- `blockbg/dirt.png`, `blockbg/cobblestone.png`
- `button.click.ogg`
- `loading.gif`
- `background/bg.jpg` → rename to `background/hero-bg.jpg`
- 1-2 from `mc自然风景背景图-air/` → `background/scenery-*.jpg`, then delete the folder

**Delete:** pdfjs/, resources/, UI/server/, nmo-logo*, beidalou.webp, 404.png.

### Step 8 — Create placeholder assets
- `logo.svg` — simple SVG cube icon
- `hero-bg.jpg` — generic landscape
- 404 — text-based, no image needed

### Step 9 — Write README
Quick start, customization guide, deployment instructions.

### Step 10 — Build and verify
```bash
npm run build
npm run preview
```

## Pre-migration Notes (Step 0)

1. **Default footer conflict** — Disable VitePress default footer, use custom `SiteFooter`
2. **Zero-config fallback** — `HomeHero` background should have a CSS gradient default
3. **Component verification** — Test each component in VitePress theme context
4. **Repo init** — Create `.gitignore` (node_modules, .vitepress/dist, cache)
5. **Effort estimate** — 12-16 hours (not 8)
6. **Maintainability** — Export all components from theme entry, document CSS variables
7. **Copyright** — Keep `NOT AN OFFICIAL MINECRAFT ORGANIZATION` disclaimer

## Key Decisions

- **Branch from template-cleanup** (`template/vitepress`) — safe, preserves git history, no risk of deleting `.git`
- **In-place transformation** — `git rm` old files, overlay VitePress
- **Custom footer** — override VitePress default, use `SiteFooter.vue`
- **No i18n** — inline text in components, no `@/data/i18n` dependency
- **No PDF.js** — too heavy, app-specific
- **Minimal assets** — 1-2 hero backgrounds instead of 62
- **CSS variables** — all theme values exposed for easy customization