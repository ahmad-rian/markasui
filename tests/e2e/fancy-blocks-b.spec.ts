import { expect, test, type Locator, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const animate = (page: Page) =>
  page.emulateMedia({ reducedMotion: "no-preference" });

/** Sweep the pointer left to right across the middle of a box. */
async function sweep(page: Page, target: Locator, steps = 24) {
  const box = (await target.boundingBox())!;
  await page.mouse.move(box.x + 8, box.y + box.height / 2);
  for (let i = 1; i <= steps; i++)
    await page.mouse.move(
      box.x + 8 + ((box.width - 16) * i) / steps,
      box.y + box.height / 2 + (i % 2 ? 12 : -12),
    );
}

const trailLayer = (page: Page) =>
  page.locator("#fixture [aria-hidden=true].pointer-events-none").first();
const trailRoot = (page: Page) => trailLayer(page).locator("..");

/** Sum of alpha over the whole canvas: 0 when nothing is lit. */
const litAlpha = (page: Page) =>
  page.locator("#fixture canvas").evaluate((canvas: HTMLCanvasElement) => {
    const data = canvas
      .getContext("2d")!
      .getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0;
    for (let i = 3; i < data.length; i += 4) sum += data[i]!;
    return sum;
  });

const controlY = (line: Locator) =>
  line
    .locator("path")
    .evaluate((path) => Number(path.getAttribute("d")!.split(" ")[2]));

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("image-trail: clones items along the pointer, caps them, and clears them", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "image-trail");
      const layer = trailLayer(page);
      // Listeners attach right after the fixture is ready (hydration/Alpine): sweep until items show.
      await expect(async () => {
        await sweep(page, trailRoot(page));
        expect(await layer.locator("> *").count()).toBeGreaterThan(2);
      }).toPass({ timeout: 10_000 });
      expect(await layer.locator("> *").count()).toBeLessThanOrEqual(12);
      await page.mouse.move(2, 2);
      await expect(layer.locator("> *")).toHaveCount(0, { timeout: 3000 });
    });

    test("image-trail: stack piles items until the pointer leaves", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "image-trail--team");
      const layer = trailLayer(page);
      await expect(async () => {
        await sweep(page, trailRoot(page), 12);
        expect(await layer.locator("> *").count()).toBeGreaterThan(1);
      }).toPass({ timeout: 10_000 });
      await page.waitForTimeout(900);
      const piled = await layer.locator("> *").count();
      expect(piled).toBeGreaterThan(1);
      expect(piled).toBeLessThanOrEqual(6);
      await page.mouse.move(2, 2);
      await expect(layer.locator("> *")).toHaveCount(0, { timeout: 3000 });
    });

    test("image-trail: draws nothing with reduced motion", async ({ page }) => {
      await openFixture(page, framework, "image-trail--pricing");
      await sweep(page, trailRoot(page));
      await page.waitForTimeout(300);
      await expect(trailLayer(page).locator("> *")).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Start free trial" }),
      ).toBeVisible();
    });

    test("stacking-cards: covered cards shrink as the next ones stack on scroll", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "stacking-cards");
      const region = page.getByRole("region", { name: "Product features" });
      const first = page.locator("article").first();
      await expect(async () => {
        await region.evaluate((el) => (el.scrollTop = 0));
        await region.evaluate((el) => (el.scrollTop = 520));
        await expect
          .poll(
            () =>
              first.evaluate((el) =>
                Number(el.style.getPropertyValue("--stack-depth")),
              ),
            { timeout: 1000 },
          )
          .toBeGreaterThan(1);
      }).toPass({ timeout: 10_000 });
      await expect
        .poll(() => first.evaluate((el) => getComputedStyle(el).scale))
        .not.toBe("1");
      expect(
        await page
          .locator("article")
          .last()
          .evaluate((el) => el.style.getPropertyValue("--stack-depth")),
      ).toBe("0");
    });

    test("stacking-cards: a covered card with keyboard focus comes to the front", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "stacking-cards--pricing");
      const region = page.getByRole("region", { name: "Pricing plans" });
      await region.evaluate((el) => (el.scrollTop = 560));
      const starter = page.locator("article").first();
      await expect
        .poll(() =>
          starter.evaluate((el) =>
            Number(el.style.getPropertyValue("--stack-depth")),
          ),
        )
        .toBeGreaterThan(0.5);

      await page.keyboard.press("Tab");
      await expect(region).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Choose Starter" }),
      ).toBeFocused();
      await expect
        .poll(() => starter.evaluate((el) => getComputedStyle(el).zIndex))
        .toBe("10");
      await expect
        .poll(() => starter.evaluate((el) => getComputedStyle(el).filter))
        .toBe("none");
    });

    test("stacking-cards: still sticks but never changes with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "stacking-cards--onboarding");
      await expect(page.getByRole("list")).toBeVisible();
      await expect(page.getByRole("listitem")).toHaveCount(4);
      const region = page.getByRole("region", { name: "Getting started" });
      await region.evaluate((el) => (el.scrollTop = 500));
      await page.waitForTimeout(200);
      const first = page.getByRole("listitem").first();
      expect(
        await first.evaluate((el) =>
          el.style.getPropertyValue("--stack-depth"),
        ),
      ).toBe("");
      expect(await first.evaluate((el) => getComputedStyle(el).position)).toBe(
        "sticky",
      );
      expect(await first.evaluate((el) => getComputedStyle(el).rotate)).toMatch(
        /^(none|0deg)$/,
      );
    });

    test("elastic-line: bends toward the pointer and springs back", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "elastic-line");
      const line = page.getByRole("separator");
      await expect(line).toHaveAttribute("aria-orientation", "horizontal");
      const box = (await line.boundingBox())!;
      await expect(async () => {
        await page.mouse.move(box.x + box.width / 2, box.y - 20);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height - 4, {
          steps: 4,
        });
        await expect
          .poll(() => controlY(line), { timeout: 1000 })
          .toBeGreaterThan(70);
      }).toPass({ timeout: 10_000 });

      await page.mouse.move(2, 2);
      await expect.poll(() => controlY(line), { timeout: 5000 }).toBe(50);
    });

    test("elastic-line: push bends away, and vertical lines are separators", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "elastic-line--stats");
      const lines = page.getByRole("separator");
      await expect(lines).toHaveCount(2);
      await expect(lines.first()).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
      const line = lines.first();
      const box = (await line.boundingBox())!;
      const controlX = () =>
        line
          .locator("path")
          .evaluate((path) =>
            Number(path.getAttribute("d")!.split("Q")[1]!.split(" ")[0]),
          );
      await expect(async () => {
        await page.mouse.move(box.x - 10, box.y + box.height / 2);
        await page.mouse.move(box.x + 4, box.y + box.height / 2);
        // Pointer on the left: the line bends right.
        await expect.poll(controlX, { timeout: 1000 }).toBeGreaterThan(55);
      }).toPass({ timeout: 10_000 });
    });

    test("elastic-line: decorative underline is hidden and stays straight with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "elastic-line--heading");
      await expect(page.getByRole("separator")).toHaveCount(0);
      const line = page.locator("#fixture div[aria-hidden=true]:has(path)");
      const box = (await line.boundingBox())!;
      await page.mouse.move(box.x + 40, box.y + box.height / 2);
      await page.mouse.move(box.x + 40, box.y + box.height - 2, { steps: 4 });
      await page.waitForTimeout(200);
      expect(await controlY(line)).toBe(50);
    });

    test("pixel-trail: lights cells under the pointer and fades them", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "pixel-trail");
      const hero = page.locator("#fixture canvas").locator("..");
      await expect(async () => {
        await sweep(page, hero);
        expect(await litAlpha(page)).toBeGreaterThan(0);
      }).toPass({ timeout: 10_000 });
      await page.mouse.move(2, 2);
      await expect.poll(() => litAlpha(page), { timeout: 3000 }).toBe(0);
    });

    test("pixel-trail: keyboard focus lights the cells around the focused link", async ({
      page,
    }) => {
      await animate(page);
      await openFixture(page, framework, "pixel-trail--navbar");
      await expect(async () => {
        await page.mouse.move(2, 2);
        await page.locator("body").focus();
        await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: "Docs" })).toBeFocused();
        await expect
          .poll(() => litAlpha(page), { timeout: 500 })
          .toBeGreaterThan(0);
      }).toPass({ timeout: 10_000 });
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: "Components" }),
      ).toBeFocused();
    });

    test("pixel-trail: draws nothing with reduced motion", async ({ page }) => {
      await openFixture(page, framework, "pixel-trail--sketch");
      await sweep(page, page.locator("#fixture canvas").locator(".."));
      await page.waitForTimeout(300);
      expect(await litAlpha(page)).toBe(0);
    });
  });
}
