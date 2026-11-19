import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Floating "Buy me a coffee" card (apps/docs/src/components/CoffeeLauncher.astro, src/scripts/coffee.ts). It
 * appears after a short delay on docs pages, opens a small card with amount chips that link to /support?amount=,
 * and can be hidden for 7 days.
 */
const DOCS = "/docs/introduction";
const HIDE_KEY = "markas-coffee-hidden-until";
const DAY_MS = 24 * 60 * 60 * 1000;
const ENTRANCE_MS = 2000;

const launcher = (page: Page) => page.locator("[data-coffee]");
const toggle = (page: Page) => page.locator("[data-coffee-toggle]");
const card = (page: Page) =>
  page.getByRole("dialog", { name: /Support MarkasUI|Dukung MarkasUI/ });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("markas-splash", "1"));
});

/** Opens a page and lets the entrance timer run, so the launcher is showing. */
async function openWithLauncher(page: Page, path = DOCS) {
  await page.clock.install();
  await page.goto(path);
  await page.clock.runFor(ENTRANCE_MS + 100);
  await expect(toggle(page)).toBeVisible();
}

const activeId = (page: Page) =>
  page.evaluate(() => document.activeElement?.id ?? "");

test.describe("with motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("appears after a short delay with a gentle entrance and steaming cup", async ({
    page,
  }) => {
    await page.clock.install();
    await page.goto(DOCS);
    await expect(launcher(page)).toHaveAttribute("data-state", "idle");
    await expect(toggle(page)).toBeHidden();
    await page.clock.runFor(ENTRANCE_MS - 500);
    await expect(toggle(page)).toBeHidden();
    await page.clock.runFor(600);
    await expect(launcher(page)).toHaveAttribute("data-state", "shown");
    await expect(toggle(page)).toBeVisible();
    await expect(toggle(page)).toHaveAccessibleName("Buy me a coffee");
    const steam = await page
      .locator(".coffee-steam path")
      .first()
      .evaluate((path) => getComputedStyle(path).animationName);
    expect(steam).toBe("coffee-steam");
  });

  test("appears early once the reader scrolls", async ({ page }) => {
    await page.clock.install();
    await page.goto(DOCS);
    await page.mouse.wheel(0, 600);
    await expect(launcher(page)).toHaveAttribute("data-state", "shown");
  });
});

test("is not shown on /support, the thanks page, the 404, or demo pages", async ({
  page,
}) => {
  for (const path of [
    "/support",
    "/id/support",
    "/support/thanks",
    "/support/cancel",
    "/this-page-does-not-exist",
    "/demo/templates/larisa/react",
  ]) {
    await page.goto(path);
    await expect(launcher(page), path).toHaveCount(0);
  }
});

test("opens and closes with the mouse", async ({ page }) => {
  await openWithLauncher(page);
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
  await expect(toggle(page)).toHaveAttribute("aria-controls", "coffee-card");

  await toggle(page).click();
  await expect(card(page)).toBeVisible();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "true");
  await expect(card(page)).toContainText(
    "MarkasUI is free and open source. A coffee keeps it going.",
  );
  expect(await activeId(page)).toBe("coffee-card");

  await card(page).getByRole("button", { name: "Close" }).click();
  await expect(card(page)).toBeHidden();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");

  await toggle(page).click();
  await expect(card(page)).toBeVisible();
  await toggle(page).click();
  await expect(card(page)).toBeHidden();

  // Clicking elsewhere closes it too.
  await toggle(page).click();
  await page.locator("h1").click();
  await expect(card(page)).toBeHidden();
});

