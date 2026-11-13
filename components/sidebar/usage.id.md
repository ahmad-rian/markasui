## Blade

```blade
<x-markas.sidebar
    nav-label="Navigasi samping"
    collapse-label="Ciutkan sidebar"
    expand-label="Bentangkan sidebar"
    open-label="Buka sidebar"
    close-label="Tutup sidebar"
    :sections="[
        ['items' => [
            ['label' => 'Beranda', 'href' => '/', 'icon' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z'],
            ['label' => 'Kotak masuk', 'href' => '/inbox', 'icon' => 'M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z', 'badge' => 12],
        ]],
        ['title' => 'Workspace', 'items' => [
            ['label' => 'Proyek', 'icon' => 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'children' => [
                ['label' => 'Desain ulang situs', 'href' => '/proyek/situs', 'active' => true],
                ['label' => 'Aplikasi seluler', 'href' => '/proyek/seluler'],
            ]],
        ]],
    ]"
    class="h-dvh"
>
    <x-slot:header>MarkasUI</x-slot:header>
    <x-slot:footer>Rina Saputra</x-slot:footer>

    <main class="flex-1 p-6">...</main>
</x-markas.sidebar>
```

Butuh Alpine.js. Dengarkan perubahan rail lewat `x-on:markas-collapsed-change="tersimpan = $event.detail"`.

## React

```tsx
import { Sidebar } from "@/components/markas/Sidebar";

const sections = [
  {
    items: [
      {
        label: "Beranda",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
      },
      {
        label: "Kotak masuk",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 12,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Proyek",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        children: [
          { label: "Desain ulang situs", href: "/proyek/situs", active: true },
          { label: "Aplikasi seluler", href: "/proyek/seluler" },
        ],
      },
    ],
  },
];

const [collapsed, setCollapsed] = useState(false);

<Sidebar
  sections={sections}
  header="MarkasUI"
  footer="Rina Saputra"
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  navLabel="Navigasi samping"
  collapseLabel="Ciutkan sidebar"
  expandLabel="Bentangkan sidebar"
  openLabel="Buka sidebar"
  closeLabel="Tutup sidebar"
  className="h-dvh"
>
  <main className="flex-1 p-6">...</main>
</Sidebar>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/markas/Sidebar.vue";

const collapsed = ref(false);
// sections: bentuknya sama dengan contoh React
</script>

<template>
  <Sidebar
    v-model:collapsed="collapsed"
    :sections="sections"
    nav-label="Navigasi samping"
    collapse-label="Ciutkan sidebar"
    expand-label="Bentangkan sidebar"
    open-label="Buka sidebar"
    close-label="Tutup sidebar"
    class="h-dvh"
  >
    <template #header>MarkasUI</template>
    <template #footer>Rina Saputra</template>
    <main class="flex-1 p-6">...</main>
  </Sidebar>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Sidebar from "$lib/components/markas/Sidebar.svelte";

  let collapsed = $state(false);
  // sections: bentuknya sama dengan contoh React
</script>

<Sidebar bind:collapsed {sections} class="h-dvh">
  {#snippet header()}MarkasUI{/snippet}
  {#snippet footer()}Rina Saputra{/snippet}
  <main class="flex-1 p-6">...</main>
</Sidebar>
```

## Astro

```astro
---
import Sidebar from "@/components/markas/Sidebar.astro";
// sections: bentuknya sama dengan contoh React
---

<Sidebar sections={sections} class="h-dvh">
  <Fragment slot="header">MarkasUI</Fragment>
  <Fragment slot="footer">Rina Saputra</Fragment>
  <main class="flex-1 p-6">...</main>
</Sidebar>
```

Satu script kecil yang dibundel menangani tombol rail, grup sub-item, dan dialog seluler untuk semua sidebar di halaman. Dengarkan perubahan rail dengan `addEventListener("markas-collapsed-change", (e) => e.detail)`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Sidebar } from "./markas/sidebar.component";

@Component({
  selector: "app-shell",
  imports: [Sidebar],
  template: `
    <markas-sidebar
      [(collapsed)]="collapsed"
      [sections]="sections"
      class="h-dvh"
    >
      <ng-template #header>MarkasUI</ng-template>
      <ng-template #footer>Rina Saputra</ng-template>
      <main class="flex-1 p-6">...</main>
    </markas-sidebar>
  `,
})
export class AppShell {
  readonly collapsed = signal(false);
  // sections: bentuknya sama dengan contoh React
}
```

`header` dan `footer` berupa `ng-template` karena dirender dua kali: di sidebar dan di dialog seluler.

## Catatan

- Komponen ini adalah kerangka aplikasi utuh: taruh isi halaman di dalamnya. Lebarnya menentukan tata letak lewat container query. Mulai `breakpoint` (default `md`, 42rem) sidebar tampil di samping konten; di bawahnya tombol menu membuka link yang sama di `<dialog>` native yang meluncur dari kiri.
- Tombol bulat di tepi sidebar mengubahnya jadi rail ikon selebar 64px. Label lalu tampil sebagai tooltip dan badge sebagai titik. Secara default state-nya tidak terkontrol. Mulai dalam mode rail dengan `defaultCollapsed` di React, `:collapsed="true"` tanpa `v-model` di Vue dan Blade, atau nilai `collapsed` biasa di Svelte, Astro, dan Angular.
- Di mode rail, item induk membentangkan sidebar dan membuka sub-itemnya.
- Sorotan meluncur ke item yang di-hover atau difokus lalu kembali ke item aktif. Sorotan memakai CSS anchor positioning tanpa JavaScript; browser yang belum mendukungnya tetap menandai item aktif dengan teks tebal. Grup sub-item yang memuat halaman aktif terbuka di awal; isi `open` untuk mengubahnya.
- `header` dan `footer` dirender dua kali: di sidebar dan di dialog seluler. Pemilih workspace (DropdownMenu) atau pemicu pencarian (Command) berfungsi di kedua salinan; di Blade, id di salinan dialog diberi akhiran `-m` agar tetap unik (Astro: awalan `m-`).
- Sembunyikan bagian header atau footer di mode rail dengan `in-data-[state=collapsed]:hidden`, misalnya kartu upgrade.
- Label bawaan berbahasa Inggris: "Sidebar", "Collapse sidebar", "Expand sidebar", "Open sidebar", dan "Close sidebar". Terjemahkan lewat `navLabel`, `collapseLabel`, `expandLabel`, `openLabel`, dan `closeLabel` (Blade: `nav-label`, `collapse-label`, dan seterusnya), seperti contoh di atas.
