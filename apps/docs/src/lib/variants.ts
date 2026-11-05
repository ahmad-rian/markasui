import type { Locale } from "./i18n";

/**
 * Judul galeri variasi. Kunci = nama file contoh tanpa ekstensi (examples/<fw>/<komponen>--<variasi>.*).
 * Variasi tanpa judul di sini tetap tampil dengan judul dari slug-nya.
 */
export const VARIANT_TITLES: Record<string, Record<Locale, string>> = {
  "button--variants": { en: "Variants", id: "Varian" },
  "button--sizes": { en: "Sizes", id: "Ukuran" },
  "button--icons": { en: "With icons", id: "Dengan ikon" },
  "button--states": { en: "States", id: "Status" },
  "button--full-width": { en: "Full width", id: "Lebar penuh" },
};

export function variantTitle(slug: string, locale: Locale): string {
  const known = VARIANT_TITLES[slug]?.[locale];
  if (known) return known;
  const words = slug.split("--")[1]?.replaceAll("-", " ") ?? slug;
  return words.charAt(0).toUpperCase() + words.slice(1);
}
