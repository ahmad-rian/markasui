import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import {
  SNIPPET_FILE,
  policyFromSnippet,
} from "../../apps/docs/scripts/csp-policy.ts";

/**
 * Floating "Buy me a coffee" card (apps/docs/src/components/CoffeeLauncher.astro, src/scripts/coffee.ts and
 * coffee-lottie.ts). It appears after a short delay on docs pages with a Lottie cup, opens a popover with amount
 * chips that link to /support?amount=, can be minimized to a round button for the visit, and hidden for 7 days.
 */
const DOCS = "/docs/introduction";
const HIDE_KEY = "markas-coffee-hidden-until";
const DAY_MS = 24 * 60 * 60 * 1000;
const ENTRANCE_MS = 2000;

const launcher = (page: Page) => page.locator("[data-coffee]");
const toggle = (page: Page) => page.locator("[data-coffee-toggle]");
const art = (page: Page) => page.locator("[data-coffee-art]");
const minimize = (page: Page) => page.locator("[data-coffee-minimize]");
/** The svg lottie-web renders next to the still placeholder cup. */
const lottieSvg = (page: Page) => art(page).locator("svg:not(.coffee-still)");
const placeholder = (page: Page) => art(page).locator("svg.coffee-still");
const COMPACT_SIZE = 56;
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

  test("appears after a short delay with a gentle entrance and an animated cup", async ({
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
    await expect(toggle(page)).toHaveAccessibleDescription(
      "Keep MarkasUI free",
    );

    // The Lottie player and data load after the card shows, then replace the still cup.
    await expect(art(page)).toHaveAttribute("data-lottie", "ready");
    await expect(lottieSvg(page)).toBeVisible();
    await expect(placeholder(page)).toBeHidden();
    const frame = () => lottieSvg(page).evaluate((svg) => svg.innerHTML);
    const first = await frame();
    await page.clock.runFor(400);
    expect(await frame()).not.toBe(first);
  });

  test("the steam rises a few times, then the cup rests", async ({ page }) => {
    await openWithLauncher(page);
    await expect(art(page)).toHaveAttribute("data-lottie", "ready");
    const frame = () => lottieSvg(page).evaluate((svg) => svg.innerHTML);
    // Three loops of 2.2 s each.
    await page.clock.runFor(8000);
    const rested = await frame();
    await page.clock.runFor(1000);
    expect(await frame()).toBe(rested);
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
  await expect(page.getByLabel("Other amount", { exact: true })).toHaveValue(
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
  await expect(page.getByLabel("Nominal lain", { exact: true })).toHaveValue(
    "100.000",
  );
});

test("the support page ignores an amount outside the accepted range", async ({
  page,
}) => {
  for (const amount of ["999", "abc", "99999999999"]) {
    await page.goto(`/support?amount=${amount}`);
    await expect(page.getByLabel("Other amount", { exact: true })).toHaveValue(
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

test("reduced motion: a still cup and no entrance motion", async ({ page }) => {
  // playwright.docs.config.ts emulates reduced motion for every test.
  await openWithLauncher(page);
  await expect(art(page)).toHaveAttribute("data-lottie", "still");
  await expect(lottieSvg(page)).toBeVisible();
  const frame = () => lottieSvg(page).evaluate((svg) => svg.innerHTML);
  const first = await frame();
  await page.clock.runFor(1000);
  expect(await frame()).toBe(first);
  expect(
    await launcher(page).evaluate(
      (element) => getComputedStyle(element).transform,
    ),
  ).toBe("none");
});

test("keeps the still cup when the animation cannot load", async ({ page }) => {
  await page.route("**/lottie/coffee.json", (route) =>
    route.fulfill({ status: 404 }),
  );
  await openWithLauncher(page);
  await expect(art(page)).toHaveAttribute("data-lottie", "error");
  await expect(placeholder(page)).toBeVisible();
  await expect(lottieSvg(page)).toHaveCount(0);
});

test("desktop: a readable card at the bottom right", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openWithLauncher(page, "/id/docs/introduction");
  const box = (await toggle(page).boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(260);
  expect(box.width).toBeLessThanOrEqual(300);
  expect(box.height).toBeGreaterThanOrEqual(84);
  expect(box.height).toBeLessThanOrEqual(96);
  expect(1280 - (box.x + box.width)).toBe(24);
  expect(800 - (box.y + box.height)).toBe(24);
  await expect(toggle(page)).toContainText("Traktir kopi");
  await expect(toggle(page)).toContainText("Dukung MarkasUI tetap gratis");
  const artBox = (await art(page).boundingBox())!;
  expect(artBox.width).toBe(64);
  expect(artBox.height).toBe(64);
  await expect(page.locator("[data-coffee] .coffee-sub")).toBeVisible();

  // The popover opens above the card, inside the viewport.
  await toggle(page).click();
  const cardBox = (await card(page).boundingBox())!;
  expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(box.y);
  expect(cardBox.y).toBeGreaterThanOrEqual(0);
});

test("desktop popover sits right above the card and closes when the page scrolls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openWithLauncher(page, "/id/pages");
  const button = (await toggle(page).boundingBox())!;
  await toggle(page).click();
  const sheet = (await card(page).boundingBox())!;
  expect(sheet.width).toBe(button.width);
  expect(sheet.x).toBe(button.x);
  expect(button.y - (sheet.y + sheet.height)).toBe(12);

  await page.mouse.move(200, 400);
  await page.mouse.wheel(0, 400);
  await expect(card(page)).toBeHidden();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
});

test("the x minimizes it to a round button for the rest of the visit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openWithLauncher(page);
  await toggle(page).hover();
  await expect(minimize(page)).toBeVisible();
  await expect(minimize(page)).toHaveAccessibleName("Minimize");
  await minimize(page).click();

  await expect(launcher(page)).toHaveAttribute("data-compact", "");
  await expect(toggle(page)).toBeFocused();
  const box = (await toggle(page).boundingBox())!;
  expect(box.width).toBe(COMPACT_SIZE);
  expect(box.height).toBe(COMPACT_SIZE);
  await expect(toggle(page)).toHaveAccessibleName("Buy me a coffee");
  await expect(minimize(page)).toBeHidden();

  // Still opens the popover, above the round button.
  await toggle(page).click();
  const cardBox = (await card(page).boundingBox())!;
  expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(box.y);
  await page.keyboard.press("Escape");

  // Same tab: stays round after navigation and reload, unlike the 7-day hide it does not touch localStorage.
  await page.locator('a[href="/docs/installation"]:visible').first().click();
  await expect(page).toHaveURL(/\/docs\/installation$/);
  await expect(launcher(page)).toHaveAttribute("data-compact", "");
  await page.reload();
  await page.clock.runFor(ENTRANCE_MS + 100);
  await expect(launcher(page)).toHaveAttribute("data-compact", "");
  await expect(toggle(page)).toBeVisible();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), HIDE_KEY),
  ).toBeNull();

  // A new visit shows the full card again.
  const fresh = await page.context().newPage();
  await fresh.addInitScript(() => sessionStorage.setItem("markas-splash", "1"));
  await fresh.clock.install();
  await fresh.goto(DOCS);
  await fresh.clock.runFor(ENTRANCE_MS + 100);
  await expect(fresh.locator("[data-coffee-toggle]")).toBeVisible();
  await expect(fresh.locator("[data-coffee]")).not.toHaveAttribute(
    "data-compact",
  );
  await fresh.close();
});

test("loads the animation without CSP violations", async ({
  page,
  context,
}) => {
  const dist = resolve(
    process.env.DOCS_DIST ??
      resolve(import.meta.dirname, "../../apps/docs/dist"),
  );
  const policy = policyFromSnippet(
    readFileSync(resolve(dist, SNIPPET_FILE), "utf8"),
  )
    .split("; ")
    .filter((directive) => directive !== "upgrade-insecure-requests")
    .join("; ");
  const violations: string[] = [];
  await context.exposeBinding("__reportCsp", (_source, text: string) =>
    violations.push(text),
  );
  await context.addInitScript(() =>
    document.addEventListener("securitypolicyviolation", (event) =>
      (
        window as unknown as { __reportCsp: (text: string) => void }
      ).__reportCsp(
        `${event.effectiveDirective} ${event.blockedURI} ${event.sample}`,
      ),
    ),
  );
  await context.route("**/*", async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), "content-security-policy": policy },
    });
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openWithLauncher(page);
  await expect(art(page)).toHaveAttribute("data-lottie", /^(ready|still)$/);
  expect(violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("small screens: a round button with the cup that fits 360 px and steps aside for the menu @mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await openWithLauncher(page);
  const box = (await toggle(page).boundingBox())!;
  expect(box.width).toBe(COMPACT_SIZE);
  expect(box.height).toBe(COMPACT_SIZE);
  expect(box.x + box.width).toBeLessThanOrEqual(360 - 16);
  await expect(toggle(page)).toHaveAccessibleName("Buy me a coffee");
  await expect(art(page)).toHaveAttribute("data-lottie", /^(ready|still)$/);
  await expect(lottieSvg(page)).toBeVisible();
  await expect(page.locator("[data-coffee] .coffee-sub")).toBeHidden();
  await expect(minimize(page)).toBeHidden();

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

/** Phones in portrait and landscape, and a tablet. */
const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 414, height: 896 },
  { width: 740, height: 360 },
  { width: 844, height: 390 },
  { width: 768, height: 1024 },
];
const PHONE_MAX_WIDTH = 640;
const SHORT_MAX_HEIGHT = 512;
const SIDE_MARGIN = 16;
const TAP_TARGET = 44;

