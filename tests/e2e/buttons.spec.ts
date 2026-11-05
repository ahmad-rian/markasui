import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const HOLD_DURATION = 1500;

const sheenAnimations = (page: Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (animation) =>
            !(animation instanceof CSSTransition) &&
            !(animation instanceof CSSAnimation),
        ).length,
  );

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("copy-button: Enter copies the text, swaps to the check, and announces Copied", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await openFixture(page, framework, "copy-button");
      const button = page.getByRole("button", { name: "Copy command" });
      const status = page.getByRole("status");

      await expect(button).toHaveAttribute("data-state", "idle");
      await expect(status).toHaveText("");
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      await page.keyboard.press("Enter");

      await expect(button).toHaveAttribute("data-state", "copied");
      await expect(status).toHaveText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        "pnpm dlx markasui add button",
      );
      await expect(button).toHaveAttribute("data-state", "idle", {
        timeout: 4000,
      });
      await expect(status).toHaveText("");
    });

    test("copy-button: a labelled button keeps its label as the name", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await openFixture(page, framework, "copy-button--api-key");
      const button = page.getByRole("button", { name: "Copy key" });
      await button.click();
      await expect(button).toHaveAttribute("data-state", "copied");
      await expect(page.getByRole("status")).toHaveText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        "sk_live_51Hx9aT2eZvKYlo2C",
      );
    });

    test("shimmer-button: the sheen runs with motion and stays still with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "shimmer-button");
      await expect(
        page.getByRole("button", { name: "Get started for free" }),
      ).toBeVisible();
      expect(await sheenAnimations(page)).toBe(0);

      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "shimmer-button");
      await expect.poll(() => sheenAnimations(page)).toBe(1);
    });

    test("ripple-button: click and Enter add a wave that removes itself", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "ripple-button");
      const button = page.getByRole("button", { name: "Add to cart" });
      const waves = button.locator("span[aria-hidden=true] > span");

      await button.click({ position: { x: 10, y: 10 } });
      await expect(waves).toHaveCount(1);
      await expect(waves).toHaveCount(0);

      await button.focus();
      await page.keyboard.press("Enter");
      await expect(waves).toHaveCount(1);
      await expect(waves).toHaveCount(0);
    });

    test("ripple-button: reduced motion draws no wave but still clicks", async ({
      page,
    }) => {
      await openFixture(page, framework, "ripple-button");
      const button = page.getByRole("button", { name: "Save for later" });
      const clicked = page.evaluate(
        () =>
          new Promise<boolean>((resolve) =>
            document.addEventListener("click", () => resolve(true), {
              once: true,
            }),
          ),
      );
      await button.click();
      expect(await clicked).toBe(true);
      await expect(button.locator("span[aria-hidden=true] > span")).toHaveCount(
        0,
      );
    });

    test("flip-button: focus and hover flip to the back, the name stays the front label", async ({
      page,
    }) => {
      await openFixture(page, framework, "flip-button");
      const button = page.getByRole("button", { name: "Create account" });
      const inner = button.locator("> span");
      const turned = () =>
        inner.evaluate((element) => getComputedStyle(element).transform);

      expect(await turned()).toBe("none");
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      await expect.poll(turned).not.toBe("none");
      await page.keyboard.press("Tab");
      await expect.poll(turned).toBe("none");

      await page.getByRole("button", { name: "Start free trial" }).hover();
      await expect(
        page
          .getByRole("button", { name: "Start free trial" })
          .locator("> span"),
      ).not.toHaveCSS("transform", "none");
      await expect(button).toHaveAccessibleName("Create account");
    });

    test("hold-button: holding Space completes, releasing early cancels", async ({
      page,
    }) => {
      await openFixture(page, framework, "hold-button");
      const button = page.getByRole("button", { name: "Hold to delete" });
      await expect(button).toHaveAccessibleDescription(
        "Press and hold to confirm",
      );

      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      await page.keyboard.down("Space");
      await expect(button).toHaveAttribute("data-state", "holding");
      await page.keyboard.up("Space");
      await expect(button).toHaveAttribute("data-state", "idle");

      await page.keyboard.down("Enter");
      await expect(button).toHaveAttribute("data-state", "holding");
      await expect(button).toHaveAttribute("data-state", "complete", {
        timeout: HOLD_DURATION + 2000,
      });
      await page.keyboard.up("Enter");
      await expect(button).toHaveAttribute("data-state", "idle");
    });

    test("hold-button: holding the pointer completes, leaving cancels", async ({
      page,
    }) => {
      await openFixture(page, framework, "hold-button");
      const button = page.getByRole("button", { name: "Hold to delete" });
      await button.hover();

      await page.mouse.down();
      await expect(button).toHaveAttribute("data-state", "holding");
      await page.mouse.move(0, 0);
      await expect(button).toHaveAttribute("data-state", "idle");

      await button.hover();
      await page.mouse.down();
      await expect(button).toHaveAttribute("data-state", "complete", {
        timeout: HOLD_DURATION + 2000,
      });
      await page.mouse.up();
      await expect(button).toHaveAttribute("data-state", "idle");
    });

    test("github-stars-button: link with the full count for screen readers and a count-up", async ({
      page,
    }) => {
      await openFixture(page, framework, "github-stars-button");
      const link = page.getByRole("link", {
        name: "Star on GitHub 12,480 stars",
      });
      await expect(link).toHaveAttribute(
        "href",
        "https://github.com/markasui/markasui",
      );
      await expect(link.locator("span[aria-hidden=true]").last()).toHaveText(
        "12.5k",
      );

      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "github-stars-button");
      await expect(
        page.getByRole("link", { name: "Star on GitHub 12,480 stars" }),
      ).toBeVisible();
      await expect(link.locator("span[aria-hidden=true]").last()).toHaveText(
        "12.5k",
      );
    });
  });
}

for (const theme of themes) {
  test(`copy-button copied (${theme}) tampil sama`, async ({
    page,
    context,
  }, testInfo) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "copy-button--variants",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Copy ID" }).first().click();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });

  test(`flip-button flipped (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "flip-button--variants",
      theme,
      async (p) => {
        await p.keyboard.press("Tab");
        return screenshot(p);
      },
    );
  });
}
