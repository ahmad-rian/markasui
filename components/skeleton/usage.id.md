## Blade

```blade
<div class="flex items-center gap-4" role="status">
    <span class="sr-only">Memuat profil</span>
    <x-markas.skeleton shape="circle" class="size-12 shrink-0" />
    <div class="grid flex-1 gap-2">
        <x-markas.skeleton class="h-4 w-2/3" />
        <x-markas.skeleton class="h-4 w-1/2" />
    </div>
</div>
```

## React

```tsx
import { Skeleton } from "@/components/markas/Skeleton";

<div className="flex items-center gap-4" role="status">
  <span className="sr-only">Memuat profil</span>
  <Skeleton shape="circle" className="size-12 shrink-0" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
</div>;
```

## Vue

```vue
<script setup lang="ts">
import Skeleton from "@/components/markas/Skeleton.vue";
</script>

<template>
  <div class="flex items-center gap-4" role="status">
    <span class="sr-only">Memuat profil</span>
    <Skeleton shape="circle" class="size-12 shrink-0" />
    <div class="grid flex-1 gap-2">
      <Skeleton class="h-4 w-2/3" />
      <Skeleton class="h-4 w-1/2" />
    </div>
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Skeleton from "$lib/components/markas/Skeleton.svelte";
</script>

<div class="flex items-center gap-4" role="status">
  <span class="sr-only">Loading profile</span>
  <Skeleton shape="circle" class="size-12" />
  <Skeleton class="h-4 w-1/2" />
</div>
```

## Astro

```astro
---
import Skeleton from "@/components/markas/Skeleton.astro";
---

<div class="flex items-center gap-4" role="status">
  <span class="sr-only">Loading profile</span>
  <Skeleton shape="circle" class="size-12" />
  <Skeleton class="h-4 w-1/2" />
</div>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Skeleton } from "./markas/skeleton.component";

@Component({
  selector: "app-profile-loading",
  imports: [Skeleton],
  template: `
    <div class="flex items-center gap-4" role="status">
      <span class="sr-only">Loading profile</span>
      <div markas-skeleton shape="circle" class="size-12"></div>
      <div markas-skeleton class="h-4 w-1/2"></div>
    </div>
  `,
})
export class ProfileLoading {}
```

## Catatan

- Atur ukuran lewat class (`h-4 w-1/2`, `size-12`). Untuk lingkaran pakai `shape="circle"`, bukan class `rounded-full`, karena tanpa `tailwind-merge` class radius yang bentrok bergantung pada urutan CSS.
