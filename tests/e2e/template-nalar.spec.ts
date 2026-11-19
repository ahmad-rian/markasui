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

const SLUG = "nalar";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Find the reason behind every metric";
const PHOTO_COUNT = 3;

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru: halaman gelap memakai primary-line tema terang (#93c5fd) sebagai aksen. */
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

    test("aksen dipakai tombol utama dan tetap lolos axe", async ({ page }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const accent = "rgb(147, 197, 253)";
      const hero = page.locator("section[aria-labelledby=nalar-title]");
      await expect(hero.getByRole("link", { name: "Get started" })).toHaveCSS(
        "background-color",
        accent,
      );
      await expect(
        page.getByRole("button", { name: "Request access" }),
      ).toHaveCSS("background-color", accent);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto punya ukuran tetap dan alt kosong di samping nama", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const photos = page.locator("img[src^='/template-images/nalar/']");
      for (const photo of await photos.all()) {
        await expect(photo).toHaveAttribute("width", /^(40|48)$/);
        await expect(photo).toHaveAttribute("alt", "");
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
      await menu.getByRole("link", { name: "Pricing" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#pricing$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("rentang tanggal dasbor mengganti angka dan grafik", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const group = page.getByRole("group", { name: "Date range" });
      const chart = page.locator("[data-range]");
      await expect(chart).toHaveAttribute("data-range", "30d");
      const week = group.getByRole("button", { name: "7D" });
      await week.click();
      await expect(week).toHaveAttribute("aria-pressed", "true");
      await expect(chart).toHaveAttribute("data-range", "7d");
      await expect(chart).toContainText("Saturday peak");
      await expect(chart.locator("> div > div:visible")).toHaveCount(7);
      await expect(page.locator("[data-range-sub]")).toHaveText(
        "Last 7 days, all channels",
      );
      await expect(page.getByText("Rp 1.21 bn")).toBeVisible();
      // Mengeklik pilihan aktif tidak mengosongkan pilihan.
      await week.click();
      await expect(week).toHaveAttribute("aria-pressed", "true");
      await expect(chart).toHaveAttribute("data-range", "7d");
      await group.getByRole("button", { name: "90D" }).click();
      await expect(page.getByText("Rp 13.9 bn")).toBeVisible();
    });

    test("tabel akun memakai badge sinyal", async ({ page }) => {
      await openTemplate(page, framework);
      const table = page.getByRole("region", { name: "Accounts to watch" });
      await expect(table.locator("tbody tr")).toHaveCount(4);
      await expect(
        table.getByRole("row", { name: /Kopi Senja Group/ }),
      ).toContainText("Churn risk");
    });

    test("insight membuat alert lewat toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Create alert" }).click();
      await expect(toastRegion(page)).toContainText("Alert created");
    });

    test("tab cara kerja mengganti terminal", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(page.getByText("nalar connect postgres")).toBeVisible();
      await page.getByRole("tab", { name: "2. Ask" }).click();
      await expect(page.getByRole("tab", { name: "2. Ask" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(
        page.getByText(/Delivery time 2.1 to 3.4 days/),
      ).toBeVisible();
      await page.getByRole("tab", { name: "3. Automate" }).click();
      await expect(
        page.getByText("Alert active, checked every 15 minutes"),
      ).toBeVisible();
    });

    test("harga tahunan mengganti harga paket", async ({ page }) => {
      await openTemplate(page, framework);
      const plans = page.locator("[data-billing]");
      await expect(plans).toHaveAttribute("data-billing", "monthly");
      await expect(plans).toContainText("Rp 1.490.000");
      const yearly = page
        .getByRole("group", { name: "Billing period" })
        .getByRole("button", { name: /Yearly/ });
      await yearly.click();
      await expect(plans).toHaveAttribute("data-billing", "yearly");
      await expect(plans).toContainText("Rp 1.190.000");
      await expect(plans).toContainText("per month, billed yearly");
      await yearly.click();
      await expect(plans).toHaveAttribute("data-billing", "yearly");
    });

    test("form akses memvalidasi email lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const form = page.locator("form").filter({ hasText: "Request access" });
      const email = form.getByLabel("Work email");
      const submit = form.getByRole("button", { name: "Request access" });
      await submit.click();
      await expect(form.getByText(/Enter a work email/)).toBeVisible();
      await expect(email).toHaveAttribute("aria-invalid", "true");
      await expect(email).toHaveAttribute(
        "aria-describedby",
        "nalar-access-error",
      );
      await email.fill("dewi@sagara");
      await submit.click();
      await expect(form.getByText(/Enter a work email/)).toBeVisible();
      await email.fill("dewi@sagara.co.id");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "We sent setup steps to dewi@sagara.co.id",
      );
      await expect(email).toHaveValue("");
      await expect(email).not.toHaveAttribute("aria-invalid", "true");
      await expect(form.locator(".text-danger:visible")).toHaveCount(0);
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/queries your sources with read-only/);
      const second = page.getByText(/New connectors ship every month/);
      await expect(first).toBeHidden();
      await page.getByText("Does Nalar copy our data?").click();
      await expect(first).toBeVisible();
      await page.getByText("Which data sources are supported?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("panggilan teknisi memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Book a 20 minute call" }).click();
      await expect(toastRegion(page)).toContainText("Call requested");
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
