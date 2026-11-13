## Blade

```blade
<x-markas.copy-button text="pnpm dlx markasui add button" variant="ghost" size="sm" copy-label="Copy command" />
<x-markas.copy-button text="sk_live_51Hx9aT2" variant="secondary">Copy key</x-markas.copy-button>
```

## React

```tsx
import { CopyButton } from "@/components/markas/CopyButton";

<CopyButton text="pnpm dlx markasui add button" variant="ghost" size="sm" copyLabel="Copy command" />
<CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
```

## Vue

```vue
<script setup lang="ts">
import CopyButton from "@/components/markas/CopyButton.vue";
</script>

<template>
  <CopyButton
    text="pnpm dlx markasui add button"
    variant="ghost"
    size="sm"
    copy-label="Copy command"
  />
  <CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import CopyButton from "$lib/components/markas/CopyButton.svelte";
</script>

<CopyButton
  text="pnpm dlx markasui add button"
  variant="ghost"
  size="sm"
  copyLabel="Copy command"
/>
<CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
```

## Astro

```astro
---
import CopyButton from "@/components/markas/CopyButton.astro";
---

<CopyButton text="pnpm dlx markasui add button" variant="ghost" size="sm" copyLabel="Copy command" />
<CopyButton text="sk_live_51Hx9aT2" variant="secondary">Copy key</CopyButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { CopyButton } from "./markas/copy-button.component";

@Component({
  selector: "app-install",
  imports: [CopyButton],
  template: `
    <markas-copy-button
      text="pnpm dlx markasui add button"
      variant="ghost"
      size="sm"
      copyLabel="Copy command"
    />
    <markas-copy-button text="sk_live_51Hx9aT2" variant="secondary">
      Copy key
    </markas-copy-button>
  `,
})
export class Install {}
```

Angular moves `id`, `aria-label`, `title`, and `class` from `markas-copy-button` to the inner button.

## Notes

- Uses `navigator.clipboard.writeText`, which needs a secure context (https or localhost). If the browser blocks the clipboard, the button stays idle.
- The check mark shows for 2 seconds, then the button returns to idle.
- Without a label the button is square and named by `copyLabel`. Blade needs Alpine.js.
