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
- 创建 6 个 Markdown 页面替代 SPA 视图（index、about、news×3、docs）
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

### 5A — News Post Detail
- 创建 `ArticleView.vue`：封面图、作者信息栏（头像+名称+标签）、日期显示
- `Layout.vue` 自动检测新闻路由，包裹 `<ArticleView>`
- 新闻文章支持 YAML frontmatter（title、date、author、cover、category）

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
- 重写 `docs.ts`：替换 8 个旧占位文档为 5 个真实指南（Quick Start、Customization、News、Components、Deployment）
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
- 新建 5 个 `docs/*.md`：quick-start、customization、deployment、news、components
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

---

## 9 — Pixel Font Implementation

**Branch:** `template/vitepress`

完整实施像素字体方案，实现三层字体栈。

### 9A — 字体文件下载
- 下载 Ark Pixel 12px proportional woff2（zh_cn + latin 分片，~1.1MB）
- 下载 Monocraft v4.2.1 TTF（Regular + Bold + Italic，~930KB）
- 下载 Unifont 17.0.04 OTF，用 `pyftsubset` 切割为 3 个 woff2 分片（latin 6.6KB + CJK 605KB + rest 259KB，合计 ~870KB）
- 字体存入 `public/fonts/`，OFL 许可证文件一并纳入

### 9B — @font-face 声明
- 新建 `.vitepress/theme/styles/fonts.css`：5 组 @font-face，含 unicode-range 分片
- 新建 `.vitepress/theme/env.d.ts`：CSS 模块类型声明

### 9C — 字体栈应用
- **标题** `h1-h6` → `'Ark Pixel', 'Unifont', monospace`
- **代码** `code/pre/kbd/samp` → `'Monocraft', 'Unifont', monospace`
- **正文** `body` → `'Unifont', monospace`
- 提供 `.pixel-text` 工具类（Unifont 18px）

### 9D — 配套更新
- `.gitignore`：排除字体临时文件
- `README.md`：字体栈说明 + 替换/移除指南
- `dev-notes/pixel-font-plan.md`：Unifont 分片方案计划
- 构建验证通过（2.17s）

---

## 10 — Design Tokens 三层架构

**Branch:** `template/vitepress`

将 `vars.css` 重构为三层令牌架构（原始值 → 语义 → 组件），替换 16 个组件的硬编码值。

### 10A — 三层令牌重构
- `vars.css` 重新组织为 Layer 1 Primitives / Layer 2 Semantic / Layer 3 Component
- 组件中直接引用的 CSS 值提取为 `--pixel-*` 变量
- 变量命名规范：`--pixel-{category}-{role}[-{variant}]`

### 10B — 代码块暗色主题 & 视觉修复
- 配置 `markdown.theme: 'github-dark'` 固定暗色代码高亮
- 覆盖 `--vp-code-block-bg` / `--vp-code-line-highlight-color` 等 7 个 VitePress 内置变量
- 修复 3D 按钮按下时高度变化导致布局跳动的 bug（移除 height calc，纯 transform）
- 滚动条暗色主题样式
- Switch 组件间距调整（gap: 1rem → 0.5rem）

### 10C — HomeHero 重构 & 布局治理
- HomeHero CSS background → `<img>` + 叠加层结构（可加边框、object-fit 控制）
- `html { overflow-x: hidden }` 修复 100vw 导致的横向滚动条
- HomeHero 通过 `margin-bottom: 3rem` 与后续内容隔离
- 引入 `hasHero` frontmatter 控制页面顶部 padding（index.md / about.md）
- `.page-container.with-hero { padding-top: 0 }` 替换脆弱的负 margin 方案

### 10D — HomeIntro & NewsCard 微调
- HomeIntro 图片 `mc-border`（未定义）→ `pixel-border`，5 张图片获得像素外框
- NewsCard 内容区 padding 1rem → 1.5rem，按钮 padding 缩小

---

## 11 — blog/ → news/ 重命名

**Branch:** `template/vitepress`

将 `blog/` 及相关引用重命名为 `news/`，对齐"组织门户"定位。

- `git mv` 重命名：`blog/` → `news/`、`docs/blogging.md` → `docs/news.md`、`BlogCard.vue` → `NewsCard.vue`
- 编辑 12 个引用文件（config、Layout、NavBar、DocsSidebar、index.ts、README、docs、dev-notes 等）
- 全量 grep 残留检查，零遗漏
- 构建验证通过

---

## 12 — 全站换色（绿色 → 红色）

**Branch:** `template/vitepress`

将主题色从绿色 `#3c8527` 更换为红色 `#d84b4b`。

- 更新 Layer 1 基色：`--pixel-green` → `#d84b4b`，light `#e48181`，dark `#7e1b1b`
- 更新 `--pixel-color-accent-soft` 透明度基色
- NavBar 滑块从紫色 `#7e0c6b` 更换为红色 `#c43030`
- Hero 渐层更新为红色系
- 所有 `.vue` 组件通过变量引用自动跟随
- 构建验证通过（2.31s）

