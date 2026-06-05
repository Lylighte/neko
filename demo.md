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

<MinecraftButton>Default Button</MinecraftButton>

```html
<MinecraftButton>Default Button</MinecraftButton>
```

### Dark

<MinecraftButton dark>Dark Button</MinecraftButton>

```html
<MinecraftButton dark>Dark Button</MinecraftButton>
```

### Mute (no click sound)

<MinecraftButton sound-url="">Mute Button</MinecraftButton>

```html
<MinecraftButton sound-url="">Mute Button</MinecraftButton>
```

---

## Button Classic

Full-width textured button with hover highlight.

<MinecraftButtonClassic>Classic Button</MinecraftButtonClassic>

```html
<MinecraftButtonClassic>Classic Button</MinecraftButtonClassic>
```

---

## Button 3D

Pressable 3D button with depth effect.

<MinecraftButton3D>3D Button</MinecraftButton3D>

<MinecraftButton3D height="10rem">Tall 3D Button</MinecraftButton3D>

```html
<MinecraftButton3D>3D Button</MinecraftButton3D>
<MinecraftButton3D height="10rem">Tall 3D Button</MinecraftButton3D>
```

---

## Input

Text input with pixel-art border.

<MinecraftInput v-model="inputText" />

<p v-if="inputText">You typed: <strong>{{ inputText }}</strong></p>

```html
<MinecraftInput v-model="inputText" />
```

---

## Textarea

Multi-line input with auto-resize.

<MinecraftTextarea v-model="textareaText" style="width:100%;min-height:6rem" />

```html
<MinecraftTextarea v-model="textareaText" />
```

---

## Switch

Toggle switch with on/off sprites.

<div style="display:flex;align-items:center;gap:1rem;margin:1rem 0">
  <MinecraftSwitch v-model="switchOn" />
  <span>{{ switchOn ? 'ON' : 'OFF' }}</span>
</div>

```html
<MinecraftSwitch v-model="switchOn" />
```

---

## Dialog

Modal dialog with title, content slot, and footer buttons.

<MinecraftButton @click="dialogOpen = true">Open Dialog</MinecraftButton>

<MinecraftDialog v-model="dialogOpen" title="Confirm Action" @confirm="dialogOpen = false">
  <p>Are you sure you want to proceed?</p>
  <p style="color:#aaa;font-size:0.9rem">This action cannot be undone.</p>
</MinecraftDialog>

```html
<MinecraftButton @click="dialogOpen = true">Open Dialog</MinecraftButton>

<MinecraftDialog
  v-model="dialogOpen"
  title="Confirm Action"
  cancel-text="Cancel"
  confirm-text="Confirm"
  @confirm="dialogOpen = false"
>
  <p>Are you sure you want to proceed?</p>
</MinecraftDialog>
```

---

## Border Utility

Apply `.mc-border` class for the pixel-art border frame.

<div class="mc-border" style="padding:2rem;text-align:center;max-width:400px;margin:1rem auto">
  <p>Content inside <code>.mc-border</code></p>
</div>

```html
<div class="mc-border">
  <p>Content inside .mc-border</p>
</div>
```

---

## Props Reference

### MinecraftButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark` | `boolean` | `false` | Dark color scheme |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL (empty to mute) |

### MinecraftButtonClassic

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### MinecraftButton3D

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string` | `'12rem'` | Button height (CSS value) |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### MinecraftInput / MinecraftTextarea

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `string` | `''` | v-model binding |

### MinecraftSwitch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `boolean` | `false` | v-model binding |
| `sound-url` | `string` | `'/button.click.ogg'` | Click sound URL |

### MinecraftDialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model-value` | `boolean` | `false` | v-model for visibility |
| `title` | `string` | `''` | Dialog title |
| `cancel-text` | `string` | `'Cancel'` | Cancel button text |
| `confirm-text` | `string` | `'Confirm'` | Confirm button text |