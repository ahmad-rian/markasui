## Blade

```blade
<x-markas.faq
    variant="searchable"
    title="Pertanyaan umum"
    search-label="Cari pertanyaan"
    empty-label="Tidak ada pertanyaan yang cocok"
    schema
    :items="[
        ['question' => 'Apakah ada uji coba gratis?', 'answer' => 'Ya. Setiap paket dimulai dengan uji coba 14 hari.'],
        ['question' => 'Bisakah saya berhenti kapan saja?', 'answer' => 'Bisa. Paket tetap aktif sampai akhir periode.'],
    ]"
>
    <x-slot:contact>Masih punya pertanyaan? <a href="/kontak">Hubungi kami</a></x-slot:contact>
</x-markas.faq>

<x-markas.faq variant="categories" categories-label="Kategori pertanyaan" :items="$faqs" />
```

## React

```tsx
import { Faq } from "@/components/markas/Faq";

<Faq
  variant="searchable"
  title="Pertanyaan umum"
  items={faqs}
  searchLabel="Cari pertanyaan"
  emptyLabel="Tidak ada pertanyaan yang cocok"
  contact={
    <>
      Masih punya pertanyaan? <a href="/kontak">Hubungi kami</a>
    </>
  }
/>

<Faq variant="categories" categoriesLabel="Kategori pertanyaan" items={faqs} />
```

## Vue

```vue
<template>
  <Faq
    variant="searchable"
    title="Pertanyaan umum"
    :items="faqs"
    search-label="Cari pertanyaan"
    empty-label="Tidak ada pertanyaan yang cocok"
  >
    <template #contact>
      Masih punya pertanyaan? <a href="/kontak">Hubungi kami</a>
    </template>
  </Faq>

  <Faq
    variant="categories"
    categories-label="Kategori pertanyaan"
    :items="faqs"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Faq from "$lib/components/markas/Faq.svelte";
</script>

<Faq
  variant="split"
  title="Frequently asked questions"
  items={faqs}
  exclusive
  schema
>
  {#snippet contact()}
    Still have questions? <a href="/contact">Contact support</a>
  {/snippet}
</Faq>

<Faq variant="searchable" title="Help center" items={faqs} />
```

## Astro

```astro
---
import Faq from "@/components/markas/Faq.astro";
---

<Faq variant="split" title="Frequently asked questions" items={faqs} exclusive schema>
  <Fragment slot="contact">
    Still have questions? <a href="/contact">Contact support</a>
  </Fragment>
</Faq>

<Faq variant="categories" title="Help center" items={faqsWithCategory} />
```

searchable dan categories memakai satu script kecil yang dibundel per halaman. Varian lain tanpa JavaScript.

## Angular

```ts
import { Component } from "@angular/core";
import { Faq, type FaqItem } from "./markas/faq.component";

@Component({
  selector: "app-help",
  imports: [Faq],
  template: `
    <markas-faq
      variant="split"
      title="Frequently asked questions"
      [items]="faqs"
      exclusive
      schema
    >
      <ng-container contact>
        Still have questions? <a href="/contact">Contact support</a>
      </ng-container>
    </markas-faq>
  `,
})
export class Help {
  faqs: FaqItem[] = [];
}
```

## Catatan

- Buka tutup memakai `details` native, jadi simple, split, cards, dan centered tidak butuh JavaScript. Tinggi dianimasikan dengan `::details-content` dan `interpolate-size` bila didukung, selain itu langsung berganti.
- searchable dan categories butuh sedikit state. Versi Blade butuh Alpine.js hanya untuk dua varian itu.
- Tata letak mengikuti lebar section lewat container query, jadi split dan cards menumpuk di kolom sempit.
- `schema` mencetak JSON-LD FAQPage dari item yang sama. Pakai sekali per halaman.
