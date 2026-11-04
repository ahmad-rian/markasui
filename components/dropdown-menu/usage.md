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

## Catatan

- Isi tombol bisa diganti lewat slot `trigger` (Blade dan Vue) atau prop `trigger` (React). Ikon panah tetap ditampilkan.
- Kalau `value` kosong, callback menerima `label` item.
- Panel menu tampil di top layer lewat Popover API, jadi tidak terpotong oleh `overflow: hidden` induknya.
