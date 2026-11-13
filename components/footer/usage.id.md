## Blade

```blade
<x-markas.footer
    description="Komponen UI untuk Blade, React, dan Vue."
    copyright="© 2026 MarkasUI"
    nav-label="Navigasi kaki"
    legal-label="Legal"
    social-label="Media sosial"
    back-to-top-label="Kembali ke atas"
    :back-to-top="true"
    :columns="[
        ['title' => 'Produk', 'links' => [
            ['label' => 'Komponen', 'href' => '/komponen'],
            ['label' => 'Template', 'href' => '/template'],
        ]],
        ['title' => 'Perusahaan', 'links' => [
            ['label' => 'Tentang', 'href' => '/tentang'],
            ['label' => 'Karier', 'href' => '/karier'],
        ]],
    ]"
    :legal="[
        ['label' => 'Privasi', 'href' => '/privasi'],
        ['label' => 'Ketentuan', 'href' => '/ketentuan'],
    ]"
>
    <x-slot:brand>MarkasUI</x-slot:brand>
</x-markas.footer>

{{-- Kartu newsletter dengan label Indonesia --}}
<x-markas.footer
    variant="newsletter"
    newsletter-label="Berlangganan kabar terbaru"
    email-label="Alamat email"
    subscribe-label="Langganan"
    success-label="Terima kasih sudah berlangganan"
    copyright="© 2026 MarkasUI"
>
    <x-slot:brand>MarkasUI</x-slot:brand>
</x-markas.footer>
```

Hanya form newsletter bawaan yang butuh Alpine.js. Varian lain murni HTML.

## React

```tsx
import { Footer } from "@/components/markas/Footer";

<Footer
  brand="MarkasUI"
  description="Komponen UI untuk Blade, React, dan Vue."
  copyright="© 2026 MarkasUI"
  navLabel="Navigasi kaki"
  socialLabel="Media sosial"
  backToTopLabel="Kembali ke atas"
  backToTop
  columns={[
    {
      title: "Produk",
      links: [
        { label: "Komponen", href: "/komponen" },
        { label: "Template", href: "/template" },
      ],
    },
  ]}
  legal={[
    { label: "Privasi", href: "/privasi" },
    { label: "Ketentuan", href: "/ketentuan" },
  ]}
/>;

<Footer
  variant="cta"
  brand="MarkasUI"
  heading="Rilis antarmuka berikutnya minggu ini"
  copyright="© 2026 MarkasUI"
  actions={<a href="/komponen">Lihat komponen</a>}
/>;
```

## Vue

```vue
<script setup lang="ts">
import Footer from "@/components/markas/Footer.vue";

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Komponen", href: "/komponen" },
      { label: "Template", href: "/template" },
    ],
  },
];
</script>

<template>
  <Footer
    variant="newsletter"
    newsletter-label="Berlangganan kabar terbaru"
    newsletter-description="Satu email per bulan. Tanpa spam."
    email-label="Alamat email"
    subscribe-label="Langganan"
    success-label="Terima kasih sudah berlangganan"
    copyright="© 2026 MarkasUI"
    :columns="columns"
  >
    <template #brand>MarkasUI</template>
  </Footer>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Footer from "$lib/components/markas/Footer.svelte";

  const columns = [
    {
      title: "Produk",
      links: [
        { label: "Komponen", href: "/komponen" },
        { label: "Template", href: "/template" },
      ],
    },
  ];
</script>

<Footer
  variant="newsletter"
  newsletterLabel="Berlangganan kabar terbaru"
  newsletterDescription="Satu email per bulan. Tanpa spam."
  emailLabel="Alamat email"
  subscribeLabel="Langganan"
  successLabel="Terima kasih sudah berlangganan"
  copyright="© 2026 MarkasUI"
  {columns}
>
  {#snippet brand()}MarkasUI{/snippet}
</Footer>
```

## Astro

```astro
---
import Footer from "@/components/markas/Footer.astro";

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Komponen", href: "/komponen" },
      { label: "Template", href: "/template" },
    ],
  },
];
---

<Footer
  variant="newsletter"
  newsletterLabel="Berlangganan kabar terbaru"
  emailLabel="Alamat email"
  subscribeLabel="Langganan"
  successLabel="Terima kasih sudah berlangganan"
  backToTopLabel="Kembali ke atas"
  copyright="© 2026 MarkasUI"
  columns={columns}
  backToTop
>
  <Fragment slot="brand">MarkasUI</Fragment>
</Footer>
```

Footer dirender di server. Hanya form newsletter bawaan yang memakai script kecil yang dibundel Astro, satu untuk semua footer di halaman.

## Angular

```ts
import { Component } from "@angular/core";
import { Footer, type FooterColumn } from "./markas/footer.component";

@Component({
  selector: "app-site-footer",
  imports: [Footer],
  template: `
    <footer
      markas-footer
      variant="newsletter"
      navLabel="Navigasi kaki"
      newsletterLabel="Berlangganan kabar terbaru"
      emailLabel="Alamat email"
      subscribeLabel="Langganan"
      successLabel="Terima kasih sudah berlangganan"
      copyright="© 2026 MarkasUI"
      [columns]="columns"
    >
      <ng-container brand>MarkasUI</ng-container>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly columns: FooterColumn[] = [
    {
      title: "Produk",
      links: [
        { label: "Komponen", href: "/komponen" },
        { label: "Template", href: "/template" },
      ],
    },
  ];
}
```

Footer adalah komponen atribut pada elemen `footer` native, jadi `class`, `id`, dan `aria-*` tetap di elemen itu. Taruh isi slot di elemen (atau `ng-container`) beratribut `brand`, `actions`, atau `newsletter`.

## Catatan

- Tata letak mengikuti lebar footer itu sendiri (container query), jadi tetap rapi di kolom sempit maupun di ponsel.
- Form newsletter bawaan memvalidasi email secara native dan menampilkan `successLabel` di region `role="status"` tanpa request jaringan. Isi slot `newsletter` dengan form sendiri untuk mengirim alamat ke penyedia email.
- Di React file ini menjadi Client Component hanya karena state form newsletter. Ukurannya tetap di bawah 3 KB gzip.
- `backToTop` adalah link biasa ke `#top`, yang oleh browser digulir ke atas halaman tanpa JavaScript.
- Semua label bawaan berbahasa Inggris. Isi prop `<tujuan>Label` (Blade: `nav-label`, `email-label`, dst.) untuk situs berbahasa Indonesia.
- Blok `cta` selalu memakai palet gelap (membawa class `dark`), jadi tombol di `actions` otomatis berbalik warna di kedua tema.
