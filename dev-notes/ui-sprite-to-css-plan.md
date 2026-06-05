# UI 精灵图 → CSS 实现替换计划

## 现状

`public/UI/` 中有 **12 张 PNG 精灵图**，来自原 Neco 项目的 Minecraft 风格纹理。

### 引用分布

| 精灵图 | 数量 | 引用位置 | 用途 |
|--------|------|---------|------|
| `button_normal.png` | 1 | `vars.css` → `--btn-border-image` | PixelButton 默认边框 |
| `button_hover.png` | 1 | `vars.css` → `--btn-border-image-hover` | PixelButton hover 边框 |
| `button_pressed_hover.png` | 1 | `vars.css` → `--btn-border-image-active` | PixelButton active 边框 |
| `button_pressed.png` | 1 | `PixelButton.vue:68`（硬编码） | PixelButton active:hover 边框 |
| `toggle_off.png`、`toggle_off_hover.png` | 2 | `PixelSwitch.vue`（旧版） | Switch 关闭态 |
| `toggle_on.png`、`toggle_on_hover.png` | 2 | `PixelSwitch.vue`（旧版） | Switch 开启态 |
| `toggle_off_new.png`、`toggle_on_new.png` | 2 | `PixelSwitch.vue`（new 属性） | Switch 新版 |
| `text-input.png` | 1 | `vars.css` → `--input-border-image` | PixelInput 边框 |
| `dialog_background_hollow_4.png` | 1 | `pixel-border.css` | `.pixel-border` 工具类 / PixelDialog 边框 |

#### 背景纹理 — 1 张
- `bgbtn.jpg`（0.6KB，实际尺寸 ≈ 128×128 像素的石头/圆石纹理图）— Classic 按钮的背景底纹。在 `vars.css` 中作为 `--pixel-btn-classic-bg` 的被覆盖色（`#999 url('/background/bgbtn.jpg') center/cover`），也在 `about.md` 中作为 LinkCard 卡片背景。可用 CSS 重复纹理或纯色渐变替代。

#### 内容配图（不在本计划范围）
- `15.jpg`（257.8KB）— about.md 示例配图（Hero/Intro/LinkCard）
- `44.jpg`（252KB）— about.md 示例配图
- `bg.jpg`（257.2KB）— about.md 示例配图

### 问题
- 所有精灵图是 **绿色调（Minecraft 原版风格）**，与现在的红色主题不匹配
- 取色器会采到 PNG 中的绿色像素（如 `#37d61e`），造成"代码已换色但显示仍是绿"的错觉
- 依赖外部图片文件，换色需重新制图

### 精灵图特征（实际尺寸）

#### 按钮组 — 4 张，各 3×3 像素
极小的 `border-image` 切片图，每张仅 3×3 像素。本质是 4 角 + 4 边的像素边框纹理，CSS `box-shadow` 多层叠加即可模拟。
- `button_normal.png` — 普通态（3×3）
- `button_hover.png` — 悬停态（3×3）
- `button_pressed.png` — 按下态（3×3）
- `button_pressed_hover.png` — 按下悬停（3×3）

#### 滑块组 — 6 张，各 60×32 像素
实际像素画，绘制了滑块轨道+圆形滑块按钮。
- `toggle_off.png` — 关闭态（60×32）
- `toggle_off_hover.png` — 关闭悬停（60×32，"new"属性的关闭态 ≈ `toggle_off_hover.png` 的视觉）
- `toggle_on.png` — 开启态（60×32）
- `toggle_on_hover.png` — 开启悬停（60×32，7.6KB 比其他的 0.3KB 大很多，可能有渐变细节）
- `toggle_off_new.png` — new 属性关闭态（60×32）
- `toggle_on_new.png` — new 属性开启态（60×32）

#### 输入框 — 1 张，16×16 像素
`text-input.png` — 16×16 的 border-slice 切片，与按钮组类似，CSS 可模拟。

#### 对话框边框 — 1 张，18×18 像素
`dialog_background_hollow_4.png` — 18×18 的 `border-image` 切片（`border-image-slice: 8`），有镂空效果。CSS 纯色边框+背景即可替代。

## 目标

用纯 CSS 替代所有精灵图引用，使外观完全由 CSS 变量控制，换色只需改 `vars.css`。

## 像素特征分析与 CSS 模拟方案

### 1. PixelButton — 3×3 border-image → box-shadow

#### 像素结构分析

3×3 的 border-image 切片本质是像素级 3D 斜面纹理：

```
┌─┬─┬─┐            ┌──┬────┬──┐
│L│T│L│            │暗│亮面│暗│
├─┼─┼─┤            ├──┼────┼──┤
│L│C│D│    →       │亮│按钮│暗│   L=亮色  D=暗色  T=透明/过渡
├─┼─┼─┤            ├──┼────┼──┤
│L│D│D│            │亮│暗面│暗│
└─┴─┴─┘            └──┴────┴──┘
```

