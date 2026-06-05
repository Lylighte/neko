# Phase 10.2 — 组件页视觉问题修复

> 日期: 2026-06-05
> 状态: ✅ 已完成
> 前置: Phase 10.1 已完成

---

## 执行记录

### P0 — 代码块暗色背景 ✅
- `config.ts` 配置 `markdown.theme: 'github-dark'`
- `vars.css` 覆盖 7 个 `--vp-code-*` 变量（暗色背景、行高亮色、复制按钮、标签栏）

### P1 — 3D 按钮布局跳动 ✅
- 根因：模板 `:style` 中 `height` 在按下时从 `$height` 变为 `calc($height - offset)`，配合 `transition: all` 产生布局动画
- 修复：`height` 固定为 `$props.height`，按下效果由 `translateY` + `::after` box-shadow 承担
- 额外：Button 对比度(P1) 和像素代码字体(P1) 因 scope 缩减跳过

### P2 — 跳过（用户要求缩减 scope）⏭️
- 侧边栏 active / Props 表格行分隔线 / 组件副标题颜色

### P3 — 滚动条 + 间距 + Switch ✅
- 滚动条暗色样式
- 演示区与代码块间距加大
- Switch 组件文字 gap 缩小

### 后续额外工作

### HomeHero 重构
- CSS background → `<img>` + 叠加层，object-fit 可控
- `html { overflow-x: hidden }` 修复 100vw 横向滚动条
- `margin-bottom: 3rem` 与后续内容间距
- `hasHero` frontmatter 控制页顶 padding（`with-hero { padding-top: 0 }`）

### HomeIntro 图片边框
- `mc-border`（未定义类）→ `pixel-border`

### NewsCard
- 内容区 padding: 1rem → 1.5rem
- ReadMore 按钮 padding: 0.4rem 1rem

### 接手说明
- 参考 `vars.css` 中 `--vp-code-*` 块可快速定位代码块变量
- `HomeHero.vue` 已改为 `<img>` 结构，叠加层内容通过 prop 传入
- 所有提交均在 `branch: template/vitepress`
  background: var(--pixel-sidebar-active-bg); /* rgba(60,133,39,0.1) — 极淡 */
}
```

### 5. Props 表格 (P2)

**现状**: 无任何自定义表格样式。VitePress 默认表格在深色背景下无行分隔线。

### 6. 副标题颜色 (P2)

**现状**: `docs/components.md` L16: `All built-in Pixel UI components...` 是普通段落，颜色为 `--pixel-color-text: rgba(255,255,255,0.8)`，在深色背景下偏暗。

### 7. 间距 (P3)

**现状**: `docs/components.md` 中演示组件和代码块之间无额外间距，VitePress 默认 margin 较小。

### 8. 滚动条 (P3)

**现状**: 无任何 `::-webkit-scrollbar` 自定义样式。

### 9. Switch (P3)

**现状**: `docs/components.md` L99-102，Switch 和 "OFF" 文字之间有 `gap:1rem`，视觉关联弱。

---

## 执行计划

### Step 1 — 代码块深色主题 (P0)

**文件**: `.vitepress/config.ts`

在 `defineConfig` 中添加 `markdown.theme` 配置，使用 VitePress 内置暗色主题：

```ts
markdown: {
  theme: 'github-dark',
},
```

> 备选: `'one-dark-pro'` | `'material-theme-palenight'` | `'dark-plus'` — 均为 Shiki 内置暗色主题，无需额外安装。

### Step 2 — 代码块字体修复 (P1)

**文件**: `.vitepress/theme/styles/vars.css`

将 `code, pre, kbd, samp` 选择器**拆分**：
- `pre, code`（代码块）→ 标准等宽字体（`Consolas, 'Fira Code', monospace`）
- `kbd, samp`（键盘/示例输出）→ 保留像素字体

```css
/* 代码块 — 标准等宽字体 */
pre, code {
  font-family: Consolas, 'Fira Code', 'Cascadia Code', monospace;
}

