## Blade

```blade
<x-markas.card-stack
    label="Testimoni pelanggan"
    prev-label="Kartu sebelumnya"
    next-label="Kartu berikutnya"
    card-label="{index} dari {total}"
>
    <x-slot:maya>
        <figure class="grid gap-6 p-5">
            <blockquote>Orientasi karyawan baru kini cukup satu sore.</blockquote>
            <figcaption class="text-sm text-muted">Maya Putri, Kopiloka</figcaption>
        </figure>
    </x-slot:maya>
    <x-slot:daniel>
        <figure class="grid gap-6 p-5">
            <blockquote>Pintasan keyboard saja sudah menghemat berjam-jam.</blockquote>
            <figcaption class="text-sm text-muted">Daniel Reyes, Northwind</figcaption>
        </figure>
    </x-slot:daniel>
</x-markas.card-stack>
```

Butuh Alpine.js. Setiap named slot menjadi satu kartu sesuai urutan penulisan. Untuk daftar, pakai `<x-slot :name="'card-'.$index">` di dalam `@foreach`.

## React

```tsx
import { CardStack } from "@/components/markas/CardStack";

<CardStack
  label="Testimoni pelanggan"
  prevLabel="Kartu sebelumnya"
  nextLabel="Kartu berikutnya"
  cardLabel="{index} dari {total}"
>
  {testimoni.map((item) => (
    <figure key={item.nama} className="grid gap-6 p-5">
      <blockquote>{item.kutipan}</blockquote>
      <figcaption className="text-sm text-muted">{item.nama}</figcaption>
    </figure>
  ))}
</CardStack>;
```

## Vue

```vue
<template>
  <CardStack
    label="Testimoni pelanggan"
    prev-label="Kartu sebelumnya"
    next-label="Kartu berikutnya"
    card-label="{index} dari {total}"
  >
    <figure v-for="item in testimoni" :key="item.nama" class="grid gap-6 p-5">
      <blockquote>{{ item.kutipan }}</blockquote>
      <figcaption class="text-sm text-muted">{{ item.nama }}</figcaption>
    </figure>
  </CardStack>
</template>
```

## Catatan

- Tumpukan sudah menyediakan permukaan kartu (border, latar, radius). Cukup tambahkan padding dan isi di setiap kartu.
- Tombol berikutnya, panah kanan, atau menyeret kartu teratas melewati seperempat lebar membuang kartu itu ke belakang. Tombol sebelumnya mengembalikan kartu terakhir dari kiri. Tumpukan berputar.
- Seretan pendek memantul kembali. Tekanan yang bergerak kurang dari 4px tetap dianggap klik, jadi tautan di kartu teratas tetap berfungsi.
- `cardLabel` menerima `{index}` dan `{total}`, misalnya `Tips {index} dari {total}`.
- Saat reduced motion kartu berganti seketika.
