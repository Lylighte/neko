# Session Handoff

## 已完成

- **docs 架构重构**: DocsBrowser SPA → 原生 `.md` + DocsSidebar
  - 新建 `DocsSidebar.vue`、5 个 `docs/*.md`
  - 修改 `Layout.vue`、`index.ts`、`config.ts`
  - 修改 `docs/index.md` 为 LinkCard 网格入口
- **AGENTS.md**: 约束指令写入
- **config.ts**: `srcExclude` 排除项目文件
- 已 commit 两次（2 个 commit 领先 origin）

## 剩余待办

### Step 1 — 删除旧文件（5 个）

需用户确认：

```
git rm .vitepress/theme/data/docs.ts
git rm .vitepress/theme/components/DocsBrowser.vue
git rm .vitepress/theme/components/DocTree.vue
git rm .vitepress/theme/components/DocViewer.vue
git rm demo.md
```

### Step 2 — 构建验证

```bash
npx vitepress build
```

### Step 3 — 继续后续任务

- 重写 `README.md`（去 Minecraft 化）
- 更新 `config.ts` title/description
- 像素字体方案
- 检查 `docs/` 排除 vs 侧边栏链接一致性
