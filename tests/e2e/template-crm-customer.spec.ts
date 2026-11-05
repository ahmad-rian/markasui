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

/** Judul h1 tiap halaman, urut seperti navigasi. */
const pages = {
  home: "Good morning, Andi",
  customers: "Customer information",
  deals: "Deals pipeline",
  finance: "Finance overview",
  growth: "Growth and acquisition",
  projects: "Projects",
  calendar: "Calendar",
  reports: "Sales reports",
  files: "Files",
  settings: "Settings",
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const topNav = ["Deals", "Customers", "Finance", "Growth", "Projects"];
const railNav = [
  "Home",
  "Customers",
  "Calendar",
  "Reports",
  "Files",
  "Settings",
];
const labelOf = (id: PageId) => id.charAt(0).toUpperCase() + id.slice(1);

/** Aksen biru untuk memastikan semua sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const title = (page: Page) => page.locator("#crm-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "customers",
  theme: Theme = "light",
) {
  await page.goto(
    `/template.html?t=${SLUG}&fw=${framework}&theme=${theme}#${pageId}`,
  );
  await page.locator("body[data-ready=true]").waitFor();
  await expect(title(page)).toHaveText(pages[pageId]);
  await page.evaluate(() => document.fonts.ready);
}

/** Pindah halaman lewat hash tanpa memuat ulang, sama seperti tombol Back. */
async function switchTo(page: Page, pageId: PageId) {
  await page.evaluate((id) => (window.location.hash = id), pageId);
  await expect(title(page)).toHaveText(pages[pageId]);
  // Tunggu transisi warna navigasi selesai supaya axe membaca warna akhir.
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.playState !== "running"),
  );
}

async function capture(
  page: Page,
  framework: Framework,
  pageId: PageId,
  theme: Theme,
) {
  await openTemplate(page, framework, pageId, theme);
  return PNG.sync.read(
    await page.screenshot({
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    }),
  );
}

