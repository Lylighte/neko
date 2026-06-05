# Docs Architecture Redesign — Plan B

**Status:** ✅ APPROVED — 执行中
**Goal:** 废弃 DocsBrowser SPA 架构，改用 VitePress 原生 `.md` 文件 + 轻量侧边栏。

---

## 动机

当前 `DocsBrowser` 架构在 VitePress 之上自建了一个 SPA 文档浏览器：

- `docs.ts` — 所有文档内容以 Markdown 字符串存储
- `DocTree.vue` — 左侧导航树
- `DocViewer.vue` — 右侧用正则渲染 Markdown（不支持代码高亮、表格、alert 等 VitePress 特性）
- `DocsBrowser.vue` — 组合上述两者

问题：
1. 内容藏在 `.ts` 字符串里，用户无法直接编辑 `.md` 文件
2. `DocViewer.renderMarkdown()` 是简陋的正则渲染器，不支持 VitePress 原生 Markdown 能力
3. 维护成本高（3 个组件 + 1 个数据文件 + 正则渲染器）

---

## 新架构

```
docs/
├── index.md              ← LinkCard 网格入口页
├── quick-start.md        ← 原生 .md
├── customization.md      ← 原生 .md
├── deployment.md         ← 原生 .md
├── blogging.md           ← 原生 .md
└── components.md         ← 从 demo.md 迁入

Layout.vue 检测 /docs/ 路由 → 显示 DocsSidebar + Content
```

### 布局效果

```
┌──────────────────────────────────────┐
│  NavBar                              │
├────────┬─────────────────────────────┤
│ Docs   │  # Quick Start              │
│ Side   │                             │
│ bar    │  Content (VitePress 原生    │
│        │   代码高亮/表格/alert)       │
│ 📁 Get │                             │
│  📄 Qu │                             │
│  📄 Cu │                             │
│  📄 De │                             │
│ 📁 Wri │                             │
│  📄 Bl │                             │
│  📄 Co │                             │
├────────┴─────────────────────────────┤
│  SiteFooter                          │
└──────────────────────────────────────┘
```

---

## 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| ✏️ 重写 | `docs/index.md` | LinkCard 网格入口页 |
| ✨ 新建 | `docs/quick-start.md` | 原生 .md |
| ✨ 新建 | `docs/customization.md` | 原生 .md |
| ✨ 新建 | `docs/deployment.md` | 原生 .md |
| ✨ 新建 | `docs/blogging.md` | 原生 .md |
| ✨ 新建 | `docs/components.md` | 从 demo.md 迁入 |
| ✨ 新建 | `DocsSidebar.vue` | 轻量侧边栏组件 |
| ✏️ 修改 | `Layout.vue` | `/docs/` 路由显示侧边栏布局 |
| ✏️ 修改 | `index.ts` | 注册 DocsSidebar，移除 DocsBrowser/DocTree/DocViewer |
| ✏️ 修改 | `config.ts` | 移除 Demo nav |
| 🗑️ 删除 | `docs.ts` | 不再需要 |
| 🗑️ 删除 | `DocsBrowser.vue` | 不再需要 |
| 🗑️ 删除 | `DocTree.vue` | 不再需要 |
| 🗑️ 删除 | `DocViewer.vue` | 不再需要 |
| 🗑️ 删除 | `demo.md` | 内容已迁入 docs/components.md |

---

## DocsSidebar 设计

```vue
<script setup>
// 硬编码导航结构（与 docs/ 目录对应）
const nav = [
  {
    title: 'Getting Started',
    items: [
      { text: 'Quick Start', link: '/docs/quick-start' },
      { text: 'Customization', link: '/docs/customization' },
      { text: 'Deployment', link: '/docs/deployment' },
    ],
  },
  {
    title: 'Writing Content',
    items: [
      { text: 'Blogging Guide', link: '/docs/blogging' },
      { text: 'Component Reference', link: '/docs/components' },
    ],
  },
]
</script>
```

- 使用 `useRoute()` 高亮当前页
- 折叠/展开分组
- 样式与当前 DocTree 保持一致（`--background-card` 背景，`--pixel-gray` 边框）

---

## Layout.vue 改动

```diff
+ const isDocsPage = computed(() => {
+   const path = route.path
+   return path.startsWith('/docs/') && path !== '/docs/' && path !== '/docs'
+ })

  <template>
    <div class="pixel-layout">
      <NavBar />
      <main class="main-content">
+       <div v-if="isDocsPage" class="docs-layout">
+         <DocsSidebar />
+         <div class="page-container vp-doc">
+           <Content />
+         </div>
+       </div>
        <ArticleView v-else-if="articleProps" v-bind="articleProps">
          <Content />
        </ArticleView>
        <div v-else class="page-container vp-doc">
          <Content />
        </div>
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  </template>
```

---

## 优势

| 方面 | 旧 (DocsBrowser) | 新 (原生 .md) |
|------|------------------|---------------|
| 内容编辑 | 藏在 .ts 字符串里 | 标准 .md 文件，直接编辑 |
| Markdown 渲染 | 简陋正则 | VitePress 原生（代码高亮、:::tip、表格） |
| 组件数量 | 3 个 (Browser/Tree/Viewer) | 1 个 (Sidebar) |
| 数据文件 | docs.ts (~300 行) | 无 |
| 用户学习成本 | 需理解 docs.ts 结构 | 标准 Markdown，零学习 |

---

## 执行步骤

| # | 任务 | 说明 |
|---|------|------|
| 1 | 创建 5 个 `docs/*.md` | quick-start, customization, deployment, blogging, components |
| 2 | 重写 `docs/index.md` | LinkCard 网格入口 |
| 3 | 创建 `DocsSidebar.vue` | 轻量侧边栏 |
| 4 | 修改 `Layout.vue` | 添加 `/docs/` 路由检测 + 侧边栏布局 |
| 5 | 修改 `index.ts` | 注册 DocsSidebar，移除旧组件 |
| 6 | 修改 `config.ts` | 移除 Demo nav |
| 7 | 删除旧文件 | docs.ts, DocsBrowser.vue, DocTree.vue, DocViewer.vue, demo.md |
| 8 | 构建验证 | `npm run build` |

---

## 审查记录 (2025-06-05)

**结论：批准。** 这是消除技术债务的关键一步，方向完全正确。

### 补充建议

1. **路径判断**：`isDocsPage` 用 `path.startsWith('/docs/')` 足够，但需排除 `/docs/` 自身（入口页不需要侧边栏）。当前写法已处理。
2. **侧边栏数据**：硬编码导航适合模板起步阶段。若未来文档增多，可改为从 `themeConfig.sidebar` 读取。在代码注释中提示即可。
3. **CSS 衔接**：`.vp-doc` 自带排版样式，需确保 `vars.css` 中的 VitePress 变量覆盖（`--vp-c-*`）已覆盖代码块背景、表格边框等。当前已覆盖。
4. **内容迁移**：从 `docs.ts` 转录到 `.md` 时，注意代码块语言标注（`` ```ts ``），保留原有结构。
5. **执行顺序**：优先完成一个文档页 + 侧边栏基本渲染，验证全流程无样式冲突，再批量迁移其余文档。
6. **README 补充**：完成后在 README 中说明"所有文档均为标准 Markdown 文件，直接编辑 `docs/` 目录即可"。