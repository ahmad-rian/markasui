import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Framework, ProjectConfig } from "./types.ts";

export const CONFIG_FILE = "markas.json";

const exists = (path: string) =>
  access(path).then(
    () => true,
    () => false,
  );

async function readPackageJson(
  cwd: string,
): Promise<Record<string, unknown> | null> {
  try {
    return JSON.parse(await readFile(join(cwd, "package.json"), "utf8"));
  } catch {
    return null;
  }
}

const dependencyNames = (pkg: Record<string, unknown> | null) =>
  new Set(
    ["dependencies", "devDependencies", "peerDependencies"].flatMap((field) =>
      Object.keys((pkg?.[field] as Record<string, string> | undefined) ?? {}),
    ),
  );

export type Detection = {
  framework: Framework;
  meta: "laravel" | "next" | "react" | "nuxt" | "vue";
};

/** Aturan deteksi dari PRD bagian 9: artisan + resources/views, lalu react, lalu vue. */
export async function detectFramework(cwd: string): Promise<Detection | null> {
  if (
    (await exists(join(cwd, "artisan"))) &&
    (await exists(join(cwd, "resources/views")))
  ) {
    return { framework: "blade", meta: "laravel" };
  }
  const deps = dependencyNames(await readPackageJson(cwd));
  if (deps.has("next")) return { framework: "react", meta: "next" };
  if (deps.has("react")) return { framework: "react", meta: "react" };
  if (deps.has("nuxt")) return { framework: "vue", meta: "nuxt" };
  if (deps.has("vue")) return { framework: "vue", meta: "vue" };
  return null;
}

/** Path default per jenis project. Next.js dan Nuxt tanpa folder src memakai root. */
export async function defaultConfig(
  cwd: string,
  detection: Detection,
): Promise<ProjectConfig> {
  const hasSrc = await exists(join(cwd, "src"));
  switch (detection.meta) {
    case "laravel":
      return {
        framework: "blade",
        componentsDir: "resources/views/components/markas",
        cssPath: "resources/css/markas.css",
      };
    case "next":
      return hasSrc
        ? {
            framework: "react",
            componentsDir: "src/components/markas",
            cssPath: "src/app/markas.css",
          }
        : {
            framework: "react",
            componentsDir: "components/markas",
            cssPath: "app/markas.css",
          };
    case "nuxt":
      return {
        framework: "vue",
        componentsDir: "components/markas",
        cssPath: "assets/css/markas.css",
      };
    default:
      return {
        framework: detection.framework,
        componentsDir: "src/components/markas",
        cssPath: "src/markas.css",
      };
  }
}

export async function readConfig(cwd: string): Promise<ProjectConfig | null> {
  try {
    return JSON.parse(
      await readFile(join(cwd, CONFIG_FILE), "utf8"),
    ) as ProjectConfig;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw new Error(
      `${CONFIG_FILE} tidak bisa dibaca: ${(error as Error).message}`,
    );
  }
}

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export async function detectPackageManager(
  cwd: string,
): Promise<PackageManager> {
  const lockfiles: [string, PackageManager][] = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lock", "bun"],
    ["bun.lockb", "bun"],
  ];
  for (const [file, manager] of lockfiles)
    if (await exists(join(cwd, file))) return manager;
  return "npm";
}

export const installCommand = (manager: PackageManager, deps: string[]) =>
  `${manager === "npm" ? "npm install" : `${manager} add`} ${deps.join(" ")}`;
