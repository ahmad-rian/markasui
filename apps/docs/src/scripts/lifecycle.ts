/**
 * Situs memakai ClientRouter Astro (navigasi tanpa reload). Script modul hanya dijalankan sekali,
 * jadi kerja yang menyentuh elemen halaman didaftarkan di sini: jalan saat load pertama dan setiap
 * selesai pindah halaman.
 */
export function onPageLoad(init: () => void) {
  document.addEventListener("astro:page-load", init);
}

/** Dipanggil setelah DOM halaman baru dipasang, sebelum island hydrate dan sebelum astro:page-load. */
export function onAfterSwap(init: () => void) {
  document.addEventListener("astro:after-swap", init);
}
