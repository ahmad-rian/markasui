/**
 * Buat thumbnail WebP untuk kartu di /components dari contoh di examples/react.
 * Pemakaian: node scripts/thumbnails.ts   (butuh browser Playwright: pnpm exec playwright install chromium)
 */
import { execFileSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { createServer } from "vite";

const WIDTH = 480;
const HEIGHT = 300;
const MAX_BYTES = 30 * 1024;
const QUALITY = 80;
const BACKGROUND = { light: "#f4f4f1", dark: "#0e110e" } as const;

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "apps/docs/public/thumbs");

async function main() {
  execFileSync(
    "php",
    ["scripts/render-blade.php", "examples/blade", "playground/public/blade"],
    { cwd: root },
  );
  // Variasi (<nama>--<variasi>) tidak butuh thumbnail; kartu hanya untuk komponen.
  const names = (await readdir(join(root, "examples/react")))
    .filter((file) => !file.includes("--"))
    .map((file) => file.replace(/\.tsx$/, ""));

  const server = await createServer({
    configFile: join(root, "playground/vite.config.ts"),
    logLevel: "error",
    server: { port: 5199 },
  });
  await server.listen();
  const browser = await chromium.launch();
  await mkdir(outDir, { recursive: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 800, height: 600 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    for (const name of names) {
      for (const theme of ["light", "dark"] as const) {
        await page.goto(
          `http://localhost:5199/react.html?c=${name}&theme=${theme}`,
        );
        await page.locator("body[data-ready=true]").waitFor();
        let png: Buffer;
        if (name === "modal") {
          await page.getByRole("button").first().click();
          await page.locator("dialog[open]").waitFor();
          png = await page
            .locator("dialog[open]")
            .screenshot({ animations: "disabled", caret: "hide" });
        } else {
          png = await page
            .locator("#fixture")
            .screenshot({ animations: "disabled", caret: "hide" });
        }

        const file = join(
          outDir,
          theme === "light" ? `${name}.webp` : `${name}-${theme}.webp`,
        );
        await sharp(png)
          .resize(WIDTH, HEIGHT, {
            fit: "contain",
            background: BACKGROUND[theme],
          })
          .webp({ quality: QUALITY, effort: 6 })
          .toFile(file);

        const { size } = await stat(file);
        if (size > MAX_BYTES)
          throw new Error(
            `${file} ${size} byte, lebih dari batas ${MAX_BYTES}`,
          );
        console.log(
          `thumbnails: ${name} (${theme}) ${(size / 1024).toFixed(1)} KB`,
        );
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error(
    `thumbnails: ${error instanceof Error ? error.message : error}`,
  );
  process.exit(1);
});
