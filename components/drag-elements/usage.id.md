## Blade

```blade
<x-markas.drag-elements :seed="4" hint-label="Seret untuk memindahkan, atau pakai tombol panah. Escape mengembalikannya" class="h-80 rounded-xl border border-line bg-subtle" role="group" aria-label="Moodboard">
    <div class="w-44 rounded-lg bg-surface p-4">Brand baru</div>
    <span class="rounded-full bg-primary px-4 py-2 text-on-primary">Kopi susu</span>
    <span data-x="90" data-y="10" data-rotate="8" class="rounded-md border border-line bg-surface px-3 py-1.5">Motif batik</span>
</x-markas.drag-elements>
```

Butuh Alpine.js.

## React

```tsx
import { DragElements } from "@/components/markas/DragElements";

<DragElements
  release="return"
  hintLabel="Seret untuk memindahkan, atau pakai tombol panah. Escape mengembalikannya"
  className="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Keahlian"
>
  <span className="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span className="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>;
```

## Vue

```vue
<template>
  <DragElements
    release="stay"
    :rotate="0"
    hint-label="Seret untuk memindahkan, atau pakai tombol panah. Escape mengembalikannya"
    class="h-80 rounded-xl border border-line bg-canvas"
    role="group"
    aria-label="Tim"
  >
    <div data-x="8" data-y="10" class="w-48 rounded-xl bg-surface p-3">
      Rania Putri
    </div>
    <div data-x="92" data-y="30" class="w-48 rounded-xl bg-surface p-3">
      Bima Saputra
    </div>
  </DragElements>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import DragElements from "$lib/components/markas/DragElements.svelte";
</script>

<DragElements
  release="return"
  class="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Skills"
>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>
```

## Astro

```astro
---
import DragElements from "@/components/markas/DragElements.astro";
---

<DragElements
  release="return"
  class="h-80 rounded-xl border border-line bg-subtle"
  role="group"
  aria-label="Skills"
>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
  <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
</DragElements>
```

Setiap area adalah custom element kecil, jadi tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { DragElements } from "./markas/drag-elements.component";

@Component({
  selector: "app-skills",
  imports: [DragElements],
  template: `
    <markas-drag-elements
      release="return"
      class="h-80 rounded-xl border border-line bg-subtle"
      role="group"
      aria-label="Skills"
    >
      <span class="rounded-full bg-primary-soft px-3 py-1.5">Laravel</span>
      <span class="rounded-full bg-primary-soft px-3 py-1.5">Vue</span>
    </markas-drag-elements>
  `,
})
export class Skills {}
```

`role`, `aria-label`, dan `class` pindah dari host ke area.

## Catatan

- Setiap anak langsung bisa diseret dan ditaruh di posisi seed di dalam area. `data-x` dan `data-y` (0 sampai 100) serta `data-rotate` pada anak mengunci posisi awalnya.
- `release="inertia"` meluncur dan memantul di tepi, `"stay"` berhenti di tempat dilepas, `"return"` kembali memegas ke posisi awal.
- Fokuskan item dengan Tab, geser dengan tombol panah (Shift untuk langkah besar), dan tekan Escape untuk mengembalikannya. Item yang disentuh naik ke depan.
- Beri area tinggi. Item tidak pernah keluar dari area. Posisi tidak disimpan; pakai untuk main-main, bukan untuk mengurutkan sungguhan.
- Ubah petunjuk screen reader lewat `hintLabel`.