- **4 角**：固定纯色像素（左上亮、右下暗，形成 3D 凸起感）
- **4 边**：重复亮/暗条纹（上下亮边，左右暗边）
- **中心**：内容区透明，露出按钮背景色

#### CSS 精确模拟

```css
.pixel-button {
  border: 2px solid var(--pixel-btn-outline-dark);  /* 最外深线框 */
  box-shadow:
    inset -2px -2px 0 0 rgba(0,0,0,0.4),   /* 右下暗面 */
    inset 2px 2px 0 0 rgba(255,255,255,0.3); /* 左上亮面 */
}
```

**每个状态的 box-shadow 切换逻辑：**

| 状态 | border-color | box-shadow | 背景 |
|------|-------------|------------|------|
| normal | `--pixel-btn-outline-dark` | 左上亮、右下暗 | `--pixel-btn-bg-base` |
| hover | `--pixel-btn-outline-hover`(#fff) | 左上更亮、右下更暗 | `--pixel-btn-bg-hover` |
| active | `--pixel-btn-outline-dark` | **反转：左上暗、右下亮**（模拟按下凹陷） | `--pixel-btn-bg-active` |
| active:hover | `--pixel-btn-outline-hover`(#fff) | 反转 | `--pixel-btn-bg-hover` |
| dark | `--pixel-btn-outline-dark` | 左上亮、右下暗 | `--pixel-btn-bg-dark` |

**还原度评估：>95%** — 3×3 的像素结构本身就是亮/暗/角的组合，`box-shadow` inset 可精确对应每条边。

---

### 2. PixelSwitch — 60×32 像素画 → 伪元素

#### 像素结构分析

```
关闭态：                   开启态：
┌──────────────────────┐   ┌──────────────────────┐
│ ██████████████████░░░│   │ ░░░██████████████████│
│ ██████████████████░░░│   │ ░░░██████████████████│
│ ██████████████████░░░│   │ ░░░██████████████████│
│ ██████████████████░░░│ → │ ░░░██████████████████│
│ ████████████████░◉░░│   │ ░░░◉░████████████████│
│ ██████████████░░░░░░│   │ ░░░░░░████████████████│
└──────────────────────┘   └──────────────────────┘
   █=轨道深色   ░=透明    ◉=滑块按钮
```

- 60×32 总尺寸
- 深色填充区域 = 轨道
- 滑块按钮位置：关闭靠左，开启靠右
- hover 态 = 轨道颜色变亮

#### CSS 模拟

```css
.pixel-switch {
  appearance: none;
  width: 60px;
  height: 32px;
  background: var(--pixel-color-bg-card);    /* 轨道底色 */
  border: 2px solid var(--pixel-color-border);
  cursor: pointer;
  position: relative;
}

/* 滑块按钮 */
.pixel-switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: var(--pixel-brand);
  box-shadow:
    inset -2px -2px 0 0 rgba(0,0,0,0.3),
    inset 2px 2px 0 0 rgba(255,255,255,0.3);
  transition: left 0.2s ease;
}

.pixel-switch:checked::before {
  left: 31px;  /* 60 - 22 - 3 - 4 = 31：滑到最右侧 */
}

.pixel-switch:hover {
  background: var(--pixel-color-bg-input);  /* hover 轨道提亮 */
}

/* new 属性：更现代的尺寸比例 */
.pixel-switch[new=''] {
  width: 48px;
  height: 24px;
}
.pixel-switch[new='']::before {
  width: 16px;
  height: 16px;
}
.pixel-switch[new='']:checked::before {
  left: 25px;
}
```

**还原度评估：>90%** — 伪元素精确控制位置和颜色，但原 PNG 中可能有的噪点/渐变纹理无法 100% 复制。

---

### 3. PixelInput — 16×16 border-image → box-shadow

与 PixelButton 同理，16×16 的 `text-input.png` 也是 border-slice 切片，CSS 方案完全一致：

```css
.pixel-input {
  border: 2px solid var(--pixel-color-border-dark);
  box-shadow:
    inset 1px 1px 0 0 rgba(0,0,0,0.3),    /* 内陷 */
    inset -1px -1px 0 0 rgba(255,255,255,0.1);
}
```

去掉 `border-image: var(--input-border-image)` 和 `outline` 中的精灵引用。

**还原度评估：>95%**

---

### 4. `.pixel-border` 工具类 — 18×18 镂空框 → 分层边框

#### 像素结构分析

`border-image-slice: 8` 将 18×18 分成 3×3 网格，每个切片 6×6：

```
┌──┬────┬──┐
│  │    │  │   上/下边 6×6 = 横向重复亮色像素
├──┼────┼──┤
│  │    │  │   4 角 6×6 = 固定角块
├──┼────┼──┤
│  │    │  │   左右边 6×6 = 纵向重复暗色像素
└──┴────┴──┘
```

原有的镂空效果 = 外深线 + 中间留空 + 内浅线。

#### CSS 模拟

```css
.pixel-border {
  border: 8px solid transparent;                     /* slice=8 的留白 */
  background: var(--pixel-color-bg-card);            /* 内容区背景 */
  box-shadow:
    0 0 0 2px var(--pixel-color-border-dark),        /* 最外深线 */
    inset 0 0 0 2px var(--pixel-color-border);        /* 最内浅线 */
}
```

这样 8px 宽的边框区 = 外深线 2px + 透明留白 4px + 内浅线 2px，等同于两色镂空框。

**还原度评估：>90%**

---

### 5. Classic 按钮纹理 — `bgbtn.jpg` → CSS 棋盘格

`bgbtn.jpg` 是 ≈128×128 的石头/圆石纹理。用 `repeating-linear-gradient` 模拟岩石质感：

```css
--pixel-btn-classic-bg:
  repeating-linear-gradient(
    45deg,
    #888 0px, #888 2px,
    #999 2px, #999 4px
  );
```

棋盘格尺寸 4px，配合 `#999` 底色，模拟像素石头的粗糙感。颜色改用 `--pixel-gray` 系列变量控制。

`about.md` 中引用 `bgbtn.jpg` 的 LinkCard 改用 `--pixel-color-bg-card` 或 `var(--pixel-card-bg)` 替代。

**还原度评估：~80%** — 纹理质感有差异，但颜色由变量控制，换色自动跟随。

---

当前：`border-image: url('/UI/dialog_background_hollow_4.png') 8`

替代方案：`border: 2px solid var(--pixel-color-border)` + 背景色

### 5. `about.md` 中的引用替换

`about.md` 中 `LinkCard` 引用 `bgbtn.jpg` 需同步替换：

```diff
- <LinkCard :link="{ name: 'GitHub', ..., image: '/background/bgbtn.jpg' }" />
+ <LinkCard :link="{ name: 'GitHub', ..., image: '/background/15.jpg' }" />
<!-- 或用纯色/无背景图，去掉 image 属性即可 -->
```

## 组件文件有序排布

当前 `components/` 目录下 16 个文件 + 1 个 `icons/` 文件夹，全部平铺在根目录。按功能归类到子目录：

### 目标结构

```
components/
├── ui/                  # 通用 UI 基础组件
│   ├── PixelButton.vue
│   ├── PixelButton3D.vue
│   ├── PixelButtonClassic.vue
│   ├── PixelInput.vue
│   ├── PixelTextarea.vue
│   ├── PixelSwitch.vue
│   └── PixelDialog.vue
├── layout/              # 布局结构组件
│   ├── NavBar.vue
│   ├── SiteFooter.vue
│   ├── ScrollToTop.vue
│   ├── HomeHero.vue
│   └── HomeIntro.vue
├── content/             # 内容展示组件
│   ├── ArticleView.vue
│   ├── NewsCard.vue
│   ├── LinkCard.vue
│   └── DocsSidebar.vue
└── icons/               # SVG 图标组件（不变）
    ├── BilibiliIcon.vue
    ├── GithubIcon.vue
    └── QQIcon.vue
```

### 影响范围
- `index.ts` — 7 个组件导入路径更新
- `Layout.vue` — 5 个组件导入路径更新
- `SiteFooter.vue` — 3 个图标导入路径更新
- `NewsCard.vue` — `PixelButton` 导入路径更新
- `ScrollToTop.vue` — `PixelButton` 导入路径更新
- `PixelDialog.vue` — `PixelButtonClassic` 导入路径更新
- 可能还有其他跨组件引用

## 执行计划（合并后完整顺序）

| # | 任务 | 涉及文件 | 类型 |
|---|------|---------|------|
| 1 | PixelButton 精灵图 → CSS | `PixelButton.vue` + `vars.css` | 功能修改 |
| 2 | PixelInput 精灵图 → CSS | `PixelInput.vue` + `vars.css` | 功能修改 |
| 3 | `.pixel-border` 精灵图 → CSS | `pixel-border.css` | 功能修改 |
| 4 | PixelSwitch 精灵图 → CSS | `PixelSwitch.vue` | 功能修改 |
| 5 | Classic 按钮纹理 → CSS | `vars.css`（`--pixel-btn-classic-bg`） | 功能修改 |
| 6 | 清理精灵图 | `public/UI/`（12 PNG） + `public/background/bgbtn.jpg` | 文件删除 |
| 7 | `about.md` LinkCard 引用替换 | `about.md` | 移除 bgbtn.jpg 引用，改用纯色或其他配图 |
| 8 | 组件目录重排 | 全部 `.vue` + `index.ts` + `Layout.vue` | 文件移动 + 路径更新 |
| 9 | 构建验证 | — | `npx vitepress build` |
| 10 | 提交 | — | git commit |


## 注意事项

- PixelSwitch 有"新旧"两套设计（`new` 属性），需确保替换后两种模式行为一致
- PixelButton 有 5 个交互态：normal、hover、active、dark、active:hover，每个都要覆盖
- `.pixel-border` 被多处引用（`.pixel-border` 工具类），需检查所有使用点
