## Blade

```blade
<x-markas.button>Save</x-markas.button>
<x-markas.button variant="secondary" size="sm">Cancel</x-markas.button>
<x-markas.button variant="danger" type="submit">Delete account</x-markas.button>
```

## React

```tsx
import { Button } from "@/components/markas/Button";

<Button>Save</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="danger" type="submit">Delete account</Button>
```

## Vue

```vue
<script setup lang="ts">
import Button from "@/components/markas/Button.vue";
</script>

<template>
  <Button>Save</Button>
  <Button variant="secondary" size="sm">Cancel</Button>
  <Button variant="danger" type="submit">Delete account</Button>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
</script>

<Button>Save</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="danger" type="submit">Delete account</Button>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
---

<Button>Save</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="danger" type="submit">Delete account</Button>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";

@Component({
  selector: "app-actions",
  imports: [Button],
  template: `
    <button markas-button>Save</button>
    <button markas-button variant="secondary" size="sm">Cancel</button>
    <button markas-button variant="danger" type="submit">Delete account</button>
  `,
})
export class Actions {}
```

Angular uses an attribute selector on the native button, so `disabled`, `aria-*`, and `class` stay on the button.

## Notes

- `type` defaults to `button`. Set `type="submit"` for a form submit button.
- Extra classes are appended last. There is no `tailwind-merge`, so conflicting classes (two background colors, for example) depend on Tailwind's CSS order. Prefer the `variant` and `size` props.
