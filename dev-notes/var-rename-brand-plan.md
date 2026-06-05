# `--pixel-green*` → `--pixel-brand*` 重命名计划

## 目标

将 Layer 1 基色变量从中立命名 `--pixel-brand*`，消除 `green` 与红色值之间的矛盾，未来换色无需再改名。

## 新旧对照

| 旧名 | 新名 | 当前值 |
|------|------|--------|
| `--pixel-green` | `--pixel-brand` | `#d84b4b` |
| `--pixel-green-light` | `--pixel-brand-light` | `#e48181` |
| `--pixel-green-dark` | `--pixel-brand-dark` | `#7e1b1b` |

## 语义层引用（`vars.css` Layer 2）

| 旧引用 | 新引用 |
|--------|--------|
| `--pixel-color-accent: var(--pixel-green)` | `var(--pixel-brand)` |
| `--pixel-color-accent-light: var(--pixel-green-light)` | `var(--pixel-brand-light)` |
| `--pixel-color-accent-dark: var(--pixel-green-dark)` | `var(--pixel-brand-dark)` |

## 组件文件引用（`*.vue`）

| 文件 | 匹配模式 | 替换数 |
|------|---------|--------|
| `ArticleView.vue` | `var(--pixel-green` | 4 |
| `DocsSidebar.vue` | `var(--pixel-green` | 3 |
| `LinkCard.vue` | `var(--pixel-green` | 4 |
| `NewsCard.vue` | `var(--pixel-green` | 1 |
| `HomeHero.vue` | `var(--pixel-green` | 1 |
| `SiteFooter.vue` | `var(--pixel-green` | 3 |

## 执行步骤

1. 编辑 `vars.css` Layer 1：改名 + 更新语义层引用
2. 编辑 6 个 `.vue` 文件：`var(--pixel-green` → `var(--pixel-brand`（全局替换即可）
3. `npx vitepress build` 验证
4. `git commit`
