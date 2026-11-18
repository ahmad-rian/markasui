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

const SLUG = "industri";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const IMAGE_COUNT = 9;

// Halaman panjang dengan foto: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const equipmentCards = (page: Page) => page.locator("[data-equipment]:visible");

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
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Worldwide partnership",
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
        page
          .getByRole("main")
          .getByRole("link", { name: "Request a quote", exact: true }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Send request" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto punya ukuran tetap dan teks alternatif", async ({ page }) => {
      await openTemplate(page, framework);
      const images = page.locator("main img");
      for (const image of await images.all()) {
        await expect(image).toHaveAttribute("width", /\d+/);
        await expect(image).toHaveAttribute("height", /\d+/);
        await expect(image).toHaveAttribute("alt");
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
      await menu.getByRole("link", { name: "Projects" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#projects$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("lini produk dipilih dan panel detail berganti", async ({ page }) => {
      await openTemplate(page, framework);
      const lines = page.getByRole("list", { name: "Product lines" });
      const panel = page.locator("#industri-service");
      const pumps = lines.getByRole("button", { name: /Process pumps/ });
      const spares = lines.getByRole("button", { name: /Spare parts and MRO/ });
      await expect(pumps).toHaveAttribute("aria-pressed", "true");
      await expect(panel.locator("[data-service-title]")).toHaveText(
        "Process pumps",
      );
      await spares.click();
      await expect(spares).toHaveAttribute("aria-pressed", "true");
      await expect(pumps).toHaveAttribute("aria-pressed", "false");
      await expect(panel.locator("[data-service-title]")).toHaveText(
        "Spare parts and MRO",
      );
      await expect(panel).toContainText("48 hours from stock");
      await expect(panel).toContainText("Consignment stock at your site");
    });

    test("filter kategori menyaring katalog peralatan", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(equipmentCards(page)).toHaveCount(6);
      await expect(page.getByText("Showing all 6 items")).toBeVisible();
      const filters = page.getByRole("group", {
        name: "Filter equipment by category",
      });
      const valves = filters.getByRole("button", { name: "Valves" });
      await valves.click();
      await expect(valves).toHaveAttribute("aria-pressed", "true");
      await expect(equipmentCards(page)).toHaveCount(2);
      await expect(page.getByText("Showing 2 of 6 items")).toBeVisible();
      await expect(equipmentCards(page).first()).toContainText("Gate valves");
      // Mengeklik pilihan aktif tidak mengosongkan filter.
      await valves.click();
      await expect(valves).toHaveAttribute("aria-pressed", "true");
      await expect(equipmentCards(page)).toHaveCount(2);
      await filters.getByRole("button", { name: "All" }).click();
      await expect(equipmentCards(page)).toHaveCount(6);
    });

    test("RFQ memvalidasi, memakai peralatan pilihan, lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("link", { name: "Request a quote, Gas compressor package" })
        .click();
      await expect(page).toHaveURL(/#rfq$/);
      const form = page.getByRole("form", { name: "Request for quotation" });
      await expect(form.getByLabel("Equipment")).toHaveValue("compressor");
      const company = form.getByLabel("Company");
      const email = form.getByLabel("Work email");
      const details = form.getByLabel("Requirements");
      const send = form.getByRole("button", { name: "Send request" });
      await send.click();
      await expect(form.getByText("Enter your company name.")).toBeVisible();
      await expect(company).toHaveAttribute("aria-invalid", "true");
      await expect(company).toHaveAttribute(
        "aria-describedby",
        "industri-rfq-error",
      );
      await company.fill("PT Petro Andalan");
      await email.fill("bukan-email");
      await send.click();
      await expect(form.getByText(/Enter a valid work email/)).toBeVisible();
      await expect(email).toHaveAttribute("aria-invalid", "true");
      await expect(company).not.toHaveAttribute("aria-invalid", "true");
      await email.fill("procurement@petroandalan.co.id");
      await details.fill("Two units");
      await send.click();
      await expect(form.getByText(/at least 20 characters/)).toBeVisible();
      await expect(details).toHaveAttribute("aria-invalid", "true");
      await details.fill("Two units, 900 m3/h gas, delivery to Bontang");
      await send.click();
      await expect(toastRegion(page)).toContainText(
        "reply to procurement@petroandalan.co.id",
      );
      await expect(company).toHaveValue("");
      await expect(form.getByLabel("Equipment")).toHaveValue("");
      await expect(details).not.toHaveAttribute("aria-invalid", "true");
      await expect(form.getByText(/at least 20 characters/)).toHaveCount(0);
    });

    test("profil perusahaan memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Company profile" }).click();
      await expect(toastRegion(page)).toContainText(
        "Company profile on its way",
      );
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
