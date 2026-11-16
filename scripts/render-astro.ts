/**
 * Render examples/astro/*.astro dan templates/<slug>/astro/*.astro ke HTML statis (plus script klien
 * yang diproses Astro) untuk playground dan tes e2e, seperti scripts/render-blade.php untuk Blade.
 *
 * Pemakaian: node scripts/render-astro.ts [folder-output] [nama...]
 * Default output: playground/public/astro (dilayani di /astro/<nama>.html dan
 * /astro/templates/<slug>.html).
 * Dengan nama (mis. "modal switch" atau "rambu"), hanya contoh <nama> dan <nama>--* serta template
 * <nama> yang dirender: lebih cepat, dan aman dijalankan beberapa agen sekaligus karena hasil disalin
 * tanpa menghapus file lain.
 */
import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { build } from "astro";

const root = resolve(import.meta.dirname, "..");
const [output = "playground/public/astro", ...names] = process.argv.slice(2);
const outDir = resolve(root, output);
// Build ke folder sementara: astro build mengosongkan outDir-nya sendiri.
const tempDir = await mkdtemp(join(tmpdir(), "markas-astro-"));

try {
  process.env.MARKAS_ASTRO_ONLY = names.join(",");
  await build({
    root: join(root, "scripts/astro-fixtures"),
    outDir: tempDir,
    base: "/astro",
    logLevel: "warn",
    build: { format: "file" },
    devToolbar: { enabled: false },
    telemetry: false,
    vite: { logLevel: "warn" },
  } as Parameters<typeof build>[0]);
  await cp(tempDir, outDir, { recursive: true });
  console.log(`astro: contoh ditulis ke ${outDir}`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
