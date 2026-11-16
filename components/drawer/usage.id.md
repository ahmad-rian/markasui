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

Butuh Alpine.js. Livewire 3 dan 4 sudah membawa Alpine, jadi tidak perlu dipasang lagi.

### Livewire

```blade
<x-markas.drawer title="Filters" wire:model="showFilters">
    ...
</x-markas.drawer>
```

`wire:model` terhubung ke status terbuka, sama seperti modal. Menutup drawer mengembalikan properti ke `false`.

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

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Drawer from "$lib/components/markas/Drawer.svelte";
</script>

<Drawer title="Filter produk" closeLabel="Tutup">
  {#snippet trigger()}
    <Button variant="secondary">Buka filter</Button>
  {/snippet}

  Pilih kategori dan rentang harga untuk menyaring daftar produk.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="cancel">Batal</Button>
    <Button type="submit" value="apply">Terapkan</Button>
  {/snippet}
</Drawer>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Drawer from "@/components/markas/Drawer.astro";
---

<Drawer title="Filter produk" closeLabel="Tutup">
  <Button slot="trigger" variant="secondary">Buka filter</Button>

  Pilih kategori dan rentang harga untuk menyaring daftar produk.

  <Fragment slot="footer">
    <Button variant="secondary" type="submit" value="cancel">Batal</Button>
    <Button type="submit" value="apply">Terapkan</Button>
  </Fragment>
</Drawer>
```

Satu script kecil yang dibundel Astro membuka semua drawer di halaman, termasuk setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Drawer } from "./markas/drawer.component";

@Component({
  selector: "app-filters",
  imports: [Button, Drawer],
  template: `
    <markas-drawer
      title="Filter produk"
      closeLabel="Tutup"
      (closed)="onClosed()"
    >
      <button markas-button trigger variant="secondary">Buka filter</button>

      Pilih kategori dan rentang harga untuk menyaring daftar produk.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="cancel">
          Batal
        </button>
        <button markas-button type="submit" value="apply">Terapkan</button>
      </ng-container>
    </markas-drawer>
  `,
})
export class Filter {
  onClosed() {}
}
```

## Catatan

- Pakai `side="left"` untuk drawer dari sisi kiri.
- Nilai `value` tombol yang dipakai menutup drawer tersedia di `dialog.returnValue` saat event `close`.
- Label tombol tutup default dalam bahasa Inggris ("Close"). Isi `closeLabel` (Blade: `close-label`) dengan "Tutup" untuk situs berbahasa Indonesia.
