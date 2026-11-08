## Blade

```blade
<x-markas.footer
    description="Faktur dan penggajian untuk UMKM Indonesia."
    copyright="© 2026 PT Rapi Teknologi Indonesia"
    nav-label="Navigasi kaki"
    legal-label="Legal"
    social-label="Media sosial"
    back-to-top-label="Kembali ke atas"
    :back-to-top="true"
    :columns="[
        ['title' => 'Produk', 'links' => [
            ['label' => 'Faktur', 'href' => '/faktur'],
            ['label' => 'Penggajian', 'href' => '/penggajian'],
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
    <x-slot:brand>Rapi</x-slot:brand>
</x-markas.footer>

{{-- Kartu newsletter dengan label Indonesia --}}
<x-markas.footer
    variant="newsletter"
    newsletter-label="Berlangganan kabar terbaru"
    email-label="Alamat email"
    subscribe-label="Langganan"
    success-label="Terima kasih sudah berlangganan"
    copyright="© 2026 Rapi"
>
    <x-slot:brand>Rapi</x-slot:brand>
</x-markas.footer>
```

Hanya form newsletter bawaan yang butuh Alpine.js. Varian lain murni HTML.

## React

```tsx
import { Footer } from "@/components/markas/Footer";

<Footer
  brand="Rapi"
  description="Faktur dan penggajian untuk UMKM Indonesia."
  copyright="© 2026 PT Rapi Teknologi Indonesia"
  navLabel="Navigasi kaki"
  socialLabel="Media sosial"
  backToTopLabel="Kembali ke atas"
  backToTop
  columns={[
    {
      title: "Produk",
      links: [
        { label: "Faktur", href: "/faktur" },
        { label: "Penggajian", href: "/penggajian" },
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
  brand="Rapi"
  heading="Tutup buku dalam hitungan menit"
  copyright="© 2026 Rapi"
  actions={<a href="/daftar">Coba gratis</a>}
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
      { label: "Faktur", href: "/faktur" },
      { label: "Penggajian", href: "/penggajian" },
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
    copyright="© 2026 Rapi"
    :columns="columns"
  >
    <template #brand>Rapi</template>
  </Footer>
</template>
```

## Catatan

- Tata letak mengikuti lebar footer itu sendiri (container query), jadi tetap rapi di kolom sempit maupun di ponsel.
- Form newsletter bawaan memvalidasi email secara native dan menampilkan `successLabel` di region `role="status"` tanpa request jaringan. Isi slot `newsletter` dengan form sendiri untuk mengirim alamat ke penyedia email.
- Di React file ini menjadi Client Component hanya karena state form newsletter. Ukurannya tetap di bawah 3 KB gzip.
- `backToTop` adalah link biasa ke `#top`, yang oleh browser digulir ke atas halaman tanpa JavaScript.
- Semua label bawaan berbahasa Inggris. Isi prop `<tujuan>Label` (Blade: `nav-label`, `email-label`, dst.) untuk situs berbahasa Indonesia.
