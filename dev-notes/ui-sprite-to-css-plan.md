# UI 精灵图 → CSS 实现替换计划

## 现状

`public/UI/` 中有 **6 张 PNG 精灵图**（原 12 张，PixelSwitch 的 6 张 toggle 已移除），来自原 Neco 项目的 Minecraft 风格纹理。

### 引用分布

| 精灵图 | 数量 | 引用位置 | 用途 |
|--------|------|---------|------|
| `button_normal.png` | 1 | `vars.css` → `--btn-border-image` | PixelButton 默认边框 |
| `button_hover.png` | 1 | `vars.css` → `--btn-border-image-hover` | PixelButton hover 边框 |
| `button_pressed_hover.png` | 1 | `vars.css` → `--btn-border-image-active` | PixelButton active 边框 |
| `button_pressed.png` | 1 | `PixelButton.vue:68`（硬编码） | PixelButton active:hover 边框 |
| `text-input.png` | 1 | `vars.css` → `--input-border-image` | PixelInput 边框 |
| `dialog_background_hollow_4.png` | 1 | `pixel-border.css` | `.pixel-border` 工具类 / PixelDialog 边框 |

> **已移除**：`toggle_off.png`, `toggle_off_hover.png`, `toggle_on.png`, `toggle_on_hover.png`, `toggle_off_new.png`, `toggle_on_new.png` — PixelSwitch 组件整体移除，不再需要 CSS 模拟。

#### 背景纹理 — 1 张
- `bgbtn.jpg`（0.6KB，实际尺寸 196×15 超扁长条，`center/cover` 拉伸）— Classic 按钮的背景底纹。在 `vars.css` 中作为 `--pixel-btn-classic-bg` 的被覆盖色（`#999 url('/background/bgbtn.jpg') center/cover`），也在 `about.md` 等文件中作为 LinkCard/avatar 纹理占位。替换为 16×16 噪声图 `bgbtn.png`，改 `cover` 为 `repeat`。

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

#### 输入框 — 1 张，16×16 像素
`text-input.png` — 16×16 的 border-slice 切片，与按钮组类似，CSS 可模拟。

#### 对话框边框 — 1 张，18×18 像素
`dialog_background_hollow_4.png` — 18×18 的 `border-image` 切片（`border-image-slice: 8`），有镂空效果。CSS 纯色边框+背景即可替代。

## 目标

用纯 CSS 替代所有精灵图引用，使外观完全由 CSS 变量控制，换色只需改 `vars.css`。

## 像素特征分析与 CSS 模拟方案

### 1. PixelButton — 3×3 border-image → box-shadow

#### 实测色值（屏幕取色，中心已确认透明）

**button_normal.png** — 灰度中性色，3D 凸起斜面：
```
fefefe  f7f7f7  c0bfc0
f7f7f7  透明    656465
c0bfc0  656465  595759
```

**button_hover.png** — 绿色品牌色（Minecraft 原版 `#37d61e` 系），同结构：
```
37d61e  37d61e  43a01c
37d61e  透明    037300
43a01c  037300  037300
```

**button_pressed.png** — normal 旋转 180° + 整体略暗（凹陷效果）：
```
4a484a  555355  b0afb0
555355  透明    e7e6e7
b0afb0  e7e6e7  eeedee
```

**button_pressed_hover.png** — hover 旋转 180°，亮度不变：
```
037300  037300  43a01c
037300  透明    37d61e
43a01c  37d61e  37d61e
```

#### 生成规律

> **pressed = 对应非 pressed 图旋转 180°**（亮暗面互换，模拟凹陷）
> pressed 额外整体暗一小级（~10-15%），pressed_hover 亮度不变。

| 图 | 来源 | 亮度变化 |
|----|------|---------|
| normal | 原始 | — |
| hover | 原始（品牌色） | — |
| pressed | normal 旋转 180° | 暗 ~10-15% |
| pressed_hover | hover 旋转 180° | 不变 |

#### 设计规律

