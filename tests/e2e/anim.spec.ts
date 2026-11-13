import { expect, test, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

/**
 * Akar komponen dicari lewat class, bukan `#fixture > div`: Astro membungkusnya dengan custom element
 * dan Angular dengan elemen host, jadi akarnya tidak selalu anak langsung #fixture.
 */
const marqueeRoot = (page: Page) =>
  page.locator("#fixture div.overflow-hidden").first();
const spotlightCard = (page: Page) =>
  page.locator('#fixture [class~="group/spotlight"]');

/** Jumlah animasi Web Animations API per playState di halaman. */
const playStates = (page: Page) =>
  page.evaluate(() => document.getAnimations().map((a) => a.playState));

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("avatar-group: named images, +N chip, and a tooltip on hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "avatar-group");
      const group = page.getByRole("group", { name: "Project members" });
      await expect(group.getByRole("img")).toHaveCount(4);
      await expect(group.getByText("3 more")).toHaveClass(/sr-only/);

      const item = group.locator(":scope > span").nth(1);
      const tooltip = item.locator(":scope > span[aria-hidden=true]");
      await expect(tooltip).toHaveText("Budi Santoso");
      await expect(tooltip).toHaveCSS("opacity", "0");
      await page.getByRole("img", { name: "Budi Santoso" }).hover();
      await expect(tooltip).toHaveCSS("opacity", "1");

      const chip = group.locator(":scope > span").last();
      await chip.hover();
      await expect(chip.locator(":scope > span[aria-hidden=true]")).toHaveText(
        "Maya Putri, Rizal Hakim, Ana Lim",
      );
    });

    test("number-ticker: reduced motion shows final values, screen readers get them too", async ({
      page,
    }) => {
      await openFixture(page, framework, "number-ticker");
      for (const value of ["12,480", "99.9%", "$84,200"]) {
        await expect(page.locator(".sr-only", { hasText: value })).toHaveCount(
          1,
        );
        await expect(
          page.locator(".col-start-1:not(.invisible)", { hasText: value }),
        ).toBeVisible();
      }
    });

    test("typing-text: reduced motion keeps the first word and reads every word", async ({
      page,
    }) => {
      await openFixture(page, framework, "typing-text");
      await expect(
        page.getByRole("heading", {
          name: "Build interfaces for Laravel, React, Vue",
        }),
      ).toBeVisible();
      const typed = page.locator("h2 span[aria-hidden=true]").first();
      await expect(typed).toHaveText("Laravel");
      await page.waitForTimeout(2500);
      await expect(typed).toHaveText("Laravel");
    });

    test("marquee: hidden inert copy and no animation with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "marquee");
      const copies = marqueeRoot(page).locator(":scope > div");
      await expect(copies).toHaveCount(2);
      await expect(copies.nth(0)).not.toHaveAttribute("aria-hidden");
      await expect(copies.nth(1)).toHaveAttribute("aria-hidden", "true");
      await expect(copies.nth(1)).toHaveAttribute("inert", "");
      expect(await playStates(page)).toEqual([]);
    });

    test("scroll-progress: End and Home in the focused region fill and empty the bar", async ({
      page,
    }) => {
      await openFixture(page, framework, "scroll-progress");
      const region = page.getByRole("region", { name: "Release notes" });
      const fill = region.locator("[aria-hidden=true] > div");
      await expect(fill).toHaveAttribute("style", /scaleX\(0\)/);

      await page.keyboard.press("Tab");
      await expect(region).toBeFocused();
      await page.keyboard.press("End");
      await expect(fill).toHaveAttribute("style", /scaleX\(1\)/);
      await page.keyboard.press("Home");
      await expect(fill).toHaveAttribute("style", /scaleX\(0\)/);
    });

    test("spotlight-card: light follows the pointer and shows on keyboard focus", async ({
      page,
    }) => {
      await openFixture(page, framework, "spotlight-card--pricing");
      const card = spotlightCard(page);
      const glow = card.locator(":scope > [aria-hidden=true]");
      await expect(glow).toHaveCSS("opacity", "0");

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Upgrade to Pro" }),
      ).toBeFocused();
      await expect(glow).toHaveCSS("opacity", "1");
      await page.keyboard.press("Shift+Tab");
      await expect(glow).toHaveCSS("opacity", "0");

      const box = (await card.boundingBox())!;
      await page.mouse.move(box.x + 30, box.y + 40);
      await expect(glow).toHaveCSS("opacity", "1");
      expect(
        await card.evaluate((el) => [
          el.style.getPropertyValue("--spot-x"),
          el.style.getPropertyValue("--spot-y"),
        ]),
      ).toEqual(["30px", "40px"]);
    });
  });

  test.describe(`${framework} with motion`, () => {
    test.use({ reducedMotion: "no-preference" });

    test("number-ticker: counts up to the final value", async ({ page }) => {
      await openFixture(page, framework, "number-ticker");
      const counter = page.locator(".col-start-1:not(.invisible)").first();
      expect(await counter.textContent()).not.toBe("12,480");
      await expect(counter).toHaveText("12,480", { timeout: 5000 });
    });

    test("typing-text: deletes the first word and types the next", async ({
      page,
    }) => {
      await openFixture(page, framework, "typing-text");
      const typed = page.locator("h2 span[aria-hidden=true]").first();
      await expect(typed).toHaveText("Laravel");
      await expect(typed).toHaveText("React", { timeout: 6000 });
    });

    test("marquee: runs and pauses while hovered", async ({ page }) => {
      await openFixture(page, framework, "marquee");
      expect(await playStates(page)).toEqual(["running", "running"]);
      await marqueeRoot(page).hover();
      await expect.poll(() => playStates(page)).toEqual(["paused", "paused"]);
      await page.mouse.move(0, 0);
      await expect.poll(() => playStates(page)).toEqual(["running", "running"]);
    });
  });
}
