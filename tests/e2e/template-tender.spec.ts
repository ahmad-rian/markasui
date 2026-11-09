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
  frameworks,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "tender";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const TITLE = "Stop losing government tenders to expensive bid agencies";

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const mainNav = (page: Page) => page.getByRole("navigation", { name: "Main" });
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
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
  for (const framework of ["blade", "vue"] as const) {
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

for (const framework of frameworks) {
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

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        mainNav(page).getByRole("link", { name: "Start free trial" }),
      ).toHaveCSS("background-color", blue);
      await expect(page.getByRole("button", { name: "Monthly" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expectNoAxeViolations(page, "blue");
    });

    test("navbar menandai link aktif dan melompat ke section", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const product = mainNav(page).getByRole("link", { name: "Product" });
      await expect(product).toHaveAttribute("aria-current", "true");
      const pricing = mainNav(page).getByRole("link", { name: "Pricing" });
      await pricing.click();
      await expect(pricing).toHaveAttribute("aria-current", "true");
      await expect(product).not.toHaveAttribute("aria-current", "true");
      await expect(page).toHaveURL(/#pricing$/);
      await expect(
        page.getByRole("heading", { name: "Cheaper than one agency fee" }),
      ).toBeInViewport();
    });

    test("menu mobile terbuka, menutup saat link dipilih dan Escape", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const toggle = page.getByRole("button", { name: "Open menu" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      const menu = page.locator("#tender-mobile-menu");
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await menu.getByRole("link", { name: "Sectors" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#sectors$/);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(menu.getByRole("link", { name: "Sectors" })).toHaveAttribute(
        "aria-current",
        "true",
      );
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("tab sektor mengganti daftar tender, panah memindah tab", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const panel = page.getByRole("tabpanel");
      await expect(panel).toContainText("Irrigation canal rehabilitation");
      const health = page.getByRole("tab", { name: "Healthcare" });
      await health.click();
      await expect(health).toHaveAttribute("aria-selected", "true");
      await expect(panel).toContainText("Hospital bed procurement");
      await expect(panel).toContainText("238 open tenders");
      await page.keyboard.press("ArrowDown");
      const consulting = page.getByRole("tab", { name: "Consulting" });
      await expect(consulting).toBeFocused();
      await expect(consulting).toHaveAttribute("aria-selected", "true");
      await expect(panel).toContainText("Spatial plan review");
    });

    test("toggle harga bulanan dan tahunan lalu pilih paket", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const growth = page.locator("[data-price=growth]");
      await expect(growth).toHaveText("Rp 1.290.000");
      const yearly = page.getByRole("button", { name: /Yearly/ });
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await expect(growth).toHaveText("Rp 1.032.000");
      await expect(page.locator("[data-price=starter]")).toHaveText(
        "Rp 392.000",
      );
      await expect(page.getByText("per month, billed yearly")).toHaveCount(2);
      await page
        .getByRole("button", { name: "Start free trial, Growth plan" })
        .click();
      await expect(toastRegion(page)).toContainText("Rp 1.032.000");
      await page
        .getByRole("button", { name: "Talk to sales, Enterprise plan" })
        .click();
      await expect(toastRegion(page)).toContainText("Sales will call you");
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/Every LPSE portal that runs SPSE/);
      const second = page.getByText(/It writes a complete first draft/);
      await expect(first).toBeVisible();
      await expect(second).toBeHidden();
      await page
        .getByText("Will the AI write the whole proposal for me?")
        .click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("tombol demo dan writer memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Book a demo" }).click();
      await expect(toastRegion(page)).toContainText("Demo request received");
      await page.getByRole("button", { name: "Try the writer" }).click();
      await expect(toastRegion(page)).toContainText("Sample proposal ready");
    });

    test("form trial memvalidasi email lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Work email");
      const submit = page
        .locator("#start")
        .getByRole("button", { name: "Start free trial" });
      await field.fill("bukan-email");
      await submit.click();
      await expect(page.getByText("Enter a valid work email")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("rizky@karyabangun.co.id");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "We sent a sign-in link to rizky@karyabangun.co.id",
      );
      await expect(field).toHaveValue("");
      await expect(page.getByText("Enter a valid work email")).toHaveCount(0);
    });

    test("animasi masuk berjalan saat scroll tanpa reduced motion", async ({
      browser,
    }) => {
      const context = await browser.newContext({
        baseURL: test.info().project.use.baseURL,
        viewport: DESKTOP,
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      await openTemplate(page, framework);
      const rootEl = page.locator("[data-reveal-ready]");
      await expect(rootEl).toHaveCount(1);
      const faq = page.locator("#resources [data-reveal]").first();
      await expect(faq).not.toHaveAttribute("data-shown", "");
      await faq.scrollIntoViewIfNeeded();
      await expect(faq).toHaveAttribute("data-shown", "");
      await context.close();
    });

    test("mobile tanpa overflow horizontal", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