type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.width &&
  b.x < a.x + a.width &&
  a.y < b.y + b.height &&
  b.y < a.y + a.height;

for (const viewport of VIEWPORTS) {
  const { width, height } = viewport;
  test(`responsive at ${width} x ${height}: launcher and popover stay inside the viewport and clear of the header @mobile`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openWithLauncher(page, "/id/docs/introduction");
    const round = width < PHONE_MAX_WIDTH || height < SHORT_MAX_HEIGHT;
    const header = (await page.locator("body > header").first().boundingBox())!;

    const button = (await toggle(page).boundingBox())!;
    if (round) {
      expect(button.width).toBe(COMPACT_SIZE);
      expect(button.height).toBe(COMPACT_SIZE);
    }
    expect(button.x).toBeGreaterThanOrEqual(SIDE_MARGIN);
    expect(width - (button.x + button.width)).toBeGreaterThanOrEqual(
      SIDE_MARGIN,
    );
    expect(height - (button.y + button.height)).toBeGreaterThanOrEqual(
      SIDE_MARGIN,
    );
    expect(overlaps(button, header)).toBe(false);

    await toggle(page).click();
    await expect(card(page)).toBeVisible();
    const sheet = (await card(page).boundingBox())!;
    expect(sheet.x).toBeGreaterThanOrEqual(SIDE_MARGIN);
    expect(width - (sheet.x + sheet.width)).toBeGreaterThanOrEqual(SIDE_MARGIN);
    expect(sheet.y).toBeGreaterThanOrEqual(header.y + header.height);
    expect(sheet.y + sheet.height).toBeLessThanOrEqual(height);
    expect(overlaps(sheet, button)).toBe(false);
    // Everything fits without scrolling inside the popover.
    expect(
      await card(page).evaluate(
        (element) => element.scrollHeight <= element.clientHeight,
      ),
    ).toBe(true);

    if (width < PHONE_MAX_WIDTH) {
      // A sheet with 16 px on both sides and the amounts in a 2 x 2 grid.
      expect(sheet.x).toBe(SIDE_MARGIN);
      expect(sheet.width).toBe(width - 2 * SIDE_MARGIN);
      const tops = await card(page)
        .locator(".coffee-chip")
        .evaluateAll((chips) =>
          chips.map((chip) => chip.getBoundingClientRect().top),
        );
      expect(new Set(tops.map(Math.round)).size).toBe(2);
      const cta = (await card(page).locator(".coffee-cta").boundingBox())!;
      const chips = (await card(page).locator(".coffee-chips").boundingBox())!;
      expect(cta.width).toBe(chips.width);
    }
    if (round) {
      const heights = await card(page)
        .locator("a, button")
        .evaluateAll((targets) =>
          targets.map((target) => target.getBoundingClientRect().height),
        );
      expect(Math.min(...heights)).toBeGreaterThanOrEqual(TAP_TARGET);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);

    await page.keyboard.press("Escape");
    await expect(card(page)).toBeHidden();
    await expect(toggle(page)).toBeFocused();
  });
}

