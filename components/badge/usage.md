## Blade

```blade
<x-markas.badge>Draft</x-markas.badge>
<x-markas.badge variant="success">Active</x-markas.badge>
<x-markas.badge variant="danger">Failed</x-markas.badge>
```

## React

```tsx
import { Badge } from "@/components/markas/Badge";

<Badge>Draft</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Failed</Badge>
```

## Vue

```vue
<script setup lang="ts">
import Badge from "@/components/markas/Badge.vue";
</script>

<template>
  <Badge>Draft</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="danger">Failed</Badge>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Badge from "$lib/components/markas/Badge.svelte";
</script>

<Badge variant="success">Active</Badge>
<Badge variant="primary" dot={false}>12</Badge>
```

## Astro

```astro
---
import Badge from "@/components/markas/Badge.astro";
---

<Badge variant="success">Active</Badge>
<Badge variant="primary" dot={false}>12</Badge>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Badge } from "./markas/badge.component";

@Component({
  selector: "app-invoice-status",
  imports: [Badge],
  template: `
    <span markas-badge variant="success">Active</span>
    <span markas-badge variant="primary" [dot]="false">12</span>
  `,
})
export class InvoiceStatus {}
```

## Notes

- Success, warning, and danger text uses `ink`. The status color comes from the background, border, and dot, because light `success` and `warning` lack enough contrast for small text.
