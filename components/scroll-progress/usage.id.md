## Blade

```blade
{{-- Progres baca seluruh halaman --}}
<x-markas.scroll-progress />

{{-- Di dalam kontainer bergulir --}}
<div role="region" aria-label="Catatan rilis" tabindex="0" class="relative h-64 overflow-y-auto">
    <x-markas.scroll-progress target="parent" color="success" size="md" />
    ...
</div>
```

## React

```tsx
import { ScrollProgress } from "@/components/markas/ScrollProgress";

<ScrollProgress />

<div role="region" aria-label="Catatan rilis" tabIndex={0} className="relative h-64 overflow-y-auto">
  <ScrollProgress target="parent" color="success" size="md" />
  ...
</div>
```

## Vue

```vue
<template>
  <ScrollProgress />

  <div
    role="region"
    aria-label="Catatan rilis"
    tabindex="0"
    class="relative h-64 overflow-y-auto"
  >
    <ScrollProgress target="parent" color="success" size="md" />
    ...
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ScrollProgress from "$lib/components/markas/ScrollProgress.svelte";
</script>

<ScrollProgress />

<div
  role="region"
  aria-label="Release notes"
  tabindex="0"
  class="relative h-64 overflow-y-auto"
>
  <ScrollProgress target="parent" color="success" size="md" />
  ...
</div>
```

## Astro

```astro
---
import ScrollProgress from "@/components/markas/ScrollProgress.astro";
---

<ScrollProgress />

<div
  role="region"
  aria-label="Release notes"
  tabindex="0"
  class="relative h-64 overflow-y-auto"
>
  <ScrollProgress target="parent" color="success" size="md" />
  ...
</div>
```

## Angular

```ts
import { Component } from "@angular/core";
import { ScrollProgress } from "./markas/scroll-progress.component";

@Component({
  selector: "app-release-notes",
  imports: [ScrollProgress],
  template: `
    <div
      role="region"
      aria-label="Release notes"
      tabindex="0"
      class="relative h-64 overflow-y-auto"
    >
      <div
        markas-scroll-progress
        target="parent"
        color="success"
        size="md"
      ></div>
      ...
    </div>
  `,
})
export class ReleaseNotes {}
```

## Catatan

- `target="page"` menempel di atas jendela. `target="parent"` sticky di dalam induknya dan harus menjadi anak pertama.
- Pembaruan digabung dengan `requestAnimationFrame` dan hanya berjalan saat menggulir. Versi Blade butuh Alpine.js.
- Bar bersifat dekoratif (`aria-hidden`). Buat kontainer bergulir bisa difokus dan punya nama agar pengguna keyboard bisa menggulirnya.
