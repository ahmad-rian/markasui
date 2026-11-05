import type { Locale } from "./i18n";

export type VariantTitles = Record<string, Record<Locale, string>>;

/**
 * Judul galeri variasi per kategori di lib/variants/<kategori>.ts. Kunci = nama file contoh tanpa
 * ekstensi (examples/<fw>/<komponen>--<variasi>.*). Urutan kunci menentukan urutan tampil.
 */
const modules = import.meta.glob<{ default: VariantTitles }>(
  "./variants/*.ts",
  { eager: true },
);
export const VARIANT_TITLES: VariantTitles = Object.assign(
  {},
  ...Object.values(modules).map((module) => module.default),
);

export function variantTitle(slug: string, locale: Locale): string {
  const known = VARIANT_TITLES[slug]?.[locale];
  if (known) return known;
  const words = slug.split("--")[1]?.replaceAll("-", " ") ?? slug;
  return words.charAt(0).toUpperCase() + words.slice(1);
}
