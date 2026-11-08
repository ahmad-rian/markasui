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
/** Lebar fixture supaya header melewati breakpoint container @2xl (42rem) dan menu desktop tampil. */
const DESKTOP_WIDTH = "900px";

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

const widen = (page: Page) =>
  page.evaluate((width) => {
    document.getElementById("fixture")!.style.width = width;
  }, DESKTOP_WIDTH);

const desktopNav = (page: Page) =>
  page.getByRole("navigation", { name: "Main", exact: true });
const trigger = (page: Page, name: string) =>
  desktopNav(page).getByRole("button", { name });
const panelOf = async (page: Page, name: string) =>
  page.locator(
    `[id="${await trigger(page, name).getAttribute("aria-controls")}"]`,
  );
const indicator = (page: Page) => desktopNav(page).locator("> span");

const openDesktop = async (page: Page, name: string) => {
  await widen(page);
  await page.mouse.move(0, 0);
  await trigger(page, name).focus();
  await page.keyboard.press("Enter");
  await expect(trigger(page, name)).toHaveAttribute("aria-expanded", "true");
};

const openMobile = async (page: Page) => {
  await page.mouse.move(0, 0);
  await page.getByRole("button", { name: "Menu" }).click();
  await page.locator("[data-state=open][id$=-menu]").waitFor();
  await page.locator("[id$=-menu] summary").first().click();
  await page.mouse.move(0, 0);
};

for (const framework of frameworks) {
  test.describe(`${framework} navbar`, () => {
    test("navbar: Enter, Space, ArrowDown membuka dropdown, Escape menutup dan fokus kembali", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar");
      await widen(page);
      const components = trigger(page, "Components");
      const panel = await panelOf(page, "Components");
      const press = (key: string) => page.keyboard.press(key);

      await components.focus();
      await press("Enter");
      await expect(components).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await expect(components).toBeFocused();
      await press("Enter");
      await expect(components).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();

      await press("Space");
      await expect(panel).toBeVisible();
      await press("Escape");
      await expect(panel).toBeHidden();
      await expect(components).toBeFocused();

      await press("ArrowDown");
      await expect(panel).toBeVisible();
      await expect(panel.getByRole("link").first()).toBeFocused();
      await press("Tab");
      await expect(panel.getByRole("link").nth(1)).toBeFocused();
      await press("Escape");
      await expect(panel).toBeHidden();
      await expect(components).toHaveAttribute("aria-expanded", "false");
      await expect(components).toBeFocused();
    });

    test("navbar: panel di bawah pemicu, hover membuka dengan jeda, klik tidak menutup panel dari hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar");
      await widen(page);
      const components = trigger(page, "Components");
      const resources = trigger(page, "Resources");

      await components.hover();
      await expect(components).toHaveAttribute("aria-expanded", "true");
      const box = (await components.boundingBox())!;
      const panel = (await (await panelOf(page, "Components")).boundingBox())!;
      expect(Math.round(panel.x)).toBe(Math.round(box.x));
      expect(Math.round(panel.y)).toBe(Math.round(box.y + box.height + 8));

      await resources.hover();
      await expect(resources).toHaveAttribute("aria-expanded", "true");
      await expect(components).toHaveAttribute("aria-expanded", "false");

      await resources.click();
      await page.waitForTimeout(300);
      await expect(resources).toHaveAttribute("aria-expanded", "true");

      await page.mouse.move(1000, 600);
      await expect(resources).toHaveAttribute("aria-expanded", "false");
    });

    test("navbar: pill indikator meluncur ke item yang di-hover lalu kembali ke item aktif", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar");
      await widen(page);
      const pill = indicator(page);
      await expect(pill).toBeHidden();

      const pricing = desktopNav(page).getByRole("link", { name: "Pricing" });
      await pricing.hover();
      await expect(pill).toBeVisible();
      await expect(async () => {
        const target = (await pricing.boundingBox())!;
        const box = (await pill.boundingBox())!;
        expect(Math.round(box.x)).toBe(Math.round(target.x));
        expect(Math.round(box.width)).toBe(Math.round(target.width));
      }).toPass();

      await page.mouse.move(1000, 600);
      const docs = desktopNav(page).getByRole("link", { name: "Docs" });
      await expect(async () => {
        const target = (await docs.boundingBox())!;
        const box = (await pill.boundingBox())!;
        expect(Math.round(box.x)).toBe(Math.round(target.x));
      }).toPass();
    });

    test("navbar: menu seluler dengan grup details yang bisa dibuka dan ditutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar");
      const toggle = page.getByRole("button", { name: "Menu" });
      const panel = page.locator("[id$=-menu]");
      const summary = panel.locator("summary", { hasText: "Components" });
      const analytics = panel.getByRole("link", { name: "Forms" });

      await toggle.focus();
      await page.keyboard.press("Enter");
      await expect(panel).toBeVisible();
      await expect(analytics).toBeHidden();

      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(analytics).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(analytics).toBeFocused();
      await summary.click();
      await expect(analytics).toBeHidden();

      await summary.focus();
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(toggle).toBeFocused();
    });

    test("navbar: lolos axe saat dropdown desktop dan menu seluler terbuka", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar--two-tier");
      await openMobile(page);
      await expectNoAxeViolations(page);
      await openDesktop(page, "Components");
      await expectNoAxeViolations(page);
    });
  });
}

for (const theme of themes) {
  for (const component of ["navbar", "navbar--two-tier", "navbar--floating"]) {
    test(`${component} dropdown desktop terbuka (${theme}) tampil sama`, async ({
      page,
    }, testInfo) => {
      await expectSameAcrossFrameworks(
        page,
        testInfo,
        component,
        theme,
        async (p) => {
          await openDesktop(p, "Components");
          return screenshot(p, "page");
        },
      );
    });
  }

  for (const component of ["navbar", "navbar--mega"]) {
    test(`${component} menu seluler terbuka (${theme}) tampil sama`, async ({
      page,
    }, testInfo) => {
      await expectSameAcrossFrameworks(
        page,
        testInfo,
        component,
        theme,
        async (p) => {
          await openMobile(p);
          return screenshot(p);
        },
      );
    });
  }
}
