## Blade

```blade
<x-markas.slider name="volume" label="Volume" :value="60" />
<x-markas.slider name="anggaran" label="Anggaran" :min="0" :max="500" :step="25" :value="250" />
```

Butuh Alpine.js untuk memperbarui isian dan nilai saat digeser.

### Livewire

```blade
<x-markas.slider label="Volume" wire:model.live="volume" />
```

`wire:model` terhubung ke nilai slider lewat `x-modelable` di pembungkus, jadi label angka ikut berubah saat server mengubah nilai. Pakai `wire:model.live.debounce.300ms` agar request lebih sedikit saat menggeser. Atribut lain jatuh ke input range.

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

## Svelte

```svelte
<script lang="ts">
  import Slider from "$lib/components/markas/Slider.svelte";

  let volume = $state(60);
</script>

<Slider bind:value={volume} name="volume" label="Volume suara" />
<Slider name="budget" label="Anggaran" max={500} step={25} value={250} />
```

## Astro

```astro
---
import Slider from "@/components/markas/Slider.astro";
---

<Slider name="volume" label="Volume suara" value={60} />
```

Script kecil di halaman memperbarui isian dan angka saat digeser.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Slider } from "./markas/slider.component";

@Component({
  selector: "app-suara",
  imports: [Slider],
  template: `
    <markas-slider [(value)]="volume" name="volume" label="Volume suara" />
    <markas-slider
      name="budget"
      label="Anggaran"
      max="500"
      step="25"
      value="250"
    />
  `,
})
export class Suara {
  readonly volume = signal(60);
}
```

## Catatan

- Slider adalah `<input type="range">`, jadi nilainya ikut terkirim bersama form dan keyboard bekerja secara native.
- Isian berasal dari variabel CSS `--value` (persentase) yang diperbarui komponen setiap kali digeser.
- Tanpa label yang terlihat, isi `aria-label` dan matikan `showValue` kalau angkanya tidak perlu.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` dalam Bahasa Indonesia.
