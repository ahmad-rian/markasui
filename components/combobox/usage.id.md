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

## Svelte

```svelte
<script lang="ts">
  import Combobox from "$lib/components/markas/Combobox.svelte";

  let country = $state("id");
  const countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Jepang" },
  ];
</script>

<Combobox
  bind:value={country}
  name="country"
  label="Negara"
  placeholder="Cari negara"
  emptyLabel="Tidak ada hasil"
  options={countries}
/>
```

## Astro

```astro
---
import Combobox from "@/components/markas/Combobox.astro";

const countries = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Jepang" },
];
---

<Combobox
  name="country"
  label="Negara"
  placeholder="Cari negara"
  emptyLabel="Tidak ada hasil"
  value="id"
  options={countries}
/>
```

Opsi dirender di server. Script kecil yang dibundel (satu custom element per combobox) memfilter, menyorot, dan menempatkan daftar. Mengganti pilihan memancarkan event `markas-change` yang menggelembung dengan value di `event.detail`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Combobox } from "./markas/combobox.component";

@Component({
  selector: "app-address",
  imports: [Combobox],
  template: `
    <markas-combobox
      [(value)]="country"
      name="country"
      label="Negara"
      placeholder="Cari negara"
      emptyLabel="Tidak ada hasil"
      [options]="countries"
    />
  `,
})
export class Address {
  readonly country = signal("id");
  readonly countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Jepang" },
  ];
}
```

## Catatan

- Atribut tambahan (`placeholder`, `required`, `disabled`, `class`) jatuh ke input teks yang terlihat. `name` dipasang di input tersembunyi berisi value terpilih, jadi form mengirim `country=id`, bukan labelnya.
- Mengetik memfilter opsi berdasarkan label dan mengosongkan value terpilih sampai opsi dipilih lagi.
- Daftar dirender di top layer lewat Popover API, jadi parent dengan `overflow: hidden` tidak memotongnya.
- Teks daftar kosong bawaan berbahasa Inggris ("No results"). Terjemahkan lewat `emptyLabel`.
