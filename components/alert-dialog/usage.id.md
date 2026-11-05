## Blade

```blade
<x-markas.alert-dialog title="Hapus akun Anda?" variant="danger" cancel-label="Batal" action-label="Hapus akun" x-on:markas-action="hapusAkun()">
    <x-slot:trigger>
        <x-markas.button variant="danger">Hapus akun</x-markas.button>
    </x-slot:trigger>

    Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
</x-markas.alert-dialog>
```

Butuh Alpine.js. Livewire 3 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

## React

```tsx
import { AlertDialog } from "@/components/markas/AlertDialog";
import { Button } from "@/components/markas/Button";

<AlertDialog
  title="Hapus akun Anda?"
  variant="danger"
  cancelLabel="Batal"
  actionLabel="Hapus akun"
  trigger={<Button variant="danger">Hapus akun</Button>}
  onAction={() => hapusAkun()}
  onCancel={() => console.log("batal")}
>
  Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
</AlertDialog>;
```

## Vue

```vue
<template>
  <AlertDialog
    title="Hapus akun Anda?"
    variant="danger"
    cancel-label="Batal"
    action-label="Hapus akun"
    @action="hapusAkun"
  >
    <template #trigger>
      <Button variant="danger">Hapus akun</Button>
    </template>

    Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
  </AlertDialog>
</template>
```

## Catatan

- Berbeda dengan Modal, klik backdrop tidak menutup dialog. User wajib memilih batal atau aksi; Escape dihitung sebagai batal.
- Fokus awal ada di tombol batal.
- `dialog.returnValue` berisi `action` atau `cancel` saat event `close`.
- Teks tombol default dalam bahasa Inggris ("Cancel" dan "Continue"). Isi `cancelLabel` dan `actionLabel` (Blade: `cancel-label`, `action-label`) untuk situs berbahasa Indonesia.
