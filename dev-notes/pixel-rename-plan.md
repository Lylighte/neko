# Pixel Rename Plan

**Status:** 📋 PLANNING
**Goal:** 将项目中所有 `Minecraft` / `minecraft` / `mc-` 命名替换为 `Pixel` / `pixel` / `pixel-`。

---

## 影响范围

### 文件重命名（8 个）

| 旧路径 | 新路径 |
|--------|--------|
| `components/MinecraftButton.vue` | `components/PixelButton.vue` |
| `components/MinecraftButtonClassic.vue` | `components/PixelButtonClassic.vue` |
| `components/MinecraftButton3D.vue` | `components/PixelButton3D.vue` |
| `components/MinecraftInput.vue` | `components/PixelInput.vue` |
| `components/MinecraftTextarea.vue` | `components/PixelTextarea.vue` |
| `components/MinecraftSwitch.vue` | `components/PixelSwitch.vue` |
| `components/MinecraftDialog.vue` | `components/PixelDialog.vue` |
| `styles/mc-border.css` | `styles/pixel-border.css` |

### CSS 变量重命名（7 个）

| 旧名 | 新名 |
|------|------|
| `--minecraft-green` | `--pixel-green` |
| `--minecraft-green-light` | `--pixel-green-light` |
| `--minecraft-green-dark` | `--pixel-green-dark` |
| `--minecraft-gray-light` | `--pixel-gray-light` |
| `--minecraft-gray` | `--pixel-gray` |
| `--minecraft-gray-dark` | `--pixel-gray-dark` |
| `--minecraft-dark` | `--pixel-dark` |

### CSS class 重命名（6 个）

| 旧名 | 新名 |
|------|------|
| `.minecraft-layout` | `.pixel-layout` |
| `.minecraft-button` | `.pixel-button` |
| `.minecraft-button-classic` | `.pixel-button-classic` |
| `.minecraft-button-3d` | `.pixel-button-3d` |
| `.minecraft-input` | `.pixel-input` |
| `.minecraft-switch` | `.pixel-switch` |

### 内容文件更新（~20 个）

| 类别 | 文件 |
|------|------|
| 主题入口 | `index.ts` |
| 布局 | `Layout.vue` |
| 样式 | `vars.css` |
| 组件内部 | 7 个 Pixel*.vue + ScrollToTop.vue + BlogCard.vue |
| 组件引用 | ArticleView.vue, LinkCard.vue, HomeHero.vue, NavBar.vue, SiteFooter.vue |
| Markdown | index.md, about.md, 404.md, blog/index.md, blog/welcome.md, blog/community-update.md, demo.md |
| 根目录 | README.md, config.ts, CHANGELOG.md |

---

## 执行步骤

### Batch 1 — 文件重命名（git mv）

```bash
git mv .vitepress/theme/components/MinecraftButton.vue .vitepress/theme/components/PixelButton.vue
git mv .vitepress/theme/components/MinecraftButtonClassic.vue .vitepress/theme/components/PixelButtonClassic.vue
git mv .vitepress/theme/components/MinecraftButton3D.vue .vitepress/theme/components/PixelButton3D.vue
git mv .vitepress/theme/components/MinecraftInput.vue .vitepress/theme/components/PixelInput.vue
git mv .vitepress/theme/components/MinecraftTextarea.vue .vitepress/theme/components/PixelTextarea.vue
git mv .vitepress/theme/components/MinecraftSwitch.vue .vitepress/theme/components/PixelSwitch.vue
git mv .vitepress/theme/components/MinecraftDialog.vue .vitepress/theme/components/PixelDialog.vue
git mv .vitepress/theme/styles/mc-border.css .vitepress/theme/styles/pixel-border.css
```

### Batch 2 — index.ts（import + 注册）

- 8 个 import 路径
- 8 个 `app.component()` 注册名

### Batch 3 — 组件内部引用

- PixelDialog.vue → import PixelButtonClassic
- PixelButton.vue → class 名
- PixelButtonClassic.vue → class 名
- PixelButton3D.vue → class 名
- PixelInput.vue → class 名
- PixelTextarea.vue → class 名
- PixelSwitch.vue → class 名
- ScrollToTop.vue → import PixelButton
- BlogCard.vue → import PixelButton

### Batch 4 — CSS 变量 + class（vars.css, pixel-border.css, Layout.vue）

- vars.css: 7 个变量 + 注释
- pixel-border.css: 文件名引用
- Layout.vue: `.minecraft-layout` → `.pixel-layout`

### Batch 5 — 其余 .vue 组件（CSS 变量引用）

- ArticleView.vue, LinkCard.vue, HomeHero.vue, NavBar.vue, SiteFooter.vue

### Batch 6 — Markdown 页面

- index.md, about.md, 404.md, blog/index.md, blog/welcome.md, blog/community-update.md, demo.md

### Batch 7 — 根目录文件

- README.md, config.ts, CHANGELOG.md

### Batch 8 — 构建验证

```bash
npx vitepress build
```

---

## 风险

| 风险 | 缓解 |
|------|------|
| 遗漏引用导致构建失败 | 每批后构建验证 |
| 大小写敏感（git mv 在 Windows） | 使用 `git mv` 而非 `ren` |
| Markdown 中 Minecraft 自然语言 | 仅替换组件名/变量名，保留描述性文字 |