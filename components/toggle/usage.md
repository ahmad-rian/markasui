## Blade

```blade
<x-markas.toggle aria-label="Bold" pressed>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg>
</x-markas.toggle>
<x-markas.toggle variant="outline">Bookmark</x-markas.toggle>
```

Needs Alpine.js.

### Livewire

```blade
<x-markas.toggle wire:model.live="bold" aria-label="Bold">B</x-markas.toggle>
```

`wire:model` binds the pressed state as a boolean.

## React

```tsx
import { Toggle } from "@/components/markas/Toggle";

<Toggle aria-label="Bold" defaultPressed onPressedChange={setBold}>
  <BoldIcon aria-hidden="true" />
</Toggle>;
<Toggle variant="outline">Bookmark</Toggle>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Toggle from "@/components/markas/Toggle.vue";

const bold = ref(true);
</script>

<template>
  <Toggle v-model="bold" aria-label="Bold">
    <BoldIcon aria-hidden="true" />
  </Toggle>
  <Toggle variant="outline">Bookmark</Toggle>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Toggle from "$lib/components/markas/Toggle.svelte";

  let bold = $state(true);
</script>

<Toggle bind:pressed={bold} aria-label="Bold">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"
    ><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg
  >
</Toggle>
<Toggle variant="outline">Bookmark</Toggle>
```

## Astro

```astro
---
import Toggle from "@/components/markas/Toggle.astro";
---

<Toggle variant="outline" pressed>Bookmark</Toggle>
```

A small page script flips `aria-pressed` and `data-state` on click.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Toggle } from "./markas/toggle.component";

@Component({
  selector: "app-editor",
  imports: [Toggle],
  template: `
    <button markas-toggle [(pressed)]="bold" aria-label="Bold">B</button>
    <button markas-toggle variant="outline">Bookmark</button>
  `,
})
export class Editor {
  readonly bold = signal(true);
}
```

## Notes

- Toggle is a `<button aria-pressed>`. The look follows `data-state="on"` or `"off"`.
- Icons inside get `size-4` automatically. An icon-only toggle must have `aria-label`.
- The component has no built-in text. Translate the content and `aria-label` directly.
