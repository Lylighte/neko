# Phase 10.1 — 遗漏硬编码颜色清理

> 日期: 2026-06-05
> 状态: 已审查，待执行
> 前置: Phase 10 Design Tokens 已完成

## 扫描结果

Phase 10 完成后，全量扫描 `.vitepress/theme/` 发现 **6 类遗漏**，涉及 10 个文件、~38 处硬编码颜色值。

---

## 审查意见落实

以下根据审查意见做出的关键决策：

### 1. `--pixel-dialog-overlay` → 复用语义令牌
❌ **不新建**组件令牌。PixelDialog 的 `rgba(0,0,0,0.5)` 直接使用已有的 Layer 2 语义令牌 `var(--pixel-color-bg-overlay)`（值完全相同）。所有遮罩层统一控制。

### 2. `--pixel-nav-item-hover` → 重命名
✅ 改为 `--pixel-nav-item-text-hover`，明确修改的是文字色而非背景色。

### 3. `#fff` 类纯白文本 → 保留组件令牌
`--pixel-color-text` = `rgba(255,255,255,0.8)`（80% 不透明白），与纯白 `#fff` 语义不同。Hero 标题、LinkCard 标题、NavBar hover 等场景需要纯白冲击力，保留独立组件令牌。

### 4. `--pixel-footer-border: #909399` → 保留
`--pixel-color-border` = `#3d3938`（深灰），与 `#909399`（灰蓝）视觉差异显著，保留独立令牌。

### 5. 补充遗漏：PixelButton hover 态
初版计划遗漏了 `:hover` 和 `:active:hover` 中的 `color: #fff` 和 `outline: 2px solid #fff`（共 4 处），已补全。

---

## 执行计划

### 1. vars.css — 补全缺失 Token（~22 个，精简后）

**PixelButton:**
- `--pixel-btn-bg-base: #c6c6c6`
- `--pixel-btn-bg-dark: #303030`
- `--pixel-btn-bg-active: #8b8b8b`
- `--pixel-btn-outline-dark: #333`
- `--pixel-btn-outline-hover: #fff`
- `--pixel-btn-text-hover: #fff`

**PixelButton3D:**
- `--pixel-btn-3d-bg: #313233`
- `--pixel-btn-3d-border: rgba(0, 0, 0, 0.4)`
- `--pixel-btn-3d-hover-overlay: #ffffff08`
- `--pixel-btn-3d-shadow-top: rgb(104, 104, 104)`
- `--pixel-btn-3d-highlight: rgba(178, 178, 178, 0.5)`
- `--pixel-btn-3d-shadow-bottom: rgba(153, 153, 153, 0.5)`

**PixelButtonClassic:**
- `--pixel-btn-classic-active-bg: rgba(100, 100, 255, 0.45)`
- `--pixel-btn-classic-active-text: #ffffa0`
- `--pixel-btn-classic-active-shadow: 2px 2px #202013cc`
- `--pixel-btn-classic-text: #ddd`
- `--pixel-btn-classic-shadow: 2px 2px #000a`
- `--pixel-btn-classic-inset-dark: #0004`
- `--pixel-btn-classic-inset-dark-strong: #0006`
- `--pixel-btn-classic-inset-light: #fff5`
- `--pixel-btn-classic-inset-light-strong: #fff7`

**PixelInput 禁用态:**
- `--pixel-input-disabled-text: #aaa`
- `--pixel-input-disabled-bg: #424242`

**HomeHero:**
- `--pixel-hero-gradient: linear-gradient(135deg, #2a641c 0%, #171615 50%, #3c8527 100%)`
- `--pixel-hero-title-color: #fff`

**LinkCard:**
- `--pixel-linkcard-overlay-bg: rgba(0, 0, 0, 0.7)`
- `--pixel-linkcard-title-color: #fff`

**ArticleView:**
- `--pixel-article-category-bg: rgba(0, 0, 0, 0.6)`

**NavBar:**
- `--pixel-nav-item-text-hover: #fff`

**DocsSidebar:**
- `--pixel-sidebar-hover-bg: rgba(255, 255, 255, 0.05)`

**SiteFooter:**
- `--pixel-footer-border: #909399`
- `--pixel-footer-copyright: rgb(128, 128, 128)`
- `--pixel-footer-declaration: #666`

> ⚠️ PixelDialog 不新增令牌，直接复用 `var(--pixel-color-bg-overlay)`

