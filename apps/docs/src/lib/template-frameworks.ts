/**
 * Framework yang bisa punya versi template (templates/<slug>/<fw>/). Blade, React, dan Vue wajib;
 * Svelte, Astro, dan Angular di-porting bertahap dan terdeteksi dari file yang ada.
 * Tanpa import Node, aman untuk klien.
 */
export const TEMPLATE_FRAMEWORKS = [
  "blade",
  "react",
  "vue",
  "svelte",
  "astro",
  "angular",
] as const;
export type TemplateFramework = (typeof TEMPLATE_FRAMEWORKS)[number];

/** Versi yang harus ada sebelum template tampil di situs. */
export const REQUIRED_TEMPLATE_FRAMEWORKS = [
  "blade",
  "react",
  "vue",
] as const satisfies readonly TemplateFramework[];

/** Framework cadangan untuk pratinjau saat template belum punya versi framework terpilih. */
export const TEMPLATE_FALLBACK_FRAMEWORK: TemplateFramework = "react";

const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase());

/** Path file tiap versi, relatif ke templates/<slug>/. */
export const templateFilePath = (
  framework: TemplateFramework,
  slug: string,
): string =>
  ({
    blade: `blade/${slug}.blade.php`,
    react: `react/${pascal(slug)}.tsx`,
    vue: `vue/${pascal(slug)}.vue`,
    svelte: `svelte/${pascal(slug)}.svelte`,
    astro: `astro/${pascal(slug)}.astro`,
    angular: `angular/${slug}.component.ts`,
  })[framework];
