/**
 * Bangkitkan entry CSS per halaman ke src/generated/css/ supaya setiap halaman hanya memuat class
 * yang ia tampilkan (budget CSS PRD 30 KB gzip per halaman):
 * - components/<nama>.css: CSS situs + komponen itu, contoh dan variasinya, dan komponen lain yang dipakai contohnya.
 * - landing.css: CSS situs + fixture yang tampil hidup di landing (lib/landing.ts).
 * - templates/<slug>.css: styles/templates.css + satu template (dashboard atau page) dan komponen yang dipakainya.
 * Pemakaian (dari apps/docs): node scripts/page-css.ts
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { LANDING_FIXTURES } from "../src/lib/landing.ts";

const docs = resolve(import.meta.dirname, "..");
const root = resolve(docs, "../..");
const componentsDir = join(root, "components");
const examplesDir = join(root, "examples");
const templatesDir = join(root, "templates");
const outDir = join(docs, "src/generated/css");
const globalCss = join(docs, "src/styles/global.css");

const EXAMPLE_FILES = {
  blade: ".blade.php",
  react: ".tsx",
  vue: ".vue",
  svelte: ".svelte",
  astro: ".astro",
  angular: ".ts",
} as const;
/** File komponen yang berisi class (meta.json dan usage.md tidak dirender sebagai markup). */
const SOURCE_FILE = /\.(blade\.php|tsx|ts|vue|svelte|astro)$/;
/** Rujukan ke komponen lain: import ../../components/<nama>/, import ../<nama>/ di dalam komponen, atau <x-markas.nama>. */
const COMPONENT_REF =
  /components\/([a-z-]+)\/|["']\.\.\/([a-z-]+)\/|x-markas\.([a-z-]+)/g;

const componentNames = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const knownComponents = new Set(componentNames);

const componentFiles = (name: string) =>
  readdirSync(join(componentsDir, name))
    .filter((file) => SOURCE_FILE.test(file))
    .map((file) => join(componentsDir, name, file));

const exampleFiles = (fixture: string) =>
  Object.entries(EXAMPLE_FILES)
    .map(([fw, ext]) => join(examplesDir, fw, `${fixture}${ext}`))
    .filter((file) => existsSync(file));

const referencedComponents = (file: string) =>
  [...readFileSync(file, "utf8").matchAll(COMPONENT_REF)]
    .map((match) => match[1] ?? match[2] ?? match[3]!)
    .filter((name) => knownComponents.has(name));

/** Semua file sumber yang dibutuhkan: file awal plus komponen yang dirujuk, beserta rujukan komponen itu sendiri. */
function sourceClosure(files: string[], components: string[] = []): string[] {
  const seen = new Set<string>();
  const queue = [...components];
  for (const file of files) queue.push(...referencedComponents(file));
  while (queue.length) {
    const name = queue.pop()!;
    if (seen.has(name)) continue;
    seen.add(name);
    for (const file of componentFiles(name))
      queue.push(...referencedComponents(file));
  }
  const dirs = [...seen].sort().map((name) => join(componentsDir, name));
  return [...dirs, ...files.toSorted()];
}

function cssFile(path: string, imports: string[], sources: string[]) {
  const rel = (target: string) =>
    relative(dirname(path), target).replaceAll("\\", "/");
  const lines = [
    "/* Dibangkitkan oleh scripts/page-css.ts. Jangan diedit. */",
    ...imports.map((file) => `@import "${rel(file)}";`),
    ...sources.map((source) => `@source "${rel(source)}";`),
  ];
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${lines.join("\n")}\n`);
}

function fixturesOf(component: string): string[] {
  const variants = readdirSync(join(examplesDir, "react"))
    .filter(
      (file) => file.startsWith(`${component}--`) && file.endsWith(".tsx"),
    )
    .map((file) => file.slice(0, -".tsx".length));
  return [component, ...variants];
}

const templateNames = readdirSync(templatesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

/** File sumber satu template (blade, react, vue). */
const templateFiles = (slug: string): string[] =>
  Object.keys(EXAMPLE_FILES).flatMap((fw) => {
    const dir = join(templatesDir, slug, fw);
    return existsSync(dir)
      ? readdirSync(dir).map((file) => join(dir, file))
      : [];
  });

rmSync(outDir, { recursive: true, force: true });

for (const name of componentNames) {
  const examples = fixturesOf(name).flatMap(exampleFiles);
  cssFile(
    join(outDir, "components", `${name}.css`),
    [globalCss],
    sourceClosure(examples, [name]),
  );
}

const landingExamples = LANDING_FIXTURES.flatMap((fixture) => {
  const files = exampleFiles(fixture);
  if (!files.length)
    throw new Error(`Fixture landing ${fixture} tidak ada di examples/`);
  return files;
});
cssFile(
  join(outDir, "landing.css"),
  [globalCss],
  sourceClosure(landingExamples),
);

const templatesCss = join(docs, "src/styles/templates.css");
for (const slug of templateNames) {
  const files = templateFiles(slug);
  if (!files.length) continue;
  cssFile(
    join(outDir, "templates", `${slug}.css`),
    [templatesCss],
    sourceClosure(files),
  );
}

console.log(
  `page-css: ${componentNames.length} komponen, landing, ${templateNames.length} template -> ${relative(docs, outDir)}`,
);
