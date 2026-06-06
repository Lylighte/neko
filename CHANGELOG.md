# Changelog

## pre-release-1.0

> 面向用户的发布版本。基于原始社区门户 SPA 进行深度改造，最终成为独立于特定社区的通用像素风格模板。

### 项目溯源

本模板最初源自一个 Minecraft 组织门户项目（Vite + Vue 3 SPA），经过以下阶段转型为通用静态站点模板：

- **原始仓库**：Minecraft 组织门户（含后端 API、管理后台）
- **模板化**：剥离后端 → 迁移至 VitePress → 去 Minecraft 化 → 像素风格化
- **当前定位**：通用像素风格 VitePress 主题/模板

---

### 第一阶段：后端剥离与静态化

**分支：`template-cleanup`**

移除所有后端依赖，将 SPA 转变为纯前端静态项目。

#### Phase 1 — 后端依赖剥离
- 删除 `src/api/` 全部 8 个 API 文件（axios 实例、auth、documents、newslist、serverlist、introlist、linklist、slogan）
- 删除 8 个管理/认证/编辑器视图（LoginView、ManagementView + 5 子视图、DocumentsEditor）
- 删除耦合组件 TreeViewer、PdfViewer
- 重写 FooterBar、IntroItem 为静态数据驱动
- 清理路由、main.ts、package.json（移除 axios、vue-toastification、md-editor-v3、vue-clipboard3）

#### Phase 2 — 静态数据层与页面修复
- 创建静态数据层 `src/data/types.ts`、`static.ts`、`config.ts`
- 修复 11 个因 API 删除而损坏的视图/组件
- 提取硬编码内容到 `siteConfig`
- 删除 List 和 Activity 页面，提取硬编码字符串到 i18n

---

### 第二阶段：VitePress 迁移

**分支：`template/vitepress`（从 `template-cleanup` 分支）**

将 Vite + Vue 3 SPA 原地迁移为 VitePress 静态站点。

#### Phase 3 — 基础迁移
- 安装 VitePress 1.6，创建 `.vitepress/config.ts` 和主题入口
- 从 `src/` 移植 12 个风格组件到 `.vitepress/theme/components/`
- 创建 6 个 Markdown 页面替代 SPA 视图
- 清理 `public/`：移除 PDF.js（~10MB）、NMO 专属资源、62 张背景图 → 精选保留 4 张
- 建立 CSS 变量系统，开发笔记移至 `dev-notes/`

#### Phase 4 — 自定义布局迁移
- 创建 `Layout.vue`（NavBar + Content + SiteFooter + ScrollToTop），替换 VitePress 默认主题
- 移植 NavBar.vue（vue-router → VitePress `useRoute()`）
- 移除 NMO 专属灯笼模块
- 隐藏 VitePress 默认导航栏、侧边栏、文档页脚

#### Phase 5 — 视图对等
- 创建 `ArticleView.vue`：新闻文章详情页（封面图、作者信息、日期）
- 新闻文章支持 YAML frontmatter
- 创建 `LinkCard.vue`：带背景图的链接卡片网格

#### Phase 6 — 旧 SPA 源文件清理
- 7 批次逐批 `git rm` + 每批构建验证：
  - SPA 入口文件（App.vue、main.ts、style.css、vite-env.d.ts）
  - vue-router 配置
  - 旧静态数据层（config.ts、i18n.ts、static.ts、types.ts）
  - NMO 灯笼模块、旧字体文件
  - FooterBar.vue、NavBar.vue（已移植）

---

### 第三阶段：文档体系与品牌重塑

#### Phase 7 — 文档改造与去 Minecraft 化
- 重写文档系统：替换 8 个旧占位文档为 5 个真实指南（快速开始、自定义、新闻、组件、部署）
- 组件展示内容迁入 `docs/components.md`
- README 重写：CSS 变量 `--minecraft-*` → `--pixel-*`，组件名 `MinecraftButton` → `PixelButton`
- Config 更新：title/description 去 Minecraft 化，Nav 链接精简

#### Phase 8 — 文档架构重构与项目治理
- **Docs 架构重设计**：DocsBrowser SPA → 原生 `.md` + `DocsSidebar.vue` 可折叠侧边栏
- 删除旧 SPA 三件套（DocsBrowser、DocTree、DocViewer）
- 新建 `AGENTS.md`：模型约束指令
- Config 添加 `srcExclude` 排除项目文件
- 制定像素字体三层栈计划

---

### 第四阶段：像素字体实施

#### Phase 9 — 字体方案落地
- **字体文件**：下载 Ark Pixel 12px woff2（~1.1MB）、Monocraft v4.2.1 TTF（~930KB）、Unifont 17.0.04 OTF（切割为 3 个 woff2 分片，~870KB）
- **字体栈**：标题 → Ark Pixel｜代码 → Monocraft｜正文 → Unifont
- 发布 `fonts.css`（5 组 @font-face，unicode-range 分片）
- `.gitignore` 排除字体临时文件，README 补充字体说明

---

### 第五阶段：设计系统构建

