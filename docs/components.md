---
layout: page
---

<script setup>
import { ref } from 'vue'

const dialogOpen = ref(false)
const inputText = ref('')
const textareaText = ref('')
</script>

# 组件参考

所有内置 Pixel UI 组件均可直接在 Markdown 页面中使用。

## 按钮

三种按钮变体，支持点击音效和悬停/按下状态。

### 普通

<PixelButton>普通按钮</PixelButton>

```html
<PixelButton>普通按钮</PixelButton>
```

### 深色

<PixelButton dark>深色按钮</PixelButton>

```html
<PixelButton dark>深色按钮</PixelButton>
```

### 静音（无点击音效）

<PixelButton sound-url="">静音按钮</PixelButton>

```html
<PixelButton sound-url="">静音按钮</PixelButton>
```

## Classic 按钮

全宽纹理按钮，带悬停高亮效果。

<PixelButtonClassic>Classic 按钮</PixelButtonClassic>

```html
<PixelButtonClassic>Classic 按钮</PixelButtonClassic>
```

---

## 3D 按钮

带深度效果的可按压 3D 按钮。

<div class="demo-3d-row">
  <PixelButton3D>3D 按钮</PixelButton3D>
  <PixelButton3D height="9rem">高 3D 按钮</PixelButton3D>
</div>

```html
<PixelButton3D>3D 按钮</PixelButton3D>
<PixelButton3D height="9rem">高 3D 按钮</PixelButton3D>
```

<style>
.demo-3d-row {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  min-height: 10rem;
}
</style>

---

## 输入框

带像素边框的文本输入框。

<PixelInput v-model="inputText" />

<p v-if="inputText">你输入了：<strong>{{ inputText }}</strong></p>

```html
<PixelInput v-model="inputText" />
```

## 多行文本框

带自动调整大小的多行文本输入。

<PixelTextarea v-model="textareaText" style="width:100%;min-height:6rem" />

```html
<PixelTextarea v-model="textareaText" />
```

## 对话框

带标题、内容插槽和底部按钮的模态对话框。

<PixelButton @click="dialogOpen = true">打开对话框</PixelButton>

<PixelDialog v-model="dialogOpen" title="确认操作" @confirm="dialogOpen = false">
  <p>你确定要继续吗？</p>
  <p style="color:#aaa;font-size:0.9rem">此操作无法撤销。</p>
</PixelDialog>

```html
<PixelButton @click="dialogOpen = true">打开对话框</PixelButton>

<PixelDialog
  v-model="dialogOpen"
  title="确认操作"
  cancel-text="取消"
  confirm-text="确认"
  @confirm="dialogOpen = false"
>
  <p>你确定要继续吗？</p>
</PixelDialog>
```

## 边框工具类

使用 `.pixel-border` 类为元素添加像素风格边框。

<div class="pixel-border" style="padding:2rem;text-align:center;max-width:400px;margin:1rem auto">
  <p><code>.pixel-border</code> 内部的内容</p>
</div>

```html
<div class="pixel-border">
  <p>内容放在 .pixel-border 内部</p>
</div>
```

## Props 参考

### PixelButton

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `dark` | `boolean` | `false` | 深色主题 |
| `sound-url` | `string` | `'/button.click.ogg'` | 点击音效 URL（设为空则静音） |

### PixelButtonClassic

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `sound-url` | `string` | `'/button.click.ogg'` | 点击音效 URL |

### PixelButton3D

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `height` | `string` | `'6rem'` | 按钮高度（CSS 值） |
| `sound-url` | `string` | `'/button.click.ogg'` | 点击音效 URL |

### PixelInput / PixelTextarea

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `model-value` | `string` | `''` | v-model 绑定值 |

### PixelDialog

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `model-value` | `boolean` | `false` | v-model 控制显示/隐藏 |
| `title` | `string` | `''` | 对话框标题 |
| `cancel-text` | `string` | `'Cancel'` | 取消按钮文字 |
| `confirm-text` | `string` | `'Confirm'` | 确认按钮文字 |