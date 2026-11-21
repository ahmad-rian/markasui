import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  templateAxeTimeout,
  templateFrameworks,
  templateParityFrameworks,
  templateParityTimeout,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "gudang";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
/** Lebar yang wajib tanpa overflow horizontal. */
const WIDTHS = [360, 390, 768, 1280];

/** Label navigasi dan judul h1 tiap halaman. */
const pages = {
  overview: "Overview",
  products: "Products",
  movements: "Stock movements",
  orders: "Purchase orders",
  shipments: "Shipments",
  suppliers: "Suppliers",
  reports: "Reports",
  settings: "Settings",
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";

const title = (page: Page) => page.locator("#gudang-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const warehouse = (page: Page, name: string) =>
  page
    .getByRole("group", { name: "Warehouse" })
    .getByRole("button", { name, exact: true });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "overview",
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
  // Tunggu transisi warna selesai supaya axe membaca warna akhir.
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
  for (const framework of templateParityFrameworks(SLUG)) {
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
  test.describe.configure({ timeout: templateParityTimeout(SLUG) });

  for (const pageId of pageIds) {
    test(`desktop light ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "light");
    });
  }

  for (const pageId of ["overview", "orders"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["overview", "products", "shipments"] as const) {
    test(`mobile light ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(MOBILE);
      await expectSameAsReact(page, testInfo, pageId, "light");
    });
  }
});

