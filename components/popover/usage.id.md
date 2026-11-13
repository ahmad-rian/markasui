## Blade

```blade
<x-markas.popover label="Bagikan">
    <div class="grid gap-3">
        <p class="text-muted">Siapa pun yang punya link bisa melihat proyek ini.</p>
        <x-markas.button size="sm">Salin link</x-markas.button>
    </div>
</x-markas.popover>
```

Butuh Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { Popover } from "@/components/markas/Popover";

<Popover label="Bagikan" align="end">
  <div className="grid gap-3">
    <p className="text-muted">
      Siapa pun yang punya link bisa melihat proyek ini.
    </p>
    <Button size="sm">Salin link</Button>
  </div>
</Popover>;
```

## Vue

```vue
<template>
  <Popover label="Bagikan" side="top">
    <div class="grid gap-3">
      <p class="text-muted">
        Siapa pun yang punya link bisa melihat proyek ini.
      </p>
      <Button size="sm">Salin link</Button>
    </div>
  </Popover>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import Popover from "$lib/components/markas/Popover.svelte";
</script>

<Popover label="Bagikan" align="end">
  <div class="grid gap-3">
    <p class="text-muted">Siapa pun yang punya link bisa melihat proyek ini.</p>
    <Button size="sm">Salin link</Button>
  </div>
</Popover>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import Popover from "@/components/markas/Popover.astro";
---

<Popover label="Bagikan" align="end">
  <div class="grid gap-3">
    <p class="text-muted">Siapa pun yang punya link bisa melihat proyek ini.</p>
    <Button size="sm">Salin link</Button>
  </div>
</Popover>
```

Satu script kecil yang dibundel menempatkan semua popover di halaman. Tetap jalan setelah view transition.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import { Popover } from "./markas/popover.component";

@Component({
  selector: "app-share",
  imports: [Button, Popover],
  template: `
    <markas-popover label="Bagikan" align="end">
      <div class="grid gap-3">
        <p class="text-muted">
          Siapa pun yang punya link bisa melihat proyek ini.
        </p>
        <button markas-button size="sm">Salin link</button>
      </div>
    </markas-popover>
  `,
})
export class Share {}
```

Untuk pemicu ikon, taruh ikon dan teks sr-only di elemen dengan atribut `trigger`, misalnya `<ng-container trigger>`.

## Catatan

- Panel muncul di bawah pemicu, rata dengan tepi awalnya. Ubah lewat `side` (`top`, `bottom`) dan `align` (`start`, `center`, `end`).
- Pakai slot `trigger` untuk pemicu ikon dan sertakan teks sr-only, misalnya `<span class="sr-only">Pengaturan notifikasi</span>`.
- Teks pemicu default dalam bahasa Inggris ("Open"). Isi `label` dalam bahasa situs Anda, misalnya "Buka" atau "Bagikan".
