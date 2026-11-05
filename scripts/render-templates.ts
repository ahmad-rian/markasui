/**
 * Render versi Blade setiap template ke <folder-output>/<slug>.html.
 * Pemakaian: node scripts/render-templates.ts <folder-output>
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = resolve(process.argv[2] ?? "playground/public/templates");

for (const slug of readdirSync(join(root, "templates"))) {
  const bladeDir = join(root, "templates", slug, "blade");
  if (!existsSync(bladeDir)) continue;
  execFileSync(
    "php",
    [join(root, "scripts/render-blade.php"), bladeDir, outDir],
    { stdio: "inherit" },
  );
}