### 2. PixelButton.vue (9 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 43 | `#c6c6c6` | `var(--pixel-btn-bg-base)` |
| 49 | `#fff` | `var(--pixel-btn-text-hover)` |
| 50 | `#333` | `var(--pixel-btn-outline-dark)` |
| 51 | `#303030` | `var(--pixel-btn-bg-dark)` |
| 56 | `#fff` | `var(--pixel-btn-text-hover)` |
| 57 | `#fff` | `var(--pixel-btn-outline-hover)` |
| 63 | `#8b8b8b` | `var(--pixel-btn-bg-active)` |
| 68 | `#fff` | `var(--pixel-btn-text-hover)` |
| 69 | `#fff` | `var(--pixel-btn-outline-hover)` |

### 3. PixelButton3D.vue (6 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 43 | `#313233` | `var(--pixel-btn-3d-bg)` |
| 44 | `rgba(0,0,0,0.4)` | `var(--pixel-btn-3d-border)` |
| 49 | `#ffffff08` | `var(--pixel-btn-3d-hover-overlay)` |
| 58/72 | `rgba(178,178,178,0.5)` | `var(--pixel-btn-3d-highlight)` |
| 59/73 | `rgba(153,153,153,0.5)` | `var(--pixel-btn-3d-shadow-bottom)` |
| 71 | `rgb(104,104,104)` | `var(--pixel-btn-3d-shadow-top)` |

### 4. PixelButtonClassic.vue (9 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 45/54 | `rgba(100,100,255,0.45)` | `var(--pixel-btn-classic-active-bg)` |
| 46/55 | `2px 2px #202013cc` | `var(--pixel-btn-classic-active-shadow)` |
| 47/56 | `#ffffa0` | `var(--pixel-btn-classic-active-text)` |
| 49 | `#0004` | `var(--pixel-btn-classic-inset-dark)` |
| 50 | `#fff5` | `var(--pixel-btn-classic-inset-light)` |
| 61 | `#0004` | `var(--pixel-btn-classic-inset-dark)` |
| 62 | `#fff5` | `var(--pixel-btn-classic-inset-light)` |
| 75 | `#ddd` | `var(--pixel-btn-classic-text)` |
| 76 | `2px 2px #000a` | `var(--pixel-btn-classic-shadow)` |
| 78 | `#0006` | `var(--pixel-btn-classic-inset-dark-strong)` |
| 79 | `#fff7` | `var(--pixel-btn-classic-inset-light-strong)` |

### 5. PixelInput.vue (2 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 21 | `#aaa` | `var(--pixel-input-disabled-text)` |
| 22 | `#424242` | `var(--pixel-input-disabled-bg)` |

### 6. HomeHero.vue (2 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 24 | `linear-gradient(135deg, #2a641c 0%, #171615 50%, #3c8527 100%)` | `var(--pixel-hero-gradient)` |
| 95 | `#fff` | `var(--pixel-hero-title-color)` |

### 7. LinkCard.vue (3 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 57 | `rgba(0,0,0,0.7)` | `var(--pixel-linkcard-overlay-bg)` |
| 65 | `#fff` | `var(--pixel-linkcard-title-color)` |
| 70 | `rgba(255,255,255,0.7)` | `var(--pixel-color-text-muted)` |

### 8. ArticleView.vue (1 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 78 | `rgba(0,0,0,0.6)` | `var(--pixel-article-category-bg)` |

### 9. NavBar.vue (1 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 130 | `#fff` | `var(--pixel-nav-item-text-hover)` |

### 10. DocsSidebar.vue (1 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 71 | `rgba(255,255,255,0.05)` | `var(--pixel-sidebar-hover-bg)` |

### 11. SiteFooter.vue (3 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 56 | `#909399` | `var(--pixel-footer-border)` |
| 75 | `rgb(128,128,128)` | `var(--pixel-footer-copyright)` |
| 80 | `#666` | `var(--pixel-footer-declaration)` |

### 12. PixelDialog.vue (1 处)

| 行 | 原值 | 替换为 |
|---|---|---|
| 101 | `rgba(0,0,0,0.5)` | `var(--pixel-color-bg-overlay)` |

## 排除项

- **图标文件** (BilibiliIcon, GithubIcon, QQIcon): 品牌色属于品牌标识，不 Token 化
- **vars.css**: Token 定义文件本身，硬编码值在此是合法的
- **动画 CSS**: 仅涉及 `opacity`，无颜色硬编码

## 执行顺序

1. **令牌映射确认** — 对照上方审查决策，确认无重复/冗余
2. **vars.css** — 补全 ~22 个新 Token
3. **PixelButton 系列** — PixelButton + PixelButton3D + PixelButtonClassic
4. **PixelInput** — 禁用态
5. **HomeHero + LinkCard + ArticleView**
6. **NavBar + DocsSidebar + SiteFooter + PixelDialog**
7. **`npx vitepress build`** — 构建验证
8. **视觉回归抽查** — 浏览器打开首页（Hero + 按钮）、文档页（侧边栏 + 页脚）、博客页（文章卡片），对比颜色一致性