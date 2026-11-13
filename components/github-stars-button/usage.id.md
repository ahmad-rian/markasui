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

## Svelte

```svelte
<script lang="ts">
  import GithubStarsButton from "$lib/components/markas/GithubStarsButton.svelte";
</script>

<GithubStarsButton
  href="https://github.com/markasui/markasui"
  stars={12480}
  starsLabel={"{count} bintang"}
>
  Beri bintang
</GithubStarsButton>
```

## Astro

```astro
---
import GithubStarsButton from "@/components/markas/GithubStarsButton.astro";
---

<GithubStarsButton
  href="https://github.com/markasui/markasui"
  stars={12480}
  starsLabel="{count} bintang"
>
  Beri bintang
</GithubStarsButton>
```

## Angular

```ts
import { Component } from "@angular/core";
import { GithubStarsButton } from "./markas/github-stars-button.component";

@Component({
  selector: "app-repo",
  imports: [GithubStarsButton],
  template: `
    <a
      markas-github-stars-button
      href="https://github.com/markasui/markasui"
      [stars]="12480"
      starsLabel="{{ '{' }}count} bintang"
    >
      Beri bintang
    </a>
  `,
})
export class Repo {}
```

Angular memakai attribute selector pada link native, jadi `target`, `rel`, dan `aria-*` tetap di link itu. Di template Angular, `{` ditulis sebagai `{{ '{' }}`.

## Catatan

- Komponen tidak pernah memanggil API GitHub. Ambil jumlahnya saat build atau di server lalu kirim lewat prop.
- Angka yang tampil ringkas (980, 12.5k, 1.2M). `{count}` di `starsLabel` diganti angka lengkap dengan pemisah ribuan.
- Hitungan naik mulai saat tautan pertama kali terlihat. Blade butuh Alpine.js untuk animasinya dan tetap menampilkan angka akhir tanpa Alpine.
