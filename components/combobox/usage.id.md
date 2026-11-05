## Blade

```blade
<x-markas.combobox
    name="country"
    label="Negara"
    placeholder="Cari negara"
    empty-label="Tidak ada hasil"
    :value="old('country', 'id')"
    :options="[
        ['value' => 'au', 'label' => 'Australia'],
        ['value' => 'id', 'label' => 'Indonesia'],
        ['value' => 'jp', 'label' => 'Jepang'],
    ]"
    :error="$errors->first('country')"
    x-on:markas-change="console.log($event.detail)"
/>
```

Butuh Alpine.js. Mengubah pilihan memancarkan event `markas-change` dengan value di `$event.detail` (string kosong saat dikosongkan).

## React

```tsx
import { useState } from "react";
import { Combobox } from "@/components/markas/Combobox";

const [country, setCountry] = useState("id");

<Combobox
  name="country"
  label="Negara"
  placeholder="Cari negara"
  emptyLabel="Tidak ada hasil"
  options={[
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Jepang" },
  ]}
  value={country}
  onValueChange={setCountry}
/>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Combobox from "@/components/markas/Combobox.vue";

const country = ref("id");
const countries = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Jepang" },
];
</script>

<template>
  <Combobox
    v-model="country"
    name="country"
    label="Negara"
    placeholder="Cari negara"
    empty-label="Tidak ada hasil"
    :options="countries"
  />
</template>
```

## Catatan

- Atribut tambahan (`placeholder`, `required`, `disabled`, `class`) jatuh ke input teks yang terlihat. `name` dipasang di input tersembunyi berisi value terpilih, jadi form mengirim `country=id`, bukan labelnya.
- Mengetik memfilter opsi berdasarkan label dan mengosongkan value terpilih sampai opsi dipilih lagi.
- Daftar dirender di top layer lewat Popover API, jadi parent dengan `overflow: hidden` tidak memotongnya.
- Teks daftar kosong bawaan berbahasa Inggris ("No results"). Terjemahkan lewat `emptyLabel`.
