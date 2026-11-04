import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  type Framework,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const DEFAULT_DURATION = 5000;

const region = (page: Page) =>
  page.locator('[role=status][aria-live="polite"]');
const toastCard = (page: Page, title: string) =>
  page.locator("[data-state=open]").filter({ hasText: title });

/** Jam palsu yang berhenti, supaya hanya clock.runFor yang memajukan waktu. */
async function openWithPausedClock(page: Page, framework: Framework) {
  await page.clock.install();
  await openFixture(page, framework, "toast");
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 10);
}

async function showToast(page: Page) {
  await page.getByRole("button", { name: "Show toast" }).click();
  await toastCard(page, "Changes saved").waitFor();
}

for (const theme of themes) {
  test(`toast terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "toast",
      theme,
      async (p) => {
        await showToast(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });
}

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("toast: muncul di region live, lolos axe, dan tombol Close menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "toast");
      const live = region(page);
      await expect(live).toHaveAccessibleName("Notifications");
      await expect(live).toBeEmpty();

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Show toast" }),
      ).toBeFocused();
      await page.keyboard.press("Enter");

      await expect(live).toContainText("Changes saved");
      await expect(live).toContainText("Your profile has been updated");

      const { violations } = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
      expect(violations.map((v) => v.id)).toEqual([]);

      const close = live.getByRole("button", { name: "Close" });
      await close.focus();
      await expect(close).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(toastCard(page, "Changes saved")).toHaveCount(0);
      await expect(live).toBeEmpty();
    });

    test("toast: duration 0 tetap tampil, default hilang setelah 5 detik", async ({
      page,
    }) => {
      await openWithPausedClock(page, framework);

      await showToast(page);
      await page.getByRole("button", { name: "Temporary toast" }).click();
      await expect(toastCard(page, "Draft saved automatically")).toBeVisible();
      await page.mouse.move(0, 0);

      await page.clock.runFor(DEFAULT_DURATION - 100);
      await expect(toastCard(page, "Draft saved automatically")).toBeVisible();
      await page.clock.runFor(200);
      await expect(toastCard(page, "Draft saved automatically")).toHaveCount(0);

      await page.clock.runFor(DEFAULT_DURATION * 2);
      await expect(toastCard(page, "Changes saved")).toBeVisible();
    });

    test("toast: timer berhenti saat hover dan fokus", async ({ page }) => {
      await openWithPausedClock(page, framework);
      const card = toastCard(page, "Draft saved automatically");

      await page.getByRole("button", { name: "Temporary toast" }).click();
      await card.hover();
      await page.clock.runFor(DEFAULT_DURATION * 2);
      await expect(card).toBeVisible();

      await page.mouse.move(0, 0);
      await card.getByRole("button", { name: "Close" }).focus();
      await page.clock.runFor(DEFAULT_DURATION * 2);
      await expect(card).toBeVisible();

      await page.getByRole("button", { name: "Temporary toast" }).focus();
      await page.clock.runFor(DEFAULT_DURATION + 100);
      await expect(card).toHaveCount(0);
    });
  });
}

test("blade toast: dipicu lewat CustomEvent di window", async ({ page }) => {
  await openFixture(page, "blade", "toast");
  await page.evaluate(() =>
    window.dispatchEvent(
      new CustomEvent("markas-toast", {
        detail: { title: "Could not send", variant: "danger", duration: 0 },
      }),
    ),
  );
  await expect(region(page)).toContainText("Could not send");
  await expect(toastCard(page, "Could not send")).toHaveClass(
    /border-danger\/40/,
  );
});
