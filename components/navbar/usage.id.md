## Blade

```blade
<x-markas.navbar
    nav-label="Utama"
    mobile-nav-label="Utama seluler"
    variant="blur"
    :sticky="true"
    :links="[
        ['label' => 'Beranda', 'href' => '/', 'active' => true],
        ['label' => 'Produk', 'children' => [
            [
                'label' => 'Analitik',
                'href' => '/analitik',
                'description' => 'Pantau pemakaian secara langsung',
                'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6',
            ],
            ['label' => 'Otomasi', 'href' => '/otomasi'],
        ]],
        ['label' => 'Harga', 'href' => '/harga'],
    ]"
>
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Masuk</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
```

Butuh Alpine.js untuk dropdown dan menu seluler.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Navbar } from "@/components/markas/Navbar";

<Navbar
  variant="blur"
  sticky
  brand="MarkasUI"
  navLabel="Utama"
  mobileNavLabel="Utama seluler"
  links={[
    { label: "Beranda", href: "/", active: true },
    {
      label: "Produk",
      children: [
        {
          label: "Analitik",
          href: "/analitik",
          description: "Pantau pemakaian secara langsung",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        { label: "Otomasi", href: "/otomasi" },
      ],
    },
    { label: "Harga", href: "/harga" },
  ]}
  actions={<Button size="sm">Masuk</Button>}
/>;
```

## Vue

```vue
<script setup lang="ts">
const links = [
  { label: "Beranda", href: "/", active: true },
  {
    label: "Produk",
    children: [
      {
        label: "Analitik",
        href: "/analitik",
        description: "Pantau pemakaian secara langsung",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      { label: "Otomasi", href: "/otomasi" },
    ],
  },
  { label: "Harga", href: "/harga" },
];
</script>

<template>
  <Navbar
    variant="blur"
    sticky
    nav-label="Utama"
    mobile-nav-label="Utama seluler"
    :links="links"
  >
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Masuk</Button>
    </template>
  </Navbar>
</template>
```

## Catatan

- Link biasa dari versi sebelumnya tetap jalan. Tambahkan `children` pada item untuk menjadikannya dropdown; `href` item itu lalu diabaikan.
- Panel dropdown memakai Popover API native, jadi tampil di top layer di atas konten lain dan tertutup saat klik di luar atau Escape. Panel dengan lebih dari tiga link mengalir ke kolom kedua.
- `variant`: `default` memberi garis bawah tipis, `floating` berupa bar membulat dengan border dan bayangan halus, `blur` semi transparan dengan backdrop blur. Pasangkan `blur` dengan `sticky` di atas konten yang tergulir di bawah header.
- Tata letak mengikuti lebar header lewat container query (`@container` dan `@2xl:`), bukan lebar layar. Menu desktop tampil saat header selebar 42rem atau lebih, di bawah itu muncul tombol menu dan dropdown menjadi grup yang bisa dibuka dan ditutup.
- Label bawaan dalam bahasa Inggris: tombol "Menu", nav "Main" dan "Main mobile". Isi `navLabel` dan `mobileNavLabel` (Blade: `nav-label`, `mobile-nav-label`) untuk situs berbahasa Indonesia. `menuLabel` (Blade: `menu-label`) juga bisa diubah, walau "Menu" sudah cocok.
