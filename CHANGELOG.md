# Changelog

## 1 — Backend Dependency Stripping

**Branch:** `template-cleanup`

移除所有后端耦合，将 SPA 转变为纯前端静态项目。

- 删除 `src/api/` 全部 8 个 API 文件（axios 实例、auth、documents、newslist、serverlist、introlist、linklist、slogan）
- 删除 8 个管理/认证/编辑器视图（LoginView、ManagementView + 5 子视图、DocumentsEditor）
- 删除耦合组件 TreeViewer、PdfViewer
- 重写 FooterBar、IntroItem 为静态数据驱动
- 清理路由：移除 `/management/*`、`/auth/login`、`/documents_editor`
- 清理 `main.ts`：移除 vue-toastification、md-editor-v3
- 清理 `package.json`：移除 axios、vue-toastification、md-editor-v3、vue-clipboard3

---

## 2 — Template Page Optimization

**Branch:** `template-cleanup`

修复后端剥离后损坏的视图，建立静态数据层。

- 创建静态数据层 `src/data/types.ts`、`static.ts`、`config.ts`
- 修复 11 个因 API 删除而损坏的视图/组件
- 提取硬编码内容到 `siteConfig`（NavBar、FooterBar、App、Lobby）
- 删除 List 和 Activity 页面，清理路由
- 提取中文硬编码字符串到 i18n
- 类型检查零错误，构建通过（95 模块，1.2s）

---

## 3 — VitePress Migration

**Branch:** `template/vitepress`（从 `template-cleanup` 分支）

将 Vite + Vue 3 SPA 原地迁移为 VitePress 静态站点模板。

- 安装 VitePress 1.6，创建 `.vitepress/config.ts` 和主题入口
- 从 `src/` 移植 12 个 Minecraft 风格组件到 `.vitepress/theme/components/`
- 创建 6 个 Markdown 页面替代 SPA 视图（index、about、blog×3、docs）
- 清理 `public/`：移除 PDF.js（~10MB）、NMO 专属资源、62 张背景图 → 精选保留
- 建立 CSS 变量系统（Minecraft 调色板、按钮/输入框精灵图）
- 开发笔记移至 `dev-notes/`，排除出 VitePress 构建

---

## 4 — Custom Layout Migration

**Branch:** `template/vitepress`

用自定义 Layout.vue 替换 VitePress 默认主题，恢复 Minecraft 视觉风格。

- 创建 `.vitepress/theme/Layout.vue`（NavBar + Content + SiteFooter + ScrollToTop）
- 从 `template-cleanup` 移植 NavBar.vue（vue-router → VitePress `useRoute()`，动态读取 `themeConfig.nav`）
- 移除 NMO 专属灯笼模块
- 隐藏 VitePress 默认导航栏、侧边栏、文档页脚
- CSS 变量覆盖 VitePress 默认调色板

---

## 5 — View Parity

**Branch:** `template/vitepress`

将剩余 3 个 VitePress 页面对齐到 `template-cleanup` 的视觉效果。

### 5A — Blog Post Detail
- 创建 `ArticleView.vue`：封面图、作者信息栏（头像+名称+标签）、日期显示
- `Layout.vue` 自动检测博客路由，包裹 `<ArticleView>`
- 博客文章支持 YAML frontmatter（title、date、author、cover、category）

### 5B — About Page Links
- 创建 `LinkCard.vue`：带背景图的链接卡片网格
- `about.md` 使用 `<LinkCard>` + `<HomeIntro>` 组合布局

---

## 6 — Final Cleanup (Step 11)

**Branch:** `template/vitepress`

删除所有旧 SPA 源文件，模板完全独立。

- 7 批次逐批 `git rm` + 构建验证：
  - SPA 入口文件（App.vue、main.ts、style.css、vite-env.d.ts）
  - vue-router 配置
  - 旧静态数据层（config.ts、i18n.ts、static.ts、types.ts）
  - NMO 灯笼模块
  - 旧字体文件
  - FooterBar.vue（已移植为 SiteFooter.vue）
  - NavBar.vue（已移植为 .vitepress/theme/components/NavBar.vue）
- 每批构建验证通过

---

## 7 — Docs Overhaul & De-Minecraft

**Branch:** `template/vitepress`

将 `docs/` 从迁移产物占位改造为模板内置使用指南，完成 README 和 config 的去 Minecraft 化。

### 7A — 13C 文档改造
- 重写 `docs.ts`：替换 8 个旧占位文档为 5 个真实指南（Quick Start、Customization、Blogging、Components、Deployment）
- 重写 `docs/index.md` 为指南入口页
- `demo.md` 组件展示内容迁入 `docs/components.md`
- 移除 Nav 中的 Demo 链接

### 7B — README 重写
- 标题和描述去 Minecraft 化，改用 Pixel 命名
- 更新 CSS 变量示例（`--minecraft-*` → `--pixel-*`）
- 更新组件名引用（`MinecraftButton` → `PixelButton`）
- 更新文档链接指向新的 `docs/` 指南

### 7C — Config 更新
- `title` 和 `description` 去 Minecraft 化
- Nav 链接精简（移除 Demo，Docs 指向新指南）

---

## 8 — Docs Architecture Redesign & Final Polish

**Branch:** `template/vitepress`

### 8A — DocsBrowser SPA → 原生 .md + DocsSidebar
- 新建 `DocsSidebar.vue`：可折叠分组侧边栏，硬编码导航结构
- 新建 5 个 `docs/*.md`：quick-start、customization、deployment、blogging、components
- 修改 `Layout.vue`：docs 路由自动渲染 DocsSidebar + 内容区
- 修改 `docs/index.md`：LinkCard 网格入口替代旧 DocsBrowser
- 修改 `index.ts`：注册 DocsSidebar 组件

### 8B — 旧文件清理
- 删除 `DocsBrowser.vue`、`DocTree.vue`、`DocViewer.vue`（旧 SPA 三件套）
- 删除 `docs.ts`（旧数据层）
- 删除 `demo.md`（内容已迁入 `docs/components.md`）

### 8C — 项目治理
- 新建 `AGENTS.md`：模型约束指令（摧毁性操作、构建验证、Git 操作、项目约定）
- `config.ts` 添加 `srcExclude` 排除项目文件（dev-notes、AGENTS、CHANGELOG、README、LICENSE）

### 8D — 去 Minecraft 化收尾
- `config.ts`：title → "Pixel UI"，description 移除 Minecraft 引用
- `README.md`：项目名 → "Pixel UI Template"，CSS 变量示例更新为 `--pixel-*`，移除 Mojang 免责声明

### 8E — 像素字体方案
- 制定三层字体栈计划：Ark Pixel 12px（标题）+ Monocraft（代码）+ 系统字体（正文）
- Unifont 作为 fallback + 可选 `.pixel-text` 工具类
- 计划文档：`dev-notes/pixel-font-plan.md`