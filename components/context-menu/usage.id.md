## Blade

```blade
<x-markas.context-menu
    menu-label="Menu konteks"
    hint-label="Tekan Shift+F10 untuk membuka menu konteks"
    :items="[
        ['label' => 'Buka', 'value' => 'buka'],
        ['label' => 'Ganti nama', 'value' => 'ganti-nama'],
        ['separator' => true],
        ['label' => 'Hapus', 'value' => 'hapus', 'danger' => true],
    ]"
    x-on:markas-select="console.log($event.detail)"
>
    <div class="rounded-lg border border-dashed border-line p-8 text-sm text-muted">Klik kanan di sini</div>
</x-markas.context-menu>
```

Butuh Alpine.js. Item yang dipilih memancarkan event `markas-select` dengan `$event.detail` berisi value item. Di Livewire: `x-on:markas-select="$wire.aksi($event.detail)"`.

## React

```tsx
import { ContextMenu } from "@/components/markas/ContextMenu";

<ContextMenu
  menuLabel="Menu konteks"
  hintLabel="Tekan Shift+F10 untuk membuka menu konteks"
  items={[
    { label: "Buka", value: "buka" },
    { label: "Ganti nama", value: "ganti-nama" },
    { separator: true },
    { label: "Hapus", value: "hapus", danger: true },
  ]}
  onSelect={(value) => console.log(value)}
>
  <div className="rounded-lg border border-dashed border-line p-8 text-sm text-muted">
    Klik kanan di sini
  </div>
</ContextMenu>;
```

## Vue

```vue
<template>
  <ContextMenu
    menu-label="Menu konteks"
    hint-label="Tekan Shift+F10 untuk membuka menu konteks"
    :items="[
      { label: 'Buka', value: 'buka' },
      { label: 'Ganti nama', value: 'ganti-nama' },
      { separator: true },
      { label: 'Hapus', value: 'hapus', danger: true },
    ]"
    @select="(value) => console.log(value)"
  >
    <div
      class="rounded-lg border border-dashed border-line p-8 text-sm text-muted"
    >
      Klik kanan di sini
    </div>
  </ContextMenu>
</template>
```

## Catatan

- Atribut dan `class` jatuh ke area pemicu yang bisa difokus. Shift+F10 atau tombol ContextMenu membuka menu dari keyboard.
- Kalau `value` kosong, callback menerima `label` item.
- Menu tampil di top layer lewat Popover API dan tetap di dalam layar saat dekat tepi.
- `menuLabel` dan `hintLabel` default berbahasa Inggris. Isi dengan teks Indonesia seperti contoh di atas.
