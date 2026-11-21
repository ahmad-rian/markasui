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

const SLUG = "sigap";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const WIDTHS = [360, 390, 768, 1280];

/** Label navigasi dan judul h1 tiap halaman. */
const pages = {
  overview: "Overview",
  employees: "Employees",
  attendance: "Attendance",
  leave: "Leave",
  payroll: "Payroll",
  recruitment: "Recruitment",
  settings: "Settings",
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";

const title = (page: Page) => page.locator("#sigap-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const sidebar = (page: Page) => page.getByRole("navigation", { name: "Main" });

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

  for (const pageId of ["overview", "payroll"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["overview", "leave"] as const) {
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
        // Semua halaman ditambah drawer detail, modal tambah, dan popover notifikasi.
        test.setTimeout(templateAxeTimeout(pageIds.length + 3));
        await openTemplate(page, framework, "overview", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
        await page.getByRole("button", { name: /^Notifications/ }).click();
        await expect(page.getByText("Mark all read")).toBeVisible();
        await expectNoAxeViolations(page, `popover ${theme}`);
        await page.keyboard.press("Escape");

        await switchTo(page, "employees");
        await page.getByRole("button", { name: "View Agus Setiawan" }).click();
        await expect(
          page.getByRole("dialog", { name: "Employee details" }),
        ).toBeVisible();
        await expectNoAxeViolations(page, `drawer ${theme}`);
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: "Add employee" }).click();
        const modal = page.getByRole("dialog", { name: "Add employee" });
        await modal.getByRole("button", { name: "Save employee" }).click();
        await expect(modal.getByText("Enter a valid work email")).toBeVisible();
        await expectNoAxeViolations(page, `modal ${theme}`);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(
        page.getByRole("button", { name: "Approve Rizky Pratama" }),
      ).toHaveCSS("background-color", BLUE);
      await expectNoAxeViolations(page, "overview blue");
      await switchTo(page, "leave");
      await expect(page.locator("[data-day='20'] span").nth(1)).toHaveCSS(
        "background-color",
        BLUE,
      );
      await expectNoAxeViolations(page, "leave blue");
    });

    test("setiap item navigasi membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework);
      for (const id of [...pageIds.slice(1), "overview" as const]) {
        const button = sidebar(page).getByRole("button", { name: pages[id] });
        await button.click();
        await expect(title(page)).toHaveText(pages[id]);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
      }
      await page.goBack();
      await expect(title(page)).toHaveText(pages.settings);
    });

    test("topbar: pencarian, notifikasi, dan menu pengguna", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const bell = page.getByRole("button", { name: /^Notifications/ });
      await expect(bell).toHaveAccessibleName("Notifications, 3 unread");
      await bell.click();
      await expect(page.getByText("BPJS Ketenagakerjaan report")).toBeVisible();
      await page.getByRole("button", { name: "Mark all read" }).click();
      await expect(bell).toHaveAccessibleName("Notifications, 0 unread");
      await page.keyboard.press("Escape");

      await page.getByLabel("Search people").fill("nur");
      await page.getByLabel("Search people").press("Enter");
      await expect(title(page)).toHaveText(pages.employees);
      await expect(page.getByLabel("Search by name or ID")).toHaveValue("nur");
      await expect(page.locator("tr[data-employee]")).toHaveCount(1);
      await expect(page.locator("tr[data-employee]")).toContainText(
        "Siti Nurhaliza",
      );

      await page.getByRole("button", { name: "Dewi Anggraini" }).click();
      await page.getByRole("menuitem", { name: "Settings" }).click();
      await expect(title(page)).toHaveText(pages.settings);
      await page.getByRole("button", { name: "Dewi Anggraini" }).click();
      await page.getByRole("menuitem", { name: "Sign out" }).click();
      await expect(toastRegion(page)).toContainText("Signed out");
    });

    test("overview: rentang tren dan persetujuan cuti", async ({ page }) => {
      await openTemplate(page, framework);
      const average = page.locator("[data-average]");
      const bars = page.locator("[data-bars] > span");
      await expect(average).toHaveText("92.4%");
      await expect(bars).toHaveCount(14);
      await page
        .getByRole("group", { name: "Trend range" })
        .getByRole("button", { name: "7 days" })
        .click();
      await expect(average).toHaveText("92.0%");
      await expect(bars).toHaveCount(7);

      const waiting = page.locator("[data-waiting]");
      const count = sidebar(page).getByRole("button", { name: /^Leave/ });
      await expect(waiting).toHaveText("4 pending");
      await expect(count).toContainText("4");
      await page.getByRole("button", { name: "Approve Rizky Pratama" }).click();
      await expect(waiting).toHaveText("3 pending");
      await expect(count).toContainText("3");
      await expect(toastRegion(page)).toContainText("Leave approved");
      await expect(toastRegion(page)).toContainText(
        "Rizky Pratama, 23 to 25 Nov",
      );
      await expect(page.locator("li[data-request]")).toHaveCount(3);
      await page.getByRole("button", { name: "Open leave" }).click();
      await expect(title(page)).toHaveText(pages.leave);
      await expect(page.locator("[data-count=approved]")).toHaveText("3");
    });

    test("employees: filter, drawer detail, dan modal tambah", async ({
      page,
    }) => {
      await openTemplate(page, framework, "employees");
      const rows = page.locator("tr[data-employee]");
      await expect(rows).toHaveCount(10);
      await page
        .getByLabel("Department", { exact: true })
        .selectOption("Production");
      await expect(rows).toHaveCount(3);
      await page.getByLabel("Status", { exact: true }).selectOption("Contract");
      await expect(rows).toHaveCount(0);
      await expect(page.locator("[data-count]")).toHaveText(
        "No employees match these filters.",
      );
      await page.getByLabel("Department", { exact: true }).selectOption("all");
      await expect(rows).toHaveCount(3);
      await page.getByLabel("Search by name or ID").fill("sg-1146");
      await expect(rows).toHaveCount(1);

      await page.getByRole("button", { name: "View Fajar Nugroho" }).click();
      const drawer = page.getByRole("dialog", { name: "Employee details" });
      await expect(drawer).toBeVisible();
      await expect(drawer.locator("[data-field='Base salary']")).toHaveText(
        "Rp 5.400.000",
      );
      await expect(drawer.locator("[data-field='Email']")).toHaveText(
        "fajar.nugroho@sigapkarya.co.id",
      );
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();

      await page.getByLabel("Search by name or ID").fill("");
      await page.getByLabel("Status", { exact: true }).selectOption("all");
      await page.getByRole("button", { name: "Add employee" }).click();
      const modal = page.getByRole("dialog", { name: "Add employee" });
      await modal.getByRole("button", { name: "Save employee" }).click();
      await expect(
        modal.getByText("Enter the employee's full name"),
      ).toBeVisible();
      await expect(modal.getByText("Enter a valid work email")).toBeVisible();
      await expect(modal).toBeVisible();
      await modal.getByLabel("Full name").fill("Intan Permata");
      await modal.getByLabel("Work email").fill("intan@sigapkarya.co.id");
      await modal.getByLabel("Assign to department").selectOption("Retail");
      await modal.getByRole("button", { name: "Save employee" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText("Intan Permata, Retail");
      await expect(rows).toHaveCount(11);
      await expect(rows.first()).toContainText("Intan Permata");
      await expect(rows.first()).toContainText("SG-1167");

      await page.getByRole("button", { name: "Add employee" }).click();
      await expect(modal.getByLabel("Full name")).toHaveValue("");
      await modal.getByRole("button", { name: "Cancel" }).click();
      await page.getByRole("button", { name: "View Intan Permata" }).click();
      await drawer.getByRole("button", { name: "Open payroll" }).click();
      await expect(title(page)).toHaveText(pages.payroll);
    });

    test("attendance: tanggal, shift, badge terlambat, dan koreksi", async ({
      page,
    }) => {
      await openTemplate(page, framework, "attendance");
      const rows = page.locator("tr[data-row]");
      const late = page.locator("[data-tally=late]");
      const agus = page.locator("tr[data-row='SG-1057']");
      await expect(page.locator("[data-date]")).toHaveText("Fri, 20 Nov 2026");
      await expect(rows).toHaveCount(10);
      await expect(agus.locator("[data-status]")).toHaveText("Late");
      await expect(late).toHaveText("2");
      await expect(
        page.getByRole("button", { name: "Next day" }),
      ).toBeDisabled();

      await page.getByRole("button", { name: "Previous day" }).click();
      await expect(page.locator("[data-date]")).toHaveText("Thu, 19 Nov 2026");
      await expect(agus.locator("[data-status]")).toHaveText("On time");
      await page.getByRole("button", { name: "Next day" }).click();

      await page
        .getByRole("group", { name: "Filter by shift" })
        .getByRole("button", { name: "Morning" })
        .click();
      await expect(rows).toHaveCount(5);
      await expect(late).toHaveText("1");

      await page.getByRole("button", { name: "Correct Agus Setiawan" }).click();
      const modal = page.getByRole("dialog", { name: "Correct attendance" });
      await expect(modal.locator("[data-fix-who]")).toHaveText(
        "Agus Setiawan, Fri, 20 Nov 2026",
      );
      await expect(modal.getByLabel("Clock in")).toHaveValue("07:14");
      await modal.getByLabel("Clock in").fill("07:00");
      await modal.getByRole("button", { name: "Save correction" }).click();
      await expect(
        modal.getByText("Add a reason for the audit log"),
      ).toBeVisible();
      await modal.getByLabel("Reason").fill("Scanner offline at gate 2");
      await modal.getByRole("button", { name: "Save correction" }).click();
      await expect(modal).toBeHidden();
      await expect(agus.locator("[data-in]")).toHaveText("07:00");
      await expect(agus.locator("[data-status]")).toHaveText("On time");
      await expect(late).toHaveText("0");
      await expect(toastRegion(page)).toContainText("Attendance corrected");
    });

    test("leave: setujui dan tolak memperbarui hitungan, saldo, dan kalender", async ({
      page,
    }) => {
      await openTemplate(page, framework, "leave");
      const requests = page.locator("li[data-request]");
      const count = (status: string) => page.locator(`[data-count=${status}]`);
      await expect(requests).toHaveCount(4);
      await expect(page.locator("[data-balance=Annual]")).toContainText("742");
      await expect(page.locator("[data-day='24']")).not.toContainText("out");

      await page.getByRole("button", { name: "Approve Agus Setiawan" }).click();
      await expect(requests).toHaveCount(3);
      await expect(count("pending")).toHaveText("3");
      await expect(count("approved")).toHaveText("3");
      await expect(page.locator("[data-balance=Annual]")).toContainText("743");
      await expect(page.locator("[data-day='24']")).toContainText("1 out");
      await expect(toastRegion(page)).toContainText("Agus Setiawan, 24 Nov");

      await page
        .getByRole("button", { name: "Reject Maria Kristiani" })
        .click();
      await expect(count("rejected")).toHaveText("2");
      await expect(toastRegion(page)).toContainText("Leave rejected");
      await expect(
        sidebar(page).getByRole("button", { name: /^Leave/ }),
      ).toContainText("2");

      const filter = page.getByRole("group", { name: "Filter requests" });
      await filter.getByRole("button", { name: "Approved" }).click();
      await expect(requests).toHaveCount(3);
      await expect(requests.first()).toContainText("Agus Setiawan");
      await filter.getByRole("button", { name: "Rejected" }).click();
      await expect(requests).toHaveCount(2);
      await expect(requests.first()).toContainText("Rejected");
    });

    test("payroll: slip gaji dan proses payroll", async ({ page }) => {
      await openTemplate(page, framework, "payroll");
      const slip = page.locator("tbody[data-slip='SG-1042']");
      const toggle = page.getByRole("button", {
        name: "Payslip for Dewi Anggraini",
      });
      await expect(slip.locator("[data-net]")).toHaveText("Rp 15.044.000");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const lines = slip.locator("[data-lines]");
      await expect(lines).toContainText("Position allowance");
      await expect(lines).toContainText("Rp 1.450.000");
      await expect(lines).toContainText("- Rp 145.000");
      await toggle.click();
      await expect(lines).toHaveCount(0);

      const status = page.locator("[data-run-status]");
      const run = page.getByRole("button", { name: "Run payroll" });
      await expect(status).toHaveText("Draft");
      await run.click();
      const modal = page.getByRole("dialog", { name: "Run November payroll" });
      await expect(modal).toContainText("Rp 1.194.724.000");
      await modal.getByRole("button", { name: "Confirm and run" }).click();
      await expect(modal.getByText("Processing payslips")).toBeVisible();
      await expect(modal).toBeHidden();
      await expect(status).toHaveText("Paid");
      await expect(toastRegion(page)).toContainText("Payroll completed");
      await expect(run).toBeDisabled();
      await expect(
        page.getByRole("region", { name: "Contribution rates table" }),
      ).toContainText("Jaminan Hari Tua (JHT)");
    });

    test("recruitment: pindah tahap dengan tombol dan keyboard", async ({
      page,
    }) => {
      await openTemplate(page, framework, "recruitment");
      const stage = (name: string) =>
        page.locator(`[data-stage=${name}] [data-candidate]`);
      await expect(stage("Interview")).toHaveCount(2);
      await expect(stage("Offer")).toHaveCount(1);
      await page
        .getByRole("button", { name: "Move Dimas Prakoso to Offer" })
        .click();
      await expect(stage("Offer")).toHaveCount(2);
      await expect(stage("Interview")).toHaveCount(1);
      await expect(toastRegion(page)).toContainText("Moved to Offer");
      await expect(page.locator("[data-candidate=c5]")).toContainText(
        "moved today",
      );

      // Fokus tetap di kartu yang pindah, jadi Enter berikutnya memindahkannya lagi.
      const back = page.getByRole("button", {
        name: "Move Dimas Prakoso back to Interview",
      });
      await expect(back).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(stage("Interview")).toHaveCount(2);
      await expect(
        page.getByRole("button", {
          name: "Move Dimas Prakoso back to Screening",
        }),
      ).toBeFocused();
      await page
        .getByRole("button", { name: "Move Yoga Aditya to Screening" })
        .focus();
      await page.keyboard.press("Enter");
      await expect(stage("Applied")).toHaveCount(1);
      await expect(stage("Screening")).toHaveCount(3);
    });

    test("settings: validasi profil, hari kerja, dan kebijakan", async ({
      page,
    }) => {
      await openTemplate(page, framework, "settings");
      await page.getByLabel("NPWP").fill("01.234");
      await page.getByLabel("HR email").fill("hr");
      await page.getByRole("button", { name: "Save profile" }).click();
      await expect(page.getByText("NPWP must have 15 digits")).toBeVisible();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await page.getByLabel("NPWP").fill("09.876.543.2-431.000");
      await page.getByLabel("HR email").fill("people@sigapkarya.co.id");
      await page.getByRole("button", { name: "Save profile" }).click();
      await expect(page.getByText("NPWP must have 15 digits")).toHaveCount(0);
      await expect(toastRegion(page)).toContainText("Company profile saved");

      const days = page.getByRole("group", { name: "Work days" });
      const saturday = days.getByRole("button", { name: "Sat" });
      await expect(saturday).toHaveAttribute("aria-pressed", "true");
      await saturday.click();
      await expect(saturday).toHaveAttribute("aria-pressed", "false");
      await expect(page.locator("[data-workdays]")).toHaveText(
        "5 work days a week",
      );
      await page.getByLabel("Late tolerance").selectOption("15 minutes");
      await page.getByRole("button", { name: "Save schedule" }).click();
      await expect(toastRegion(page)).toContainText(
        "Mon, Tue, Wed, Thu, Fri. Late after 15 minutes, cutoff on the 25th.",
      );

      const selfie = page.getByRole("switch", { name: "Selfie verification" });
      await expect(selfie).not.toBeChecked();
      await selfie.check();
      await expect(page.locator("[data-enabled]")).toHaveText("4 of 4 on");
      await expect(toastRegion(page)).toContainText(
        "Selfie verification enabled",
      );
    });

    test("tanpa overflow horizontal dan menu mobile membuka halaman", async ({
      page,
    }) => {
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
      await menu.getByRole("button", { name: "Payroll" }).click();
      await expect(menu).toBeHidden();
      await expect(title(page)).toHaveText(pages.payroll);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        menu.getByRole("button", { name: "Payroll" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
}
