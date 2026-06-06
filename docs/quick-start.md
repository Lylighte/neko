---
layout: page
---

# 快速开始

几分钟内启动你的像素风格站点。

## 环境要求

- **Node.js** 18 或更高版本
- 代码编辑器（推荐 VS Code）

## 搭建步骤

```bash
# 克隆模板
# 将 <仓库地址> 替换为你的远程仓库 URL
git clone -b template/vitepress <仓库地址> my-site
cd my-site

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173`，即可看到像素主题的首页。

## 项目结构

```
my-site/
├── .vitepress/
│   ├── config.ts              # 站点配置（标题、导航等）
│   └── theme/
│       ├── index.ts           # 主题入口（注册组件）
│       ├── Layout.vue         # 自定义页面布局
│       ├── components/        # Pixel UI 组件
│       │   ├── ui/            # 按钮、输入框、对话框
│       │   ├── layout/        # Hero、页脚、返回顶部
│       │   └── content/       # 卡片、侧边栏
│       ├── styles/            # CSS 变量、字体、动画
│       └── data/              # 静态数据
├── index.md                   # 首页
├── about.md                   # 关于页面
├── news/                      # 新闻文章
├── docs/                      # 文档页面
└── public/                    # 静态资源
    ├── logo.png               # 站点 Logo（主）
    ├── logo.svg               # 站点 Logo（设计源文件）
    ├── favicon.ico            # 浏览器标签页图标
    ├── background/            # 背景图片
    └── fonts/                 # 像素字体（Ark Pixel、Monocraft、Unifont）
```

## 关键文件

| 文件 | 用途 |
|------|------|
| `.vitepress/config.ts` | 站点标题、导航链接、社交链接 |
| `.vitepress/theme/styles/vars.css` | 调色板和 CSS 变量 |
| `index.md` | 首页内容 |
| `public/logo.png` | 站点 Logo |

## 下一步

- **[自定义](/docs/customization)** — 修改颜色、Logo 和背景
- **[新闻指南](/docs/news)** — 撰写第一篇新闻文章
- **[组件参考](/docs/components)** — 探索可用 UI 组件
- **[部署](/docs/deployment)** — 构建并发布你的站点