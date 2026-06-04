# VitePress Migration Plan

**Branch:** `template-cleanup`
**Status:** 📋 PLANNING
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
- Is a **separate, standalone project** (not in this repo)
- Has **zero NMO-specific content** — fully generic
- Ships with **minimal placeholder assets** (not 62 background images)
- Is **easy to clone and customize** — just edit Markdown + swap a few images
- Preserves the **Minecraft visual language** via a custom VitePress theme

---

## Migration Form Decision

### Option A: In-place migration (add VitePress to current repo)
❌ **Rejected.** The current repo is too bloated with legacy SPA code and NMO-specific assets. Adding VitePress alongside would create confusion and the large `public/` directory would still be present.

### Option B: New standalone repo for the template
✅ **Recommended.** Create a fresh repository with only what the template needs. This gives:
- Clean git history starting from zero
- No legacy SPA code to maintain
- Only essential static assets (curated subset)
- Users can clone and immediately start customizing
- Clear separation between "source material" (this repo) and "template product"

### Option C: Monorepo subdirectory
❌ **Rejected.** While it keeps git history, it also keeps the bloated `public/` and legacy code in the same workspace. The template would be buried in a subdirectory of a project that's mostly irrelevant to template users.

### Decision: **Option B — New standalone repo**

The current `neko` repo becomes **source material** — a reference for how the original components looked and behaved. The new `neko-template` repo is the **product** — a clean, minimal, customizable VitePress template.

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
Step 1 中增加：
- `git init` 后创建 `.gitignore`（忽略 `node_modules`、`.vitepress/dist`、`cache` 等）
- 确保模板仓库不包含构建产物
- 在 README 中提供两种使用方式：`npx degit` 或 GitHub "Use this template" 按钮

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
neko-template/
├── .vitepress/
│   ├── config.ts              # Site config: title, description, nav, social links
│   └── theme/
│       ├── index.ts            # Theme entry — registers all components
│       ├── components/
│       │   ├── MinecraftButton.vue
│       │   ├── MinecraftButtonClassic.vue
│       │   ├── MinecraftButton3D.vue
│       │   ├── MinecraftInput.vue
│       │   ├── MinecraftTextarea.vue
│       │   ├── MinecraftSwitch.vue
│       │   ├── MinecraftDialog.vue
│       │   ├── ScrollToTop.vue
│       │   ├── HomeHero.vue       # Hero section for index.md
│       │   ├── HomeIntro.vue      # Alternating feature sections
│       │   ├── BlogCard.vue       # Blog listing card
│       │   └── SiteFooter.vue     # Footer with social links
│       └── styles/
│           ├── vars.css           # CSS variables (Minecraft palette)
│           ├── animations.css     # fade-in, fade-in-right, etc.
│           └── mc-border.css      # .mc-border utility class
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

### Step 1 — Scaffold the new repo

```bash
mkdir neko-template
cd neko-template
npm init -y
npm install -D vitepress
npx vitepress init
```

Configure basic `package.json`:
```json
{
  "name": "neko-template",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  }
}
```

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

### Step 7 — Curate static assets

From the current `public/` directory, copy only:

| Source | Destination | Notes |
|--------|-------------|-------|
| `public/UI/` | `public/UI/` | All UI sprites (buttons, toggles, inputs, dialog) |
| `public/blockbg/dirt.png` | `public/blockbg/dirt.png` | Core block texture |
| `public/blockbg/cobblestone.png` | `public/blockbg/cobblestone.png` | Core block texture |
| `public/button.click.ogg` | `public/button.click.ogg` | Click sound |
| `public/loading.gif` | `public/loading.gif` | Loading animation |
| `public/background/bg.jpg` | `public/background/hero-bg.jpg` | Generic hero background |
| `public/mc自然风景背景图-air/1.jpg` | `public/background/scenery-1.jpg` | 1-2 curated scenic backgrounds (rename to English) |

**Do NOT copy:**
- `public/pdfjs/` — too heavy
- `public/resources/` — NMO-specific
- `public/UI/server/` — server status icons
- `public/nmo-logo.png`, `public/nmo-logo-large.png` — NMO branding
- `public/background/beidalou.webp` — NJU-specific
- `public/404.png` — NMO-branded
- All 62 background images — pick only 1-2

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
| 1 | Scaffold new repo | 15 min |
| 2 | Port theme styles | 30 min |
| 3 | Port theme components (8 components) | 2 hours |
| 4 | Create layout components (4 components) | 1.5 hours |
| 5 | Configure VitePress | 30 min |
| 6 | Create Markdown content | 1 hour |
| 7 | Curate static assets | 30 min |
| 8 | Create placeholder assets | 30 min |
| 9 | Write README | 30 min |
| 10 | Build and verify | 30 min |
| **Total** | | **~8 hours** |

---

## Notes

- The current `neko` repo remains as **source material** — it's not deleted or modified further.
- The new `neko-template` repo is **standalone** — users clone it, not this repo.
- All Minecraft UI components in the template should accept CSS variable overrides for easy theming.
- The template should work with zero configuration — just `npm install && npm run dev`.
- Customization is done by editing Markdown files and swapping assets in `public/`.
- The template is **not** a VitePress starter theme published to npm — it's a project template meant to be cloned and customized.