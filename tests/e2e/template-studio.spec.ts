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

const SLUG = "studio";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const projects = (page: Page) => page.locator("li[data-project]:visible");
const caseDialog = (page: Page) => page.locator("#studio-case");

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
    page.getByRole("heading", { level: 1, name: /I design software/ }),
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

    test("aksen biru dipakai tombol utama dan tetap lolos axe", async ({
      page,
    }) => {
      test.slow();
      await openPage(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(page.getByRole("link", { name: "Contact me" })).toHaveCSS(
        "background-color",
        "rgb(29, 78, 216)",
      );
      await expect(page.getByRole("button", { name: "All work" })).toHaveCSS(
        "background-color",
        "rgb(29, 78, 216)",
      );
      await expectNoAxeViolations(page, "blue");
    });

    test("tab navbar menandai section dari hash", async ({ page }) => {
      await openPage(page, framework);
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await nav.getByRole("link", { name: "Case Study" }).click();
      await expect(page).toHaveURL(/#work$/);
      await expect(
        nav.getByRole("link", { name: "Case Study" }),
      ).toHaveAttribute("aria-current", "location");
      await expect(nav.getByRole("link", { name: "Home" })).not.toHaveAttribute(
        "aria-current",
        "location",
      );
      await expect(
        page.getByRole("heading", { name: "Case studies" }),
      ).toBeInViewport();
      await page.goBack();
      await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
        "aria-current",
        "location",
      );
    });

    test("tag keahlian mengganti penjelasan", async ({ page }) => {
      await openPage(page, framework);
      const research = page.getByRole("button", { name: "User Research" });
      await expect(
        page.getByRole("button", { name: "Interaction Design" }),
      ).toHaveAttribute("aria-pressed", "true");
      await research.click();
      await expect(research).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByText("Over 140 sessions")).toBeVisible();
    });

    test("filter proyek dan modal studi kasus", async ({ page }) => {
      await openPage(page, framework);
      await expect(projects(page)).toHaveCount(3);
      await page.getByRole("button", { name: "Web", exact: true }).click();
      await expect(projects(page)).toHaveCount(1);
      await expect(projects(page).first()).toHaveAttribute(
        "data-project",
        "forge",
      );
      await page.getByRole("button", { name: "Mobile", exact: true }).click();
      await expect(projects(page)).toHaveCount(2);
      await page.getByRole("button", { name: "All work" }).click();
      await expect(projects(page)).toHaveCount(3);

      await page
        .getByRole("button", { name: "Read case study for Forge" })
        .click();
      const dialog = page.getByRole("dialog", { name: "Forge" });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText("61%");
      await expect(dialog).toContainText("Batam");
      await dialog.getByRole("button", { name: "Next project" }).click();
      await expect(page.getByRole("dialog", { name: "Lintas" })).toContainText(
        "27%",
      );
      await page.getByRole("button", { name: "Done" }).click();
      await expect(caseDialog(page)).toBeHidden();

      await page
        .getByRole("button", { name: "Read case study for Tandem" })
        .click();
      await expect(page.getByRole("dialog", { name: "Tandem" })).toContainText(
        "24 couples",
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
        .fill("A loyalty app for our coffee shops.");
      await form.getByRole("button", { name: "Send message" }).click();
      await expect(toastRegion(page)).toContainText(
        "Thanks Andi, I will reply to andi@kopikita.id within two days.",
      );
      await expect(form.getByLabel("Name")).toHaveValue("");
      await expect(form.getByText("Tell me your name.")).toHaveCount(0);
    });

    test("animasi masuk berjalan saat scroll jika motion diizinkan", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openPage(page, framework);
      const reveal = page.locator("#contact [data-reveal]").first();
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

      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      const menu = page.getByRole("navigation", { name: "Mobile" });
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await menu.getByRole("link", { name: "Playground" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#playground$/);
      await expect(
        page.getByRole("heading", { name: "Playground" }),
      ).toBeInViewport();
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("link", { name: "Playground" }),
      ).toHaveAttribute("aria-current", "location");
      await menu.getByRole("link", { name: "About" }).focus();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });
  });
}
