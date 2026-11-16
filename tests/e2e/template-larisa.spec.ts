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

const SLUG = "larisa";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;
const pages = {
  overview: "Business overview",
  analytics: "Analytics",
  customers: "Customers",
  integrations: "Integrations",
  messages: "Messages",
  reviews: "Reviews",
  help: "Help center",
} as const;
type PageKey = keyof typeof pages;
const pageKeys = Object.keys(pages) as PageKey[];
const MOBILE_PARITY_PAGES: PageKey[] = ["overview", "customers", "messages"];

async function openTemplate(
  page: Page,
  framework: Framework,
  target: PageKey = "overview",
  theme: Theme = "light",
) {
  await page.goto(
    `/template.html?t=${SLUG}&fw=${framework}&theme=${theme}#${target}`,
  );
  await page.locator("body[data-ready=true]").waitFor();
  await expect(
    page.getByRole("heading", { level: 1, name: pages[target] }),
  ).toBeVisible();
}

const capture = async (page: Page) =>
  PNG.sync.read(
    await page.screenshot({ animations: "disabled", caret: "hide" }),
  );

async function expectSameAsReact(
  page: Page,
  testInfo: TestInfo,
  target: PageKey,
) {
  await openTemplate(page, "react", target);
  const reference = await capture(page);
  for (const framework of templateParityFrameworks(SLUG)) {
    await openTemplate(page, framework, target);
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
      { threshold: 0.1 },
    );
    const ratio = changed / (reference.width * reference.height);
    if (ratio > MAX_DIFF_RATIO) {
      await testInfo.attach(`${target}-${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    }
    expect(
      ratio,
      `selisih piksel ${target} ${framework} vs react`,
    ).toBeLessThanOrEqual(MAX_DIFF_RATIO);
  }
}

const notifications = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const sellerNames = (page: Page) =>
  page
    .getByRole("region", { name: "Best sellers" })
    .locator("tbody tr:visible td:first-child span.whitespace-nowrap")
    .allInnerTexts();
const customerNames = (page: Page) =>
  page
    .getByRole("region", { name: "Customers" })
    .locator("tbody tr:visible td:first-child .grid > span.font-medium")
    .allInnerTexts();

test.describe("kesamaan tampilan", () => {
  test.describe.configure({ timeout: templateParityTimeout(SLUG) });

  for (const target of pageKeys) {
    test(`desktop ${target}: Blade dan Vue sama dengan React`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(viewports.desktop);
      await expectSameAsReact(page, testInfo, target);
    });
  }
  for (const target of MOBILE_PARITY_PAGES) {
    test(`mobile ${target}: Blade dan Vue sama dengan React`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(viewports.mobile);
      await expectSameAsReact(page, testInfo, target);
    });
  }
});

for (const framework of templateFrameworks(SLUG)) {
  test(`${framework}: tanpa overflow horizontal di 390px`, async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    for (const target of pageKeys) {
      await openTemplate(page, framework, target);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `overflow halaman ${target}`).toBeLessThanOrEqual(0);
    }
  });

  for (const theme of themes) {
    test(`${framework} (${theme}): setiap halaman lolos axe-core`, async ({
      page,
    }) => {
      test.setTimeout(templateAxeTimeout(pageKeys.length));
      await page.setViewportSize(viewports.desktop);
      for (const target of pageKeys) {
        await openTemplate(page, framework, target, theme);
        const { violations } = await new AxeBuilder({ page })
          .withTags(WCAG_TAGS)
          .analyze();
        expect(
          violations.map(
            (v) =>
              `${target} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
          ),
        ).toEqual([]);
      }
    });
  }

  test.describe(`${framework} navigasi`, () => {
    test.use({ viewport: viewports.desktop });

    test("setiap item sidebar membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      const sidebar = page.locator("aside");
      for (const target of pageKeys) {
        const title = pages[target];
        const scope = target === "help" ? sidebar : nav;
        const item = scope.getByRole("button", { name: title });
        await item.click();
        const heading = page.getByRole("heading", { level: 1, name: title });
        await expect(heading).toBeVisible();
        await expect(heading).toBeFocused();
        await expect(item).toHaveAttribute("aria-current", "page");
        await expect(
          page.getByRole("navigation", { name: "Breadcrumb" }),
        ).toContainText(title);
        expect(new URL(page.url()).hash).toBe(`#${target}`);
        await expect(sidebar.locator("[aria-current=page]")).toHaveCount(1);
      }
    });

    test("tombol Back browser kembali ke halaman sebelumnya", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      await nav.getByRole("button", { name: "Analytics" }).click();
      await nav.getByRole("button", { name: "Reviews" }).click();
      await expect(
        page.getByRole("heading", { level: 1, name: "Reviews" }),
      ).toBeVisible();
      await page.goBack();
      await expect(
        page.getByRole("heading", { level: 1, name: "Analytics" }),
      ).toBeVisible();
      await expect(
        nav.getByRole("button", { name: "Analytics" }),
      ).toHaveAttribute("aria-current", "page");
    });

    test("hash URL membuka halaman yang sesuai saat dimuat", async ({
      page,
    }) => {
      await openTemplate(page, framework, "integrations");
      await expect(
        page
          .getByRole("navigation", { name: "Main navigation" })
          .getByRole("button", { name: "Integrations" }),
      ).toHaveAttribute("aria-current", "page");
    });

    test("Log out meminta konfirmasi lewat Alert Dialog", async ({ page }) => {
      await openTemplate(page, framework);
      const logout = page.locator("aside").getByRole("button", {
        name: "Log out",
      });
      await logout.click();
      const dialog = page.getByRole("alertdialog", {
        name: "Log out of Larisa?",
      });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Cancel" }).click();
      await expect(dialog).toBeHidden();
      await expect(notifications(page).getByText("Signed out")).toHaveCount(0);
      await logout.click();
      await dialog.getByRole("button", { name: "Log out" }).click();
      await expect(dialog).toBeHidden();
      await expect(notifications(page).getByText("Signed out")).toBeVisible();
    });
  });

  test(`${framework}: menu mobile membuka setiap halaman`, async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await openTemplate(page, framework);
    const drawer = page.getByRole("dialog", { name: "Menu" });
    for (const target of ["analytics", "help"] as const) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(drawer).toBeVisible();
      await drawer.getByRole("button", { name: pages[target] }).click();
      await expect(drawer).toBeHidden();
      await expect(
        page.getByRole("heading", { level: 1, name: pages[target] }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        drawer.getByRole("button", { name: pages[target] }),
      ).toHaveAttribute("aria-current", "page");
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
    }
  });

  test.describe(`${framework} overview`, () => {
    test.use({ viewport: viewports.desktop });

    test.beforeEach(async ({ page }) => {
      await openTemplate(page, framework);
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
      await expect(
        notifications(page).getByText("Report exported"),
      ).toBeVisible();
      await expect(
        notifications(page).getByText("Monthly sales report saved as CSV."),
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
        notifications(page).getByText("Filters applied"),
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

    test("urutan tabel tetap setelah pindah halaman dan kembali", async ({
      page,
    }) => {
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      await page
        .getByRole("region", { name: "Best sellers" })
        .getByRole("button", { name: "Seller" })
        .click();
      await nav.getByRole("button", { name: "Analytics" }).click();
      await nav.getByRole("button", { name: "Business overview" }).click();
      expect((await sellerNames(page))[0]).toBe("Agus Wijaya");
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

  test.describe(`${framework} halaman lain`, () => {
    test.use({ viewport: viewports.desktop });

    test("Analytics: filter periode mengganti metrik dan grafik", async ({
      page,
    }) => {
      await openTemplate(page, framework, "analytics");
      const period = page.getByRole("group", { name: "Period" });
      await expect(
        period.getByRole("button", { name: "30 days" }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByText("152,400").first()).toBeVisible();
      await period.getByRole("button", { name: "7 days" }).click();
      await expect(
        period.getByRole("button", { name: "7 days" }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByText("37,760").first()).toBeVisible();
      await expect(page.getByText("Revenue in the last 7 days")).toBeVisible();
      await expect(page.getByText("1,284 (3.4%)")).toBeVisible();
      await expect(
        page.getByRole("img", { name: /Revenue in the last 7 days/ }),
      ).toBeVisible();
      await period.getByRole("button", { name: "7 days" }).click();
      await expect(
        period.getByRole("button", { name: "7 days" }),
      ).toHaveAttribute("aria-pressed", "true");
      await period.getByRole("button", { name: "12 months" }).click();
      await expect(page.getByText("Rp 6.83B")).toBeVisible();
    });

    test("Customers: segmen, pencarian, dan Drawer detail", async ({
      page,
    }) => {
      await openTemplate(page, framework, "customers");
      await expect.poll(() => customerNames(page)).toHaveLength(6);
      await page
        .getByRole("group", { name: "Segment" })
        .getByRole("button", { name: "VIP" })
        .click();
      await expect
        .poll(() => customerNames(page))
        .toEqual(["Dewi Lestari", "Maya Sari"]);
      await expect(page.getByText("Showing 2 of 6 customers")).toBeVisible();
      await page
        .getByRole("searchbox", { name: "Search customers" })
        .fill("jakarta");
      await expect.poll(() => customerNames(page)).toEqual(["Maya Sari"]);
      await page.getByRole("button", { name: "View Maya Sari" }).click();
      const drawer = page.getByRole("dialog", { name: "Customer details" });
      await expect(drawer).toBeVisible();
      await expect(drawer.getByText("maya.sari@mail.id")).toBeVisible();
      await expect(drawer.getByText("Rp 15.7M")).toBeVisible();
      await drawer.getByRole("button", { name: "Send message" }).click();
      await expect(
        page.getByRole("heading", { level: 1, name: "Messages" }),
      ).toBeVisible();
    });

    test("Customers: Export dan keadaan kosong", async ({ page }) => {
      await openTemplate(page, framework, "customers");
      await page
        .getByRole("searchbox", { name: "Search customers" })
        .fill("zzz");
      await expect(
        page.getByText("No customers match your search."),
      ).toBeVisible();
      await page.getByRole("button", { name: "Export" }).click();
      await expect(
        notifications(page).getByText("0 customers saved as CSV."),
      ).toBeVisible();
    });

    test("Integrations: Switch, Toast, dan filter kategori", async ({
      page,
    }) => {
      await openTemplate(page, framework, "integrations");
      await expect(page.getByText("4 of 8 active")).toBeVisible();
      const gudangku = page.getByRole("switch", { name: "Enable Gudangku" });
      await expect(gudangku).not.toBeChecked();
      await gudangku.click();
      await expect(gudangku).toBeChecked();
      await expect(
        notifications(page).getByText("Gudangku connected"),
      ).toBeVisible();
      await expect(page.getByText("5 of 8 active")).toBeVisible();
      await page
        .getByRole("group", { name: "Category" })
        .getByRole("button", { name: "Shipping" })
        .click();
      await expect(
        page.getByRole("heading", { level: 2, name: "Kirimaja" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 2, name: "Bayarin" }),
      ).toBeHidden();
      await page.getByRole("switch", { name: "Enable Kirimaja" }).click();
      await expect(
        notifications(page).getByText("Kirimaja disconnected"),
      ).toBeVisible();
      await expect(page.getByText("4 of 8 active")).toBeVisible();
    });

    test("Messages: pilih percakapan dan kirim balasan", async ({ page }) => {
      await openTemplate(page, framework, "messages");
      const hendra = page.getByRole("button", { name: /Hendra Gunawan/ });
      await expect(hendra).toContainText("1 unread", { useInnerText: true });
      await hendra.click();
      await expect(hendra).toHaveAttribute("aria-current", "true");
      await expect(hendra).not.toContainText("unread", { useInnerText: true });
      const log = page.getByRole("log", {
        name: "Conversation with Hendra Gunawan",
      });
      await expect(log).toContainText("Can I swap it for L?");
      await page.getByRole("button", { name: "Send" }).click();
      await expect(
        notifications(page).getByText("Write a message first"),
      ).toBeVisible();
      await page
        .getByRole("textbox", { name: "Reply to Hendra Gunawan" })
        .fill("Sure, we will send size L tomorrow.");
      await page.getByRole("button", { name: "Send" }).click();
      await expect(log).toContainText("Sure, we will send size L tomorrow.");
      await expect(hendra).toContainText("Sure, we will send size L tomorrow.");
      await expect(notifications(page).getByText("Reply sent")).toBeVisible();
    });

    test("Messages: tandai semua sudah dibaca", async ({ page }) => {
      await openTemplate(page, framework, "messages");
      await page.getByRole("button", { name: "Mark all as read" }).click();
      await expect(
        page.getByText(/unread$/).filter({ visible: true }),
      ).toHaveCount(0);
      await expect(
        notifications(page).getByText("All messages marked as read"),
      ).toBeVisible();
    });

    test("Reviews: filter bintang dan balas lewat Modal", async ({ page }) => {
      await openTemplate(page, framework, "reviews");
      const filter = page.getByRole("group", { name: "Filter by rating" });
      await filter.getByRole("button", { name: "3 or less" }).click();
      await expect(page.getByText("Fajar Nugroho")).toBeVisible();
      await expect(page.getByText("Maya Sari")).toBeHidden();
      await filter.getByRole("button", { name: "All" }).click();
      await page.getByRole("button", { name: "Reply to Maya Sari" }).click();
      const modal = page.getByRole("dialog", { name: "Reply to review" });
      await expect(modal).toBeVisible();
      await expect(modal).toContainText("My skin looks brighter");
      await modal
        .getByLabel("Your reply")
        .fill("Thank you, Maya! Glad you love it.");
      await modal.getByRole("button", { name: "Post reply" }).click();
      await expect(modal).toBeHidden();
      await expect(notifications(page).getByText("Reply posted")).toBeVisible();
      await expect(
        page
          .getByRole("article", { name: "Latest reviews" })
          .getByText("Thank you, Maya! Glad you love it."),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Reply to Maya Sari" }),
      ).toBeHidden();
    });

    test("Help center: pencarian menyaring Accordion", async ({ page }) => {
      await openTemplate(page, framework, "help");
      await expect(page.getByText("Showing 6 of 6 articles")).toBeVisible();
      const search = page.getByRole("searchbox", {
        name: "Search help articles",
      });
      await search.fill("refund");
      await expect(page.getByText("Showing 1 of 6 articles")).toBeVisible();
      const question = page.getByText("How do refunds work?");
      await expect(question).toBeVisible();
      await expect(
        page.getByText("When do I receive my payouts?"),
      ).toBeHidden();
      await question.click();
      await expect(
        page.getByText("The buyer gets their money back"),
      ).toBeVisible();
      await search.fill("zzz");
      await expect(
        page.getByText("No articles match your search."),
      ).toBeVisible();
      await page.getByRole("button", { name: "Start a chat" }).click();
      await expect(notifications(page).getByText("Chat started")).toBeVisible();
    });
  });
}
