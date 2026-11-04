import type { Framework } from "@markasui/registry/schema";

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  blade: "Blade",
  react: "React",
  vue: "Vue",
};

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const RUNNERS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export const cliCommand = (pm: PackageManager, args: string) =>
  `${RUNNERS[pm]} markasui@latest ${args}`;

export const shikiLang = (framework: Framework) =>
  ({ blade: "blade", react: "tsx", vue: "vue" })[framework] as
    "blade" | "tsx" | "vue";
