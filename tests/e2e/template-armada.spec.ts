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

const SLUG = "armada";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Every vessel. One clear view.";
const PHOTO_COUNT = 4;

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

/** Buka template dan tunggu semua foto selesai di-decode (foto lazy dimuat sekaligus supaya deterministik). */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await expect(page.locator("img[src^='/template-images/']")).toHaveCount(
    PHOTO_COUNT,
  );
  await page.evaluate(async () => {
    const photos = [...document.images];
    for (const photo of photos) photo.loading = "eager";
    await Promise.all(photos.map((photo) => photo.decode()));
    await document.fonts.ready;
  });
}

async function capture(
  browser: Browser,
  viewport: { width: number; height: number },
  framework: Framework,
  theme: Theme,
) {
  // Reduced motion: marquee logo berhenti dan tampil sebagai satu baris, jadi hasilnya deterministik.
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
      await expect(page.getByRole("link", { name: "Get a demo" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expect(
        page.getByRole("button", { name: "Request a demo" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto punya ukuran tetap dan alt", async ({ page }) => {
      await openTemplate(page, framework);
      const hero = page.locator("img[src$='hero-ship.webp']");
      await expect(hero).toHaveAttribute("width", "1600");
      await expect(hero).toHaveAttribute("alt", /Container ship/);
      const sectors = page.locator("img[src*='/sector-']");
      await expect(sectors).toHaveCount(3);
      for (const photo of await sectors.all()) {
        await expect(photo).toHaveAttribute("height", "540");
        await expect(photo).toHaveAttribute("alt", /\w+/);
      }
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
      await menu.getByRole("link", { name: "Solutions" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#solutions$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("modul platform mengganti isi panel", async ({ page }) => {
      await openTemplate(page, framework);
      const group = page.getByRole("group", { name: "Platform modules" });
      const panel = page.locator("[data-module]");
      await expect(panel).toHaveAttribute("data-module", "tracking");
      await expect(panel.locator("[data-panel-title]")).toHaveText(
        "Fleet position",
      );
      const fuel = group.getByRole("button", { name: "Fuel" });
      await fuel.click();
      await expect(fuel).toHaveAttribute("aria-pressed", "true");
      await expect(panel).toHaveAttribute("data-module", "fuel");
      await expect(panel).toContainText("1,283 t");
      await expect(
        page.getByRole("heading", { name: "Fuel and emissions" }),
      ).toBeVisible();
      // Mengeklik pilihan aktif tidak mengosongkan pilihan.
      await fuel.click();
      await expect(fuel).toHaveAttribute("aria-pressed", "true");
      await expect(panel).toHaveAttribute("data-module", "fuel");
      await group.getByRole("button", { name: "Crew" }).click();
      await expect(panel).toContainText("Capt. Hendra Wijaya");
      await expect(page.getByText("Certificate expiry alerts")).toBeVisible();
    });

    test("form demo memvalidasi isian lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const form = page.locator("form").filter({ hasText: "Request a demo" });
      const name = form.getByLabel("Full name");
      const email = form.getByLabel("Work email");
      const company = form.getByLabel("Company");
      const fleet = form.getByLabel("Fleet size");
      const submit = form.getByRole("button", { name: "Request a demo" });
      await submit.click();
      await expect(form.getByText("Enter your full name.")).toBeVisible();
      await expect(form.getByText("Choose your fleet size.")).toBeVisible();
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await expect(fleet).toHaveAttribute("aria-invalid", "true");
      await name.fill("Rudi Hartono");
      await email.fill("rudi@bahari");
      await company.fill("PT Bahari Lines");
      await fleet.selectOption("11-50");
      await submit.click();
      await expect(form.getByText(/Enter a work email/)).toBeVisible();
      await expect(form.getByText("Enter your full name.")).toHaveCount(0);
      await expect(name).not.toHaveAttribute("aria-invalid", "true");
      await expect(email).toHaveAttribute(
        "aria-describedby",
        "armada-demo-email-error",
      );
      await email.fill("rudi@bahari.co.id");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "Thanks, Rudi. A fleet specialist will email rudi@bahari.co.id",
      );
      await expect(name).toHaveValue("");
      await expect(fleet).toHaveValue("");
      await expect(form.locator(".text-danger:visible")).toHaveCount(0);
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/Satellite and terrestrial AIS/);
      const second = page.getByText(/work with the AIS your vessels/);
      await expect(first).toBeHidden();
      await page
        .getByText("Which data sources does Haluan connect to?")
        .click();
      await expect(first).toBeVisible();
      await page.getByText("Do we need to install hardware on board?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("call back memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Request a call back" }).click();
      await expect(toastRegion(page)).toContainText("We will call you back");
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
