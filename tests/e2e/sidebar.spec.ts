import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

/** Lebar fixture di bawah breakpoint sm (24rem) agar sidebar menjadi dialog. */
const NARROW_FIXTURE = "360px";
const RAIL_WIDTH = 64;

const aside = (page: Page) => page.locator("aside");

async function collapse(page: Page) {
  await aside(page).getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(aside(page)).toHaveAttribute("data-state", "collapsed");
  await expect
    .poll(() => aside(page).evaluate((el) => el.getBoundingClientRect().width))
    .toBe(RAIL_WIDTH);
}

async function narrow(page: Page) {
  await page
    .locator("#fixture")
    .evaluate((el, width) => (el.style.width = width), NARROW_FIXTURE);
  await expect(aside(page)).toBeHidden();
}

/** Selisih posisi dan tinggi indikator terhadap item yang disorotnya (0 berarti pas). */
async function indicatorOffset(target: Locator) {
  return target.evaluate((link) => {
    const bar = link.closest("nav")!.firstElementChild!.firstElementChild!;
    const a = bar.getBoundingClientRect();
    const b = link.getBoundingClientRect();
    return Math.round(
      Math.abs(a.top - b.top) +
        Math.abs(a.height - b.height) +
        Math.abs(a.width - b.width),
    );
  });
}

const link = (page: Page, name: string) =>
  aside(page).getByRole("link", { name });

for (const framework of frameworks) {
  test.describe(`${framework} sidebar`, () => {
    test("sidebar: indikator di item aktif lalu mengikuti hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "sidebar");
      await expect(
        aside(page).getByRole("link", { name: "Website redesign" }),
      ).toHaveAttribute("aria-current", "page");
      await expect
        .poll(() => indicatorOffset(link(page, "Website redesign")))
        .toBe(0);

      await aside(page).getByRole("link", { name: "Analytics" }).hover();
      await expect.poll(() => indicatorOffset(link(page, "Analytics"))).toBe(0);
      await page.mouse.move(600, 10);
      await expect
        .poll(() => indicatorOffset(link(page, "Website redesign")))
        .toBe(0);
    });

    test("sidebar: Enter dan Spasi membuka dan menutup sub-item", async ({
      page,
    }) => {
      await openFixture(page, framework, "sidebar");
      const projects = aside(page).getByRole("button", { name: "Projects" });
      const child = aside(page).getByRole("link", { name: "Mobile app" });
      await expect(projects).toHaveAttribute("aria-expanded", "true");
      await expect(child).toBeVisible();

      await projects.focus();
      await page.keyboard.press("Space");
      await expect(projects).toHaveAttribute("aria-expanded", "false");
      await expect(child).toBeHidden();
      await page.mouse.move(600, 10);
      await expect.poll(() => indicatorOffset(projects)).toBe(0);
      await page.keyboard.press("Tab");
      await expect(
        aside(page).getByRole("link", { name: "Analytics" }),
      ).toBeFocused();

      await projects.focus();
      await page.keyboard.press("Enter");
      await expect(projects).toHaveAttribute("aria-expanded", "true");
      await expect(child).toBeVisible();
      await page.keyboard.press("Tab");
      await expect(
        aside(page).getByRole("link", { name: "Website redesign" }),
      ).toBeFocused();
    });

    test("sidebar: tombol rail dengan keyboard, tooltip saat fokus", async ({
      page,
    }) => {
      await openFixture(page, framework, "sidebar");
      const toggle = aside(page).locator(":scope > button");
      await expect(toggle).toHaveAccessibleName("Collapse sidebar");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(toggle).toHaveAttribute(
        "aria-controls",
        (await aside(page).getAttribute("id"))!,
      );

      await toggle.focus();
      await page.keyboard.press("Enter");
      await expect(aside(page)).toHaveAttribute("data-state", "collapsed");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(toggle).toHaveAccessibleName("Expand sidebar");

      const home = aside(page).getByRole("link", { name: "Home" });
      await home.focus();
      await expect(home).toBeFocused();
      await expect(home.locator("[aria-hidden=true]").last()).toBeVisible();
      await expect(home.locator("[aria-hidden=true]").last()).toHaveCSS(
        "opacity",
        "1",
      );

      await toggle.focus();
      await page.keyboard.press("Space");
      await expect(aside(page)).toHaveAttribute("data-state", "expanded");
      await expect(toggle).toHaveAccessibleName("Collapse sidebar");
    });

    test("sidebar: item induk di rail membentangkan sidebar", async ({
      page,
    }) => {
      await openFixture(page, framework, "sidebar");
      await collapse(page);
      const projects = aside(page).getByRole("button", { name: "Projects" });
      await page.mouse.move(600, 10);
      await expect.poll(() => indicatorOffset(projects)).toBe(0);
      await projects.click();
      await expect(aside(page)).toHaveAttribute("data-state", "expanded");
      await expect(projects).toHaveAttribute("aria-expanded", "true");
    });

    test("sidebar: dialog seluler dibuka tombol, Escape menutup, fokus kembali", async ({
      page,
    }) => {
      await openFixture(page, framework, "sidebar");
      await narrow(page);
      const open = page.getByRole("button", { name: "Open sidebar" });
      const dialog = page.getByRole("dialog", { name: "Sidebar" });
      await expect(open).toHaveAttribute("aria-haspopup", "dialog");

      await open.focus();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("link", { name: "Website redesign" }),
      ).toHaveAttribute("aria-current", "page");
      expect(
        await dialog.evaluate((el) => el.contains(document.activeElement)),
      ).toBe(true);

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(open).toBeFocused();
      await expect(open).toHaveAttribute("aria-haspopup", "dialog");

      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Close sidebar" }).click();
      await expect(dialog).toBeHidden();
      await expect(open).toBeFocused();
    });
  });
}

for (const theme of themes) {
  test(`sidebar rail (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "sidebar",
      theme,
      async (p) => {
        await collapse(p);
        await p.mouse.move(600, 10);
        return screenshot(p);
      },
    );
  });

  test(`sidebar dialog seluler terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "sidebar",
      theme,
      async (p) => {
        await narrow(p);
        await p.getByRole("button", { name: "Open sidebar" }).click();
        await p.getByRole("dialog").waitFor();
        await p.mouse.move(600, 10);
        await expect(
          p.getByRole("dialog").getByRole("link", { name: "Website redesign" }),
        ).toBeVisible();
        return screenshot(p, "page");
      },
    );
  });
}
