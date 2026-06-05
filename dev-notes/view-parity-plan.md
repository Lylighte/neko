# Step 13 — View Parity Plan

**Status:** ✅ COMPLETED (13A + 13B + 13C done)
**Goal:** Bring 3 remaining VitePress pages up to par with their `template-cleanup` counterparts.

---

## Gap Analysis

| cleanup View | current VitePress page | Gap |
|-------------|----------------------|-----|
| `NewsDetail.vue` | `blog/*.md` | No cover image, no author block (avatar+name+tags), no date display |
| `AboutView.vue` + `LinkItem.vue` | `about.md` | No LinkItem card grid, no intro sections |
| `DocumentsView.vue` (massive) | `docs/index.md` | No tree nav, no doc viewer, rotating backgrounds |

---

## Phase 13A — Blog Post Detail (`NewsDetail → ArticleView.vue`)

### cleanup structure
```
┌─────────────────────────────┐
│  Cover image (full-width)   │
├─────────────────────────────┤
│  Sidebar       │  Content   │
│  ┌───────────┐ │            │
│  │ Avatar     │ │  Markdown │
│  │ Username   │ │  sections │
│  │ Tags       │ │            │
│  │ Date/range │ │            │
│  └───────────┘ │            │
├─────────────────────────────┤
```

### VitePress implementation

**New component:** `.vitepress/theme/components/ArticleView.vue`
- Props: `title`, `author`, `avatar`, `tags`, `date`, `endDate`, `cover`, `category`
- Cover image slot above content
- Author sidebar (or top banner on mobile)
- Markdown content via `<slot />`

**New markdown pattern for blog posts:**
```md
---
title: Welcome
date: 2025-06-01
author:
  name: Community Team
  avatar: /path/to/avatar.png
  tags:
    - text: Staff
      color: '#fff'
      bg: '#7e0c6b'
cover: /background/44.jpg
---

<!-- content renders inside ArticleView -->
```

**Layout.vue change:** Detect blog post route → render `<ArticleView><Content /></ArticleView>` instead of bare `<Content />`.

### Tasks
| # | Task | Effort |
|---|------|--------|
| 13A.1 | Create `ArticleView.vue` component | 45 min |
| 13A.2 | Update `Layout.vue` to detect blog post route | 30 min |
| 13A.3 | Update sample blog posts with new frontmatter | 15 min |
| 13A.4 | Build verify | 15 min |
| **Subtotal** | | **~2 hours** |

---

## Phase 13B — About Page Links (`AboutView + LinkItem → AboutView.vue`)

### cleanup structure
```
┌─────────────────────────────┐
│  LinkItem cards (grid)      │
│  ┌────┐ ┌────┐ ┌────┐     │
│  │Card│ │Card│ │Card│ ...  │
│  └────┘ └────┘ └────┘     │
├─────────────────────────────┤
│  Intro sections (alternating)│
│  Image │ Text                │
│  Text  │ Image               │
├─────────────────────────────┤
```

### VitePress implementation

**New component:** `.vitepress/theme/components/LinkCard.vue`
- Port from `LinkItem.vue` — card with background image, name, description
- Clicks open `link.url` in new tab
- Minecraft border styling (green gradient border)

**Update `about.md`:** Use `<LinkCard>` grid + `<HomeIntro>` sections.

### Tasks
| # | Task | Effort |
|---|------|--------|
| 13B.1 | Create `LinkCard.vue` (port from `LinkItem.vue`) | 30 min |
| 13B.2 | Update `about.md` with component blocks | 15 min |
| 13B.3 | Build verify | 15 min |
| **Subtotal** | | **~1 hour** |

---

## Phase 13C — Document Tree & Viewer (`DocumentsView`)

### revised strategy

用户决策：引入文档树作为模板自带的使用指南（Customization Guide），同时在独立分支维护文档内容。

模板定位：通用 VitePress 门户/博客模板。文档树不面向最终用户的业务文档，而是面向**模板使用者**——教他们如何定制 logo、颜色、博客。

### size impact

| Content | Source | Size |
|---------|--------|------|
| `staticDocumentTree` (3 dirs, 8 docs) | `src/data/static.ts` | ~0.6 KB |
| `staticDocumentDetails` (8 Markdown docs) | `src/data/static.ts` | ~10-12 KB |
| Ported `DocumentsView.vue` | `src/views/Documents/` | ~8 KB |
| `CalendarIcon.vue` | already ported in Step 4 | 0 |
| **Total code/data added** | | **~20 KB** |