test("works with the keyboard: focus moves in, Escape closes and returns focus", async ({
  page,
}) => {
  await openWithLauncher(page);
  await toggle(page).focus();
  await page.keyboard.press("Enter");
  await expect(card(page)).toBeVisible();
  expect(await activeId(page)).toBe("coffee-card");
  await page.keyboard.press("Tab");
  await expect(card(page).getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(card(page).getByRole("link", { name: "Rp 10k" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(card(page)).toBeHidden();
  await expect(toggle(page)).toBeFocused();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");

  await page.keyboard.press("Space");
  await expect(card(page)).toBeVisible();
  await card(page).getByRole("button", { name: "Close" }).focus();
  await page.keyboard.press("Enter");
  await expect(card(page)).toBeHidden();
  await expect(toggle(page)).toBeFocused();
});

test("amount chips link to /support?amount= and the support page preselects it", async ({
  page,
}) => {
  await openWithLauncher(page);
  await toggle(page).click();
  const chips = card(page).getByRole("list", { name: "Quick amounts" });
  await expect(chips.getByRole("link")).toHaveText([
    "Rp 10k",
    "Rp 25k",
    "Rp 50k",
    "Rp 100k",
  ]);
  await expect(chips.getByRole("link", { name: "Rp 10k" })).toHaveAttribute(
    "href",
    "/support?amount=10000",
  );
  await expect(
    card(page).getByRole("link", { name: "Buy me a coffee" }),
  ).toHaveAttribute("href", "/support");

  await chips.getByRole("link", { name: "Rp 50k" }).click();
  await expect(page).toHaveURL(/\/support\?amount=50000$/);
  await expect(page.getByLabel("Amount", { exact: true })).toHaveValue(
    "50.000",
  );
  await expect(page.getByRole("button", { name: "Rp 50.000" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("button", { name: "Rp 25.000" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(launcher(page)).toHaveCount(0);
});

test("Indonesian card uses Indonesian text and /id/support links", async ({
  page,
}) => {
  await openWithLauncher(page, "/id/docs/introduction");
  await expect(toggle(page)).toHaveAccessibleName("Traktir kopi");
  await toggle(page).click();
  await expect(card(page)).toContainText("MarkasUI gratis dan open source.");
  const chip = card(page).getByRole("link", { name: "Rp 100rb" });
  await expect(chip).toHaveAttribute("href", "/id/support?amount=100000");
  await expect(
    card(page).getByRole("link", { name: "Traktir kopi" }),
  ).toHaveAttribute("href", "/id/support");
  await chip.click();
  await expect(page).toHaveURL(/\/id\/support\?amount=100000$/);
  await expect(page.getByLabel("Nominal", { exact: true })).toHaveValue(
    "100.000",
  );
});

test("the support page ignores an amount outside the accepted range", async ({
  page,
}) => {
  for (const amount of ["999", "abc", "99999999999"]) {
    await page.goto(`/support?amount=${amount}`);
    await expect(page.getByLabel("Amount", { exact: true })).toHaveValue(
      "25.000",
    );
  }
});

test("hide keeps it away for 7 days, also after navigation and reload", async ({
  page,
}) => {
  await openWithLauncher(page);
  await toggle(page).click();
  await card(page).getByRole("button", { name: "Hide for 7 days" }).click();
  await expect(launcher(page)).toBeHidden();

  const until = Number(
    await page.evaluate((key) => localStorage.getItem(key), HIDE_KEY),
  );
  const now = await page.evaluate(() => Date.now());
  expect(until - now).toBeGreaterThan(7 * DAY_MS - 60_000);
  expect(until - now).toBeLessThanOrEqual(7 * DAY_MS);

  await page.locator('a[href="/docs/installation"]:visible').first().click();
  await expect(page).toHaveURL(/\/docs\/installation$/);
  await page.clock.runFor(ENTRANCE_MS + 100);
  await expect(launcher(page)).toBeHidden();
  await page.reload();
  await page.clock.runFor(ENTRANCE_MS + 100);
  await expect(launcher(page)).toBeHidden();

  // Eight days later it is back.
  await page.clock.fastForward(8 * DAY_MS);
  await page.reload();
  await page.clock.runFor(ENTRANCE_MS + 100);
  await expect(toggle(page)).toBeVisible();
});

test("still works when storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
  });
  await openWithLauncher(page);
  await toggle(page).click();
  await card(page).getByRole("button", { name: "Hide for 7 days" }).click();
  await expect(launcher(page)).toBeHidden();
});

test("stays collapsed across client-side navigation, without duplicate listeners", async ({
  page,
}) => {
  await openWithLauncher(page);
  await toggle(page).click();
  await expect(card(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator('a[href="/docs/installation"]:visible').first().click();
  await expect(page).toHaveURL(/\/docs\/installation$/);

  // Already introduced: the next page shows it straight away, collapsed.
  await expect(launcher(page)).toHaveAttribute("data-state", "shown");
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
  await expect(card(page)).toBeHidden();

  await page.evaluate(() => {
    const counter = window as unknown as { opened: number };
    counter.opened = 0;
    document
      .querySelector("[data-coffee-card]")!
      .addEventListener("toggle", (event) => {
        if ((event as ToggleEvent).newState === "open") counter.opened++;
      });
  });
  await toggle(page).click();
  await expect(card(page)).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => (window as unknown as { opened: number }).opened),
    )
    .toBe(1);
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "true");
  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("[data-coffee]")).toHaveCount(1);
});

test("reduced motion: no steam drift and no entrance motion", async ({
  page,
}) => {
  // playwright.docs.config.ts emulates reduced motion for every test.
  await openWithLauncher(page);
  const styles = await page.evaluate(() => {
    const steam = document.querySelector(".coffee-steam path")!;
    const element = document.querySelector("[data-coffee]")!;
    return {
      steam: getComputedStyle(steam).animationName,
      transform: getComputedStyle(element).transform,
    };
  });
  expect(styles).toEqual({ steam: "none", transform: "none" });
});

test("small screens: a round icon button that fits 360 px and steps aside for the menu @mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await openWithLauncher(page);
  const box = (await toggle(page).boundingBox())!;
  expect(box.width).toBe(48);
  expect(box.height).toBe(48);
  expect(box.x + box.width).toBeLessThanOrEqual(360 - 16);
  await expect(toggle(page)).toHaveAccessibleName("Buy me a coffee");

  await toggle(page).click();
  const cardBox = (await card(page).boundingBox())!;
  expect(cardBox.x).toBeGreaterThanOrEqual(16);
  expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(360 - 16);
  expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(box.y);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(360);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.locator("dialog[data-drawer]")).toBeVisible();
  await expect(toggle(page)).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(toggle(page)).toBeVisible();
});

for (const theme of ["light", "dark"] as const) {
  test(`axe passes with the card closed and open (${theme})`, async ({
    page,
  }) => {
    await page.addInitScript(
      (value) => localStorage.setItem("markas-theme", value),
      theme,
    );
    await openWithLauncher(page);
    const scan = async () =>
      (
        await new AxeBuilder({ page })
          .include("[data-coffee]")
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes.map((node) => node.target).join(", ")}`,
      );
    expect(await scan()).toEqual([]);
    await toggle(page).click();
    await expect(card(page)).toBeVisible();
    expect(await scan()).toEqual([]);
  });
}
