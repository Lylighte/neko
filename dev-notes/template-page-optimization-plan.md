# Template Page Optimization Plan

**Branch:** `template-cleanup`
**Status:** ✅ COMPLETED — all 6 phases executed and committed.
**Next Phase:** VitePress migration (see `template-migration-report.md` for details).

---

## Current State Summary

After the backend strip phase, the project has:

- ✅ `src/api/` — deleted
- ✅ Management/auth/editor views — deleted
- ✅ Coupled components (TreeViewer, PdfViewer) — deleted
- ✅ Router cleaned — management, auth, editor routes removed
- ✅ `main.ts` cleaned — toast, md-editor removed
- ✅ `package.json` cleaned — axios, vue-toastification, md-editor-v3, vue-clipboard3 removed
- ✅ Theme overrides removed
- ✅ Unused icons removed
- ✅ Event bus removed
- ✅ API type imports stubbed/removed from remaining views

**Remaining problem:** 11 view/component files have broken imports or reference deleted dependencies. They need static data replacement to become functional again.

---

## Files Requiring Fix (by severity)

### 🔴 Broken — references deleted modules, won't compile

| # | File | Broken References |
|---|------|-------------------|
| 1 | `src/views/News/NewsDetail.vue` | `MdPreview` (md-editor-v3 removed), `PdfViewer` (deleted), `GetNewsDetail()` (API deleted) |
| 2 | `src/views/Documents/DocumentsView.vue` | `TreeViewer` (deleted), `useToast()` (removed), `GetDocumentDetail()` (API deleted), `MdPreview`/`MdCatalog` (removed) |
| 3 | `src/views/List/ListView.vue` | `GetServerList()` (API deleted), `useClipboard` (removed), `useToast` (removed), `ServerEntity` type (deleted) |
| 4 | `src/views/List/ListItem.vue` | clipboard, toast references |

### 🟡 Broken — references deleted API functions, won't run

| # | File | Broken References |
|---|------|-------------------|
| 5 | `src/views/Lobby/IntroView.vue` | `GetIntroList()` (API deleted), `IntroEntity` type (deleted) |
| 6 | `src/views/News/NewsView.vue` | `GetNewsBrief()` (API deleted), `NewsEntity` type (deleted) |
| 7 | `src/views/News/NewsList.vue` | `GetNewsTotal()`, `GetNews()` (API deleted), `NewsTarget`, `NewsEntity` types (deleted) |
| 8 | `src/views/News/NewsCard.vue` | `NewsEntity` type (deleted) |
| 9 | `src/views/News/NewsItem.vue` | `NewsEntity` type (deleted) |
| 10 | `src/views/About/AboutView.vue` | `GetLinkList()`, `GetDetailedIntroList()` (API deleted), `LinkEntity`, `IntroEntity` types (deleted) |
| 11 | `src/views/Activity/ActivityView.vue` | `GetNews()`, `GetNewsTotal()` (API deleted), `NewsEntity` type (deleted) |
| 12 | `src/views/Activity/ActivityItem.vue` | `NewsEntity` type (deleted) |

---

## Phase 1 — Define Static Data Types & Store

Create a central static data layer to replace the deleted API.

### Step 1.1 — Create `src/data/types.ts`

Define all entity types that were previously in `src/api/*`:

```ts
// News/Article entity
export interface NewsEntity {
  id: string
  title: string
  brief: string
  image: string
  date: string
  endDate?: string
  category?: string
  target?: 'information' | 'magazine' | 'notice' | 'activity'
}

// News detail (full article)
export interface NewsDetail {
  entity: NewsEntity
  author: {
    username: string
    avatar: string
    tags?: { text: string; tagColor: string; color: string }[]
  }
  category: string
  content: NewsSegment[]
}

export interface NewsSegment {
  type: 'markdown' | 'pdf_file'
  content: string
}

// Intro section (used by Lobby + About)
export interface IntroEntity {
  title: string
  description: string
  image: string
}

// External link (used by About)
export interface LinkEntity {
  name: string
  url: string
  icon?: string
  description?: string
}

// Server entity (used by List — will be dropped later)
export interface ServerEntity {
  id: string
  name: string
  description: string
  version?: string
  ip?: string
  realtime?: boolean
  status?: {
    online: boolean
    latency?: number
  }
}
```

