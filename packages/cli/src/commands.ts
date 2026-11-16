import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import type { Io } from "./io.ts";
import {
  CONFIG_FILE,
  defaultConfig,
  detectFramework,
  detectPackageManager,
  installCommand,
  readConfig,
} from "./project.ts";
import { createRegistry, type Registry } from "./registry.ts";
import { setupGuide } from "./setup.ts";
import {
  CORE_FRAMEWORKS,
  FRAMEWORKS,
  isFramework,
  type Framework,
  type IndexItem,
  type ProjectConfig,
} from "./types.ts";

export type CommonOptions = {
  cwd: string;
  framework?: string;
  registry?: string;
  overwrite?: boolean;
  yes?: boolean;
};

export class CliError extends Error {
  override name = "CliError";
}

function parseFramework(value: string | undefined): Framework | undefined {
  if (value === undefined) return undefined;
  if (!isFramework(value))
    throw new CliError(
      `--framework must be one of ${FRAMEWORKS.join(", ")} (got "${value}")`,
    );
  return value;
}

async function resolveConfig(options: CommonOptions): Promise<ProjectConfig> {
  const forced = parseFramework(options.framework);
  const saved = await readConfig(options.cwd);
  if (saved && (!forced || forced === saved.framework)) return saved;

  const detection = forced
    ? {
        framework: forced,
        meta: forced === "blade" ? ("laravel" as const) : forced,
      }
    : await detectFramework(options.cwd);
  if (!detection) {
    throw new CliError(
      "Could not detect the framework. Run this from the root of a Laravel, React, Vue, Svelte, Astro, or Angular project, or pass --framework.",
    );
  }
  return defaultConfig(options.cwd, detection);
}

/** Registry pihak ketiga tidak boleh menulis ke luar folder komponen. */
const SAFE_FILE_NAME = /^[\w][\w.-]*$/;

type WriteResult = "created" | "unchanged" | "overwritten" | "skipped";

/** Tulis file tanpa pernah menimpa diam-diam: tanya dulu, atau lewati kalau tidak interaktif. */
async function writeSafely(
  path: string,
  content: string,
  options: CommonOptions,
  io: Io,
): Promise<WriteResult> {
  let current: string | null = null;
  try {
    current = await readFile(path, "utf8");
  } catch {
    // File belum ada.
  }
  const shown = relative(options.cwd, path);
  if (current === content) return "unchanged";
  if (current !== null && !options.overwrite) {
    const answer = options.yes
      ? true
      : await io.confirm(`${shown} already exists and differs. Overwrite?`);
    if (answer !== true) {
      io.warn(
        `  skipped: ${shown}${answer === null ? " (use --overwrite to replace it)" : ""}`,
      );
      return "skipped";
    }
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
  return current === null ? "created" : "overwritten";
}

const registryFor = (
  options: CommonOptions,
  config?: ProjectConfig,
): Registry =>
  createRegistry(
    options.registry ?? config?.registry ?? process.env.MARKASUI_REGISTRY,
  );

export async function init(
  options: CommonOptions,
  io: Io,
): Promise<ProjectConfig> {
  const config = await resolveConfig(options);
  const registry = registryFor(options, config);
  const theme = await registry.theme();

  const configResult = await writeSafely(
    join(options.cwd, CONFIG_FILE),
    `${JSON.stringify(config, null, 2)}\n`,
    options,
    io,
  );
  const cssResult = await writeSafely(
    join(options.cwd, config.cssPath),
    theme.css,
    options,
    io,
  );

  io.log(`Framework: ${config.framework}`);
  io.log(`  ${CONFIG_FILE}: ${configResult}`);
  io.log(`  ${config.cssPath}: ${cssResult}`);
  io.log("");
  io.log(setupGuide(config.framework, config.cssPath));
  return config;
}

export async function add(
  names: string[],
  options: CommonOptions,
  io: Io,
): Promise<void> {
  if (names.length === 0)
    throw new CliError(
      "Name at least one component, for example: npx markasui add button modal",
    );
  const config = await resolveConfig(options);
  const registry = registryFor(options, config);
  const items = await Promise.all(
    names.map((name) => registry.component(name)),
  );

  const deps = new Set<string>();
  const missing = items.filter((item) => !item.frameworks[config.framework]);
  if (missing.length === items.length)
    throw new CliError(
      `Not available for ${config.framework} yet: ${missing.map((item) => item.name).join(", ")}`,
    );
  for (const item of missing)
    io.warn(
      `${item.title}: not available for ${config.framework} yet, skipped`,
    );
  for (const item of items) {
    const file = item.frameworks[config.framework];
    if (!file) continue;
    if (!SAFE_FILE_NAME.test(file.file))
      throw new CliError(`Unsafe file name from the registry: "${file.file}"`);
    file.deps.forEach((dep) => deps.add(dep));
    const result = await writeSafely(
      join(options.cwd, config.componentsDir, file.file),
      file.code,
      options,
      io,
    );
    io.log(`${item.title}: ${result} ${join(config.componentsDir, file.file)}`);
  }

  if (!(await readConfig(options.cwd))) {
    io.log(
      `\nmarkas.json is missing. Run "npx markasui init" to copy markas.css as well.`,
    );
  }
  if (deps.size > 0) {
    const manager = await detectPackageManager(options.cwd);
    io.log(
      `\nThese components need the following dependencies:\n  ${installCommand(manager, [...deps])}`,
    );
    if (deps.has("alpinejs"))
      io.log("  (Livewire 3 and 4 already ship Alpine.js, so skip this step.)");
  }
}

/** Index lama tanpa field frameworks berarti hanya Blade, React, dan Vue. */
const supports = (item: IndexItem, framework: Framework) =>
  (item.frameworks ?? (CORE_FRAMEWORKS as readonly Framework[])).includes(
    framework,
  );

export async function list(options: CommonOptions, io: Io): Promise<void> {
  const config = await readConfig(options.cwd);
  const framework = parseFramework(options.framework) ?? config?.framework;
  const index = await registryFor(options, config ?? undefined).index();
  const categories = [...new Set(index.map((item) => item.category))];
  for (const category of categories) {
    io.log(category.toUpperCase());
    for (const item of index.filter((entry) => entry.category === category)) {
      const note =
        framework && !supports(item, framework)
          ? ` (not yet for ${framework})`
          : "";
      io.log(`  ${item.name.padEnd(16)} ${item.description}${note}`);
    }
  }
}