for (const framework of templateFrameworks(SLUG)) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core di setiap halaman (${theme})`, async ({ page }) => {
        // Semua halaman ditambah drawer produk dan modal penyesuaian.
        test.setTimeout(templateAxeTimeout(pageIds.length + 2));
        await openTemplate(page, framework, "overview", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
        await switchTo(page, "products");
        await page
          .getByRole("button", { name: "Kopi Gayo Bubuk 250 g" })
          .click();
        await expect(
          page.getByRole("dialog", { name: "Product details" }),
        ).toBeVisible();
        await expectNoAxeViolations(page, `drawer ${theme}`);
        await page.keyboard.press("Escape");
        await switchTo(page, "movements");
        await page.getByRole("button", { name: "New adjustment" }).click();
        const modal = page.getByRole("dialog", { name: "New adjustment" });
        await modal.getByRole("button", { name: "Record adjustment" }).click();
        await expect(
          modal.getByText("Enter a whole number other than 0"),
        ).toBeVisible();
        await expectNoAxeViolations(page, `modal ${theme}`);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(
        page
          .getByRole("navigation", { name: "Sections" })
          .getByRole("button", { name: "Overview" }),
      ).toHaveCSS("border-bottom-color", BLUE);
      await expect(page.locator("[data-bar=in]").first()).toHaveCSS(
        "background-color",
        BLUE,
      );
      await expectNoAxeViolations(page, "overview blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Sections" });
      for (const id of [...pageIds.slice(1), "overview" as const]) {
        const button = nav.getByRole("button", {
          name: pages[id],
          exact: true,
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[id]);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
      }
      await page.goBack();
      await expect(title(page)).toHaveText(pages.settings);
    });

    test("topbar: gudang mengganti data, notifikasi, dan menu akun", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const value = page.locator("[data-kpi='Stock value']");
      await expect(value).toHaveText("Rp 1,02 M");
      await expect(page.locator("[data-context]")).toContainText("Cakung DC");
      await expect(page.locator("[data-short]")).toHaveCount(2);
      await warehouse(page, "Surabaya").click();
      await expect(warehouse(page, "Surabaya")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(value).toHaveText("Rp 631,4 jt");
      await expect(page.locator("[data-context]")).toContainText("Rungkut DC");
      await expect(page.locator("[data-activity]").first()).toContainText(
        "From Jakarta",
      );
      // Gudang terpilih ikut ke halaman lain.
      await switchTo(page, "movements");
      await expect(page.locator("[data-move]")).toHaveCount(6);
      await expect(page.locator("[data-move]").first()).toContainText(
        "TRF-0312",
      );

      await page
        .getByRole("button", { name: "Notifications, 3 unread" })
        .click();
      await page.getByRole("button", { name: "Mark all as read" }).click();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Notifications", exact: true }),
      ).toBeVisible();

      await page.getByRole("button", { name: "Account menu" }).click();
      await page.getByRole("menuitem", { name: "Team members" }).click();
      await expect(toastRegion(page)).toContainText("Team members");
    });

    test("overview: seri grafik dan tombol reorder", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(page.locator("[data-bar=in]")).toHaveCount(7);
      await expect(page.locator("[data-bar=out]")).toHaveCount(7);
      const group = page.getByRole("group", { name: "Chart series" });
      await group.getByRole("button", { name: "Inbound" }).click();
      await expect(page.locator("[data-bar=out]")).toHaveCount(0);
      await expect(page.locator("[data-bar=in]")).toHaveCount(7);
      await group.getByRole("button", { name: "Outbound" }).click();
      await expect(page.locator("[data-bar=in]")).toHaveCount(0);
      await page
        .getByRole("button", { name: "Reorder Kopi Gayo Bubuk 250 g" })
        .click();
      await expect(toastRegion(page)).toContainText("CV Gayo Lestari");
      await page.getByRole("button", { name: "Open ledger" }).click();
      await expect(title(page)).toHaveText(pages.movements);
    });

    test("products: cari, filter, urut, dan aksi massal", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByLabel("Search products").fill("kopi");
      await page.getByLabel("Search products").press("Enter");
      await expect(title(page)).toHaveText(pages.products);
      const rows = page.locator("tr[data-product]");
      await expect(rows).toHaveCount(1);
      await expect(page.getByLabel("Filter products")).toHaveValue("kopi");
      await page.getByLabel("Filter products").fill("");
      await expect(rows).toHaveCount(8);
      await page
        .getByRole("combobox", { name: "Category" })
        .selectOption("Household");
      await expect(rows).toHaveCount(2);
      await expect(page.locator("[data-count]")).toContainText("2 products");
      await page
        .getByRole("combobox", { name: "Category" })
        .selectOption("all");

      const sort = page.getByRole("button", { name: "JKT" });
      await sort.click();
      await expect(rows.first()).toContainText("STP-2033");
      await sort.click();
      await expect(rows.first()).toContainText("STP-2096");
      await expect(
        page.getByRole("columnheader", { name: "JKT" }),
      ).toHaveAttribute("aria-sort", "descending");

      await page.getByLabel("Select Mi Instan Ayam Bawang").check();
      await page.getByLabel("Select Gula Pasir 1 kg").check();
      const bulk = page.locator("[data-bulk]");
      await expect(bulk).toContainText("2 selected");
      await bulk.getByRole("button", { name: "Create PO" }).click();
      await expect(toastRegion(page)).toContainText("2 products");
      await expect(bulk).toBeHidden();
      await page.getByLabel("Select all products").check();
      await expect(bulk).toContainText("8 selected");
      await bulk.getByRole("button", { name: "Clear" }).click();
      await expect(page.getByLabel("Select all products")).not.toBeChecked();
    });

    test("products: drawer detail dan modal tambah produk", async ({
      page,
    }) => {
      await openTemplate(page, framework, "products");
      await page.getByRole("button", { name: "Kopi Gayo Bubuk 250 g" }).click();
      const drawer = page.getByRole("dialog", { name: "Product details" });
      await expect(drawer.locator("[data-stock=jkt]")).toHaveText("96 carton");
      await expect(drawer.locator("[data-history]")).toHaveCount(2);
      await expect(drawer).toContainText("CV Gayo Lestari");
      await drawer.getByRole("button", { name: "Create PO" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText("Draft PO created");

      await page.getByRole("button", { name: "Add product" }).click();
      const modal = page.getByRole("dialog", { name: "Add product" });
      await modal.getByRole("button", { name: "Save product" }).click();
      await expect(modal.getByText("Enter a product name")).toBeVisible();
      await expect(modal.getByText("Use the format ABC-1234")).toBeVisible();
      await expect(modal.getByLabel("SKU")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      await modal.getByLabel("Product name").fill("Air Mineral 600 ml");
      await modal.getByLabel("SKU").fill("BEV-1042");
      await modal.getByLabel("Opening stock in Jakarta").fill("50");
      await modal.getByRole("button", { name: "Save product" }).click();
      await expect(modal.getByText("This SKU already exists")).toBeVisible();
      await modal.getByLabel("SKU").fill("bev-1200");
      await modal.getByRole("button", { name: "Save product" }).click();
      await expect(modal).toBeHidden();
      const rows = page.locator("tr[data-product]");
      await expect(rows).toHaveCount(9);
      await expect(rows.first()).toContainText("Air Mineral 600 ml");
      await expect(rows.first()).toContainText("BEV-1200");
      await expect(toastRegion(page)).toContainText("Product added");
    });

    test("movements: filter jenis, rentang tanggal, dan penyesuaian baru", async ({
      page,
    }) => {
      await openTemplate(page, framework, "movements");
      const rows = page.locator("tr[data-move]");
      await expect(rows).toHaveCount(6);
      const group = page.getByRole("group", { name: "Filter by type" });
      await group.getByRole("button", { name: "Outbound" }).click();
      await expect(rows).toHaveCount(2);
      await group.getByRole("button", { name: "All" }).click();
      await page.getByLabel("From date").fill("2026-11-19");
      await expect(rows).toHaveCount(4);
      await page.getByLabel("To date").fill("2026-11-19");
      await expect(rows).toHaveCount(2);
      await expect(page.locator("[data-count]")).toHaveText(
        "2 movements · net -304 units",
      );
      await page.getByLabel("To date").fill("");

      await page.getByRole("button", { name: "New adjustment" }).click();
      const modal = page.getByRole("dialog", { name: "New adjustment" });
      await modal.getByLabel("Quantity change").fill("0");
      await modal.getByRole("button", { name: "Record adjustment" }).click();
      await expect(
        modal.getByText("Enter a whole number other than 0"),
      ).toBeVisible();
      await modal.getByLabel("Product").selectOption("p5");
      await modal.getByLabel("Quantity change").fill("-12");
      await modal.getByLabel("Reason").selectOption("Expired");
      await modal.getByRole("button", { name: "Record adjustment" }).click();
      await expect(modal).toBeHidden();
      await expect(rows).toHaveCount(5);
      await expect(rows.first()).toContainText("ADJ-0089");
      await expect(rows.first()).toContainText("Gula Pasir 1 kg");
      await expect(rows.first()).toContainText("-12");
      await expect(rows.first()).toContainText("Expired");
      await expect(toastRegion(page)).toContainText("Gula Pasir 1 kg: -12");
    });

    test("orders: kirim draft dan terima barang menambah stok", async ({
      page,
    }) => {
      await openTemplate(page, framework, "orders");
      const detail = page.locator("[data-order]");
      const lines = page.getByRole("region", { name: "Line items" });
      await expect(detail).toHaveAttribute("data-order", "PO-2611-014");
      await expect(detail.locator("[data-step=sent]")).toHaveAttribute(
        "aria-current",
        "step",
      );
      await expect(detail.locator("[data-total]")).toHaveText("Rp 105.006.000");
      await expect(
        lines.getByRole("row", { name: /Beras Pandan Wangi/ }),
      ).toContainText("2.460");
      await detail.getByRole("button", { name: "Receive goods" }).click();
      await expect(toastRegion(page)).toContainText(
        "PO-2611-014: +1.000 units added to Jakarta",
      );
      await expect(detail.locator("[data-step=received]")).toHaveAttribute(
        "aria-current",
        "step",
      );
      await expect(
        lines.getByRole("row", { name: /Beras Pandan Wangi/ }),
      ).toContainText("2.860");
      await expect(
        lines.getByRole("row", { name: /Mi Instan Ayam Bawang/ }),
      ).toContainText("3.720");
      await expect(
        detail.getByRole("button", { name: "Receive goods" }),
      ).toHaveCount(0);

      const list = page.getByRole("region", { name: "Orders" });
      await list.getByRole("button", { name: /PO-2611-015/ }).click();
      await expect(detail).toHaveAttribute("data-order", "PO-2611-015");
      await detail.getByRole("button", { name: "Send to supplier" }).click();
      await expect(toastRegion(page)).toContainText("PT Sawit Makmur Sejati");
      await expect(
        detail.getByRole("button", { name: "Receive goods" }),
      ).toBeVisible();

      const group = page.getByRole("group", { name: "Filter by status" });
      await group.getByRole("button", { name: "Received" }).click();
      await expect(list.getByRole("button")).toHaveCount(2);
      await group.getByRole("button", { name: "Draft" }).click();
      await expect(list).toContainText("No purchase orders with this status.");
      await expect(detail).toHaveCount(0);
    });

    test("shipments: majukan status dan filter kurir", async ({ page }) => {
      await openTemplate(page, framework, "shipments");
      const column = (name: string) =>
        page.locator(`[data-stage=${name}] [data-shipment]`);
      await expect(column("Picking")).toHaveCount(2);
      await expect(page.locator("[data-open]")).toHaveText(
        "4 open orders from Jakarta",
      );
      const move = page.getByRole("button", {
        name: "Move to Packed: SO-48211",
      });
      await move.focus();
      await page.keyboard.press("Enter");
      await expect(column("Picking")).toHaveCount(1);
      await expect(column("Packed")).toHaveCount(2);
      await expect(toastRegion(page)).toContainText("SO-48211 moved to Packed");
      await page
        .getByRole("button", { name: "Move to Delivered: SO-48201" })
        .click();
      await expect(column("Delivered")).toHaveCount(2);
      await expect(page.locator("[data-open]")).toHaveText(
        "3 open orders from Jakarta",
      );
      await page.getByLabel("Courier").selectOption("JNE Trucking");
      await expect(page.locator("[data-shipment]")).toHaveCount(2);
      await expect(page.locator("[data-shipment=SO-48211]")).toContainText(
        "JN3390127761",
      );
    });

    test("suppliers: urutkan dan kirim pesan", async ({ page }) => {
      await openTemplate(page, framework, "suppliers");
      const cards = page.locator("[data-supplier]");
      await expect(cards).toHaveCount(6);
      await expect(cards.first()).toContainText("PT Lumbung Pangan Nusantara");
      await page.getByLabel("Sort suppliers").selectOption("lead");
      await expect(cards.first()).toContainText("PT Bersih Cemerlang");
      await expect(cards.first()).toContainText("2 days");
      await page
        .getByRole("button", { name: "Contact CV Gayo Lestari" })
        .click();
      const modal = page.getByRole("dialog", { name: "Contact supplier" });
      await expect(modal).toContainText("Cut Meutia");
      await modal.getByRole("button", { name: "Send message" }).click();
      await expect(modal.getByText("Write a message first")).toBeVisible();
      await modal.getByLabel("Message").fill("Can you ship 60 cartons?");
      await modal.getByRole("button", { name: "Send message" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "Cut Meutia at CV Gayo Lestari",
      );
    });

    test("reports: periode mengganti angka dan ekspor", async ({ page }) => {
      await openTemplate(page, framework, "reports");
      const top = page.locator("[data-mover='0']");
      await expect(top).toContainText("Mi Instan Ayam Bawang");
      await expect(top).toContainText("4.180");
      await expect(page.locator("[data-age]")).toHaveCount(4);
      await expect(page.locator("[data-kpi='2']")).toHaveText("12.890");
      await page
        .getByRole("group", { name: "Period" })
        .getByRole("button", { name: "90 days" })
        .click();
      await expect(top).toContainText("11.704");
      await page.getByRole("button", { name: "Export CSV" }).click();
      await expect(toastRegion(page)).toContainText("stock-report-jkt-90d.csv");
    });

    test("settings: validasi, sakelar, dan simpan", async ({ page }) => {
      await openTemplate(page, framework, "settings");
      await page.getByLabel("Safety stock (days)").fill("0");
      await page.getByRole("button", { name: "Save changes" }).click();
      await expect(page.getByText("Enter a number from 1 to 90")).toBeVisible();
      await page.getByLabel("Safety stock (days)").fill("21");
      await expect(page.locator("[data-alerts]")).toHaveText("3 of 4 on");
      await page.getByRole("switch", { name: "Daily summary email" }).check();
      await expect(page.locator("[data-alerts]")).toHaveText("4 of 4 on");
      await page.getByLabel("Default stock unit").selectOption("Pallet");
      await page.getByRole("button", { name: "Save changes" }).click();
      await expect(toastRegion(page)).toContainText(
        "Safety stock 21 days, 4 alerts on",
      );
      await expect(page.getByText("Enter a number from 1 to 90")).toHaveCount(
        0,
      );
      await page.getByRole("button", { name: "Reset" }).click();
      await expect(page.getByLabel("Safety stock (days)")).toHaveValue("14");
      await expect(page.locator("[data-alerts]")).toHaveText("3 of 4 on");
    });

    test("tanpa overflow horizontal dan menu mobile membuka halaman", async ({
      page,
    }) => {
      test.slow();
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 844 });
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          );
          expect(overflow, `${pageId} ${width}`).toBeLessThanOrEqual(0);
        }
      }

      await page.setViewportSize(MOBILE);
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Menu" });
      await expect(menu).toBeVisible();
      await menu.getByRole("button", { name: "Shipments" }).click();
      await expect(menu).toBeHidden();
      await expect(title(page)).toHaveText(pages.shipments);
      await warehouse(page, "Medan").click();
      await expect(page.locator("[data-open]")).toHaveText(
        "4 open orders from Medan",
      );
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Shipments" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
