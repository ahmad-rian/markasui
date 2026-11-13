## Blade

```blade
<x-markas.flip-button back-label="Hanya 2 menit">Buat akun</x-markas.flip-button>

<x-markas.flip-button size="lg">
    Unduh laporan
    <x-slot:back>PDF, 2.4 MB</x-slot:back>
</x-markas.flip-button>
```

## React

```tsx
import { FlipButton } from "@/components/markas/FlipButton";

<FlipButton backLabel="Hanya 2 menit">Buat akun</FlipButton>
<FlipButton size="lg" backLabel={<>PDF, 2.4 MB</>}>Unduh laporan</FlipButton>
```

## Vue

```vue
<script setup lang="ts">
import FlipButton from "@/components/markas/FlipButton.vue";
</script>

<template>
  <FlipButton back-label="Hanya 2 menit">Buat akun</FlipButton>
  <FlipButton size="lg">
    Unduh laporan
    <template #back>PDF, 2.4 MB</template>
  </FlipButton>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import FlipButton from "$lib/components/markas/FlipButton.svelte";
</script>

<FlipButton backLabel="Hanya 2 menit">Buat akun</FlipButton>
<FlipButton size="lg">
  Unduh laporan
  {#snippet back()}PDF, 2.4 MB{/snippet}
</FlipButton>
```

## Astro

```astro
---
import FlipButton from "@/components/markas/FlipButton.astro";
---

<FlipButton backLabel="Hanya 2 menit">Buat akun</FlipButton>
<FlipButton size="lg">
  Unduh laporan
  <Fragment slot="back">PDF, 2.4 MB</Fragment>
</FlipButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { FlipButton } from "./markas/flip-button.component";

@Component({
  selector: "app-signup",
  imports: [FlipButton],
  template: `
    <button markas-flip-button backLabel="Hanya 2 menit">Buat akun</button>
    <button markas-flip-button size="lg">
      Unduh laporan
      <ng-container back>PDF, 2.4 MB</ng-container>
    </button>
  `,
})
export class Signup {}
```

Angular memakai attribute selector pada button native. Tanpa `backLabel` atau elemen `back`, sisi belakang mendapat salinan label setelah render pertama.

## Catatan

- Murni CSS: tanpa JavaScript dan tanpa Alpine.js. Putaran berjalan saat hover dan fokus keyboard.
- Sisi belakang aria-hidden. Screen reader hanya membaca label depan.
- Perangkat sentuh tidak punya hover, jadi jangan taruh informasi penting hanya di sisi belakang.
