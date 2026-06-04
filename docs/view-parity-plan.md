# Step 13 — View Parity Plan

**Status:** 📋 PLANNING
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

## Phase 13C — Documents Page (`DocumentsView`)

### cleanup structure
```
┌──────┬───────────────────────┐
│ Tree │  Document viewer      │
│ ──📁 │  ┌─────────────────┐  │
│  📄 A│  │ Title           │  │
│  📄 B│  │ Contributors    │  │
│ ──📁 │  │ Date            │  │
│  📄 C│  │                 │  │
│      │  │ Markdown body   │  │
│←drag→│  │                 │  │
│      │  └─────────────────┘  │
└──────┴───────────────────────┘
```

### Assessment

The cleanup `DocumentsView.vue` is **~400 lines** with:
- Rotating background carousel (62 images, now deleted)
- Resizable tree panel (drag handle)
- Document selector
- PDF embed support
- Custom markdown renderer

**This feature is:**
- Deeply coupled to the old `staticDocumentTree` + `staticDocumentDetails` data structures
- Rendered with a custom markdown engine (not VitePress's)
- Relies on 62 scenic backgrounds that we've already deleted
- The tree panel is a bespoke UI not found in any standard VitePress template

### Decision: Defer / Simplify

| Option | Verdict |
|--------|---------|
| Full port with tree + resize + PDF | ❌ Too heavy (6-8 hours), out of scope for template |
| Simple document list page | ✅ Keep current `docs/index.md` as a readable catalog |
| Add a `DocCard` component for visual polish | ✅ Optional low-effort improvement |

**Recommendation:** Keep the current `docs/index.md` as-is for this iteration. The document tree viewer is an app-specific feature, not a template feature. Template users who need this can build it on top.

If visual parity is desired, we can create a simple `<DocCard>` component (icon + title + link) as a Phase 13C stretch goal.

### Tasks (if pursued)
| # | Task | Effort |
|---|------|--------|
| 13C.1 | Create `DocCard.vue` | 30 min |
| 13C.2 | Update `docs/index.md` | 15 min |
| **Subtotal** | | **~45 min** (minimal) |

---

## Summary

| Phase | What | Effort |
|-------|------|--------|
| **13A** | Blog post detail — author, cover, date | ~2h |
| **13B** | About page — LinkCard grid | ~1h |
| **13C** | Docs page — defer (or DocCard polish) | ~0.75h |
| **Total** | | **~3-4 hours** |

---

## Priority

1. **13B first** (quickest win, highest visual impact)
2. **13A second** (blog posts are key content)
3. **13C last** (deferred or minimal)
