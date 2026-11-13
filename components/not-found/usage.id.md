## Blade

```blade
<x-markas.not-found
    title="Halaman tidak ditemukan"
    description="Halaman yang kamu cari tidak ada atau sudah dipindahkan."
    home-label="Kembali ke beranda"
    back-label="Kembali"
/>

<x-markas.not-found
    variant="search"
    search-label="Cari halaman"
    empty-label="Tidak ada halaman yang cocok"
    :links="[
        ['label' => 'Dokumentasi', 'href' => '/docs'],
        ['label' => 'Harga', 'href' => '/harga'],
    ]"
/>
```

Butuh Alpine.js untuk Kembali dan penyaring pencarian.

## React

```tsx
import { NotFound } from "@/components/markas/NotFound";

<NotFound
  title="Halaman tidak ditemukan"
  description="Halaman yang kamu cari tidak ada atau sudah dipindahkan."
  homeLabel="Kembali ke beranda"
  backLabel="Kembali"
/>
<NotFound
  variant="search"
  searchLabel="Cari halaman"
  emptyLabel="Tidak ada halaman yang cocok"
  links={[
    { label: "Dokumentasi", href: "/docs" },
    { label: "Harga", href: "/harga" },
  ]}
/>
```

## Vue

```vue
<script setup lang="ts">
import NotFound from "@/components/markas/NotFound.vue";

const links = [
  { label: "Dokumentasi", href: "/docs" },
  { label: "Harga", href: "/harga" },
];
</script>

<template>
  <NotFound
    title="Halaman tidak ditemukan"
    description="Halaman yang kamu cari tidak ada atau sudah dipindahkan."
    home-label="Kembali ke beranda"
    back-label="Kembali"
  />
  <NotFound
    variant="search"
    search-label="Cari halaman"
    empty-label="Tidak ada halaman yang cocok"
    :links="links"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import NotFound from "$lib/components/markas/NotFound.svelte";
</script>

<NotFound />
<NotFound variant="search" {links} />
<NotFound variant="glitch" code="500" title="Something went wrong" />
```

## Astro

```astro
---
import NotFound from "@/components/markas/NotFound.astro";
---

<NotFound />
<NotFound variant="search" links={links} />
<NotFound variant="glitch" code="500" title="Something went wrong" />
```

Go back dan filter pencarian memakai satu script kecil yang dibundel per halaman.

## Angular

```ts
import { Component } from "@angular/core";
import { NotFound } from "./markas/not-found.component";

@Component({
  selector: "app-not-found-page",
  imports: [NotFound],
  template: `
    <markas-not-found />
    <markas-not-found variant="search" [links]="links" />
    <markas-not-found
      variant="glitch"
      code="500"
      title="Something went wrong"
    />
  `,
})
export class NotFoundPage {
  links = [
    { label: "Documentation", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ];
}
```

## Catatan

- Blok ini merender h1, jadi pakai sebagai isi utama halaman error.
- Kembali adalah link ke `homeHref`. Bila ada riwayat browser, ia memanggil `history.back()`.
- Variant split menampilkan ilustrasi di samping teks mulai lebar 36rem (container query) dan di bawahnya di layar sempit.
