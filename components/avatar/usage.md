## Blade

```blade
<x-markas.avatar name="Budi Santoso" size="sm" />
<x-markas.avatar name="Siti Aminah" :src="$user->photo_url" />
<x-markas.avatar name="Dewi Lestari" src="/img/dewi.jpg" size="lg" alt="" />
```

Fallback saat gambar gagal dimuat butuh Alpine.js. Livewire 3 sudah membawa Alpine. Tanpa `src`, inisial dirender tanpa JavaScript.

## React

```tsx
import { Avatar } from "@/components/markas/Avatar";

<Avatar name="Budi Santoso" size="sm" />
<Avatar name="Siti Aminah" src={user.photoUrl} />
<Avatar name="Dewi Lestari" src="/img/dewi.jpg" size="lg" alt="" />
```

## Vue

```vue
<script setup lang="ts">
import Avatar from "@/components/markas/Avatar.vue";
</script>

<template>
  <Avatar name="Budi Santoso" size="sm" />
  <Avatar name="Siti Aminah" :src="user.photoUrl" />
  <Avatar name="Dewi Lestari" src="/img/dewi.jpg" size="lg" alt="" />
</template>
```

## Catatan

- Inisial diambil dari huruf pertama kata pertama dan terakhir: `Budi Santoso` menjadi `BS`, `ani` menjadi `A`. Fungsi `getInitials` diekspor dari versi React dan Vue.
- Atribut tambahan (`loading`, `width`, `data-*`) jatuh ke `<img>`. Elemen fallback hanya menerima `class`.
- Di Blade, gambar yang sudah gagal sebelum Alpine aktif tetap terdeteksi lewat `x-init` (memeriksa `complete` dan `naturalWidth`).
