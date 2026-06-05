---
layout: page
---

<script setup>
import { ref } from 'vue'

const switchOn = ref(false)
const dialogOpen = ref(false)
const inputText = ref('')
const textareaText = ref('')
</script>

# Component Showcase

This page demonstrates all built-in UI components. Use it as a reference when building your own pages.

---

## Button

Three button variants with click sound and hover/press states.

### Default

<PixelButton>Default Button</PixelButton>

```html
<PixelButton>Default Button</PixelButton>
```

### Dark

<PixelButton dark>Dark Button</PixelButton>

```html
<PixelButton dark>Dark Button</PixelButton>
```

### Mute (no click sound)

<PixelButton sound-url="">Mute Button</PixelButton>

```html
<PixelButton sound-url="">Mute Button</PixelButton>
```

---

## Button Classic

Full-width textured button with hover highlight.

<PixelButtonClassic>Classic Button</PixelButtonClassic>

```html
<PixelButtonClassic>Classic Button</PixelButtonClassic>
```

---

## Button 3D

Pressable 3D button with depth effect.

<PixelButton3D>3D Button</PixelButton3D>

<PixelButton3D height="6rem">Tall 3D Button</PixelButton3D>

```html
<PixelButton3D>3D Button</PixelButton3D>
<PixelButton3D height="6rem">Tall 3D Button</PixelButton3D>
```

---

## Input

Text input with pixel-art border.

<PixelInput v-model="inputText" />

<p v-if="inputText">You typed: <strong>{{ inputText }}</strong></p>

```html
<PixelInput v-model="inputText" />
```

---

## Textarea

Multi-line input with auto-resize.

<PixelTextarea v-model="textareaText" style="width:100%;min-height:6rem" />

```html
<PixelTextarea v-model="textareaText" />
```

---

## Switch

Toggle switch with on/off sprites.

<div style="display:flex;align-items:center;gap:1rem;margin:1rem 0">
  <PixelSwitch v-model="switchOn" />
  <span>{{ switchOn ? 'ON' : 'OFF' }}</span>
</div>

```html
<PixelSwitch v-model="switchOn" />
```

---

## Dialog

Modal dialog with title, content slot, and footer buttons.

<PixelButton @click="dialogOpen = true">Open Dialog</PixelButton>

<PixelDialog v-model="dialogOpen" title="Confirm Action" @confirm="dialogOpen = false">
  <p>Are you sure you want to proceed?</p>
  <p style="color:#aaa;font-size:0.9rem">This action cannot be undone.</p>
</PixelDialog>

```html
<PixelButton @click="dialogOpen = true">Open Dialog</PixelButton>

<PixelDialog
  v-model="dialogOpen"
  title="Confirm Action"
  cancel-text="Cancel"
  confirm-text="Confirm"
  @confirm="dialogOpen = false"
>
  <p>Are you sure you want to proceed?</p>
</PixelDialog>
```

---

## Border Utility

Apply `.pixel-border` class for the pixel-art border frame.

<div class="pixel-border" style="padding:2rem;text-align:center;max-width:400px;margin:1rem auto">
  <p>Content inside <code>.pixel-border</code></p>
</div>

```html
<div class="pixel-border">
  <p>Content inside .pixel-border</p>
</div>
```

---

## Props Reference

### PixelButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark` | `boolean` | `false` | Dark color scheme |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL (empty to mute) |

### PixelButtonClassic

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### PixelButton3D

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string` | `'6rem'` | Button height (CSS value) |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### PixelInput / PixelTextarea

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `string` | `''` | v-model binding |

### PixelSwitch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `boolean` | `false` | v-model binding |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### PixelDialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `boolean` | `false` | v-model for visibility |
| `title` | `string` | `''` | Dialog title |
| `cancel-text` | `string` | `'Cancel'` | Cancel button text |
| `confirm-text` | `string` | `'Confirm'` | Confirm button text |