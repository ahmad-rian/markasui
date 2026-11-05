## Blade

```blade
<x-markas.toggle aria-label="Tebal" pressed>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg>
</x-markas.toggle>
<x-markas.toggle variant="outline">Tandai</x-markas.toggle>
```

Butuh Alpine.js.

## React

```tsx
import { Toggle } from "@/components/markas/Toggle";

<Toggle aria-label="Tebal" defaultPressed onPressedChange={setTebal}>
  <BoldIcon aria-hidden="true" />
</Toggle>;
<Toggle variant="outline">Tandai</Toggle>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Toggle from "@/components/markas/Toggle.vue";

const tebal = ref(true);
</script>

<template>
  <Toggle v-model="tebal" aria-label="Tebal">
    <BoldIcon aria-hidden="true" />
  </Toggle>
  <Toggle variant="outline">Tandai</Toggle>
</template>
```

## Catatan

- Toggle adalah `<button aria-pressed>`. Tampilannya mengikuti `data-state="on"` atau `"off"`.
- Ikon di dalamnya otomatis berukuran `size-4`. Toggle yang hanya berisi ikon wajib diberi `aria-label`.
- Komponen ini tidak punya teks bawaan. Cukup isi konten dan `aria-label` dalam Bahasa Indonesia.
