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

const SLUG = "pipeline";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** Label navigasi dan judul h1 tiap halaman. */
const pages = {
  workspace: { label: "Workspace", title: "Workspace" },
  leads: { label: "Leads", title: "Leads" },
  pipeline: { label: "Pipeline", title: "Pipeline" },
  calendar: { label: "Calendar", title: "Calendar" },
  messages: { label: "Messages", title: "Messages" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";

const title = (page: Page) => page.locator("#pipeline-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "workspace",
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

  for (const pageId of ["workspace", "pipeline"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["workspace", "leads"] as const) {
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
        // Semua halaman ditambah drawer detail.
        test.setTimeout(templateAxeTimeout(pageIds.length + 1));
        await openTemplate(page, framework, "workspace", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
        await switchTo(page, "workspace");
        await page.getByRole("button", { name: "Open Bagus Hartono" }).click();
        await expect(
          page.getByRole("dialog", { name: "Lead details" }),
        ).toBeVisible();
        await expectNoAxeViolations(page, `drawer ${theme}`);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const rail = page.getByRole("navigation", { name: "Workspace" });
      await expect(
        rail.getByRole("button", { name: "Workspace", exact: true }),
      ).toHaveCSS("background-color", BLUE);
      await expect(page.getByRole("button", { name: "New Task" })).toHaveCSS(
        "background-color",
        BLUE,
      );
      await expectNoAxeViolations(page, "workspace blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework);
      const rail = page.getByRole("navigation", { name: "Workspace" });
      for (const id of [...pageIds.slice(1), "workspace" as const]) {
        const button = rail.getByRole("button", {
          name: pages[id].label,
          exact: true,
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[id].title);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
        await expect(
          page.getByText(`Pipeline / ${pages[id].label}`),
        ).toBeVisible();
      }
      await page.goBack();
      await expect(title(page)).toHaveText(pages.messages.title);
      await rail.getByRole("button", { name: "Settings" }).click();
      await expect(toastRegion(page)).toContainText("Settings");
    });

    test("workspace: chip menyaring lead dan kartu membuka drawer", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const cards = page.locator("li[data-lead]");
      await expect(cards).toHaveCount(3);
      const group = page.getByRole("group", {
        name: "Filter leads by interest",
      });
      await group.getByRole("button", { name: "Hot Client" }).click();
      await expect(cards).toHaveCount(2);
      await expect(cards.nth(1)).toContainText("Sinta Maharani");
      await group.getByRole("button", { name: "Non interest" }).click();
      await expect(cards).toHaveCount(1);
      await page
        .getByRole("button", { name: "Hendra Gunawan", exact: true })
        .click();
      const drawer = page.getByRole("dialog", { name: "Lead details" });
      await expect(drawer).toBeVisible();
      await expect(drawer.locator("[data-field='Deal value']")).toHaveText(
        "Rp 12.000.000",
      );
      await drawer.getByRole("button", { name: "Schedule call" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText("Hendra Gunawan");

      await group.getByRole("button", { name: "All", exact: true }).click();
      await page.getByRole("button", { name: "Search leads" }).click();
      await page.getByLabel("Search by name").fill("wulan");
      await expect(cards).toHaveCount(1);
      await page.getByRole("button", { name: "Open Wulan Sari" }).click();
      await expect(drawer).toContainText("Lumbung Data");
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
    });

    test("workspace: filter tugas dan ubah status lewat menu", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const tasks = page.locator("li[data-task]:visible");
      await expect(tasks).toHaveCount(5);
      const group = page.getByRole("group", { name: "Filter tasks" });
      await group.getByRole("button", { name: "Overdue" }).click();
      await expect(tasks).toHaveCount(1);
      await expect(tasks.first()).toContainText("Follow-up Email");
      await group.getByRole("button", { name: "Completed" }).click();
      await expect(tasks).toHaveCount(1);
      await group.getByRole("button", { name: "All", exact: true }).click();

      await page
        .getByRole("button", { name: "Send Proposal status: Waiting Proposal" })
        .click();
      await page.getByRole("menuitem", { name: "Done" }).click();
      await expect(toastRegion(page)).toContainText("Send Proposal: Done");
      await expect(page.locator("li[data-task=t2] [data-status]")).toHaveText(
        "Done",
      );
      await group.getByRole("button", { name: "Completed" }).click();
      await expect(tasks).toHaveCount(2);
    });

    test("workspace: tombol video dan timeline jadwal mengatur panel call", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const call = page.locator("[data-call]");
      await expect(call).toContainText("Video Call");
      const video = page.getByRole("button", {
        name: "Video call with Bagus Hartono",
        exact: true,
      });
      await expect(video).toHaveAttribute("aria-pressed", "true");
      await video.click();
      await expect(call).toHaveCount(0);
      await expect(page.locator("[data-call-closed]")).toBeVisible();
      await video.click();
      await expect(call).toBeVisible();

      await page
        .getByRole("button", {
          name: /3:00 pm.*Contract Review with Sinta Maharani/,
        })
        .click();
      await expect(call).toContainText("Sinta Maharani");
      await expect(
        page.getByRole("button", {
          name: /3:00 pm.*Contract Review with Sinta Maharani/,
        }),
      ).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("button", { name: "Microphone" }).click();
      await expect(
        page.getByRole("button", { name: "Microphone" }),
      ).toHaveAttribute("aria-pressed", "false");
      await page.getByRole("button", { name: "End call" }).click();
      await expect(toastRegion(page)).toContainText("Call ended");
      await page.getByRole("button", { name: "Join Contract Review" }).click();
      await expect(call).toBeVisible();
    });

    test("leads: pencarian dan filter", async ({ page }) => {
      await openTemplate(page, framework, "leads");
      const cards = page.locator("li[data-lead]");
      await expect(cards).toHaveCount(8);
      await page.getByLabel("Search leads").fill("studio");
      await expect(cards).toHaveCount(1);
      await expect(page.getByRole("heading", { name: "1 lead" })).toBeVisible();
      await page.getByLabel("Search leads").fill("");
      await page.getByRole("button", { name: "Medium", exact: true }).click();
      await expect(cards).toHaveCount(2);
    });

    test("pipeline: pindah tahap deal", async ({ page }) => {
      await openTemplate(page, framework, "pipeline");
      const won = page.locator("[data-stage=Won]");
      await expect(won.locator("[data-deal]")).toHaveCount(1);
      await page
        .getByRole("button", { name: "Move Sinar Retail to Won" })
        .click();
      await expect(won.locator("[data-deal]")).toHaveCount(2);
      await expect(won).toContainText("Rp 149.000.000");
      await expect(toastRegion(page)).toContainText("Moved to Won");
    });

    test("calendar: pilih hari mengganti agenda", async ({ page }) => {
      await openTemplate(page, framework, "calendar");
      const agenda = page.locator("[data-agenda]:visible");
      await expect(agenda).toContainText("Discovery Call");
      await page.getByRole("button", { name: /Wed/ }).click();
      await expect(agenda).toHaveText("No meetings on this day.");
      await page.getByRole("button", { name: /Thu/ }).click();
      await expect(agenda).toContainText("Onboarding Kickoff");
      await page.getByRole("button", { name: "Add meeting" }).click();
      await expect(toastRegion(page)).toContainText("Thu, 12 Nov");
    });

    test("messages: pilih percakapan dan kirim pesan", async ({ page }) => {
      await openTemplate(page, framework, "messages");
      await page
        .getByRole("list", { name: "Conversations" })
        .getByRole("button", { name: /Rina Wijaya/ })
        .click();
      const thread = page.locator("[data-thread]");
      await expect(thread).toContainText("training cost");
      await page
        .getByLabel("Message", { exact: true })
        .fill("Proposal goes out today.");
      await page.getByRole("button", { name: "Send", exact: true }).click();
      await expect(thread).toContainText("Proposal goes out today.");
      await expect(page.getByLabel("Message", { exact: true })).toHaveValue("");
      await expect(toastRegion(page)).toContainText("Message sent");
    });

    test("mobile tanpa overflow horizontal dan menu membuka halaman", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
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
      await menu.getByRole("button", { name: "Pipeline" }).click();
      await expect(menu).toBeHidden();
      await expect(title(page)).toHaveText(pages.pipeline.title);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Pipeline" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
