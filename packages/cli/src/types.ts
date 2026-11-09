export const FRAMEWORKS = [
  "blade",
  "react",
  "vue",
  "svelte",
  "astro",
  "angular",
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

/** Selalu tersedia. Svelte, Astro, dan Angular di-porting bertahap per komponen. */
export const CORE_FRAMEWORKS = ["blade", "react", "vue"] as const;
export type CoreFramework = (typeof CORE_FRAMEWORKS)[number];

export const isFramework = (value: unknown): value is Framework =>
  FRAMEWORKS.includes(value as Framework);

export type IndexItem = {
  name: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  addedAt: string;
  /** Framework yang tersedia (registry lama tidak punya field ini: anggap Blade, React, Vue). */
  frameworks?: Framework[];
};

export type ComponentFile = {
  file: string;
  deps: string[];
  target: string;
  code: string;
};

export type RegistryItem = Omit<IndexItem, "frameworks"> & {
  frameworks: Record<CoreFramework, ComponentFile> &
    Partial<Record<Framework, ComponentFile>>;
  props: { name: string; type: string; default: string; description: string }[];
  a11y: string[];
  ai: { whenToUse: string; rules: string[] };
  usage: string;
};

export type Theme = {
  css: string;
  tokens: { name: string; light: string; dark: string }[];
};

/** Isi markas.json di root project user. */
export type ProjectConfig = {
  $schema?: string;
  framework: Framework;
  componentsDir: string;
  cssPath: string;
  registry?: string;
};
