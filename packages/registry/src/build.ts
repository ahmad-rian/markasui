/**
 * Build registry JSON dari components/<nama>/.
 *
 * Pemakaian: node packages/registry/src/build.ts [folder-output]
 * Default output: apps/docs/public/r
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  loadComponents,
  parseTheme,
  RegistryError,
  toIndexItem,
} from "./lib.ts";

const root = resolve(import.meta.dirname, "../../..");
const outDir = resolve(process.argv[2] ?? join(root, "apps/docs/public/r"));

const writeJson = (file: string, data: unknown) =>
  writeFile(join(outDir, file), `${JSON.stringify(data, null, 2)}\n`);

try {
  const items = await loadComponents(join(root, "components"));
  const theme = parseTheme(
    await readFile(join(root, "packages/theme/markas.css"), "utf8"),
  );

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await Promise.all([
    writeJson("index.json", items.map(toIndexItem)),
    writeJson("theme.json", theme),
    ...items.map((item) => writeJson(`${item.name}.json`, item)),
  ]);

  console.log(`registry: ${items.length} komponen ditulis ke ${outDir}`);
} catch (error) {
  console.error(
    error instanceof RegistryError ? `registry: ${error.message}` : error,
  );
  process.exit(1);
}
