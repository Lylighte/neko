# 全站动效增强计划

## 现状分析

### 运行正常的动效
| 组件 | 效果 | 位置 |
|------|------|------|
| PixelButton3D | 按下沉降 `0.1s ease-in-out` | `PixelButton3D.vue:49` |
| NewsCard hover | 微放大 `scale(1.05)` + `0.3s ease` | `NewsCard.vue:71` |
| PixelDialog | 开/关过渡 `0.3s ease-in-out` | `PixelDialog.vue:80` |

### 有 Bug 的组件

#### NavBar (严重)
- **`@click.prevent` 阻止了 `<a>` 的默认导航行为**，点击导航项不会跳转页面
- 滑块样式虽然正确计算，但由于路由不跳转，用户看不到"切换页面时滑块滑动"的效果
- hover 颜色过渡本身正常，但因路由跳转失效，用户感知不到

#### ScrollToTop (严重)
- 模板上传入 `type="show"/"hide"`，但 `PixelButton` **没有 `type` prop**（只接受 `dark` Boolean 和 `soundUrl` String）
- CSS 选择器 `.scroll-to-top[type='hide']` 永远不会匹配，按钮始终可见
- `transform` 和 `opacity` 过渡因此从不触发

### 已有的 keyframes（`animations.css`，零引用）
- `fade-in` — 纯渐显
- `fade-in-right` — 从右 2rem 移入渐显
- `fade-in-left` — 从左 2rem 移入渐显
- `fade-in-down` — 从上 1rem 移入渐显

（注意：实际文件没有 `fade-in-down`，只有前三者）

### 缺失项（用户反馈）
1. **页面切换无过渡** — `Layout.vue` 未用 `<Transition>` 包裹 `<Content />`
2. **进入/刷新页面无渐入** — HomeHero、HomeIntro 等顶级组件未引用 `animations.css`
3. **无平滑滚动** — 未设置 `scroll-behavior: smooth`，无 JS 滚动方案

### 全局 transition 变量
- `--pixel-transition-fast: 0.1s ease-in-out`
- `--pixel-transition: 0.3s ease`
- `--pixel-transition-slow: 0.3s ease-in-out`

## 计划

| # | 改动 | 文件 | 详情 |
|---|------|------|------|
| 1 | **NavBar 导航修复** | `NavBar.vue` | `@click.prevent` → `@click` + 播声音，恢复 SPA 路由跳转 |
| 2 | **ScrollToTop 修复** | `ScrollToTop.vue` | 用 `v-show` + `.visible` class 控制 `opacity`+`pointer-events` 替换无效 `type` prop |
| 3 | 页面切换过渡 | `Layout.vue` | 用 `<Transition name="page">` 包裹 `<Content />` |
| 4 | 页面过渡 CSS | `vars.css` / `animations.css` | 定义 `.page-enter-active` / `.page-leave-active`，持续 ≤0.2s 保持轻快 |
| 5 | **补充 `fade-in-down`** | `animations.css` | 新增 `fade-in-down` keyframe（从上方 1rem 滑入渐显）供 HomeHero 使用 |
| 6 | HomeHero 入场动画 | `HomeHero.vue` | 挂载时应用 `fade-in-down`（有上方滑入感） |
| 6 | HomeIntro 入场动画 | `HomeIntro.vue` | 挂载时应用 `fade-in` |
| 7 | 通用平滑滚动 | `vars.css` | `html { scroll-behavior: smooth }` |
| 8 | **`prefers-reduced-motion`** | `vars.css` | 增加媒体查询，尊重用户减少动效偏好 |
| 9 | LinkCard hover 过渡 | `LinkCard.vue` | 补齐 `transition: transform 0.3s ease` |
| 10 | 验证 + 提交 | — | `npx vitepress build`，git commit |
