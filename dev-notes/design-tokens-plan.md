# Phase 10: Design Tokens 统一 & 主题架构

## 目标

将组件中重复的 CSS 值提取为 CSS 自定义属性（Design Tokens），
并为后续主题自定义（颜色/间距/字体切换）建立可扩展架构。

---

## 设计原则

1. **三层令牌架构**：原始值 → 语义令牌 → 组件令牌
2. **命名规范**：`--pixel-{category}-{role}[-{variant}]`
3. **主题可换**：通过切换 `:root` / `[data-theme]` 变量值实现换肤
4. **向后兼容**：不改变现有组件的视觉效果
5. **组件不直接引用 Layer 2**：组件通过 Layer 3 组件令牌间接引用语义令牌，
   确保未来单独调整某组件时不会误伤其他区域

---

## 令牌层级

```
Layer 1: 原始调色板 (Primitives)
  --pixel-green / --pixel-gray / --pixel-dark ...
  不直接使用，仅供 Layer 2 引用

Layer 2: 语义令牌 (Semantic Tokens)
  --pixel-color-bg / --pixel-color-text / --pixel-color-border ...
  描述"用途"，供 Layer 3 引用；全局选择器(body/h1/code)可直接引用

Layer 3: 组件令牌 (Component Tokens) 【推荐】
  --pixel-btn-bg / --pixel-input-border / --pixel-nav-bg ...
  组件专属变量，组件内部只引用这一层
  默认值引用 Layer 2，可单独覆盖而不影响其他组件
```

### 引用规则

| 位置 | 可引用层级 | 示例 |
|------|-----------|------|
| 全局选择器 (`body`, `h1`, `code`) | Layer 2 | `body { font-family: var(--pixel-font-body); }` |
| 组件内部样式 | Layer 3 | `.pixel-btn { background: var(--pixel-btn-bg); }` |
| Layer 3 默认值 | Layer 2 | `--pixel-btn-bg: var(--pixel-color-accent);` |
| Layer 2 默认值 | Layer 1 | `--pixel-color-accent: var(--pixel-green);` |

---

## 变量清单

### 🎨 颜色 (Colors)

| 变量名 | 默认值 | 用途 |
|--------|--------|------|
| `--pixel-color-bg` | `var(--pixel-dark)` | 主背景（body、页面底色） |
| `--pixel-color-bg-page` | `#0f0e0d` | 沉浸区域背景（Hero、全屏区块），比 bg 更深 |
| `--pixel-color-bg-card` | `#313131` | 卡片/面板背景 |
| `--pixel-color-bg-overlay` | `rgba(0,0,0,0.5)` | 遮罩/半透明背景 |
| `--pixel-color-bg-input` | `#616161` | 输入框背景 |
| `--pixel-color-text` | `rgba(255,255,255,0.8)` | 正文颜色 |
| `--pixel-color-text-muted` | `rgba(255,255,255,0.7)` | 次要文字 |
| `--pixel-color-text-inverse` | `#000` | 反色文字(亮底暗字) |
| `--pixel-color-accent` | `var(--pixel-green)` | 主强调色 |
| `--pixel-color-accent-light` | `var(--pixel-green-light)` | 亮强调色 |
| `--pixel-color-accent-dark` | `var(--pixel-green-dark)` | 暗强调色 |
| `--pixel-color-accent-soft` | `rgba(60,133,39,0.1)` | 柔和强调(高亮背景) |
| `--pixel-color-border` | `var(--pixel-gray)` | 默认边框色 |
| `--pixel-color-border-dark` | `#000` | 深色边框 |

### 📏 间距 (Spacing)

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--pixel-space-xs` | `0.25rem` | 极小间距 |
| `--pixel-space-s` | `0.5rem` | 小间距 |
| `--pixel-space-m` | `1rem` | 通用间距 |
| `--pixel-space-l` | `2rem` | 大间距 |
| `--pixel-space-xl` | `3rem` | 超大间距 |

### 🔤 字体 (Typography)

| 变量名 | 值 |
|--------|-----|
| `--pixel-font-heading` | `'Ark Pixel', 'Unifont', monospace` |
| `--pixel-font-code` | `'Monocraft', 'Unifont', monospace` |
| `--pixel-font-body` | `'Unifont', monospace` |
| `--pixel-font-size-s` | `0.875rem` |
| `--pixel-font-size-m` | `1rem` |
| `--pixel-font-size-l` | `1.5rem` |
| `--pixel-font-size-xl` | `2rem` |
| `--pixel-line-height` | `1.7` |

### 🌑 阴影 (Shadows)

| 变量名 | 值 |
|--------|-----|
| `--pixel-shadow-soft` | `4px 4px rgba(0,0,0,0.5)` |
| `--pixel-shadow-hard` | `4px 4px rgba(0,0,0,0.7)` |
| `--pixel-shadow-text` | `2px 2px rgba(0,0,0,0.5)` |

### 📐 边框 (Borders)

| 变量名 | 值 |
|--------|-----|
| `--pixel-border` | `2px solid var(--pixel-color-border)` |
| `--pixel-border-dark` | `2px solid var(--pixel-color-border-dark)` |

### ⏱ 过渡 (Transitions)

| 变量名 | 值 |
|--------|-----|
| `--pixel-transition-fast` | `0.1s ease-in-out` |
| `--pixel-transition` | `0.3s ease` |
| `--pixel-transition-slow` | `0.3s ease-in-out` |

### 🖼 其他 (Misc)

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--pixel-radius` | `0` | 圆角(像素风=0) |
| `--pixel-offset-3d` | `12px` | 3D 按钮压下位移 |
| `--pixel-z-overlay` | `512` | 遮罩层 |
| `--pixel-z-nav` | `1024` | 导航层级 |
| `--pixel-z-dialog` | `2048` | 弹窗层级 |

