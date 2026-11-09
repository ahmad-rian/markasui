import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  frameworks,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "karya";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const caseDialog = (page: Page) => page.locator("#karya-case");
const pill = (page: Page, id: string) => page.locator(`[data-pill="${id}"]`);

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
    page.getByRole("heading", { level: 1, name: /I design products/ }),
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
  for (const framework of ["blade", "vue"] as const) {
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

for (const framework of frameworks) {
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

    test("aksen biru dipakai tombol kirim dan tetap lolos axe", async ({
      page,
    }) => {
      test.slow();
      await openPage(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(
        page.getByRole("button", { name: "Send message" }),
      ).toHaveCSS("background-color", "rgb(29, 78, 216)");
      await expectNoAxeViolations(page, "blue");
    });

    test("navbar menandai section dari hash", async ({ page }) => {
      await openPage(page, framework);
      const nav = page.getByRole("navigation", { name: "Main" });
      await nav.getByRole("link", { name: "Playground" }).click();
      await expect(page).toHaveURL(/#playground$/);
      await expect(
        nav.getByRole("link", { name: "Playground" }),
      ).toHaveAttribute("aria-current", "location");
      await expect(
        page.getByRole("heading", { name: "Playground", level: 2 }),
      ).toBeInViewport();
      await nav.getByRole("link", { name: "CV" }).click();
      await expect(nav.getByRole("link", { name: "CV" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await expect(page.getByText("2017 to 2019")).toBeInViewport();
      await page.goBack();
      await expect(
        nav.getByRole("link", { name: "Playground" }),
      ).toHaveAttribute("aria-current", "location");
    });

    test("stiker bisa diseret lalu dirapikan", async ({ page }) => {
      await openPage(page, framework);
      const sticker = pill(page, "testing");
      const before = (await sticker.boundingBox())!;
      await page.mouse.move(before.x + 20, before.y + before.height / 2);
      await page.mouse.down();
      await page.mouse.move(before.x - 100, before.y + 10, { steps: 6 });
      await page.mouse.move(before.x - 160, before.y - 40, { steps: 6 });
      await page.mouse.up();
      const after = (await sticker.boundingBox())!;
      expect(Math.round(before.x - after.x)).toBeGreaterThan(150);
      expect(Math.round(before.y - after.y)).toBeGreaterThan(30);
      await expect(sticker).toHaveClass(/z-20/);
      await page.getByRole("button", { name: "Tidy up" }).click();
      const reset = (await sticker.boundingBox())!;
      expect(Math.abs(reset.x - before.x)).toBeLessThan(1);
      expect(Math.abs(reset.y - before.y)).toBeLessThan(1);
    });

    test("stiker jatuh saat tumpukan masuk layar jika motion diizinkan", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openPage(page, framework);
      await expect(page.locator("[data-pile]")).toHaveAttribute(
        "data-shown",
        "",
      );
      await expect(pill(page, "corners")).toHaveCSS(
        "animation-name",
        "karya-fall",
      );
      const reveal = page.locator("#contact [data-reveal]").first();
      await expect(reveal).not.toHaveAttribute("data-shown", "");
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveAttribute("data-shown", "");
      await expect(reveal).toHaveCSS("opacity", "1");
    });

    test("playground: slider radius, slider tint, dan switch pop", async ({
      page,
    }) => {
      await openPage(page, framework);
      const square = page.locator("[data-radius]");
      await expect(square).toHaveCSS("border-radius", "16px");
      await page.getByLabel("Corner radius").focus();
      await page.keyboard.press("End");
      await expect(square).toHaveCSS("border-radius", "56px");
      const tile = page.locator("[data-tint]");
      const tintBefore = await tile.evaluate(
        (el) => getComputedStyle(el).backgroundColor,
      );
      await page.getByLabel("Primary mix").focus();
      await page.keyboard.press("Home");
      await expect
        .poll(() => tile.evaluate((el) => getComputedStyle(el).backgroundColor))
        .not.toBe(tintBefore);
      const popTarget = page.locator("[data-pop]");
      await expect(popTarget).toHaveAttribute("data-pop", "off");
      await page.getByRole("switch", { name: "Make it pop" }).check();
      await expect(popTarget).toHaveAttribute("data-pop", "on");
    });

    test("kartu studi kasus membuka modal", async ({ page }) => {
      await openPage(page, framework);
      await page.getByRole("button", { name: "Open case study: Muat" }).click();
      const dialog = page.getByRole("dialog", { name: "Muat" });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText("32%");
      await expect(dialog).toContainText("Cikarang to Semarang");
      await dialog.getByRole("button", { name: "Next project" }).click();
      await expect(page.getByRole("dialog", { name: "Tenun" })).toContainText(
        "340 screens",
      );
      await page.getByRole("button", { name: "Done" }).click();
      await expect(caseDialog(page)).toBeHidden();
      await page
        .getByRole("button", { name: "Open case study: Sehat" })
        .click();
      await expect(page.getByRole("dialog", { name: "Sehat" })).toContainText(
        "Surabaya",
      );
      await page.keyboard.press("Escape");
      await expect(caseDialog(page)).toBeHidden();
    });

    test("form kontak memvalidasi lalu memunculkan toast", async ({ page }) => {
      await openPage(page, framework);
      const form = page.getByRole("form", { name: "Contact form" });
      await form.getByRole("button", { name: "Send message" }).click();
      await expect(form.getByText("Tell me your name.")).toBeVisible();
      await expect(form.getByLabel("Email")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      await expect(
        form.getByText("Write at least 10 characters"),
      ).toBeVisible();
      await form.getByLabel("Name").fill("Andi Pratama");
      await form.getByLabel("Email").fill("andi@kopikita.id");
      await form
        .getByLabel("Project details")
        .fill("Our warehouse app needs a calmer dispatch flow.");
      await form.getByRole("button", { name: "Send message" }).click();
      await expect(toastRegion(page)).toContainText(
        "Thanks Andi, I will reply to andi@kopikita.id within two days.",
      );
      await expect(form.getByLabel("Name")).toHaveValue("");
      await expect(form.getByText("Tell me your name.")).toHaveCount(0);
    });

    test("mobile tanpa overflow dan menu membuka section", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openPage(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("navigation", { name: "Mobile" });
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await menu.getByRole("link", { name: "About" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#about$/);
      await expect(
        page.getByRole("heading", { name: "About", level: 2 }),
      ).toBeInViewport();
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(menu.getByRole("link", { name: "About" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await menu.getByRole("link", { name: "Work" }).focus();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });
  });
}
