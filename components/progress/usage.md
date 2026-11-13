## Blade

```blade
<x-markas.progress label="Uploading file" :value="60" />
<x-markas.progress label="Storage used" :value="3" :max="4" />
<x-markas.progress label="Preparing report" />
```

## React

```tsx
import { Progress } from "@/components/markas/Progress";

<Progress label="Uploading file" value={60} />
<Progress label="Storage used" value={3} max={4} />
<Progress label="Preparing report" />
```

## Vue

```vue
<script setup lang="ts">
import Progress from "@/components/markas/Progress.vue";
</script>

<template>
  <Progress label="Uploading file" :value="60" />
  <Progress label="Storage used" :value="3" :max="4" />
  <Progress label="Preparing report" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Progress from "$lib/components/markas/Progress.svelte";
</script>

<Progress label="Uploading file" value={60} />
<Progress aria-label="Preparing export" />
```

## Astro

```astro
---
import Progress from "@/components/markas/Progress.astro";
---

<Progress label="Uploading file" value={60} />
<Progress aria-label="Preparing export" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { Progress } from "./markas/progress.component";

@Component({
  selector: "app-upload",
  imports: [Progress],
  template: `
    <markas-progress label="Uploading file" [value]="60" />
    <markas-progress aria-label="Preparing export" />
  `,
})
export class Upload {}
```

## Notes

- Without `value`, the progress is indeterminate and pulses. The animation stops under `prefers-reduced-motion`.
- Without `label`, set `aria-label` so the progress has a name.
- The percentage is rounded and clamped between 0 and 100.
