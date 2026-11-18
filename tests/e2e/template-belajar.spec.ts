import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test,
  type Browser,
  type Page,
  type TestInfo,
} from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  templateFrameworks,
  templateParityFrameworks,
  templateParityTimeout,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "belajar";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Learn the job from people who do it";
const LOTTIE_COUNT = 4;

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });
const courseCards = (page: Page) => page.locator("[data-course]:visible");

/** Buka template dan tunggu keempat animasi Lottie dimuat (gambar diam bila reduced motion). */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await expect(page.locator("[data-lottie=ready] svg")).toHaveCount(
    LOTTIE_COUNT,
  );
  await page.evaluate(() => document.fonts.ready);
}

async function capture(
  browser: Browser,
  viewport: { width: number; height: number },
  framework: Framework,
  theme: Theme,
) {
  // Reduced motion: setiap Lottie langsung berhenti di frame terakhir, jadi hasilnya deterministik.
  const context = await browser.newContext({
    baseURL: test.info().project.use.baseURL,
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await openTemplate(page, framework, theme);
  const image = PNG.sync.read(
    await page.screenshot({
      fullPage: true,
      animations: "disabled",
      caret: "hide",
    }),
  );
  await context.close();
  return image;
}

async function expectSameAsReact(
  browser: Browser,
  viewport: { width: number; height: number },
  testInfo: TestInfo,
  theme: Theme,
) {
  const reference = await capture(browser, viewport, "react", theme);
  for (const framework of templateParityFrameworks(SLUG)) {
    const candidate = await capture(browser, viewport, framework, theme);
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
      await testInfo.attach(`${framework}-diff.png`, {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    expect(ratio, `selisih piksel ${framework} vs react`).toBeLessThanOrEqual(
      MAX_DIFF_RATIO,
    );
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
  test.describe.configure({ timeout: 2 * templateParityTimeout(SLUG) });
  test("desktop light", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, DESKTOP, testInfo, "light");
  });
  test("desktop dark", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, DESKTOP, testInfo, "dark");
  });
  test("mobile light", async ({ browser }, testInfo) => {
    await expectSameAsReact(browser, MOBILE, testInfo, "light");
  });
});

