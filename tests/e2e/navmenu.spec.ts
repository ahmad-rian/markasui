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

const trigger = (page: Page, name: string) =>
  page.getByRole("button", { name });
const link = (page: Page, name: string) =>
  page.getByRole("link", { name: new RegExp(`^${name}`) });
const panelOf = async (page: Page, name: string) =>
  page.locator(
    `[id="${await trigger(page, name).getAttribute("aria-controls")}"]`,
  );
const indicator = (page: Page) => page.locator("nav > span[aria-hidden=true]");

/** Buka panel lewat keyboard supaya kursor tidak memicu hover. */
const openByKeyboard = async (page: Page, name: string) => {
  await trigger(page, name).focus();
  await page.keyboard.press("Enter");
  await expect(trigger(page, name)).toHaveAttribute("aria-expanded", "true");
};

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("navigation-menu: Enter, ArrowDown, Escape di panel, dan panah antar pemicu", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu");
      const products = trigger(page, "Products");
      const developers = trigger(page, "Developers");
      const press = (key: string) => page.keyboard.press(key);

      await press("Tab");
      await expect(products).toBeFocused();
      await press("Enter");
      await expect(products).toHaveAttribute("aria-expanded", "true");
      await expect(await panelOf(page, "Products")).toBeVisible();
      await expect(products).toBeFocused();
      await press("Enter");
      await expect(products).toHaveAttribute("aria-expanded", "false");

      await press("ArrowDown");
      await expect(link(page, "Components")).toBeFocused();
      await press("Tab");
      await expect(link(page, "Templates")).toBeFocused();
      await press("Escape");
      await expect(await panelOf(page, "Products")).toBeHidden();
      await expect(products).toBeFocused();
      await expect(products).toHaveAttribute("aria-expanded", "false");

      await press("ArrowRight");
      await expect(developers).toBeFocused();
      await press("ArrowRight");
      await expect(link(page, "Pricing")).toBeFocused();
      await press("ArrowRight");
      await expect(link(page, "Blog")).toBeFocused();
      await press("ArrowRight");
      await expect(products).toBeFocused();
      await press("ArrowLeft");
      await expect(link(page, "Blog")).toBeFocused();
      await press("Home");
      await expect(products).toBeFocused();
    });

    test("navigation-menu: Tab masuk ke panel terbuka dan keluar menutupnya", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu");
      const developers = trigger(page, "Developers");
      const panel = await panelOf(page, "Developers");

      await developers.focus();
      await page.keyboard.press("Space");
      await expect(panel).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(link(page, "Documentation")).toBeFocused();
      for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
      await expect(link(page, "Status")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(link(page, "Pricing")).toBeFocused();
      await expect(panel).toBeHidden();
      await expect(developers).toHaveAttribute("aria-expanded", "false");
    });

    test("navigation-menu: hover membuka dengan jeda, pindah antar pemicu, klik tidak menutup panel dari hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu");
      const products = trigger(page, "Products");
      const developers = trigger(page, "Developers");

      await products.hover();
      await expect(products).toHaveAttribute("aria-expanded", "true");
      await developers.hover();
      await expect(developers).toHaveAttribute("aria-expanded", "true");
      await expect(products).toHaveAttribute("aria-expanded", "false");

      await page.mouse.move(700, 500);
      await expect(developers).toHaveAttribute("aria-expanded", "false");

      await developers.hover();
      await expect(developers).toHaveAttribute("aria-expanded", "true");
      await developers.click();
      await page.waitForTimeout(300);
      await expect(developers).toHaveAttribute("aria-expanded", "true");

      await page.mouse.move(700, 500);
      await expect(developers).toHaveAttribute("aria-expanded", "false");
    });

    test("navigation-menu: panel di bawah pemicu dan indikator meluncur ke pemicu terbuka", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu");
      const bar = indicator(page);
      const pricing = (await link(page, "Pricing").boundingBox())!;
      await expect(bar).toHaveAttribute("data-state", "visible");
      expect(Math.round((await bar.boundingBox())!.x)).toBe(
        Math.round(pricing.x),
      );

      await openByKeyboard(page, "Products");
      const products = (await trigger(page, "Products").boundingBox())!;
      const nav = (await page.getByRole("navigation").boundingBox())!;
      const panel = (await (await panelOf(page, "Products")).boundingBox())!;
      expect(Math.round(panel.x)).toBe(Math.round(nav.x));
      expect(Math.round(panel.y)).toBe(
        Math.round(products.y + products.height + 8),
      );
      const box = (await bar.boundingBox())!;
      expect(Math.round(box.x)).toBe(Math.round(products.x));
      expect(Math.round(box.width)).toBe(Math.round(products.width));
    });

    test("navigation-menu--featured: kartu sorotan di urutan fokus pertama dan lolos axe saat terbuka", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu--featured");
      await trigger(page, "Products").focus();
      await page.keyboard.press("ArrowDown");
      await expect(link(page, "MarkasUI 1.0")).toBeFocused();
      await expectNoAxeViolations(page);
    });

    test("navigation-menu--header: lolos axe saat panel terbuka", async ({
      page,
    }) => {
      await openFixture(page, framework, "navigation-menu--header");
      await openByKeyboard(page, "Products");
      await expectNoAxeViolations(page);
    });
  });
}

for (const theme of themes) {
  for (const component of [
    "navigation-menu",
    "navigation-menu--icons",
    "navigation-menu--featured",
  ]) {
    test(`${component} terbuka (${theme}) tampil sama`, async ({
      page,
    }, testInfo) => {
      await expectSameAcrossFrameworks(
        page,
        testInfo,
        component,
        theme,
        async (p) => {
          await openByKeyboard(p, "Products");
          return screenshot(p, "page");
        },
      );
    });
  }
}