#### Phase 10 — Design Tokens 三层架构
- `vars.css` 重构为 Layer 1 Primitives / Layer 2 Semantic / Layer 3 Component
- 变量命名规范：`--pixel-{category}-{role}[-{variant}]`
- 16 个组件硬编码值替换为 CSS 变量
- 代码块暗色主题修正、3D 按钮布局跳动修复、滚动条暗色样式
- **HomeHero 重构**：CSS background → `<img>` + 叠加层
- 引入 `hasHero` frontmatter 控制页面顶部 padding
- `html { overflow-x: hidden }` 修复横向滚动条

---

### 第六阶段：品牌换色与视觉统一

#### Phase 11 — blog → news 重命名
- `blog/` → `news/`、`BlogCard.vue` → `NewsCard.vue`、`docs/blogging.md` → `docs/news.md`
- 编辑 12 个引用文件，全量 grep 零遗漏

#### Phase 12 — 全站换色（绿色 → 红色）
- 主题色从 `#3c8527`（绿）更换为 `#d84b4b`（红）
- NavBar 滑块、Hero 渐层同步更新红色系
- 所有组件通过变量引用自动跟随

#### Phase 13 — CSS 变量品牌中立化
- `--pixel-green*` → `--pixel-brand*`，消除绿色名与红色值的矛盾
- 组件、文档、README 全量同步
- `--pixel-hero-*` 布局参数抽入 vars.css

---

### 第七阶段：动效增强

#### Phase 14 — 全站动效
- **Bug 修复**：NavBar `@click.prevent` → `@click`；ScrollToTop 用 `v-show` + `.visible` 控制
- **页面过渡**：`<Transition name="page" mode="out-in">` 淡入淡出 0.2s
- **进场动画**：HomeHero `fade-in-left` 0.8s、HomeIntro `fade-in` 0.8s
- `html { scroll-behavior: smooth }` 全站平滑滚动
- LinkCard hover `scale(1.05)` 动效

---

### 第八阶段：纯 CSS 化

#### Phase 15 — UI 精灵图全部替换为 CSS
- **PixelButton**：4 张 3×3 border-image 精灵图 → `box-shadow` 多层叠加，5 个交互态全覆盖
- **PixelInput**：`text-input.png` → `border-top/bottom` 纯色边
- **pixel-border/PixelDialog**：`dialog_background_hollow_4.png` → border + outline + box-shadow
- **PixelSwitch 移除**：组件 + 6 张 toggle PNG 一并删除
- **纹理替换**：`bgbtn.jpg` → `bgbtn.png`（16×16 噪声图 repeat）
- 删除 12 张精灵图 PNG + `bgbtn.jpg`
- **组件目录重排**：15 个组件归入 `ui/`（6）、`layout/`（5）、`content/`（4）
- **修复**：LinkCard 内外链区分、pixel-border 变量化、ArticleView 顶图固定高度

---

### 第九阶段：像素级打磨

#### Phase 16 — 字体方案复查
- 修复 `fonts.css`/`vars.css` 注释与实际实现不一致
- 4 个组件标题字体继承修正（body → heading）

#### Phase 17 — Pixel Eco Logo
- 8×8 画布，错缝砌砖图案，左上光照 3D 着色
- 输出 SVG/PNG/ICO 三种格式，配置 favicon

#### Phase 18 — 字体抗锯齿优化
- `text-rendering: optimizeLegibility` → `optimizeSpeed`
- `-webkit-font-smoothing: antialiased` → `none`

#### Phase 19 — 字号对齐 12px 网格
- 基于 fontTools 实测三种字体 unitsPerEm，按用途分场景对齐：
  - 小字 12px｜正文 16px｜次标题 20px｜大标题 24px
- 字号变量、组件中引用字号同步调整

#### Phase 20 — 字体颜色提亮 & Logo 整理
- 正文 0.8 → 0.9、次要文字 0.7 → 0.8、页脚/版权/注脚同步提亮
- Logo PNG 作为主资源，SVG 保留为源文件，新增 favicon.ico

#### Phase 21 — 背景图清理
- 替换 `bg.jpg` → `19.jpg`、`header-bg.jpg` → `28.jpg`
- 删除零引用的旧背景图

---

### 第十阶段：内容完善与本地化

#### Phase 22 — 全站去游戏化 & Docs 补全
- 所有页面移除 Minecraft/redstone 特有术语
- Docs 修复补全（项目结构树、Logo 说明、截断内容）
- README 中文重写（技术栈表、项目结构、组件清单）
- `package.json`：`minecraft-community-template` → `pixel-eco-template`

#### Phase 23 — 全站中文化
- 所有页面（index、about、news、404）全部中文
- 所有 Docs 文档全部中文
- 组件演示文本（按钮文字、Props 表）全部中文

#### Phase 24 — 主题组件文本中文化
- DocsSidebar、SiteFooter、ArticleView、NewsCard、PixelDialog 标签/提示/文字全部中文

#### Phase 25 — Config 中文化 & Docs 补充
- Config description/copyright 中文化
- Docs 新增"文档管理"指南
- Minecraft 免责声明以 HTML 注释保留

---

### 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | VitePress 1.6 |
| 前端 | Vue 3.5 + TypeScript 5.8 |
| 字体 | Ark Pixel（标题）+ Monocraft（代码）+ Unifont（正文）|
| 主题色 | 红色 `#d84b4b`（`--pixel-brand*` 变量）|
| 构建 | `npx vitepress build`，约 2.5s |
| 输出 | 纯静态，无后端依赖 |