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

const SLUG = "sales-dashboard";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(
    page.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeVisible();
  await expect(page.getByText("Rp 248.6M").first()).toBeVisible();
}

const capture = async (page: Page) =>
  PNG.sync.read(
    await page.screenshot({ animations: "disabled", caret: "hide" }),
  );

async function expectSameAsReact(page: Page, testInfo: TestInfo) {
  await openTemplate(page, "react");
  const reference = await capture(page);
  for (const framework of ["blade", "vue"] as const) {
    await openTemplate(page, framework);
    const candidate = await capture(page);
    expect([candidate.width, candidate.height]).toEqual([
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
    if (ratio > MAX_DIFF_RATIO) {
      await testInfo.attach(`${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    }
    expect(ratio, `selisih piksel ${framework} vs react`).toBeLessThanOrEqual(
      MAX_DIFF_RATIO,
    );
  }
}

const sellerNames = (page: Page) =>
  page
    .getByRole("region", { name: "Best sellers" })
    .locator("tbody tr:visible td:first-child span.whitespace-nowrap")
    .allInnerTexts();

for (const [name, viewport] of Object.entries(viewports)) {
  test.describe(`${name} ${viewport.width}px`, () => {
    test.use({ viewport });

    test("Blade dan Vue sama dengan React", async ({ page }, testInfo) => {
      await expectSameAsReact(page, testInfo);
    });

    for (const framework of frameworks) {
      test(`${framework}: tanpa overflow horizontal`, async ({ page }) => {
        await openTemplate(page, framework);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}

for (const framework of frameworks) {
  for (const theme of themes) {
    test(`${framework} (${theme}) lolos axe-core`, async ({ page }) => {
      await page.setViewportSize(viewports.desktop);
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

  test.describe(`${framework} interaksi`, () => {
    test.use({ viewport: viewports.desktop });

    test.beforeEach(async ({ page }) => {
      await openTemplate(page, framework);
    });

    test("menu navigasi aktif saat diklik", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      await expect(
        nav.getByRole("button", { name: "Business overview" }),
      ).toHaveAttribute("aria-current", "page");
      await nav.getByRole("button", { name: "Customers" }).click();
      await expect(
        nav.getByRole("button", { name: "Customers" }),
      ).toHaveAttribute("aria-current", "page");
      await expect(
        nav.getByRole("button", { name: "Business overview" }),
      ).not.toHaveAttribute("aria-current");
    });

    test("filter periode mengganti angka kartu dan grafik", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Period: Monthly" }).click();
      await page.getByRole("menuitem", { name: "Weekly" }).click();
      await expect(
        page.getByRole("button", { name: "Period: Weekly" }),
      ).toBeVisible();
      await expect(page.getByText("Rp 62.4M")).toBeVisible();
      await expect(page.getByText("vs 1,222 last week")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "8.2M Mon" }),
      ).toBeVisible();
      await expect(
        page.getByRole("img", { name: /1,284 orders this week/ }),
      ).toBeVisible();

      await page.getByRole("button", { name: "Period: Weekly" }).click();
      await page.getByRole("menuitem", { name: "Yearly" }).click();
      await expect(page.getByText("Rp 2.86B").first()).toBeVisible();
      await expect(
        page.getByRole("button", { name: "1.38B 2021" }),
      ).toBeVisible();
    });

    test("klik batang grafik memilih nilainya", async ({ page }) => {
      const bar = page.getByRole("button", { name: "194.7M Sep" });
      await bar.click();
      await expect(bar).toHaveAttribute("aria-pressed", "true");
      await expect(
        page.getByRole("button", { name: "248.6M Nov" }),
      ).toHaveAttribute("aria-pressed", "false");
      await expect(
        page.locator("[aria-live=polite]").getByText("Rp 194.7M"),
      ).toBeVisible();
    });

    test("Export memunculkan toast", async ({ page }) => {
      await page.getByRole("button", { name: "Export" }).click();
      const region = page.getByRole("status", { name: "Notifications" });
      await expect(region.getByText("Report exported")).toBeVisible();
      await expect(
        region.getByText("Monthly sales report saved as CSV."),
      ).toBeVisible();
    });

    test("Filter membuka drawer dan menyaring tabel", async ({ page }) => {
      await page.getByRole("button", { name: "Filter", exact: true }).click();
      const drawer = page.getByRole("dialog", { name: "Filter report" });
      await expect(drawer).toBeVisible();
      await drawer.getByLabel("Date range").selectOption("last-7");
      await drawer.getByLabel("Category").selectOption("electronics");
      await drawer.getByRole("button", { name: "Apply filters" }).click();
      await expect(drawer).toBeHidden();
      await expect(
        page
          .getByRole("article", { name: "Best sellers" })
          .getByText("Last 7 days, Electronics"),
      ).toBeVisible();
      expect(await sellerNames(page)).toEqual(["Dewi Lestari", "Agus Wijaya"]);
      await expect(
        page.getByRole("status").getByText("Filters applied"),
      ).toBeVisible();
    });

    test("header tabel mengurutkan baris", async ({ page }) => {
      const table = page.getByRole("region", { name: "Best sellers" });
      expect((await sellerNames(page))[0]).toBe("Dewi Lestari");
      await table.getByRole("button", { name: "Seller" }).click();
      await expect(
        table.getByRole("columnheader", { name: "Seller" }),
      ).toHaveAttribute("aria-sort", "ascending");
      expect(await sellerNames(page)).toEqual([
        "Agus Wijaya",
        "Budi Santoso",
        "Dewi Lestari",
        "Putri Anggraini",
        "Rizky Hidayat",
        "Siti Rahmawati",
      ]);
      await table.getByRole("button", { name: "Change" }).click();
      await expect(
        table.getByRole("columnheader", { name: "Change" }),
      ).toHaveAttribute("aria-sort", "descending");
      expect((await sellerNames(page))[0]).toBe("Agus Wijaya");
      await table.getByRole("button", { name: "Change" }).click();
      expect((await sellerNames(page))[0]).toBe("Siti Rahmawati");
    });

    test("pencarian menyaring penjual dan menampilkan keadaan kosong", async ({
      page,
    }) => {
      const search = page.getByRole("searchbox", { name: "Search sellers" });
      await search.fill("serum");
      expect(await sellerNames(page)).toEqual(["Putri Anggraini"]);
      await search.fill("zzz");
      await expect(
        page.getByText("No sellers match your filters."),
      ).toBeVisible();
    });
  });

  test(`${framework}: menu mobile membuka drawer navigasi`, async ({
    page,
  }) => {
    await page.setViewportSize(viewports.mobile);
    await openTemplate(page, framework);
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Menu" });
    await expect(drawer).toBeVisible();
    await drawer.getByRole("button", { name: "Analytics" }).click();
    await expect(drawer).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      drawer.getByRole("button", { name: "Analytics" }),
    ).toHaveAttribute("aria-current", "page");
  });
}
