## Blade

```blade
<p>Jaga teks isi di <x-markas.text-highlighter>45 sampai 75 karakter</x-markas.text-highlighter> per baris, dengan <x-markas.text-highlighter variant="marker" :delay="400">tinggi baris sekitar 1,5</x-markas.text-highlighter>.</p>

<a href="/docs"><x-markas.text-highlighter trigger="hover" direction="rtl" color="success">Baca dokumentasi</x-markas.text-highlighter></a>

<div x-data>
    <x-markas.text-highlighter trigger="manual">Siap terbit</x-markas.text-highlighter>
    <button type="button" x-on:click="$dispatch('markas-highlight', { direction: 'ltr' })">Sorot</button>
    <button type="button" x-on:click="$dispatch('markas-highlight-reset')">Ulang</button>
</div>
```

## React

```tsx
import { useRef } from "react";
import {
  TextHighlighter,
  type TextHighlighterHandle,
} from "@/components/markas/TextHighlighter";

const highlight = useRef<TextHighlighterHandle>(null);

<p>
  Jaga teks isi di <TextHighlighter>45 sampai 75 karakter</TextHighlighter> per
  baris, dengan{" "}
  <TextHighlighter variant="marker" delay={400}>
    tinggi baris sekitar 1,5
  </TextHighlighter>
  .
</p>

<TextHighlighter ref={highlight} trigger="manual">Siap terbit</TextHighlighter>
<button type="button" onClick={() => highlight.current?.animate("rtl")}>Sorot</button>
<button type="button" onClick={() => highlight.current?.reset()}>Ulang</button>
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import TextHighlighter from "@/components/markas/TextHighlighter.vue";

const active = ref(false);
</script>

<template>
  <p>
    Jaga teks isi di
    <TextHighlighter>45 sampai 75 karakter</TextHighlighter> per baris, dengan
    <TextHighlighter variant="marker" :delay="400"
      >tinggi baris sekitar 1,5</TextHighlighter
    >.
  </p>
  <TextHighlighter trigger="manual" :active="active"
    >Siap terbit</TextHighlighter
  >
  <button type="button" @click="active = !active">Ganti</button>
</template>
```

## Catatan

- Sorotan adalah gradien latar yang tumbuh lewat transisi CSS `background-size`, sehingga ikut terpotong rapi di setiap baris (`box-decoration-break: clone`).
- `trigger="view"` memakai IntersectionObserver dengan `once` dan `threshold`; `hover` mendengar link, tombol, label, atau elemen ber-`tabindex` terdekat, sehingga fokus keyboard juga menggambar sorotan.
- Untuk `trigger="manual"`, React dan Vue mengekspos `animate(direction?)` dan `reset()` lewat ref. Blade mendengar event window `markas-highlight` (dengan `direction` opsional di detail) dan `markas-highlight-reset`, dan `Alpine.$data(el)` mengekspos dua method yang sama.
- `duration` dan `delay` dipasang sebagai `transition-duration` dan `transition-delay` pada elemen. Beri setiap frasa `delay` yang lebih besar untuk menyorot paragraf sesuai urutan baca.
- Dengan reduced motion, sorotan `view` dan `auto` langsung tampil, dan setiap perubahan terjadi tanpa transisi.
