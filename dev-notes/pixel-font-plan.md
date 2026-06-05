# 像素字体方案

## 字体栈

| 层级 | 字体 | 用途 | 格式 | 许可证 |
|------|------|------|------|--------|
| 标题 | Ark Pixel 12px (比例模式, zh_cn) | h1-h6 标题 | woff2 | OFL-1.1 |
| 代码 | Monocraft | 代码块 / `<code>` | woff2 | OFL-1.1 |
| 正文 | 系统字体栈 | body 默认正文 | — | — |
| 装饰 | Unifont | 可选 `.pixel-text` 类 | woff2 分片 | OFL-1.1 |

## 设计决策：正文可读性优先

### 为什么正文不用像素字体

Unifont 是全 Unicode 位图字体，设计目标是字符覆盖率而非阅读舒适度。段落文本中使用像素字体会导致：

- 长文阅读疲劳，笔画粘连、字形僵硬
- 模板定位为"社区门户 + 博客"，博客正文是大段文字
- 模板应"开箱可用"，不应让用户第一眼就产生"难读"的负面印象

### 正文策略

- **默认**：系统字体栈 `-apple-system, 'Segoe UI', Roboto, sans-serif`，16px，`line-height: 1.7`
- **像素主题由标题 + 代码块 + UI 组件承载**，正文保持高可读性
- **可选 `.pixel-text`**：供深度像素爱好者使用，建议搭配 18px+ 字号和 1.8 行高

```css
/* 正文 — 高可读性系统字体 */
body {
  font-family: -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.7;
}

/* 可选像素正文 — 需显式使用 */
.pixel-text {
  font-family: 'Unifont', monospace;
  font-size: 18px;
  line-height: 1.8;
}
```

## 具体 font-family 栈

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Ark Pixel', 'Unifont', sans-serif;
}

code, pre, kbd, samp {
  font-family: 'Monocraft', 'Unifont', monospace;
}

body {
  font-family: -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}
```

## 加载策略

### Ark Pixel 12px

- 来源：https://github.com/TakWolf/ark-pixel-font/releases
- 选 12px 比例模式、zh_cn 语言版本
- 单文件 woff2，`font-display: swap`
- 用于 `h1-h6` 标题

### Monocraft

- 来源：https://github.com/IdreesInc/Monocraft/releases
- 单文件 woff2，`font-display: swap`
- 用于 `code`、`pre`、`kbd`、`samp`

### Unifont

- 来源：https://unifoundry.com/unifont/index.html
- **woff2 + unicode-range 分片**，浏览器按需加载
- `font-display: swap`
- 仅用于标题 fallback、代码 fallback 和可选 `.pixel-text` 类
- ⚠️ 需确认分片来源：是否有现成分片文件，还是需用 `pyftsubset` 自行切割

分片计划：

| 分片 | unicode-range | 预估 woff2 |
|------|---------------|------------|
| 拉丁基础 | U+0000-024F | ~30KB |
| CJK 统一汉字 | U+4E00-9FFF | ~3-4MB |
| 其他补充 | 剩余 | ~1MB |

## 实施步骤

### Step 1 — 下载字体文件

1. 从 Ark Pixel Font Releases 下载 12px 比例模式 woff2
2. 从 Monocraft Releases 下载 woff2
3. 确认 Unifont woff2 分片来源并下载
4. 放入 `public/fonts/` 目录
5. 将各字体 OFL 许可证文件一并放入 `public/fonts/`

### Step 2 — 编写 @font-face

新建 `fonts.css`，声明所有 `@font-face`，含 unicode-range 分片。

### Step 3 — 应用字体

- `body` → 系统字体栈（高可读性）
- `h1-h6` → `'Ark Pixel', 'Unifont', sans-serif`
- `code, pre, kbd, samp` → `'Monocraft', 'Unifont', monospace`
- 提供 `.pixel-text` 工具类供可选使用

### Step 4 — 构建验证

```bash
npx vitepress build
```

### Step 5 — README 字体切换指南

在 README 中说明如何替换或移除像素字体，让非像素爱好者也能轻松定制。

## 模板体积

| 字体 | 预估大小 |
|------|----------|
| Ark Pixel 12px | ~1-2MB |
| Monocraft | ~100KB |
| Unifont 分片合计 | ~5MB |
| **总计** | **~6-7MB** |

- 对 Git 仓库偏大但可接受
- 添加 `.gitattributes` 避免二进制文件频繁 diff
- 在 README 中声明字体许可

## 注意事项

- Ark Pixel 仍缺少部分生僻汉字，标题中遇到会 fallback 到 Unifont
- Unifont 分片后首屏仅加载拉丁分片（~30KB），CJK 分片按需加载
- 所有字体使用 `font-display: swap` 避免 FOIT
- 正文默认使用系统字体，像素正文需显式添加 `.pixel-text` 类