> No new npm deps, no images, no binary assets. 20KB is negligible for a template.

### cleanup structure (what to port)

```
DocumentsView.vue (~400 lines)
├── rotating background carousel     → ❌ Remove (62 images deleted)
├── navbar-cover gradient            → ❌ Remove (NavBar handles this)
├── resizable tree panel (left)      → ✅ Port (simplify: no drag resize)
├── document reader (right)          → ✅ Port (VitePress-rendered Markdown)
│   ├── Title                         → ✅
│   ├── Contributors + Date           → ✅
│   ├── Markdown body (custom engine) → ❌ Remove (use VitePress <Content />)
│   └── PDF embed                    → ❌ Remove
├── CalendarIcon                     → ✅ Already ported
└── data layer                       → ✅ Port static.ts document data
```

### output files

| # | File | Source | Action |
|---|------|--------|--------|
| 1 | `.vitepress/theme/data/docs.ts` | `src/data/static.ts` document portion | ✨ CREATE — pure TS, no Vue dependency, copy `staticDocumentTree` + `staticDocumentDetails` |
| 2 | `.vitepress/theme/components/DocTree.vue` | `DocumentsView.vue` tree panel section | ✨ CREATE — simplified tree (no drag resize, just click to select) |
| 3 | `.vitepress/theme/components/DocViewer.vue` | `DocumentsView.vue` reader section | ✨ CREATE — title, contributors, date, `<slot />` for VitePress Content |
| 4 | `docs/[...].md` (8 files) | `staticDocumentDetails` markdown content | ✨ CREATE — one `.md` per document, use `layout: doc` for DocViewer wrapping |
| 5 | `docs/index.md` | overwrite current | ✏️ UPDATE — use `<DocTree>` + `<DocViewer>` |

### architecture: how it fits VitePress

```
docs/
├── index.md              ← <DocTree /> lists all docs
├── guides/
│   ├── getting-started.md
│   ├── faq.md
│   └── troubleshooting.md
├── tutorials/
│   ├── basics.md
│   ├── advanced.md
│   └── tips-and-tricks.md
└── reference/
    ├── api-docs.md
    └── changelog.md
```

Each `.md` uses `layout: doc` (a new custom layout registered in theme), which wraps `<DocViewer><Content /></DocViewer>`.

`docs/index.md` uses `<DocTree :nodes="..." @select="..." />` to navigate.

### branch strategy: `template/vitepress-docs`

| Concern | Solution |
|---------|----------|
| 模板代码 (`template/vitepress`) 不被文档内容污染 | 文档内容（8 篇 .md + `docs.ts`）只在 `template/vitepress-docs` 分支 |
| 模板使用者克隆的是纯净模板 | `git clone -b template/vitepress` 不含文档细节 |
| 模板开发者维护内容 | `template/vitepress-docs` 分支有完整文档树，可独立推送 |

**工作流：**
1. `template/vitepress` = 模板骨架（组件 + 样式 + 空 `docs/` 占位）
2. `template/vitepress-docs` = 从 `template/vitepress` 分支，添加文档内容 + 数据
3. 文档更新在 `template/vitepress-docs` 上完成，模板改进在 `template/vitepress` 上完成

### tasks

| # | Task | Effort |
|---|------|--------|
| 13C.1 | Extract `staticDocumentTree` + `staticDocumentDetails` → `.vitepress/theme/data/docs.ts` | 30 min |
| 13C.2 | Port `DocTree.vue` (simplified from DocumentsView tree panel) | 45 min |
| 13C.3 | Port `DocViewer.vue` (title + meta + slot, from DocumentsView reader) | 30 min |
| 13C.4 | Create `docs/` Markdown files (8 docs from staticDocumentDetails) | 30 min |
| 13C.5 | Update `Layout.vue` and `index.ts` for `layout: doc` | 20 min |
| 13C.6 | Update `docs/index.md` to use `<DocTree>` | 15 min |
| 13C.7 | Build verify | 15 min |
| 13C.8 | Branch `template/vitepress-docs`, cherry-pick docs content | 15 min |
| **Subtotal** | | **~3.5 hours** |

---

## Summary (revised)

| Phase | What | Effort | Status |
|-------|------|--------|--------|
| **13A** | Blog post detail — ArticleView, cover, author | ~2h | ✅ done |
| **13B** | About page — LinkCard grid + HomeIntro | ~1h | ✅ done |
| **13C** | Docs tree + viewer — 8 Markdown docs, 2 new components, branch split | ~3.5h | 📋 planned |
| **Total** | | **~6.5 hours** (cumulative) | |
