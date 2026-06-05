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

## 剩余待办

### 像素字体实施

详见 `dev-notes/pixel-font-plan.md`：

- 下载 Ark Pixel 12px、Monocraft、Unifont woff2
- 编写 `fonts.css`（@font-face + unicode-range 分片）
- 应用到标题/代码/正文
- 构建验证
