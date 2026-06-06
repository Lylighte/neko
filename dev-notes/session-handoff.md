# Session Handoff

## 已完成

（截至 Phase 18，完整日志见 CHANGELOG.md）

- **docs 架构重构**: DocsBrowser SPA → 原生 `.md` + DocsSidebar ✅
- **AGENTS.md**: 约束指令写入 ✅
- **config.ts**: `srcExclude` 排除项目文件 ✅
- **删除旧文件**: DocsBrowser/DocTree/DocViewer/docs.ts/demo.md ✅
- **构建验证**: `npx vitepress build` 通过 ✅
- **README 重写**: 去 Minecraft 化 ✅
- **config.ts**: title/description 更新 ✅
- **像素字体实施**: Ark Pixel (标题) + Monocraft (代码) + Unifont (正文) ✅
- **blog/ → news/** 重命名 ✅
- **全站换色**: 绿色 `#3c8527` → 红色 `#d84b4b` ✅
- **CSS 变量重命名**: `--pixel-green*` → `--pixel-brand*` ✅
- **Footer 重构**: 动态 title/description、鸣谢声明、颜色变量化 ✅
- **SiteFooter 变量抽取**: hero padding/width/min-width 抽入 vars.css ✅
- **全站动效增强 (Phase 14)**: NavBar/ScrollToTop 修复、页面过渡、入场动画、平滑滚动 ✅
- **Phase 15 — UI 精灵图 → CSS**: PixelButton/PixelInput/pixel-border CSS 替换，PixelSwitch 移除，Classic 纹理替换，组件目录重排 ✅
- **Phase 16 — 全站字体方案复查**: 注释/变量修正，5 组件标题字体修复 ✅
- **Phase 17 — Pixel Eco Logo**: 8×8 砖块 Logo + favicon 配置 ✅
- **Phase 18 — 字体抗锯齿优化**: 关闭抗锯齿提升像素字体锐利度 ✅
- **Phase 19 — 字号对齐 12px 网格**: unitsPerEm 实测驱动，分用途对齐 ✅
- **Phase 20 — 字体颜色提亮 + Logo 整理**: 正文 0.8→0.9，Logo 切 PNG，favicon 修复 ✅

## 待执行

## 发布计划

- 默认配图保留 `15.jpg`、`44.jpg`
- `bg.jpg`、`header-bg.jpg` 移除（header-bg.jpg 零引用，hero-bg.jpg 不存在）
- 发布前需:
  1. 精灵图 → CSS 替换完成
  2. CHANGELOG 转为用户可读版本（含项目来源 + archive 链接）
  3. GitHub release + 当前仓库 archive
  4. 新仓库继续开发（不保留 git history）
- **NavBar 字体**: 改为 Ark Pixel，与标题统一 ✅
- **Design Tokens 计划**: Phase 10 三层令牌架构计划完成 ✅
- **Phase 10: Design Tokens 实施**: vars.css 三层令牌重构，16 组件变量替换 ✅
- **Phase 10.1: 清理**: 冗余文件/变量清理 ✅
- **Phase 10.2: 视觉修复**: 代码块暗色主题、3D按钮布局修复、滚动条/间距 ✅
- **HomeHero 重构**: CSS background → `<img>` + 叠加层结构 ✅
- **hasHero frontmatter**: 控制页面顶部 padding，替换脆弱的负 margin ✅
- **HomeIntro 图片边框**: `mc-border` → `pixel-border` ✅
- **NewsCard 间距微调**: padding 1rem→1.5rem，按钮缩小 ✅
- **overflow-x 修复**: `html { overflow-x: hidden }` 解决 100vw 横向滚动条 ✅

## 剩余待办

- **字体方案收尾**: ✅
- **docs 内容完善**: 各文档页的具体内容填充
- **README 更新**: 反映最新组件和架构变更
- **Logo 重制**：设计当前主题的新 Logo ✅
- **字号对齐计划**: 统一字号为像素字体原生尺寸的整数倍 ✅

## 发布前准备

- **RSS 订阅**: 添加 RSS feed 支持
- **SEO 优化**: 更新 meta 标签，提交 sitemap
- **Lighthouse 优化**: 确保性能、可访问性、最佳实践得分高
