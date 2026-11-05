## Blade

```blade
<x-markas.toggle-group
    label="Tampilan kalender"
    value="minggu"
    :items="[
        ['value' => 'hari', 'label' => 'Hari'],
        ['value' => 'minggu', 'label' => 'Minggu'],
        ['value' => 'bulan', 'label' => 'Bulan'],
    ]"
/>
```

Butuh Alpine.js. Ganti label dengan ikon lewat slot bernama sesuai value, misalnya `<x-slot:kiri>`, dan isi `ariaLabel` di item tersebut.

## React

```tsx
import { ToggleGroup } from "@/components/markas/ToggleGroup";

<ToggleGroup
  label="Tampilan kalender"
  defaultValue="minggu"
  onValueChange={(value) => console.log(value)}
  items={[
    { value: "hari", label: "Hari" },
    { value: "minggu", label: "Minggu" },
    { value: "bulan", label: "Bulan" },
  ]}
/>;

<ToggleGroup
  type="multiple"
  label="Gaya teks"
  defaultValue={["tebal"]}
  items={[
    {
      value: "tebal",
      label: <BoldIcon aria-hidden="true" />,
      ariaLabel: "Tebal",
    },
    {
      value: "miring",
      label: <ItalicIcon aria-hidden="true" />,
      ariaLabel: "Miring",
    },
  ]}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import ToggleGroup from "@/components/markas/ToggleGroup.vue";

const tampilan = ref("minggu");
</script>

<template>
  <ToggleGroup
    v-model="tampilan"
    label="Tampilan kalender"
    :items="[
      { value: 'hari', label: 'Hari' },
      { value: 'minggu', label: 'Minggu' },
      { value: 'bulan', label: 'Bulan' },
    ]"
  />
</template>
```

## Catatan

- Single menghasilkan string, kosong kalau item yang ditekan diklik lagi. Multiple menghasilkan array urut sesuai item.
- Value menjadi nama slot di Blade dan Vue, jadi pakai hanya huruf kecil, angka, atau garis bawah.
- Komponen ini tidak punya teks bawaan. Isi `label` dan label item dalam Bahasa Indonesia.
