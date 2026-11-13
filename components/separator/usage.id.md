## Blade

```blade
<x-markas.separator />

<div class="flex h-5 items-center gap-3">
    <span>Dokumentasi</span>
    <x-markas.separator orientation="vertical" />
    <span>Blog</span>
</div>

<x-markas.separator label="atau" />
<x-markas.separator :decorative="false" />
```

## React

```tsx
import { Separator } from "@/components/markas/Separator";

<Separator />
<div className="flex h-5 items-center gap-3">
  <span>Dokumentasi</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
</div>
<Separator label="atau" />
<Separator decorative={false} />
```

## Vue

```vue
<template>
  <Separator />
  <div class="flex h-5 items-center gap-3">
    <span>Dokumentasi</span>
    <Separator orientation="vertical" />
    <span>Blog</span>
  </div>
  <Separator label="atau" />
  <Separator :decorative="false" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Separator from "$lib/components/markas/Separator.svelte";
</script>

<Separator class="my-4" />
<Separator orientation="vertical" />
<Separator decorative={false} label="Danger zone" />
```

## Astro

```astro
---
import Separator from "@/components/markas/Separator.astro";
---

<Separator class="my-4" />
<Separator orientation="vertical" />
<Separator decorative={false} label="Danger zone" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { Separator } from "./markas/separator.component";

@Component({
  selector: "app-example",
  imports: [Separator],
  template: `
    <div markas-separator class="my-4"></div>
    <div markas-separator orientation="vertical"></div>
    <div markas-separator [decorative]="false" label="Danger zone"></div>
  `,
})
export class Example {}
```

Angular memakai attribute selector pada `div` native.

## Catatan

- Tanpa JavaScript. Versi Blade tidak butuh Alpine.js.
- Separator vertikal memakai `self-stretch`, jadi letakkan di dalam baris flex yang punya tinggi.
- Atur jarak lewat class, misalnya `class="my-4"`.
- Komponen tidak punya teks bawaan. Isi `label` dalam Bahasa Indonesia, misalnya "atau".
