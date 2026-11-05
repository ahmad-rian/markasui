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

const SLUG = "crm-customer";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
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
      {
        threshold: 0.1,
      },
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

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

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
        await openTemplate(page, framework, theme);
        const { violations } = await new AxeBuilder({ page })
          .withTags(WCAG_TAGS)
          .analyze();
        expect(
          violations.map(
            (v) =>
              `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
          ),
        ).toEqual([]);
      });
    }

    test("navigasi atas dan rail menandai item aktif", async ({ page }) => {
      await openTemplate(page, framework);
      const main = page.getByRole("navigation", { name: "Main" });
      await main.getByRole("button", { name: "Deals" }).click();
      await expect(main.getByRole("button", { name: "Deals" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(
        main.getByRole("button", { name: "Customers" }),
      ).not.toHaveAttribute("aria-current", "page");

      const rail = page.getByRole("navigation", { name: "Workspace" });
      await rail.getByRole("button", { name: "Calendar" }).click();
      await expect(
        rail.getByRole("button", { name: "Calendar" }),
      ).toHaveAttribute("aria-current", "page");
      await expect(
        rail.getByRole("button", { name: "Contacts" }),
      ).not.toHaveAttribute("aria-current", "page");
    });

    test("tab funnel mengganti angka", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(page.getByText("Rp 592.900.000")).toBeVisible();
      await page.getByRole("tab", { name: "Total" }).click();
      await expect(page.getByText("Rp 1.069.800.000")).toBeVisible();
      await expect(page.getByText("Rp 592.900.000")).toBeHidden();
    });

    test("tombol aksi profil memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Send email" }).click();
      await expect(toastRegion(page)).toContainText("Send email");
    });

    test("drawer edit menyimpan detail pelanggan", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Edit" }).click();
      const drawer = page.getByRole("dialog", {
        name: "Edit customer details",
      });
      await expect(drawer).toBeVisible();
      await drawer.getByLabel("First name").fill("Ratna");
      await drawer.getByRole("button", { name: "Save changes" }).click();
      await expect(drawer).toBeHidden();
      await expect(page.locator("dd[data-field=firstName]")).toHaveText(
        "Ratna",
      );
      await expect(
        page.getByRole("heading", { name: "Ratna Kusuma" }),
      ).toBeVisible();
      await expect(toastRegion(page)).toContainText("Customer details saved");
    });

    test("sortir kartu deal lewat dropdown", async ({ page }) => {
      await openTemplate(page, framework);
      const cards = page.locator("li[data-deal]");
      await expect(cards.first()).toHaveAttribute("data-deal", "d1");
      await page.getByRole("button", { name: /Sort:/ }).click();
      await page.getByRole("menuitem", { name: "Lowest value" }).click();
      await expect(cards.first()).toHaveAttribute("data-deal", "d5");
      await expect(page.getByRole("button", { name: /Sort:/ })).toContainText(
        "Lowest value",
      );
    });

    test("klik kartu menandai terpilih dan menu kartu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const card = page.getByRole("button", {
        name: "Annual support renewal",
        exact: true,
      });
      await card.click();
      await expect(card).toHaveAttribute("aria-pressed", "true");
      await expect(
        page.getByRole("button", {
          name: "Cloud migration package",
          exact: true,
        }),
      ).toHaveAttribute("aria-pressed", "false");

      await page
        .getByRole("button", { name: "Actions for Data warehouse audit" })
        .click();
      await page.getByRole("menuitem", { name: "Duplicate deal" }).click();
      await expect(toastRegion(page)).toContainText("Deal duplicated");
    });

    test("kalender berpindah bulan dan memilih tanggal", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(page.getByText("Send revised proposal")).toBeVisible();
      await page.getByRole("button", { name: "Next month" }).click();
      await expect(
        page.getByRole("heading", { name: "December 2026" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "December 2, 1 task" }).click();
      await expect(
        page.getByRole("heading", { name: "Wednesday, December 2" }),
      ).toBeVisible();
      await expect(page.getByText("Implementation planning")).toBeVisible();
      await page.getByRole("button", { name: "December 3, 0 tasks" }).click();
      await expect(page.getByText("No tasks on this day.")).toBeVisible();
    });

    test("mobile tanpa overflow horizontal dan menu membuka drawer", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);

      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Menu" });
      await expect(menu).toBeVisible();
      await menu.getByRole("button", { name: "Finance" }).click();
      await expect(menu).toBeHidden();
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Finance" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
