import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const NARROW_WIDTH = "240px";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("avatar: inisial muncul saat gambar gagal dimuat", async ({
      page,
    }) => {
      await openFixture(page, framework, "avatar");
      const photo = page.locator("img[alt='Dewi Lestari']");
      await expect(photo).toBeVisible();

      await photo.evaluate((img: HTMLImageElement) => {
        img.src = "/tidak-ada/avatar-rusak.png";
      });

      const fallback = page.getByRole("img", { name: "Dewi Lestari" });
      await expect(fallback).toHaveText("DL");
      await expect(fallback).toBeVisible();
      await expect(photo).toBeHidden();
    });

    test("table: bisa difokus dan digulir horizontal di lebar sempit", async ({
      page,
    }) => {
      await openFixture(page, framework, "table");
      await page
        .locator("#fixture")
        .evaluate((el, width) => (el.style.width = width), NARROW_WIDTH);
      const region = page.getByRole("region", {
        name: "Daftar pesanan terbaru",
      });

      await page.keyboard.press("Tab");
      await expect(region).toBeFocused();

      const overflow = await region.evaluate(
        (el) => el.scrollWidth - el.clientWidth,
      );
      expect(overflow).toBeGreaterThan(0);

      await page.keyboard.press("ArrowRight");
      await expect
        .poll(() => region.evaluate((el) => el.scrollLeft))
        .toBeGreaterThan(0);
    });
  });
}
