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

const SLUG = "konsultan";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
type Viewport = typeof DESKTOP;

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const heading = (page: Page) =>
  page.getByRole("heading", { level: 1, name: /Your trusted/ });

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(heading(page)).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

/** Reduced motion membuat semua section langsung tampil, jadi tangkapan penuh bisa dibandingkan. */
async function capture(
  browser: Browser,
  viewport: Viewport,
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
  viewport: Viewport,
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
  test.describe.configure({ timeout: 120_000 });
  for (const theme of themes) {
    test(`desktop ${theme}`, async ({ browser }, testInfo) => {
      await expectSameAsReact(browser, DESKTOP, testInfo, theme);
    });
  }
  test("mobile light", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, MOBILE, testInfo, "light");
  });
});

for (const framework of frameworks) {
  test.describe(framework, () => {
    test.describe.configure({ timeout: 90_000 });
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core (${theme})`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await openTemplate(page, framework, theme);
        await expectNoAxeViolations(page, theme);
        await page.getByRole("button", { name: "Search", exact: true }).click();
        await expectNoAxeViolations(page, `${theme} search`);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(
        page.getByRole("button", { name: "All", exact: true }),
      ).toHaveCSS("background-color", BLUE);
      await expect(
        page.getByRole("button", { name: "Send request" }),
      ).toHaveCSS("background-color", BLUE);
      await expectNoAxeViolations(page, "blue");
    });

    test("navbar: link anchor dan pencarian insight", async ({ page }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Main" });
      for (const [name, hash] of [
        ["Services", "#services"],
        ["Industries", "#industries"],
        ["About", "#about"],
        ["Insight", "#insight"],
        ["Contact us", "#contact"],
      ] as const)
        await expect(
          nav.getByRole("link", { name, exact: true }),
        ).toHaveAttribute("href", hash);
      await nav.getByRole("link", { name: "Industries" }).click();
      await expect(page).toHaveURL(/#industries$/);

      const search = page.getByRole("button", { name: "Search", exact: true });
      await search.click();
      await expect(search).toHaveAttribute("aria-expanded", "true");
      const field = page.getByLabel("Search insights");
      await expect(field).toBeFocused();
      await expect(page.getByText("4 articles")).toBeVisible();
      await field.fill("energy");
      await expect(page.getByText("1 article", { exact: true })).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Funding the energy transition/ }),
      ).toBeVisible();
      await field.fill("zzz");
      await expect(
        page.getByText("No articles match your search."),
      ).toBeVisible();
      await field.press("Escape");
      await expect(field).toHaveCount(0);
      await expect(search).toHaveAttribute("aria-expanded", "false");
    });

    test("tab hero mengganti teks, termasuk lewat panah", async ({ page }) => {
      await openTemplate(page, framework);
      const panel = page.getByRole("tabpanel");
      await expect(panel).toContainText("Advisors who stay for the long run");
      const finance = page.getByRole("tab", { name: /Financial services/ });
      await finance.click();
      await expect(finance).toHaveAttribute("aria-selected", "true");
      await expect(panel).toContainText("Sharper decisions for banks");
      await expect(panel).toHaveAttribute(
        "aria-labelledby",
        "konsultan-tab-finance",
      );
      await finance.press("ArrowRight");
      const investing = page.getByRole("tab", { name: /Investing/ });
      await expect(investing).toBeFocused();
      await expect(investing).toHaveAttribute("aria-selected", "true");
      await expect(panel).toContainText("140 deals reviewed since 2019");
      await investing.press("ArrowRight");
      await expect(
        page.getByRole("tab", { name: /Trusted partner/ }),
      ).toBeFocused();
      await expect(finance).toHaveAttribute("aria-selected", "false");
    });

    test("filter industri menyaring kartu praktik", async ({ page }) => {
      await openTemplate(page, framework);
      const cards = page.locator("#industries li:visible");
      await expect(cards).toHaveCount(6);
      const energy = page.getByRole("button", { name: "Energy", exact: true });
      await energy.click();
      await expect(energy).toHaveAttribute("aria-pressed", "true");
      await expect(cards).toHaveCount(2);
      await expect(page.getByText("Showing 2 practices")).toBeAttached();
      await expect(cards.first()).toContainText("Risk and compliance");
      await page.getByRole("button", { name: "Consumer", exact: true }).click();
      await expect(cards).toHaveCount(2);
      await expect(energy).toHaveAttribute("aria-pressed", "false");
      await page.getByRole("button", { name: "All", exact: true }).click();
      await expect(cards).toHaveCount(6);
    });

    test("slider testimoni maju dan mundur", async ({ page }) => {
      await openTemplate(page, framework);
      const slider = page.getByRole("region", { name: "Client testimonials" });
      await expect(slider).toContainText("Wulan Sari");
      await expect(slider).toContainText("1 / 4");
      await slider.getByRole("button", { name: "Next testimonial" }).click();
      await expect(slider).toContainText("Hendra Gunawan");
      await expect(slider).toContainText("2 / 4");
      const previous = slider.getByRole("button", {
        name: "Previous testimonial",
      });
      await previous.click();
      await previous.click();
      await expect(slider).toContainText("Fajar Nugroho");
      await expect(slider).toContainText("4 / 4");
    });

    test("form konsultasi memvalidasi lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const form = page.getByRole("form", { name: "Consultation request" });
      const send = form.getByRole("button", { name: "Send request" });
      const name = form.getByLabel("Full name");
      const email = form.getByLabel("Work email");
      await send.click();
      await expect(form.getByText("Tell us your name.")).toBeVisible();
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await name.fill("Dewi Anggraini");
      await email.fill("dewi@");
      await send.click();
      await expect(form.getByText(/Enter a valid email address/)).toBeVisible();
      await expect(email).toHaveAttribute("aria-invalid", "true");
      await expect(name).not.toHaveAttribute("aria-invalid", "true");
      await email.fill("dewi@sinarjaya.co.id");
      await form.getByLabel("Service").selectOption("Energy transition");
      await form.getByLabel("What would you like to discuss?").fill("Solar");
      await send.click();
      await expect(toastRegion(page)).toContainText("Thanks, Dewi.");
      await expect(name).toHaveValue("");
      await expect(form.getByText(/Enter a valid email/)).toHaveCount(0);
    });

    test("section muncul saat di-scroll", async ({ page }) => {
      await openTemplate(page, framework);
      const band = page.locator("#about [data-reveal]");
      await expect(band).not.toHaveAttribute("data-in", "");
      await band.scrollIntoViewIfNeeded();
      await expect(band).toHaveAttribute("data-in", "");
    });

    test("mobile: menu dan tanpa overflow horizontal", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const menu = page.getByRole("button", { name: "Menu" });
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      const link = page.locator("#konsultan-panel").getByRole("link", {
        name: "Contact us",
      });
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(/#contact$/);
      await expect(page.locator("#konsultan-panel")).toHaveCount(0);
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    });
  });
}
