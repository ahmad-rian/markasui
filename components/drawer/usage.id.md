## Blade

```blade
<x-markas.drawer title="Filter produk" close-label="Tutup">
    <x-slot:trigger>
        <x-markas.button variant="secondary">Buka filter</x-markas.button>
    </x-slot:trigger>

    Pilih kategori dan rentang harga untuk menyaring daftar produk.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="batal">Batal</x-markas.button>
        <x-markas.button type="submit" value="terapkan">Terapkan</x-markas.button>
    </x-slot:footer>
</x-markas.drawer>
```

Butuh Alpine.js. Livewire 3 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Drawer } from "@/components/markas/Drawer";

<Drawer
  title="Filter produk"
  closeLabel="Tutup"
  trigger={<Button variant="secondary">Buka filter</Button>}
  footer={
    <>
      <Button variant="secondary" type="submit" value="batal">
        Batal
      </Button>
      <Button type="submit" value="terapkan">
        Terapkan
      </Button>
    </>
  }
  onClose={(e) => console.log(e.currentTarget.returnValue)}
>
  Pilih kategori dan rentang harga untuk menyaring daftar produk.
</Drawer>;
```

## Vue

```vue
<template>
  <Drawer title="Filter produk" close-label="Tutup">
    <template #trigger>
      <Button variant="secondary">Buka filter</Button>
    </template>

    Pilih kategori dan rentang harga untuk menyaring daftar produk.

    <template #footer>
      <Button variant="secondary" type="submit" value="batal">Batal</Button>
      <Button type="submit" value="terapkan">Terapkan</Button>
    </template>
  </Drawer>
</template>
```

## Catatan

- Pakai `side="left"` untuk drawer dari sisi kiri.
- Nilai `value` tombol yang dipakai menutup drawer tersedia di `dialog.returnValue` saat event `close`.
- Label tombol tutup default dalam bahasa Inggris ("Close"). Isi `closeLabel` (Blade: `close-label`) dengan "Tutup" untuk situs berbahasa Indonesia.
