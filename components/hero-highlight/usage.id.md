## Blade

```blade
<x-markas.hero-highlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.</h2>
</x-markas.hero-highlight>
```

Butuh Alpine.js untuk cahaya pointer dan memulai gambar mark.

## React

```tsx
import { HeroHighlight } from "@/components/markas/HeroHighlight";

<HeroHighlight className="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 className="text-3xl font-semibold text-ink">
    Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.
  </h2>
</HeroHighlight>;
```

## Vue

```vue
<template>
  <HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
    <h2 class="text-3xl font-semibold text-ink">
      Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.
    </h2>
  </HeroHighlight>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import HeroHighlight from "$lib/components/markas/HeroHighlight.svelte";
</script>

<HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 class="text-3xl font-semibold text-ink">
    Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.
  </h2>
</HeroHighlight>
```

## Astro

```astro
---
import HeroHighlight from "@/components/markas/HeroHighlight.astro";
---

<HeroHighlight class="rounded-xl border border-line bg-surface px-6 py-14">
  <h2 class="text-3xl font-semibold text-ink">
    Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.
  </h2>
</HeroHighlight>
```

Script kecil yang dibundel menjalankan efek per instance. Tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { HeroHighlight } from "./markas/hero-highlight.component";

@Component({
  selector: "app-hero",
  imports: [HeroHighlight],
  template: `
    <div
      markas-hero-highlight
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <h2 class="text-3xl font-semibold text-ink">
        Berhenti menebak. <mark>Mulai mengukur</mark> apa yang disukai pengguna.
      </h2>
    </div>
  `,
})
export class Hero {}
```

Komponen ini berupa atribut pada div, jadi class, style, dan atribut lain tetap di elemen akar.

## Catatan

- Setiap `<mark>` di dalam komponen mendapat sorotan. Tidak ada komponen anak terpisah, jadi markup-nya sama di semua framework.
- Posisi pointer disimpan di variabel CSS; mask radial menampilkan grid terang di sekitarnya. Tanpa canvas dan tanpa loop animasi.
- Mark tergambar sekali, saat section pertama kali masuk layar. Dengan reduced motion mark langsung tersorot penuh.
- Komponen ini tidak punya teks bawaan, jadi tidak ada prop label yang perlu diterjemahkan.
