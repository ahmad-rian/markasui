import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("slider: arrows, Home, and End change the value, fill, and visible number", async ({
      page,
    }) => {
      await openFixture(page, framework, "slider");
      const volume = page.getByRole("slider", { name: "Volume" });
      const brightness = page.getByRole("slider", { name: "Brightness" });
      const fill = () =>
        volume.evaluate((input) => input.style.getPropertyValue("--value"));

      await page.keyboard.press("Tab");
      await expect(volume).toBeFocused();
      await expect(volume).toHaveValue("60");
      await page.keyboard.press("ArrowRight");
      await expect(volume).toHaveValue("61");
      await expect(page.getByText("61", { exact: true })).toBeVisible();
      expect((await fill()).trim()).toBe("61%");
      await page.keyboard.press("Home");
      await expect(volume).toHaveValue("0");
      expect((await fill()).trim()).toBe("0%");
      await page.keyboard.press("End");
      await expect(volume).toHaveValue("100");

      await page.keyboard.press("Tab");
      await expect(brightness).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await expect(brightness).toHaveValue("20");
      await expect(page.getByText("20", { exact: true })).toBeVisible();
    });

    test("toggle: Space and Enter flip aria-pressed", async ({ page }) => {
      await openFixture(page, framework, "toggle");
      const bold = page.getByRole("button", { name: "Bold" });
      const italic = page.getByRole("button", { name: "Italic" });
      const bookmark = page.getByRole("button", { name: "Bookmark" });

      await page.keyboard.press("Tab");
      await expect(bold).toBeFocused();
      await expect(bold).toHaveAttribute("aria-pressed", "true");
      await page.keyboard.press("Space");
      await expect(bold).toHaveAttribute("aria-pressed", "false");
      await expect(bold).toHaveAttribute("data-state", "off");

      await page.keyboard.press("Tab");
      await expect(italic).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(italic).toHaveAttribute("aria-pressed", "true");
      await expect(italic).toHaveAttribute("data-state", "on");

      await bookmark.click();
      await expect(bookmark).toHaveAttribute("aria-pressed", "true");
    });

    test("toggle-group: one tab stop, arrows move focus, Space and Enter press", async ({
      page,
    }) => {
      await openFixture(page, framework, "toggle-group");
      await expect(
        page.getByRole("group", { name: "Calendar view" }),
      ).toBeVisible();
      const item = (name: string) => page.getByRole("button", { name });

      await page.keyboard.press("Tab");
      await expect(item("Week")).toBeFocused();
      await expect(item("Week")).toHaveAttribute("aria-pressed", "true");

      await page.keyboard.press("ArrowRight");
      await expect(item("Month")).toBeFocused();
      await expect(item("Month")).toHaveAttribute("aria-pressed", "false");
      await page.keyboard.press("ArrowRight");
      await expect(item("Day")).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await expect(item("Month")).toBeFocused();

      await page.keyboard.press("Space");
      await expect(item("Month")).toHaveAttribute("aria-pressed", "true");
      await expect(item("Week")).toHaveAttribute("aria-pressed", "false");
      await page.keyboard.press("Enter");
      await expect(item("Month")).toHaveAttribute("aria-pressed", "false");

      await page.keyboard.press("Shift+Tab");
      await expect(item("Week")).not.toBeFocused();
      await page.keyboard.press("Tab");
      await expect(item("Month")).toBeFocused();
    });

    test("toggle-group multiple: several items stay pressed", async ({
      page,
    }) => {
      await openFixture(page, framework, "toggle-group--multiple");
      const item = (name: string) => page.getByRole("button", { name });

      await page.keyboard.press("Tab");
      await expect(item("Bold")).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(item("Italic")).toBeFocused();
      await page.keyboard.press("Space");
      for (const name of ["Bold", "Italic", "Underline"]) {
        await expect(item(name)).toHaveAttribute("aria-pressed", "true");
      }
      await item("Bold").click();
      await expect(item("Bold")).toHaveAttribute("aria-pressed", "false");
      await expect(item("Italic")).toHaveAttribute("aria-pressed", "true");
    });
  });
}
