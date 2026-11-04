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

## Catatan

- Item terakhir selalu dirender sebagai teks dengan `aria-current="page"`, walau diberi `href`.
- Label nav default dalam bahasa Inggris ("Breadcrumb"). Isi `navLabel` (Blade: `nav-label`) dengan "Jejak navigasi" untuk situs berbahasa Indonesia.