/* 键盘/示例 — 像素字体 */
kbd, samp {
  font-family: var(--pixel-font-code);
}
```

### Step 3 — Button 3D 对比度增强 (P1)

**文件**: `.vitepress/theme/styles/vars.css`

提高 `--pixel-btn-3d-bg` 亮度：

```
旧: --pixel-btn-3d-bg: #313233;
新: --pixel-btn-3d-bg: #4a4a4c;
```

同时增强 `--pixel-btn-3d-border` 可见度：

```
旧: --pixel-btn-3d-border: rgba(0, 0, 0, 0.4);
新: --pixel-btn-3d-border: rgba(255, 255, 255, 0.15);
```

### Step 4 — 侧边栏 Active 增强 (P2)

**文件**: `.vitepress/theme/styles/vars.css` + `DocsSidebar.vue`

**vars.css** — 加深 active 背景：
```
旧: --pixel-sidebar-active-bg: var(--pixel-color-accent-soft);  /* rgba(60,133,39,0.1) */
新: --pixel-sidebar-active-bg: rgba(60, 133, 39, 0.2);
```

**DocsSidebar.vue** — 加粗 active 文字：
```css
.sidebar-item.active {
  font-weight: bold;
}
```

### Step 5 — Props 表格样式 (P2)

**文件**: 新建 `.vitepress/theme/styles/tables.css`

```css
/* Props 表格 */
.vp-doc table {
  width: 100%;
  border-collapse: collapse;
}

.vp-doc th {
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-bottom: 2px solid var(--pixel-color-border);
  color: var(--pixel-green-light);
  font-family: var(--pixel-font-heading);
}

.vp-doc td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--pixel-color-text);
}

.vp-doc tr:hover td {
  background: rgba(255, 255, 255, 0.03);
}
```

**文件**: `.vitepress/theme/styles/index.ts` — 注册新 CSS 文件。

### Step 6 — 副标题颜色 (P2)

**文件**: `docs/components.md`

将 L16 的普通段落改为使用 `--pixel-color-text-muted` 样式：

```html
<p class="section-desc">All built-in Pixel UI components available for use in your Markdown pages.</p>
```

**文件**: `.vitepress/theme/styles/vars.css` — 添加 `.section-desc` 样式：

```css
.section-desc {
  color: var(--pixel-color-text-muted);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
```

### Step 7 — 演示区与代码块间距 (P3)

**文件**: 新建 `.vitepress/theme/styles/demo-spacing.css`

```css
/* 组件演示与代码块间距 */
.vp-doc + .language-html,
.vp-doc div[class*='language-'] {
  margin-top: 1.5rem;
}
```

> 注: 此选择器可能需要根据 VitePress 实际 DOM 结构调整。

### Step 8 — 滚动条样式 (P3)

**文件**: `.vitepress/theme/styles/vars.css`（追加到末尾）

```css
/* 深色滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--pixel-color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--pixel-gray);
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--pixel-gray-light);
}
```

### Step 9 — Switch 组件间距 (P3)

**文件**: `docs/components.md` L99

```
旧: <div style="display:flex;align-items:center;gap:1rem;margin:1rem 0">
新: <div style="display:flex;align-items:center;gap:0.5rem;margin:1rem 0">
```

---

## 涉及文件汇总

| 文件 | 操作 | 步骤 |
|---|---|---|
| `.vitepress/config.ts` | 修改 — 添加 `markdown.theme` | Step 1 |
| `.vitepress/theme/styles/vars.css` | 修改 — 拆分 code/pre 字体、3D 按钮 Token、active-bg、section-desc、滚动条 | Step 2,3,4,6,8 |
| `.vitepress/theme/styles/tables.css` | **新建** — 表格样式 | Step 5 |
| `.vitepress/theme/styles/demo-spacing.css` | **新建** — 演示区间距 | Step 7 |
| `.vitepress/theme/styles/index.ts` | 修改 — 注册新 CSS | Step 5,7 |
| `.vitepress/theme/components/DocsSidebar.vue` | 修改 — active 加粗 | Step 4 |
| `docs/components.md` | 修改 — 副标题 + Switch 间距 | Step 6,9 |

---

## 执行顺序

1. **config.ts** — 代码块深色主题 (P0)
2. **vars.css** — 字体拆分 + Token 调整 + 滚动条 (P1+P2+P3)
3. **tables.css + demo-spacing.css** — 新建样式文件 (P2+P3)
4. **index.ts** — 注册新 CSS
5. **DocsSidebar.vue** — active 加粗 (P2)
6. **docs/components.md** — 副标题 + Switch 间距 (P2+P3)
7. **`npx vitepress build`** — 构建验证
8. **视觉回归** — 浏览器打开 `/docs/components` 逐项检查