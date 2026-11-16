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
  templateAxeTimeout,
  templateFrameworks,
  templateParityFrameworks,
  templateParityTimeout,
  MAX_DIFF_RATIO,
  themes,
  type Framework,
  type Theme,
} from "./helpers";

const SLUG = "rambu";
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const START = new Date("2026-11-05T09:00:00+07:00");
const REFERENCE = "RMB-500-7F3A9C";

/** Judul h1 tiap halaman (Offline saat browser online), urut seperti navigasi. */
const pages = {
  "404": "This page took a wrong turn",
  "403": "This area is off limits",
  "419": "Your session has expired",
  "429": "Slow down a little",
  "500": "Something broke on our end",
  "503": "We are tuning things up",
  offline: "You are back online",
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const navNames: Record<PageId, string> = {
  "404": "404 Not Found",
  "403": "403 Forbidden",
  "419": "419 Page Expired",
  "429": "429 Too Many Requests",
  "500": "500 Server Error",
  "503": "503 Maintenance",
  offline: "Offline",
};

/** Aksen biru untuk memastikan sorotan memakai token primary. */
const BLUE_ACCENT =
  ":root:root{--markas-primary:#1d4ed8;--markas-primary-strong:#1e40af;--markas-on-primary:#fff;--markas-primary-soft:#dbeafe;--markas-primary-line:#93c5fd}";

const title = (page: Page) => page.locator("#rambu-title");
const switcher = (page: Page) =>
  page.getByRole("navigation", { name: "Error pages" });
const toastRegion = (page: Page) =>
  page.getByRole("status", { name: "Notifications" });

async function openTemplate(
  page: Page,
  framework: Framework,
  pageId: PageId = "404",
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
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every(
        (animation) =>
          animation.playState !== "running" ||
          animation.effect?.getTiming().iterations === Infinity,
      ),
  );
}

