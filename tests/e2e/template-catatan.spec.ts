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

const SLUG = "catatan";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const TABS = ["Docs", "Tasks", "Calendar", "Whiteboards", "Daily Notes"];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const panel = (page: Page) => page.getByRole("tabpanel");
const stories = (page: Page) => page.getByRole("region", { name: "Stories" });
const plan = (page: Page, id: string) => page.locator(`[data-plan=${id}]`);

/** Reduced motion mematikan animasi masuk, jadi semua section tampil untuk screenshot dan axe. */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
  reducedMotion: "reduce" | "no-preference" = "reduce",
) {
  await page.emulateMedia({ reducedMotion });
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.locator("h1")).toHaveText(
    "Your space for notes, tasks, and big ideas",
  );
  await page.evaluate(() => document.fonts.ready);
}

async function capture(page: Page, framework: Framework, theme: Theme) {
  await openTemplate(page, framework, theme);
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

async function expectNoAxeViolations(
  page: Page,
  label: string,
  include?: string,
) {
  const builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  const { violations } = await (
    include ? builder.include(include) : builder
  ).analyze();
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    ),
    label,
  ).toEqual([]);
}

test.describe("kesamaan tampilan", () => {
  test.describe.configure({ timeout: templateParityTimeout(SLUG) });

  for (const theme of themes) {
    test(`desktop ${theme}`, async ({ page }, testInfo) => {
      test.slow();
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, theme);
    });
  }

  test("mobile light", async ({ page }, testInfo) => {
    test.slow();
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
        await openTemplate(page, framework, theme);
        await expectNoAxeViolations(page, theme);
        for (const name of TABS.slice(1)) {
          await page.getByRole("tab", { name }).click();
          await expectNoAxeViolations(
            page,
            `${name} ${theme}`,
            "#catatan-panel",
          );
        }
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(page.getByRole("tab", { name: "Docs" })).toHaveCSS(
        "color",
        "rgb(29, 78, 216)",
      );
      await expect(
        page.getByRole("button", { name: "Start 14 day trial" }),
      ).toHaveCSS("background-color", "rgb(29, 78, 216)");
      await expectNoAxeViolations(page, "blue");
    });

    test("link navbar menuju section", async ({ page }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Main" });
      for (const [label, id] of [
        ["Pricing", "pricing"],
        ["Community", "stories"],
        ["Download", "download"],
        ["Product", "product"],
      ] as const) {
        await nav.getByRole("link", { name: label }).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(page.locator(`#${id} h2`).first()).toBeInViewport();
      }
    });

    test("tab mengganti mockup, juga dengan panah", async ({ page }) => {
      await openTemplate(page, framework);
      const docs = page.getByRole("tab", { name: "Docs" });
      await expect(docs).toHaveAttribute("aria-selected", "true");
      await expect(panel(page)).toContainText("A quarterly letter to the team");
      await page.getByRole("tab", { name: "Calendar" }).click();
      await expect(panel(page)).toContainText("November 2026");
      await expect(panel(page)).toHaveAccessibleName("Calendar");
      await expect(docs).toHaveAttribute("aria-selected", "false");
      await page.getByRole("tab", { name: "Whiteboards" }).click();
      await expect(panel(page)).toContainText("Launch to the first 100 users");
      await page.keyboard.press("ArrowRight");
      const daily = page.getByRole("tab", { name: "Daily Notes" });
      await expect(daily).toBeFocused();
      await expect(daily).toHaveAttribute("aria-selected", "true");
      await expect(panel(page)).toContainText("Monday, 9 November");
      await page.keyboard.press("ArrowRight");
      await expect(docs).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await expect(
        page.getByRole("tab", { name: "Whiteboards" }),
      ).toBeFocused();
      await page.getByRole("tab", { name: "Tasks" }).click();
      await expect(panel(page).locator("li")).toHaveCount(8);
      await expect(panel(page)).toContainText("5 of 8 done");
    });

    test("carousel cerita bisa digeser", async ({ page }) => {
      await openTemplate(page, framework);
      const previous = page.getByRole("button", { name: "Previous stories" });
      const next = page.getByRole("button", { name: "Next stories" });
      await expect(stories(page).locator("li")).toHaveCount(7);
      await expect(previous).toBeDisabled();
      await next.click();
      await expect
        .poll(() => stories(page).evaluate((el) => el.scrollLeft))
        .toBeGreaterThan(200);
      await expect(previous).toBeEnabled();
      for (let i = 0; i < 3; i++) await next.click();
      await expect(next).toBeDisabled();
      await previous.click();
      await expect(next).toBeEnabled();
    });

    test("toggle harga bulanan dan tahunan", async ({ page }) => {
      await openTemplate(page, framework);
      const monthly = page.getByRole("button", { name: "Monthly" });
      const yearly = page.getByRole("button", { name: /^Yearly/ });
      await expect(monthly).toHaveAttribute("aria-pressed", "true");
      await expect(plan(page, "plus")).toContainText("Rp49.000");
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await expect(monthly).toHaveAttribute("aria-pressed", "false");
      await expect(plan(page, "plus")).toContainText("Rp39.000");
      await expect(plan(page, "plus")).toContainText("Rp468.000 billed yearly");
      await expect(plan(page, "team")).toContainText("Rp71.000");
      await monthly.click();
      await expect(plan(page, "team")).toContainText("Rp89.000");

      await page.getByRole("button", { name: "Start 14 day trial" }).click();
      await expect(toastRegion(page)).toContainText("Your trial has started");
    });

    test("FAQ membuka jawaban", async ({ page }) => {
      await openTemplate(page, framework);
      const faq = page.locator("#faq");
      await faq.getByText("Does Lembar work offline?").click();
      await expect(
        faq.getByText(/syncs when you are back online/),
      ).toBeVisible();
      await faq.getByText("Who can see my notes?").click();
      await expect(faq.getByText(/Only you, until you share/)).toBeVisible();
      await expect(
        faq.getByText(/syncs when you are back online/),
      ).toBeHidden();
    });

    test("form email memvalidasi lalu memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      const email = page.getByLabel("Email");
      const send = page.getByRole("button", { name: "Send link" });
      await email.fill("rani@");
      await send.click();
      await expect(page.locator("#catatan-email-error")).toHaveText(
        "Enter a valid email address, like you@mail.com.",
      );
      await expect(email).toHaveAttribute("aria-invalid", "true");
      await email.fill("rani@mail.com");
      await send.click();
      await expect(page.locator("#catatan-email-error")).toHaveCount(0);
      await expect(toastRegion(page)).toContainText(
        "Check rani@mail.com on your phone.",
      );
      await expect(email).toHaveValue("");

      await page.getByRole("button", { name: "Windows" }).click();
      await expect(toastRegion(page)).toContainText("Lembar for Windows");
    });

    test("animasi masuk muncul saat discroll", async ({ page }) => {
      await openTemplate(page, framework, "light", "no-preference");
      const pricing = page.locator("#pricing [data-reveal]");
      await expect(pricing).toHaveAttribute("data-reveal", "hidden");
      await pricing.scrollIntoViewIfNeeded();
      await expect(pricing).toHaveAttribute("data-reveal", "shown");
    });

    test("mobile tanpa overflow dan menu berfungsi", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);

      const toggle = page.getByRole("button", { name: "Open menu" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      const close = page.getByRole("button", { name: "Close menu" });
      await expect(close).toHaveAttribute("aria-expanded", "true");
      const menu = page.locator("#catatan-menu");
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "Pricing" }).click();
      await expect(menu).toHaveCount(0);
      await expect(page).toHaveURL(/#pricing$/);
      await toggle.click();
      await page.getByRole("button", { name: "Close menu" }).click();
      await expect(menu).toHaveCount(0);
    });
  });
}
