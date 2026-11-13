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

## Svelte

```svelte
<script lang="ts">
  import Checkbox from "$lib/components/markas/Checkbox.svelte";

  let updates = $state(false);
</script>

<Checkbox
  bind:checked={updates}
  name="updates"
  label="Kirimi saya kabar produk"
  description="Paling banyak satu email per bulan."
/>
```

## Astro

```astro
---
import Checkbox from "@/components/markas/Checkbox.astro";
---

<Checkbox name="terms" label="Saya setuju dengan ketentuan layanan" required />
<Checkbox name="updates" label="Kirimi saya kabar produk" description="Paling banyak satu email per bulan." checked />
```

Tanpa script klien: checkbox-nya input native.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Checkbox } from "./markas/checkbox.component";

@Component({
  selector: "app-preferences",
  imports: [Checkbox],
  template: `
    <markas-checkbox
      [(checked)]="updates"
      name="updates"
      label="Kirimi saya kabar produk"
      description="Paling banyak satu email per bulan."
    />
  `,
})
export class Preferences {
  readonly updates = signal(false);
}
```

## Catatan

- Atribut tambahan (`name`, `value`, `required`, `class`) diteruskan ke elemen `<input>`.
- Tampilan tercentang memakai CSS `:checked` (varian `checked:` dan `peer-checked:`), bukan `data-state`, sehingga tetap benar tanpa JavaScript.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` dan `description` dalam Bahasa Indonesia.
