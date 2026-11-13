## Blade

```blade
<h2 class="text-3xl font-semibold">
    <x-markas.text-scramble text="Operasi Nusantara" trigger="view" />
</h2>
<x-markas.text-scramble text="Rp 12,4 M" trigger="view" charset="digits" />
<x-markas.text-scramble text="99.98%" trigger="view" charset="digits" :delay="150" />
<a href="/brief"><x-markas.text-scramble text="Buka brief" charset="symbols" /></a>
```

## React

```tsx
import { TextScramble } from "@/components/markas/TextScramble";

<h2 className="text-3xl font-semibold">
  <TextScramble text="Operasi Nusantara" trigger="view" />
</h2>
<TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Buka brief" charset="symbols" /></a>
```

## Vue

```vue
<template>
  <h2 class="text-3xl font-semibold">
    <TextScramble text="Operasi Nusantara" trigger="view" />
  </h2>
  <TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
  <TextScramble text="99.98%" trigger="view" charset="digits" :delay="150" />
  <a href="/brief"><TextScramble text="Buka brief" charset="symbols" /></a>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import TextScramble from "$lib/components/markas/TextScramble.svelte";
</script>

<h2 class="text-3xl font-semibold">
  <TextScramble text="Operasi Nusantara" trigger="view" />
</h2>
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Buka brief" charset="symbols" /></a>
```

## Astro

```astro
---
import TextScramble from "@/components/markas/TextScramble.astro";
---

<h2 class="text-3xl font-semibold">
  <TextScramble text="Operasi Nusantara" trigger="view" />
</h2>
<TextScramble text="99.98%" trigger="view" charset="digits" delay={150} />
<a href="/brief"><TextScramble text="Buka brief" charset="symbols" /></a>
```

## Angular

```ts
import { Component } from "@angular/core";
import { TextScramble } from "./markas/text-scramble.component";

@Component({
  selector: "app-stats",
  imports: [TextScramble],
  template: `
    <h2 class="text-3xl font-semibold">
      <span markas-text-scramble text="Operasi Nusantara" trigger="view"></span>
    </h2>
    <span
      markas-text-scramble
      text="99.98%"
      trigger="view"
      charset="digits"
      delay="150"
    ></span>
    <a href="/brief">
      <span markas-text-scramble text="Buka brief" charset="symbols"></span>
    </a>
  `,
})
export class Stats {}
```

Angular memakai attribute selector pada span: `<span markas-text-scramble>`. Di Astro teks dirender di server lalu script kecil mengacaknya.

## Catatan

- `hover` berjalan saat hover dan fokus pada link atau tombol terdekat. `view` dan `mount` mulai dalam keadaan teracak lalu terdekripsi sekali; `view` menunggu sampai teks masuk layar.
- Salinan teks akhir yang tidak terlihat menahan lebar, sehingga tata letak tidak bergeser saat teracak.
- Karakter acak berasal dari generator dengan seed tetap, sehingga setiap putaran terlihat sama di setiap framework.
- Screen reader hanya membaca teks akhir. Dengan reduced motion, teks akhir langsung tampil dan tidak pernah teracak. Versi Blade butuh Alpine.js.
