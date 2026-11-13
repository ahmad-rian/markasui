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

## Svelte

```svelte
<script lang="ts">
  import ToggleGroup from "$lib/components/markas/ToggleGroup.svelte";

  let view = $state("week");
</script>

{#snippet leftIcon()}
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h14" /></svg
  >
{/snippet}

<ToggleGroup
  bind:value={view}
  label="Tampilan kalender"
  items={[
    { value: "day", label: "Hari" },
    { value: "week", label: "Minggu" },
    { value: "month", label: "Bulan" },
  ]}
/>

<ToggleGroup
  label="Perataan teks"
  value="left"
  items={[{ value: "left", label: leftIcon, ariaLabel: "Rata kiri" }]}
/>
```

## Astro

```astro
---
import ToggleGroup from "@/components/markas/ToggleGroup.astro";
---

<ToggleGroup
  label="Tampilan kalender"
  value="week"
  items={[
    { value: "day", label: "Hari" },
    { value: "week", label: "Minggu" },
    { value: "month", label: "Bulan" },
  ]}
/>
```

Ganti label dengan ikon lewat slot bernama sesuai value, misalnya `<Fragment slot="left">`. Script kecil di halaman menangani klik dan tombol panah.

## Angular

```ts
import { Component, signal } from "@angular/core";
import {
  ToggleGroup,
  ToggleGroupItemTemplate,
} from "./markas/toggle-group.component";

@Component({
  selector: "app-kalender",
  imports: [ToggleGroup, ToggleGroupItemTemplate],
  template: `
    <markas-toggle-group
      [(value)]="view"
      label="Tampilan kalender"
      [items]="views"
    />
    <markas-toggle-group label="Perataan teks" value="left" [items]="align">
      <ng-template markasToggleGroupItem="left">
        <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
      </ng-template>
    </markas-toggle-group>
  `,
})
export class Kalender {
  readonly view = signal<string | string[]>("week");
  readonly views = [
    { value: "day", label: "Hari" },
    { value: "week", label: "Minggu" },
    { value: "month", label: "Bulan" },
  ];
  readonly align = [{ value: "left", label: "Kiri", ariaLabel: "Rata kiri" }];
}
```

## Catatan

- Single menghasilkan string, kosong kalau item yang ditekan diklik lagi. Multiple menghasilkan array urut sesuai item.
- Value menjadi nama slot di Blade, Vue, dan Astro, jadi pakai hanya huruf kecil, angka, atau garis bawah.
- Komponen ini tidak punya teks bawaan. Isi `label` dan label item dalam Bahasa Indonesia.
