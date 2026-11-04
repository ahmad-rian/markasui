import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const openDropdown = async (page: Page) => {
  await page.getByRole("button", { name: "Actions" }).click();
  await page.getByRole("menu").waitFor();
};

const openDrawer = async (page: Page) => {
  await page.getByRole("button", { name: "Open filters" }).click();
  await page.locator("dialog[open]").waitFor();
};

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("dropdown-menu: Enter, Spasi, panah, Home, End, dan Escape", async ({
      page,
    }) => {
      await openFixture(page, framework, "dropdown-menu");
      const trigger = page.getByRole("button", { name: "Actions" });
      const menu = page.getByRole("menu");
      const item = (name: string) => page.getByRole("menuitem", { name });
      const press = (key: string) => page.keyboard.press(key);

      await press("Tab");
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await press("Enter");
      await expect(menu).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(menu).toHaveAttribute("data-state", "open");
      await expect(item("Edit")).toBeFocused();

      await press("ArrowDown");
      await expect(item("Duplicate")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Delete")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Edit")).toBeFocused();
      await press("ArrowUp");
      await expect(item("Delete")).toBeFocused();
      await press("Home");
      await expect(item("Edit")).toBeFocused();
      await press("End");
      await expect(item("Delete")).toBeFocused();

      await press("Escape");
      await expect(menu).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await press("Space");
      await expect(item("Edit")).toBeFocused();
      await press("Escape");
      await expect(trigger).toBeFocused();

      await press("ArrowDown");
      await expect(item("Edit")).toBeFocused();
      await press("Escape");
      await expect(menu).toBeHidden();

      await press("ArrowUp");
      await expect(item("Delete")).toBeFocused();
      await press("Escape");
      await expect(trigger).toBeFocused();
    });

    test("dropdown-menu: memilih item menutup menu, klik di luar menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "dropdown-menu");
      const trigger = page.getByRole("button", { name: "Actions" });
      const menu = page.getByRole("menu");

      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await expect(menu).toBeHidden();
      await expect(trigger).toBeFocused();

      await trigger.click();
      await expect(menu).toBeVisible();
      const triggerBox = (await trigger.boundingBox())!;
      const menuBox = (await menu.boundingBox())!;
      expect(menuBox.y).toBeGreaterThan(triggerBox.y + triggerBox.height);
      expect(Math.round(menuBox.x)).toBe(Math.round(triggerBox.x));

      await page.mouse.click(700, 500);
      await expect(menu).toBeHidden();
    });

    test("dropdown-menu: posisi menu mengikuti pemicu saat tata letak berubah", async ({
      page,
    }) => {
      await openFixture(page, framework, "dropdown-menu");
      const trigger = page.getByRole("button", { name: "Actions" });
      const menu = page.getByRole("menu");
      await openDropdown(page);

      await page.evaluate(() => {
        document.getElementById("fixture")!.style.marginTop = "120px";
        window.dispatchEvent(new Event("resize"));
      });

      const triggerBox = (await trigger.boundingBox())!;
      const menuBox = (await menu.boundingBox())!;
      const triggerBottom = triggerBox.y + triggerBox.height;
      expect(triggerBox.y).toBeGreaterThan(120);
      expect(menuBox.y).toBeGreaterThanOrEqual(triggerBottom);
      expect(menuBox.y).toBeLessThanOrEqual(triggerBottom + 12);
    });

    test("tooltip: muncul saat Tab ke pemicu, hilang saat Escape", async ({
      page,
    }) => {
      await openFixture(page, framework, "tooltip");
      const trigger = page.getByRole("button", { name: "Copy link" });
      const tooltip = page.getByRole("tooltip");

      await expect(tooltip).toBeHidden();
      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText("Copy link to clipboard");
      await expect(trigger).toHaveAccessibleDescription(
        "Copy link to clipboard",
      );

      const triggerBox = (await trigger.boundingBox())!;
      const tooltipBox = (await tooltip.boundingBox())!;
      expect(tooltipBox.y + tooltipBox.height).toBeLessThan(triggerBox.y);

      await page.keyboard.press("Escape");
      await expect(tooltip).toBeHidden();
      await expect(trigger).toBeFocused();
    });

    test("tooltip: hover menampilkan, mouse keluar menyembunyikan", async ({
      page,
    }) => {
      await openFixture(page, framework, "tooltip");
      const tooltip = page.getByRole("tooltip");

      await page.getByRole("button", { name: "Copy link" }).hover();
      await expect(tooltip).toBeVisible();
      await page.mouse.move(0, 0);
      await expect(tooltip).toBeHidden();
    });

    test("drawer: Enter membuka, Escape menutup, fokus kembali ke pemicu", async ({
      page,
    }) => {
      await openFixture(page, framework, "drawer");
      const trigger = page.getByRole("button", { name: "Open filters" });
      const dialog = page.getByRole("dialog", { name: "Filter products" });

      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-state", "open");
      await expect(page.getByRole("button", { name: "Close" })).toBeFocused();

      const box = (await dialog.boundingBox())!;
      const viewport = page.viewportSize()!;
      expect(Math.round(box.x + box.width)).toBe(viewport.width);
      expect(Math.round(box.height)).toBe(viewport.height);

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(page.locator("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
      await expect(trigger).toBeFocused();
    });

    test("drawer: tombol footer dan backdrop menutup", async ({ page }) => {
      await openFixture(page, framework, "drawer");
      const dialog = page.getByRole("dialog", { name: "Filter products" });

      await openDrawer(page);
      await page.getByRole("button", { name: "Apply" }).click();
      await expect(dialog).toBeHidden();
      expect(
        await page
          .locator("dialog")
          .evaluate((el: HTMLDialogElement) => el.returnValue),
      ).toBe("apply");

      await openDrawer(page);
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });
  });
}

for (const theme of themes) {
  test(`dropdown-menu terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "dropdown-menu",
      theme,
      async (p) => {
        await openDropdown(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`tooltip terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "tooltip",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Copy link" }).focus();
        await p.getByRole("tooltip").waitFor();
        return screenshot(p, "page");
      },
    );
  });

  test(`drawer terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "drawer",
      theme,
      async (p) => {
        await openDrawer(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });
}
