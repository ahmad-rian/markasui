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

const SLUG = "roti";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Jogja's favourite bread, delivered warm to your door";

// Halaman panjang penuh foto: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const productCards = (page: Page) => page.locator("[data-product]:visible");
const basket = (page: Page) => page.getByRole("button", { name: /^Basket \d/ });

/** Buka template, lalu tunggu semua foto selesai di-decode. */
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

    test("aksen biru dipakai hero dan tombol tambah, tetap lolos axe", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        page.locator("section", {
          has: page.getByRole("heading", { level: 1 }),
        }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Add to basket, Butter croissant" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("kategori menyaring bakes dari filter, kartu, dan foto bulat", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await expect(productCards(page)).toHaveCount(8);
      await expect(page.getByText("Showing all 8 bakes")).toBeVisible();
      const filters = page.getByRole("group", {
        name: "Filter bakes by category",
      });
      const pastry = filters.getByRole("button", { name: "Pastry" });
      await pastry.click();
      await expect(pastry).toHaveAttribute("aria-pressed", "true");
      await expect(productCards(page)).toHaveCount(3);
      await expect(page.getByText("Showing 3 of 8 bakes")).toBeVisible();
      // Mengeklik pilihan aktif tidak mengosongkan filter.
      await pastry.click();
      await expect(pastry).toHaveAttribute("aria-pressed", "true");
      await expect(productCards(page)).toHaveCount(3);
      await page.getByRole("link", { name: /^Pretzels Chewy/ }).click();
      await expect(page).toHaveURL(/#menu$/);
      await expect(productCards(page)).toHaveCount(2);
      await expect(productCards(page).first()).toContainText(
        "Salted butter pretzel",
      );
      await expect(
        filters.getByRole("button", { name: "Pretzels" }),
      ).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("link", { name: "Country loaves" }).click();
      await expect(productCards(page)).toHaveCount(2);
      await expect(
        filters.getByRole("button", { name: "Bread" }),
      ).toHaveAttribute("aria-pressed", "true");
      await filters.getByRole("button", { name: "All" }).click();
      await expect(productCards(page)).toHaveCount(8);
    });

    test("tambah ke keranjang memperbarui jumlah, toast, dan isi keranjang", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await expect(basket(page)).toHaveAccessibleName("Basket 0 items");
      const croissant = page.getByRole("button", {
        name: "Add to basket, Butter croissant",
      });
      await croissant.click();
      await expect(basket(page)).toHaveAccessibleName("Basket 1 item");
      await expect(page.locator("[data-cart-count]")).toHaveText("1");
      await expect(toastRegion(page)).toContainText(
        "Butter croissant. Your basket has 1 item.",
      );
      await croissant.click();
      await expect(basket(page)).toHaveAccessibleName("Basket 2 items");
      await basket(page).click();
      const drawer = page.getByRole("dialog", { name: "Your basket" });
      await expect(drawer).toBeVisible();
      await expect(drawer.locator("[data-cart-line]")).toHaveCount(1);
      await expect(drawer.locator("[data-subtotal]")).toHaveText("Rp 64.000");
      await expect(drawer).toContainText(
        "Add Rp 86.000 more for free delivery in Jogja.",
      );
      await drawer
        .getByRole("button", { name: "Add one Butter croissant" })
        .click();
      await expect(drawer.locator("[data-subtotal]")).toHaveText("Rp 96.000");
      await expect(basket(page)).toHaveAccessibleName("Basket 3 items");
      const remove = drawer.getByRole("button", {
        name: "Remove one Butter croissant",
      });
      for (let count = 0; count < 3; count++) await remove.click();
      await expect(drawer.locator("[data-cart-line]")).toHaveCount(0);
      await expect(drawer).toContainText("Your basket is empty.");
      await expect(
        drawer.getByRole("button", { name: "Order on WhatsApp" }),
      ).toBeDisabled();
      await drawer.getByRole("button", { name: "Keep browsing" }).click();
      await expect(drawer).toBeHidden();
      await expect(basket(page)).toHaveAccessibleName("Basket 0 items");
    });

    test("pesan lewat WhatsApp dari keranjang dengan gratis ongkir", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("button", { name: "Add to basket, Cookie hampers" })
        .click();
      await basket(page).click();
      const drawer = page.getByRole("dialog", { name: "Your basket" });
      await expect(drawer.locator("[data-subtotal]")).toHaveText("Rp 185.000");
      await expect(drawer).toContainText("Free delivery applied.");
      await drawer.getByRole("button", { name: "Order on WhatsApp" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "1 item, Rp 185.000. We will confirm your delivery slot",
      );
    });

    test("tombol strip menggeser daftar bakes", async ({ page }) => {
      await openTemplate(page, framework);
      const strip = page.locator("#roti-strip");
      await strip.scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Scroll more bakes" }).click();
      await expect
        .poll(() => strip.evaluate((list) => list.scrollLeft))
        .toBeGreaterThan(0);
      await page.getByRole("button", { name: "Scroll bakes back" }).click();
      await expect
        .poll(() => strip.evaluate((list) => list.scrollLeft))
        .toBe(0);
    });

    test("WhatsApp, FAQ, dan newsletter berfungsi", async ({ page }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("banner")
        .getByRole("button", { name: "Order on WhatsApp" })
        .click();
      await expect(toastRegion(page)).toContainText("Opening WhatsApp");
      const answer = page.getByText(/Anywhere in Kota Yogyakarta, Sleman/);
      await expect(answer).toBeHidden();
      await page.getByText("Where do you deliver?").click();
      await expect(answer).toBeVisible();
      const field = page.getByLabel("Email address");
      const submit = page.getByRole("button", { name: "Subscribe" });
      await field.fill("bukan-email");
      await submit.click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sari@gmail.com");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "The Friday bake list goes to sari@gmail.com.",
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
