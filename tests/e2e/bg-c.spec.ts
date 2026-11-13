import { expect, test, type Page } from "@playwright/test";
import {
  frameworks,
  frameworksFor,
  openFixture,
  type Framework,
} from "./helpers";

/** Fixture utama, keyframe yang dipakai, dan tombol pertama di kontennya. */
const backgrounds = [
  { name: "lamp-effect", keyframe: "markas-lamp", button: "Start for free" },
  {
    name: "spotlight-beam",
    keyframe: "markas-beam",
    button: "Create a roadmap",
  },
  {
    name: "noise-background",
    keyframe: "markas-noise-drift",
    button: "Download the kit",
  },
  {
    name: "hero-highlight",
    keyframe: "markas-highlight",
    button: "Start free trial",
  },
] as const;

const root = (page: Page) => page.locator("#fixture .isolate").first();
const layer = (page: Page) =>
  page.locator("#fixture .isolate > [aria-hidden=true]").first();

/** Nama animasi dan play state semua elemen yang memakai keyframe ini (mark ikut dihitung). */
const animations = (page: Page, keyframe: string) =>
  page
    .locator(
      `#fixture [class*="animate-[${keyframe}"]:not(.isolate), #fixture mark`,
    )
    .evaluateAll((elements) =>
      elements.map((element) => {
        const { animationName, animationPlayState } = getComputedStyle(element);
        return `${animationName} ${animationPlayState}`;
      }),
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

      test(`${name}: animates normally and stops with reduced motion`, async ({
        page,
      }) => {
        await openFixture(page, framework, name);
        const still = await animations(page, keyframe);
        expect(still.length).toBeGreaterThan(0);
        expect(still.every((value) => value.startsWith("none "))).toBe(true);

        await page.emulateMedia({ reducedMotion: "no-preference" });
        await expect
          .poll(async () => new Set(await animations(page, keyframe)))
          .toEqual(new Set([`${keyframe} running`]));
      });
    }

    test("entrances start once the section is visible", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      for (const name of ["lamp-effect", "spotlight-beam", "hero-highlight"]) {
        await openFixture(page, framework, name);
        await expect(root(page)).toHaveAttribute("data-visible", "");
      }
    });

    test("hero-highlight lights the grid around the pointer and draws the mark", async ({
      page,
    }) => {
      await openFixture(page, framework, "hero-highlight");
      const glow = layer(page).locator("> div").nth(1);
      await expect(glow).toHaveCSS("opacity", "0");
      const box = (await root(page).boundingBox())!;
      await page.mouse.move(box.x + 40, box.y + 30);
      await expect(glow).toHaveCSS("opacity", "1");
      expect(
        await root(page).evaluate((el) => [
          el.style.getPropertyValue("--markas-hh-x"),
          el.style.getPropertyValue("--markas-hh-y"),
        ]),
      ).toEqual(["40px", "30px"]);
      await expect(page.locator("#fixture mark")).toHaveCSS(
        "background-size",
        "100% 100%",
      );
    });

    test("spotlight-beam follows the pointer, but not with reduced motion", async ({
      page,
    }) => {
      const lean = () =>
        root(page).evaluate((el) =>
          el.style.getPropertyValue("--markas-beam-x"),
        );
      await openFixture(page, framework, "spotlight-beam");
      let box = (await root(page).boundingBox())!;
      await page.mouse.move(box.x + box.width, box.y + box.height / 2);
      expect(await lean()).toBe("");

      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "spotlight-beam");
      box = (await root(page).boundingBox())!;
      await page.mouse.move(box.x + box.width - 1, box.y + box.height / 2);
      await expect.poll(lean).toMatch(/^0\.99\d$/);
    });
  });
}

test("noise-background and lamp-effect render the same layers in Blade, React, and Vue", async ({
  page,
}) => {
  // 5 fixture x 3 framework dimuat berurutan dalam satu tes.
  test.slow();
  const layers = async (framework: Framework, name: string) => {
    await openFixture(page, framework, name);
    return layer(page)
      .locator("div")
      .evaluateAll((items) =>
        items.map((item) => {
          const style = getComputedStyle(item);
          const { x, y, width, height } = item.getBoundingClientRect();
          return [
            style.maskImage,
            style.backgroundImage,
            [x, y, width, height].map(Math.round).join(","),
          ].join(" | ");
        }),
      );
  };
  for (const name of [
    "noise-background",
    "noise-background--film",
    "noise-background--newsletter",
    "lamp-effect",
    "lamp-effect--stage",
  ]) {
    const react = await layers("react", name);
    expect(react.length).toBeGreaterThan(0);
    for (const framework of frameworksFor(name).filter((fw) => fw !== "react"))
      expect(await layers(framework, name), `${name} ${framework}`).toEqual(
        react,
      );
  }
});