### Step 1.2 — Create `src/data/static.ts`

Provide static sample data for all retained pages:

- `staticIntroList: IntroEntity[]` — 3-4 sample intro sections
- `staticLinkList: LinkEntity[]` — sample external links
- `staticNewsBrief: NewsEntity[]` — 4 sample news cards (one per category)
- `staticNewsList: Record<string, NewsEntity[]>` — paginated news by category
- `staticNewsDetails: Record<string, NewsDetail>` — full article content by ID
- `staticDocumentList: ...` — sample document tree

All data should be **template-neutral** — no NMO-specific content. Use placeholder text like "Your Organization Name", "Your Description Here".

---

## Phase 2 — Fix Broken Views (by priority)

### Step 2.1 — Fix `NewsDetail.vue` (🔴 critical)

**Problems:**
- Imports `MdPreview` from removed `md-editor-v3`
- Imports `PdfViewer` (deleted component)
- Calls `GetNewsDetail()` (deleted API)

**Actions:**
1. Remove `MdPreview` import and usage — replace markdown rendering with a simple `<div v-html="renderedMarkdown">` or a lightweight alternative
2. Remove `PdfViewer` import and usage — replace PDF segments with a download link or placeholder
3. Replace `GetNewsDetail(newsId)` with `staticNewsDetails[newsId]` from static data
4. Remove `mountSounds()` and `soundOn()` (no longer needed without md-editor buttons)
5. Keep the layout structure (poster, author sidebar, content area)

### Step 2.2 — Fix `DocumentsView.vue` (🔴 critical)

**Problems:**
- Imports `TreeViewer` (deleted)
- Uses `useToast()` (removed)
- Calls `GetDocumentDetail()` (deleted API)
- References `MdPreview`, `MdCatalog` (removed)

**Actions:**
1. Remove `TreeViewer` import — replace with a simple static sidebar listing document titles
2. Remove `useToast()` — replace with `console.warn` or silent fail
3. Replace `GetDocumentDetail()` with static data lookup
4. Remove `MdPreview`/`MdCatalog` references — use plain HTML rendering
5. Keep the resizable split-pane layout and background carousel

### Step 2.3 — Fix `ListView.vue` + `ListItem.vue` (🔴 critical)

**Problems:**
- Imports `GetServerList`, `ServerEntity` from deleted API
- Uses `useClipboard` (removed)
- Uses `useToast` (removed)

**Actions:**
1. Replace `GetServerList()` with `staticServerList` from static data
2. Replace `useClipboard` with native `navigator.clipboard.writeText()`
3. Replace `useToast` with a simple inline notification or `console.log`
4. Keep the server card layout and ping animation logic

### Step 2.4 — Fix `ActivityView.vue` + `ActivityItem.vue` (🟡)

**Problems:**
- Calls `GetNews()`, `GetNewsTotal()` (deleted API)
- Uses `NewsEntity` type (deleted)

**Actions:**
1. Import `NewsEntity` from `@/data/types`
2. Replace `GetNews('activity', ...)` with filtered `staticNewsList['activity']`
3. Replace `GetNewsTotal('activity')` with `staticNewsList['activity'].length`
4. Keep pagination logic, just feed it static data

### Step 2.5 — Fix `NewsView.vue` + `NewsList.vue` + `NewsCard.vue` + `NewsItem.vue` (🟡)

**Problems:**
- Call `GetNewsBrief()`, `GetNews()`, `GetNewsTotal()` (deleted API)
- Use `NewsEntity`, `NewsTarget` types (deleted)

