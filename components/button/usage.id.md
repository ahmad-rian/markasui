## Blade

```blade
<x-markas.button>Simpan</x-markas.button>
<x-markas.button variant="secondary" size="sm">Batal</x-markas.button>
<x-markas.button variant="danger" type="submit">Hapus akun</x-markas.button>
```

## React

```tsx
import { Button } from "@/components/markas/Button";

<Button>Simpan</Button>
<Button variant="secondary" size="sm">Batal</Button>
<Button variant="danger" type="submit">Hapus akun</Button>
```

## Vue

```vue
<script setup lang="ts">
import Button from "@/components/markas/Button.vue";
</script>

<template>
  <Button>Simpan</Button>
  <Button variant="secondary" size="sm">Batal</Button>
  <Button variant="danger" type="submit">Hapus akun</Button>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
</script>

<Button>Simpan</Button>
<Button variant="secondary" size="sm">Batal</Button>
<Button variant="danger" type="submit">Hapus akun</Button>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
---

<Button>Simpan</Button>
<Button variant="secondary" size="sm">Batal</Button>
<Button variant="danger" type="submit">Hapus akun</Button>
```

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";

@Component({
  selector: "app-aksi",
  imports: [Button],
  template: `
    <button markas-button>Simpan</button>
    <button markas-button variant="secondary" size="sm">Batal</button>
    <button markas-button variant="danger" type="submit">Hapus akun</button>
  `,
})
export class Aksi {}
```

Angular memakai attribute selector pada button native, jadi `disabled`, `aria-*`, dan `class` tetap di button.

## Catatan

- Default `type="button"`. Isi `type="submit"` untuk tombol kirim form.
- Class tambahan digabung di akhir. Karena tanpa `tailwind-merge`, class yang bentrok (misalnya dua warna latar) bergantung pada urutan CSS Tailwind, jadi utamakan prop `variant` dan `size`.
