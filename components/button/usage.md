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

## Catatan

- Default `type="button"`. Isi `type="submit"` untuk tombol kirim form.
- Class tambahan digabung di akhir. Karena tanpa `tailwind-merge`, class yang bentrok (misalnya dua warna latar) bergantung pada urutan CSS Tailwind, jadi utamakan prop `variant` dan `size`.
