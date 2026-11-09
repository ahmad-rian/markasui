import { expect, test, type Page } from "@playwright/test";
import {
  frameworks,
  frameworksFor,
  openFixture,
  type Framework,
} from "./helpers";

/** Fixture, keyframe yang dipakai, tombol di kontennya, dan apakah lapisannya menerima pointer. */
const backgrounds = [
  {
    name: "background-beams",
    keyframe: "markas-beams-flow",
    button: "Join the waitlist",
    hoverable: false,
  },
  {
    name: "background-beams--features",
    keyframe: "markas-beams-fall",
    button: null,
    hoverable: false,
  },
  {
    name: "background-boxes",
    keyframe: "markas-boxes-glow",
    button: "Explore blocks",
    hoverable: true,
  },
  {
    name: "background-lines",
    keyframe: "markas-lines-draw",
    button: "Start sketching",
    hoverable: false,
  },
  {
    name: "gradient-border",
    keyframe: "markas-gb-spin",
    button: "Upgrade now",
    hoverable: false,
  },
] as const;

const layer = (page: Page) =>
  page.locator("#fixture .isolate > [aria-hidden=true]").first();

const animationNames = (page: Page, keyframe: string) =>
  page
    .locator(`#fixture [class*="animate-[${keyframe}"]`)
    .evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).animationName),
    );

for (const framework of frameworks) {
  test.describe(framework, () => {
    for (const { name, keyframe, button, hoverable } of backgrounds) {
      test(`${name}: layer is decorative and content stays clickable and reachable by Tab`, async ({
        page,
      }) => {
        await openFixture(page, framework, name);
        const decorative = layer(page);
        await expect(decorative).toHaveAttribute("aria-hidden", "true");
        await expect(decorative).toHaveCSS(
          "pointer-events",
          hoverable ? "auto" : "none",
        );
        if (!button) return;

        const target = page.getByRole("button", { name: button });
        await target.click();
        await expect(target).toBeFocused();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(target).toBeFocused();
      });

      test(`${name}: animates normally and stops with reduced motion`, async ({
        page,
      }) => {
        await openFixture(page, framework, name);
        const still = await animationNames(page, keyframe);
        expect(still.length).toBeGreaterThan(0);
        expect(new Set(still)).toEqual(new Set(["none"]));

        await page.emulateMedia({ reducedMotion: "no-preference" });
        const moving = await animationNames(page, keyframe);
        expect(new Set(moving)).toEqual(new Set([keyframe]));
      });
    }

    test("background-boxes: a tile lights up under the cursor and clears when it leaves", async ({
      page,
    }) => {
      await openFixture(page, framework, "background-boxes");
      const box = (await page.locator("#fixture .isolate").boundingBox())!;
      const point = { x: box.x + 24, y: box.y + box.height / 2 };
      const tileAt = () =>
        page.evaluate(({ x, y }) => {
          const element = document.elementFromPoint(x, y)!;
          return {
            isTile: element.matches("[aria-hidden=true] span"),
            background: getComputedStyle(element).backgroundColor,
          };
        }, point);

      await page.mouse.move(point.x, point.y);
      const lit = await tileAt();
      expect(lit.isTile).toBe(true);
      expect(lit.background).not.toBe("rgba(0, 0, 0, 0)");

      await page.mouse.move(box.x + box.width / 2, box.y + 4);
      await expect
        .poll(async () => (await tileAt()).background)
        .toBe("rgba(0, 0, 0, 0)");
    });
  });
}

test("beams, boxes, and lines draw the same shapes in Blade, React, and Vue", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const fixtures = [
    ["background-beams", "path"],
    ["background-beams--features", "span span"],
    ["background-lines--not-found", "path"],
    ["background-boxes--features", "span"],
  ] as const;
  for (const [name, selector] of fixtures) {
    const shapes = async (framework: Framework) => {
      await openFixture(page, framework, name);
      return layer(page)
        .locator(selector)
        .evaluateAll((items) =>
          items.map((item) => {
            const { x, y, width, height } = item.getBoundingClientRect();
            const { animationDelay, animationDuration } =
              getComputedStyle(item);
            return [
              item.getAttribute("d") ?? "",
              ...[x, y, width, height].map(Math.round),
              animationDelay,
              animationDuration,
            ].join(" ");
          }),
        );
    };
    const react = await shapes("react");
    expect(react.length, name).toBeGreaterThan(0);
    expect(await shapes("blade"), name).toEqual(react);
    expect(await shapes("vue"), name).toEqual(react);
  }
});

test("gradient-border: the glow layer sits behind and the field inside keeps focus", async ({
  page,
}) => {
  for (const framework of frameworksFor("gradient-border--prompt")) {
    await openFixture(page, framework, "gradient-border--prompt");
    const layers = page.locator("#fixture .isolate > [aria-hidden=true]");
    await expect(layers).toHaveCount(2);
    await expect(layers.first()).toHaveCSS("z-index", "-10");
    const field = page.getByRole("textbox", { name: "Ask the assistant" });
    await field.click();
    await expect(field).toBeFocused();
  }
});
