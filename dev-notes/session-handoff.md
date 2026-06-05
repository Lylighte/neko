# Session Handoff

## 已完成

- **docs 架构重构**: DocsBrowser SPA → 原生 `.md` + DocsSidebar ✅
- **AGENTS.md**: 约束指令写入 ✅
- **config.ts**: `srcExclude` 排除项目文件 ✅
- **删除旧文件**: DocsBrowser/DocTree/DocViewer/docs.ts/demo.md ✅
- **构建验证**: `npx vitepress build` 通过 ✅
- **README 重写**: 去 Minecraft 化 ✅
- **config.ts**: title/description 更新 ✅
- **CHANGELOG**: Phase 8 记录 ✅
- **dev-notes 清理**: 移除 4 个已完成计划文档 ✅
- **docs 一致性检查**: 侧边栏链接与文件一一对应 ✅
- **像素字体实施**: Ark Pixel (标题) + Monocraft (代码) + Unifont (正文) ✅
- **NavBar 字体**: 改为 Ark Pixel，与标题统一 ✅
- **Design Tokens 计划**: Phase 10 三层令牌架构计划完成 ✅
- **Phase 10: Design Tokens 实施**: vars.css 三层令牌重构，16 组件变量替换 ✅
- **Phase 10.1: 清理**: 冗余文件/变量清理 ✅
- **Phase 10.2: 视觉修复**: 代码块暗色主题、3D按钮布局修复、滚动条/间距 ✅
- **HomeHero 重构**: CSS background → `<img>` + 叠加层结构 ✅
- **hasHero frontmatter**: 控制页面顶部 padding，替换脆弱的负 margin ✅
- **HomeIntro 图片边框**: `mc-border` → `pixel-border` ✅
- **BlogCard 间距微调**: padding 1rem→1.5rem，按钮缩小 ✅
- **overflow-x 修复**: `html { overflow-x: hidden }` 解决 100vw 横向滚动条 ✅

## 剩余待办

- **字体方案收尾**: Cubic 11 像素字体声明暂移除，待后续 reintroduce
- **docs 内容完善**: 各文档页的具体内容填充
- **README 更新**: 反映最新组件和架构变更
