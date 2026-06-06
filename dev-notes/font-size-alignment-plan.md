# 字号对齐计划

## 问题

三种像素字体的 **unitsPerEm** 不同，无法用单一网格完美对齐：

| 字体 | 用途 | unitsPerEm | 整数倍 ppem |
|------|------|:----------:|:-----------:|
| Ark Pixel | 标题 | 1200 | 8, 10, **12**, 15, **16**, 20, **24**, 25, 30, 40 |
| Monocraft | 代码 | 1080 | 8, 9, 10, **12**, 15, 18, **20**, **24**, 27, 30 |
| Unifont | 正文 | 64 | 8, **16**, **32** |

### 关键纠正

- **Monocraft（1080）不是 16px 字体**。16px 下 1080÷16=67.5（非整数），反而是 12px(90✅)、15px(72✅)、18px(60✅)、20px(54✅)、24px(45✅) 为整数倍
- **Ark Pixel（1200）36px 不完美**。1200÷36=33.33（非整数），之前建议的 36px 实际不对
- **三者无共同整数倍 ppem**，需分用途取舍

### 三者对齐对照

| ppem | Ark (1200) | Mono (1080) | Unifont (64) |
|:----:|:----------:|:-----------:|:------------:|
| 12px | 100 ✅ | 90 ✅ | 5.33 ❌ |
| 15px | 80 ✅ | 72 ✅ | 4.27 ❌ |
| **16px** | 75 ⚡ | 67.5 ❌ | **4 ✅** |
| 18px | 66.67 ❌ | 60 ✅ | 3.56 ❌ |
| **20px** | 60 ✅ | 54 ✅ | 3.2 ❌ |
| **24px** | 50 ✅ | 45 ✅ | 2.67 ❌ |
| 30px | 40 ✅ | 36 ✅ | 2.13 ❌ |
| 32px | 37.5 ❌ | 33.75 ❌ | 2 ✅ |

## 方案 A：分用途对齐（推荐）

按用途各自取舍，16px 作为正文代码基础，标题用 20px/24px。

| 用途 | 当前 | → 调整 | 对齐分析 |
|------|------|--------|----------|
| 正文 `body` | 16px | **16px**（不变） | Unifont✅ Ark✅ Mono❌但误差肉眼不易感知 |
| 代码 `code` | 继承 body | **16px**（不变） | 同上；亦可用 **15px**（Mono✅ Ark✅ Uni❌）|
| 小 `--pixel-font-size-s` | 14px (0.875rem) | **12px** | Ark✅ Mono✅ |
| 中 `--pixel-font-size-m` | 16px (1rem) | **16px**（不变） | 与 body 对齐 |
| 大 `--pixel-font-size-l` | 24px (1.5rem) | **24px**（不变） | Ark✅ Mono✅ |
| 超大 `--pixel-font-size-xl` | 32px (2rem) | **20px** 或 **24px** | 32px 三方都不完美 → 20px 对齐 Ark+Mono |
| `h1` | 继承 body | **24px** | Ark✅ Mono✅ |
| `h2` | 继承 body | **20px** | Ark✅ Mono✅ |
| `h3`+ | 继承 body | **16px** | 与 body 一致 |

**影响范围：**
- `vars.css`：`--pixel-font-size-s` 14px→12px，`--pixel-font-size-xl` 32px→20px（待定）
- 增加 `h1`、`h2` 显式字号
- 各组件硬编码 `font-size` 按需对齐

## 方案 B：代码走 15px 独立路线

代码块和正文分离，代码用 15px（Monocraft 完美对齐），正文保持 16px。

| 用途 | 字号 | 对齐 |
|------|:----:|:----:|
| 正文 `body` | 16px | Uni✅ Ark✅ |
| 代码 `code`/`pre` | **15px** | Mono✅ Ark✅ |
| 小字 `-s` | 12px | Ark✅ Mono✅ |
| 标题 `-l` / `h1` | **24px** | Ark✅ Mono✅ |
| 中标题 `h2` | **20px** | Ark✅ Mono✅ |
| 超大 `-xl` | 保留 32px 或 → **24px** | — |

**缺点：** 代码 15px 与正文 16px 会产生视觉大小不一致，不协调。

## 方案 C：保持现状，仅修正偏差大的

只修复 `font-size-s` (14px→12px)，其他保持不动。

---

## 实施步骤

### Step 1: `vars.css` 调整
- `--pixel-font-size-s`: 14px → 12px
- `--pixel-font-size-xl`: 保留 32px（装饰性尺寸，不保证像素对齐）
- 增加 `h1`–`h6` 字号声明：
  - `h1`: 24px（`--pixel-font-size-l`）
  - `h2`: 20px
  - `h3`+: 16px（继承 body）

### Step 2: 12px 字体栈锁定
- `--pixel-font-size-s` 的 12px 场景下 Unifont 不清晰
- 需确保小字元素显式使用 `--pixel-font-heading` 或 `--pixel-font-code`

### Step 3: 组件硬编码字号扫描
- 所有 `.vue` 中硬编码 `font-size` 合并到变量或对齐整数网格

### Step 4: 构建验证
- `npx vitepress build` 通过
- 内联 `<code>` 在 16px 正文中的 Monocraft 渲染视觉效果确认

---

## 审查结论（2026-06-06）

**批准方案 A**，三个核心取舍：

1. **正文 16px**：Unifont 绝对清晰，Monocraft 67.5 偏离整数 0.5 单位，16px 下肉眼不易感知
2. **标题 24px / 20px**：Ark Pixel + Monocraft 完美对齐，Unifont 仅作兜底缺字
3. **12px 锁定字体**：小字场景必须避免降级到 Unifont

### 最终字号层级

```
12px → 标注/小字（Ark Pixel 优先，禁止 Unifont）
16px → 正文 + 代码（Unifont 正文，Monocraft 可接受轻微模糊）
20px → h2 次标题（Ark Pixel，Monocraft 可用）
24px → h1 / 大号（Ark Pixel，Monocraft 可用）
32px → 装饰性大字，不保证像素对齐
```
