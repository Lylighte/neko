# VitePress Migration Plan

**Branch:** `template/vitepress` ← branched from `template-cleanup`
**Status:** ✅ COMPLETED — Steps 1-13 done. Step 11 (final src/ cleanup) + 14A (docs branch) remaining.
**Prerequisite:** Template Page Optimization Plan — ✅ COMPLETED (all 5 phases)

---

## Problem Statement

The current repository (`neko`) is a Vite + Vue 3 SPA originally built for NMO (Nanjing University Minecraft Association). After the backend strip and template optimization phases, it is now a functional static SPA — but it still carries:

- **62 background images** in `public/mc自然风景背景图-air/` (~50MB+)
- **Full PDF.js runtime** in `public/pdfjs/` (~10MB+)
- **NMO-specific assets** (logos, group photos, server icons)
- **SPA router complexity** (vue-router, HomeView shell, transition logic)
- **Legacy view components** that are now just wrappers around static data

The goal is to create a **clean, lightweight VitePress template** that:
- Lives on a **branch from `template-cleanup`** in this same repo
- Transforms the SPA **in-place** (`git rm` old files, add VitePress overlay)
- Has **zero NMO-specific content** — fully generic
- Ships with **minimal placeholder assets** (not 62 background images)
- Is **easy to clone and customize** — just edit Markdown + swap a few images
- Preserves the **Minecraft visual language** via a custom VitePress theme

---

## Migration Form Decision

### Option A: In-place migration on a new branch
✅ **Selected.** Branch from `template-cleanup` → `template/vitepress`, keep `src/` as source material during migration, install VitePress alongside. Clean and safe — `.git` stays intact throughout.

### Option B: Orphan branch
❌ **Rejected.** Requires `git checkout --orphan` + clearing worktree, which risks accidentally deleting `.git` (happened in practice). Tooling around `Remove-Item .*` in PowerShell is dangerous.

### Option C: New standalone repo
❌ **Rejected.** Would require maintaining two repos. The user wants single-repo management with limited distribution.

### Option D: Monorepo subdirectory
❌ **Rejected.** Keeps the bloated `public/` and legacy code in the same workspace. The template would be buried in a subdirectory.

### Decision: **Option A — In-place transformation on new branch** ✅

Branch from `template-cleanup` → `template/vitepress`, then transform in-place: keep `src/` as component source, install VitePress overlay, add new content, delete `src/` last.

**How it works:**
1. `git checkout -b template/vitepress` from `template-cleanup`
2. Install VitePress, create `.vitepress/` config and theme
3. Clean `public/` (remove NMO assets, PDF.js, excess backgrounds)
4. Port components from `src/` → `.vitepress/theme/components/` (Steps 2-4)
5. Create Markdown pages, write README (Steps 5-8)
6. After build verification, delete `src/` and old SPA configs (final cleanup)
7. Commit

**Benefits:**
- ✅ **Single repo** — no need to maintain two repositories
- ✅ **Shared git history** — `template-cleanup` commits visible via `git log`, easier to trace component origins
- ✅ **Simple branch workflow** — `git checkout template/vitepress` switches between template and source
- ✅ **Source material preserved** — `template-cleanup` branch untouched
- ✅ **Safe** — no `git reset --hard`, no wildcard `Remove-Item`, no risk of losing `.git`
- ✅ **`src/` available as reference** — components ported from live source, not memory

---

## Step 0 — Pre-migration Notes

Before executing the migration steps below, review and confirm these cross-cutting concerns:

### 0.1 VitePress 默认 footer 冲突
`SiteFooter.vue` 计划从旧 `FooterBar.vue` 移植，但 VitePress 默认主题本身有 `themeConfig.footer` 配置项。如果同时使用，可能出现双 footer 或样式冲突。

**决策：** 在 `config.ts` 中关闭默认 footer（设置 `themeConfig.footer` 为空），完全使用自定义 `SiteFooter` 组件。这样保留对页脚布局的完全控制，包括社交链接图标和品牌展示。

