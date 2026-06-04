# VitePress Migration — Session Handoff

## Project Context

This is a Vite + Vue 3 + TypeScript SPA originally built for NMO (Nanjing University Minecraft Association). After backend stripping and template optimization, it's now a functional static SPA. The next phase is to migrate it to a **VitePress template** on an **orphan branch**.

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

## Migration Strategy: Orphan Branch

The VitePress template will be created on an **orphan branch** (`template/vitepress`) within this same repository. This gives:
- Clean git history (no legacy baggage)
- Single-repo management
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

### Step 1 — Create orphan branch and init VitePress
```bash
git checkout --orphan template/vitepress
git reset --hard
npm init -y
npm install -D vitepress
npx vitepress init
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
Copy from current `public/`:
- `UI/` (all sprites)
- `blockbg/dirt.png`, `blockbg/cobblestone.png`
- `button.click.ogg`
- `loading.gif`
- `background/bg.jpg` → `background/hero-bg.jpg`
- 1-2 from `mc自然风景背景图-air/` → `background/scenery-*.jpg`

**Don't copy:** pdfjs/, resources/, UI/server/, nmo-logo*, beidalou.webp, 404.png.

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

- **Orphan branch** (`template/vitepress`) — clean history, no legacy baggage
- **Custom footer** — override VitePress default, use `SiteFooter.vue`
- **No i18n** — inline text in components, no `@/data/i18n` dependency
- **No PDF.js** — too heavy, app-specific
- **Minimal assets** — 1-2 hero backgrounds instead of 62
- **CSS variables** — all theme values exposed for easy customization