---

## 13 — CSS 变量品牌中立化重命名

**Branch:** `template/vitepress`

将 `--pixel-green*` 重命名为 `--pixel-brand*`，消除绿色名与红色值的矛盾，未来换色无需改名。

- Layer 1：`--pixel-green` → `--pixel-brand`（及 light/dark）
- Layer 2：`--pixel-color-accent` 引用同步更新
- 6 个 `.vue` 组件变量引用更新：ArticleView、DocsSidebar、HomeHero、LinkCard、NewsCard、SiteFooter
- `404.md` 内联样式修复
- 文档 `docs/customization.md` 和 `README.md` 同步更新变量名及色值
- `--pixel-hero-*` 布局参数（padding、width、min-width）抽入 vars.css
- 全量 grep 零残留
- 构建验证通过（2.33s）

---

## 14 — 全站动效增强

**Branch:** `template/vitepress`

从修复 Bug、激活闲置动画、补齐体验缺口三层递进优化动效。

### 14A — Bug 修复
- **NavBar**：`@click.prevent` 阻止 SPA 路由跳转 → 改为 `@click`，恢复导航功能
- **ScrollToTop**：透传无效 `type` prop 导致按钮永不隐藏 → 改用 `v-show` + `.visible` class 控制 `opacity`/`pointer-events`

### 14B — 页面级过渡
- `Layout.vue` 用 `<Transition name="page" mode="out-in">` 包裹内容区，路由切换有淡入淡出（0.2s）
- 定义 `.page-enter-from`、`.page-leave-to` 等 CSS 类

### 14C — 进场动画
- HomeHero `.logo-area` → `animation: fade-in-left 0.8s ease`
- HomeIntro `.intro-box` → `animation: fade-in 0.8s ease`
- `animations.css` 补充 `fade-in-down`（修正方向为从上滑入）

### 14D — 杂项
- `html { scroll-behavior: smooth }` 全站平滑滚动
- LinkCard 补齐 `transition: transform 0.3s ease` + hover `scale(1.05)`

---

## 15 — UI 精灵图 → CSS 替换

**Branch:** `template/vitepress`

用纯 CSS 替代所有精灵图引用，外观完全由 CSS 变量控制。

### 15A — PixelButton border-image → box-shadow
- 4 张 3×3 精灵图（button_normal/hover/pressed/pressed_hover）→ `box-shadow` 多层叠加
- 5 个交互态（normal/hover/active/dark/active:hover）全覆盖
- Normal/dark 用固定灰度，hover/active 用品牌色变量自动跟随

### 15B — PixelInput border-image → border
- `text-input.png`（16×16）→ `border-top/bottom` 纯色边（上暗下亮）

### 15C — .pixel-border / PixelDialog border-image → border + box-shadow
- `dialog_background_hollow_4.png`（18×18）→ `border` 方向色 + `outline` 描边 + `box-shadow` 填充
- 增加 `img.pixel-border` 回退（padding + bg-color）兼容 `<img>` 元素

### 15D — PixelSwitch 移除
- 组件 `PixelSwitch.vue` 删除 + 6 张 toggle PNG 一并删除
- `docs/components.md` 移除 PixelSwitch 段落和 Props 表
- `index.ts` 取消注册

### 15E — Classic 按钮纹理替换
- `bgbtn.jpg`（196×15 cover）→ `bgbtn.png`（16×16 噪声图 repeat）
- 全站 7 个 `.md` 文件引用路径同步更新

### 15F — 精灵图文件清理
- 删除 `public/UI/` 全部 12 张 PNG + `public/background/bgbtn.jpg`

### 15G — 组件目录重排
- 15 个组件归入 `ui/`（6）、`layout/`（5）、`content/`（4）子目录
- `index.ts`、`Layout.vue`、`SiteFooter.vue`、`NewsCard.vue`、`ScrollToTop.vue` 导入路径同步更新

### 15H — 修复
- LinkCard `target="_blank"` → 仅外部链接新窗口，内部 SPA 跳转
- NewsCard PixelButton → PixelButton3D，修复点击命中区域（外层 `<a>` 包裹）
- PixelButton 普通态描边透明
- PixelButton3D 恢复原版下沉效果（translateY + margin-bottom + height 缩减）
- 像素边框变量化（`--pixel-border-outer` / `--pixel-border-highlight` / `--pixel-border-shadow` / `--pixel-border-fill`）
- ArticleView 顶图改为固定高度 24rem 居中裁剪

### 构建验证
- 5 次提交，每次构建通过，最终构建 2.30s
- `prefers-reduced-motion` 规则注释掉（用户系统偏左为减少动效时覆盖）
- 构建验证通过（2.20s）

---

## 15 — UI 精灵图替换计划

**Branch:** `template/vitepress`

（计划阶段，详见 `dev-notes/ui-sprite-to-css-plan.md`）