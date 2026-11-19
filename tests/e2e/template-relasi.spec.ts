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

const SLUG = "relasi";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SMALLEST = { width: 360, height: 780 };
const TITLE = "Turn your DevRel program into revenue growth";
const PHOTO_COUNT = 4;

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
  // Reduced motion: marquee logo berhenti dan tampil sebagai satu baris, jadi hasilnya deterministik.
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
        page
          .locator("section[aria-labelledby=relasi-title]")
          .getByRole("link", { name: "Book a strategy call" }),
      ).toHaveCSS("background-color", blue);
      await expect(
        page.getByRole("button", { name: "Request a call" }),
      ).toHaveCSS("background-color", blue);
      await expectNoAxeViolations(page, "blue");
    });

    test("foto tim punya ukuran tetap dan alt", async ({ page }) => {
      await openTemplate(page, framework);
      const photos = page.locator("img[src^='/template-images/relasi/']");
      for (const photo of await photos.all()) {
        await expect(photo).toHaveAttribute("width", "480");
        await expect(photo).toHaveAttribute("height", "600");
        await expect(photo).toHaveAttribute("alt", /^Portrait of \w+/);
      }
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
      await menu.getByRole("link", { name: "Case studies" }).click();
      await expect(menu).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page).toHaveURL(/#cases$/);
      await toggle.click();
      await expect(menu).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    });

    test("form panggilan memvalidasi isian lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework);
      const form = page.locator("form").filter({ hasText: "Request a call" });
      const name = form.getByLabel("Full name");
      const email = form.getByLabel("Work email");
      const company = form.getByLabel("Company");
      const stage = form.getByLabel("Program stage");
      const submit = form.getByRole("button", { name: "Request a call" });
      await submit.click();
      await expect(form.getByText("Enter your full name.")).toBeVisible();
      await expect(form.getByText("Choose your program stage.")).toBeVisible();
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await expect(stage).toHaveAttribute("aria-invalid", "true");
      await name.fill("Dimas Saputra");
      await email.fill("dimas@gerbang");
      await company.fill("PT Gerbang Data");
      await stage.selectOption("early");
      await submit.click();
      await expect(form.getByText(/Enter a work email/)).toBeVisible();
      await expect(form.getByText("Enter your full name.")).toHaveCount(0);
      await expect(name).not.toHaveAttribute("aria-invalid", "true");
      await expect(email).toHaveAttribute(
        "aria-describedby",
        "relasi-book-email-error",
      );
      await email.fill("dimas@gerbang.id");
      await submit.click();
      await expect(toastRegion(page)).toContainText(
        "Thanks, Dimas. Sari will email dimas@gerbang.id",
      );
      await expect(name).toHaveValue("");
      await expect(stage).toHaveValue("");
      await expect(form.locator(".text-danger:visible")).toHaveCount(0);
    });

    test("FAQ membuka satu jawaban dalam satu waktu", async ({ page }) => {
      await openTemplate(page, framework);
      const first = page.getByText(/tag every program with UTM/);
      const second = page.getByText(/Mostly developer tools, API platforms/);
      await expect(first).toBeHidden();
      await page.getByText("How do you tie DevRel to revenue?").click();
      await expect(first).toBeVisible();
      await page.getByText("Do you only work with API companies?").click();
      await expect(second).toBeVisible();
      await expect(first).toBeHidden();
    });

    test("playbook memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework);
      await page.getByRole("button", { name: "Send me the playbook" }).click();
      await expect(toastRegion(page)).toContainText("Playbook on its way");
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
