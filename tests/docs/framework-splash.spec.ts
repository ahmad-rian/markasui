import { expect, test, type Page } from "@playwright/test";

/**
 * Splash "Now showing <framework>" after an explicit pick in the sidebar switcher (FrameworkSplash.astro,
 * scripts/framework-splash.ts). It must stay away on first load and on stored choices.
 */
const COMPONENT = "/components/button";

const splash = (page: Page) => page.locator("[data-framework-splash]");
const announcer = (page: Page) => page.locator("[data-framework-announce]");
const radio = (page: Page, name: string) =>
  page
    .locator("[data-framework-switcher]:visible")
    .first()
    .getByRole("radio", { name, exact: true });

test.describe("with motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("switching shows the splash with the framework name, then hides it", async ({
    page,
  }) => {
    await page.goto(COMPONENT);
    await expect(splash(page)).toBeHidden();

    await radio(page, "Svelte").click();

    const card = splash(page).locator('[data-splash-fw="svelte"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText("Now showing");
    await expect(card).toContainText("Svelte");
    await expect(splash(page).locator("[data-splash-fw]:visible")).toHaveCount(
      1,
    );
    await expect(announcer(page)).toHaveText("Now showing Svelte");
    await expect(page.locator("[data-fw-pulse]").first()).toBeAttached();
    await expect(splash(page)).toBeHidden({ timeout: 2_000 });
    await expect(page.locator("[data-fw-pulse]")).toHaveCount(0);
  });

  test("Indonesian page uses the Indonesian text", async ({ page }) => {
    await page.goto(`/id${COMPONENT}`);
    await radio(page, "Vue").click();
    await expect(splash(page).locator('[data-splash-fw="vue"]')).toContainText(
      "Sekarang menampilkan",
    );
    await expect(announcer(page)).toHaveText("Sekarang menampilkan Vue");
  });

  test("keyboard arrows on the switcher show the splash", async ({ page }) => {
    await page.goto(COMPONENT);
    await radio(page, "Blade").focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      splash(page).locator('[data-splash-fw="react"]'),
    ).toBeVisible();
    await expect(announcer(page)).toHaveText("Now showing React");
  });

  test("no splash on first load, on a stored choice, or on ?framework=", async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem("markas-framework", "angular"),
    );
    await page.goto(COMPONENT);
    await expect(page.locator("html")).toHaveAttribute(
      "data-framework",
      "angular",
    );
    await page.goto(`${COMPONENT}?framework=svelte`);
    await page.locator(`a[href="/components/modal"]:visible`).first().click();
    await expect(page).toHaveURL(/\/components\/modal/);
    await expect(splash(page)).toBeHidden();
    await expect(announcer(page)).toHaveText("");
  });

  test("picking the framework that is already active shows nothing", async ({
    page,
  }) => {
    await page.goto(COMPONENT);
    await radio(page, "Blade").click();
    await expect(splash(page)).toBeHidden();
    await expect(announcer(page)).toHaveText("");
  });

  test("still one splash per switch after client-side navigation", async ({
    page,
  }) => {
    await page.goto(COMPONENT);
    await page.locator(`a[href="/components/modal"]:visible`).first().click();
    await expect(page).toHaveURL(/\/components\/modal/);
    await page.evaluate(() => {
      (window as unknown as { splashCount: number }).splashCount = 0;
      document
        .querySelector("[data-framework-splash]")!
        .addEventListener("toggle", (event) => {
          if ((event as ToggleEvent).newState === "open")
            (window as unknown as { splashCount: number }).splashCount++;
        });
    });
    await radio(page, "Astro").click();
    await expect(
      splash(page).locator('[data-splash-fw="astro"]'),
    ).toBeVisible();
    // toggle is dispatched asynchronously, so poll; a duplicate listener would make it 2.
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { splashCount: number }).splashCount,
        ),
      )
      .toBe(1);
    await page.waitForTimeout(200);
    expect(
      await page.evaluate(
        () => (window as unknown as { splashCount: number }).splashCount,
      ),
    ).toBe(1);
  });

  test("switching causes no layout shift on the component page", async ({
    page,
  }) => {
    await page.goto(COMPONENT);
    await page.evaluate(() => {
      (window as unknown as { shifts: number }).shifts = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as {
          value: number;
          hadRecentInput: boolean;
        }[])
          if (!entry.hadRecentInput)
            (window as unknown as { shifts: number }).shifts += entry.value;
      }).observe({ type: "layout-shift", buffered: false });
    });
    await radio(page, "React").click();
    await expect(splash(page)).toBeVisible();
    await expect(splash(page)).toBeHidden({ timeout: 2_000 });
    const shifts = await page.evaluate(
      () => (window as unknown as { shifts: number }).shifts,
    );
    expect(shifts).toBeLessThan(0.01);
  });
});

test("reduced motion: no animation or pulse, still announced", async ({
  page,
}) => {
  // playwright.docs.config.ts emulates reduced motion for every test.
  await page.goto(COMPONENT);
  await radio(page, "Angular").click();
  const card = splash(page).locator('[data-splash-fw="angular"]');
  await expect(card).toBeVisible();
  expect(
    await splash(page).evaluate(
      (element) => getComputedStyle(element).animationName,
    ),
  ).toBe("none");
  await expect(page.locator("[data-fw-pulse]")).toHaveCount(0);
  await expect(announcer(page)).toHaveText("Now showing Angular");
  await expect(splash(page)).toBeHidden({ timeout: 2_000 });
});
