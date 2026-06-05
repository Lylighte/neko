# blog/ → news/ 重命名计划

将 `blog/` 目录及相关引用重命名为 `news/`，对齐"组织门户"定位。

## 改动清单（共 13 项）

| # | 类型 | 文件 | 改动 |
|---|---|---|---|
| 1 | 重命名 | `blog/` → `news/` | 目录重命名（含 3 个 .md） |
| 2 | 重命名 | `docs/blogging.md` → `docs/news.md` | 文件重命名 |
| 3 | 重命名 | `BlogCard.vue` → `NewsCard.vue` | 组件文件重命名 |
| 4 | 编辑 | `.vitepress/config.ts` | Nav: `Blog`→`News`, `/blog/`→`/news/` |
| 5 | 编辑 | `.vitepress/theme/Layout.vue` | `isBlogPost`→`isNewsPost`, 路径判断 |
| 6 | 编辑 | `.vitepress/theme/index.ts` | `BlogCard`→`NewsCard` 导入+注册 |
| 7 | 编辑 | `news/index.md` | 标题+`<BlogCard>`→`<NewsCard>`+链接 |
| 8 | 编辑 | `docs/index.md` | `Blogging Guide`→`News Guide`, 链接 |
| 9 | 编辑 | `docs/news.md` | 全文 `blog`→`news`, `BlogCard`→`NewsCard` |
| 10 | 编辑 | `DocsSidebar.vue` | `Blogging Guide`→`News Guide`, 链接 |
| 11 | 编辑 | `README.md` | 全文 blog→news, BlogCard→NewsCard |
| 12 | 编辑 | `CHANGELOG.md` | 历史引用更新（blog→news） |
| 13 | 编辑 | `dev-notes/session-handoff.md` | `BlogCard`→`NewsCard` |

## 执行顺序（已按审查意见优化）

1. **Git commit** 当前变更（AGENTS.md 约束）
2. **`git mv` 重命名组件** `BlogCard.vue` → `NewsCard.vue`（先组件后目录，避免中间态）
3. **`git mv` 重命名目录** `blog/` → `news/`
4. **`git mv` 重命名文件** `docs/blogging.md` → `docs/news.md`
5. 编辑所有引用文件（#4~#13）
6. **`npx vitepress build`** 验证
7. **`grep -r "blog" . --include="*.ts" --include="*.vue" --include="*.md"`** 全量残留检查

## 执行注意事项

- 所有重命名操作使用 `git mv`，保留 Git 文件历史
- 构建后用 grep 做全量残留检查，确保零遗漏
- CHANGELOG 中标注为 **breaking change**，提醒用户升级时处理重定向

## 不变的部分

- `ArticleView.vue` — 保留原名，它是通用文章包装器，不限于 news
- `Layout.vue` 中的 `articleProps` — 保留原名，语义正确