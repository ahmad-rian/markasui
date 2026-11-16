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

Butuh Alpine.js. Livewire 3 dan 4 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

### Livewire

```blade
<x-markas.modal title="Edit profile" wire:model="showEdit">
    ...
</x-markas.modal>
```

`wire:model` terhubung ke status terbuka: set `$showEdit = true` di action untuk membuka dialog, `false` untuk menutup. Menutup dengan Escape, tombol tutup, atau backdrop mengembalikannya ke `false`. Dialog tetap terbuka saat komponen dirender ulang.

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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Modal from "$lib/components/markas/Modal.svelte";
</script>

<Modal title="Hapus proyek?" closeLabel="Tutup">
  {#snippet trigger()}
    <Button variant="danger">Hapus</Button>
  {/snippet}

  Proyek dan semua datanya akan dihapus permanen.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="batal">Batal</Button>
    <Button variant="danger" type="submit" value="hapus">Ya, hapus</Button>
  {/snippet}
</Modal>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Modal from "@/components/markas/Modal.astro";
---

<Modal title="Hapus proyek?" closeLabel="Tutup">
  <Button slot="trigger" variant="danger">Hapus</Button>

  Proyek dan semua datanya akan dihapus permanen.

  <Fragment slot="footer">
    <Button variant="secondary" type="submit" value="batal">Batal</Button>
    <Button variant="danger" type="submit" value="hapus">Ya, hapus</Button>
  </Fragment>
</Modal>
```

Satu script kecil yang dibundel Astro membuka semua modal di halaman, termasuk setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Modal } from "./markas/modal.component";

@Component({
  selector: "app-zona-bahaya",
  imports: [Button, Modal],
  template: `
    <markas-modal title="Hapus proyek?" closeLabel="Tutup">
      <button markas-button trigger variant="danger">Hapus</button>

      Proyek dan semua datanya akan dihapus permanen.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="batal">
          Batal
        </button>
        <button markas-button variant="danger" type="submit" value="hapus">
          Ya, hapus
        </button>
      </ng-container>
    </markas-modal>
  `,
})
export class ZonaBahaya {}
```

## Catatan

- Nilai `value` tombol yang dipakai menutup modal tersedia di `dialog.returnValue` saat event `close`.
- Untuk membuka modal dari kode, panggil `document.getElementById(id).showModal()`.
- Label tombol tutup default dalam bahasa Inggris ("Close"). Isi `closeLabel` (Blade: `close-label`) dengan "Tutup" untuk situs berbahasa Indonesia.
