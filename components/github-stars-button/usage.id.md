## Blade

```blade
<x-markas.github-stars-button href="https://github.com/markasui/markasui" :stars="12480" stars-label="{count} bintang">Beri bintang</x-markas.github-stars-button>
```

## React

```tsx
import { GithubStarsButton } from "@/components/markas/GithubStarsButton";

<GithubStarsButton
  href="https://github.com/markasui/markasui"
  stars={12480}
  starsLabel="{count} bintang"
>
  Beri bintang
</GithubStarsButton>;
```

## Vue

```vue
<script setup lang="ts">
import GithubStarsButton from "@/components/markas/GithubStarsButton.vue";
</script>

<template>
  <GithubStarsButton
    href="https://github.com/markasui/markasui"
    :stars="12480"
    stars-label="{count} bintang"
  >
    Beri bintang
  </GithubStarsButton>
</template>
```

## Catatan

- Komponen tidak pernah memanggil API GitHub. Ambil jumlahnya saat build atau di server lalu kirim lewat prop.
- Angka yang tampil ringkas (980, 12.5k, 1.2M). `{count}` di `starsLabel` diganti angka lengkap dengan pemisah ribuan.
- Hitungan naik mulai saat tautan pertama kali terlihat. Blade butuh Alpine.js untuk animasinya dan tetap menampilkan angka akhir tanpa Alpine.
