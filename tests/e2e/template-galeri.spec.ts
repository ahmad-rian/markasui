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
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "galeri";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const TITLE = "A place to display your masterpiece.";

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const carousel = (page: Page) =>
  page.getByRole("region", { name: "Featured artworks" });
const nowShowing = (page: Page) => page.locator("[data-now]");
const prices = (page: Page) => page.locator("[data-price]");

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

/** Tampilkan semua elemen animasi masuk tanpa perlu scroll. */
async function revealAll(page: Page) {
  await page.evaluate(() =>
    document
      .querySelectorAll("[data-reveal]")
      .forEach((item) => item.setAttribute("data-in", "")),
  );
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
  await revealAll(page);
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

/* Halaman panjang: axe dan screenshot penuh butuh waktu lebih. */
test.describe.configure({ timeout: 90_000 });

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

for (const framework of templateFrameworks(SLUG)) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core (${theme})`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await openTemplate(page, framework, theme);
        await expectNoAxeViolations(page, theme);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        page.getByRole("link", { name: "Join for Rp149k/mo" }),
      ).toHaveCSS("background-color", blue);
      await expect(page.getByRole("button", { name: "Monthly" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expectNoAxeViolations(page, "blue");
    });

    test("navigasi anchor dan animasi masuk saat scroll", async ({ page }) => {
      await openTemplate(page, framework);
      const head = page.locator("#pricing [data-reveal]").first();
      await expect(head).not.toHaveAttribute("data-in");
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Pricing" })
        .click();
      await expect(page).toHaveURL(/#pricing$/);
      await expect(
        page.getByRole("heading", { name: "Simple pricing in Rupiah" }),
      ).toBeInViewport();
      await expect(head).toHaveAttribute("data-in", "");
    });

    test("menu mobile membuka, menutup, dan menuju section", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
      const toggle = page.getByRole("button", { name: "Open menu" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      const menu = page.getByRole("navigation", { name: "Menu" });
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
      await toggle.click();
      await menu.getByRole("link", { name: "Contact" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#contact$/);
    });

    test("carousel kipas: tombol, tombol panah, dan geser", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const active = page.locator("[data-active]");
      await expect(nowShowing(page)).toContainText("Quiet Hills");
      await expect(nowShowing(page)).toContainText("4 of 8");
      await expect(active).toContainText("Quiet Hills");

      await page.getByRole("button", { name: "Next artwork" }).click();
      await expect(nowShowing(page)).toContainText("Market at Noon");
      await expect(active).toContainText("Market at Noon");

      await carousel(page).focus();
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await expect(nowShowing(page)).toContainText("Kawung Bloom");

      const box = (await carousel(page).boundingBox())!;
      const y = box.y + box.height / 2;
      await page.mouse.move(box.x + box.width / 2 + 150, y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 50, y, { steps: 5 });
      await page.mouse.up();
      await expect(nowShowing(page)).toContainText("Quiet Hills");

      await page.mouse.move(box.x + box.width / 2 - 150, y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 50, y, { steps: 5 });
      await page.mouse.up();
      await expect(nowShowing(page)).toContainText("Kawung Bloom");

      const prev = page.getByRole("button", { name: "Previous artwork" });
      await prev.click();
      await prev.click();
      await expect(nowShowing(page)).toContainText("1 of 8");
      await expect(prev).toBeDisabled();
    });

    test("filter medium dan tombol follow", async ({ page }) => {
      await openTemplate(page, framework);
      const cards = page.locator("[data-artist]");
      await expect(cards).toHaveCount(6);
      const painting = page.getByRole("button", { name: "Painting" });
      await painting.click();
      await expect(painting).toHaveAttribute("aria-pressed", "true");
      await expect(cards).toHaveCount(2);
      const follow = page.getByRole("button", { name: "Follow Dewi Lestari" });
      await follow.click();
      await expect(follow).toHaveAttribute("aria-pressed", "true");
      await expect(follow).toHaveText("Following");
      await expect(cards.first()).toContainText("1,841 followers");
      await expect(toastRegion(page)).toContainText("You follow Dewi Lestari");
      await page.getByRole("button", { name: "All" }).click();
      await expect(cards).toHaveCount(6);
    });

    test("toggle harga bulanan dan tahunan", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(prices(page)).toHaveText(["Rp0", "Rp149k", "Rp399k"]);
      const yearly = page.getByRole("button", { name: /Yearly/ });
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await expect(prices(page)).toHaveText(["Rp0", "Rp119k", "Rp319k"]);
      await expect(page.getByText("/mo, billed yearly").first()).toBeVisible();
      await page.getByRole("button", { name: "Join Artist" }).click();
      await expect(toastRegion(page)).toContainText("Artist plan selected");
      await expect(toastRegion(page)).toContainText("Billed yearly");
    });

    test("FAQ membuka jawaban", async ({ page }) => {
      await openTemplate(page, framework);
      const answer = page.getByText(/earnings to your Indonesian bank/);
      await expect(answer).toBeHidden();
      await page.getByText("When do I receive my money?").click();
      await expect(answer).toBeVisible();
    });

    test("form email memvalidasi lalu memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Email address");
      await field.fill("not-an-email");
      await page.getByRole("button", { name: "Subscribe" }).click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sekar@studio.id");
      await page.getByRole("button", { name: "Subscribe" }).click();
      await expect(toastRegion(page)).toContainText("sekar@studio.id");
      await expect(field).toHaveValue("");
      await expect(page.getByText("Enter a valid email address")).toHaveCount(
        0,
      );
    });

    test("mobile tanpa overflow horizontal", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toBeInViewport();
    });
  });
}
