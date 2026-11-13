## Blade

```blade
<x-markas.dropdown-menu
    label="Aksi"
    :items="[
        ['label' => 'Ubah', 'value' => 'ubah'],
        ['label' => 'Lihat detail', 'href' => '/proyek/1'],
        ['separator' => true],
        ['label' => 'Hapus', 'value' => 'hapus', 'danger' => true],
    ]"
    x-on:markas-select="console.log($event.detail)"
/>
```

Butuh Alpine.js. Item yang dipilih memancarkan event `markas-select` dengan `$event.detail` berisi value item. Di Livewire: `x-on:markas-select="$wire.aksi($event.detail)"`.

## React

```tsx
import { DropdownMenu } from "@/components/markas/DropdownMenu";

<DropdownMenu
  label="Aksi"
  items={[
    { label: "Ubah", value: "ubah" },
    { label: "Lihat detail", href: "/proyek/1" },
    { separator: true },
    { label: "Hapus", value: "hapus", danger: true },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <DropdownMenu
    label="Aksi"
    :items="[
      { label: 'Ubah', value: 'ubah' },
      { label: 'Lihat detail', href: '/proyek/1' },
      { separator: true },
      { label: 'Hapus', value: 'hapus', danger: true },
    ]"
    @select="(value) => console.log(value)"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import DropdownMenu from "$lib/components/markas/DropdownMenu.svelte";
</script>

<DropdownMenu
  label="Actions"
  items={[
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onselect={(value) => console.log(value)}
/>
```

## Astro

```astro
---
import DropdownMenu from "@/components/markas/DropdownMenu.astro";
---

<DropdownMenu
  label="Actions"
  items={[
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true },
    { label: "Delete", value: "delete", danger: true },
  ]}
/>

<script>
  document.addEventListener("markas-select", (event) =>
    console.log((event as CustomEvent<string>).detail),
  );
</script>
```

Satu script kecil yang dibundel menjalankan semua dropdown menu di halaman, juga setelah view transition. Memilih item memancarkan event `markas-select` (bubble) dengan value item di `detail`.

## Angular

```ts
import { Component } from "@angular/core";
import { DropdownMenu } from "./markas/dropdown-menu.component";

@Component({
  selector: "app-project-actions",
  imports: [DropdownMenu],
  template: `
    <markas-dropdown-menu
      label="Actions"
      [items]="items"
      (selected)="onSelect($event)"
    />
  `,
})
export class ProjectActions {
  readonly items = [
    { label: "Edit", value: "edit" },
    { label: "View details", href: "/projects/1" },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];

  onSelect(value: string) {}
}
```

Isi tombol pemicu bisa diganti dengan elemen beratribut `trigger` (`ng-container` juga bisa).

## Catatan

- Isi tombol bisa diganti lewat slot `trigger` (Blade dan Vue) atau prop `trigger` (React). Ikon panah tetap ditampilkan.
- Kalau `value` kosong, callback menerima `label` item.
- Panel menu tampil di top layer lewat Popover API, jadi tidak terpotong oleh `overflow: hidden` induknya.
- Teks tombol pemicu default dalam bahasa Inggris ("Options"). Isi `label` dengan "Opsi" atau "Aksi" untuk situs berbahasa Indonesia.
