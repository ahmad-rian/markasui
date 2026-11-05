/**
 * Buat thumbnail WebP untuk kartu di /components dari contoh di examples/react.
 * Pemakaian: node scripts/thumbnails.ts   (butuh browser Playwright: pnpm exec playwright install chromium)
 */
import { execFileSync } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";
import { createServer } from "vite";

const WIDTH = 480;
const HEIGHT = 300;
const MAX_BYTES = 30 * 1024;
const QUALITY = 80;
const BACKGROUND = { light: "#f4f4f1", dark: "#0e110e" } as const;

/** Komponen overlay difoto dalam keadaan terbuka supaya kartunya tidak hanya berisi tombol pemicu. */
const OPEN_ACTIONS: Record<string, (page: Page) => Promise<void>> = {
  modal: (page) => page.getByRole("button").first().click(),
  "alert-dialog": (page) => page.getByRole("button").first().click(),
  command: (page) => page.getByRole("button").first().click(),
  popover: (page) => page.getByRole("button").first().click(),
  "dropdown-menu": (page) => page.getByRole("button").first().click(),
  menubar: (page) => page.getByRole("menuitem").first().click(),
  "hover-card": (page) => page.getByRole("link").first().hover(),
  "context-menu": (page) =>
    page
      .getByRole("group")
      .first()
      .click({ button: "right", position: { x: 24, y: 16 } }),
  combobox: (page) => page.getByRole("combobox").first().click(),
};
const DIALOGS = new Set(["modal", "alert-dialog", "command"]);
const OPEN_DELAY = 400;
const TRIM_PADDING = { top: 120, bottom: 120, left: 160, right: 160 };

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
        const png = await capture(page, name, theme);

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

async function capture(
  page: Page,
  name: string,
  theme: keyof typeof BACKGROUND,
): Promise<Buffer> {
  const options = { animations: "disabled", caret: "hide" } as const;
  const open = OPEN_ACTIONS[name];
  if (!open) return page.locator("#fixture").screenshot(options);
  await open(page);
  await page.waitForTimeout(OPEN_DELAY);
  if (DIALOGS.has(name))
    return page.locator("dialog[open]").screenshot(options);
  // Menu dan popover ada di top layer, jadi foto seluruh layar lalu potong ruang kosongnya.
  return sharp(await page.screenshot(options))
    .trim({ threshold: 4 })
    .extend({ ...TRIM_PADDING, background: BACKGROUND[theme] })
    .toBuffer();
}

main().catch((error) => {
  console.error(
    `thumbnails: ${error instanceof Error ? error.message : error}`,
  );
  process.exit(1);
});
