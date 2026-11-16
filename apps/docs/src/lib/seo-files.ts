/**
 * Bagian SEO yang membaca disk saat build: gambar OG di public/og dan tanggal ubah dari git.
 * Hanya untuk kode server (halaman dan endpoint), jangan diimpor skrip klien.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "./i18n";
import { DOCS_ROOT } from "./paths";

const OG_DIR = join(DOCS_ROOT, "public/og");
export const OG_FALLBACK = "default";
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Kunci gambar OG dari path tanpa locale: "/" -> "home", "/components/button" -> "components/button". */
export const ogKey = (path: string) =>
  path === "/" ? "home" : path.replace(/^\//, "");

/**
 * Gambar OG untuk satu halaman (scripts/og-images.ts). Urutan: versi bahasa itu (og/id/...),
 * versi Inggris, lalu gambar bawaan. Tanpa file sama sekali, hasilnya undefined.
 */
export function ogImagePath(locale: Locale, path: string): string | undefined {
  const key = ogKey(path);
  const candidates = [
    ...(locale === "en" ? [] : [`${locale}/${key}`]),
    key,
    OG_FALLBACK,
  ];
  const found = candidates.find((candidate) =>
    existsSync(join(OG_DIR, `${candidate}.png`)),
  );
  return found && `/og/${found}.png`;
}

const gitDates = new Map<string, string | undefined>();

/** Tanggal commit terakhir (YYYY-MM-DD) untuk file atau folder; undefined di luar git atau file baru. */
export function gitModified(path: string): string | undefined {
  if (gitDates.has(path)) return gitDates.get(path);
  let date: string | undefined;
  try {
    date =
      execFileSync("git", ["log", "-1", "--format=%cs", "--", path], {
        cwd: DOCS_ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || undefined;
  } catch {
    // Build di luar repo git (misalnya arsip sumber): tanpa lastmod, sitemap tetap valid.
    date = undefined;
  }
  gitDates.set(path, date);
  return date;
}