async function capture(
  browser: Browser,
  viewport: { width: number; height: number },
  framework: Framework,
  pageId: PageId,
  theme: Theme,
) {
  // Konteks baru dengan jam palsu yang dihentikan supaya hitung mundur 429 sama di semua framework.
  const context = await browser.newContext({
    baseURL: test.info().project.use.baseURL,
    viewport,
  });
  const page = await context.newPage();
  await page.clock.install({ time: START });
  await openTemplate(page, framework, pageId, theme);
  await page.clock.pauseAt(new Date(START.getTime() + 60_000));
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
  pageId: PageId,
  theme: Theme,
) {
  const reference = await capture(browser, viewport, "react", pageId, theme);
  for (const framework of templateParityFrameworks(SLUG)) {
    const candidate = await capture(
      browser,
      viewport,
      framework,
      pageId,
      theme,
    );
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
    test(`desktop light ${pageId}`, async ({ browser }, testInfo) => {
      await expectSameAsReact(browser, DESKTOP, testInfo, pageId, "light");
    });
  }

  for (const pageId of ["404", "500", "offline"] as const) {
    test(`desktop dark ${pageId}`, async ({ browser }, testInfo) => {
      await expectSameAsReact(browser, DESKTOP, testInfo, pageId, "dark");
    });
  }

  for (const pageId of ["404", "429", "503"] as const) {
    test(`mobile light ${pageId}`, async ({ browser }, testInfo) => {
      await expectSameAsReact(browser, MOBILE, testInfo, pageId, "light");
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
        await openTemplate(page, framework, "404", theme);
        for (const pageId of pageIds) {
          await switchTo(page, pageId);
          await expectNoAxeViolations(page, `${pageId} ${theme}`);
        }
      });
    }

    test("aksen biru dipakai sorotan dan tetap lolos axe", async ({ page }) => {
      await openTemplate(page, framework, "503");
      await page.addStyleTag({ content: BLUE_ACCENT });
      const blue = "rgb(29, 78, 216)";
      await expect(
        switcher(page).getByRole("button", { name: navNames["503"] }),
      ).toHaveCSS("background-color", blue);
      await expect(page.getByRole("button", { name: "Notify me" })).toHaveCSS(
        "background-color",
        blue,
      );
      await expectNoAxeViolations(page, "503 blue");
    });

    test("pemilih halaman membuka setiap halaman error", async ({ page }) => {
      await openTemplate(page, framework, "404");
      for (const pageId of pageIds) {
        const button = switcher(page).getByRole("button", {
          name: navNames[pageId],
          exact: true,
        });
        await button.click();
        await expect(title(page)).toHaveText(pages[pageId]);
        await expect(title(page)).toBeFocused();
        await expect(page).toHaveURL(new RegExp(`#${pageId}$`));
        await expect(button).toHaveAttribute("aria-current", "page");
      }
      await expect(
        switcher(page).getByRole("button", { name: navNames["404"] }),
      ).not.toHaveAttribute("aria-current", "page");

      await page.goBack();
      await expect(title(page)).toHaveText(pages["503"]);
      await switchTo(page, "403");
      await page.getByRole("button", { name: "Go back" }).click();
      await expect(title(page)).toHaveText(pages["503"]);
    });

    test("404: pencarian menyaring halaman populer", async ({ page }) => {
      await openTemplate(page, framework, "404");
      await expect(
        page.getByRole("link", { name: "Back home" }).first(),
      ).toHaveAttribute("href", "/");
      const list = page.locator("main ul li");
      await expect(list).toHaveCount(6);
      await expect(page.getByText("Popular pages")).toBeVisible();
      await page.getByLabel("Search pages").fill("settings");
      await expect(list).toHaveCount(2);
      await expect(page.getByText("2 pages found")).toBeVisible();
      await page.getByLabel("Search pages").fill("invoice");
      await expect(list).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: /Invoices/ }),
      ).toHaveAttribute("href", "/billing/invoices");
      await page.getByLabel("Search pages").fill("zzz");
      await expect(list).toHaveCount(0);
      await expect(page.getByText("No pages match your search.")).toBeVisible();
    });

    test("403: minta akses memunculkan toast", async ({ page }) => {
      await openTemplate(page, framework, "403");
      const request = page.getByRole("button", { name: "Request access" });
      await request.click();
      await expect(toastRegion(page)).toContainText("Access requested");
      await expect(
        page.getByRole("button", { name: "Request sent" }),
      ).toBeDisabled();
    });

    test("419: penjelasan CSRF bisa dibuka", async ({ page }) => {
      await openTemplate(page, framework, "419");
      const reason = page.getByText(/CSRF token tied to your\s+session/);
      await expect(reason).toBeHidden();
      await page.getByText("Why did this happen?").click();
      await expect(reason).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Refresh page" }),
      ).toBeEnabled();
    });

    test("429: hitung mundur lalu Try again aktif", async ({ page }) => {
      await page.clock.install({ time: START });
      await openTemplate(page, framework, "429");
      const retry = page.getByRole("button", { name: "Try again" });
      const countdown = page.locator("[data-countdown]");
      await expect(retry).toBeDisabled();
      await page.clock.runFor(10_000);
      await expect(countdown).toHaveText(/^0:2\d$/);
      await expect(retry).toBeDisabled();
      await page.clock.runFor(25_000);
      await expect(countdown).toHaveText("0:00");
      await expect(page.getByText("100%")).toBeVisible();
      await expect(page.getByText("Ready when you are")).toBeVisible();
      await expect(retry).toBeEnabled();
      await retry.click();
      await expect(toastRegion(page)).toContainText("Request sent");
    });

    test("500: salin referensi dan kirim laporan", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await openTemplate(page, framework, "500");
      await expect(page.locator("[data-reference]")).toHaveText(REFERENCE);
      await page.getByRole("button", { name: "Copy reference" }).click();
      await expect
        .poll(() => page.evaluate(() => navigator.clipboard.readText()))
        .toBe(REFERENCE);

      await page.getByRole("button", { name: "Report this problem" }).click();
      const modal = page.getByRole("dialog", { name: "Report a problem" });
      await expect(modal).toBeVisible();
      await modal.getByLabel("What happened?").fill("Saving an order failed");
      await modal.getByLabel("Email for updates").fill("andi@rambu.id");
      await modal.getByRole("button", { name: "Send report" }).click();
      await expect(modal).toBeHidden();
      await expect(toastRegion(page)).toContainText(REFERENCE);
    });

    test("503: notifikasi email memvalidasi lalu memunculkan toast", async ({
      page,
    }) => {
      await openTemplate(page, framework, "503");
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "value",
        "68",
      );
      const field = page.getByLabel("Email me when Rambu is back");
      await field.fill("not-an-email");
      await page.getByRole("button", { name: "Notify me" }).click();
      await expect(page.getByText("Enter a valid email address")).toBeVisible();
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await field.fill("maya@majubersama.id");
      await page.getByRole("button", { name: "Notify me" }).click();
      await expect(toastRegion(page)).toContainText(
        "We will email maya@majubersama.id",
      );
      await expect(field).toHaveValue("");
      await expect(page.getByText("Enter a valid email address")).toHaveCount(
        0,
      );
    });

    test("offline: status mengikuti event online dan offline", async ({
      page,
      context,
    }) => {
      await openTemplate(page, framework, "offline");
      await expect(page.getByText("Connection restored")).toBeVisible();
      await context.setOffline(true);
      await expect(title(page)).toHaveText("You are offline");
      await expect(page.getByText("No connection")).toBeVisible();
      await page.getByRole("button", { name: "Try again" }).click();
      await expect(toastRegion(page)).toContainText("Still offline");
      await context.setOffline(false);
      await expect(title(page)).toHaveText(pages.offline);
      await page.getByRole("button", { name: "Try again" }).click();
      await expect(toastRegion(page)).toContainText("Connected");
    });

    test("mobile tanpa overflow horizontal", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await openTemplate(page, framework, "404");
      for (const pageId of pageIds) {
        await switchTo(page, pageId);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, pageId).toBeLessThanOrEqual(0);
        await expect(
          switcher(page).getByRole("button", { name: navNames[pageId] }),
        ).toBeInViewport({ ratio: 1 });
      }
    });
  });
}
