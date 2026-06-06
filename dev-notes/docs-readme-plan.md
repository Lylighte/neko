# Docs 内容完善 & README 更新计划

**日期**: 2026-06-06
**关联**: Phase 22

---

## 调研发现

### 系统记忆过时
`/memories/repo/neko.md` 多处过时：
- "UI sprite → CSS replacement planned (Phase 15)" — 已完成
- "public/UI/ (12 PNG → CSS replacement planned)" — 已删除
- "docs/index.md (DocsBrowser)" — 已改为 LinkCard 网格
- "15 completed phases" — 实际已 21 个 Phase

### 内容问题清单

| 文件 | 问题 |
|------|------|
| `index.md` | "Minecraft Community"、副标题含 Minecraft |
| `about.md` | "Minecraft"、"redstone"、"griefing" 等游戏术语 |
| `news/welcome.md` | "Minecraft journey"、"redstone engineer"、"griefing" |
| `news/community-update.md` | "Redstone Workshop"、"PvP"、"Nether" 等 |
| `package.json` | name 仍为 `minecraft-community-template` |
| `docs/quick-start.md` | 项目结构含 `public/UI/`（已删除） |
| `docs/customization.md` | Logo 节说 SVG 为主（实际 PNG 为主） |
| `docs/news.md` | 内容截断（Tables 节不完整） |
| `docs/index.md` | components 链接被注释掉 |
| `README.md` | 整体可用但需微调 |

---

## 执行计划

### Step 1: 更新系统记忆
- 重写 `/memories/repo/neko.md`，反映 Phase 21 完成后的真实状态

### Step 2: 去游戏化 — 页面内容
- `index.md`: 替换 Minecraft 引用为通用社区描述
- `about.md`: 替换游戏术语为通用社区语言
- `news/welcome.md`: 替换为通用社区欢迎帖
- `news/community-update.md`: 替换为通用社区更新帖
- `package.json`: name → `pixel-eco-template`

### Step 3: 修复 docs 内容
- `docs/quick-start.md`: 移除 `public/UI/`，更新项目结构
- `docs/customization.md`: Logo 节修正（PNG 为主），背景图表格更新
- `docs/news.md`: 补全截断内容
- `docs/index.md`: 取消 components 链接注释

### Step 4: 更新 README
- 微调描述，确保与当前状态一致

### Step 5: 构建验证
- `npx vitepress build`

---

## 写作原则
- 所有新写/改写内容使用**中文**
- 面向通用社区/组织门户定位
- 不出现 Minecraft、redstone、griefing、PvP、Nether 等游戏特有术语
- 保留 Pixel UI / 像素风格的技术描述