---

## 实施步骤

### Step 1: 重构 `vars.css`
- 按三层架构重组所有变量
- 新增 Layer 2 语义令牌 + Layer 3 组件令牌
- 保留旧 `--pixel-*` 原始值作为 Layer 1
- 全局选择器 (`body`/`h1-h6`/`code`) 引用 Layer 2
- 定义 Layer 3 组件令牌默认值（引用 Layer 2）

### Step 2: 更新组件引用
- 逐个组件替换硬编码值为 `var(--pixel-xxx)`（引用 Layer 3）
- 涉及 ~16 个组件 + `Layout.vue` + `pixel-border.css`，约 40+ 处替换
- 重点关注 `rgba()` 值的括号和逗号，避免复制粘贴错误

### Step 3: 构建 + 视觉回归检查
- `npx vitepress build` 确保编译无报错
- `npx vitepress preview` 启动预览，人工遍历以下页面：
  - 首页 — 检查 Hero、Intro、按钮颜色/阴影
  - 新闻列表 — 检查 NewsCard 背景/文字
  - 文档页 — 检查 DocsSidebar 边框/高亮
  - 关于页 — 检查整体排版
- 对比替换前后的视觉效果，确认无偏差

---

## 影响范围

| 文件 | 操作 |
|------|------|
| `vars.css` | 重构：新增 ~40 个语义/组件变量 |
| `Layout.vue` | 替换硬编码值 |
| `NavBar.vue` | 替换硬编码值 |
| `HomeHero.vue` | 替换硬编码值 |
| `HomeIntro.vue` | 替换硬编码值 |
| `NewsCard.vue` | 替换硬编码值 |
| `LinkCard.vue` | 替换硬编码值 |
| `ArticleView.vue` | 替换硬编码值 |
| `DocsSidebar.vue` | 替换硬编码值 |
| `SiteFooter.vue` | 替换硬编码值 |
| `PixelButton.vue` | 替换硬编码值 |
| `PixelButtonClassic.vue` | 替换硬编码值 |
| `PixelButton3D.vue` | 替换硬编码值 |
| `PixelInput.vue` | 替换硬编码值 |
| `PixelTextarea.vue` | 替换硬编码值 |
| `PixelDialog.vue` | 替换硬编码值 |
| `PixelSwitch.vue` | 替换硬编码值 |
| `ScrollToTop.vue` | 替换硬编码值 |
| `pixel-border.css` | 替换硬编码值 |

---

## 前置确认

| 检查项 | 状态 |
|--------|------|
| 组件命名统一（全部 `Pixel*`，无 `Minecraft*` 残留） | ✅ 已完成 |
| 正文字体决策（`--pixel-font-body: 'Unifont', monospace`） | ✅ 已确定 |
| 字体文件集成（Ark Pixel + Monocraft + Unifont） | ✅ 已完成 |
| 自定义 Layout 稳定 | ✅ 已完成 |
| 文档架构（DocsSidebar）稳定 | ✅ 已完成 |

---

## 组件令牌清单（Layer 3）

这些变量在 `vars.css` 中定义默认值（引用 Layer 2），组件内部只引用这些变量。

| 变量名 | 默认值 | 使用组件 |
|--------|--------|---------|
| `--pixel-btn-bg` | `var(--pixel-color-accent)` | PixelButton |
| `--pixel-btn-bg-hover` | `var(--pixel-color-accent-light)` | PixelButton |
| `--pixel-btn-text` | `var(--pixel-color-text-inverse)` | PixelButton |
| `--pixel-btn-border` | `var(--pixel-border-dark)` | PixelButton |
| `--pixel-btn-classic-bg` | `#999 url('/background/bgbtn.jpg') center/cover` | PixelButtonClassic |
| `--pixel-btn-3d-offset` | `12px` | PixelButton3D |
| `--pixel-input-bg` | `var(--pixel-color-bg-input)` | PixelInput, PixelTextarea |
| `--pixel-input-border` | `var(--pixel-border-dark)` | PixelInput, PixelTextarea |
| `--pixel-input-text` | `var(--pixel-color-text-inverse)` | PixelInput, PixelTextarea |
| `--pixel-nav-bg` | `rgba(0,0,0,0.5)` | NavBar |
| `--pixel-nav-border` | `var(--pixel-border)` | NavBar |
| `--pixel-nav-shadow` | `var(--pixel-shadow-hard)` | NavBar |
| `--pixel-nav-slider-bg` | `#7e0c6b` | NavBar |
| `--pixel-dialog-overlay` | `var(--pixel-color-bg-overlay)` | PixelDialog |
| `--pixel-dialog-bg` | `var(--pixel-color-bg-card)` | PixelDialog |
| `--pixel-card-bg` | `var(--pixel-color-bg-card)` | NewsCard, LinkCard |
| `--pixel-card-shadow` | `var(--pixel-shadow-soft)` | LinkCard |
| `--pixel-sidebar-bg` | `var(--pixel-color-bg-card)` | DocsSidebar |
| `--pixel-sidebar-border` | `var(--pixel-border)` | DocsSidebar |
| `--pixel-sidebar-active-bg` | `var(--pixel-color-accent-soft)` | DocsSidebar |
| `--pixel-hero-overlay` | `var(--pixel-color-bg-overlay)` | HomeHero |
| `--pixel-footer-text` | `var(--pixel-color-text-muted)` | SiteFooter |