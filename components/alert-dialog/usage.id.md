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

## Svelte

```svelte
<script lang="ts">
  import AlertDialog from "$lib/components/markas/AlertDialog.svelte";
  import Button from "$lib/components/markas/Button.svelte";
</script>

<AlertDialog
  title="Hapus akun Anda?"
  variant="danger"
  cancelLabel="Batal"
  actionLabel="Hapus akun"
  onaction={hapusAkun}
>
  {#snippet trigger()}
    <Button variant="danger">Hapus akun</Button>
  {/snippet}

  Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
</AlertDialog>
```

## Astro

```astro
---
import AlertDialog from "@/components/markas/AlertDialog.astro";
import Button from "@/components/markas/Button.astro";
---

<AlertDialog
  title="Hapus akun Anda?"
  variant="danger"
  cancelLabel="Batal"
  actionLabel="Hapus akun"
>
  <Button slot="trigger" variant="danger">Hapus akun</Button>

  Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
</AlertDialog>
```

Satu script kecil yang dibundel Astro membuka semua alert dialog di halaman dan memancarkan event `markas-action` atau `markas-cancel` (bubbling) dari dialog saat tertutup.

## Angular

```ts
import { Component } from "@angular/core";
import { AlertDialog } from "./markas/alert-dialog.component";
import { Button } from "./markas/button.component";

@Component({
  selector: "app-hapus-akun",
  imports: [AlertDialog, Button],
  template: `
    <markas-alert-dialog
      title="Hapus akun Anda?"
      variant="danger"
      cancelLabel="Batal"
      actionLabel="Hapus akun"
      (action)="hapusAkun()"
    >
      <button markas-button trigger variant="danger">Hapus akun</button>

      Semua proyek dan invoice akan dihapus. Aksi ini tidak bisa dibatalkan.
    </markas-alert-dialog>
  `,
})
export class HapusAkun {
  hapusAkun() {}
}
```

## Catatan

- Berbeda dengan Modal, klik backdrop tidak menutup dialog. User wajib memilih batal atau aksi; Escape dihitung sebagai batal.
- Fokus awal ada di tombol batal.
- `dialog.returnValue` berisi `action` atau `cancel` saat event `close`.
- Teks tombol default dalam bahasa Inggris ("Cancel" dan "Continue"). Isi `cancelLabel` dan `actionLabel` (Blade: `cancel-label`, `action-label`) untuk situs berbahasa Indonesia.