**Actions:**
1. Import types from `@/data/types`
2. Replace `GetNewsBrief()` with `staticNewsBrief`
3. Replace `GetNews(target, page, pageSize)` with paginated static data
4. Replace `GetNewsTotal(target)` with static data length
5. Keep all UI logic (tabs, pagination, card layout)

### Step 2.6 — Fix `IntroView.vue` (🟡)

**Problems:**
- Calls `GetIntroList()` (deleted API)
- Uses `IntroEntity` type (deleted)

**Actions:**
1. Import `IntroEntity` from `@/data/types`
2. Replace `GetIntroList()` with `staticIntroList`

### Step 2.7 — Fix `AboutView.vue` (🟡)

**Problems:**
- Calls `GetLinkList()`, `GetDetailedIntroList()` (deleted API)
- Uses `LinkEntity`, `IntroEntity` types (deleted)

**Actions:**
1. Import types from `@/data/types`
2. Replace `GetLinkList()` with `staticLinkList`
3. Replace `GetDetailedIntroList()` with `staticIntroList`

---

## Phase 3 — Component Cleanup

### Step 3.1 — Clean up `NavBar.vue`

**Current issues:**
- Hardcoded NMO route names: "主页", "维度", "活动", "新闻", "关于", "文档"
- Lantern effect tied to specific routes
- Route paths hardcoded

**Actions:**
1. Extract nav items to a configurable array (can be imported from a shared config)
2. Keep lantern effect but make route list configurable
3. No NMO-specific changes needed yet — this will be fully rewritten in VitePress phase

### Step 3.2 — Clean up `FooterBar.vue`

**Current issues:**
- NMO logo, name, description hardcoded
- ICP filing number (浙ICP备2022000762号-1)
- Hardcoded QQ group link, Bilibili link, GitHub link
- "NOT AN OFFICIAL MINECRAFT ORGANIZATION" disclaimer

**Actions:**
1. Extract all text/content to a `footerConfig` object
2. Make social links configurable
3. Keep the layout structure, make content data-driven
4. Template users can override `footerConfig` to set their own branding

### Step 3.3 — Clean up `App.vue`

**Current issues:**
- Console ASCII art logo with NMO branding
- Console copyright notice "Copyright © NMO 2025"
- Project info console group

**Actions:**
1. Gate all console output behind `import.meta.env.DEV`
2. Make the ASCII art and copyright text configurable or remove in production
3. Keep the structure, just remove NMO-specific strings

### Step 3.4 — Clean up `LobbyView.vue`

**Current issues:**
- Hardcoded "南京大学Minecraft协会" text
- Hardcoded NJU-specific description
- Hardcoded `/nmo-logo-large.png`
- Hardcoded `/background/beidalou.webp`

**Actions:**
1. Extract hero content to a `homeConfig` object
2. Make logo path, title, subtitle, description configurable
3. Make background image configurable

---

## Phase 3.5 — i18n UI Text Extraction

Extract all generic UI labels (not content) into a central i18n file so they can be translated or customized without touching components.

### Step 3.5.1 — Create `src/data/i18n.ts`

```ts
export const uiText = {
  about: { moreAboutUs: 'More About Us' },
  news: {
    categories: { information: 'News', magazine: 'Magazine', notice: 'Notices', activity: 'Activities' },
    categoryLabels: { information: 'Latest News', magazine: 'Latest Magazine', notice: 'Latest Notices', activity: 'Latest Activities' },
    sortBy: 'Sort by: ',
    sortOption: 'Latest',
    overviewButtons: { activities: 'More Activities', news: 'More News', magazine: 'Past Issues', notices: 'More Notices' },
    pagination: { page: 'Page', of: '/', goTo: 'Go to' },
  },
  article: { author: 'Author', publishDate: 'Published', dateRange: 'Date Range' },
  dialog: { cancel: 'Cancel', confirm: 'OK' },
  footer: { linksHeading: 'Links' },
  documents: { pdfPlaceholder: 'PDF Document', pdfOpenLink: 'Open PDF in new tab' },
} as const
```

### Step 3.5.2 — Replace hardcoded Chinese text in components

