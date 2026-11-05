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

## Catatan

- Item menu memakai bentuk yang sama dengan item Dropdown Menu: `value`, `href`, `danger`, `disabled`, atau `{ separator: true }`.
- Kalau `value` kosong, callback menerima `label` item.
- Menu tampil di top layer lewat Popover API, jadi tidak terpotong oleh `overflow: hidden` induknya. Hanya satu menu terbuka dalam satu waktu.
- Nama aksesibel bar default dalam bahasa Inggris ("Menu"). Isi `label` dengan "Menu aplikasi" untuk situs berbahasa Indonesia.
