import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const topItem = (page: Page, name: string) =>
  page.getByRole("menubar").getByRole("menuitem", { name, exact: true });
for (const framework of frameworks) {
  test.describe(framework, () => {
    test("menubar: panah kiri, kanan, Home, End berpindah item bar (roving tabindex)", async ({
      page,
    }) => {
      await openFixture(page, framework, "menubar");
      const press = (key: string) => page.keyboard.press(key);

      await expect(page.getByRole("menubar", { name: "Menu" })).toBeVisible();
      await press("Tab");
      await expect(topItem(page, "File")).toBeFocused();
      await expect(topItem(page, "File")).toHaveAttribute("tabindex", "0");
      await expect(topItem(page, "Edit")).toHaveAttribute("tabindex", "-1");

      await press("ArrowRight");
      await expect(topItem(page, "Edit")).toBeFocused();
      await expect(topItem(page, "Edit")).toHaveAttribute("tabindex", "0");
      await expect(topItem(page, "File")).toHaveAttribute("tabindex", "-1");
      await press("End");
      await expect(topItem(page, "Help")).toBeFocused();
      await press("ArrowRight");
      await expect(topItem(page, "File")).toBeFocused();
      await press("ArrowLeft");
      await expect(topItem(page, "Help")).toBeFocused();
      await press("Home");
      await expect(topItem(page, "File")).toBeFocused();

      await press("ArrowRight");
      await press("Tab");
      await expect(topItem(page, "Edit")).not.toBeFocused();
      await press("Shift+Tab");
      await expect(topItem(page, "Edit")).toBeFocused();
    });

    test("menubar: Enter, Spasi, panah bawah dan atas membuka menu, Escape kembali ke item bar", async ({
      page,
    }) => {
      await openFixture(page, framework, "menubar");
      const press = (key: string) => page.keyboard.press(key);
      const item = (name: string) => page.getByRole("menuitem", { name });
      const file = topItem(page, "File");

      await press("Tab");
      await press("Enter");
      await expect(file).toHaveAttribute("aria-expanded", "true");
      await expect(file).toHaveAttribute("data-state", "open");
      await expect(item("New file")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Open")).toBeFocused();
      await press("End");
      await expect(item("Close window")).toBeFocused();
      await press("ArrowDown");
      await expect(item("New file")).toBeFocused();
      await press("ArrowUp");
      await expect(item("Close window")).toBeFocused();
      await press("Home");
      await expect(item("New file")).toBeFocused();

      await press("Escape");
      await expect(item("New file")).toBeHidden();
      await expect(file).toBeFocused();
      await expect(file).toHaveAttribute("aria-expanded", "false");

      await press("Space");
      await expect(item("New file")).toBeFocused();
      await press("Escape");
      await expect(file).toBeFocused();

      await press("ArrowDown");
      await expect(item("New file")).toBeFocused();
      await press("Escape");

      await press("ArrowUp");
      await expect(item("Close window")).toBeFocused();
      await press("Escape");
      await expect(file).toBeFocused();
    });

    test("menubar: panah kiri dan kanan saat menu terbuka membuka menu sebelah", async ({
      page,
    }) => {
      await openFixture(page, framework, "menubar");
      const press = (key: string) => page.keyboard.press(key);
      const item = (name: string) => page.getByRole("menuitem", { name });

      await press("Tab");
      await press("ArrowDown");
      await expect(item("New file")).toBeFocused();

      await press("ArrowRight");
      await expect(item("Undo")).toBeFocused();
      await expect(item("New file")).toBeHidden();
      await expect(topItem(page, "Edit")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      await expect(topItem(page, "File")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      await expect(topItem(page, "Edit")).toHaveAttribute("tabindex", "0");

      await press("ArrowRight");
      await expect(item("Zoom in")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Zoom out")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Zoom in")).toBeFocused();

      await press("ArrowRight");
      await expect(item("Documentation")).toBeFocused();
      await press("ArrowRight");
      await expect(item("New file")).toBeFocused();
      await press("ArrowLeft");
      await expect(item("Documentation")).toBeFocused();

      await press("Escape");
      await expect(topItem(page, "Help")).toBeFocused();
      await expect(page.getByRole("menu")).toHaveCount(0);
    });

    test("menubar: klik membuka di bawah item bar, memilih item menutup, klik di luar menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "menubar");
      const edit = topItem(page, "Edit");
      const item = (name: string) => page.getByRole("menuitem", { name });

      await edit.click();
      await expect(item("Undo")).toBeVisible();
      const menu = page.getByRole("menu");
      const editBox = (await edit.boundingBox())!;
      const menuBox = (await menu.boundingBox())!;
      expect(menuBox.y).toBeGreaterThan(editBox.y + editBox.height);
      expect(Math.round(menuBox.x)).toBe(Math.round(editBox.x));

      await topItem(page, "View").click();
      await expect(item("Undo")).toBeHidden();
      await expect(item("Zoom in")).toBeVisible();

      await item("Zoom in").click();
      await expect(item("Zoom in")).toBeHidden();
      await expect(topItem(page, "View")).toBeFocused();

      await edit.click();
      await expect(item("Undo")).toBeVisible();
      await page.mouse.click(700, 500);
      await expect(item("Undo")).toBeHidden();
    });

    test("separator: dekoratif memakai role none, semantik memakai role separator", async ({
      page,
    }) => {
      await openFixture(page, framework, "separator");
      await expect(page.getByRole("separator")).toHaveCount(0);
      await expect(page.locator('#fixture [role="none"]')).toHaveCount(3);

      await openFixture(page, framework, "separator--sections");
      const lines = page.getByRole("separator");
      await expect(lines).toHaveCount(2);
      await expect(lines.first()).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );
      await expect(
        page.getByRole("separator", { name: "Danger zone" }),
      ).toBeVisible();
    });

    test("kbd: kombinasi dirender sebagai kbd bersarang dengan pemisah", async ({
      page,
    }) => {
      await openFixture(page, framework, "kbd");
      const fixture = page.locator("#fixture");
      await expect(fixture.locator("kbd")).toHaveCount(4);
      await expect(fixture.locator("kbd > kbd")).toHaveText(["Ctrl", "K"]);
      await expect(fixture.locator("kbd").first()).toHaveText("Ctrl+K");
    });
  });
}

for (const theme of themes) {
  test(`menubar terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "menubar",
      theme,
      async (p) => {
        await topItem(p, "File").click();
        await p.getByRole("menu").waitFor();
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });
}
