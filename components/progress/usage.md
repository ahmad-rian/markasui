## Blade

```blade
<x-markas.progress label="Mengunggah berkas" :value="60" />
<x-markas.progress label="Penyimpanan terpakai" :value="3" :max="4" />
<x-markas.progress label="Menyiapkan laporan" />
```

## React

```tsx
import { Progress } from "@/components/markas/Progress";

<Progress label="Mengunggah berkas" value={60} />
<Progress label="Penyimpanan terpakai" value={3} max={4} />
<Progress label="Menyiapkan laporan" />
```

## Vue

```vue
<script setup lang="ts">
import Progress from "@/components/markas/Progress.vue";
</script>

<template>
  <Progress label="Mengunggah berkas" :value="60" />
  <Progress label="Penyimpanan terpakai" :value="3" :max="4" />
  <Progress label="Menyiapkan laporan" />
</template>
```

## Catatan

- Tanpa `value`, progress menjadi tak tentu dan berdenyut. Animasi mati saat `prefers-reduced-motion`.
- Tanpa `label`, isi `aria-label` supaya progress punya nama.
- Persentase dibulatkan dan dibatasi 0 sampai 100.
