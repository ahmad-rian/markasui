import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Astro membundel kode halaman ke dist/.prerender, jadi path relatif terhadap import.meta.url
 * tidak bisa dipakai. Build dan dev selalu dijalankan dari apps/docs (lihat package.json).
 */
export const DOCS_ROOT = process.cwd();
export const REPO_ROOT = resolve(DOCS_ROOT, "../..");

if (!existsSync(resolve(REPO_ROOT, "components"))) {
  throw new Error(
    `Folder components tidak ditemukan dari ${DOCS_ROOT}. Jalankan Astro dari folder apps/docs.`,
  );
}
