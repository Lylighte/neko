---
layout: page
---

# News Guide

Write and publish news posts with rich formatting and metadata.

## Creating a Post

Create a new `.md` file in the `news/` directory:

```
news/my-first-post.md
```

## Frontmatter

Every news post needs YAML frontmatter at the top:

```yaml
---
title: My First Post
date: 2025-06-05
author:
  name: Your Name
  avatar: /background/bgbtn.jpg
  tags:
    - text: Announcement
      color: '#fff'
      bg: '#3c8527'
cover: /background/44.jpg
category: General
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `author.name` | No | Author display name |
| `author.avatar` | No | Author avatar image path |
| `author.tags` | No | Badge tags (text, color, bg) |
| `cover` | No | Hero cover image path |
| `category` | No | Post category label |

## Adding to the News Listing

After creating a post, add a `<NewsCard>` to `news/index.md`:

```html
<NewsCard
  title="My First Post"
  brief="A short description that appears in the card preview."
  image="/background/44.jpg"
  link="/news/my-first-post"
/>
```

| Prop | Description |
|------|-------------|
| `title` | Card title |
| `brief` | Short description text |
| `image` | Card background image |
| `link` | URL to the news post |

## Markdown Features

VitePress supports full Markdown with extensions:

### Code Blocks

```ts
const greeting = 'Hello, world!'
console.log(greeting)
```

### Alerts

::: tip
This is a helpful tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

### Images

```md
![Alt text](/path/to/image.png)
```

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |