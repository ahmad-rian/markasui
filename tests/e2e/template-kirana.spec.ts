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

const SLUG = "kirana";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Label navigasi dan judul h1 tiap halaman. */
const pages = {
  home: { label: "Home", title: "Welcome back, Dimas" },
  summaries: { label: "Book Summaries", title: "Book Summaries" },
  founders: { label: "Founders", title: "Founders Network" },
  finance: { label: "Finance", title: "Finance Overview" },
  contacts: { label: "Contacts", title: "Customer Information" },
  growth: { label: "Growth", title: "Growth Metrics" },
  projects: { label: "Projects", title: "Active Projects" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const topNav: PageId[] = [
  "summaries",
  "founders",
  "finance",
  "contacts",
  "growth",
  "projects",
];
const railNav: PageId[] = [
  "home",
  "contacts",
  "founders",
  "summaries",
  "finance",
  "projects",
  "growth",
];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";

const title = (page: Page) => page.locator("#kirana-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "contacts",
  theme: Theme = "light",
) {
  await page.goto(
    `/template.html?t=${SLUG}&fw=${framework}&theme=${theme}#${pageId}`,
  );
  await page.locator("body[data-ready=true]").waitFor();
  await expect(title(page)).toHaveText(pages[pageId].title);
  await page.evaluate(() => document.fonts.ready);
}

/** Pindah halaman lewat hash tanpa memuat ulang, sama seperti tombol Back. */
async function switchTo(page: Page, pageId: PageId) {
  await page.evaluate((id) => (window.location.hash = id), pageId);
  await expect(title(page)).toHaveText(pages[pageId].title);
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

  for (const pageId of ["contacts", "finance"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["contacts", "summaries", "finance"] as const) {
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
        // Tujuh halaman dengan panel kaca semi transparan membuat cek kontras axe lebih lama.
        test.slow();
        await openTemplate(page, framework, "home", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(
        page
          .getByRole("navigation", { name: "Main" })
          .getByRole("button", { name: "Contacts" }),
      ).toHaveCSS("background-color", BLUE);
      await page
        .getByRole("button", { name: "Onboarding Implementation", exact: true })
        .click();
      await page
        .getByRole("dialog", { name: "Deal details" })
        .getByRole("button", { name: "Close" })
        .last()
        .click();
      await expect(page.locator("li[data-deal=d5]")).toHaveCSS(
        "box-shadow",
        new RegExp(BLUE.replace(/[()]/g, "\\$&")),
      );
      await expectNoAxeViolations(page, "contacts blue");
      await switchTo(page, "summaries");
      await expect(
        page.getByRole("button", { name: "All", exact: true }),
      ).toHaveCSS("background-color", BLUE);
      await expectNoAxeViolations(page, "summaries blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const main = page.getByRole("navigation", { name: "Main" });
      const rail = page.getByRole("navigation", { name: "Workspace" });
      const items = [
        ...topNav.map((id) => ({ nav: main, id })),
        ...railNav.map((id) => ({ nav: rail, id })),
      ];
      for (const { nav, id } of items) {
        const button = nav.getByRole("button", {
          name: pages[id].label,
          exact: true,
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[id].title);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
        await expect(
          page.getByText(`Kirana / ${pages[id].label}`),
        ).toBeVisible();
      }
      await expect(
        main.getByRole("button", { name: "Contacts" }),
      ).not.toHaveAttribute("aria-current", "page");

      await page.goBack();
      await expect(title(page)).toHaveText(pages.projects.title);
      await page.goBack();
      await expect(title(page)).toHaveText(pages.finance.title);

      await page.getByRole("button", { name: "Back to Home" }).click();
      await expect(title(page)).toHaveText(pages.home.title);
      await rail.getByRole("button", { name: "New contact" }).click();
      await expect(toastRegion(page)).toContainText("New contact");
    });

    test("contacts: kartu deal membuka drawer detail", async ({ page }) => {
      await openTemplate(page, framework);
      const card = page.getByRole("button", {
        name: "Customer Upgrade Opportunity",
        exact: true,
      });
      await card.click();
      const drawer = page.getByRole("dialog", { name: "Deal details" });
      await expect(drawer).toBeVisible();
      await expect(drawer).toContainText("Rp 4.160.000");
      await expect(drawer.locator("[data-stage]")).toHaveText("Qualified");
      await drawer.getByRole("button", { name: "Mark as won" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText("Deal marked as won");
      await expect(card).toHaveAttribute("aria-pressed", "true");

      await page
        .getByRole("button", {
          name: "Open Strategic Partnership Success Deal",
        })
        .click();
      await expect(drawer).toContainText("Rp 2.100.000");
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
    });

    test("contacts: menu panel mengurutkan riwayat dan funnel berganti", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const cards = page.locator("li[data-deal]");
      await expect(cards.first()).toHaveAttribute("data-deal", "d1");
      await page
        .getByRole("button", { name: "Interaction History options" })
        .click();
      await page.getByRole("menuitem", { name: "Highest value" }).click();
      await expect(cards.first()).toHaveAttribute("data-deal", "d2");
      await page
        .getByRole("button", { name: "Interaction History options" })
        .click();
      await page.getByRole("menuitem", { name: "Export history" }).click();
      await expect(toastRegion(page)).toContainText("History exported");

      const total = page.locator("[data-funnel-total]");
      await expect(total).toHaveText("Rp 350.500.000");
      await page.getByRole("button", { name: "Total", exact: true }).click();
      await expect(total).toHaveText("Rp 612.800.000");
      await expect(
        page.getByRole("button", { name: "Total", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByText("Rp 336.400.000")).toBeVisible();
      await page.getByRole("button", { name: "Stage Funnel options" }).click();
      await page.getByRole("menuitem", { name: "Show weighted" }).click();
      await expect(total).toHaveText("Rp 350.500.000");
    });

    test("contacts: kalender pindah bulan dan pilih tanggal", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const agenda = page.locator("[data-agenda]");
      await expect(agenda).toContainText("Renewal sign-off");
      await page.getByRole("button", { name: "Next month" }).click();
      await expect(
        page.getByRole("heading", { name: /November/ }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "November 5", exact: true })
        .click();
      await expect(agenda).toContainText("Nov 5: no tasks scheduled");
      await page.getByRole("button", { name: "Previous month" }).click();
      const day = page.getByRole("button", {
        name: "October 10, Proposal review",
      });
      await day.click();
      await expect(day).toHaveAttribute("aria-pressed", "true");
      await expect(agenda).toContainText(
        "Oct 10: Proposal review with Agus Pratama",
      );
      await page
        .getByRole("button", { name: "Tasks Schedule options" })
        .click();
      await page.getByRole("menuitem", { name: "Jump to today" }).click();
      await expect(agenda).toContainText("Oct 14");
    });

    test("contacts: aksi profil dan edit detail lewat drawer", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Send email" }).click();
      await expect(toastRegion(page)).toContainText("Send email");
      await page.getByRole("button", { name: "Add phone number" }).click();
      await expect(toastRegion(page)).toContainText("Add phone number");

      await page.getByRole("button", { name: "Edit details" }).click();
      const drawer = page.getByRole("dialog", { name: "Edit contact details" });
      await expect(drawer.getByLabel("First Name")).toHaveValue("Ratna");
      await drawer.getByLabel("First Name").fill("Ratih");
      await drawer.getByLabel("Email").fill("ratih@nusantaradigital.id");
      await drawer.getByRole("button", { name: "Save changes" }).click();
      await expect(drawer).toBeHidden();
      await expect(
        page.getByRole("heading", { name: "Ratih Kusuma" }),
      ).toBeVisible();
      await expect(page.getByText("ratih@nusantaradigital.id")).toBeVisible();
      await expect(toastRegion(page)).toContainText("Contact details saved");
    });

    test("home: centang tugas mengubah hitungan", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const panel = page.getByRole("region", { name: "Today's tasks" });
      await expect(panel).toContainText("2 of 5 done");
      await panel.getByLabel("Pipeline review with Budi").check();
      await expect(panel).toContainText("3 of 5 done");
    });

    test("summaries: filter topik dan tandai sudah dibaca", async ({
      page,
    }) => {
      await openTemplate(page, framework, "summaries");
      const books = page.locator("li[data-book]");
      await expect(books).toHaveCount(6);
      await page
        .getByRole("button", { name: "Leadership", exact: true })
        .click();
      await expect(books).toHaveCount(3);
      await page
        .getByRole("button", { name: "Mark as read: Radical Candor" })
        .click();
      await expect(page.getByText("2 of 6 read")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Read: Radical Candor" }),
      ).toHaveAttribute("aria-pressed", "true");
    });

    test("founders: pencarian dan permintaan intro", async ({ page }) => {
      await openTemplate(page, framework, "founders");
      await page.getByLabel("Search founders").fill("fintech");
      await expect(page.getByText("1 founder", { exact: true })).toBeVisible();
      await page
        .getByRole("button", { name: "Connect with Hendra Setiawan" })
        .click();
      await expect(toastRegion(page)).toContainText("Hendra Setiawan");
      await page.getByLabel("Search founders").fill("zzz");
      await expect(
        page.getByText("No founders match your search."),
      ).toBeVisible();
    });

    test("finance: sortir invoice dan kirim pengingat", async ({ page }) => {
      await openTemplate(page, framework, "finance");
      const rows = page.locator("tbody tr");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2041");
      const amount = page.getByRole("columnheader", { name: "Amount" });
      await amount.getByRole("button").click();
      await expect(amount).toHaveAttribute("aria-sort", "ascending");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2049");
      await amount.getByRole("button").click();
      await expect(amount).toHaveAttribute("aria-sort", "descending");
      await expect(rows.first()).toHaveAttribute("data-row", "INV-2041");
      await page.getByRole("button", { name: "Remind INV-2046" }).click();
      await expect(toastRegion(page)).toContainText(
        "INV-2046 to PT Lintas Jawa",
      );
      await expect(
        page.getByRole("button", { name: "Remind INV-2044" }),
      ).toHaveCount(0);
    });

    test("growth: tab periode mengganti metrik", async ({ page }) => {
      await openTemplate(page, framework, "growth");
      const panel = page.getByRole("tabpanel");
      await expect(panel).toContainText("1.284");
      await page.getByRole("tab", { name: "7 days" }).click();
      await expect(panel).toContainText("18.420");
      await page.getByRole("tab", { name: "90 days" }).click();
      await expect(panel).toContainText("3.702");
      await expect(
        panel.getByRole("img", { name: /New leads, 90 days: W1 640/ }),
      ).toBeVisible();
    });

    test("projects: filter status", async ({ page }) => {
      await openTemplate(page, framework, "projects");
      const rows = page.locator("li[data-project]");
      await expect(rows).toHaveCount(6);
      await page.getByRole("button", { name: "At risk", exact: true }).click();
      await expect(rows).toHaveCount(2);
      await expect(page.getByText("2 projects")).toBeVisible();
      await expect(rows.first()).toContainText("34%");
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
      await expect(title(page)).toHaveText(pages.finance.title);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Finance" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
