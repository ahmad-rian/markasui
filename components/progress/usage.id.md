## Blade

```blade
<x-markas.progress label="Mengunggah berkas" :value="60" />
<x-markas.progress label="Penyimpanan terpakai" :value="3" :max="4" />
<x-markas.progress label="Menyiapkan laporan" />
```

## React

```tsx
import { Progress } from "@/components/markas/Progress";

<Progress label="Mengunggah berkas" value={60} />
<Progress label="Penyimpanan terpakai" value={3} max={4} />
<Progress label="Menyiapkan laporan" />
```

## Vue

```vue
<script setup lang="ts">
import Progress from "@/components/markas/Progress.vue";
</script>

<template>
  <Progress label="Mengunggah berkas" :value="60" />
  <Progress label="Penyimpanan terpakai" :value="3" :max="4" />
  <Progress label="Menyiapkan laporan" />
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

## Catatan

- Tanpa `value`, progress menjadi tak tentu dan berdenyut. Animasi mati saat `prefers-reduced-motion`.
- Tanpa `label`, isi `aria-label` supaya progress punya nama.
- Persentase dibulatkan dan dibatasi 0 sampai 100.
