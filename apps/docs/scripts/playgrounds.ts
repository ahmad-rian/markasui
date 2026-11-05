/**
 * Tulis template Blade untuk setiap kombinasi playground, lalu render ke HTML.
 * Pemakaian (dari apps/docs): node scripts/playgrounds.ts
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  MAX_COMBINATIONS,
  PLAYGROUNDS,
  combinations,
  usageCode,
} from "../src/lib/playgrounds.ts";

const docs = resolve(import.meta.dirname, "..");
const sourceDir = join(docs, ".cache/playground-blade");
const outDir = join(docs, "src/generated/playground");

rmSync(sourceDir, { recursive: true, force: true });
mkdirSync(sourceDir, { recursive: true });

let count = 0;
for (const [name, playground] of Object.entries(PLAYGROUNDS)) {
  const combos = combinations(playground.controls);
  if (combos.length > MAX_COMBINATIONS)
    throw new Error(
      `${name}: ${combos.length} kombinasi, maksimal ${MAX_COMBINATIONS}`,
    );
  combos.forEach((values, index) => {
    writeFileSync(
      join(sourceDir, `${name}--${index}.blade.php`),
      usageCode(name, "blade", playground.build(values)),
    );
    count++;
  });
}

execFileSync(
  "php",
  [resolve(docs, "../../scripts/render-blade.php"), sourceDir, outDir],
  { stdio: "inherit" },
);
console.log(
  `playgrounds: ${count} kombinasi Blade dari ${Object.keys(PLAYGROUNDS).length} komponen`,
);
