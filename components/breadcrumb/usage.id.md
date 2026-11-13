## Blade

```blade
<x-markas.breadcrumb nav-label="Jejak navigasi" :items="[
    ['label' => 'Beranda', 'href' => '/'],
    ['label' => 'Komponen', 'href' => '/komponen'],
    ['label' => 'Breadcrumb'],
]" />
```

Tidak butuh Alpine.js.

## React

```tsx
import { Breadcrumb } from "@/components/markas/Breadcrumb";

<Breadcrumb
  navLabel="Jejak navigasi"
  items={[
    { label: "Beranda", href: "/" },
    { label: "Komponen", href: "/komponen" },
    { label: "Breadcrumb" },
  ]}
/>;
```

## Vue

```vue
<template>
  <Breadcrumb
    nav-label="Jejak navigasi"
    :items="[
      { label: 'Beranda', href: '/' },
      { label: 'Komponen', href: '/komponen' },
      { label: 'Breadcrumb' },
    ]"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Breadcrumb from "$lib/components/markas/Breadcrumb.svelte";
</script>

<Breadcrumb
  navLabel="Jejak navigasi"
  items={[
    { label: "Beranda", href: "/" },
    { label: "Komponen", href: "/komponen" },
    { label: "Breadcrumb" },
  ]}
/>
```

## Astro

```astro
---
import Breadcrumb from "@/components/markas/Breadcrumb.astro";
---

<Breadcrumb
  navLabel="Jejak navigasi"
  items={[
    { label: "Beranda", href: "/" },
    { label: "Komponen", href: "/komponen" },
    { label: "Breadcrumb" },
  ]}
/>
```

Tidak ada JavaScript yang dikirim.

## Angular

```ts
import { Component } from "@angular/core";
import { Breadcrumb } from "./markas/breadcrumb.component";

@Component({
  selector: "app-jejak-halaman",
  imports: [Breadcrumb],
  template: `<nav
    markas-breadcrumb
    navLabel="Jejak navigasi"
    [items]="items"
  ></nav>`,
})
export class JejakHalaman {
  readonly items = [
    { label: "Beranda", href: "/" },
    { label: "Komponen", href: "/komponen" },
    { label: "Breadcrumb" },
  ];
}
```

## Catatan

- Item terakhir selalu dirender sebagai teks dengan `aria-current="page"`, walau diberi `href`.
- Label nav default dalam bahasa Inggris ("Breadcrumb"). Isi `navLabel` (Blade: `nav-label`) dengan "Jejak navigasi" untuk situs berbahasa Indonesia.
