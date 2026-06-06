---
layout: page
---

# 自定义

让模板成为你自己的——更改品牌标识、颜色和布局。

## 站点标识

编辑 `.vitepress/config.ts`：

```ts
export default defineConfig({
  title: '我的站点',
  description: '基于 VitePress 的像素风格站点',
  // ...
})
```

## Logo

替换 `public/logo.png` 为你自己的 Logo。Logo 会出现在导航栏和首页 Hero 中。

- **`public/logo.png`** — 主 Logo（192×192 PNG）
- **`public/logo.svg`** — 设计源文件（8×8 viewBox）
- **`public/favicon.ico`** — 浏览器标签页图标

## 导航

在 `config.ts` 中添加、移除或重新排序导航项：

```ts
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '新闻', link: '/news/' },
    { text: '关于', link: '/about' },
    { text: '文档', link: '/docs/' },
  ],
}
```

## 颜色

所有颜色在 `.vitepress/theme/styles/vars.css` 中定义为 CSS 自定义属性。覆盖它们以匹配你的品牌：

| 变量 | 默认值 | 描述 |
|------|--------|------|
| `--pixel-brand` | `#d84b4b` | 品牌主色 |
| `--pixel-brand-light` | `#e48181` | 浅色（悬停态） |
| `--pixel-brand-dark` | `#7e1b1b` | 深色（按下态） |
| `--pixel-gray-light` | `#747271` | 浅灰（边框） |
| `--pixel-gray` | `#3d3938` | 中灰（卡片背景） |
| `--pixel-gray-dark` | `#262524` | 深灰（表面） |
| `--pixel-dark` | `#171615` | 页面背景 |
| `--background-card` | `#313131` | 卡片/面板背景 |

示例 — 切换为蓝色主题：

```css
:root {
  --pixel-brand: #2563eb;
  --pixel-brand-light: #60a5fa;
  --pixel-brand-dark: #1d4ed8;
}
```

## 背景图片

替换 `public/background/` 中的图片：

| 文件 | 使用位置 |
|------|----------|
| `15.jpg` | 首页 / 关于页 |
| `19.jpg` | 首页特色栏目 |
| `28.jpg` | 新闻 / 文档卡片 |
| `44.jpg` | 首页 / 新闻卡片 |
| `bgbtn.png` | Classic 按钮纹理 |

## 页脚

在 `config.ts` 中编辑页脚：

```ts
footer: {
  message: '基于 MIT 许可协议发布。',
  copyright: 'Copyright © 2025 我的站点',
}
```

## 社交链接

添加 GitHub、Twitter、Discord 等：

```ts
socialLinks: [
  { icon: 'github', link: 'https://github.com/你' },
  { icon: 'twitter', link: 'https://twitter.com/你' },
]
```

## 文档管理

添加、修改或删除文档页面，并同步更新侧边栏导航。

### 新建文档页

在 `docs/` 目录下创建 `.md` 文件：

```bash
docs/my-guide.md
```

顶部添加 YAML frontmatter：

```md
---
layout: page
---
```

### 更新侧边栏

文档侧边栏导航硬编码在 `DocsSidebar.vue` 中：

**文件位置：** `.vitepress/theme/components/content/DocsSidebar.vue`

定位到 `nav` 数组，按以下结构编辑：

```ts
const nav = [
  {
    title: '分组名称',
    items: [
      { text: '页面标题', link: '/docs/quick-start' },
      { text: '页面标题', link: '/docs/my-guide' },
    ],
  },
]
```

| 字段 | 描述 |
|------|------|
| `title` | 分组标题（如"入门指南""内容创作"） |
| `items[].text` | 侧边栏显示的文字 |
| `items[].link` | 页面链接，`/docs/文件名` |

### 添加到文档首页

在 `docs/index.md` 中添加对应的 `<LinkCard>`：

```html
<LinkCard :link="{ name: '指南名称', url: '/docs/my-guide', image: '/background/19.jpg', description: '简短描述' }" />
```
