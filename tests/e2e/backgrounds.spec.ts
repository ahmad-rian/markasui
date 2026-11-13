import { expect, test, type Page } from "@playwright/test";
import {
  frameworks,
  frameworksFor,
  openFixture,
  type Framework,
} from "./helpers";

/** Fixture utama, keyframe yang dipakai, dan tombol pertama di kontennya. */
const backgrounds = [
  { name: "dot-pattern", keyframe: null, button: "Get started" },
  { name: "grid-pattern", keyframe: "markas-grid-cell", button: "Start free" },
  {
    name: "aurora-background",
    keyframe: "markas-aurora-a",
    button: "Try it free",
  },
  {
    name: "stars-background",
    keyframe: "markas-twinkle",
    button: "Read the announcement",
  },
  {
    name: "retro-grid",
    keyframe: "markas-retro-grid",
    button: "Join the beta",
  },
  {
    name: "ripple-background",
    keyframe: "markas-ripple",
    button: "Browse integrations",
  },
] as const;

const layer = (page: Page) =>
  page.locator("#fixture .isolate > [aria-hidden=true]").first();

/** Nama animasi semua elemen yang memakai keyframe ini. */
const animationNames = (page: Page, keyframe: string) =>
  page
    .locator(`#fixture [class*="animate-[${keyframe}"]`)
    .evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).animationName),
    );

for (const framework of frameworks) {
  test.describe(framework, () => {
    for (const { name, keyframe, button } of backgrounds) {
      test(`${name}: layer is decorative, content stays clickable and reachable by Tab`, async ({
        page,
      }) => {
        await openFixture(page, framework, name);
        const decorative = layer(page);
        await expect(decorative).toHaveAttribute("aria-hidden", "true");
        await expect(decorative).toHaveCSS("pointer-events", "none");

        const target = page.getByRole("button", { name: button });
        await target.click();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(target).toBeFocused();
      });

      if (!keyframe) continue;

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
  });
}

test("stars-background places the same stars in Blade, React, and Vue", async ({
  page,
}) => {
  const layout = async (framework: Framework) => {
    await openFixture(page, framework, "stars-background");
    return layer(page)
      .locator("span")
      .evaluateAll((stars) =>
        stars.map((star) => {
          const { left, top, width, opacity, animationDelay } =
            getComputedStyle(star);
          return [left, top, width, opacity, animationDelay].join(" ");
        }),
      );
  };
  const react = await layout("react");
  expect(react).toHaveLength(120);
  for (const framework of frameworksFor("stars-background").filter(
    (fw) => fw !== "react",
  ))
    expect(await layout(framework), framework).toEqual(react);
});

test("grid-pattern and ripple-background place cells and rings the same in every framework", async ({
  page,
}) => {
  for (const name of ["grid-pattern", "ripple-background"]) {
    const boxes = async (framework: Framework) => {
      await openFixture(page, framework, name);
      return layer(page)
        .locator("span")
        .evaluateAll((items) =>
          items.map((item) => {
            const { x, y, width, height } = item.getBoundingClientRect();
            return [x, y, width, height].map(Math.round).join(",");
          }),
        );
    };
    const react = await boxes("react");
    expect(react.length).toBeGreaterThan(0);
    for (const framework of frameworksFor(name).filter((fw) => fw !== "react"))
      expect(await boxes(framework), `${name} ${framework}`).toEqual(react);
  }
});