### 0.2 组件零配置容错
`HomeHero.vue` 的 `background` prop 应设置**默认 CSS 渐变**，确保用户克隆后未替换背景图时也有视觉效果，避免 hero 区域空白。

同理，所有组件应通过 props 或 CSS 变量暴露可配置项，而不是硬编码值。

### 0.3 组件移植验证
原 Vue 组件是为 Vue 3 + vue-router 编写的，直接复制到 VitePress 主题中需要适配。在 Step 3 中需逐个验证：
- 组件在 VitePress 主题环境下是否正确渲染
- `MinecraftDialog` 的原 i18n 依赖剔除后，新接口是否足够灵活
- 所有组件使用 CSS 变量而非硬编码值

### 0.4 仓库初始化规范
Step 1 中从 `template-cleanup` 分支后：
- 更新 `.gitignore`（添加 `.vitepress/dist`、`.vitepress/cache`）
- 确保模板分支不包含构建产物（`dist/`、`.vite/`）
- 在 README 中提供两种使用方式：`git clone -b template/vitepress` 或 GitHub "Use this template" 按钮

### 0.5 工作量预估修正
实际工作量预计为 **12-16 小时**（原估 8 小时偏乐观），主要风险点：
- 组件在 VitePress 中的样式覆盖和响应式适配
- 与 VitePress 内置样式的优先级冲突处理
- 跨浏览器验证（至少 Chrome/Firefox/Edge）

### 0.6 可维护性补充
- 在主题入口文件集中导出所有组件，方便用户按需替换
- 考虑增加 CSS 变量文档页，展示所有可定制变量含义
- 保留原项目中的 `NOT AN OFFICIAL MINECRAFT ORGANIZATION` 声明

---

## Template Structure

```
neko/                                   # repo root (template/vitepress branch)
├── .vitepress/
│   ├── config.ts                       # Site config: title, description, nav, social links
│   └── theme/
│       ├── index.ts                    # Theme entry — registers all components
│       ├── components/
│       │   ├── MinecraftButton.vue
│       │   ├── MinecraftButtonClassic.vue
│       │   ├── MinecraftButton3D.vue
│       │   ├── MinecraftInput.vue
│       │   ├── MinecraftTextarea.vue
│       │   ├── MinecraftSwitch.vue
│       │   ├── MinecraftDialog.vue
│       │   ├── ScrollToTop.vue
│       │   ├── HomeHero.vue
│       │   ├── HomeIntro.vue
│       │   ├── BlogCard.vue
│       │   └── SiteFooter.vue
│       └── styles/
│           ├── vars.css                # CSS variables (Minecraft palette)
│           ├── animations.css          # fade-in, fade-in-right, etc.
│           └── mc-border.css           # .mc-border utility class
├── public/
│   ├── UI/                        # Core UI sprites (buttons, toggles, inputs)
│   │   ├── button_normal.png
│   │   ├── button_hover.png
│   │   ├── text-input.png
│   │   ├── toggle_on.png
│   │   ├── toggle_off.png
│   │   ├── toggle_on_hover.png
│   │   ├── toggle_off_hover.png
│   │   └── dialog_background_hollow_4.png
│   ├── blockbg/                   # Block textures (dirt, cobblestone, etc.)
│   │   ├── dirt.png
│   │   └── cobblestone.png
│   ├── background/                # Hero background (1-2 curated images)
│   │   └── hero-bg.jpg
│   ├── button.click.ogg           # Click sound
│   └── loading.gif                # Loading animation
├── index.md                       # Home page
├── about.md                       # About page
├── blog/
│   ├── index.md                   # Blog listing
│   ├── welcome.md                 # Sample post
│   └── community-update.md        # Sample post
├── docs/
│   └── index.md                   # Document archive
├── package.json
├── tsconfig.json
└── README.md                      # Template usage instructions
```

### Key differences from the current repo

