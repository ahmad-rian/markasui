import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
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

const SLUG = "konek";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const plan = (page: Page, name: string) =>
  page.locator(`li[data-plan="${name}"]`);
const catArt = (page: Page) => page.getByRole("img", { name: /Cartoon cat/ });

async function openPage(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
  hash = "",
) {
  await page.goto(
    `/template.html?t=${SLUG}&fw=${framework}&theme=${theme}${hash}`,
  );
  await page.locator("body[data-ready=true]").waitFor();
  await expect(
    page.getByRole("heading", { level: 1, name: "Stay Connected" }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function capture(page: Page, framework: Framework, theme: Theme) {
  await openPage(page, framework, theme);
  return PNG.sync.read(
    await page.screenshot({
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    }),
  );
}

async function expectSameAsReact(page: Page, testInfo: TestInfo, theme: Theme) {
  const reference = await capture(page, "react", theme);
  for (const framework of templateParityFrameworks(SLUG)) {
    const candidate = await capture(page, framework, theme);
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

/* Animasi masuk dimatikan supaya isi di bawah layar ikut terlihat di screenshot dan axe. */
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("kesamaan tampilan", () => {
  test.describe.configure({ timeout: templateParityTimeout(SLUG) });

  for (const theme of themes) {
    test(`desktop ${theme}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, theme);
    });
  }

  test("mobile light", async ({ page }, testInfo) => {
    await page.setViewportSize(MOBILE);
    await expectSameAsReact(page, testInfo, "light");
  });
});

for (const framework of templateFrameworks(SLUG)) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core (${theme})`, async ({ page }) => {
        test.slow();
        await openPage(page, framework, theme);
        await expectNoAxeViolations(page, theme);
      });
    }

    test("aksen biru dipakai tab aktif dan paket unggulan, tetap lolos axe", async ({
      page,
    }) => {
      test.slow();
      await openPage(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(page.getByRole("button", { name: "Prepaid" })).toHaveCSS(
        "background-color",
        "rgb(29, 78, 216)",
      );
      await expect(
        page.getByRole("button", { name: "Choose Daily" }),
      ).toHaveCSS("background-color", "rgb(29, 78, 216)");
      await expectNoAxeViolations(page, "blue");
    });

    test("navbar menandai section dari hash", async ({ page }) => {
      await openPage(page, framework);
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await nav.getByRole("link", { name: "Pricing" }).click();
      await expect(page).toHaveURL(/#pricing$/);
      await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await expect(
        page.getByRole("heading", { name: "Plans for every day" }),
      ).toBeInViewport();
      await nav.getByRole("link", { name: "Business" }).click();
      await expect(page).toHaveURL(/#coverage$/);
      await expect(
        page.getByRole("heading", { name: /Check coverage/ }),
      ).toBeInViewport();
      await page.goBack();
      await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute(
        "aria-current",
        "location",
      );
    });

    test("tab paket dan switch kuota mengganti harga, pilih paket memunculkan toast", async ({
      page,
    }) => {
      await openPage(page, framework);
      await expect(plan(page, "Daily")).toContainText("25 GB");
      await expect(plan(page, "Daily")).toContainText("Rp75.000/30 days");
      await page.getByRole("switch", { name: "Double the quota" }).check();
      await expect(plan(page, "Daily")).toContainText("50 GB");
      await expect(plan(page, "Daily")).toContainText("Rp99.000");
      const home = page.getByRole("button", { name: "Home internet" });
      await home.click();
      await expect(home).toHaveAttribute("aria-pressed", "true");
      await expect(
        page.getByRole("button", { name: "Prepaid" }),
      ).toHaveAttribute("aria-pressed", "false");
      await expect(
        page.getByRole("switch", { name: "Double the speed" }),
      ).toBeChecked();
      await expect(plan(page, "Stream")).toContainText("200 Mbps");
      await expect(plan(page, "Daily")).toHaveCount(0);
      await page.getByRole("button", { name: "Choose Stream" }).click();
      await expect(toastRegion(page)).toContainText(
        "200 Mbps for Rp455.000/month.",
      );
      await page.getByRole("switch", { name: "Double the speed" }).uncheck();
      await expect(plan(page, "Stream")).toContainText("100 Mbps");
    });

    test("cek jangkauan memvalidasi kota lalu menampilkan hasil dan toast", async ({
      page,
    }) => {
      await openPage(page, framework);
      const form = page.getByRole("form", { name: "Coverage check" });
      await form.getByRole("button", { name: "Check coverage" }).click();
      await expect(form.getByText("Enter a city name")).toBeVisible();
      await expect(form.getByLabel("City")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      await form.getByLabel("City").fill("  Medan ");
      await form.getByRole("button", { name: "Check coverage" }).click();
      const result = page.locator("[data-result]");
      await expect(result).toHaveText("Medan");
      await expect(
        page.getByText("Up to 150 Mbps", { exact: true }),
      ).toBeVisible();
      await expect(toastRegion(page)).toContainText(
        "4G+ in Medan, up to 150 mbps.",
      );
      await expect(form.getByText("Enter a city name")).toHaveCount(0);
      await page.getByRole("button", { name: "Jayapura", exact: true }).click();
      await expect(result).toHaveText("Jayapura");
      await expect(page.getByText("Fixed wireless")).toBeVisible();
      await expect(form.getByLabel("City")).toHaveValue("Jayapura");
      await form.getByLabel("City").fill("Sorong");
      await form.getByLabel("City").press("Enter");
      await expect(result).toHaveText("Sorong");
      await expect(page.getByText("Fiber coming in 2027")).toBeVisible();
    });

    test("tombol hero dan Get the app memunculkan toast, FAQ terbuka", async ({
      page,
    }) => {
      await openPage(page, framework);
      await page.getByRole("button", { name: "Order a SIM card" }).click();
      await expect(toastRegion(page)).toContainText("SIM card on its way");
      await page.getByRole("button", { name: "Get the app" }).click();
      await expect(toastRegion(page)).toContainText("Get the Konek app");
      await page.getByText("How fast is SIM card delivery?").click();
      await expect(page.getByText("Same day in Jakarta")).toBeVisible();
    });

    test("ilustrasi beranimasi jika motion diizinkan dan diam saat reduced motion", async ({
      page,
    }) => {
      await openPage(page, framework);
      await expect(catArt(page)).toHaveCSS("animation-name", "none");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openPage(page, framework);
      await expect(catArt(page)).toHaveCSS("animation-name", "konek-float");
      await expect(catArt(page).locator("g.konek-wag")).toHaveCSS(
        "animation-name",
        "konek-wag",
      );
      const reveal = page.locator("#careers [data-reveal]").first();
      await expect(reveal).not.toHaveAttribute("data-shown", "");
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveAttribute("data-shown", "");
      await expect(reveal).toHaveCSS("opacity", "1");
    });

    test("mobile tanpa overflow dan menu membuka section", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openPage(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
      await expect(catArt(page)).toBeVisible();
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("navigation", { name: "Mobile" });
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await menu.getByRole("link", { name: "Careers" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#careers$/);
      await expect(
        page.getByRole("heading", { name: "Build the network with us" }),
      ).toBeInViewport();
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(menu.getByRole("link", { name: "Careers" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await menu.getByRole("link", { name: "Home" }).focus();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });
  });
}
