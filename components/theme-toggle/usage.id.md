## Blade

```blade
<x-markas.theme-toggle light-label="Ganti ke tema terang" dark-label="Ganti ke tema gelap" />

<x-markas.theme-toggle
    :show-text="true"
    animation="eclipse"
    light-label="Mode terang"
    dark-label="Mode gelap"
/>
```

## React

```tsx
import { ThemeToggle } from "@/components/markas/ThemeToggle";

<ThemeToggle lightLabel="Ganti ke tema terang" darkLabel="Ganti ke tema gelap" />
<ThemeToggle
  showText
  animation="eclipse"
  lightLabel="Mode terang"
  darkLabel="Mode gelap"
/>
```

## Vue

```vue
<script setup lang="ts">
import ThemeToggle from "@/components/markas/ThemeToggle.vue";
</script>

<template>
  <ThemeToggle
    light-label="Ganti ke tema terang"
    dark-label="Ganti ke tema gelap"
  />
  <ThemeToggle
    show-text
    animation="eclipse"
    light-label="Mode terang"
    dark-label="Mode gelap"
  />
</template>
```

## Catatan

- Toggle menambah atau menghapus class `dark` di `<html>`, menyimpan pilihan di localStorage (`storageKey`), dan mengirim event `markas-theme-change` di `document` dengan tema sebagai `detail`.
- Saat dimuat, toggle membaca pilihan tersimpan, lalu class `dark` yang sudah dipasang halaman, lalu `prefers-color-scheme`. Tambahkan script ini di `<head>` agar halaman tidak berkedip dengan tema yang salah:

```html
<script>
  try {
    const saved = localStorage.getItem("markas-theme");
    document.documentElement.classList.toggle(
      "dark",
      saved
        ? saved === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches,
    );
  } catch {}
</script>
```

- Animasi: `rotate`, `morph`, `flip`, `slide`, `eclipse`, `spring`. Setiap klik memutar keyframes lewat Web Animations API (hanya transform dan opacity). Pengguna dengan reduced motion mendapat pergantian langsung.
- `document.dispatchEvent(new Event("markas-theme-demo"))` memutar semua toggle bolak-balik tanpa mengganti tema, cocok untuk tombol "Play all".
- Tombol menyimpan `data-state` sendiri (light atau dark) dan mengikuti class `dark` di `<html>`, jadi beberapa toggle, atau tema yang diubah dari tempat lain, tetap selaras.
