## Blade

```blade
<nav class="flex gap-5 text-sm font-medium">
    <x-markas.underline-link href="/" active>Beranda</x-markas.underline-link>
    <x-markas.underline-link href="/docs" variant="comes-in-goes-out">Dokumentasi</x-markas.underline-link>
</nav>
<x-markas.underline-link href="/guide" variant="scribble">Panduan migrasi</x-markas.underline-link>
```

## React

```tsx
import { UnderlineLink } from "@/components/markas/UnderlineLink";

<nav className="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Beranda</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out">Dokumentasi</UnderlineLink>
</nav>
<UnderlineLink href="/guide" variant="scribble">Panduan migrasi</UnderlineLink>
```

## Vue

```vue
<template>
  <nav class="flex gap-5 text-sm font-medium">
    <UnderlineLink href="/" active>Beranda</UnderlineLink>
    <UnderlineLink href="/docs" variant="comes-in-goes-out"
      >Dokumentasi</UnderlineLink
    >
  </nav>
  <UnderlineLink href="/guide" variant="scribble"
    >Panduan migrasi</UnderlineLink
  >
</template>
```

## Svelte

```svelte
<script lang="ts">
  import UnderlineLink from "$lib/components/markas/UnderlineLink.svelte";
</script>

<nav class="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Beranda</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out"
    >Dokumentasi</UnderlineLink
  >
</nav>
<UnderlineLink href="/guide" variant="scribble">Panduan migrasi</UnderlineLink>
```

## Astro

```astro
---
import UnderlineLink from "@/components/markas/UnderlineLink.astro";
---

<nav class="flex gap-5 text-sm font-medium">
  <UnderlineLink href="/" active>Beranda</UnderlineLink>
  <UnderlineLink href="/docs" variant="comes-in-goes-out">Dokumentasi</UnderlineLink>
</nav>
<UnderlineLink href="/guide" variant="scribble">Panduan migrasi</UnderlineLink>
```

## Angular

```ts
import { Component } from "@angular/core";
import { UnderlineLink } from "./markas/underline-link.component";

@Component({
  selector: "app-site-nav",
  imports: [UnderlineLink],
  template: `
    <nav class="flex gap-5 text-sm font-medium">
      <a markas-underline-link href="/" active>Beranda</a>
      <a markas-underline-link href="/docs" variant="comes-in-goes-out"
        >Dokumentasi</a
      >
    </nav>
    <a markas-underline-link href="/guide" variant="scribble"
      >Panduan migrasi</a
    >
  `,
})
export class SiteNav {}
```

Angular memakai attribute selector pada link native, jadi `target`, `rel`, `aria-*`, dan `class` tetap di sana. Tanpa script di Astro: garisnya murni CSS.

## Catatan

- Murni CSS, tanpa JavaScript. Garis muncul saat hover, saat fokus keyboard, dan tetap tampil dengan `active`, yang juga memasang `aria-current="page"`.
- Garis dan coretan memakai `currentColor`, sehingga mengikuti warna teks link.
- Link memakai `inline-block` agar garis berada di bawah seluruh label; jaga label tetap satu baris.
- Dengan reduced motion, garis muncul tanpa transisi.
