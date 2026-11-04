import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("checkbox: Spasi mencentang dan melepas centang", async ({ page }) => {
      await openFixture(page, framework, "checkbox");
      const syarat = page.getByRole("checkbox", {
        name: "Saya setuju dengan syarat layanan",
      });
      const kabar = page.getByRole("checkbox", {
        name: "Kirimi saya kabar terbaru",
      });

      await page.keyboard.press("Tab");
      await expect(syarat).toBeFocused();
      await expect(syarat).toBeChecked();
      await page.keyboard.press("Space");
      await expect(syarat).not.toBeChecked();

      await page.keyboard.press("Tab");
      await expect(kabar).toBeFocused();
      await page.keyboard.press("Space");
      await expect(kabar).toBeChecked();

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("checkbox", { name: "Arsipkan otomatis" }),
      ).not.toBeFocused();
    });

    test("switch: Spasi mengubah status", async ({ page }) => {
      await openFixture(page, framework, "switch");
      const notifikasi = page.getByRole("switch", { name: "Notifikasi email" });
      const hemat = page.getByRole("switch", { name: "Mode hemat data" });

      await page.keyboard.press("Tab");
      await expect(notifikasi).toBeFocused();
      await expect(notifikasi).toBeChecked();
      await page.keyboard.press("Space");
      await expect(notifikasi).not.toBeChecked();

      await page.keyboard.press("Tab");
      await expect(hemat).toBeFocused();
      await page.keyboard.press("Space");
      await expect(hemat).toBeChecked();
      await expect(
        page.getByRole("switch", { name: "Fitur beta" }),
      ).toBeDisabled();
    });

    test("radio-group: Tab ke opsi terpilih, panah memindah pilihan", async ({
      page,
    }) => {
      await openFixture(page, framework, "radio-group");
      const radio = (name: string) => page.getByRole("radio", { name });

      await page.keyboard.press("Tab");
      await expect(radio("Pro")).toBeFocused();
      await expect(radio("Pro")).toBeChecked();

      await page.keyboard.press("ArrowDown");
      await expect(radio("Bisnis")).toBeFocused();
      await expect(radio("Bisnis")).toBeChecked();
      await expect(radio("Pro")).not.toBeChecked();

      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");
      await expect(radio("Gratis")).toBeChecked();

      await page.keyboard.press("Tab");
      await expect(radio("Bulanan")).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(radio("Tahunan")).toBeChecked();
    });
  });
}