for (const framework of templateFrameworks(SLUG)) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(DESKTOP);
    });

    for (const theme of themes) {
      test(`lolos axe-core (${theme})`, async ({ page }) => {
        await openTemplate(page, framework, theme);
        await expectNoAxeViolations(page, theme);
      });
    }

    test("aksen biru dipakai tombol utama dan tetap lolos axe", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        page.getByRole("link", { name: "Browse courses" }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Choose Cohort" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("Lottie dekoratif dimuat ke kotak berukuran tetap", async ({
      page,
    }) => {
      await page.goto(`/template.html?t=${SLUG}&fw=${framework}`);
      const hero = page.locator("[data-lottie-name=hero]");
      await hero.waitFor();
      const before = await hero.boundingBox();
      await expect(hero).toHaveAttribute("data-lottie", "ready");
      expect(await hero.boundingBox()).toEqual(before);
      const boxes = page.locator("[data-lottie-name]");
      await expect(boxes).toHaveCount(LOTTIE_COUNT);
      for (const box of await boxes.all())
        await expect(box).toHaveAttribute("aria-hidden", "true");
    });

    test("menu mobile terbuka, menutup saat link dipilih dan Escape", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const toggle = page.getByRole("button", { name: "Menu" });
      const menu = page.getByRole("navigation", { name: "Main mobile" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name: "Pricing" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#pricing$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("filter topik menyaring kursus", async ({ page }) => {
      await openTemplate(page, framework);
      await expect(courseCards(page)).toHaveCount(8);
      await expect(page.getByText("Showing all 8 courses")).toBeVisible();
      const filters = page.getByRole("group", {
        name: "Filter courses by topic",
      });
      const design = filters.getByRole("button", { name: "Design" });
      await design.click();
      await expect(design).toHaveAttribute("aria-pressed", "true");
      await expect(courseCards(page)).toHaveCount(2);
      await expect(page.getByText("Showing 2 of 8 courses")).toBeVisible();
      await expect(courseCards(page).first()).toContainText(
        "UI design with Figma",
      );
      // Mengeklik pilihan aktif tidak mengosongkan filter.
      await design.click();
      await expect(design).toHaveAttribute("aria-pressed", "true");
      await expect(courseCards(page)).toHaveCount(2);
      await filters.getByRole("button", { name: "All" }).click();
      await expect(courseCards(page)).toHaveCount(8);
    });

    test("Details membuka modal kursus lalu daftar memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("button", { name: "Details, UX research in practice" })
        .click();
      const modal = page.getByRole("dialog", { name: "Course details" });
      await expect(modal).toBeVisible();
      await expect(modal.locator("[data-modal-title]")).toHaveText(
        "UX research in practice",
      );
      await expect(modal).toContainText("Rp 2.200.000");
      await expect(modal).toContainText("Nadia Putri");
      await expect(modal).toContainText("usability study with five");
      await modal
        .getByRole("button", { name: "Apply for this cohort" })
        .click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "We saved a seat for you in UX research in practice",
      );
      await page
        .getByRole("button", { name: "Details, SQL for data analysis" })
        .click();
      await expect(modal.locator("[data-modal-title]")).toHaveText(
        "SQL for data analysis",
      );
      await expect(modal).toContainText("Rina Siregar");
      await modal
        .getByRole("button", { name: "Close", exact: true })
        .last()
        .click();
      await expect(modal).toBeHidden();
    });

    test("harga bulanan dan tahunan berganti", async ({ page }) => {
      await openTemplate(page, framework);
      const billing = page.getByRole("group", { name: "Billing period" });
      const cohort = page.locator("[data-plan=cohort]");
      await expect(cohort.locator("[data-price]")).toHaveText("Rp 899.000");
      await expect(cohort).toContainText("Billed monthly, cancel anytime");
      const yearly = billing.getByRole("button", { name: "Yearly" });
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await expect(cohort.locator("[data-price]")).toHaveText("Rp 719.000");
      await expect(cohort).toContainText("Billed Rp 8.628.000 a year");
      await expect(page.locator("[data-plan=plus] [data-price]")).toHaveText(
        "Rp 199.000",
      );
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await billing.getByRole("button", { name: "Monthly" }).click();
      await expect(cohort.locator("[data-price]")).toHaveText("Rp 899.000");
      await page.getByRole("button", { name: "Choose Plus" }).click();
      await expect(toastRegion(page)).toContainText("Plus plan selected");
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/Intermediate courses list what you/);
      const second = page.getByText(/two live sessions of 90\s+minutes/);
      await expect(first).toBeHidden();
      await page.getByText("Do I need experience before joining?").click();
      await expect(first).toBeVisible();
      await page
        .getByText("How much time does a course take each week?")
        .click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("pelajaran gratis dan advisor memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Try a free lesson" }).click();
      await expect(toastRegion(page)).toContainText("Free lesson unlocked");
      await page.getByRole("button", { name: "Chat with an advisor" }).click();
      await expect(toastRegion(page)).toContainText("Chat opened");
    });

    test("newsletter memvalidasi email lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Email address");
      const submit = page.getByRole("button", { name: "Subscribe" });
      await field.fill("bukan-email");
      await submit.click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sari@gmail.com");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "on its way to sari@gmail.com",
      );
      await expect(field).toHaveValue("");
      await expect(field).not.toHaveAttribute("aria-invalid", "true");
      await expect(page.getByText("Enter a valid email address")).toHaveCount(
        0,
      );
    });

    for (const viewport of [MOBILE, SMALLEST])
      test(`tanpa overflow horizontal di ${viewport.width} px`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await openTemplate(page, framework);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
  });
}
