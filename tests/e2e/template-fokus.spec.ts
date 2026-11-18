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

const SLUG = "fokus";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Quiet your phone. Keep your focus.";
const PHOTO_COUNT = 3;

// Halaman panjang: tangkapan layar penuh dan axe butuh waktu lebih.
test.describe.configure({ timeout: 120_000 });

/** Aksen biru untuk memastikan tombol utama memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

/** Buka template dan tunggu semua foto selesai di-decode (foto lazy dimuat sekaligus supaya deterministik). */
async function openTemplate(
  page: Page,
  framework: Framework,
  theme: Theme = "light",
) {
  await page.goto(`/template.html?t=${SLUG}&fw=${framework}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(TITLE);
  await expect(page.locator("img[src^='/template-images/']")).toHaveCount(
    PHOTO_COUNT,
  );
  await page.evaluate(async () => {
    const photos = [...document.images];
    for (const photo of photos) photo.loading = "eager";
    await Promise.all(photos.map((photo) => photo.decode()));
    await document.fonts.ready;
  });
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
      await expect(page.getByRole("button", { name: "Choose Plus" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expect(
        page
          .locator("main a[href='#join']")
          .filter({ hasText: "Join the waitlist" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto punya ukuran tetap dan alt", async ({ page }) => {
      await openTemplate(page, framework);
      const hero = page.locator("img[src$='hero-valley.webp']");
      await expect(hero).toHaveAttribute("width", "1600");
      await expect(hero).toHaveAttribute("alt", /valley/);
      for (const photo of await page.locator("img[loading=lazy]").all())
        await expect(photo).toHaveAttribute("alt", /\w+/);
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

    test("waitlist memvalidasi email lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const field = page.getByLabel("Email address");
      const submit = page.getByRole("button", { name: "Join the waitlist" });
      await field.fill("bukan-email");
      await submit.click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("sari@gmail.com");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "We will email sari@gmail.com when your invite is ready",
      );
      await expect(field).toHaveValue("");
      await expect(field).not.toHaveAttribute("aria-invalid", "true");
      await expect(page.getByText("Enter a valid email address")).toHaveCount(
        0,
      );
    });

    test("profil fokus mengganti pratinjau aplikasi", async ({ page }) => {
      await openTemplate(page, framework);
      const group = page.getByRole("group", { name: "Focus profiles" });
      const preview = page.locator("[data-profile]");
      await expect(preview).toHaveAttribute("data-profile", "work");
      await expect(preview.locator("[data-screen-title]")).toHaveText(
        "Deep work",
      );
      const evening = group.getByRole("button", { name: "Evening" });
      await evening.click();
      await expect(evening).toHaveAttribute("aria-pressed", "true");
      await expect(preview).toHaveAttribute("data-profile", "evening");
      await expect(preview).toContainText("Family group");
      await expect(
        page.getByText(/Work apps go silent at 18.00/),
      ).toBeVisible();
      // Mengeklik pilihan aktif tidak mengosongkan pilihan.
      await evening.click();
      await expect(evening).toHaveAttribute("aria-pressed", "true");
      await group.getByRole("button", { name: "Weekend" }).click();
      await expect(preview).toContainText("Security codes");
    });

    test("harga bulanan dan tahunan berganti", async ({ page }) => {
      await openTemplate(page, framework);
      const billing = page.getByRole("group", { name: "Billing period" });
      const plus = page.locator("[data-plan=plus]");
      await expect(plus.locator("[data-price]")).toHaveText("Rp 39.000");
      await expect(plus).toContainText("Billed monthly, cancel anytime");
      const yearly = billing.getByRole("button", { name: "Yearly" });
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await expect(plus.locator("[data-price]")).toHaveText("Rp 31.000");
      await expect(plus).toContainText("Billed Rp 372.000 a year");
      await expect(page.locator("[data-plan=teams] [data-price]")).toHaveText(
        "Rp 47.000",
      );
      await yearly.click();
      await expect(yearly).toHaveAttribute("aria-pressed", "true");
      await billing.getByRole("button", { name: "Monthly" }).click();
      await expect(plus.locator("[data-price]")).toHaveText("Rp 39.000");
      await page.getByRole("button", { name: "Choose Teams" }).click();
      await expect(toastRegion(page)).toContainText("Teams plan selected");
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/only sees which app sent/);
      const second = page.getByText(/security codes, and anything you mark/);
      await expect(first).toBeHidden();
      await page.getByText("Does Teduh read my messages?").click();
      await expect(first).toBeVisible();
      await page.getByText("Will I miss something urgent?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
      await page.getByRole("button", { name: "Ask a question" }).click();
      await expect(toastRegion(page)).toContainText("Message sent");
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
