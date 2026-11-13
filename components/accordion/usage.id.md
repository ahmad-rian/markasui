## Blade

```blade
<x-markas.accordion :items="['pengiriman' => 'Berapa lama pengiriman?', 'retur' => 'Bagaimana cara retur?']" default-value="pengiriman">
    <x-slot:pengiriman>Pesanan tiba dalam 2 sampai 4 hari kerja.</x-slot:pengiriman>
    <x-slot:retur>Ajukan retur dalam 7 hari lewat halaman pesanan.</x-slot:retur>
</x-markas.accordion>
```

Tidak butuh Alpine.js.

## React

```tsx
import { Accordion } from "@/components/markas/Accordion";

<Accordion
  defaultValue="pengiriman"
  items={[
    {
      value: "pengiriman",
      title: "Berapa lama pengiriman?",
      content: "Pesanan tiba dalam 2 sampai 4 hari kerja.",
    },
    {
      value: "retur",
      title: "Bagaimana cara retur?",
      content: "Ajukan retur dalam 7 hari lewat halaman pesanan.",
    },
  ]}
/>;
```

## Vue

```vue
<template>
  <Accordion
    default-value="pengiriman"
    :items="[
      { value: 'pengiriman', title: 'Berapa lama pengiriman?' },
      { value: 'retur', title: 'Bagaimana cara retur?' },
    ]"
  >
    <template #pengiriman>Pesanan tiba dalam 2 sampai 4 hari kerja.</template>
    <template #retur>Ajukan retur dalam 7 hari lewat halaman pesanan.</template>
  </Accordion>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Accordion from "$lib/components/markas/Accordion.svelte";

  const items = [
    {
      value: "pengiriman",
      title: "Berapa lama pengiriman?",
      content: "Pesanan tiba dalam 2 sampai 4 hari kerja.",
    },
    { value: "retur", title: "Bagaimana cara retur?", content: retur },
  ];
</script>

{#snippet retur()}
  Ajukan retur dalam 7 hari lewat <a href="/pesanan">halaman pesanan</a>.
{/snippet}

<Accordion {items} defaultValue="pengiriman" />
```

`content` menerima teks biasa atau snippet untuk isi kaya.

## Astro

```astro
---
import Accordion from "@/components/markas/Accordion.astro";

const items = [
  {
    value: "pengiriman",
    title: "Berapa lama pengiriman?",
    content: "Pesanan tiba dalam 2 sampai 4 hari kerja.",
  },
  { value: "retur", title: "Bagaimana cara retur?" },
];
---

<Accordion items={items} defaultValue="pengiriman">
  <p slot="retur">Ajukan retur dalam 7 hari lewat halaman pesanan.</p>
</Accordion>
```

Item tanpa `content` merender slot dengan nama sama seperti `value`-nya. Tidak ada JavaScript yang dikirim.

## Angular

```ts
import { Component } from "@angular/core";
import { Accordion } from "./markas/accordion.component";

@Component({
  selector: "app-faq",
  imports: [Accordion],
  template: `
    <ng-template #retur>
      Ajukan retur dalam 7 hari lewat <a href="/pesanan">halaman pesanan</a>.
    </ng-template>
    <markas-accordion
      [items]="[
        {
          value: 'pengiriman',
          title: 'Berapa lama pengiriman?',
          content: 'Pesanan tiba dalam 2 sampai 4 hari kerja.',
        },
        { value: 'retur', title: 'Bagaimana cara retur?', content: retur },
      ]"
      defaultValue="pengiriman"
    />
  `,
})
export class Faq {}
```

`content` menerima teks biasa atau referensi `ng-template` untuk isi kaya.

## Catatan

- `type="single"` (default) memberi atribut `name` yang sama ke setiap `details`, sehingga browser menutup bagian lain secara native. Pakai `type="multiple"` agar beberapa bagian bisa terbuka bersamaan.
- Browser lama yang belum mendukung `details[name]` tetap bisa membuka bagian, hanya tidak eksklusif.
- Komponen ini tidak punya teks bawaan. Judul dan isi berasal dari data Anda sendiri, jadi cukup tulis dalam Bahasa Indonesia.
