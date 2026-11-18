/**
 * Salin foto template (templates/<slug>/images/*) ke folder publik, supaya keenam versi template
 * memakai URL yang sama: /template-images/<slug>/<file>. Dipakai oleh generate docs.
 * Pemakaian: node scripts/template-images.ts <folder-output>
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = resolve(process.argv[2] ?? "apps/docs/public/template-images");
const templates = join(root, "templates");

rmSync(out, { recursive: true, force: true });
let count = 0;
for (const slug of readdirSync(templates)) {
  const images = join(templates, slug, "images");
  if (!existsSync(images)) continue;
  mkdirSync(join(out, slug), { recursive: true });
  for (const file of readdirSync(images)) {
    if (!/\.(webp|avif|jpe?g|png|svg)$/.test(file)) continue;
    cpSync(join(images, file), join(out, slug, file));
    count++;
  }
}
console.log(`template-images: ${count} file ke ${out}`);
