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

## Catatan

- Murni CSS, tanpa JavaScript. Garis muncul saat hover, saat fokus keyboard, dan tetap tampil dengan `active`, yang juga memasang `aria-current="page"`.
- Garis dan coretan memakai `currentColor`, sehingga mengikuti warna teks link.
- Link memakai `inline-block` agar garis berada di bawah seluruh label; jaga label tetap satu baris.
- Dengan reduced motion, garis muncul tanpa transisi.
