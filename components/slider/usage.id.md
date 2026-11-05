## Blade

```blade
<x-markas.slider name="volume" label="Volume" :value="60" />
<x-markas.slider name="anggaran" label="Anggaran" :min="0" :max="500" :step="25" :value="250" />
```

Butuh Alpine.js untuk memperbarui isian dan nilai saat digeser.

## React

```tsx
import { Slider } from "@/components/markas/Slider";

<Slider
  name="volume"
  label="Volume"
  defaultValue={60}
  onValueChange={(value) => console.log(value)}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Slider from "@/components/markas/Slider.vue";

const volume = ref(60);
</script>

<template>
  <Slider v-model="volume" name="volume" label="Volume" />
</template>
```

## Catatan

- Slider adalah `<input type="range">`, jadi nilainya ikut terkirim bersama form dan keyboard bekerja secara native.
- Isian berasal dari variabel CSS `--value` (persentase) yang diperbarui komponen setiap kali digeser.
- Tanpa label yang terlihat, isi `aria-label` dan matikan `showValue` kalau angkanya tidak perlu.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` dalam Bahasa Indonesia.
