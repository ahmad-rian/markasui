import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test,
  type Browser,
  type Page,
  type TestInfo,
} from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  templateFrameworks,
  templateParityFrameworks,
  templateParityTimeout,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "tabungan";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const IMAGE_COUNT = 2;

// Halaman panjang dengan foto: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

/** Muat semua foto (termasuk yang lazy) dan tunggu sampai terdekode, supaya tangkapan layar deterministik. */
async function loadImages(page: Page) {
  await expect(page.locator("main img")).toHaveCount(IMAGE_COUNT);
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((image) => {
        image.loading = "eager";
        return image.decode().catch(() => undefined);
      }),
    ),
  );
}

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bigger plans, starting today",
  );
  await loadImages(page);
  await page.evaluate(() => document.fonts.ready);
}

async function capture(
  browser: Browser,
  viewport: { width: number; height: number },
  framework: Framework,
  theme: Theme,
) {
  const context = await browser.newContext({
    baseURL: test.info().project.use.baseURL,
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await openTemplate(page, framework, theme);
  const image = PNG.sync.read(
    await page.screenshot({
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    }),
  );
  await context.close();
  return image;
}

async function expectSameAsReact(
  browser: Browser,
  viewport: { width: number; height: number },
  testInfo: TestInfo,
  theme: Theme,
) {
  const reference = await capture(browser, viewport, "react", theme);
  for (const framework of templateParityFrameworks(SLUG)) {
    const candidate = await capture(browser, viewport, framework, theme);
    expect([candidate.width, candidate.height], `ukuran ${framework}`).toEqual([
      reference.width,
      reference.height,
    ]);
    const diff = new PNG({ width: reference.width, height: reference.height });
    const changed = pixelmatch(
      reference.data,
      candidate.data,
      diff.data,
      reference.width,
      reference.height,
      { threshold: 0.1 },
    );
    const ratio = changed / (reference.width * reference.height);
    if (ratio > MAX_DIFF_RATIO)
      await testInfo.attach(`${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    expect(ratio, `selisih piksel ${framework} vs react`).toBeLessThanOrEqual(
      MAX_DIFF_RATIO,
    );
  }
}

async function expectNoAxeViolations(page: Page, label: string) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    ),
    label,
  ).toEqual([]);
}

test.describe("kesamaan tampilan", () => {
  test.describe.configure({ timeout: 2 * templateParityTimeout(SLUG) });
  test("desktop light", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, DESKTOP, testInfo, "light");
  });
  test("desktop dark", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, DESKTOP, testInfo, "dark");
  });
  test("mobile light", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, MOBILE, testInfo, "light");
  });
});

for (const framework of templateFrameworks(SLUG)) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core (${theme})`, async ({ page }) => {
        await openTemplate(page, framework, theme);
        await expectNoAxeViolations(page, theme);
      });
    }

    test("aksen biru dipakai tombol utama dan tetap lolos axe", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        page.getByRole("main").getByRole("link", { name: "Get started" }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Start this plan" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto punya ukuran tetap dan teks alternatif", async ({ page }) => {
      await openTemplate(page, framework);
      const images = page.locator("main img");
      for (const image of await images.all()) {
        await expect(image).toHaveAttribute("width", /\d+/);
        await expect(image).toHaveAttribute("height", /\d+/);
        await expect(image).toHaveAttribute("alt", /\w/);
        expect(
          await image.evaluate((node: HTMLImageElement) => node.naturalWidth),
        ).toBeGreaterThan(0);
      }
      await expect(images.first()).not.toHaveAttribute("loading", "lazy");
    });

    test("menu mobile terbuka, menutup saat link dipilih dan Escape", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const toggle = page.getByRole("button", { name: "Menu" });
      const menu = page.getByRole("navigation", { name: "Main mobile" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "Plan" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#plan$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("simulator menghitung ulang total proyeksi", async ({ page }) => {
      await openTemplate(page, framework);
      const form = page.getByRole("form", { name: "Savings simulator" });
      const total = page.locator("[data-sim-total]");
      const paid = page.locator("[data-sim-paid]");
      const growth = page.locator("[data-sim-growth]");
      await expect(total).toHaveText("Rp 71.592.902");
      await expect(paid).toHaveText("Rp 60.000.000");
      await expect(growth).toHaveText("Rp 11.592.902");
      await form.getByRole("button", { name: "2,5jt" }).click();
      await expect(form.getByLabel("Monthly amount")).toHaveValue("2.500.000");
      await form.getByLabel("Duration in years").fill("10");
      await expect(page.locator("[data-sim-years]")).toHaveText("10 years");
      const returns = page.getByRole("group", {
        name: "Expected return a year",
      });
      const savings = returns.getByRole("button", { name: "Savings 4,5%" });
      await savings.click();
      await expect(savings).toHaveAttribute("aria-pressed", "true");
      await expect(paid).toHaveText("Rp 300.000.000");
      await expect(total).toHaveText("Rp 377.995.184");
      await expect(growth).toHaveText("Rp 77.995.184");
      // Mengeklik pilihan aktif tidak mengosongkan pilihan.
      await savings.click();
      await expect(savings).toHaveAttribute("aria-pressed", "true");
      await returns.getByRole("button", { name: "Equity 10%" }).click();
      await expect(total).toHaveText("Rp 512.112.447");
      await page.getByRole("button", { name: "Start this plan" }).click();
      await expect(toastRegion(page)).toContainText(
        "Rp 2.500.000 a month for 10 years",
      );
    });

    test("kartu produk dan advisor memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Buy gold" }).click();
      await expect(toastRegion(page)).toContainText("Digital gold selected");
      await page.getByRole("button", { name: "Ask an advisor" }).click();
      await expect(toastRegion(page)).toContainText("Advisor chat opened");
      await page.getByRole("button", { name: "Download for Android" }).click();
      await expect(toastRegion(page)).toContainText(
        "Opening the Android store",
      );
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/Savings are held in segregated/);
      const second = page.getByText(/There is no minimum balance and no/);
      await expect(first).toBeHidden();
      await page.getByText("Is my money safe with Tunas?").click();
      await expect(first).toBeVisible();
      await page.getByText("How much do I need to start?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("tautan SMS memvalidasi nomor lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Get the link by SMS");
      const submit = page.getByRole("button", { name: "Send link" });
      await field.fill("12345");
      await submit.click();
      await expect(
        page.getByText("Enter an Indonesian mobile number"),
      ).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("0812-3456-7890");
      await submit.click();
      await expect(toastRegion(page)).toContainText("sent to 081234567890");
      await expect(field).toHaveValue("");
      await expect(field).not.toHaveAttribute("aria-invalid", "true");
      await expect(
        page.getByText("Enter an Indonesian mobile number"),
      ).toHaveCount(0);
    });

    for (const viewport of [MOBILE, SMALLEST])
      test(`tanpa overflow horizontal di ${viewport.width} px`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await openTemplate(page, framework);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
  });
}