| Aspect | Current Repo | New Template |
|--------|-------------|--------------|
| Background images | 62 images (~50MB) | 1-2 curated hero backgrounds |
| PDF.js | Full runtime (~10MB) | ❌ Not included |
| NMO logos | nmo-logo.png, nmo-logo-large.png | ❌ Generic placeholder logo |
| NMO photos | groups/, restore/, server/ | ❌ Not included |
| Server icons | UI/server/ | ❌ Not included |
| 404 page | NMO-branded 404.png | ❌ Simple text 404 |
| Fonts | Multiple woff2 files | Only essential fonts |
| Vue components | 30+ components | ~12 curated theme components |
| Markdown content | None | Full set of .md pages |
| SPA router | vue-router with 10+ routes | VitePress file-based routing |
| Static data | src/data/ with sample content | Inline in Markdown frontmatter |

---

## Migration Steps

### Step 1 — Branch and scaffold VitePress

```bash
# 1.1 Create branch from template-cleanup
git checkout -b template/vitepress

# 1.2 Install VitePress
npm install -D vitepress

# 1.3 Delete old SPA entry points (NOT src/ — kept as component source!)
git rm index.html vite.config.ts tsconfig.app.json tsconfig.node.json eslint.config.ts
git rm .prettierrc.json shell.nix API.md .envrc .editorconfig

# 1.4 Clean public/ (keep only template assets)
git rm -rf public/pdfjs/
git rm -rf public/resources/
git rm -rf public/UI/server/
git rm public/nmo-logo.png public/nmo-logo-large.png
git rm public/background/beidalou.webp public/404.png
# Remove excess background images (keep 1-2 only)
git rm -rf "public/mc自然风景背景图-air/"

# 1.5 Update .gitignore for VitePress
# Add: .vitepress/dist, .vitepress/cache

# 1.6 Create .vitepress/ directory structure
mkdir -p .vitepress/theme/components .vitepress/theme/styles

# 1.7 Rename background asset
git mv public/background/bg.jpg public/background/hero-bg.jpg

# 1.8 Update package.json scripts to VitePress
# Change: "dev": "vitepress dev", "build": "vitepress build", "preview": "vitepress preview"

# 1.9 Commit
git add -A
git commit -m "Step 1: init VitePress, clean public assets, keep src/ as source"
```

**Result:** `template/vitepress` branch has:
- `src/` ✅ **KEPT** — component source material for Steps 2-4
- `public/` (cleaned — UI sprites, block textures, 2 backgrounds, click sound, loading gif)
- `docs/` (migration plan docs, preserved)
- `.vitepress/` (empty dirs, ready for Steps 2-5)
- `package.json` (updated scripts)
- `tsconfig.json`, `.gitignore` (to be updated)
- Old SPA entry points & unused configs ❌ deleted

### Step 2 — Port theme styles

Copy and adapt from `src/style.css` in the current repo:
- CSS variables (`--minecraft-green`, `--background-color`, etc.)
- Keyframe animations (`fade-in`, `fade-in-right`, `fade-in-left`, `fade-in-down`)
- `.mc-border` utility class
- Font declarations (subset to essential fonts)

**What NOT to port:**
- NMO-specific font overrides (`title-font` with `Minecraft-Tenv2`)
- Console font-smoothing overrides (they cause accessibility issues)
- Any NMO-branded color values

### Step 3 — Port theme components

For each component from `src/components/utils/`:

| Component | Action | Changes Needed |
|-----------|--------|----------------|
| `MinecraftButton.vue` | ✅ Port | Remove hardcoded sound, make border-image a CSS variable |
| `MinecraftButtonClassic.vue` | ✅ Port | Remove hardcoded sound, make background a CSS variable |
| `MinecraftButton3D.vue` | ✅ Port | Remove hardcoded sound, keep as optional variant |
| `MinecraftInput.vue` | ✅ Port | Remove border-image dependency, use CSS variables |
| `MinecraftTextarea.vue` | ✅ Port | Same as input, normalize styling |
| `MinecraftSwitch.vue` | ✅ Port | Keep as-is, it's already clean |
| `MinecraftDialog.vue` | ✅ Port | Remove `@/data/i18n` dependency, inline default text |
| `ScrollToTop.vue` | ✅ Port | No changes needed, already generic |

