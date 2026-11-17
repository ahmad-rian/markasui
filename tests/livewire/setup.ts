import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { build } from "vite";

const repo = resolve(import.meta.dirname, "../..");
const fixtures = resolve(import.meta.dirname, "app");

/** Where the throwaway Laravel app lives. Reused between local runs so only the first one downloads Laravel. */
export const appDirFor = (major: number): string =>
  process.env.LIVEWIRE_APP_DIR ?? join(tmpdir(), `markas-livewire-${major}`);

const run = (command: string, args: string[], cwd: string) => {
  console.log(`  $ ${command} ${args.join(" ")}`);
  execFileSync(command, args, { cwd, stdio: "inherit" });
};

/** Laravel skeleton plus livewire/livewire:^<major>, installed with Composer outside the repo. */
function installApp(appDir: string, major: number): void {
  if (!existsSync(join(appDir, "artisan"))) {
    mkdirSync(join(appDir, ".."), { recursive: true });
    run(
      "composer",
      [
        "create-project",
        "laravel/laravel",
        appDir,
        "--prefer-dist",
        "--no-interaction",
        "--quiet",
      ],
      repo,
    );
  }
  const composer = JSON.parse(
    readFileSync(join(appDir, "composer.json"), "utf8"),
  );
  const constraint = `^${major}`;
  if (composer.require?.["livewire/livewire"] !== constraint) {
    run(
      "composer",
      [
        "require",
        `livewire/livewire:${constraint}`,
        "--with-all-dependencies",
        "--no-interaction",
        "--quiet",
      ],
      appDir,
    );
  }
}

/** Components are linked from the repo (as <x-markas.name>), examples as the `examples.*` view namespace. */
function linkRepo(appDir: string): void {
  const views = join(appDir, "resources/views");
  const target = join(views, "components/markas");
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  for (const name of readdirSync(join(repo, "components"))) {
    const metaPath = join(repo, "components", name, "meta.json");
    if (!existsSync(metaPath)) continue;
    const file: string | undefined = JSON.parse(readFileSync(metaPath, "utf8"))
      .frameworks?.blade?.file;
    if (file)
      symlinkSync(
        join(repo, "components", name, file),
        join(target, `${name}.blade.php`),
      );
  }
  rmSync(join(views, "examples"), { recursive: true, force: true });
  symlinkSync(join(repo, "examples/blade"), join(views, "examples"));
}

/** Tailwind build of the playground stylesheet (tokens + every class used by components and examples). */
async function buildCss(appDir: string): Promise<void> {
  await build({
    configFile: false,
    root: join(repo, "playground"),
    logLevel: "warn",
    plugins: [tailwindcss()],
    build: {
      outDir: join(appDir, "public/markas"),
      emptyOutDir: true,
      rollupOptions: {
        input: join(repo, "playground/src/styles.css"),
        output: { assetFileNames: "app.css" },
      },
    },
  });
}

/** Create or refresh the Livewire test app. Safe to run repeatedly. */
export async function setupApp(major: number): Promise<string> {
  const appDir = appDirFor(major);
  console.log(`Livewire ${major} app: ${appDir}`);
  installApp(appDir, major);
  cpSync(fixtures, appDir, { recursive: true, force: true });
  linkRepo(appDir);
  await buildCss(appDir);
  // Production caches (config, routes, events, compiled views), so timings match a deployed app.
  run("php", ["artisan", "optimize:clear", "--quiet"], appDir);
  run("php", ["artisan", "optimize", "--quiet"], appDir);
  return appDir;
}
