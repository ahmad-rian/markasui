## Blade

```blade
<x-markas.navbar :links="[
    ['label' => 'Beranda', 'href' => '/', 'active' => true],
    ['label' => 'Komponen', 'href' => '/komponen'],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Masuk</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
```

Butuh Alpine.js untuk menu seluler.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Navbar } from "@/components/markas/Navbar";

<Navbar
  brand="MarkasUI"
  links={[
    { label: "Beranda", href: "/", active: true },
    { label: "Komponen", href: "/komponen" },
  ]}
  actions={<Button size="sm">Masuk</Button>}
/>;
```

## Vue

```vue
<template>
  <Navbar
    :links="[
      { label: 'Beranda', href: '/', active: true },
      { label: 'Komponen', href: '/komponen' },
    ]"
  >
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Masuk</Button>
    </template>
  </Navbar>
</template>
```

## Catatan

- Tata letak mengikuti lebar header lewat container query (`@container` dan `@3xl:`), bukan lebar layar. Menu desktop tampil saat header selebar 48rem atau lebih, di bawah itu muncul tombol menu.
