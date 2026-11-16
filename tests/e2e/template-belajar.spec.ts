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
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "belajar";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const TITLE = "Online psychology courses";

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const mainNav = (page: Page) => page.getByRole("navigation", { name: "Main" });
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await page.evaluate(() => document.fonts.ready);
}

async function capture(
  browser: Browser,
  viewport: { width: number; height: number },
  framework: Framework,
  theme: Theme,
) {
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

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await openTemplate(page, framework);
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        page.getByRole("banner").getByRole("link", { name: "Choose a course" }),
      ).toHaveCSS("background-color", blue);
      await expect(page.getByRole("button", { name: "All courses" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expectNoAxeViolations(page, "blue");
    });

    test("navbar menandai link aktif dan melompat ke section", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const courses = mainNav(page).getByRole("link", { name: "Courses" });
      await expect(courses).toHaveAttribute("aria-current", "true");
      const faq = mainNav(page).getByRole("link", { name: "FAQ" });
      await faq.click();
      await expect(faq).toHaveAttribute("aria-current", "true");
      await expect(courses).not.toHaveAttribute("aria-current", "true");
      await expect(page).toHaveURL(/#faq$/);
      await expect(
        page.getByRole("heading", { name: "Questions, answered" }),
      ).toBeInViewport();
    });

    test("menu mobile terbuka, menutup saat link dipilih dan Escape", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const toggle = page.getByRole("button", { name: "Open menu" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      const menu = page.locator("#belajar-mobile-menu");
      await expect(menu).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close menu" }),
      ).toHaveAttribute("aria-expanded", "true");
      await menu.getByRole("link", { name: "Reviews" }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#reviews$/);
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(menu.getByRole("link", { name: "Reviews" })).toHaveAttribute(
        "aria-current",
        "true",
      );
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("tab kategori menyaring kursus", async ({ page }) => {
      await openTemplate(page, framework);
      const cards = page.locator("[data-course]:visible");
      await expect(cards).toHaveCount(8);
      const clinical = page.getByRole("button", {
        name: "Clinical practice",
        exact: true,
      });
      await clinical.click();
      await expect(clinical).toHaveAttribute("aria-pressed", "true");
      await expect(cards).toHaveCount(2);
      await expect(page.getByText("Showing 2 of 8 courses")).toBeVisible();
      await expect(cards.first()).toContainText(
        "Cognitive behavioural therapy basics",
      );
      await page.getByRole("button", { name: "All courses" }).click();
      await expect(cards).toHaveCount(8);
    });

    test("kartu jalur belajar menyaring kursus dan menggulir", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("button", { name: /^Wellbeing.*21 courses/ })
        .click();
      await expect(
        page.getByRole("button", { name: "Wellbeing", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("[data-course]:visible")).toHaveCount(2);
      await expect(
        page.getByRole("heading", { name: "Courses", exact: true }),
      ).toBeInViewport();
    });

    test("Details membuka modal kursus lalu daftar memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      await page
        .getByRole("button", { name: "Details, Couples counselling skills" })
        .click();
      const modal = page.getByRole("dialog", { name: "Course details" });
      await expect(modal).toBeVisible();
      await expect(modal.locator("[data-modal-title]")).toHaveText(
        "Couples counselling skills",
      );
      await expect(modal).toContainText("Rp 749.000");
      await expect(modal).toContainText("Dr. Sekar Wulandari");
      await modal.getByRole("button", { name: "Enroll now" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText(
        "Couples counselling skills is waiting",
      );
      await page
        .getByRole("button", { name: "Details, Mindfulness for beginners" })
        .click();
      await expect(modal.locator("[data-modal-title]")).toHaveText(
        "Mindfulness for beginners",
      );
      await expect(modal).toContainText("Free");
      await modal
        .getByRole("button", { name: "Close", exact: true })
        .first()
        .click();
      await expect(modal).toBeHidden();
    });

    test("slider testimoni maju, mundur, dan lompat lewat titik", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const counter = page.locator("#reviews [aria-live]");
      await expect(counter).toHaveText("Review 1 of 5");
      const active = page.locator("#reviews li:not([inert])");
      await expect(active).toHaveCount(1);
      await expect(active).toContainText("Putri Anggraini");
      await page.getByRole("button", { name: "Next review" }).click();
      await expect(counter).toHaveText("Review 2 of 5");
      await expect(active).toContainText("Fajar Ramadhan");
      await page.getByRole("button", { name: "Previous review" }).click();
      await page.getByRole("button", { name: "Previous review" }).click();
      await expect(counter).toHaveText("Review 5 of 5");
      await page.getByRole("button", { name: "Show review 3" }).click();
      await expect(counter).toHaveText("Review 3 of 5");
      await expect(
        page.getByRole("button", { name: "Show review 3" }),
      ).toHaveAttribute("aria-current", "true");
      await expect(active).toContainText("Melati Kusuma");
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/Foundations courses start from zero/);
      const second = page.getByText(/Theory hours are short video lessons/);
      await expect(first).toBeVisible();
      await expect(second).toBeHidden();
      await page
        .getByText("What is the difference between theory and practice hours?")
        .click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("tombol pelajaran gratis dan advisor memunculkan toast", async ({
      page,
    }) => {
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
      await expect(page.getByText("Enter a valid email")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sari@gmail.com");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "on its way to sari@gmail.com",
      );
      await expect(field).toHaveValue("");
      await expect(page.getByText("Enter a valid email")).toHaveCount(0);
    });

    test("animasi masuk berjalan saat scroll tanpa reduced motion", async ({
      browser,
    }) => {
      const context = await browser.newContext({
        baseURL: test.info().project.use.baseURL,
        viewport: DESKTOP,
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      await openTemplate(page, framework);
      await expect(page.locator("[data-reveal-ready]")).toHaveCount(1);
      const faq = page.locator("#faq [data-reveal]").first();
      await expect(faq).not.toHaveAttribute("data-shown", "");
      await faq.scrollIntoViewIfNeeded();
      await expect(faq).toHaveAttribute("data-shown", "");
      await context.close();
    });

    test("mobile tanpa overflow horizontal", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