async function expectSameAsReact(
  page: Page,
  testInfo: TestInfo,
  pageId: PageId,
  theme: Theme,
) {
  const reference = await capture(page, "react", pageId, theme);
  for (const framework of ["blade", "vue"] as const) {
    const candidate = await capture(page, framework, pageId, theme);
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
      await testInfo.attach(`${pageId}-${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    expect(
      ratio,
      `selisih piksel ${pageId} ${framework} vs react`,
    ).toBeLessThanOrEqual(MAX_DIFF_RATIO);
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
  for (const pageId of pageIds) {
    test(`desktop light ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "light");
    });
  }

  for (const pageId of ["customers", "calendar"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["customers", "deals", "finance"] as const) {
    test(`mobile light ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(MOBILE);
      await expectSameAsReact(page, testInfo, pageId, "light");
    });
  }
});

for (const framework of frameworks) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core di setiap halaman (${theme})`, async ({ page }) => {
        await openTemplate(page, framework, "home", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      const selectedDeal = page.locator("li[data-deal=d1]");
      await expect(selectedDeal).toHaveCSS("background-color", blue);
      await expect(
        page
          .getByRole("navigation", { name: "Main" })
          .getByRole("button", { name: "Customers" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "customers blue");
      await switchTo(page, "calendar");
      await expect(page.getByRole("button", { name: "New event" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expectNoAxeViolations(page, "calendar blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const main = page.getByRole("navigation", { name: "Main" });
      const rail = page.getByRole("navigation", { name: "Workspace" });
      const items = [
        ...topNav.map((label) => ({ nav: main, label })),
        ...railNav.map((label) => ({ nav: rail, label })),
      ];
      for (const { nav, label } of items) {
        const id = label.toLowerCase() as PageId;
        await nav.getByRole("button", { name: label, exact: true }).click();
        await expect(title(page)).toHaveText(pages[id]);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(
          nav.getByRole("button", { name: label, exact: true }),
        ).toHaveAttribute("aria-current", "page");
        await expect(page.getByText(`Lumen / ${labelOf(id)}`)).toBeVisible();
      }
      await expect(
        main.getByRole("button", { name: "Customers" }),
      ).not.toHaveAttribute("aria-current", "page");

      await page.goBack();
      await expect(title(page)).toHaveText(pages.files);
      await page.goBack();
      await expect(title(page)).toHaveText(pages.reports);
    });

    test("home: centang tugas mengubah hitungan", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const card = page.getByRole("article", { name: "Today's tasks" });
      await expect(card).toContainText("2 of 5 done");
      await card.getByLabel("Prepare the QBR deck").check();
      await expect(card).toContainText("3 of 5 done");
      await card.getByLabel("Call Hendra about the renewal").uncheck();
      await expect(card).toContainText("2 of 5 done");
    });

    test("customers: pilih pelanggan, edit, sortir, dan aksi", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Hendra Gunawan" }).click();
      await expect(
        page.getByRole("heading", { name: "Hendra Gunawan" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Hendra Gunawan" }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByText("hendra@sinarabadi.co.id")).toBeVisible();

      await page.getByRole("button", { name: "Edit" }).click();
      const drawer = page.getByRole("dialog", {
        name: "Edit customer details",
      });
      await expect(drawer.getByLabel("First name")).toHaveValue("Hendra");
      await drawer.getByLabel("First name").fill("Hadi");
      await drawer.getByRole("button", { name: "Save changes" }).click();
      await expect(drawer).toBeHidden();
      await expect(
        page.getByRole("heading", { name: "Hadi Gunawan" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Hadi Gunawan" }),
      ).toBeVisible();
      await expect(toastRegion(page)).toContainText("Customer details saved");

      const cards = page.locator("li[data-deal]");
      await expect(cards.first()).toHaveAttribute("data-deal", "d1");
      await page.getByRole("button", { name: /Sort:/ }).click();
      await page.getByRole("menuitem", { name: "Lowest value" }).click();
      await expect(cards.first()).toHaveAttribute("data-deal", "d3");
      await page
        .getByRole("button", { name: "Annual support renewal", exact: true })
        .click();
      await expect(
        page.getByRole("button", {
          name: "Annual support renewal",
          exact: true,
        }),
      ).toHaveAttribute("aria-pressed", "true");

      await page.getByRole("button", { name: "Send email" }).click();
      await expect(toastRegion(page)).toContainText("Send email");
    });

    test("deals: pindah tahap lewat menu memperbarui total kolom", async ({
      page,
    }) => {
      await openTemplate(page, framework, "deals");
      const won = page.locator("section[data-stage=Won]");
      const proposal = page.locator("section[data-stage=Proposal]");
      await expect(won.locator("[data-total]")).toHaveText("Rp 114.900.000");
      await expect(proposal.locator("[data-total]")).toHaveText(
        "Rp 94.550.000",
      );

      await page
        .getByRole("button", { name: "Data warehouse audit", exact: true })
        .click();
      const details = page.getByRole("article", { name: "Deal details" });
      await expect(details).toContainText("CV Maju Bersama");
      await details.getByRole("button", { name: "Move to stage" }).click();
      await page.getByRole("menuitem", { name: "Won" }).click();
      await expect(toastRegion(page)).toContainText("Moved to Won");
      await expect(won).toContainText("Data warehouse audit");
      await expect(proposal).not.toContainText("Data warehouse audit");
      await expect(won.locator("[data-total]")).toHaveText("Rp 157.650.000");
      await expect(proposal.locator("[data-total]")).toHaveText(
        "Rp 51.800.000",
      );
      await expect(details).toContainText("Won");
    });

    test("finance: sortir invoice dan kirim pengingat", async ({ page }) => {
      await openTemplate(page, framework, "finance");
      const rows = page.locator("tbody tr");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2032");
      const amount = page.getByRole("columnheader", { name: "Amount" });
      await amount.getByRole("button").click();
      await expect(amount).toHaveAttribute("aria-sort", "ascending");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2035");
      await amount.getByRole("button").click();
      await expect(amount).toHaveAttribute("aria-sort", "descending");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2041");
      await expect(
        page.getByRole("columnheader", { name: "Due date" }),
      ).not.toHaveAttribute("aria-sort", /.+/);
      await expect(rows.first().getByText("Pending")).toBeVisible();

      await page.getByRole("button", { name: "Send reminders" }).click();
      await expect(toastRegion(page)).toContainText("2 overdue invoices");
      await page.getByRole("button", { name: "Remind INV-2038" }).click();
      await expect(toastRegion(page)).toContainText(
        "INV-2038 to CV Maju Bersama",
      );
      await expect(
        page.getByRole("button", { name: "Remind INV-2036" }),
      ).toHaveCount(0);
    });

    test("growth: tab periode mengganti metrik", async ({ page }) => {
      await openTemplate(page, framework, "growth");
      const panel = page.getByRole("tabpanel");
      await expect(panel).toContainText("76.900");
      await page.getByRole("tab", { name: "7 days" }).click();
      await expect(panel).toContainText("18.420");
      await expect(panel).toContainText("Last 7 days");
      await page.getByRole("tab", { name: "90 days" }).click();
      await expect(panel).toContainText("214.300");
      await expect(
        panel.getByRole("img", { name: /Lead sources: Referral 29%/ }),
      ).toBeVisible();
    });

    test("projects: filter status dan drawer detail", async ({ page }) => {
      await openTemplate(page, framework, "projects");
      const rows = page.locator("li[data-project]");
      await expect(rows).toHaveCount(6);
      await page.getByRole("button", { name: "At risk", exact: true }).click();
      await expect(rows).toHaveCount(2);
      await expect(page.getByText("2 projects")).toBeVisible();

      await page.getByRole("button", { name: /HR system integration/ }).click();
      const drawer = page.getByRole("dialog", { name: "Project details" });
      await expect(drawer).toBeVisible();
      await expect(drawer).toContainText("PT Bumi Persada");
      await expect(drawer).toContainText("Dewi Lestari");
      await expect(drawer).toContainText("23%");
      await drawer.getByRole("button", { name: "Close" }).first().click();
      await expect(drawer).toBeHidden();
    });

    test("calendar: pindah bulan, pilih tanggal, dan tambah agenda", async ({
      page,
    }) => {
      await openTemplate(page, framework, "calendar");
      await expect(page.getByText("Send revised proposal")).toHaveCount(2);
      await page.getByRole("button", { name: "Next month" }).click();
      await expect(
        page.getByRole("heading", { name: "December 2026" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "December 2, 1 event" }).click();
      await expect(
        page.getByRole("heading", { name: "Wednesday, December 2" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Previous month" }).click();

      await page.getByRole("button", { name: "New event" }).click();
      const modal = page.getByRole("dialog", { name: "New event" });
      await expect(modal).toBeVisible();
      await modal.getByLabel("Title").fill("Demo call with Maya");
      await modal.getByLabel("Date").fill("2026-11-10");
      await modal.getByLabel("Type").selectOption("Call");
      await modal.getByRole("button", { name: "Add event" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText("Event added");
      await expect(
        page.getByRole("heading", { name: "Tuesday, November 10" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "November 10, 1 event" }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        page
          .getByRole("article", { name: "Tuesday, November 10" })
          .getByText("Demo call with Maya"),
      ).toBeVisible();
    });

    test("reports: periode mengganti angka dan grafik", async ({ page }) => {
      await openTemplate(page, framework, "reports");
      await expect(page.locator("[data-bar]")).toHaveCount(4);
      await page.getByLabel("Period").selectOption("year");
      await expect(page.getByText("Rp 3.968.000.000")).toBeVisible();
      await expect(page.locator("[data-bar]")).toHaveCount(11);
      await expect(
        page.getByRole("img", { name: /Revenue This year: Jan Rp 248/ }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Export PDF" }).click();
      await expect(toastRegion(page)).toContainText("This year sales report");
    });

    test("files: pencarian dan tampilan grid atau list", async ({ page }) => {
      await openTemplate(page, framework, "files");
      const list = page.locator("ul[data-view]");
      await expect(list.locator("li")).toHaveCount(8);
      await page.getByLabel("Search files").fill("pdf");
      await expect(list.locator("li")).toHaveCount(2);
      await expect(page.getByText("2 of 8 files")).toBeVisible();
      await page.getByRole("button", { name: "List view" }).click();
      await expect(list).toHaveAttribute("data-view", "list");
      await expect(
        page.getByRole("button", { name: "List view" }),
      ).toHaveAttribute("aria-pressed", "true");
      await page.getByLabel("Search files").fill("zzz");
      await expect(page.getByText("No files match your search.")).toBeVisible();
    });

    test("settings: switch notifikasi dan simpan memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework, "settings");
      const weekly = page.getByRole("switch", { name: "Weekly report" });
      await expect(weekly).not.toBeChecked();
      await weekly.check();
      await expect(weekly).toBeChecked();
      await page.getByLabel("First name").fill("Andika");
      await page.getByRole("button", { name: "Save changes" }).click();
      await expect(toastRegion(page)).toContainText(
        "Andika Wijaya, 4 notifications on",
      );
      await page.getByRole("button", { name: "Reset" }).click();
      await expect(weekly).not.toBeChecked();
      await expect(page.getByLabel("First name")).toHaveValue("Andi");
    });

    test("mobile tanpa overflow horizontal dan menu membuka halaman", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework, "home");
      for (const pageId of pageIds) {
        await switchTo(page, pageId);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, pageId).toBeLessThanOrEqual(0);
      }

      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Menu" });
      await expect(menu).toBeVisible();
      await menu.getByRole("button", { name: "Finance" }).click();
      await expect(menu).toBeHidden();
      await expect(title(page)).toHaveText(pages.finance);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Finance" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
