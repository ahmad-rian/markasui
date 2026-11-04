import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("tabs: panah, Home, End, dan Tab ke panel", async ({ page }) => {
      await openFixture(page, framework, "tabs");
      const tab = (name: string) => page.getByRole("tab", { name });

      await page.keyboard.press("Tab");
      await expect(tab("Account")).toBeFocused();
      await expect(tab("Account")).toHaveAttribute("aria-selected", "true");

      await page.keyboard.press("ArrowRight");
      await expect(tab("Password")).toBeFocused();
      await expect(tab("Password")).toHaveAttribute("aria-selected", "true");
      await expect(page.getByRole("tabpanel")).toHaveText(
        "Change your password regularly.",
      );

      await page.keyboard.press("End");
      await expect(tab("Notifications")).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(tab("Account")).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await expect(tab("Notifications")).toBeFocused();
      await page.keyboard.press("Home");
      await expect(tab("Account")).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.getByRole("tabpanel")).toBeFocused();
    });

    test("modal: Enter membuka, Escape menutup, fokus kembali ke pemicu", async ({
      page,
    }) => {
      await openFixture(page, framework, "modal");
      const trigger = page.getByRole("button", { name: "Delete project" });
      const dialog = page.getByRole("dialog", { name: "Delete project?" });

      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-state", "open");
      await expect(page.getByRole("button", { name: "Close" })).toBeFocused();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(page.locator("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
      await expect(trigger).toBeFocused();
    });

    test("modal: tombol footer dan backdrop menutup", async ({ page }) => {
      await openFixture(page, framework, "modal");
      const trigger = page.getByRole("button", { name: "Delete project" });
      const dialog = page.getByRole("dialog", { name: "Delete project?" });

      await trigger.click();
      await page.getByRole("button", { name: "Delete", exact: true }).click();
      await expect(dialog).toBeHidden();
      expect(
        await page
          .locator("dialog")
          .evaluate((el: HTMLDialogElement) => el.returnValue),
      ).toBe("delete");

      await trigger.click();
      await expect(dialog).toBeVisible();
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });
  });
}