**What NOT to port:**
- `PdfViewer.vue` — PDF.js runtime, too heavy
- `TreeViewer.vue` — document API coupling
- `IntroItem.vue` — will be replaced by a simpler `HomeIntro.vue`
- `NavBar.vue` — VitePress handles nav via config
- `FooterBar.vue` — replaced by `SiteFooter.vue`

### Step 4 — Create layout components

#### `HomeHero.vue`
Port the hero section from `LobbyView.vue`:
- Background image with overlay
- Logo + title + description
- Accept props: `logo`, `title`, `description`, `background`

#### `HomeIntro.vue`
Port the alternating feature section from `IntroItem.vue`:
- Left/right alternating layout
- Accept props: `title`, `description`, `image`, `right`
- Used in `index.md` via VuePress slots or components

#### `BlogCard.vue`
Port from `NewsCard.vue`:
- Image + title + brief + button
- Accept props: `title`, `brief`, `image`, `link`

#### `SiteFooter.vue`
Port from `FooterBar.vue`:
- Logo + description + copyright
- Social links from site config
- Accept config via VitePress `useData()`

### Step 5 — Configure VitePress

In `.vitepress/config.ts`:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Your Organization',
  description: 'A Minecraft-themed community portal',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about' },
      { text: 'Docs', link: '/docs/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],
    footer: {
      message: 'Built with VitePress',
      copyright: '© 2025 - All rights reserved',
    },
  },
})
```

### Step 6 — Create Markdown content

#### `index.md` (Home)
```md
---
layout: home
hero:
  name: Your Organization
  text: Minecraft Community
  tagline: Building a vibrant community where creativity meets technology.
  image: /logo.png
  actions:
    - theme: brand
      text: Get Started
      link: /about
    - theme: alt
      text: View Blog
      link: /blog/
---

<HomeIntro title="Build Amazing Things" description="..." image="/background/hero-bg.jpg" />
<HomeIntro title="Learn & Share" description="..." image="/background/hero-bg.jpg" :right="true" />
```

#### `about.md`
```md
# About Us

Your organization description here.

## Links

