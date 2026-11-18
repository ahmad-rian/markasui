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

const SLUG = "pasar";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Everything you need, all in one place";
/** Jam tetap: flash deal tersisa tepat 1 hari 14 jam. */
const NOW = new Date("2026-11-19T10:00:00+07:00");

// Halaman panjang penuh foto: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const productCards = (page: Page) => page.locator("[data-product]:visible");
const timerValue = (page: Page, unit: string) =>
  page.locator(`[data-timer=${unit}]`);

/** Buka template dengan jam tetap, lalu tunggu semua foto selesai di-decode. */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.clock.setFixedTime(NOW);
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await expect(timerValue(page, "Hrs")).toHaveText("14");
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
      await expect(page.getByRole("link", { name: "Shop the sale" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expect(
        page.getByRole("button", { name: "Search", exact: true }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("hitung mundur flash deal berjalan per detik", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(timerValue(page, "Days")).toHaveText("01");
      await expect(timerValue(page, "Hrs")).toHaveText("14");
      await expect(timerValue(page, "Mins")).toHaveText("00");
      await expect(timerValue(page, "Secs")).toHaveText("00");
      await page.clock.setFixedTime(NOW.getTime() + 61_000);
      await expect(timerValue(page, "Hrs")).toHaveText("13");
      await expect(timerValue(page, "Mins")).toHaveText("58");
      await expect(timerValue(page, "Secs")).toHaveText("59");
    });

    test("kategori menyaring produk dari filter, ikon bulat, dan foto", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await expect(productCards(page)).toHaveCount(8);
      await expect(page.getByText("Showing all 8 products")).toBeVisible();
      const filters = page.getByRole("group", {
        name: "Filter products by category",
      });
      const electronics = filters.getByRole("button", { name: "Electronics" });
      await electronics.click();
      await expect(electronics).toHaveAttribute("aria-pressed", "true");
      await expect(productCards(page)).toHaveCount(2);
      await expect(page.getByText("Showing 2 of 8 products")).toBeVisible();
      // Mengeklik pilihan aktif tidak mengosongkan filter.
      await electronics.click();
      await expect(electronics).toHaveAttribute("aria-pressed", "true");
      await expect(productCards(page)).toHaveCount(2);
      await page
        .getByRole("navigation", { name: "Shop by category" })
        .getByRole("link", { name: "Beauty" })
        .click();
      await expect(page).toHaveURL(/#products$/);
      await expect(productCards(page)).toHaveCount(1);
      await expect(productCards(page).first()).toContainText(
        "Skincare starter set",
      );
      await expect(
        filters.getByRole("button", { name: "Beauty" }),
      ).toHaveAttribute("aria-pressed", "true");
      await page
        .getByRole("link", { name: /^Grocery 5\.270 products$/ })
        .click();
      await expect(productCards(page)).toHaveCount(1);
      await page.getByRole("link", { name: /See all products/ }).click();
      await expect(productCards(page)).toHaveCount(8);
    });

    test("tambah ke keranjang memperbarui jumlah, toast, dan isi keranjang", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const cartButton = page.getByRole("button", { name: /^Cart, / });
      await expect(cartButton).toHaveAccessibleName("Cart, 2 items");
      await page
        .getByRole("button", { name: "Add to cart, Over-ear wired headphones" })
        .click();
      await expect(cartButton).toHaveAccessibleName("Cart, 3 items");
      await expect(page.locator("[data-cart-count]")).toHaveText("3");
      await expect(toastRegion(page)).toContainText(
        "Over-ear wired headphones. Your cart has 3 items.",
      );
      await page
        .getByRole("button", { name: "Add to cart", exact: true })
        .click();
      await expect(cartButton).toHaveAccessibleName("Cart, 4 items");
      await cartButton.click();
      const drawer = page.getByRole("dialog", { name: "Your cart" });
      await expect(drawer).toBeVisible();
      await expect(drawer.locator("[data-cart-line]")).toHaveCount(4);
      await expect(drawer.locator("[data-subtotal]")).toHaveText("Rp 672.000");
      await expect(drawer).toContainText("Free shipping applied");
      await drawer.getByRole("button", { name: "Checkout" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "4 items, Rp 672.000. Pay with QRIS",
      );
    });

    test("keranjang awal menunjukkan sisa untuk gratis ongkir", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: /^Cart, / }).click();
      const drawer = page.getByRole("dialog", { name: "Your cart" });
      await expect(drawer.locator("[data-subtotal]")).toHaveText("Rp 134.000");
      await expect(drawer).toContainText(
        "Add Rp 16.000 more for free shipping.",
      );
      await drawer.getByRole("button", { name: "Keep shopping" }).click();
      await expect(drawer).toBeHidden();
    });

    test("wishlist menandai produk dan memperbarui jumlah di header", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const wishlist = page.getByRole("link", { name: /^Wishlist, / });
      await expect(wishlist).toHaveAccessibleName("Wishlist, 1 item");
      const save = page.getByRole("button", {
        name: "Save Cat-eye sunglasses, UV400",
      });
      await expect(save).toHaveAttribute("aria-pressed", "false");
      await save.click();
      await expect(save).toHaveAttribute("aria-pressed", "true");
      await expect(wishlist).toHaveAccessibleName("Wishlist, 2 items");
      const watch = page.getByRole("button", {
        name: "Save Fitness smartwatch with heart rate",
      });
      await watch.click();
      await expect(watch).toHaveAttribute("aria-pressed", "false");
      await expect(wishlist).toHaveAccessibleName("Wishlist, 1 item");
    });

    test("menu samping memilih kategori lalu menutup", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Shop by category" });
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "Sports" }).click();
      await expect(menu).toBeHidden();
      await expect(productCards(page)).toHaveCount(1);
      await expect(productCards(page).first()).toContainText("Hex dumbbells");
    });

    test("pencarian dan tombol penjual memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      const search = page.getByRole("button", { name: "Search", exact: true });
      await search.click();
      await expect(toastRegion(page)).toContainText("Type something to search");
      await page.getByLabel("Search products").fill("batik");
      await search.click();
      await expect(toastRegion(page)).toContainText("Results for batik");
      await page.getByRole("button", { name: "Open your shop" }).click();
      await expect(toastRegion(page)).toContainText("Seller sign-up opened");
    });

    test("carousel terlaris pindah ke halaman kedua", async ({ page }) => {
      await openTemplate(page, framework);
      const carousel = page.getByRole("region", {
        name: "Best sellers",
        exact: true,
      });
      const yoga = carousel.getByRole("button", {
        name: "Add to cart, Yoga starter kit, 4 pieces",
      });
      await expect(yoga).not.toBeInViewport();
      await carousel.scrollIntoViewIfNeeded();
      await carousel.getByRole("button", { name: "Next slide" }).click();
      await expect(yoga).toBeInViewport();
      await yoga.click();
      await expect(
        page.getByRole("button", { name: /^Cart, / }),
      ).toHaveAccessibleName("Cart, 3 items");
    });

    test("navigasi bawah hanya di layar kecil", async ({ page }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Shop", exact: true });
      await expect(nav).toBeHidden();
      await page.setViewportSize(MOBILE);
      await expect(nav).toBeVisible();
      await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await nav.getByRole("link", { name: "Deals" }).click();
      await expect(page).toHaveURL(/#deals$/);
      await expect(nav.getByRole("link", { name: "Deals" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await nav.getByRole("button", { name: "Account" }).click();
      await expect(toastRegion(page)).toContainText(
        "Sign in to see your account",
      );
    });

    test("newsletter memvalidasi email lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Email address");
      const submit = page.getByRole("button", { name: "Subscribe" });
      await field.fill("bukan-email");
      await submit.click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sari@gmail.com");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "on their way to sari@gmail.com",
      );
      await expect(field).toHaveValue("");
      await expect(field).not.toHaveAttribute("aria-invalid", "true");
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
