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

const SLUG = "alur";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Judul h1 dan label navigasi tiap halaman, urut seperti sidebar. */
const pages = {
  home: { title: "Good morning, Andi", label: "Home" },
  workflows: { title: "My Workflows", label: "My Workflows" },
  templates: { title: "Templates", label: "Templates" },
  tools: { title: "Tools", label: "Tools" },
  knowledge: { title: "Knowledge Base", label: "Knowledge Base" },
  marketplace: { title: "Marketplace", label: "Marketplace" },
  notifications: { title: "Notifications", label: "Notifications" },
  trash: { title: "Trash", label: "Trash" },
  settings: { title: "Settings", label: "Settings" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const title = (page: Page) => page.locator("#alur-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const sidebar = (page: Page) => page.locator("aside");
const mainNav = (page: Page) =>
  sidebar(page).getByRole("navigation", { name: "Main" });
const cards = (page: Page) => page.locator("li[data-workflow]");

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "workflows",
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

/** Pilih item dari DropdownMenu yang tombolnya cocok dengan nama. */
async function choose(page: Page, trigger: string | RegExp, item: string) {
  await page.getByRole("button", { name: trigger }).click();
  await page.getByRole("menuitem", { name: item, exact: true }).click();
}

test.describe("kesamaan tampilan", () => {
  test.describe.configure({ timeout: templateParityTimeout(SLUG) });

  for (const pageId of pageIds) {
    test(`desktop light ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "light");
    });
  }

  for (const pageId of ["workflows", "home"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["workflows", "templates"] as const) {
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
        test.setTimeout(templateAxeTimeout(pageIds.length));
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
      await expect(
        mainNav(page).getByRole("button", { name: "My Workflows" }),
      ).toHaveCSS("background-color", "rgb(219, 234, 254)");
      await expect(
        page.getByRole("button", { name: "New workflow" }),
      ).toHaveCSS("background-color", "rgb(29, 78, 216)");
      await expectNoAxeViolations(page, "workflows blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const nav = mainNav(page);
      for (const id of pageIds) {
        if (id === "trash" || id === "settings") {
          const more = nav.locator("details");
          if (!(await more.evaluate((el) => (el as HTMLDetailsElement).open)))
            await nav.getByText("More", { exact: true }).click();
        }
        const button = nav.getByRole("button", {
          name: new RegExp(`^${pages[id].label}`),
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[id].title);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
      }
      await expect(
        nav.getByRole("button", { name: "Home" }),
      ).not.toHaveAttribute("aria-current", "page");
      await page.goBack();
      await expect(title(page)).toHaveText(pages.trash.title);
      await page.goBack();
      await expect(title(page)).toHaveText(pages.notifications.title);
    });

    test("workflows: filter pill dan pencarian menyaring kartu", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await expect(cards(page)).toHaveCount(7);
      await choose(page, /^Status:/, "Paused");
      await expect(cards(page)).toHaveCount(2);
      await expect(page.getByRole("button", { name: /^Status:/ })).toHaveText(
        /Paused/,
      );
      await choose(page, /^Tags:/, "Finance");
      await expect(cards(page)).toHaveCount(1);
      await expect(cards(page).first()).toHaveAttribute("data-workflow", "w3");
      await choose(page, /^Status:/, "All");
      await choose(page, /^Tags:/, "All");
      await choose(page, /^Date:/, "Last 7 days");
      await expect(cards(page)).toHaveCount(4);
      await choose(page, /^Integrations:/, "Calendar");
      await expect(cards(page)).toHaveCount(2);
      await choose(page, /^Date:/, "Any");
      await choose(page, /^Integrations:/, "Any");

      const search = page.getByRole("searchbox", {
        name: "Search folders and workflows",
      });
      await search.fill("track");
      await expect(cards(page)).toHaveCount(3);
      await expect(
        page.getByText("No folders match your search."),
      ).toBeVisible();
      await search.fill("bill");
      await expect(page.locator("li[data-folder]")).toHaveCount(1);
      await search.fill("zzz");
      await expect(
        page.getByText("No workflows match your search or filters."),
      ).toBeVisible();
      await page.getByRole("button", { name: "Clear filters" }).click();
      await expect(cards(page)).toHaveCount(7);
      await expect(search).toHaveValue("");

      await page.keyboard.press("Control+f");
      await expect(search).toBeFocused();
    });

    test("workflows: menu kartu rename, duplicate, dan delete", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await choose(page, "Options for Email Responder", "Rename");
      const rename = page.getByRole("dialog", { name: "Rename" });
      await expect(rename.getByLabel("Name")).toHaveValue("Email Responder");
      await rename.getByLabel("Name").fill("Inbox Helper");
      await rename.getByRole("button", { name: "Save" }).click();
      await expect(rename).toBeHidden();
      await expect(cards(page).first()).toContainText("Inbox Helper");
      await expect(toastRegion(page)).toContainText("Renamed");
      await expect(
        sidebar(page).getByRole("button", { name: "Inbox Helper" }),
      ).toBeVisible();

      await choose(page, "Options for Budgeting", "Duplicate");
      await expect(cards(page)).toHaveCount(8);
      await expect(cards(page).nth(3)).toContainText("Budgeting copy");
      await expect(toastRegion(page)).toContainText("Workflow duplicated");

      await choose(page, "Options for Idea Vault", "Delete");
      const confirm = page.getByRole("alertdialog", {
        name: "Delete this item?",
      });
      await expect(confirm).toContainText("Idea Vault moves to Trash");
      await confirm.getByRole("button", { name: "Delete" }).click();
      await expect(cards(page)).toHaveCount(7);
      await expect(toastRegion(page)).toContainText("Moved to Trash");

      await choose(page, "Options for Task Automation", "Rename");
      await rename.getByLabel("Name").fill("Automations");
      await rename.getByRole("button", { name: "Save" }).click();
      await expect(page.locator("li[data-folder=f1]")).toContainText(
        "Automations",
      );

      await switchTo(page, "trash");
      await expect(page.locator("li[data-trash]")).toHaveCount(2);
      await page.getByRole("button", { name: "Restore Idea Vault" }).click();
      await expect(page.locator("li[data-trash]")).toHaveCount(1);
      await expect(toastRegion(page)).toContainText("Restored");
      await switchTo(page, "workflows");
      await expect(cards(page)).toHaveCount(8);
    });

    test("workflows: drawer detail, switch aktif, dan favorit", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("main")
        .getByRole("button", { name: "Budgeting", exact: true })
        .click();
      const drawer = page.getByRole("dialog", { name: "Workflow details" });
      await expect(drawer).toBeVisible();
      await expect(drawer).toContainText("Billing & Invoicing");
      const active = drawer.getByRole("switch", { name: "Active" });
      await expect(active).not.toBeChecked();
      await active.check();
      await expect(active).toBeChecked();
      await expect(toastRegion(page)).toContainText("Workflow activated");
      await drawer.getByRole("button", { name: "Run now" }).click();
      await expect(drawer).toContainText("9");
      await drawer.getByRole("button", { name: "Close" }).first().click();
      await expect(drawer).toBeHidden();
      await expect(page.locator("li[data-workflow=w3]")).toContainText(
        "3 days ago · Active",
      );
      await expect(page.getByText("Credits available 2.445")).toBeVisible();

      const favourites = sidebar(page);
      await page
        .getByRole("button", { name: "Favourite Habit Tracker" })
        .click();
      await expect(
        page.getByRole("button", { name: "Favourite Habit Tracker" }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        favourites.getByRole("button", { name: "Habit Tracker" }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Favourite Email Responder" })
        .click();
      await expect(
        favourites.getByRole("button", { name: "Email Responder" }),
      ).toHaveCount(0);

      await favourites
        .getByRole("button", { name: "Client Onboarding" })
        .click();
      await expect(drawer).toBeVisible();
      await expect(drawer).toContainText("Client Onboarding");
      await expect(drawer).toContainText("Mail, Calendar, Sheets, Chat");
    });

    test("workflows: tombol New workflow membuka form", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "New workflow" }).click();
      const modal = page.getByRole("dialog", { name: "New workflow" });
      await expect(modal).toBeVisible();
      await modal.getByLabel("Name").fill("Weekly Report");
      await modal.getByLabel("Status").selectOption("active");
      await modal.getByRole("button", { name: "Create workflow" }).click();
      await expect(modal).toBeHidden();
      await expect(cards(page)).toHaveCount(8);
      await expect(cards(page).first()).toContainText("Weekly Report");
      await expect(cards(page).first()).toContainText("Just now · Active");
      await expect(toastRegion(page)).toContainText("Workflow created");
    });

    test("sidebar bisa disembunyikan dan ditampilkan lagi", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Hide sidebar" }).click();
      await expect(mainNav(page)).toBeHidden();
      await page.getByRole("button", { name: "Show sidebar" }).click();
      await expect(mainNav(page)).toBeVisible();
    });

    test("home: filter riwayat run", async ({ page }) => {
      await openTemplate(page, framework, "home");
      const runs = page.locator("li[data-run]");
      await expect(runs).toHaveCount(6);
      await page.getByRole("button", { name: "Failed", exact: true }).click();
      await expect(runs).toHaveCount(2);
      await expect(page.getByText("2 runs")).toBeVisible();
      await page
        .getByRole("main")
        .getByRole("button", { name: "Email Responder" })
        .click();
      await expect(
        page.getByRole("dialog", { name: "Workflow details" }),
      ).toContainText("Email Responder");
    });

    test("templates: filter kategori dan pakai template", async ({ page }) => {
      await openTemplate(page, framework, "templates");
      const items = page.locator("li[data-template]");
      await expect(items).toHaveCount(6);
      await page.getByRole("button", { name: "Finance", exact: true }).click();
      await expect(items).toHaveCount(2);
      await page
        .getByRole("button", { name: "Use template Invoice Chaser" })
        .click();
      await expect(toastRegion(page)).toContainText(
        "Invoice Chaser is in My Workflows",
      );
      await switchTo(page, "workflows");
      await expect(cards(page)).toHaveCount(8);
      await expect(cards(page).first()).toContainText("Invoice Chaser");
    });

    test("tools: switch koneksi mengubah hitungan", async ({ page }) => {
      await openTemplate(page, framework, "tools");
      await expect(page.getByText("4 of 5 connected")).toBeVisible();
      await page.getByRole("switch", { name: "Calendar" }).check();
      await expect(page.getByText("5 of 5 connected")).toBeVisible();
      await page.getByRole("switch", { name: "Mail" }).uncheck();
      await expect(page.getByText("4 of 5 connected")).toBeVisible();
    });

    test("knowledge: pencarian artikel dan keadaan kosong", async ({
      page,
    }) => {
      await openTemplate(page, framework, "knowledge");
      const search = page.getByRole("searchbox", { name: "Search articles" });
      await search.fill("calendar");
      await expect(page.getByText("1 of 6 articles")).toBeVisible();
      await search.fill("zzz");
      await expect(
        page.getByText("No articles match your search."),
      ).toBeVisible();
    });

    test("marketplace: pasang dan lepas add-on", async ({ page }) => {
      await openTemplate(page, framework, "marketplace");
      await expect(page.getByText("1 installed")).toBeVisible();
      await page
        .getByRole("button", { name: "Install Invoice Parser" })
        .click();
      await expect(page.getByText("2 installed")).toBeVisible();
      await expect(toastRegion(page)).toContainText("Add-on installed");
      await page
        .getByRole("button", { name: "Installed Invoice Parser" })
        .click();
      await expect(page.getByText("1 installed")).toBeVisible();
    });

    test("notifications: tandai dibaca memperbarui badge sidebar", async ({
      page,
    }) => {
      await openTemplate(page, framework, "notifications");
      const inbox = page.getByRole("region", { name: "Inbox" });
      const navItem = mainNav(page).getByRole("button", {
        name: /^Notifications/,
      });
      await expect(navItem).toHaveAccessibleName(/4 unread$/);
      await page.getByRole("button", { name: /^Mark read.*Rina/ }).click();
      await expect(inbox.getByText("3 unread")).toBeVisible();
      await page.getByRole("button", { name: "Mark all as read" }).click();
      await expect(inbox.getByText("0 unread")).toBeVisible();
      await expect(navItem).toHaveAccessibleName("Notifications");
      await expect(page.locator("li[data-unread=true]")).toHaveCount(0);
    });

    test("settings: switch dan simpan memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework, "settings");
      await page.getByRole("switch", { name: "Weekly digest" }).check();
      await page.getByLabel("Workspace name").fill("Studio Alur");
      await page.getByRole("button", { name: "Save changes" }).click();
      await expect(toastRegion(page)).toContainText("Studio Alur, 3 alerts on");
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
      await menu.getByRole("button", { name: "Templates" }).click();
      await expect(menu).toBeHidden();
      await expect(title(page)).toHaveText(pages.templates.title);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Templates" }),
      ).toHaveAttribute("aria-current", "page");
      await menu.getByRole("button", { name: "Budgeting" }).click();
      await expect(
        page.getByRole("dialog", { name: "Workflow details" }),
      ).toContainText("Budgeting");
    });
  });
}
