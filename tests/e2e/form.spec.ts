import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("checkbox: Space checks and unchecks", async ({ page }) => {
      await openFixture(page, framework, "checkbox");
      const terms = page.getByRole("checkbox", {
        name: "I agree to the terms of service",
      });
      const updates = page.getByRole("checkbox", {
        name: "Send me product updates",
      });

      await page.keyboard.press("Tab");
      await expect(terms).toBeFocused();
      await expect(terms).toBeChecked();
      await page.keyboard.press("Space");
      await expect(terms).not.toBeChecked();

      await page.keyboard.press("Tab");
      await expect(updates).toBeFocused();
      await page.keyboard.press("Space");
      await expect(updates).toBeChecked();

      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("checkbox", { name: "Archive automatically" }),
      ).not.toBeFocused();
    });

    test("switch: Space toggles the state", async ({ page }) => {
      await openFixture(page, framework, "switch");
      const notifications = page.getByRole("switch", {
        name: "Email notifications",
      });
      const saver = page.getByRole("switch", { name: "Data saver mode" });

      await page.keyboard.press("Tab");
      await expect(notifications).toBeFocused();
      await expect(notifications).toBeChecked();
      await page.keyboard.press("Space");
      await expect(notifications).not.toBeChecked();

      await page.keyboard.press("Tab");
      await expect(saver).toBeFocused();
      await page.keyboard.press("Space");
      await expect(saver).toBeChecked();
      await expect(
        page.getByRole("switch", { name: "Beta features" }),
      ).toBeDisabled();
    });

    test("radio-group: Tab goes to the selected option, arrows move the selection", async ({
      page,
    }) => {
      await openFixture(page, framework, "radio-group");
      const radio = (name: string) => page.getByRole("radio", { name });

      await page.keyboard.press("Tab");
      await expect(radio("Pro")).toBeFocused();
      await expect(radio("Pro")).toBeChecked();

      await page.keyboard.press("ArrowDown");
      await expect(radio("Business")).toBeFocused();
      await expect(radio("Business")).toBeChecked();
      await expect(radio("Pro")).not.toBeChecked();

      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");
      await expect(radio("Free")).toBeChecked();

      await page.keyboard.press("Tab");
      await expect(radio("Monthly")).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(radio("Yearly")).toBeChecked();
    });
  });
}
