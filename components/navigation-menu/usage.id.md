## Blade

```blade
<x-markas.navigation-menu
    nav-label="Utama"
    :items="[
        ['label' => 'Produk', 'featured' => [
            'title' => 'Workflow 2.0',
            'href' => '/workflow',
            'description' => 'Percabangan, coba ulang, dan editor visual',
        ], 'links' => [
            ['label' => 'Analitik', 'href' => '/analitik', 'description' => 'Lihat asal pengunjung', 'icon' => 'M3 3v18h18M7 15l4-4 3 3 5-6'],
            ['label' => 'Otomasi', 'href' => '/otomasi', 'description' => 'Jalankan workflow terjadwal'],
        ]],
        ['label' => 'Developer', 'links' => [
            ['label' => 'Dokumentasi', 'href' => '/docs', 'description' => 'Panduan dan referensi API'],
            ['label' => 'Changelog', 'href' => '/changelog', 'description' => 'Yang rilis bulan ini'],
        ]],
        ['label' => 'Harga', 'href' => '/harga', 'active' => true],
    ]"
/>
```

Butuh Alpine.js. Livewire 3 dan 4 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

## React

```tsx
import { NavigationMenu } from "@/components/markas/NavigationMenu";

<NavigationMenu
  navLabel="Utama"
  items={[
    {
      label: "Produk",
      featured: {
        title: "Workflow 2.0",
        href: "/workflow",
        description: "Percabangan, coba ulang, dan editor visual",
      },
      links: [
        {
          label: "Analitik",
          href: "/analitik",
          description: "Lihat asal pengunjung",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Otomasi",
          href: "/otomasi",
          description: "Jalankan workflow terjadwal",
        },
      ],
    },
    {
      label: "Developer",
      links: [
        {
          label: "Dokumentasi",
          href: "/docs",
          description: "Panduan dan referensi API",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "Yang rilis bulan ini",
        },
      ],
    },
    { label: "Harga", href: "/harga", active: true },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import NavigationMenu from "@/components/markas/NavigationMenu.vue";

const items = [
  {
    label: "Produk",
    featured: {
      title: "Workflow 2.0",
      href: "/workflow",
      description: "Percabangan, coba ulang, dan editor visual",
    },
    links: [
      {
        label: "Analitik",
        href: "/analitik",
        description: "Lihat asal pengunjung",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Otomasi",
        href: "/otomasi",
        description: "Jalankan workflow terjadwal",
      },
    ],
  },
  {
    label: "Developer",
    links: [
      {
        label: "Dokumentasi",
        href: "/docs",
        description: "Panduan dan referensi API",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "Yang rilis bulan ini",
      },
    ],
  },
  { label: "Harga", href: "/harga", active: true },
];
</script>

<template>
  <NavigationMenu nav-label="Utama" :items="items" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import NavigationMenu from "$lib/components/markas/NavigationMenu.svelte";

  const items = [
    {
      label: "Produk",
      featured: {
        title: "Workflow 2.0",
        href: "/workflow",
        description: "Percabangan, coba ulang, dan editor visual",
      },
      links: [
        {
          label: "Analitik",
          href: "/analitik",
          description: "Lihat asal pengunjung",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Otomasi",
          href: "/otomasi",
          description: "Jalankan workflow terjadwal",
        },
      ],
    },
    {
      label: "Developer",
      links: [
        {
          label: "Dokumentasi",
          href: "/docs",
          description: "Panduan dan referensi API",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "Yang rilis bulan ini",
        },
      ],
    },
    { label: "Harga", href: "/harga", active: true },
  ];
</script>

<NavigationMenu navLabel="Utama" {items} />
```

## Astro

```astro
---
import NavigationMenu from "@/components/markas/NavigationMenu.astro";

const items = [
  {
    label: "Produk",
    featured: {
      title: "Workflow 2.0",
      href: "/workflow",
      description: "Percabangan, coba ulang, dan editor visual",
    },
    links: [
      {
        label: "Analitik",
        href: "/analitik",
        description: "Lihat asal pengunjung",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Otomasi",
        href: "/otomasi",
        description: "Jalankan workflow terjadwal",
      },
    ],
  },
  {
    label: "Developer",
    links: [
      {
        label: "Dokumentasi",
        href: "/docs",
        description: "Panduan dan referensi API",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "Yang rilis bulan ini",
      },
    ],
  },
  { label: "Harga", href: "/harga", active: true },
];
---

<NavigationMenu navLabel="Utama" items={items} />
```

Satu script kecil yang dibundel menghidupkan setiap menu di halaman, termasuk setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import {
  NavigationMenu,
  type NavigationMenuItem,
} from "./markas/navigation-menu.component";

@Component({
  selector: "app-site-nav",
  imports: [NavigationMenu],
  template: `<markas-navigation-menu navLabel="Utama" [items]="items" />`,
})
export class SiteNav {
  protected readonly items: NavigationMenuItem[] = [
    {
      label: "Produk",
      featured: {
        title: "Workflow 2.0",
        href: "/workflow",
        description: "Percabangan, coba ulang, dan editor visual",
      },
      links: [
        {
          label: "Analitik",
          href: "/analitik",
          description: "Lihat asal pengunjung",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Otomasi",
          href: "/otomasi",
          description: "Jalankan workflow terjadwal",
        },
      ],
    },
    {
      label: "Developer",
      links: [
        {
          label: "Dokumentasi",
          href: "/docs",
          description: "Panduan dan referensi API",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "Yang rilis bulan ini",
        },
      ],
    },
    { label: "Harga", href: "/harga", active: true },
  ];
}
```

## Catatan

- Entri dengan `links` atau `featured` menjadi pemicu dengan panel. Entri lain menjadi link biasa ke `href`.
- `icon` adalah atribut `d` dari path SVG bergaris 24x24, jadi data yang sama berlaku di Blade, React, dan Vue. Salin dari set ikon seperti Lucide.
- Panel tampil di top layer lewat Popover API dan rata dengan tepi kiri nav, jadi berpindah antar pemicu menukar isi di tempat yang sama. Hanya satu panel yang terbuka.
- Hover mouse membuka panel setelah jeda singkat dan langsung pindah ke pemicu berikutnya bila sudah ada yang terbuka. Klik pada pemicu yang sudah terbuka tidak menutupnya, jadi klik setelah hover membuat panel tetap terbuka. Kursor yang pergi, klik di luar, atau Escape menutupnya.
- Indikator di bawah pemicu mengikuti panel yang terbuka dan kembali ke entri bertanda `active`.
- Di layar sempit tingkat atas bergulir horizontal. Untuk menu mobile lengkap, pasangkan dengan Navbar atau Drawer.
- Nama aksesibel nav default "Main". Terjemahkan lewat `navLabel` (`nav-label` di Blade).
