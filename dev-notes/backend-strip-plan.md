# Backend Dependency Stripping Plan

**Branch:** `template-cleanup`
**Status:** ✅ COMPLETED — all 10 steps executed and committed.
**Next Phase:** VitePress migration (see `template-migration-report.md` for details).

---

## Step 1 — Delete `src/api/` directory

**Action:** Remove the entire `src/api/` folder (8 files).

| File | Purpose |
|------|---------|
| `src/api/api.ts` | Axios instance, `/necore` base URL, JWT interceptor |
| `src/api/auth.ts` | Login, logout, user management |
| `src/api/documents.ts` | Document CRUD |
| `src/api/newslist.ts` | News/article CRUD |
| `src/api/serverlist.ts` | Server list + status polling |
| `src/api/introlist.ts` | Intro section content |
| `src/api/linklist.ts` | External link list |
| `src/api/slogan.ts` | Footer slogan |

**Impact:** All files importing from `@/api/*` will break. This is expected — subsequent steps fix them.

**Commit:** `refactor: remove entire src/api/ directory (backend coupling)`

---

## Step 2 — Delete management, auth, and editor views

**Action:** Remove 8 view files.

| File | Reason |
|------|--------|
| `src/views/Auth/LoginView.vue` | Login form |
| `src/views/Management/ManagementView.vue` | Admin shell |
| `src/views/Management/Components/UserManagementView.vue` | User CRUD |
| `src/views/Management/Components/ClubManagementView.vue` | Club management |
| `src/views/Management/Components/ServerManagementView.vue` | Server management |
| `src/views/Management/Components/NewsManagementView.vue` | News CRUD |
| `src/views/Management/Components/DocumentManagementView.vue` | Document management |
| `src/views/Documents/DocumentsEditor.vue` | Document editor |

**Commit:** `refactor: remove management, auth, and editor views`

---

## Step 3 — Delete coupled components

**Action:** Remove 2 components, keep 2 with static data replacement.

| File | Action |
|------|--------|
| `src/components/documents/TreeViewer.vue` | **Delete** — document API coupling |
| `src/components/PdfViewer.vue` | **Delete** — already marked excluded |
| `src/components/FooterBar.vue` | **Rewrite** — replace `GetSlogan()` with static text |
| `src/components/IntroItem.vue` | **Rewrite** — inline `IntroEntity` type locally |

**Commit:** `refactor: remove coupled components, staticify FooterBar and IntroItem`

---

## Step 4 — Clean up router

**Action:** Remove 3 route groups from `src/router/index.ts`.

| Route | View |
|-------|------|
| `/management/*` | ManagementView + 5 sub-views |
| `/auth/login` | LoginView |
| `/documents_editor` | DocumentsEditor |

Also remove the `router.beforeEach` title-setter if it becomes unused, and clean up imports.

**Commit:** `refactor: remove management, auth, and editor routes`

---

## Step 5 — Clean up main.ts

**Action:** Remove imports and plugin registrations for backend-related libraries.

Remove from `src/main.ts`:
- `import 'md-editor-v3/lib/style.css'`
- `import Toast from 'vue-toastification'`
- `import 'vue-toastification/dist/index.css'`
- `app.use(Toast, {...})`

**Commit:** `refactor: remove toast and md-editor from app entry`

---

## Step 6 — Clean up package.json

**Action:** Remove 4 runtime dependencies from `package.json`.

| Package | Reason |
|---------|--------|
| `axios` | HTTP client for backend |
| `vue-toastification` | Toast notifications |
| `md-editor-v3` | Markdown editor |
| `vue-clipboard3` | Clipboard copy |

Also remove related type devDependencies if any (e.g. `@types/sanitize-html`).

**Commit:** `build: remove backend-related runtime dependencies`

---

## Step 7 — Clean up theme overrides

**Action:** Remove 2 theme override files.

| File | Reason |
|------|--------|
| `src/theme-override/md-preview.css` | md-editor preview theme |
| `src/theme-override/toast.css` | Toast styling |

**Commit:** `refactor: remove md-editor and toast theme overrides`

---

## Step 8 — Remove unused icons

**Action:** Remove icons that were only used by deleted views.

| File | Used By |
|------|---------|
| `src/components/icons/UploadPdf.vue` | DocumentsEditor, NewsManagementView |
| `src/components/icons/LoadNews.vue` | DocumentsEditor, NewsManagementView |
| `src/components/icons/DeleteIcon.vue` | Management views |
| `src/components/icons/PlusIcon.vue` | Management views |
| `src/components/icons/UserIcon.vue` | DocumentsView, Management views |

**Commit:** `refactor: remove icons only used by deleted views`

---

## Step 9 — Remove unused event bus

**Action:** Check if `src/eventbus/EventBus.ts` is still needed after TreeViewer removal. If not, delete it.

**Commit:** `refactor: remove unused event bus`

---

## Step 10 — Remove unused API types from remaining views

**Action:** For views that still import types from `@/api/*` (now deleted), replace with local type definitions or remove the import.

Affected files:
- `src/views/Activity/ActivityItem.vue` — `NewsEntity` type
- `src/views/Activity/ActivityView.vue` — `GetNews`, `GetNewsTotal`, `NewsEntity`
- `src/views/News/NewsCard.vue` — `NewsEntity` type
- `src/views/News/NewsDetail.vue` — `GetNewsDetail`, `NewsDetail`
- `src/views/News/NewsItem.vue` — `NewsEntity` type
- `src/views/News/NewsList.vue` — `GetNews`, `GetNewsTotal`, `NewsEntity`, `NewsTarget`
- `src/views/News/NewsView.vue` — `GetNewsBrief`, `NewsEntity`
- `src/views/List/ListView.vue` — `GetServerList`, `ServerEntity`
- `src/views/List/ListItem.vue` — clipboard, toast
- `src/views/About/AboutView.vue` — `GetLinkList`, `LinkEntity`, `GetDetailedIntroList`, `IntroEntity`
- `src/views/Lobby/IntroView.vue` — `GetIntroList`, `IntroEntity`
- `src/views/Documents/DocumentsView.vue` — `GetDocumentDetail`, `NewsSegment`, `MdCatalog`, `MdPreview`
- `src/views/Activity/ActivityView.vue` — `GetNews`, `GetNewsTotal`

**Note:** These views will be rewritten in the "优化模板页面" phase to use static data. For now, they will have broken imports — this is acceptable as we are stripping backend coupling first.

**Commit:** `refactor: remove or stub API type imports in remaining views`

---

## Execution Order Summary

| # | Step | Commit Message |
|---|------|---------------|
| 1 | Delete `src/api/` | `refactor: remove entire src/api/ directory` |
| 2 | Delete management/auth/editor views | `refactor: remove management, auth, and editor views` |
| 3 | Delete coupled components, staticify FooterBar & IntroItem | `refactor: remove coupled components, staticify FooterBar and IntroItem` |
| 4 | Clean up router | `refactor: remove management, auth, and editor routes` |
| 5 | Clean up main.ts | `refactor: remove toast and md-editor from app entry` |
| 6 | Clean up package.json | `build: remove backend-related runtime dependencies` |
| 7 | Clean up theme overrides | `refactor: remove md-editor and toast theme overrides` |
| 8 | Remove unused icons | `refactor: remove icons only used by deleted views` |
| 9 | Remove unused event bus | `refactor: remove unused event bus` |
| 10 | Remove/stub API type imports in remaining views | `refactor: remove or stub API type imports in remaining views` |