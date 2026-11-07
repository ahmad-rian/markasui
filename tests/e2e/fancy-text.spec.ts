import { expect, test, type Locator, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

/** Jumlah animasi Web Animations API dan transisi CSS yang sedang berjalan. */
const running = (page: Page) =>
  page.evaluate(() => document.getAnimations().length);

/** Teks lapisan yang tampil pada TextScramble (sesudah holder tak terlihat). */
const scrambled = (root: Locator) => root.locator(".invisible + span");

/** Skala horizontal garis bawah dari properti scale yang terhitung (Tailwind v4 memakai `scale`, bukan transform). */
const scaleX = (line: Locator) =>
  line.evaluate((el) => {
    const scale = getComputedStyle(el).scale;
    return scale === "none" ? 1 : Number.parseFloat(scale);
  });

const weights = (page: Page) =>
  page
    .locator("[data-letter]")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).fontWeight));

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("letter-swap: links keep one name, take focus, and stay still with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "letter-swap");
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link")).toHaveText([
        /Products/,
        /Pricing/,
        /Docs/,
        /Blog/,
      ]);
      await expect(
        nav.getByRole("link", { name: "Pricing", exact: true }),
      ).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(nav.getByRole("link", { name: "Products" })).toBeFocused();
      await nav.getByRole("link", { name: "Pricing" }).hover();
      expect(await running(page)).toBe(0);
    });

    test("text-scramble: final text for readers and on screen with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-scramble");
      const heading = page.getByRole("heading", {
        name: "Operation Nusantara",
      });
      await expect(scrambled(heading)).toHaveText("Operation Nusantara");
      const link = page.getByRole("link", { name: "Open the brief" });
      await link.hover();
      await page.waitForTimeout(100);
      await expect(scrambled(link)).toHaveText("Open the brief");
    });

    test("text-rotate: reads every word and keeps the first with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-rotate");
      await expect(
        page.getByRole("heading", { name: "Build for Laravel, React, Vue" }),
      ).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page.locator("[data-unit]")).toHaveText(
        Array.from("Laravel"),
      );
    });

    test("vertical-cut-reveal: text is in place with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "vertical-cut-reveal--hero");
      await expect(
        page.getByRole("heading", {
          name: "Design once. Ship to Blade, React, and Vue.",
        }),
      ).toBeVisible();
      const units = page.locator("[data-unit]");
      await expect(units).toHaveCount(3);
      expect(
        await units.evaluateAll((els) =>
          els.map((el) => getComputedStyle(el).transform),
        ),
      ).toEqual(["none", "none", "none"]);
    });

    test("underline-link: the line shows on keyboard focus, on hover, and for the current page", async ({
      page,
    }) => {
      await openFixture(page, framework, "underline-link");
      const first = page.getByRole("link", { name: "Grow from the center" });
      const line = first.locator("span[aria-hidden=true]");
      expect(await scaleX(line)).toBe(0);
      await page.keyboard.press("Tab");
      await expect(first).toBeFocused();
      expect(await scaleX(line)).toBe(1);

      const slide = page.getByRole("link", { name: "Slide in from the left" });
      await slide.hover();
      expect(await scaleX(slide.locator("span[aria-hidden=true]"))).toBe(1);

      const scribble = page
        .getByRole("link", { name: "Drawn by hand" })
        .locator("path");
      await expect(scribble).toHaveCSS("stroke-dashoffset", "1px");
      await page.getByRole("link", { name: "Drawn by hand" }).focus();
      await expect(scribble).toHaveCSS("stroke-dashoffset", "0px");

      await openFixture(page, framework, "underline-link--navbar");
      const current = page.getByRole("link", { name: "Menu" });
      await expect(current).toHaveAttribute("aria-current", "page");
      expect(await scaleX(current.locator("span[aria-hidden=true]"))).toBe(1);
      expect(
        await scaleX(
          page
            .getByRole("link", { name: "Outlets" })
            .locator("span[aria-hidden=true]"),
        ),
      ).toBe(0);
    });

    test("variable-weight-text: letters stay at the min weight with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "variable-weight-text");
      await expect(page.getByText("Proximity")).toHaveClass("sr-only");
      const box = (await page.locator("p").first().boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(300);
      expect(new Set(await weights(page))).toEqual(new Set(["300"]));
    });
  });

  test.describe(`${framework} with motion`, () => {
    test.use({ reducedMotion: "no-preference" });

    test("letter-swap: hover and keyboard focus swap every letter", async ({
      page,
    }) => {
      await openFixture(page, framework, "letter-swap");
      await page.getByRole("link", { name: "Pricing" }).hover();
      expect(await running(page)).toBe("Pricing".length);
      await page.mouse.move(0, 0);
      await expect.poll(() => running(page)).toBe(0);
      await page.keyboard.press("Tab");
      expect(await running(page)).toBe("Products".length);
    });

    test("letter-swap: pingpong holds the swapped state while hovered", async ({
      page,
    }) => {
      await openFixture(page, framework, "letter-swap--button");
      const button = page.getByRole("button", { name: "Start free trial" });
      const letter = button.locator("[data-letter]").first();
      await button.hover();
      await expect(letter).toHaveCSS("transform", /matrix/);
      await page.waitForTimeout(1200);
      await expect(letter).not.toHaveCSS("transform", "none");
      await page.mouse.move(0, 0);
      await expect(letter).toHaveCSS("transform", "none");
    });

    test("text-scramble: hover scrambles the link, then decodes it", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-scramble");
      const link = page.getByRole("link", { name: "Open the brief" });
      await expect(
        scrambled(page.getByRole("heading", { name: "Operation Nusantara" })),
      ).toHaveText("Operation Nusantara");
      await link.hover();
      await expect(scrambled(link)).not.toHaveText("Open the brief");
      await expect(scrambled(link)).toHaveText("Open the brief");
    });

    test("text-rotate: rotates to the next word and pauses on hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "text-rotate");
      const units = page.locator("[data-unit]");
      await expect(units).toHaveText(Array.from("React"), { timeout: 5000 });
      await page.locator("h2 > span").hover();
      await page.waitForTimeout(3500);
      await expect(units).toHaveText(Array.from("React"));
    });

    test("vertical-cut-reveal: units rise into place", async ({ page }) => {
      await openFixture(page, framework, "vertical-cut-reveal");
      const units = page.locator("[data-unit]");
      expect(await running(page)).toBe(await units.count());
      await expect
        .poll(() =>
          units.evaluateAll((els) =>
            els.every((el) => getComputedStyle(el).transform === "none"),
          ),
        )
        .toBe(true);
    });

    test("variable-weight-text: the letter under the cursor gets bolder, and wave breathes", async ({
      page,
    }) => {
      await openFixture(page, framework, "variable-weight-text");
      const letter = page.locator("[data-letter]").first();
      const box = (await letter.boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect
        .poll(async () => Number((await weights(page))[0]))
        .toBeGreaterThan(700);
      await page.mouse.move(0, 0);
      await expect.poll(async () => (await weights(page))[0]).toBe("300");

      await openFixture(page, framework, "variable-weight-text--wave");
      await expect
        .poll(async () => new Set(await weights(page)).size)
        .toBeGreaterThan(2);
    });
  });
}
