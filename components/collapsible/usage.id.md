## Blade

```blade
<x-markas.collapsible title="Tampilkan detail pesanan">
    Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</x-markas.collapsible>
```

Tidak butuh Alpine.js. Pakai slot `title` untuk isi kaya: `<x-slot:title>Tampilkan <strong>3</strong> lagi</x-slot:title>`.

## React

```tsx
import { Collapsible } from "@/components/markas/Collapsible";

<Collapsible title="Tampilkan detail pesanan" open>
  Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</Collapsible>;
```

## Vue

```vue
<template>
  <Collapsible title="Tampilkan detail pesanan">
    Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
  </Collapsible>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Collapsible from "$lib/components/markas/Collapsible.svelte";

  let open = $state(false);
</script>

<Collapsible title="Tampilkan detail pesanan" bind:open>
  Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</Collapsible>
```

Untuk isi kaya, kirim snippet sebagai ganti string: `{#snippet title()}Tampilkan <strong>3</strong> lagi{/snippet}`.

## Astro

```astro
---
import Collapsible from "@/components/markas/Collapsible.astro";
---

<Collapsible title="Tampilkan detail pesanan">
  Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
</Collapsible>
```

Tidak ada JavaScript yang dikirim. Pakai slot `title` untuk isi kaya: `<Fragment slot="title">Tampilkan <strong>3</strong> lagi</Fragment>`.

## Angular

```ts
import { Component } from "@angular/core";
import { Collapsible } from "./markas/collapsible.component";

@Component({
  selector: "app-pesanan",
  imports: [Collapsible],
  template: `
    <details markas-collapsible title="Tampilkan detail pesanan">
      Dikirim dari Jakarta pada 4 November. Nomor resi JKT-2210-884.
    </details>
  `,
})
export class Pesanan {}
```

Komponen dipasang langsung di `details` native, jadi `open`, `class`, dan `(toggle)` langsung berlaku. Untuk isi kaya tambahkan `<ng-container title>Tampilkan <strong>3</strong> lagi</ng-container>`.

## Catatan

- Dibangun di atas `details` dan `summary`, jadi berfungsi tanpa JavaScript dan browser yang menangani keyboard serta status pembaca layar.
- `open` hanya mengatur keadaan awal. Dengarkan event native `toggle` untuk menanggapi perubahan.
- Untuk beberapa bagian terkait yang hanya boleh terbuka satu, pakai Accordion.
