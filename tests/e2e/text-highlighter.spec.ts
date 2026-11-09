import { expect, test, type Locator, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const highlights = (page: Page) => page.locator("[data-direction]");

const states = (page: Page) =>
  highlights(page).evaluateAll((els) =>
    els.map((el) => el.getAttribute("data-state")),
  );

const size = (el: Locator) =>
  el.evaluate((node) => getComputedStyle(node).backgroundSize);

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("text-highlighter: in view highlights are shown at once with reduced motion and the text stays plain", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-highlighter");
      await expect(page.locator("p")).toContainText(
        "Keep body text at 45 to 75 characters per line, give it a line height near 1.5, and let headings sit closer to the text they introduce than to the one above.",
      );
      const first = highlights(page).first();
      expect(await size(first)).toBe("100% 100%");
      await expect
        .poll(() => states(page))
        .toEqual(["active", "active", "active"]);
      await expect(first).toHaveCSS("transition-property", "none");
      await expect(first).not.toHaveAttribute("aria-hidden");
    });

    test("text-highlighter: hover and keyboard focus on the link draw the highlight", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-highlighter--directions");
      expect(await states(page)).toEqual([
        "inactive",
        "inactive",
        "inactive",
        "inactive",
      ]);
      const ttb = highlights(page).nth(2);
      expect(await size(ttb)).toBe("100% 0%");

      const rtl = page.getByRole("link", { name: "Right to left" });
      await rtl.hover();
      await expect(rtl.locator("[data-direction=rtl]")).toHaveAttribute(
        "data-state",
        "active",
      );
      await page.mouse.move(700, 580);
      await expect(rtl.locator("[data-direction]")).toHaveAttribute(
        "data-state",
        "inactive",
      );

      await page.keyboard.press("Tab");
      const first = page.getByRole("link", { name: "Left to right" });
      await expect(first).toBeFocused();
      await expect(first.locator("[data-direction]")).toHaveAttribute(
        "data-state",
        "active",
      );
      await page.keyboard.press("Tab");
      await expect(first.locator("[data-direction]")).toHaveAttribute(
        "data-state",
        "inactive",
      );
      await expect(rtl.locator("[data-direction]")).toHaveAttribute(
        "data-state",
        "active",
      );
    });

    test("text-highlighter: Highlight and Reset buttons control every highlight", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-highlighter--manual");
      expect(await states(page)).toEqual(["inactive", "inactive", "inactive"]);
      await page.getByRole("button", { name: "Highlight" }).click();
      await expect
        .poll(() => states(page))
        .toEqual(["active", "active", "active"]);
      expect(await size(highlights(page).last())).toBe("100% 100%");
      await page.getByRole("button", { name: "Reset" }).click();
      await expect
        .poll(() => states(page))
        .toEqual(["inactive", "inactive", "inactive"]);
    });
  });

  test.describe(`${framework} with motion`, () => {
    test.use({ reducedMotion: "no-preference" });

    test("text-highlighter: grows with a CSS transition when it scrolls into view", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-highlighter--variants");
      const first = highlights(page).first();
      await expect(first).toHaveCSS("transition-property", "background-size");
      await expect(first).toHaveCSS("transition-duration", "0.7s");
      await expect(highlights(page).nth(3)).toHaveCSS(
        "transition-delay",
        "0.45s",
      );
      await expect
        .poll(() => states(page))
        .toEqual(["active", "active", "active", "active"]);
      await expect.poll(() => size(highlights(page).last())).toBe("100% 100%");
    });

    test("text-highlighter: hover draws from the chosen direction", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-highlighter--directions");
      const btt = page.getByRole("link", { name: "Bottom to top" });
      const mark = btt.locator("[data-direction]");
      await expect(mark).toHaveCSS("background-position", "50% 100%");
      await btt.hover();
      await expect(mark).toHaveAttribute("data-state", "active");
      await expect.poll(() => size(mark)).toBe("100% 100%");
    });
  });
}

test("text-highlighter: Blade answers the markas-highlight event with a direction", async ({
  page,
}) => {
  await openFixture(page, "blade", "text-highlighter--manual");
  await page.evaluate(() =>
    window.dispatchEvent(
      new CustomEvent("markas-highlight", { detail: { direction: "rtl" } }),
    ),
  );
  await expect.poll(() => states(page)).toEqual(["active", "active", "active"]);
  await expect(highlights(page).first()).toHaveAttribute(
    "data-direction",
    "rtl",
  );
  await page.evaluate(() =>
    window.dispatchEvent(new CustomEvent("markas-highlight-reset")),
  );
  await expect
    .poll(() => states(page))
    .toEqual(["inactive", "inactive", "inactive"]);
});
