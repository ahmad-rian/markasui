## Blade

```blade
<x-markas.tabs :items="['akun' => 'Akun', 'sandi' => 'Kata sandi']" default-value="akun">
    <x-slot:akun>Ubah nama dan email akun Anda.</x-slot:akun>
    <x-slot:sandi>Ganti kata sandi secara berkala.</x-slot:sandi>
</x-markas.tabs>
```

Butuh Alpine.js.

## React

```tsx
import { Tabs } from "@/components/markas/Tabs";

<Tabs
  defaultValue="akun"
  items={[
    { value: "akun", label: "Akun", content: "Ubah nama dan email akun Anda." },
    {
      value: "sandi",
      label: "Kata sandi",
      content: "Ganti kata sandi secara berkala.",
    },
  ]}
/>;
```

## Vue

```vue
<template>
  <Tabs
    default-value="akun"
    :items="[
      { value: 'akun', label: 'Akun' },
      { value: 'sandi', label: 'Kata sandi' },
    ]"
  >
    <template #akun>Ubah nama dan email akun Anda.</template>
    <template #sandi>Ganti kata sandi secara berkala.</template>
  </Tabs>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Tabs from "$lib/components/markas/Tabs.svelte";

  let aktif = $state("akun");
  const items = [
    { value: "akun", label: "Akun", content: akun },
    {
      value: "sandi",
      label: "Kata sandi",
      content: "Ganti kata sandi secara berkala.",
    },
  ];
</script>

{#snippet akun()}
  <p>Ubah nama dan <strong>email</strong> akun Anda.</p>
{/snippet}

<Tabs {items} bind:value={aktif} />
```

`content` berupa teks biasa atau snippet yang dideklarasikan di tingkat teratas template.

## Astro

```astro
---
import Tabs from "@/components/markas/Tabs.astro";

const items = [
  { value: "akun", label: "Akun" },
  { value: "sandi", label: "Kata sandi" },
];
---

<Tabs items={items} defaultValue="akun">
  <Fragment slot="akun">Ubah nama dan email akun Anda.</Fragment>
  <Fragment slot="sandi">Ganti kata sandi secara berkala.</Fragment>
</Tabs>
```

Script klien kecil menangani klik dan tombol panah. Tab yang dipilih memancarkan event `markas-change` (bubbling) dengan value-nya sebagai `detail`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { TabPanel, Tabs } from "./markas/tabs.component";

@Component({
  selector: "app-pengaturan",
  imports: [Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" [(value)]="aktif">
      <ng-template markasTabPanel="akun">
        Ubah nama dan email akun Anda.
      </ng-template>
      <ng-template markasTabPanel="sandi">
        Ganti kata sandi secara berkala.
      </ng-template>
    </markas-tabs>
  `,
})
export class Pengaturan {
  readonly aktif = signal("akun");
  readonly items = [
    { value: "akun", label: "Akun" },
    { value: "sandi", label: "Kata sandi" },
  ];
}
```

Setiap panel adalah `<ng-template markasTabPanel="value">`, jadi isinya baru dibuat saat Angular merender panel itu.

## Catatan

- Key tab dipakai sebagai id dan nama slot, jadi pakai huruf kecil, angka, atau underscore saja.
- Tabs tidak punya teks bawaan. Label tab berasal dari `items`, jadi isi langsung dalam Bahasa Indonesia.
