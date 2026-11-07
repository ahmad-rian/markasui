import { expect, test, type Locator, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const translate = (locator: Locator) =>
  locator.evaluate((el) => (el as HTMLElement).style.translate);
const moving = (page: Page) =>
  page.emulateMedia({ reducedMotion: "no-preference" });

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("drag-elements: arrow keys move the focused item and Escape puts it back", async ({
      page,
    }) => {
      await openFixture(page, framework, "drag-elements");
      const board = page.getByRole("group", { name: "Moodboard" });
      const note = board.locator("> *").first();
      await page.keyboard.press("Tab");
      await expect(note).toBeFocused();
      await expect(note).toHaveAccessibleDescription(
        "Drag to move, or use the arrow keys. Escape puts it back",
      );

      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowUp");
      await expect.poll(() => translate(note)).toBe("10px -10px");
      await page.keyboard.press("Shift+ArrowRight");
      await expect.poll(() => translate(note)).toBe("60px -10px");
      expect(
        Number(await note.evaluate((el) => el.style.zIndex)),
      ).toBeGreaterThan(5);

      await page.keyboard.press("Escape");
      await expect.poll(() => translate(note)).toMatch(/^0px( 0px)?$/);
      await page.keyboard.press("Tab");
      await expect(board.locator("> *").nth(1)).toBeFocused();
    });

    test("drag-elements: the pointer drags an item but never out of the area", async ({
      page,
    }) => {
      await openFixture(page, framework, "drag-elements");
      const board = page.getByRole("group", { name: "Moodboard" });
      const sticker = board.getByText("Kopi susu");
      const area = (await board.boundingBox())!;
      const start = (await sticker.boundingBox())!;
      await page.mouse.move(start.x + 10, start.y + 10);
      await page.mouse.down();
      await expect(sticker).toHaveAttribute("data-dragging", "");
      await page.mouse.move(start.x + 70, start.y + 50, { steps: 5 });
      await expect.poll(() => translate(sticker)).toBe("60px 40px");
      await page.mouse.move(area.x + area.width + 300, start.y + 50, {
        steps: 5,
      });
      await page.mouse.up();
      await expect(sticker).not.toHaveAttribute("data-dragging");
      const end = (await sticker.boundingBox())!;
      expect(end.x + end.width).toBeLessThanOrEqual(area.x + area.width + 1);
    });

    test("drag-elements--return: a released tag springs back home", async ({
      page,
    }) => {
      await openFixture(page, framework, "drag-elements--return");
      const tag = page.getByRole("group", { name: "Skills" }).getByText("Vue");
      const box = (await tag.boundingBox())!;
      await page.mouse.move(box.x + 8, box.y + 8);
      await page.mouse.down();
      await page.mouse.move(box.x + 48, box.y + 28, { steps: 4 });
      await expect.poll(() => translate(tag)).toBe("40px 20px");
      await page.mouse.up();
      await expect.poll(() => translate(tag)).toMatch(/^0px( 0px)?$/);
    });

    test("float: children loop, pause on hover, and follow the pointer with parallax", async ({
      page,
    }) => {
      await moving(page);
      await openFixture(page, framework, "float");
      const tiles = page.locator("#fixture [aria-hidden=true] > span");
      await expect(tiles).toHaveCount(5);
      const states = () =>
        tiles.evaluateAll((els) =>
          els.map((el) => el.getAnimations()[0]?.playState ?? "none"),
        );
      await expect.poll(states).toEqual(Array(5).fill("running"));

      const first = tiles.first();
      const box = (await first.boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect.poll(async () => (await states())[0]).toBe("paused");
      await expect.poll(() => translate(first)).not.toBe("");
      await page.mouse.move(5, 5);
      await expect.poll(async () => (await states())[0]).toBe("running");
    });

    test("float: stays still with reduced motion", async ({ page }) => {
      await openFixture(page, framework, "float--orbit");
      const animations = await page
        .locator("#fixture [aria-hidden=true] > span")
        .evaluateAll((els) => els.flatMap((el) => el.getAnimations()).length);
      expect(animations).toBe(0);
    });

    test("screensaver--many: elements travel and stop while hovered", async ({
      page,
    }) => {
      await moving(page);
      await openFixture(page, framework, "screensaver--many");
      const chip = page.getByText("Rania Putri").locator("..");
      const before = await translate(chip);
      await expect.poll(() => translate(chip)).not.toBe(before);

      const area = page.locator("#fixture .h-52");
      await area.hover();
      const paused = await translate(chip);
      await page.waitForTimeout(300);
      expect(await translate(chip)).toBe(paused);
      await page.mouse.move(5, 5);
      await expect.poll(() => translate(chip)).not.toBe(paused);
    });

    test("magnet: a nearby mouse pulls the button and it springs back", async ({
      page,
    }) => {
      await moving(page);
      await openFixture(page, framework, "magnet");
      const magnet = page
        .getByRole("button", { name: "Get started" })
        .locator("..");
      const box = (await magnet.boundingBox())!;
      // Listener terpasang setelah IntersectionObserver melapor; ulangi gerakan sampai terlihat.
      await expect(async () => {
        await page.mouse.move(5, 5);
        await page.mouse.move(box.x + box.width + 30, box.y + box.height / 2, {
          steps: 3,
        });
        await expect(magnet).toHaveAttribute("data-state", "active", {
          timeout: 500,
        });
      }).toPass({ timeout: 10_000 });
      expect(parseFloat(await translate(magnet))).toBeGreaterThan(5);

      await page.mouse.move(5, 5, { steps: 3 });
      await expect(magnet).not.toHaveAttribute("data-state");
      expect(await translate(magnet)).toBe("");
    });

    test("magnet: keyboard focus lifts the button and reduced motion keeps it still", async ({
      page,
    }) => {
      await openFixture(page, framework, "magnet");
      const button = page.getByRole("button", { name: "Get started" });
      const magnet = button.locator("..");
      const box = (await magnet.boundingBox())!;
      await page.mouse.move(box.x + box.width + 20, box.y + 10);
      await expect(magnet).not.toHaveAttribute("data-state");
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      expect(await magnet.evaluate((el) => getComputedStyle(el).scale)).toBe(
        "1.05",
      );
    });
  });
}
