## Blade

```blade
<x-markas.badge>Draf</x-markas.badge>
<x-markas.badge variant="success">Aktif</x-markas.badge>
<x-markas.badge variant="danger">Gagal</x-markas.badge>
```

## React

```tsx
import { Badge } from "@/components/markas/Badge";

<Badge>Draf</Badge>
<Badge variant="success">Aktif</Badge>
<Badge variant="danger">Gagal</Badge>
```

## Vue

```vue
<script setup lang="ts">
import Badge from "@/components/markas/Badge.vue";
</script>

<template>
  <Badge>Draf</Badge>
  <Badge variant="success">Aktif</Badge>
  <Badge variant="danger">Gagal</Badge>
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

## Catatan

- Teks varian success, warning, dan danger memakai `ink`, warna status dibawa oleh latar, border, dan titik. Warna `success` dan `warning` terang tidak cukup kontras untuk teks kecil.
