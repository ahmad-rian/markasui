import { expect, test, type Page } from "@playwright/test";
import { frameworks, openFixture, type Framework } from "./helpers";

/** Fixture utama, keyframe yang dipakai, elemen bergerak, dan tombol pertama di kontennya. */
const backgrounds = [
  {
    name: "wavy-background",
    keyframe: "markas-wave",
    items: "svg",
    button: "Start free trial",
  },
  {
    name: "meteors",
    keyframe: "markas-meteor",
    items: "span",
    button: "View benchmarks",
  },
  {
    name: "shooting-stars",
    keyframe: "markas-shooting-star",
    items: "span",
    button: "Join the waitlist",
  },
  {
    name: "sparkles",
    keyframe: "markas-sparkle",
    items: "svg",
    button: "Open dashboard",
  },
] as const;

const layer = (page: Page) =>
  page.locator("#fixture .isolate > [aria-hidden=true]").first();

/** Nama animasi semua elemen yang memakai keyframe ini. */
const animationNames = (page: Page, keyframe: string) =>
  page
    .locator(`#fixture [class*="animate-[${keyframe}_"]`)
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

    test("sparkles burst plays on hover and keyboard focus, never with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "sparkles--upgrade");
      const sparkles = layer(page).locator("svg");
      const names = () =>
        sparkles.evaluateAll((items) =>
          items.map((item) => getComputedStyle(item).animationName),
        );
      const card = page.locator("#fixture .isolate").first();

      await card.hover();
      expect(new Set(await names())).toEqual(new Set(["none"]));
      await expect(sparkles.first()).toHaveCSS("opacity", "0");

      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.mouse.move(0, 0);
      expect(new Set(await names())).toEqual(new Set(["none"]));
      await card.hover();
      expect(new Set(await names())).toEqual(new Set(["markas-sparkle-burst"]));

      await page.mouse.move(0, 0);
      await page.getByRole("button", { name: "Upgrade now" }).focus();
      expect(new Set(await names())).toEqual(new Set(["markas-sparkle-burst"]));
    });
  });
}

test("meteors, shooting-stars, sparkles, and wavy-background place the same layers in every framework", async ({
  page,
}) => {
  for (const { name, items } of backgrounds) {
    const layout = async (framework: Framework) => {
      await openFixture(page, framework, name);
      return layer(page)
        .locator(items)
        .evaluateAll((elements) =>
          elements.map((element) => {
            const { left, top, width, height, opacity, animationDelay } =
              getComputedStyle(element);
            const tail = getComputedStyle(element, "::before").width;
            const path = element.querySelector("path")?.getAttribute("d");
            return [
              left,
              top,
              width,
              height,
              opacity,
              animationDelay,
              tail,
              path,
            ].join(" ");
          }),
        );
    };
    const react = await layout("react");
    expect(react.length, name).toBeGreaterThan(0);
    expect(await layout("blade"), name).toEqual(react);
    expect(await layout("vue"), name).toEqual(react);
  }
});
