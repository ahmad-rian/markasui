import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

/** The main fixture shows one toggle per animation, in this order. */
const animations = ["rotate", "morph", "flip", "slide", "eclipse", "spring"];
const toggleFor = (page: Page, animation: string) =>
  page.getByRole("button").nth(animations.indexOf(animation));

const isDark = (page: Page) =>
  page.evaluate(() => document.documentElement.classList.contains("dark"));

for (const framework of frameworks) {
  test.describe(framework, () => {
    for (const theme of themes) {
      test(`theme-toggle: loading the ${theme} fixture keeps the page theme`, async ({
        page,
      }) => {
        await openFixture(page, framework, "theme-toggle", theme);
        expect(await isDark(page)).toBe(theme === "dark");
        const expected =
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
        await expect(page.getByRole("button", { name: expected })).toHaveCount(
          6,
        );
      });
    }

    test("theme-toggle: click switches the dark class, label, storage, and event", async ({
      page,
    }) => {
      await openFixture(page, framework, "theme-toggle");
      await page.evaluate(() => {
        document.addEventListener("markas-theme-change", (event) => {
          document.body.dataset.lastTheme = String(
            (event as CustomEvent).detail,
          );
        });
      });
      const toggle = page
        .getByRole("button", { name: "Switch to dark theme" })
        .first();
      await toggle.click();

      expect(await isDark(page)).toBe(true);
      await expect(
        page.getByRole("button", { name: "Switch to light theme" }),
      ).toHaveCount(6);
      await expect(page.locator("body")).toHaveAttribute(
        "data-last-theme",
        "dark",
      );
      expect(
        await page.evaluate(() => localStorage.getItem("markas-theme")),
      ).toBe("dark");

      await page
        .getByRole("button", { name: "Switch to light theme" })
        .nth(3)
        .click();
      expect(await isDark(page)).toBe(false);
      await expect(page.locator("body")).toHaveAttribute(
        "data-last-theme",
        "light",
      );
    });

    test("theme-toggle: Enter and Space toggle from the keyboard", async ({
      page,
    }) => {
      await openFixture(page, framework, "theme-toggle");
      await page.keyboard.press("Tab");
      const first = toggleFor(page, "rotate");
      await expect(first).toBeFocused();
      await page.keyboard.press("Enter");
      expect(await isDark(page)).toBe(true);
      await expect(first).toHaveAccessibleName("Switch to light theme");
      await page.keyboard.press("Space");
      expect(await isDark(page)).toBe(false);
      await expect(first).toHaveAccessibleName("Switch to dark theme");
    });

    test("theme-toggle: a saved choice wins on the next load", async ({
      page,
    }) => {
      await openFixture(page, framework, "theme-toggle");
      await page.evaluate(() => localStorage.setItem("markas-theme", "dark"));
      await openFixture(page, framework, "theme-toggle");
      expect(await isDark(page)).toBe(true);
    });

    test("theme-toggle: with text, the visible label is the name", async ({
      page,
    }) => {
      await openFixture(page, framework, "theme-toggle--with-label");
      const toggle = page.getByRole("button", { name: "Dark mode" }).first();
      await expect(toggle).toBeVisible();
      await toggle.click();
      expect(await isDark(page)).toBe(true);
      await expect(
        page.getByRole("button", { name: "Light mode" }),
      ).toHaveCount(3);
    });
  });
}

for (const theme of themes) {
  test(`theme-toggle: parity after a click from ${theme}`, async ({
    page,
  }, testInfo) => {
    // Each framework starts from the fixture theme, not the choice the previous one saved.
    await page.addInitScript(() => localStorage.clear());
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "theme-toggle",
      theme,
      async (p) => {
        await toggleFor(p, "morph").click();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });
}

const running = (page: Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length,
  );

test.describe("theme-toggle motion", () => {
  test.use({ reducedMotion: "no-preference" });

  for (const framework of frameworks) {
    for (const animation of animations) {
      test(`theme-toggle: ${framework} ${animation} plays its keyframes on click`, async ({
        page,
      }) => {
        await openFixture(page, framework, "theme-toggle");
        const toggle = toggleFor(page, animation);
        await expect(toggle).toHaveAttribute("data-state", "light");
        await toggle.click();
        await expect(toggle).toHaveAttribute("data-state", "dark");
        expect(await running(page)).toBeGreaterThan(0);
      });
    }

    test(`theme-toggle: ${framework} Play all animates every toggle and keeps the theme`, async ({
      page,
    }) => {
      await openFixture(page, framework, "theme-toggle");
      await page.getByRole("button", { name: "Play all" }).click();
      expect(await running(page)).toBeGreaterThanOrEqual(animations.length);
      expect(await isDark(page)).toBe(false);
    });
  }
});
