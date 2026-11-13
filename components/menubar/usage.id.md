## Blade

```blade
<x-markas.menubar
    label="Menu aplikasi"
    :menus="[
        ['label' => 'Berkas', 'items' => [
            ['label' => 'Berkas baru', 'value' => 'baru'],
            ['label' => 'Simpan', 'value' => 'simpan'],
        ]],
        ['label' => 'Ubah', 'items' => [
            ['label' => 'Urungkan', 'value' => 'urungkan'],
            ['separator' => true],
            ['label' => 'Hapus', 'value' => 'hapus', 'danger' => true],
        ]],
        ['label' => 'Bantuan', 'items' => [
            ['label' => 'Dokumentasi', 'href' => '/docs'],
        ]],
    ]"
    x-on:markas-select="console.log($event.detail)"
/>
```

Butuh Alpine.js. Item yang dipilih memancarkan event `markas-select` dengan `$event.detail` berisi value item. Di Livewire: `x-on:markas-select="$wire.aksi($event.detail)"`.

## React

```tsx
import { Menubar } from "@/components/markas/Menubar";

<Menubar
  label="Menu aplikasi"
  menus={[
    {
      label: "Berkas",
      items: [
        { label: "Berkas baru", value: "baru" },
        { label: "Simpan", value: "simpan" },
      ],
    },
    {
      label: "Ubah",
      items: [
        { label: "Urungkan", value: "urungkan" },
        { separator: true },
        { label: "Hapus", value: "hapus", danger: true },
      ],
    },
    { label: "Bantuan", items: [{ label: "Dokumentasi", href: "/docs" }] },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <Menubar
    label="Menu aplikasi"
    :menus="[
      {
        label: 'Berkas',
        items: [
          { label: 'Berkas baru', value: 'baru' },
          { label: 'Simpan', value: 'simpan' },
        ],
      },
      {
        label: 'Ubah',
        items: [
          { label: 'Urungkan', value: 'urungkan' },
          { separator: true },
          { label: 'Hapus', value: 'hapus', danger: true },
        ],
      },
      { label: 'Bantuan', items: [{ label: 'Dokumentasi', href: '/docs' }] },
    ]"
    @select="(value) => console.log(value)"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Menubar, {
    type MenubarMenu,
  } from "$lib/components/markas/Menubar.svelte";

  const menus: MenubarMenu[] = [
    {
      label: "Berkas",
      items: [
        { label: "Berkas baru", value: "baru" },
        { label: "Simpan", value: "simpan" },
      ],
    },
    {
      label: "Ubah",
      items: [
        { label: "Urungkan", value: "urungkan" },
        { separator: true },
        { label: "Hapus", value: "hapus", danger: true },
      ],
    },
    { label: "Bantuan", items: [{ label: "Dokumentasi", href: "/docs" }] },
  ];
</script>

<Menubar
  label="Menu aplikasi"
  {menus}
  onselect={(value) => console.log(value)}
/>
```

## Astro

```astro
---
import Menubar from "@/components/markas/Menubar.astro";
---

<Menubar
  label="Menu aplikasi"
  id="app-menu"
  menus={[
    {
      label: "Berkas",
      items: [
        { label: "Berkas baru", value: "baru" },
        { label: "Simpan", value: "simpan" },
      ],
    },
    {
      label: "Ubah",
      items: [
        { label: "Urungkan", value: "urungkan" },
        { separator: true },
        { label: "Hapus", value: "hapus", danger: true },
      ],
    },
    { label: "Bantuan", items: [{ label: "Dokumentasi", href: "/docs" }] },
  ]}
/>

<script>
  document
    .getElementById("app-menu")
    ?.addEventListener("markas-select", (event) =>
      console.log((event as CustomEvent<string>).detail),
    );
</script>
```

Satu script kecil yang dibundel menghidupkan setiap menubar di halaman, termasuk setelah view transition. Pilihan item memancarkan event `markas-select` (bubble) dengan value di `detail`, sama seperti Blade.

## Angular

```ts
import { Component } from "@angular/core";
import { Menubar, type MenubarMenu } from "./markas/menubar.component";

@Component({
  selector: "app-editor-menu",
  imports: [Menubar],
  template: `
    <markas-menubar
      label="Menu aplikasi"
      [menus]="menus"
      (selected)="onSelected($event)"
    />
  `,
})
export class EditorMenu {
  protected readonly menus: MenubarMenu[] = [
    {
      label: "Berkas",
      items: [
        { label: "Berkas baru", value: "baru" },
        { label: "Simpan", value: "simpan" },
      ],
    },
    {
      label: "Ubah",
      items: [
        { label: "Urungkan", value: "urungkan" },
        { separator: true },
        { label: "Hapus", value: "hapus", danger: true },
      ],
    },
    { label: "Bantuan", items: [{ label: "Dokumentasi", href: "/docs" }] },
  ];

  protected onSelected(value: string) {
    console.log(value);
  }
}
```

## Catatan

- Item menu memakai bentuk yang sama dengan item Dropdown Menu: `value`, `href`, `danger`, `disabled`, atau `{ separator: true }`.
- Kalau `value` kosong, callback menerima `label` item.
- Menu tampil di top layer lewat Popover API, jadi tidak terpotong oleh `overflow: hidden` induknya. Hanya satu menu terbuka dalam satu waktu.
- Nama aksesibel bar default dalam bahasa Inggris ("Menu"). Isi `label` dengan "Menu aplikasi" untuk situs berbahasa Indonesia.
