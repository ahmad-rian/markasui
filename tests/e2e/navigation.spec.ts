import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const openNavbar = async (page: Page) => {
  await page.getByRole("button", { name: "Menu" }).click();
  await page.locator("[data-state=open][id$=-menu]").waitFor();
};

for (const framework of frameworks) {
  test.describe(`${framework} navigation`, () => {
    test("navbar: Enter membuka, Escape menutup, fokus kembali ke tombol", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar");
      const toggle = page.getByRole("button", { name: "Menu" });
      const panel = page.locator("[id$=-menu]");

      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();
      await expect(panel).toHaveAttribute("data-state", "closed");

      await toggle.focus();
      await page.keyboard.press("Enter");
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await expect(panel).toHaveAttribute("data-state", "open");
      await expect(panel.getByRole("link", { name: "Docs" })).toHaveAttribute(
        "aria-current",
        "page",
      );

      await page.keyboard.press("Tab");
      await expect(panel.getByRole("link", { name: "Docs" })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(toggle).toBeFocused();

      await page.keyboard.press("Enter");
      await expect(panel).toBeVisible();
      await page.keyboard.press("Enter");
      await expect(panel).toBeHidden();
    });

    test("accordion: Enter dan Spasi membuka, single eksklusif", async ({
      page,
    }) => {
      await openFixture(page, framework, "accordion");
      const details = page.locator("details");
      const summary = (name: string) =>
        page.locator("summary", { hasText: name });

      await expect(details.nth(0)).toHaveAttribute("open", "");
      await expect(details.nth(1)).not.toHaveAttribute("open");

      await summary("Which payment methods").focus();
      await page.keyboard.press("Enter");
      await expect(details.nth(1)).toHaveAttribute("open", "");
      await expect(details.nth(0)).not.toHaveAttribute("open");
      await expect(page.getByText("Bank transfer")).toBeVisible();

      await summary("How do I return").focus();
      await page.keyboard.press("Space");
      await expect(details.nth(2)).toHaveAttribute("open", "");
      await expect(details.nth(1)).not.toHaveAttribute("open");

      await page.keyboard.press("Space");
      await expect(details.nth(2)).not.toHaveAttribute("open");
    });

    test("pagination: link, aria-current, dan ujung nonaktif", async ({
      page,
    }) => {
      await openFixture(page, framework, "pagination");
      const nav = page.getByRole("navigation", { name: "Pagination" });

      await expect(nav.getByRole("link", { name: "5" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(nav.locator("[aria-current]")).toHaveCount(1);
      await expect(nav.getByRole("link", { name: "Previous" })).toHaveAttribute(
        "href",
        "?p=4",
      );
      await expect(nav.getByRole("link", { name: "Next" })).toHaveAttribute(
        "href",
        "?p=6",
      );
      await expect(nav.getByRole("link")).toHaveText([
        "Previous",
        "1",
        "4",
        "5",
        "6",
        "10",
        "Next",
      ]);
    });

    test("breadcrumb: link dan halaman saat ini", async ({ page }) => {
      await openFixture(page, framework, "breadcrumb");
      const nav = page.getByRole("navigation", { name: "Breadcrumb" });

      await expect(nav.getByRole("link")).toHaveText(["Home", "Components"]);
      await expect(nav.getByRole("listitem")).toHaveCount(3);
      const current = nav.locator('[aria-current="page"]');
      await expect(current).toHaveText("Breadcrumb");
      await expect(current).not.toHaveAttribute("href");
    });
  });
}

for (const theme of themes) {
  test(`navbar terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "navbar",
      theme,
      async (p) => {
        await openNavbar(p);
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });

  test(`accordion bagian terakhir terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "accordion",
      theme,
      async (p) => {
        await p.locator("summary", { hasText: "How do I return" }).click();
        await p.locator("details").nth(2).and(p.locator("[open]")).waitFor();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });
}
