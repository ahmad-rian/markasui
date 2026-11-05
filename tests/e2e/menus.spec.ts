import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const expectNoAxeViolations = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();
  expect(
    violations.map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
    ),
  ).toEqual([]);
};

const contextArea = (page: Page) =>
  page.getByRole("group").filter({ hasText: "Right-click here" });

const openContextMenu = async (page: Page) => {
  await contextArea(page).focus();
  await page.keyboard.press("Shift+F10");
  await page.getByRole("menu").waitFor();
};

const openCommand = async (page: Page) => {
  await page.getByRole("button", { name: "Open command palette" }).click();
  await page.locator("dialog[open]").waitFor();
};

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("collapsible: Tab ke summary, Enter dan Spasi membuka dan menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "collapsible");
      const details = page.locator("details");
      const summary = page.locator("summary");
      const content = page.getByText("Tracking number JKT-2210-884", {
        exact: false,
      });

      await expect(details).not.toHaveAttribute("open");
      await expect(content).toBeHidden();
      await page.keyboard.press("Tab");
      await expect(summary).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(details).toHaveAttribute("open");
      await expect(content).toBeVisible();
      await page.keyboard.press("Space");
      await expect(details).not.toHaveAttribute("open");
    });

    test("context-menu: Shift+F10, panah, Home, End, Escape, dan tombol ContextMenu", async ({
      page,
    }) => {
      await openFixture(page, framework, "context-menu");
      const area = contextArea(page);
      const menu = page.getByRole("menu");
      const item = (name: string) => page.getByRole("menuitem", { name });
      const press = (key: string) => page.keyboard.press(key);

      await press("Tab");
      await expect(area).toBeFocused();
      await expect(area).toHaveAccessibleDescription(
        "Press Shift+F10 to open the context menu",
      );

      await press("Shift+F10");
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute("data-state", "open");
      await expect(item("Open")).toBeFocused();
      const areaBox = (await area.boundingBox())!;
      const menuBox = (await menu.boundingBox())!;
      expect(Math.round(menuBox.x)).toBe(Math.round(areaBox.x));
      expect(Math.round(menuBox.y)).toBe(Math.round(areaBox.y));

      await press("ArrowDown");
      await expect(item("Rename")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Duplicate")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Delete")).toBeFocused();
      await press("ArrowDown");
      await expect(item("Open")).toBeFocused();
      await press("ArrowUp");
      await expect(item("Delete")).toBeFocused();
      await press("Home");
      await expect(item("Open")).toBeFocused();
      await press("End");
      await expect(item("Delete")).toBeFocused();

      await press("Escape");
      await expect(menu).toBeHidden();
      await expect(area).toBeFocused();
      await expect(area).toHaveAttribute("data-state", "closed");

      await press("ContextMenu");
      await expect(item("Open")).toBeFocused();
      await press("Tab");
      await expect(menu).toBeHidden();
    });

    test("context-menu: klik kanan membuka di posisi kursor, memilih dan klik luar menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "context-menu");
      const area = contextArea(page);
      const menu = page.getByRole("menu");

      await area.click({ button: "right", position: { x: 60, y: 40 } });
      await expect(menu).toBeVisible();
      const areaBox = (await area.boundingBox())!;
      const menuBox = (await menu.boundingBox())!;
      expect(Math.round(menuBox.x)).toBe(Math.round(areaBox.x + 60));
      expect(Math.round(menuBox.y)).toBe(Math.round(areaBox.y + 40));

      await page.getByRole("menuitem", { name: "Rename" }).click();
      await expect(menu).toBeHidden();
      await expect(area).toBeFocused();

      await area.click({ button: "right", position: { x: 200, y: 100 } });
      await expect(menu).toBeVisible();
      const moved = (await menu.boundingBox())!;
      expect(Math.round(moved.x)).toBe(Math.round(areaBox.x + 200));

      await page.mouse.click(5, 700);
      await expect(menu).toBeHidden();
    });

    test("command: Enter membuka, panah memindah aria-activedescendant, Escape menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "command");
      const trigger = page.getByRole("button", {
        name: "Open command palette",
      });
      const dialog = page.getByRole("dialog", { name: "Command palette" });
      const input = page.getByRole("combobox", { name: "Search commands" });
      const option = (name: string | RegExp) =>
        page.getByRole("option", { name });
      const expectActive = async (name: string | RegExp) =>
        expect(input).toHaveAttribute(
          "aria-activedescendant",
          (await option(name).getAttribute("id"))!,
        );
      const press = (key: string) => page.keyboard.press(key);

      await press("Tab");
      await expect(trigger).toBeFocused();
      await press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-state", "open");
      await expect(input).toBeFocused();
      await expect(input).toHaveAttribute(
        "aria-controls",
        (await page.getByRole("listbox").getAttribute("id"))!,
      );
      await expectActive("Calendar");
      await expect(option("Calendar")).toHaveAttribute("aria-selected", "true");

      await press("ArrowDown");
      await expectActive("Search emoji");
      await press("ArrowUp");
      await press("ArrowUp");
      await expectActive(/^Settings/);
      await press("ArrowDown");
      await expectActive("Calendar");

      await press("Escape");
      await expect(dialog).toBeHidden();
      await expect(page.locator("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
      await expect(trigger).toBeFocused();
    });

    test("command: mengetik menyaring, pesan kosong, Enter memilih dan menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "command");
      const dialog = page.getByRole("dialog", { name: "Command palette" });
      const input = page.getByRole("combobox", { name: "Search commands" });

      await openCommand(page);
      await page.keyboard.type("CAL");
      await expect(page.getByRole("option")).toHaveText([
        "Calendar",
        "Calculator",
      ]);
      await expect(page.getByRole("group")).toHaveCount(1);
      await page.keyboard.press("ArrowDown");
      await expect(input).toHaveAttribute(
        "aria-activedescendant",
        (await page
          .getByRole("option", { name: "Calculator" })
          .getAttribute("id"))!,
      );

      await page.keyboard.type("zzz");
      await expect(page.getByText("No results found.")).toBeVisible();
      await expect(page.getByRole("option")).toHaveCount(0);
      await expect(input).toHaveAttribute("aria-expanded", "false");
      await expectNoAxeViolations(page);

      await input.fill("bill");
      await page.keyboard.press("Enter");
      await expect(dialog).toBeHidden();

      await openCommand(page);
      await expect(input).toHaveValue("");
      await expect(page.getByRole("option")).toHaveCount(6);
      await expectNoAxeViolations(page);
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });

    test("command: Ctrl+K dan Meta+K membuka dan menutup palet", async ({
      page,
    }) => {
      await openFixture(page, framework, "command");
      const dialog = page.getByRole("dialog", { name: "Command palette" });

      await page.keyboard.press("Control+k");
      await expect(dialog).toBeVisible();
      await expect(
        page.getByRole("combobox", { name: "Search commands" }),
      ).toBeFocused();
      await page.keyboard.press("Control+k");
      await expect(dialog).toBeHidden();
      await page.keyboard.press("Meta+k");
      await expect(dialog).toBeVisible();
    });

    test("context-menu terbuka lolos axe-core", async ({ page }) => {
      await openFixture(page, framework, "context-menu");
      await openContextMenu(page);
      await expectNoAxeViolations(page);
    });
  });
}

for (const theme of themes) {
  test(`context-menu terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "context-menu",
      theme,
      async (p) => {
        await openContextMenu(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`command terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "command",
      theme,
      async (p) => {
        await openCommand(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`collapsible terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "collapsible",
      theme,
      async (p) => {
        await p.locator("summary").click();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });
}