| File | Hardcoded Text | Replaced With |
|------|---------------|---------------|
| `AboutView.vue` | `更多关于我们的事情...` | `uiText.about.moreAboutUs` |
| `NewsView.vue` | `更多活动/更多资讯/往期社刊/更多公告` | `uiText.news.overviewButtons.*` |
| `NewsList.vue` | `最新资讯/最新社刊/最新公告/最新活动` | `uiText.news.categoryLabels.*` |
| `NewsList.vue` | `排序方式：/最新发布` | `uiText.news.sortBy/sortOption` |
| `NewsList.vue` | `第/页/前往` | `uiText.news.pagination.*` |
| `NewsDetail.vue` | `作者/发布日期/起止日期` | `uiText.article.*` |
| `MinecraftDialog.vue` | `取消/确定` | `uiText.dialog.*` |

---

## Phase 4 — Remove Dropped Pages

Per the migration report, these pages are marked for removal:

| Route | View | Action |
|-------|------|--------|
| `/list` | `ListView.vue` + `ListItem.vue` | ❌ Delete — server-specific |
| `/activity` | `ActivityView.vue` + `ActivityItem.vue` | ❌ Delete — upstream-specific |

### Step 4.1 — Delete List views

Remove:
- `src/views/List/ListView.vue`
- `src/views/List/ListItem.vue`
- Route entry for `/list` in `router/index.ts`
- Nav item "维度" in `NavBar.vue`

### Step 4.2 — Delete Activity views

Remove:
- `src/views/Activity/ActivityView.vue`
- `src/views/Activity/ActivityItem.vue`
- Route entry for `/activity` in `router/index.ts`
- Nav item "活动" in `NavBar.vue`

---

## Phase 5 — Final Verification

### Step 5.1 — Ensure clean compilation

```bash
npm run type-check
npm run build
```

### Step 5.2 — Verify all pages render

- `/lobby` — hero + intro sections with static data
- `/news` — blog listing with static cards
- `/news/detail/:id` — article detail with static content
- `/about` — links + intro sections with static data
- `/documents` — document viewer with static data
- `/404` — not found page

### Step 5.3 — Verify no remaining references

Search for any remaining references to deleted modules:
- `@/api/` — should have zero imports
- `vue-toastification` — should have zero imports
- `md-editor-v3` — should have zero imports
- `vue-clipboard3` — should have zero imports
- `axios` — should have zero imports

---

## Execution Order

| # | Phase | Step | Description |
|---|-------|------|-------------|
| 1 | Phase 1 | 1.1 | Create `src/data/types.ts` |
| 2 | Phase 1 | 1.2 | Create `src/data/static.ts` |
| 3 | Phase 2 | 2.1 | Fix `NewsDetail.vue` |
| 4 | Phase 2 | 2.2 | Fix `DocumentsView.vue` |
| 5 | Phase 2 | 2.5 | Fix `NewsView.vue` + sub-components |
| 6 | Phase 2 | 2.6 | Fix `IntroView.vue` |
| 7 | Phase 2 | 2.7 | Fix `AboutView.vue` |
| 8 | Phase 3 | 3.1-3.4 | Clean up NavBar, FooterBar, App.vue, LobbyView |
| 9 | Phase 4 | 4.1 | Delete List views + route |
| 10 | Phase 4 | 4.2 | Delete Activity views + route |
| 11 | Phase 5 | 5.1-5.3 | Final verification |

---

## Notes

- The `ListView.vue` and `ActivityView.vue` fixes in Phase 2 are temporary — they will be deleted in Phase 4. However, fixing them first ensures the project compiles at every step.
- Static data should use **template-neutral placeholder content**. No "NMO", "南京大学", or real organization names.
- The Minecraft visual theme is preserved throughout — only content data changes.
- After this phase, the project will be a fully functional static SPA ready for VitePress migration.
- The VitePress migration (creating `.vitepress/`, porting components, writing Markdown pages) is a **separate subsequent phase**.