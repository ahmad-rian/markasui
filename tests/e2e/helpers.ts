import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { expect, type Page, type TestInfo } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export const frameworks = ["blade", "react", "vue"] as const;
export type Framework = (typeof frameworks)[number];

/** Semua komponen yang punya contoh di examples/react. Komponen baru otomatis ikut diuji. */
export const components = readdirSync(
  resolve(import.meta.dirname, "../../examples/react"),
)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort();
export type ComponentName = string;

export const themes = ["light", "dark"] as const;
export type Theme = (typeof themes)[number];

/** Batas selisih piksel dari PRD bagian 11. */
export const MAX_DIFF_RATIO = 0.005;

export async function openFixture(
  page: Page,
  framework: Framework,
  component: ComponentName,
  theme: Theme = "light",
) {
  await page.goto(`/${framework}.html?c=${component}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
}

export async function openModal(page: Page) {
  await page.getByRole("button", { name: "Delete project" }).click();
  await page.locator("dialog[open]").waitFor();
}

export const screenshot = async (
  page: Page,
  target: "fixture" | "page" = "fixture",
) =>
  PNG.sync.read(
    target === "page"
      ? await page.screenshot({ animations: "disabled", caret: "hide" })
      : await page
          .locator("#fixture")
          .screenshot({ animations: "disabled", caret: "hide" }),
  );

/**
 * Bandingkan Blade dan Vue terhadap React untuk satu keadaan.
 * `prepare` dijalankan setelah fixture siap, misalnya membuka dropdown, lalu mengembalikan screenshot.
 */
export async function expectSameAcrossFrameworks(
  page: Page,
  testInfo: TestInfo,
  component: ComponentName,
  theme: Theme,
  prepare: (page: Page) => Promise<PNG> = (p) => screenshot(p),
) {
  const capture = async (framework: Framework) => {
    await openFixture(page, framework, component, theme);
    return prepare(page);
  };
  const reference = await capture("react");

  for (const framework of ["blade", "vue"] as const) {
    const candidate = await capture(framework);
    expect(
      [candidate.width, candidate.height],
      `ukuran ${framework} berbeda dari react`,
    ).toEqual([reference.width, reference.height]);

    const diff = new PNG({ width: reference.width, height: reference.height });
    const changed = pixelmatch(
      reference.data,
      candidate.data,
      diff.data,
      reference.width,
      reference.height,
      {
        threshold: 0.1,
      },
    );
    const ratio = changed / (reference.width * reference.height);
    if (ratio > MAX_DIFF_RATIO) {
      await testInfo.attach(`${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
      await testInfo.attach(`${framework}.png`, {
        body: PNG.sync.write(candidate),
        contentType: "image/png",
      });
      await testInfo.attach("react.png", {
        body: PNG.sync.write(reference),
        contentType: "image/png",
      });
    }
    expect(ratio, `selisih piksel ${framework} vs react`).toBeLessThanOrEqual(
      MAX_DIFF_RATIO,
    );
  }
}
