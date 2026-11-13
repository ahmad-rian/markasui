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

## Svelte

```svelte
<script lang="ts">
  import Avatar from "$lib/components/markas/Avatar.svelte";
</script>

<Avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
<Avatar name="Budi Santoso" />
```

## Astro

```astro
---
import Avatar from "@/components/markas/Avatar.astro";
---

<Avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
<Avatar name="Budi Santoso" />
```

Script kecil yang dibundel mengganti gambar yang gagal dimuat dengan inisial.

## Angular

```ts
import { Component } from "@angular/core";
import { Avatar } from "./markas/avatar.component";

@Component({
  selector: "app-example",
  imports: [Avatar],
  template: `
    <markas-avatar name="Dewi Lestari" src="/avatars/dewi.jpg" size="lg" />
    <markas-avatar name="Budi Santoso" />
  `,
})
export class Example {}
```

## Catatan

- Inisial diambil dari huruf pertama kata pertama dan terakhir: `Budi Santoso` menjadi `BS`, `ani` menjadi `A`. Fungsi `getInitials` diekspor dari versi React dan Vue.
- Atribut tambahan (`loading`, `width`, `data-*`) jatuh ke `<img>`. Elemen fallback hanya menerima `class`.
- Di Blade, gambar yang sudah gagal sebelum Alpine aktif tetap terdeteksi lewat `x-init` (memeriksa `complete` dan `naturalWidth`).
- Avatar tidak punya teks bawaan. Nama aksesibel berasal dari `name` atau `alt`, jadi isi keduanya dalam Bahasa Indonesia bila perlu, misalnya `alt="Foto Budi"`.
