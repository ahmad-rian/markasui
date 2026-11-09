/** Daftar framework tanpa zod: aman diimpor skrip klien (docs) tanpa menambah bundle. */
export const FRAMEWORKS = [
  "blade",
  "react",
  "vue",
  "svelte",
  "astro",
  "angular",
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

/** Wajib ada di setiap komponen. Svelte, Astro, dan Angular di-porting bertahap, jadi opsional. */
export const CORE_FRAMEWORKS = ["blade", "react", "vue"] as const;
export type CoreFramework = (typeof CORE_FRAMEWORKS)[number];

/** Framework yang tersedia untuk satu komponen, urut sesuai FRAMEWORKS. */
export const availableFrameworks = (item: {
  frameworks: Partial<Record<Framework, unknown>>;
}): Framework[] => FRAMEWORKS.filter((framework) => item.frameworks[framework]);

/** Akhiran nama file per framework (Angular: <nama>.component.ts). */
export const FILE_SUFFIXES: Record<Framework, string> = {
  blade: ".blade.php",
  react: ".tsx",
  vue: ".vue",
  svelte: ".svelte",
  astro: ".astro",
  angular: ".component.ts",
};
