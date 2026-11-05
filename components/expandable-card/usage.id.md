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

## Catatan

- Satu komponen merender satu kartu beserta dialognya. Susun beberapa kartu di grid atau daftar milikmu.
- Saat dibuka, kartu diukur, dialog modal native ditampilkan, lalu dianimasikan dari kotak kartu ke tengah layar (FLIP). Saat ditutup animasinya diputar mundur dan kartu muncul kembali di tempatnya.
- Escape, klik backdrop, dan tombol tutup semuanya menjalankan animasi menyusut. Fokus kembali ke kartu.
- Slot media dirender dua kali, di kartu dan di dialog. Beri gambar `alt=""` bila judul sudah menamainya.
- Atribut dan `class` jatuh ke tombol kartu.