| 位置 | normal | hover | pressed | pressed_hover |
|------|--------|-------|---------|---------------|
| 亮面 (左上) | `#fefefe` 近白 | `#37d61e` 亮绿 | `#4a484a` 深灰 | `#037300` 深绿 |
| 暗面 (右下) | `#595759` 深灰 | `#037300` 深绿 | `#eeedee` 近白 | `#37d61e` 亮绿 |
| 过渡角 | `#c0bfc0` 中灰 | `#43a01c` 中绿 | `#b0afb0` 中灰 | `#43a01c` 中绿 |

- **normal / dark 用固定灰度**，不随主题色变化
- **hover / active:hover 用品牌色**，映射到 `--pixel-brand*` 变量族
- **pressed = 亮暗面反转**（box-shadow 方向互换），模拟凹陷
- 中心透明，底层 `background-color` 透出

#### border-image 切片映射

`border-image: url(...) 1` 将 3×3 的 9 个像素分配如下（`border-width: 2px` 时每像素拉伸到 2px）：

```
源图 3×3              渲染到元素边框
┌───┬───┬───┐         ┌────┬──────────┬────┐
│0,0│0,1│0,2│         │0,0 │  0,1 拉伸 │0,2 │  ← 上边
├───┼───┼───┤         │    │           │    │
│1,0│ 透 │1,2│    →    │1,0 │  透明丢弃  │1,2 │  ← 中间
├───┼───┼───┤         │拉伸│           │拉伸│
│2,0│2,1│2,2│         │    │           │    │
└───┴───┴───┘         │2,0 │  2,1 拉伸 │2,2 │  ← 下边
                       └────┴──────────┴────┘
                         左边              右边
```

- **4 角** → 直接放在 4 角，不拉伸
- **4 边中点** → 沿各自边拉伸填满
- **中心** → 丢弃，露出 `background-color`

#### CSS 模拟策略

用 `box-shadow` 多层叠加模拟 8 个边框像素的 3D 斜面。关键：**normal 态用固定灰度，hover/active 态用品牌色变量**。

```css
.pixel-button {
  /* 最外深线框（对应 outline） */
  border: 2px solid var(--pixel-btn-outline-dark);
  /* 左上亮面 + 右下暗面 = 3D 凸起 */
  box-shadow:
    inset 2px 2px 0 0 var(--pixel-btn-shadow-light),   /* 左上亮 */
    inset -2px -2px 0 0 var(--pixel-btn-shadow-dark);   /* 右下暗 */
}
```

**新增 CSS 变量（vars.css Layer 3）：**

```css
/* PixelButton — 3D 斜面阴影色 */
--pixel-btn-shadow-light: rgba(255, 255, 255, 0.4);   /* normal: 灰度亮面 */
--pixel-btn-shadow-dark: rgba(0, 0, 0, 0.4);          /* normal: 灰度暗面 */
--pixel-btn-shadow-light-hover: var(--pixel-brand-light);  /* hover: 品牌亮色 */
--pixel-btn-shadow-dark-hover: var(--pixel-brand-dark);    /* hover: 品牌暗色 */
```

**各状态切换逻辑：**

