## Blade

```blade
<x-markas.modal title="Hapus proyek?" close-label="Tutup">
    <x-slot:trigger>
        <x-markas.button variant="danger">Hapus</x-markas.button>
    </x-slot:trigger>

    Proyek dan semua datanya akan dihapus permanen.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="batal">Batal</x-markas.button>
        <x-markas.button variant="danger" type="submit" value="hapus">Ya, hapus</x-markas.button>
    </x-slot:footer>
</x-markas.modal>
```

Butuh Alpine.js. Livewire 3 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Modal } from "@/components/markas/Modal";

<Modal
  title="Hapus proyek?"
  closeLabel="Tutup"
  trigger={<Button variant="danger">Hapus</Button>}
  footer={
    <>
      <Button variant="secondary" type="submit" value="batal">
        Batal
      </Button>
      <Button variant="danger" type="submit" value="hapus">
        Ya, hapus
      </Button>
    </>
  }
  onClose={(e) => console.log(e.currentTarget.returnValue)}
>
  Proyek dan semua datanya akan dihapus permanen.
</Modal>;
```

## Vue

```vue
<template>
  <Modal title="Hapus proyek?" close-label="Tutup">
    <template #trigger>
      <Button variant="danger">Hapus</Button>
    </template>

    Proyek dan semua datanya akan dihapus permanen.

    <template #footer>
      <Button variant="secondary" type="submit" value="batal">Batal</Button>
      <Button variant="danger" type="submit" value="hapus">Ya, hapus</Button>
    </template>
  </Modal>
</template>
```

## Catatan

- Nilai `value` tombol yang dipakai menutup modal tersedia di `dialog.returnValue` saat event `close`.
- Untuk membuka modal dari kode, panggil `document.getElementById(id).showModal()`.
- Label tombol tutup default dalam bahasa Inggris ("Close"). Isi `closeLabel` (Blade: `close-label`) dengan "Tutup" untuk situs berbahasa Indonesia.
