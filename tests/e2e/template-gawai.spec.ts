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

const SLUG = "gawai";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Closer to the future.";

// Halaman panjang penuh foto: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const deviceCards = (page: Page) => page.locator("[data-device]:visible");

/** Buka template lalu tunggu semua foto selesai di-decode. */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => undefined);
      }),
    );
  });
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
        page.getByRole("link", { name: "Choose a device" }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Help me choose" }).last(),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("menu mobile terbuka, menutup saat link dipilih dan Escape", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const toggle = page.getByRole("button", { name: "Menu" });
      const menu = page.getByRole("navigation", { name: "Main mobile" });
      await toggle.click();
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "Delivery" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#delivery$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("filter dan kartu kategori menyaring perangkat", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(deviceCards(page)).toHaveCount(6);
      await expect(page.getByText("Showing all 6 devices")).toBeVisible();
      const filters = page.getByRole("group", {
        name: "Filter devices by type",
      });
      const audio = filters.getByRole("button", { name: "Audio" });
      await audio.click();
      await expect(audio).toHaveAttribute("aria-pressed", "true");
      await expect(deviceCards(page)).toHaveCount(2);
      await expect(page.getByText("Showing 2 of 6 devices")).toBeVisible();
      await audio.click();
      await expect(audio).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("link", { name: "Shop laptops" }).click();
      await expect(page).toHaveURL(/#popular$/);
      await expect(deviceCards(page)).toHaveCount(1);
      await expect(deviceCards(page).first()).toContainText("Lumen Book 14");
      await expect(
        filters.getByRole("button", { name: "Laptops" }),
      ).toHaveAttribute("aria-pressed", "true");
    });

    test("quick view memilih opsi, menghitung harga, dan masuk keranjang", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const cart = page.getByRole("button", { name: /^Cart, / });
      await expect(cart).toHaveAccessibleName("Cart, 0 items");
      await cart.click();
      await expect(toastRegion(page)).toContainText("Your cart is empty");
      await page
        .getByRole("button", { name: "Quick view, Arka Phone 12" })
        .click();
      const modal = page.getByRole("dialog", { name: "Quick view" });
      await expect(modal).toBeVisible();
      await expect(modal.locator("[data-quick-name]")).toHaveText(
        "Arka Phone 12",
      );
      await expect(modal.locator("[data-quick-price]")).toHaveText(
        "Rp 8.499.000",
      );
      const storage = modal.getByRole("group", { name: "Storage" });
      await storage.getByRole("button", { name: "256 GB" }).click();
      await expect(modal.locator("[data-quick-price]")).toHaveText(
        "Rp 9.499.000",
      );
      await expect(modal).toContainText("Or Rp 791.583 a month");
      await modal.getByRole("button", { name: "Add to cart" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "Arka Phone 12, 256 GB. Rp 9.499.000.",
      );
      await expect(cart).toHaveAccessibleName("Cart, 1 item");
      await expect(page.locator("[data-cart-count]")).toHaveText("1");
      await cart.click();
      await expect(toastRegion(page)).toContainText("Your cart has 1 item");
      await page
        .getByRole("button", { name: "Quick view, Sora Watch 3" })
        .click();
      await expect(modal.locator("[data-quick-name]")).toHaveText(
        "Sora Watch 3",
      );
      await expect(modal.locator("[data-quick-price]")).toHaveText(
        "Rp 2.799.000",
      );
      await expect(
        modal
          .getByRole("group", { name: "Size" })
          .getByRole("button", { name: "41 mm" }),
      ).toHaveAttribute("aria-pressed", "true");
      await modal
        .getByRole("button", { name: "Close", exact: true })
        .last()
        .click();
      await expect(modal).toBeHidden();
      await expect(cart).toHaveAccessibleName("Cart, 1 item");
    });

    test("pencarian membuka modal lalu memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Search", exact: true }).click();
      const modal = page.getByRole("dialog", { name: "Search Lintang" });
      await expect(modal).toBeVisible();
      await modal.getByLabel("Device or model").fill("earbuds");
      await modal.getByRole("button", { name: "Search", exact: true }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText("Results for earbuds");
    });

    test("bantu pilih memvalidasi nomor lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("button", { name: "Help me choose" })
        .first()
        .click();
      const drawer = page.getByRole("dialog", { name: "Help me choose" });
      await expect(drawer).toBeVisible();
      await drawer.getByRole("button", { name: "Gaming" }).click();
      await drawer.getByRole("button", { name: "Over Rp 10 jt" }).click();
      const field = drawer.getByLabel("WhatsApp number");
      await field.fill("123");
      await drawer.getByRole("button", { name: "Send to Nadia" }).click();
      await expect(drawer.getByText("Enter a WhatsApp number")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("0812 3456 7890");
      await drawer.getByRole("button", { name: "Send to Nadia" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "Two or three gaming picks over Rp 10 jt",
      );
      await page.getByRole("button", { name: "Ask a consultant" }).click();
      await expect(drawer).toBeVisible();
      await expect(field).toHaveValue("");
      await expect(field).not.toHaveAttribute("aria-invalid", "true");
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/official Indonesian warranty/);
      const second = page.getByText(/Pay in 3, 6, or 12 months/);
      await expect(first).toBeHidden();
      await page.getByText("Are your devices official and new?").click();
      await expect(first).toBeVisible();
      await page.getByText("Can I pay in instalments?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
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
