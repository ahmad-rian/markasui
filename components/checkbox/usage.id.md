## Blade

```blade
<x-markas.checkbox name="syarat" label="Saya setuju dengan syarat layanan" required />
<x-markas.checkbox name="kabar" label="Kirimi saya kabar terbaru" description="Paling banyak satu email per bulan." :checked="old('kabar')" />
```

## React

```tsx
import { Checkbox } from "@/components/markas/Checkbox";

<Checkbox name="syarat" label="Saya setuju dengan syarat layanan" required />
<Checkbox
  name="kabar"
  label="Kirimi saya kabar terbaru"
  description="Paling banyak satu email per bulan."
  defaultChecked
/>
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "@/components/markas/Checkbox.vue";

const kabar = ref(false);
</script>

<template>
  <Checkbox
    v-model="kabar"
    name="kabar"
    label="Kirimi saya kabar terbaru"
    description="Paling banyak satu email per bulan."
  />
</template>
```

## Catatan

- Atribut tambahan (`name`, `value`, `required`, `class`) diteruskan ke elemen `<input>`.
- Tampilan tercentang memakai CSS `:checked` (varian `checked:` dan `peer-checked:`), bukan `data-state`, sehingga tetap benar tanpa JavaScript.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` dan `description` dalam Bahasa Indonesia.
