## Blade

```blade
<x-markas.command
    hotkey
    placeholder-label="Ketik perintah atau cari..."
    empty-label="Tidak ada hasil."
    search-label="Cari perintah"
    dialog-label="Palet perintah"
    :items="[
        ['group' => 'Navigasi', 'label' => 'Dasbor', 'href' => '/dasbor'],
        ['group' => 'Navigasi', 'label' => 'Proyek', 'href' => '/proyek'],
        ['group' => 'Aksi', 'label' => 'Buat proyek', 'value' => 'buat', 'shortcut' => 'Ctrl+N'],
        ['group' => 'Aksi', 'label' => 'Undang anggota', 'value' => 'undang'],
    ]"
    x-on:markas-select="console.log($event.detail)"
>
    <x-slot:trigger>
        <x-markas.button variant="secondary">Cari</x-markas.button>
    </x-slot:trigger>
</x-markas.command>
```

Butuh Alpine.js. Perintah yang dipilih memancarkan event `markas-select` dengan `$event.detail` berisi value. Di Livewire: `x-on:markas-select="$wire.jalankan($event.detail)"`.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Command } from "@/components/markas/Command";

<Command
  hotkey
  placeholderLabel="Ketik perintah atau cari..."
  emptyLabel="Tidak ada hasil."
  searchLabel="Cari perintah"
  dialogLabel="Palet perintah"
  trigger={<Button variant="secondary">Cari</Button>}
  items={[
    { group: "Navigasi", label: "Dasbor", href: "/dasbor" },
    { group: "Navigasi", label: "Proyek", href: "/proyek" },
    { group: "Aksi", label: "Buat proyek", value: "buat", shortcut: "Ctrl+N" },
    { group: "Aksi", label: "Undang anggota", value: "undang" },
  ]}
  onSelect={(value) => console.log(value)}
/>;
```

## Vue

```vue
<template>
  <Command
    hotkey
    placeholder-label="Ketik perintah atau cari..."
    empty-label="Tidak ada hasil."
    search-label="Cari perintah"
    dialog-label="Palet perintah"
    :items="[
      { group: 'Navigasi', label: 'Dasbor', href: '/dasbor' },
      { group: 'Navigasi', label: 'Proyek', href: '/proyek' },
      {
        group: 'Aksi',
        label: 'Buat proyek',
        value: 'buat',
        shortcut: 'Ctrl+N',
      },
      { group: 'Aksi', label: 'Undang anggota', value: 'undang' },
    ]"
    @select="(value) => console.log(value)"
  >
    <template #trigger>
      <Button variant="secondary">Cari</Button>
    </template>
  </Command>
</template>
```

## Catatan

- Pencarian mencocokkan label tanpa membedakan huruf besar dan kecil. Pencarian dikosongkan saat dialog ditutup.
- Item dengan `href` berpindah halaman seperti link biasa dan tetap memanggil callback select.
- Atribut dan `class` jatuh ke elemen `dialog`.
- `placeholderLabel`, `emptyLabel`, `searchLabel`, dan `dialogLabel` default berbahasa Inggris. Isi dengan teks Indonesia seperti contoh di atas.
