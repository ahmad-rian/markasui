import { expect, test, type Locator } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const CODE_SAMPLE = [
  "export function formatPrice(amount: number) {",
  '  return new Intl.NumberFormat("en-US", {',
  '    style: "currency",',
  '    currency: "USD",',
  "  }).format(amount);",
  "}",
].join("\n");

const scrollLeft = (locator: Locator) =>
  locator.evaluate((el) => Math.round(el.scrollLeft));

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("carousel: Tab ke viewport, panah kiri dan kanan, tombol nonaktif di ujung", async ({
      page,
    }) => {
      await openFixture(page, framework, "carousel");
      const region = page.getByRole("region", { name: "Product tour" });
      const viewport = region.locator("[tabindex='0']").first();
      const previous = page.getByRole("button", { name: "Previous slide" });
      const next = page.getByRole("button", { name: "Next slide" });
      const dot = (n: number) =>
        page.getByRole("button", { name: `Go to slide ${n}` });

      await expect(region).toHaveAttribute("aria-roledescription", "carousel");
      await expect(page.getByRole("group", { name: "2 of 3" })).toHaveAttribute(
        "aria-roledescription",
        "slide",
      );
      await expect(previous).toBeDisabled();
      await expect(dot(1)).toHaveAttribute("aria-current", "true");

      await page.keyboard.press("Tab");
      await expect(viewport).toBeFocused();
      const width = await viewport.evaluate((el) => el.clientWidth);

      await page.keyboard.press("ArrowRight");
      await expect.poll(() => scrollLeft(viewport)).toBeGreaterThan(width / 2);
      await expect(dot(2)).toHaveAttribute("aria-current", "true");
      await expect(previous).toBeEnabled();

      await page.keyboard.press("ArrowRight");
      await expect(next).toBeDisabled();
      await expect(dot(3)).toHaveAttribute("aria-current", "true");

      await page.keyboard.press("ArrowLeft");
      await expect(dot(2)).toHaveAttribute("aria-current", "true");
      await expect(next).toBeEnabled();
    });

    test("carousel: tombol dan titik bergeser per slide", async ({ page }) => {
      await openFixture(page, framework, "carousel");
      const previous = page.getByRole("button", { name: "Previous slide" });
      const next = page.getByRole("button", { name: "Next slide" });

      await next.click();
      await expect(
        page.getByRole("button", { name: "Go to slide 2" }),
      ).toHaveAttribute("aria-current", "true");
      await page.getByRole("button", { name: "Go to slide 3" }).click();
      await expect(next).toBeDisabled();

      await previous.focus();
      await page.keyboard.press("ArrowLeft");
      await expect(
        page.getByRole("button", { name: "Go to slide 2" }),
      ).toHaveAttribute("aria-current", "true");
      await previous.click();
      await expect(previous).toBeDisabled();
    });

    test("carousel--multiple: beberapa slide terlihat, Next bergeser satu slide", async ({
      page,
    }) => {
      await openFixture(page, framework, "carousel--multiple");
      const viewport = page
        .getByRole("region", { name: "Popular products" })
        .locator("[tabindex='0']")
        .first();
      const next = page.getByRole("button", { name: "Next slide" });

      await next.click();
      await next.click();
      await expect(next).toBeDisabled();
      const max = await viewport.evaluate(
        (el) => el.scrollWidth - el.clientWidth,
      );
      await expect.poll(() => scrollLeft(viewport)).toBe(Math.round(max));
    });

    test("code-block: Tab ke tombol salin lalu ke kode, salin ke clipboard", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await openFixture(page, framework, "code-block");
      // Satu-satunya tombol di fixture. Namanya berubah, jadi jangan dicari lewat nama.
      const button = page.getByRole("button");
      await expect(button).toHaveAccessibleName("Copy code");

      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(button).toHaveAccessibleName("Copied");
      await expect(button).toHaveAttribute("data-state", "copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        CODE_SAMPLE,
      );

      await page.keyboard.press("Tab");
      await expect(page.locator("pre")).toBeFocused();
      await expect(button).toHaveAccessibleName("Copy code", {
        timeout: 4000,
      });
    });

    test("code-block--long-lines: baris panjang bisa digulir dengan keyboard", async ({
      page,
    }) => {
      await openFixture(page, framework, "code-block--long-lines");
      const pre = page.locator("pre");
      await pre.focus();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => scrollLeft(pre)).toBeGreaterThan(0);
    });

    test("scroll-area: Tab memfokus region dan panah menggulir", async ({
      page,
    }) => {
      await openFixture(page, framework, "scroll-area");
      const region = page.getByRole("region", { name: "Releases" });
      await page.keyboard.press("Tab");
      await expect(region).toBeFocused();
      await page.keyboard.press("ArrowDown");
      await expect
        .poll(() => region.evaluate((el) => el.scrollTop))
        .toBeGreaterThan(0);
    });

    test("scroll-area--horizontal: panah kanan menggulir ke samping", async ({
      page,
    }) => {
      await openFixture(page, framework, "scroll-area--horizontal");
      const region = page.getByRole("region", { name: "Recently played" });
      await page.keyboard.press("Tab");
      await expect(region).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => scrollLeft(region)).toBeGreaterThan(0);
      expect(await region.evaluate((el) => el.scrollTop)).toBe(0);
    });
  });
}
