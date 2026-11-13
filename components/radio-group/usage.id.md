## Blade

```blade
<x-markas.radio-group
    name="paket"
    label="Paket langganan"
    :value="old('paket', 'pro')"
    :options="[
        ['value' => 'gratis', 'label' => 'Gratis', 'description' => 'Untuk proyek pribadi.'],
        ['value' => 'pro', 'label' => 'Pro'],
    ]"
/>
```

## React

```tsx
import { RadioGroup } from "@/components/markas/RadioGroup";

<RadioGroup
  name="paket"
  label="Paket langganan"
  defaultValue="pro"
  onValueChange={(value) => console.log(value)}
  options={[
    { value: "gratis", label: "Gratis", description: "Untuk proyek pribadi." },
    { value: "pro", label: "Pro" },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "@/components/markas/RadioGroup.vue";

const paket = ref("pro");
</script>

<template>
  <RadioGroup
    v-model="paket"
    name="paket"
    label="Paket langganan"
    :options="[
      {
        value: 'gratis',
        label: 'Gratis',
        description: 'Untuk proyek pribadi.',
      },
      { value: 'pro', label: 'Pro' },
    ]"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import RadioGroup from "$lib/components/markas/RadioGroup.svelte";

  let plan = $state("pro");
</script>

<RadioGroup
  bind:value={plan}
  name="plan"
  label="Paket langganan"
  options={[
    { value: "free", label: "Gratis", description: "Untuk proyek pribadi." },
    { value: "pro", label: "Pro" },
  ]}
/>
```

## Astro

```astro
---
import RadioGroup from "@/components/markas/RadioGroup.astro";
---

<RadioGroup
  name="plan"
  label="Paket langganan"
  value="pro"
  options={[
    { value: "free", label: "Gratis", description: "Untuk proyek pribadi." },
    { value: "pro", label: "Pro" },
  ]}
/>
```

Tanpa script klien: opsinya radio native.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { RadioGroup } from "./markas/radio-group.component";

@Component({
  selector: "app-tagihan",
  imports: [RadioGroup],
  template: `
    <markas-radio-group
      [(value)]="plan"
      name="plan"
      label="Paket langganan"
      [options]="plans"
    />
  `,
})
export class Tagihan {
  readonly plan = signal<string | undefined>("pro");
  readonly plans = [
    { value: "free", label: "Gratis", description: "Untuk proyek pribadi." },
    { value: "pro", label: "Pro" },
  ];
}
```

## Catatan

- Atribut tambahan (`class`, `disabled`, `aria-*`) jatuh ke `<fieldset>`. `disabled` di fieldset menonaktifkan semua radio sekaligus.
- Value opsi dipakai sebagai bagian id, jadi pakai huruf kecil, angka, tanda hubung, atau underscore saja.
- Pakai `orientation="horizontal"` untuk opsi pendek yang berjajar.
- Komponen ini tidak punya teks bawaan. Cukup isi `label` serta `label` dan `description` tiap opsi dalam Bahasa Indonesia.
