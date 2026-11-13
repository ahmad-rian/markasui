## Blade

```blade
<div class="grid grid-cols-2 gap-3">
    @foreach ($produk as $item)
        <x-markas.expandable-card :title="$item->nama" :description="$item->ringkasan" close-label="Tutup">
            <x-slot:media>
                <img src="{{ $item->gambar }}" alt="" class="size-full object-cover" />
            </x-slot:media>
            <p class="text-base font-semibold">{{ $item->harga }}</p>
            <x-slot:footer>
                <x-markas.button>Tambah ke keranjang</x-markas.button>
            </x-slot:footer>
        </x-markas.expandable-card>
    @endforeach
</div>
```

Butuh Alpine.js.

## React

```tsx
import { Button } from "@/components/markas/Button";
import { ExpandableCard } from "@/components/markas/ExpandableCard";

<div className="grid grid-cols-2 gap-3">
  {produk.map((item) => (
    <ExpandableCard
      key={item.id}
      title={item.nama}
      description={item.ringkasan}
      closeLabel="Tutup"
      media={
        <img src={item.gambar} alt="" className="size-full object-cover" />
      }
      footer={<Button>Tambah ke keranjang</Button>}
    >
      <p className="text-base font-semibold">{item.harga}</p>
    </ExpandableCard>
  ))}
</div>;
```

## Vue

```vue
<template>
  <div class="grid grid-cols-2 gap-3">
    <ExpandableCard
      v-for="item in produk"
      :key="item.id"
      :title="item.nama"
      :description="item.ringkasan"
      close-label="Tutup"
    >
      <template #media>
        <img :src="item.gambar" alt="" class="size-full object-cover" />
      </template>
      <p class="text-base font-semibold">{{ item.harga }}</p>
      <template #footer>
        <Button>Tambah ke keranjang</Button>
      </template>
    </ExpandableCard>
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Button from "$lib/components/markas/Button.svelte";
  import ExpandableCard from "$lib/components/markas/ExpandableCard.svelte";
</script>

<div class="grid grid-cols-2 gap-3">
  {#each products as product (product.id)}
    <ExpandableCard title={product.name} description={product.summary}>
      {#snippet media()}
        <img src={product.image} alt="" class="size-full object-cover" />
      {/snippet}
      {#snippet footer()}
        <Button>Add to cart</Button>
      {/snippet}
      <p class="text-base font-semibold">{product.price}</p>
    </ExpandableCard>
  {/each}
</div>
```

## Astro

```astro
---
import Button from "@/components/markas/Button.astro";
import ExpandableCard from "@/components/markas/ExpandableCard.astro";
---

<div class="grid grid-cols-2 gap-3">
  {
    products.map((product) => (
      <ExpandableCard title={product.name} description={product.summary}>
        <img slot="media" src={product.image} alt="" class="size-full object-cover" />
        <Button slot="footer">Add to cart</Button>
        <p class="text-base font-semibold">{product.price}</p>
      </ExpandableCard>
    ))
  }
</div>
```

Slot media dirender sekali dan tampil di kartu dan tampilan terbuka. Custom element kecil membuka dialog dan memainkan animasi membesar dan mengecil.

## Angular

```ts
import { Component } from "@angular/core";
import { Button } from "./markas/button.component";
import {
  ExpandableCard,
  ExpandableCardMedia,
} from "./markas/expandable-card.component";

@Component({
  selector: "app-products",
  imports: [Button, ExpandableCard, ExpandableCardMedia],
  template: `
    @for (product of products; track product.id) {
      <markas-expandable-card
        [title]="product.name"
        [description]="product.summary"
      >
        <ng-template markasCardMedia>
          <img [src]="product.image" alt="" class="size-full object-cover" />
        </ng-template>
        <button markas-button footer>Add to cart</button>
        <p class="text-base font-semibold">{{ product.price }}</p>
      </markas-expandable-card>
    }
  `,
})
export class Products {
  products = [
    {
      id: 1,
      name: "Desk lamp",
      summary: "Warm light.",
      image: "/lamp.jpg",
      price: "$48",
    },
  ];
}
```

Media ditaruh di `ng-template markasCardMedia` karena tampil dua kali. Elemen dengan atribut `footer` mengisi baris aksi.

## Catatan

- Satu komponen merender satu kartu beserta dialognya. Susun beberapa kartu di grid atau daftar milikmu.
- Saat dibuka, kartu diukur, dialog modal native ditampilkan, lalu dianimasikan dari kotak kartu ke tengah layar (FLIP). Saat ditutup animasinya diputar mundur dan kartu muncul kembali di tempatnya.
- Escape, klik backdrop, dan tombol tutup semuanya menjalankan animasi menyusut. Fokus kembali ke kartu.
- Slot media dirender dua kali, di kartu dan di dialog. Beri gambar `alt=""` bila judul sudah menamainya.
- Atribut dan `class` jatuh ke tombol kartu.
