## Blade

```blade
<p class="text-6xl">
    <x-markas.variable-weight-text text="Kedekatan" :radius="100" :min="200" :max="900" />
</p>
<x-markas.variable-weight-text text="markasui" wave class="text-7xl" />
```

## React

```tsx
import { VariableWeightText } from "@/components/markas/VariableWeightText";

<p className="text-6xl">
  <VariableWeightText text="Kedekatan" radius={100} min={200} max={900} />
</p>
<VariableWeightText text="markasui" wave className="text-7xl" />
```

## Vue

```vue
<template>
  <p class="text-6xl">
    <VariableWeightText text="Kedekatan" :radius="100" :min="200" :max="900" />
  </p>
  <VariableWeightText text="markasui" wave class="text-7xl" />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import VariableWeightText from "$lib/components/markas/VariableWeightText.svelte";
</script>

<p class="text-6xl">
  <VariableWeightText text="Kedekatan" radius={100} min={200} max={900} />
</p>
<VariableWeightText text="markasui" wave class="text-7xl" />
```

## Astro

```astro
---
import VariableWeightText from "@/components/markas/VariableWeightText.astro";
---

<p class="text-6xl">
  <VariableWeightText text="Kedekatan" radius={100} min={200} max={900} />
</p>
<VariableWeightText text="markasui" wave class="text-7xl" />
```

## Angular

```ts
import { Component } from "@angular/core";
import { VariableWeightText } from "./markas/variable-weight-text.component";

@Component({
  selector: "app-wordmark",
  imports: [VariableWeightText],
  template: `
    <p class="text-6xl">
      <span
        markas-variable-weight-text
        text="Kedekatan"
        radius="100"
        min="200"
        max="900"
      ></span>
    </p>
    <span
      markas-variable-weight-text
      text="markasui"
      wave
      class="text-7xl"
    ></span>
  `,
})
export class Wordmark {}
```

Angular memakai attribute selector pada span: `<span markas-variable-weight-text>`.

## Catatan

- Butuh font variabel dengan sumbu `wght`, misalnya Inter, Geist, Recursive, atau font sistem di macOS dan iOS. Dengan font statis, berat melompat di antara berat yang dimuat.
- Setiap huruf memasang `font-variation-settings: 'wght' n` dan `font-weight` sebagai cadangan. Huruf di bawah kursor mendapat `max`; huruf di luar `radius` kembali ke `min`, yang juga berat saat diam.
- `wave` menjalankan gelombang berat yang bernapas selama kursor jauh. Berhenti saat teks di luar layar dan saat tab tersembunyi.
- Screen reader membaca teks sekali. Dengan reduced motion, huruf tetap di `min`. Versi Blade butuh Alpine.js.
