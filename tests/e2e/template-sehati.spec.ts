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

const SLUG = "sehati";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const WIDTHS = [360, 390, 768, 1280];

/** Label navigasi bawah (mobile) dan judul h1 tiap halaman (juga nama tombol rail). */
const pages = {
  today: { label: "Today", title: "Today" },
  appointments: { label: "Agenda", title: "Appointments" },
  patients: { label: "Patients", title: "Patients" },
  doctors: { label: "Doctors", title: "Doctors" },
  pharmacy: { label: "Pharmacy", title: "Pharmacy" },
  billing: { label: "Billing", title: "Billing" },
  settings: { label: "Settings", title: "Settings" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";
const BLUE = "rgb(29, 78, 216)";
const BLUE_SOFT = "rgb(219, 234, 254)";

const title = (page: Page) => page.locator("#sehati-page-title");
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const rail = (page: Page) =>
  page.getByRole("navigation", { name: "Main", exact: true });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "today",
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
  await settle(page);
}

/** Tunggu transisi warna selesai supaya axe membaca warna akhir. */
async function settle(page: Page) {
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

  for (const pageId of ["today", "billing"] as const) {
    test(`desktop dark ${pageId}`, async ({ page }, testInfo) => {
      await page.setViewportSize(DESKTOP);
      await expectSameAsReact(page, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["today", "appointments", "pharmacy"] as const) {
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
        // Semua halaman ditambah drawer pasien, modal janji temu, dan modal tagihan.
        test.setTimeout(templateAxeTimeout(pageIds.length + 3));
        await openTemplate(page, framework, "today", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
        await switchTo(page, "patients");
        await page.getByRole("button", { name: "Budi Santoso" }).click();
        const drawer = page.getByRole("dialog", { name: "Patient record" });
        await expect(drawer).toBeVisible();
        await settle(page);
        await expectNoAxeViolations(page, `drawer ${theme}`);
        await drawer.getByRole("tab", { name: "Allergies" }).click();
        await expectNoAxeViolations(page, `drawer allergies ${theme}`);
        await page.keyboard.press("Escape");

        await switchTo(page, "appointments");
        await page.getByRole("button", { name: "New appointment" }).click();
        const modal = page.getByRole("dialog", { name: "New appointment" });
        await modal.getByRole("button", { name: "Book appointment" }).click();
        await expect(modal.getByText("Enter the patient name.")).toBeVisible();
        await settle(page);
        await expectNoAxeViolations(page, `modal ${theme}`);
        await page.keyboard.press("Escape");

        await switchTo(page, "billing");
        await page.getByRole("button", { name: "INV-1182" }).click();
        await expect(
          page.getByRole("dialog", { name: "Invoice INV-1182" }),
        ).toBeVisible();
        await settle(page);
        await expectNoAxeViolations(page, `invoice ${theme}`);
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      test.slow();
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      await expect(rail(page).getByRole("button", { name: "Today" })).toHaveCSS(
        "background-color",
        BLUE_SOFT,
      );
      await expect(
        page
          .locator("[data-room=d1]")
          .getByRole("button", { name: "Call next" }),
      ).toHaveCSS("background-color", BLUE);
      await settle(page);
      await expectNoAxeViolations(page, "today blue");
    });

    test("setiap item rail membuka halamannya", async ({ page }) => {
      await openTemplate(page, framework);
      for (const id of [...pageIds.slice(1), "today" as const]) {
        const button = rail(page).getByRole("button", {
          name: pages[id].title,
          exact: true,
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[id].title);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
        await expect(page.locator("main h2").first()).toBeVisible();
      }
      await page.goBack();
      await expect(title(page)).toHaveText(pages.settings.title);
    });

    test("navigasi bawah di mobile membuka setiap halaman", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      await expect(rail(page)).toBeHidden();
      const bar = page.getByRole("navigation", { name: "Main mobile" });
      for (const id of [...pageIds.slice(1), "today" as const]) {
        const button = bar.getByRole("button", { name: pages[id].label });
        await button.click();
        await expect(title(page)).toHaveText(pages[id].title);
        await expect(button).toHaveAttribute("aria-current", "page");
      }
    });

    test("tanpa overflow horizontal di semua lebar", async ({ page }) => {
      test.slow();
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 800 });
        await openTemplate(page, framework);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          const overflow = await page.evaluate(
            () =>
              document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
          );
          expect(overflow, `${pageId} ${width}px`).toBeLessThanOrEqual(0);
        }
      }
    });

    test("today: panggil berikutnya dan tandai selesai mengubah antrean", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const room = page.locator("[data-room=d1]");
      const stat = (label: string) => page.locator(`[data-stat="${label}"]`);
      const count = (label: string) => page.locator(`[data-count="${label}"]`);
      await expect(room.locator("[data-serving]")).toContainText("A-012");
      await expect(room.locator("[data-waiting]")).toHaveText("3 waiting");
      await expect(stat("Waiting")).toHaveText("6");
      await expect(count("Waiting")).toHaveText("6");
      await expect(page.locator("[data-next] li:visible")).toHaveCount(5);

      await room.getByRole("button", { name: "Call next" }).click();
      await expect(toastRegion(page)).toContainText("Calling A-013");
      await expect(toastRegion(page)).toContainText("Budi Santoso to Room 1");
      await expect(room.locator("[data-serving]")).toContainText("A-013");
      await expect(room.locator("[data-waiting]")).toHaveText("2 waiting");
      await expect(stat("Waiting")).toHaveText("5");
      await expect(stat("In consultation")).toHaveText("2");
      await expect(stat("Completed")).toHaveText("22");
      await expect(count("Done")).toHaveText("22");
      await expect(page.locator("[data-now=d1]")).toContainText("A-013");

      await room.getByRole("button", { name: "Mark done" }).click();
      await expect(toastRegion(page)).toContainText("Visit completed");
      await expect(room.locator("[data-serving]")).toHaveText("Room is free");
      await expect(
        room.getByRole("button", { name: "Mark done" }),
      ).toBeDisabled();
      await expect(stat("In consultation")).toHaveText("1");
      await expect(stat("Completed")).toHaveText("23");
      await expect(page.locator("[data-now=d1]")).toContainText("Free");

      // Ruang 3 kosong: panggil dua pasien sampai antreannya habis.
      const third = page.locator("[data-room=d3]");
      await expect(third.locator("[data-serving]")).toHaveText("Room is free");
      await third.getByRole("button", { name: "Call next" }).click();
      await expect(third.locator("[data-serving]")).toContainText("C-005");
      await third.getByRole("button", { name: "Call next" }).click();
      await expect(third.locator("[data-serving]")).toContainText("C-006");
      await expect(third.locator("[data-waiting]")).toHaveText("0 waiting");
      await expect(
        third.getByRole("button", { name: "Call next" }),
      ).toBeDisabled();
      await expect(page.locator("[data-now=d3]")).toContainText(
        "Rizky Ramadhan",
      );
      await expect(page.locator("[data-next] li:visible")).toHaveCount(3);

      // Antrean bertahan saat pindah halaman.
      await switchTo(page, "doctors");
      await expect(count("Waiting")).toHaveText("3");
      await switchTo(page, "today");
      await expect(room.locator("[data-serving]")).toHaveText("Room is free");

      await room.getByRole("button", { name: "Made Wirawan" }).click();
      await expect(
        page.getByRole("dialog", { name: "Patient record" }),
      ).toContainText("RM-00377");
    });

    test("appointments: validasi, pesan, jadwal ulang, batal, dan filter", async ({
      page,
    }) => {
      await openTemplate(page, framework, "appointments");
      const bookings = page.locator("[data-appointment]:visible");
      await expect(bookings).toHaveCount(11);
      await page.getByRole("button", { name: "New appointment" }).click();
      const modal = page.getByRole("dialog", { name: "New appointment" });
      await expect(modal).toBeVisible();
      await modal.getByRole("button", { name: "Book appointment" }).click();
      await expect(modal.getByText("Enter the patient name.")).toBeVisible();
      await expect(modal.getByLabel("Patient name")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      await modal.getByLabel("Patient name").fill("Wayan Sudarma");
      await modal.getByRole("button", { name: "Book appointment" }).click();
      await expect(modal.getByRole("alert")).toHaveText(
        "That slot is already booked for this doctor.",
      );
      await modal.getByLabel("Time").selectOption("09:00");
      await modal.getByRole("button", { name: "Book appointment" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText("Appointment booked");
      await expect(toastRegion(page)).toContainText("Wayan Sudarma, Thu 09:00");
      await expect(bookings).toHaveCount(12);
      await expect(page.locator("[data-slot='thu-09:00']")).toContainText(
        "Wayan Sudarma",
      );

      // Jadwal ulang ke Sabtu 15:00.
      await page.getByRole("button", { name: /^Wayan Sudarma/ }).click();
      const editor = page.getByRole("dialog", { name: "Edit appointment" });
      await expect(editor.getByLabel("Patient name")).toHaveValue(
        "Wayan Sudarma",
      );
      await expect(editor.getByLabel("Time")).toHaveValue("09:00");
      await editor.getByLabel("Day").selectOption("sat");
      await editor.getByLabel("Time").selectOption("15:00");
      await editor.getByRole("button", { name: "Save changes" }).click();
      await expect(editor).toBeHidden();
      await expect(toastRegion(page)).toContainText("Appointment rescheduled");
      await expect(page.locator("[data-slot='sat-15:00']")).toContainText(
        "Wayan Sudarma",
      );
      await expect(page.locator("[data-slot='thu-09:00']")).toHaveText("");

      // Batalkan janji temu lain.
      await page.getByRole("button", { name: /^Agus Salim/ }).click();
      await editor.getByRole("button", { name: "Cancel appointment" }).click();
      await expect(toastRegion(page)).toContainText("Appointment cancelled");
      await expect(bookings).toHaveCount(11);
      await expect(page.locator("[data-slot='mon-10:00']")).toHaveText("");

      await page.getByLabel("Filter by doctor").selectOption("d2");
      await expect(bookings).toHaveCount(2);
      await page.getByLabel("Filter by doctor").selectOption("d1");
      await expect(bookings).toHaveCount(5);
      await expect(page.getByText("5 appointments")).toBeVisible();
    });

    test("patients: filter dan rekam pasien dengan tab", async ({ page }) => {
      await openTemplate(page, framework, "patients");
      const rows = page.locator("tr[data-patient]:visible");
      await expect(rows).toHaveCount(8);
      await page.getByLabel("Filter patients").fill("RM-0044");
      await expect(rows).toHaveCount(2);
      await expect(page.getByText("2 of 8 patients")).toBeVisible();
      await page.getByLabel("Filter patients").fill("zzz");
      await expect(
        page.getByText("No patients match this filter."),
      ).toBeVisible();
      await page.getByLabel("Filter patients").fill("budi");
      await expect(rows).toHaveCount(1);

      await page.getByRole("button", { name: "Budi Santoso" }).click();
      const drawer = page.getByRole("dialog", { name: "Patient record" });
      await expect(drawer.locator("[data-patient-name]")).toHaveText(
        "Budi Santoso",
      );
      await expect(drawer.locator("[data-field='Blood type']")).toHaveText(
        "A+",
      );
      await expect(drawer.locator("[data-field='Age and sex']")).toHaveText(
        "52 yr, male",
      );
      await drawer.getByRole("tab", { name: "Visits" }).click();
      await expect(drawer.getByText("Follow-up visit")).toBeVisible();
      await expect(drawer.getByText("Vaccination")).toBeVisible();
      await expect(drawer.getByText("General checkup")).toBeHidden();
      await drawer.getByRole("tab", { name: "Vitals" }).click();
      await expect(
        drawer.getByRole("img", {
          name: "Systolic over the last 5 visits: 115, 118, 113, 119, 116",
        }),
      ).toBeVisible();
      await expect(drawer.getByText("116 mmHg")).toBeVisible();
      await drawer.getByRole("tab", { name: "Allergies" }).click();
      await expect(drawer.locator("[data-allergies]:visible")).toHaveText(
        /Sulfa drugs\s*Shellfish/,
      );
      await drawer.getByRole("button", { name: "Send reminder" }).click();
      await expect(drawer).toBeHidden();
      await expect(toastRegion(page)).toContainText("WhatsApp to Budi Santoso");

      await page.getByLabel("Filter patients").fill("made");
      await page.getByRole("button", { name: "Made Wirawan" }).click();
      await expect(drawer.locator("[data-allergies]:visible")).toHaveText(
        "No known allergies.",
      );
    });

    test("doctors: sakelar ketersediaan mengubah lencana", async ({ page }) => {
      await openTemplate(page, framework, "doctors");
      const cardOf = (id: string) => page.locator(`[data-doctor=${id}]`);
      await expect(
        page.getByText("3 of 4 doctors accepting patients"),
      ).toBeVisible();
      const badge = (id: string, label: string) =>
        cardOf(id).getByText(label, { exact: true });
      await expect(badge("d4", "Away")).toBeVisible();
      await expect(badge("d4", "Available")).toBeHidden();
      await cardOf("d4").getByRole("switch").check();
      await expect(badge("d4", "Available")).toBeVisible();
      await expect(badge("d4", "Away")).toBeHidden();
      await expect(toastRegion(page)).toContainText("Accepting patients");
      await expect(toastRegion(page)).toContainText("dr. Yoga Pratama, Sp.PD");
      await cardOf("d1").getByRole("switch").uncheck();
      await expect(badge("d1", "Away")).toBeVisible();
      await expect(toastRegion(page)).toContainText("Set to away");
      await expect(
        page.getByText("3 of 4 doctors accepting patients"),
      ).toBeVisible();
    });

    test("pharmacy: serahkan resep dan saring stok menipis", async ({
      page,
    }) => {
      await openTemplate(page, framework, "pharmacy");
      await expect(page.getByText("4 waiting to be dispensed")).toBeVisible();
      await page.getByRole("button", { name: "Dispense RX-2052" }).click();
      await expect(toastRegion(page)).toContainText("RX-2052 for Dewi Lestari");
      await expect(
        page.locator("[data-rx=r2]").getByText("Dispensed"),
      ).toBeVisible();
      await expect(
        page.locator("[data-rx=r1]").getByText("Dispensed"),
      ).toBeHidden();
      await expect(
        page.getByRole("button", { name: "Dispense RX-2052" }),
      ).toBeHidden();
      await expect(page.getByText("3 waiting to be dispensed")).toBeVisible();

      const rows = page.locator("tr[data-stock]:visible");
      await expect(rows).toHaveCount(8);
      await page.getByRole("switch", { name: "Low stock only" }).check();
      await expect(rows).toHaveCount(3);
      await expect(rows.first()).toContainText("Cetirizine 10 mg");
      await expect(rows.last()).toContainText("Out of stock");
      await page.getByRole("switch", { name: "Low stock only" }).uncheck();
      await expect(rows).toHaveCount(8);
    });

    test("billing: filter, rincian tagihan, dan tandai lunas", async ({
      page,
    }) => {
      await openTemplate(page, framework, "billing");
      const rows = page.locator("tr[data-invoice]:visible");
      const total = (label: string) => page.locator(`[data-total="${label}"]`);
      await expect(rows).toHaveCount(7);
      await expect(total("Outstanding")).toHaveText("Rp 930.000");
      await expect(total("Collected")).toHaveText("Rp 970.000");
      const group = page.getByRole("group", {
        name: "Filter by payment status",
      });
      await group.getByRole("button", { name: "Unpaid" }).click();
      await expect(rows).toHaveCount(4);
      await page.getByLabel("Filter by payer").selectOption("BPJS");
      await expect(rows).toHaveCount(2);
      await expect(page.getByText("2 of 7 invoices")).toBeVisible();

      await page.getByRole("button", { name: "INV-1177" }).click();
      const modal = page.getByRole("dialog", { name: "Invoice INV-1177" });
      await expect(modal).toContainText("Tooth extraction");
      await expect(modal).toContainText("- Rp 350.000");
      await expect(modal.locator("[data-due]")).toHaveText("Rp 30.000");
      await modal.getByRole("button", { name: "Mark as paid" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText("INV-1177, Rp 30.000");
      await expect(rows).toHaveCount(1);
      await group.getByRole("button", { name: "All" }).click();
      await expect(
        page.locator("tr[data-invoice=i6]").getByText("Paid", { exact: true }),
      ).toBeVisible();
      await expect(
        page.locator("tr[data-invoice=i6]").getByText("Unpaid"),
      ).toBeHidden();
      await expect(total("Outstanding")).toHaveText("Rp 900.000");
      await expect(total("Collected")).toHaveText("Rp 1.000.000");

      await group.getByRole("button", { name: "Paid", exact: true }).click();
      await expect(rows).toHaveCount(2);
      await page.getByRole("button", { name: "INV-1177" }).click();
      await expect(
        modal.getByRole("button", { name: "Mark as paid" }),
      ).toBeHidden();
      await modal.getByRole("button", { name: "Close" }).last().click();
      await page.getByLabel("Filter by payer").selectOption("Umum");
      await group.getByRole("button", { name: "All" }).click();
      await expect(rows).toHaveCount(4);
    });

    test("settings: simpan profil, jam buka, dan notifikasi", async ({
      page,
    }) => {
      await openTemplate(page, framework, "settings");
      await page.getByLabel("Clinic name").fill("");
      await page.getByRole("button", { name: "Save profile" }).click();
      await expect(page.getByText("Enter the clinic name.")).toBeVisible();
      await page.getByLabel("Clinic name").fill("Klinik Sehati Cimahi");
      await page.getByRole("button", { name: "Save profile" }).click();
      await expect(page.getByText("Enter the clinic name.")).toBeHidden();
      await expect(toastRegion(page)).toContainText("Klinik Sehati Cimahi");

      const sunday = page.locator("[data-day=Sunday]");
      await expect(sunday).toContainText("Closed");
      await sunday.getByRole("switch").check();
      await expect(sunday).toContainText("09:00 - 12:00");
      await page.locator("[data-day=Monday]").getByRole("switch").uncheck();
      await expect(page.locator("[data-day=Monday]")).toContainText("Closed");

      await page.getByRole("switch", { name: "Low stock alerts" }).check();
      await expect(toastRegion(page)).toContainText("Notification enabled");
      await expect(toastRegion(page)).toContainText("Low stock alerts");
    });

    test("topbar: pencarian, notifikasi, dan menu akun", async ({ page }) => {
      await openTemplate(page, framework, "pharmacy");
      const search = page.getByLabel("Search patients");
      await search.fill("RM-00440");
      await search.press("Enter");
      const drawer = page.getByRole("dialog", { name: "Patient record" });
      await expect(drawer.locator("[data-patient-name]")).toHaveText(
        "Putri Ayu",
      );
      await page.keyboard.press("Escape");
      await search.fill("tidak ada");
      await search.press("Enter");
      await expect(toastRegion(page)).toContainText("No patient found");

      const bell = page.getByRole("button", {
        name: "Notifications, 3 unread",
      });
      await bell.click();
      await expect(
        page.getByText("BPJS claim INV-1179 approved"),
      ).toBeVisible();
      await page.getByRole("button", { name: "Mark all as read" }).click();
      await expect(
        page.getByRole("button", { name: "Mark all as read" }),
      ).toBeDisabled();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Notifications", exact: true }),
      ).toBeVisible();

      await page.getByRole("button", { name: /Account/ }).click();
      await page.getByRole("menuitem", { name: "Switch clinic" }).click();
      await expect(toastRegion(page)).toContainText("Clinic switched");
    });
  });
}