- [GitHub](https://github.com)
- [Community Forum](#)
```

#### `blog/index.md`
```md
# Blog

<BlogCard title="Welcome" brief="..." image="..." link="/blog/welcome" />
<BlogCard title="Community Update" brief="..." image="..." link="/blog/community-update" />
```

#### `blog/welcome.md`
```md
---
title: Welcome
date: 2025-01-01
author: Community Team
---

# Welcome to Our Community

Content here...
```

### Step 7 — Curate static assets (keep/delete in place)

Since we're on a branch from `template-cleanup`, `public/` already has all assets. Strategy: **delete unwanted, keep needed, rename where appropriate.**

| Keep (already in place) | Notes |
|--------------------------|-------|
| `public/UI/` | All UI sprites (buttons, toggles, inputs, dialog) |
| `public/blockbg/dirt.png` | Core block texture |
| `public/blockbg/cobblestone.png` | Core block texture |
| `public/button.click.ogg` | Click sound |
| `public/loading.gif` | Loading animation |
| `public/background/hero-bg.jpg` | Renamed from `bg.jpg` in Step 1 |
| `public/background/scenery-1.jpg` | Copy 1 from `mc自然风景背景图-air/` before deleting the folder |

**Delete (done in Step 1):**
- `public/pdfjs/` — too heavy
- `public/resources/` — NMO-specific
- `public/UI/server/` — server status icons
- `public/nmo-logo.png`, `public/nmo-logo-large.png` — NMO branding
- `public/background/beidalou.webp` — NJU-specific
- `public/404.png` — NMO-branded
- `public/mc自然风景背景图-air/` — 62 images, keep only 1-2

### Step 8 — Create placeholder assets

Create simple placeholder assets so the template works out of the box:

- **logo.svg** — A simple SVG logo (e.g., a cube icon) instead of a PNG
- **hero-bg.jpg** — A generic Minecraft-style landscape (can be a CC0 image)
- **404 illustration** — Simple text-based 404, no image needed

### Step 9 — Write README

The README should include:
- What the template is
- Quick start instructions
- How to customize (change logo, colors, content)
- How to add blog posts
- How to deploy

### Step 10 — Build and verify

```bash
npm run build
npm run preview
```

Verify:
- Home page renders with hero and intro sections
- Blog listing shows sample posts
- Blog post pages render markdown content
- About page shows links and intro
- Docs page shows document content
- Navigation works correctly
- Mobile responsive
- All Minecraft UI components render correctly

### Step 11 — Final cleanup (delete src/ and old configs)

After build verification passes, remove the legacy SPA source now that all components are ported:

```bash
git rm -rf src/
git rm tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.ts
git rm .prettierrc.json shell.nix API.md .envrc .editorconfig
# Clean up remaining old deps from package.json
# Remove: vue-router, mitt, @vuepic/vue-datepicker, and devDeps (eslint, prettier, vue-tsc, etc.)
git add package.json package-lock.json
git commit -m "Step 11: final cleanup — remove src/ and old SPA configs"
```

---

## What NOT to include (summary)

| Category | Items | Reason |
|----------|-------|--------|
| **SPA infrastructure** | vue-router, HomeView shell, App.vue transition | VitePress handles routing natively |
| **API layer** | src/api/, axios, JWT logic | Already stripped, but ensure no traces |
| **Management views** | ManagementView, UserManagement, etc. | Admin dashboard, not template material |
| **Auth views** | LoginView | Backend coupling |
| **Server-specific** | ListView, ListItem, server icons | Upstream-specific |
| **Activity-specific** | ActivityView, ActivityItem | Upstream-specific |
| **Document editor** | DocumentsEditor, TreeViewer | Backend coupling |
| **PDF.js** | PdfViewer, public/pdfjs/ | Heavy runtime, app-specific |
| **NMO branding** | Logos, group photos, NJU backgrounds | Organization-specific |
| **Bulk backgrounds** | 62 scenic images | Too many, pick 1-2 |
| **Event bus** | src/eventbus/ | Only used by TreeViewer |
| **Toast system** | vue-toastification, toast.css | Backend-era UI feedback |
| **Markdown editor** | md-editor-v3, md-preview.css | Authoring tool, not template |
| **Clipboard** | vue-clipboard3 | Server-list specific |
| **i18n** | src/data/i18n.ts | Only used by MinecraftDialog, inline instead |

---

## Effort Estimate

| Step | Description | Estimated Effort |
|------|-------------|-----------------|
| 1 | Branch and scaffold VitePress | 15 min |
| 2 | Port theme styles | 30 min |
| 3 | Port theme components (8 components) | 2 hours |
| 4 | Create layout components (4 components) | 1.5 hours |
| 5 | Configure VitePress | 30 min |
| 6 | Create Markdown content | 1 hour |
| 7 | Curate static assets | 30 min |
| 8 | Create placeholder assets | 30 min |
| 9 | Write README | 30 min |
| 10 | Build and verify | 30 min |
| 11 | Final cleanup (delete src/) | 15 min |
| **Total** | | **~9 hours** |

---

## Notes

- The `template-cleanup` branch remains as **source material** — it's not deleted or modified further.
- Template lives on `template/vitepress` branch — `git checkout template/vitepress` to work on it.
- All Minecraft UI components in the template should accept CSS variable overrides for easy theming.
- The template should work with zero configuration — just `npm install && npm run dev`.
- Customization is done by editing Markdown files and swapping assets in `public/`.
- The template is **not** a VitePress starter theme published to npm — it's a project template meant to be cloned and customized.