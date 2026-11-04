## Blade

```blade
<x-markas.breadcrumb :items="[
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