| 状态 | border-color | box-shadow 亮/暗 | background-color |
|------|-------------|-------------------|------------------|
| normal | `--pixel-btn-outline-dark` (#333) | 灰度亮 + 灰度暗 | `--pixel-btn-bg-base` |
| hover | `--pixel-btn-outline-hover` (#fff) | **品牌亮 + 品牌暗** | `--pixel-btn-bg-hover` |
| active | `--pixel-btn-outline-dark` (#333) | **反转：灰度暗 + 灰度亮** | `--pixel-btn-bg-active` |
| active:hover | `--pixel-btn-outline-hover` (#fff) | **反转：品牌暗 + 品牌亮** | `--pixel-btn-bg-hover` |
| dark | `--pixel-btn-outline-dark` (#333) | 灰度亮 + 灰度暗 | `--pixel-btn-bg-dark` |

> **可配置性**：换色只需改 `--pixel-brand*` 变量，hover/active:hover 的斜面自动跟随。normal/dark 保持灰度中性，不受主题色影响。

**还原度评估：>95%** — 8 个边框像素的亮/暗关系用 `box-shadow` 精确复现，中心透明由 `background-color` 自然透出。

---

### 2. PixelInput — 16×16 border-image → border

#### 使用位置

| 文件 | 引用方式 |
|------|---------|
| `vars.css` | `--input-border-image: url('/UI/text-input.png') 1` |
| `PixelInput.vue` | `border-image: var(--input-border-image)` |

#### 实测色值

```
Row 1:  全部 #545454
Row 2-15: 全部透明
Row 16: 全部 #c6c6c6
```

#### 结构分析

16×16 的 `border-image` 切片（`slice: 1`），仅上下边有颜色，左右边和中心全透明：

- **上边** = `#545454`（深色，内凹顶部阴影）
- **下边** = `#c6c6c6`（浅色，内凹底部高光）
- **左右边 + 中心** = 全透明

与按钮的 3D 凸起相反——输入框是**内凹效果**（上暗下亮）。

#### CSS 替换

```css
.pixel-input {
  border-top: 2px solid var(--pixel-input-shadow-dark);    /* #545454 */
  border-bottom: 2px solid var(--pixel-input-shadow-light); /* #c6c6c6 */
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
}
```

**新增 CSS 变量：**

```css
--pixel-input-shadow-dark: #545454;
--pixel-input-shadow-light: #c6c6c6;
```

**还原度评估：100%** — 仅 2 条纯色边，无拉伸无纹理，CSS `border` 完全等价。

---

### 3. .pixel-border / PixelDialog — 18×18 border-image → box-shadow

#### 使用位置

| 文件 | 引用方式 |
|------|---------|
| `pixel-border.css` | `border-image: url('/UI/dialog_background_hollow_4.png') 8` |
| `PixelDialog.vue` | `class="dialog pixel-border"` |
| `HomeIntro.vue` | `class="pixel-border"`（介绍图片外框） |
| `docs/components.md` | 文档示例中作为工具类展示 |

#### 实测色值（18×18 矩阵）

```
最外圈: #000000 (1px 黑描边)
内上/左: #ffffff (2px 白高光)
内下/右: #555555 (2px 暗阴影)
填充: #c6c6c6 (主体灰)
点缀: #393939 (左内侧暗), #6b6b6b (右过渡)
中心 2×2: 透明
```

#### 9-slice 切片映射（slice=8, border-width=8px）

```
┌──────────┬────┬──────────┐
│  8×8 角  │ 上 │  8×8 角  │  上边: 1黑→2白→5灰
│  (不拉伸) │ 边 │  (不拉伸) │
├──────────┼────┼──────────┤
│   左边   │ 透 │   右边   │  左右边: 1黑→2白→4灰→1暗
│  (拉伸)  │ 明 │  (拉伸)  │
├──────────┼────┼──────────┤
│  8×8 角  │ 下 │  8×8 角  │  下边: 5灰→2暗→1黑
│  (不拉伸) │ 边 │  (不拉伸) │
└──────────┴────┴──────────┘
```

本质是 **8px 3D 内凹斜面边框**（左上亮、右下暗）。

#### CSS 替换

```css
.pixel-border {
  border: 1px solid #000;                    /* 最外黑线 */
  box-shadow:
    inset 0 2px 0 0 #fff,                    /* 上边白高光 */
    inset 2px 0 0 0 #fff,                    /* 左边白高光 */
    inset 0 -2px 0 0 #555,                   /* 下边暗阴影 */
    inset -2px 0 0 0 #555,                   /* 右边暗阴影 */
    inset 0 0 0 7px #c6c6c6;                 /* 灰色填充 */
}
```

> 8px 总边框 = 1px `border` + 7px `box-shadow` 填充。白/暗各 2px 覆盖在灰色填充之上，形成左上亮、右下暗的 3D 斜面。

**新增 CSS 变量：**

```css
--pixel-border-outer: #000;
--pixel-border-highlight: #fff;
--pixel-border-shadow: #555;
--pixel-border-fill: #c6c6c6;
```

**还原度评估：>95%** — 4 角 8×8 的细微纹理（`#393939`/`#6b6b6b` 点缀）在视觉上可忽略，主体 3D 斜面完全复现。

---

### 4. PixelSwitch — 已移除 ❌

#### 决策

PixelSwitch 使用 6 张 60×32 复杂像素画（轨道+滑块+新旧两套设计），CSS 模拟成本高、还原度有限。**直接移除组件**，消除 6 个精灵图依赖。

#### 影响范围

| 操作 | 文件 |
|------|------|
| 删除组件 | `.vitepress/theme/components/PixelSwitch.vue` |
| 取消注册 | `.vitepress/theme/index.ts`（删除 import + `app.component`） |
| 删除文档 | `docs/components.md`（PixelSwitch 段落） |
| 删除精灵图 | `public/UI/toggle_off.png`, `toggle_off_hover.png`, `toggle_on.png`, `toggle_on_hover.png`, `toggle_off_new.png`, `toggle_on_new.png` |

---

### 5. Classic 按钮纹理 — `bgbtn.jpg` → 替换 + `repeat`

**原图**：`bgbtn.jpg`（196×15 超扁长条，`center/cover` 拉伸）
**替换**：`perlin-16x16.png`（16×16 噪声图，风格一致）→ 重命名为 `bgbtn.png`

#### 策略

将 `perlin-16x16.png` 更名为 `bgbtn.png`，覆盖原路径语义。CSS 从 `center/cover` 改为 `repeat`：

```diff
- --pixel-btn-classic-bg: #999 url('/background/bgbtn.jpg') center/cover;
+ --pixel-btn-classic-bg: #999 url('/background/bgbtn.png') repeat;
```

16×16 的小纹理用 `repeat` 自然拼接，效果优于拉伸。

#### 影响范围

| 操作 | 文件 |
|------|------|
| 重命名 | `perlin-16x16.png` → `bgbtn.png`（保持 `public/background/`） |
| 修改 CSS | `vars.css` line 103：`url` 路径 + `repeat` |
| 删除原件 | `bgbtn.jpg` |
| 更新引用 `.jpg` → `.png` | `about.md`、`docs/index.md`、`docs/news.md`、`docs/customization.md`、`news/*.md`、`README.md` |

> 所有原有 `.md` 文件中的引用路径从 `bgbtn.jpg` 改为 `bgbtn.png`，视觉上 16×16 噪声与 196×15 拉伸效果相似，均为纹理占位。

**还原度评估：>90%** — 保留实际纹理图（非 CSS 模拟），仅改 repeat 方式，视觉效果更自然。

---

### 6. 全站 `bgbtn.jpg` 引用路径更新

`bgbtn.jpg` 更名为 `bgbtn.png`，所有 `.md` 文件中的引用路径需同步更新：

| 文件 | 类型 |
|------|------|
| `about.md` | LinkCard image 属性 |
| `docs/index.md` | LinkCard image 属性 |
| `docs/news.md` | 新闻条目 avatar 头像 |
| `news/community-update.md` | 父页 avatar |
| `news/welcome.md` | 父页 avatar |
| `docs/customization.md` | 纹理说明文档文字 |
| `README.md` | 文件清单说明 |

替换规则：`/background/bgbtn.jpg` → `/background/bgbtn.png`

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
| 4 | 移除 PixelSwitch | `PixelSwitch.vue` + `index.ts` + `docs/components.md` | 文件删除 |
| 5 | Classic 按钮纹理替换 + repeat | `vars.css` + `perlin-16x16.png` 重命名 | 功能修改+重命名 |
| 6 | 全站 `bgbtn.jpg` → `bgbtn.png` 路径更新 | 全部 `.md` 文件 | 查找替换 |
| 7 | 删除原精灵图 | `public/UI/`（6 PNG） + `public/background/bgbtn.jpg` | 文件删除 |
| 8 | 组件目录重排 | 全部 `.vue` + `index.ts` + `Layout.vue` | 文件移动 + 路径更新 |
| 9 | 构建验证 | — | `npx vitepress build` |
| 10 | 提交 | — | git commit |


## 注意事项

- PixelButton 有 5 个交互态：normal、hover、active、dark、active:hover，每个都要覆盖
- `.pixel-border` 被多处引用（`PixelDialog.vue`、`HomeIntro.vue`、文档示例），需检查所有使用点
- PixelSwitch 已移除，不再需要 CSS 模拟
