import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const depthOf = (page: Page, name: string) =>
  page
    .getByRole("group", { name, includeHidden: true })
    .getAttribute("data-depth");

const openCard = async (page: Page, name: RegExp) => {
  await page.getByRole("button", { name }).click();
  await page.locator("dialog[open]").waitFor();
};

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("card-stack: arrow keys and buttons move through the loop", async ({
      page,
    }) => {
      await openFixture(page, framework, "card-stack");
      const region = page.getByRole("region", {
        name: "Customer testimonials",
      });
      const status = region.locator("[aria-live=polite]");

      await page.keyboard.press("Tab");
      await expect(region.locator("[tabindex='0']").first()).toBeFocused();
      await page.keyboard.press("ArrowRight");
      expect(await depthOf(page, "2 of 4")).toBe("0");
      expect(await depthOf(page, "1 of 4")).toBe("3");
      await expect(status).toHaveText("2 of 4");

      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      expect(await depthOf(page, "4 of 4")).toBe("0");
      await expect(status).toHaveText("4 of 4");

      await page.getByRole("button", { name: "Next card" }).click();
      expect(await depthOf(page, "1 of 4")).toBe("0");
      await page.getByRole("button", { name: "Previous card" }).click();
      expect(await depthOf(page, "4 of 4")).toBe("0");
    });

    test("card-stack: only the top card is reachable with Tab", async ({
      page,
    }) => {
      await openFixture(page, framework, "card-stack--tips");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(page.locator("[data-depth='0'] a")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Previous tip" }),
      ).toBeFocused();
      expect(
        await page
          .locator("[data-depth='1']")
          .evaluate((el) => (el as HTMLElement).inert),
      ).toBe(true);
    });

    test("card-stack: dragging the top card sideways throws it", async ({
      page,
    }) => {
      await openFixture(page, framework, "card-stack");
      const top = page.getByRole("group", { name: "1 of 4" });
      const box = (await top.boundingBox())!;
      const y = box.y + box.height / 2;

      // A short drag springs back.
      await page.mouse.move(box.x + box.width / 2, y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 30, y, { steps: 3 });
      await page.mouse.up();
      expect(await depthOf(page, "1 of 4")).toBe("0");

      await page.mouse.move(box.x + box.width / 2, y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 200, y, { steps: 5 });
      await page.mouse.up();
      expect(await depthOf(page, "2 of 4")).toBe("0");
      expect(await depthOf(page, "1 of 4")).toBe("3");
    });

    test("expandable-card: Enter opens the dialog, Escape closes and returns focus", async ({
      page,
    }) => {
      await openFixture(page, framework, "expandable-card");
      const card = page.getByRole("button", { name: /Desk lamp/ });
      await page.keyboard.press("Tab");
      await expect(card).toBeFocused();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog", { name: "Desk lamp" });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
      await expect(card).toHaveAttribute("data-state", "open");
      await expect(dialog.getByText("USB-C powered")).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(card).toBeFocused();
      await expect(card).toHaveAttribute("data-state", "closed");
    });

    test("expandable-card: Space opens, the backdrop and close button close", async ({
      page,
    }) => {
      await openFixture(page, framework, "expandable-card");
      const card = page.getByRole("button", { name: /Wool throw/ });
      await card.focus();
      await page.keyboard.press("Space");
      const dialog = page.getByRole("dialog", { name: "Wool throw" });
      await expect(dialog).toBeVisible();
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();

      await card.click();
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Close" }).click();
      await expect(dialog).toBeHidden();
      await expect(card).toBeFocused();
    });

    test("expandable-card: the open view grows from the card with motion", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "expandable-card");
      const card = page.getByRole("button", { name: /Ceramic mug/ });
      const from = (await card.boundingBox())!;
      await card.click();
      const width = () =>
        page
          .locator("dialog[open]")
          .evaluate((el) => el.getBoundingClientRect().width);
      const start = await width();
      await expect.poll(width).toBeGreaterThan(from.width + 150);
      const end = await width();
      expect(start).toBeLessThan(end - 20);

      await page.keyboard.press("Escape");
      await expect(page.locator("dialog[open]")).toHaveCount(1);
      await expect(page.locator("dialog[open]")).toHaveCount(0);
      await expect(card).toBeFocused();
    });

    test("currency-input: formats while typing and keeps the caret", async ({
      page,
    }) => {
      await openFixture(page, framework, "currency-input");
      const field = page.getByLabel("Top-up amount");
      const hidden = page.locator("input[type=hidden][name=amount]");
      await expect(field).toHaveValue("100.000");
      await expect(hidden).toHaveValue("100000");

      await field.fill("");
      await field.pressSequentially("12500000");
      await expect(field).toHaveValue("12.500.000");
      await expect(hidden).toHaveValue("12500000");

      // Type a 9 right after the first digit: the caret stays after the 9.
      await field.evaluate((el: HTMLInputElement) =>
        el.setSelectionRange(1, 1),
      );
      await page.keyboard.type("9");
      await expect(field).toHaveValue("192.500.000");
      expect(
        await field.evaluate((el: HTMLInputElement) => el.selectionStart),
      ).toBe(2);

      // Backspace after a separator deletes the digit before it.
      await field.evaluate((el: HTMLInputElement) =>
        el.setSelectionRange(4, 4),
      );
      await page.keyboard.press("Backspace");
      await expect(field).toHaveValue("19.500.000");

      // Blur clamps to max.
      await page.keyboard.press("Tab");
      await expect(field).toHaveValue("10.000.000");
      await expect(hidden).toHaveValue("10000000");
    });

    test("currency-input: chips set the amount and are toggle buttons", async ({
      page,
    }) => {
      await openFixture(page, framework, "currency-input");
      const group = page.getByRole("group", { name: "Quick amounts" });
      const chip = group.getByRole("button", { name: "500rb" });
      await expect(
        group.getByRole("button", { name: "100rb" }),
      ).toHaveAttribute("aria-pressed", "true");
      await chip.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByLabel("Top-up amount")).toHaveValue("500.000");
      await expect(page.locator("input[name=amount]")).toHaveValue("500000");
      await expect(chip).toHaveAttribute("aria-pressed", "true");
      await expect(
        group.getByRole("button", { name: "100rb" }),
      ).toHaveAttribute("aria-pressed", "false");
    });

    test("currency-input: chips count up with motion", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "currency-input");
      const field = page.getByLabel("Top-up amount");
      await page.getByRole("button", { name: "1jt" }).click();
      await expect(field).not.toHaveValue("1.000.000", { timeout: 100 });
      await expect(field).toHaveValue("1.000.000");
    });

    test("currency-input: USD uses comma thousands and two decimals", async ({
      page,
    }) => {
      await openFixture(page, framework, "currency-input--usd");
      const field = page.getByLabel("Monthly budget");
      await expect(field).toHaveValue("1,250.50");
      await field.fill("");
      await field.pressSequentially("98765.432");
      await expect(field).toHaveValue("98,765.43");
      await expect(page.locator("input[name=budget]")).toHaveValue("98765.43");
      await page.getByRole("button", { name: "$1K" }).click();
      await expect(field).toHaveValue("1,000");
    });
  });
}

for (const theme of themes) {
  test(`expandable-card open (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "expandable-card",
      theme,
      async (p) => {
        await openCard(p, /Ceramic mug/);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`card-stack after a move (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "card-stack",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Next card" }).click();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });

  test(`currency-input after picking a chip (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "currency-input",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "250rb" }).click();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });
}
