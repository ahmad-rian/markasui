import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

/** Semua framework. React adalah rujukan visual; framework lain dibandingkan terhadapnya. */
export const frameworks = [
  "blade",
  "react",
  "vue",
  "svelte",
  "astro",
  "angular",
] as const;
export type Framework = (typeof frameworks)[number];

/** Ekstensi contoh di examples/<framework>/<nama><ext>. */
export const EXAMPLE_EXTENSIONS: Record<Framework, string> = {
  blade: ".blade.php",
  react: ".tsx",
  vue: ".vue",
  svelte: ".svelte",
  astro: ".astro",
  angular: ".ts",
};

const examplesDir = resolve(import.meta.dirname, "../../examples");

/** True kalau framework itu sudah punya contoh untuk komponen (atau variasi) ini. */
export const hasFixture = (framework: Framework, component: string): boolean =>
  existsSync(
    resolve(
      examplesDir,
      framework,
      `${component}${EXAMPLE_EXTENSIONS[framework]}`,
    ),
  );

/** Framework yang punya contoh untuk komponen ini. Porting bertahap: yang belum ada dilewati. */
export const frameworksFor = (component: string): Framework[] =>
  frameworks.filter((framework) => hasFixture(framework, component));

const templatesDir = resolve(import.meta.dirname, "../../templates");
const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase());

/** File tiap versi template: templates/<slug>/<framework>/<file>. */
export const templateFile = (framework: Framework, slug: string): string =>
  ({
    blade: `${slug}.blade.php`,
    react: `${pascal(slug)}.tsx`,
    vue: `${pascal(slug)}.vue`,
    svelte: `${pascal(slug)}.svelte`,
    astro: `${pascal(slug)}.astro`,
    angular: `${slug}.component.ts`,
  })[framework];

/** Framework yang sudah punya versi template ini. Porting bertahap: yang belum ada tidak diuji. */
export const templateFrameworks = (slug: string): Framework[] =>
  frameworks.filter((framework) =>
    existsSync(
      resolve(templatesDir, slug, framework, templateFile(framework, slug)),
    ),
  );

/** Framework template yang dibandingkan piksel demi piksel terhadap React. */
export const templateParityFrameworks = (slug: string): Framework[] =>
  templateFrameworks(slug).filter((framework) => framework !== "react");

/** Satu tangkapan layar template (konteks baru, render, full page) per framework. */
const PARITY_MS_PER_FRAMEWORK = 15_000;
const MIN_TEST_TIMEOUT = 30_000;

/** Batas waktu tes kesamaan tampilan: naik seiring jumlah framework yang dibandingkan. */
export const templateParityTimeout = (slug: string): number =>
  Math.max(
    MIN_TEST_TIMEOUT,
    PARITY_MS_PER_FRAMEWORK * templateFrameworks(slug).length,
  );

/** Satu pemindaian axe-core (WCAG AA, termasuk cek kontras) untuk satu halaman template. */
const AXE_MS_PER_PAGE = 10_000;

/** Batas waktu tes axe yang memindai beberapa halaman template dalam satu tes. */
export const templateAxeTimeout = (pageCount: number): number =>
  MIN_TEST_TIMEOUT + AXE_MS_PER_PAGE * pageCount;

/**
 * Satu kali membuka fixture di playground dev. Entri React, Vue, Svelte, dan Angular memuat semua
 * contoh secara eager, jadi satu halaman sekitar 1,5 detik saat sepi dan 2 sampai 3 kali lipat
 * saat semua worker jalan.
 */
const FIXTURE_LOAD_MS = 4_000;

/** Batas waktu tes yang membuka banyak fixture berturut-turut dalam satu tes. */
export const fixtureLoadTimeout = (loadCount: number): number =>
  Math.max(MIN_TEST_TIMEOUT, FIXTURE_LOAD_MS * loadCount);

/** Semua komponen yang punya contoh di examples/react. Komponen baru otomatis ikut diuji. */
export const components = readdirSync(resolve(examplesDir, "react"))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort();
export type ComponentName = string;

export const themes = ["light", "dark"] as const;
export type Theme = (typeof themes)[number];

/** Batas selisih piksel dari PRD bagian 11. */
export const MAX_DIFF_RATIO = 0.005;

/**
 * Buka contoh di playground. Kalau framework itu belum punya contoh untuk komponen ini, tes
 * dilewati (skip), bukan gagal, supaya porting ke Svelte, Astro, dan Angular bisa bertahap.
 */
export async function openFixture(
  page: Page,
  framework: Framework,
  component: ComponentName,
  theme: Theme = "light",
) {
  test.skip(
    !hasFixture(framework, component),
    `${framework} belum punya contoh ${component}`,
  );
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
 * Bandingkan setiap framework yang punya contoh terhadap React untuk satu keadaan.
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

  for (const framework of frameworksFor(component).filter(
    (framework) => framework !== "react",
  )) {
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
