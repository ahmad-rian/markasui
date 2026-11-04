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

## Catatan

- Atribut tambahan (`class`, `disabled`, `aria-*`) jatuh ke `<fieldset>`. `disabled` di fieldset menonaktifkan semua radio sekaligus.
- Value opsi dipakai sebagai bagian id, jadi pakai huruf kecil, angka, tanda hubung, atau underscore saja.
- Pakai `orientation="horizontal"` untuk opsi pendek yang berjajar.