const BUBBLE_MS = 6000;
const bubble = (page: Page) => page.locator("[data-coffee] .coffee-copy");
const bubbleOpacity = (page: Page) =>
  bubble(page).evaluate((element) => Number(getComputedStyle(element).opacity));

for (const viewport of [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 414, height: 896 },
  { width: 844, height: 390 },
]) {
  test(`phones at ${viewport.width} x ${viewport.height}: a speech bubble next to the round button opens the sheet @mobile`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openWithLauncher(page, "/id/docs/introduction");
    await expect(launcher(page)).toHaveAttribute("data-bubble", "shown");
    await expect(bubble(page).locator(".coffee-name")).toHaveText(
      "Traktir kopi",
    );
    await expect(bubble(page).locator(".coffee-sub")).toBeHidden();
    expect(await bubbleOpacity(page)).toBe(1);
    expect(
      await bubble(page)
        .locator(".coffee-name")
        .evaluate((element) => getComputedStyle(element).fontSize),
    ).toBe("14px");

    const box = (await bubble(page).boundingBox())!;
    const button = (await toggle(page).boundingBox())!;
    const header = (await page.locator("body > header").first().boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(SIDE_MARGIN);
    expect(box.y + box.height).toBeLessThanOrEqual(
      viewport.height - SIDE_MARGIN,
    );
    expect(box.height).toBeGreaterThanOrEqual(36);
    expect(box.height).toBeLessThanOrEqual(40);
    // Left of the button with a small gap, centred on it.
    expect(button.x - (box.x + box.width)).toBe(10);
    expect(
      Math.abs(box.y + box.height / 2 - (button.y + button.height / 2)),
    ).toBeLessThanOrEqual(1);
    expect(overlaps(box, button)).toBe(false);
    expect(overlaps(box, header)).toBe(false);
    // The cup sits centred inside the round button.
    const cup = (await art(page).boundingBox())!;
    expect(cup.x - button.x).toBe(
      button.x + button.width - (cup.x + cup.width),
    );
    expect(cup.y - button.y).toBe(
      button.y + button.height - (cup.y + cup.height),
    );
    await expect(toggle(page)).toHaveAccessibleName("Traktir kopi");

    await bubble(page).click();
    await expect(card(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(card(page)).toBeHidden();
  });
}

test("the bubble steps away after a few seconds and while scrolling down, and comes back on scroll up @mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openWithLauncher(page);
  await expect(launcher(page)).toHaveAttribute("data-bubble", "shown");
  await page.clock.runFor(BUBBLE_MS);
  await expect(launcher(page)).toHaveAttribute("data-bubble", "hidden");
  // Hidden from sight, but still the button's label.
  await expect(toggle(page)).toHaveAccessibleName("Buy me a coffee");

  await page.mouse.wheel(0, -200);
  await page.evaluate(() => scrollTo(0, 1200));
  await page.evaluate(() => scrollTo(0, 800));
  await expect(launcher(page)).toHaveAttribute("data-bubble", "shown");
  await page.evaluate(() => scrollTo(0, 1600));
  await expect(launcher(page)).toHaveAttribute("data-bubble", "hidden");
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await expect(launcher(page)).toHaveAttribute("data-bubble", "shown");
});

test("desktop shows no bubble, the card carries the title", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openWithLauncher(page);
  const box = (await bubble(page).boundingBox())!;
  const card = (await toggle(page).boundingBox())!;
  expect(box.x).toBeGreaterThan(card.x);
  expect(box.x + box.width).toBeLessThan(card.x + card.width);
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
    await expect(art(page)).toHaveAttribute("data-lottie", /^(ready|still)$/);
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
    await toggle(page).hover();
    expect(await scan()).toEqual([]);
    await toggle(page).click();
    await expect(card(page)).toBeVisible();
    expect(await scan()).toEqual([]);
  });
}
