## Blade

```blade
<x-markas.select name="kota" label="Kota" hint="Pilih kota domisili.">
    <option value="jakarta">Jakarta</option>
    <option value="bandung" @selected(old('kota') === 'bandung')>Bandung</option>
</x-markas.select>
```

## React

```tsx
import { Select } from "@/components/markas/Select";

<Select name="kota" label="Kota" defaultValue="bandung">
  <option value="jakarta">Jakarta</option>
  <option value="bandung">Bandung</option>
</Select>;
```

## Vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import Select from "@/components/markas/Select.vue";

const kota = ref("bandung");
</script>

<template>
  <Select v-model="kota" name="kota" label="Kota">
    <option value="jakarta">Jakarta</option>
    <option value="bandung">Bandung</option>
  </Select>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Select from "$lib/components/markas/Select.svelte";

  let kota = $state("bandung");
</script>

<Select bind:value={kota} name="kota" label="Kota">
  <option value="jakarta">Jakarta</option>
  <option value="bandung">Bandung</option>
</Select>
```

## Astro

```astro
---
import Select from "@/components/markas/Select.astro";
---

<Select name="kota" label="Kota">
  <option value="jakarta">Jakarta</option>
  <option value="bandung" selected>Bandung</option>
</Select>
```

Tanpa script klien: select adalah elemen native.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { Select } from "./markas/select.component";

@Component({
  selector: "app-alamat",
  imports: [Select],
  template: `
    <markas-select [(value)]="kota" name="kota" label="Kota">
      <option value="jakarta">Jakarta</option>
      <option value="bandung">Bandung</option>
    </markas-select>
  `,
})
export class Alamat {
  readonly kota = signal("bandung");
}
```

## Catatan

- Atribut tambahan (`name`, `required`, `multiple`, `class`) diteruskan ke elemen `<select>`.
- Tanpa `v-model`, versi Vue memilih option yang ditandai `selected`, atau option pertama, sama seperti Blade dan React.
- Komponen ini tidak punya teks bawaan. Semua teks berasal dari prop dan option, jadi cukup tulis dalam Bahasa Indonesia.
