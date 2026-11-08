import { expect, test, type Page } from "@playwright/test";
import { components, frameworks, openFixture } from "./helpers";

/** Lebar ponsel kecil: tidak boleh ada scroll horizontal. */
const PHONE_WIDTH = 390;

const notFoundFixtures = components.filter((name) =>
  name.startsWith("not-found"),
);
const navbarVariations = [
  "centered-logo",
  "announcement",
  "search",
  "dark-glass",
  "app",
  "sidebar-trigger",
].map((slug) => `navbar--${slug}`);

const expectNoOverflow = async (page: Page) => {
  await page.setViewportSize({ width: PHONE_WIDTH, height: 800 });
  await page.evaluate(() => {
    const fixture = document.getElementById("fixture")!;
    fixture.style.width = "100%";
    fixture.style.boxSizing = "border-box";
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
};

for (const framework of frameworks) {
  test.describe(`${framework} not-found`, () => {
    test("not-found: Go back kembali ke halaman sebelumnya lewat keyboard", async ({
      page,
    }) => {
      await openFixture(page, framework, "button");
      const previous = page.url();
      await openFixture(page, framework, "not-found");
      const back = page.getByRole("link", { name: "Go back" });
      await back.focus();
      await page.keyboard.press("Enter");
      await page.waitForURL(previous);
      expect(page.url()).toBe(previous);
    });

    test("not-found: Go back tanpa riwayat menuju homeHref", async ({
      page,
    }) => {
      await openFixture(page, framework, "not-found");
      await page.evaluate(() =>
        Object.defineProperty(history, "length", { get: () => 1 }),
      );
      await page.getByRole("link", { name: "Go back" }).press("Enter");
      await page.waitForURL((url) => url.pathname === "/" && !url.search);
    });

    test("not-found--search: mengetik menyaring tautan dan mengumumkan hasil kosong", async ({
      page,
    }) => {
      await openFixture(page, framework, "not-found--search");
      const list = page.locator("#fixture ul");
      await expect(list.getByRole("link")).toHaveCount(4);
      await page.keyboard.press("Tab");
      const search = page.getByRole("searchbox", { name: "Search pages" });
      await expect(search).toBeFocused();
      await page.keyboard.type("pri");
      await expect(list.getByRole("link")).toHaveText(["Pricing"]);
      await page.keyboard.press("Tab");
      await expect(page.getByRole("link", { name: "Pricing" })).toBeFocused();
      await search.fill("zzz");
      await expect(list).toBeHidden();
      await expect(page.getByRole("status")).toHaveText(
        "No pages match your search",
      );
      await search.fill("");
      await expect(list.getByRole("link")).toHaveCount(4);
      await expect(page.getByRole("status")).toHaveText("");
    });

    test("navbar--announcement: tombol tutup menyembunyikan bar pengumuman", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar--announcement");
      const dismiss = page.getByRole("button", {
        name: "Dismiss announcement",
      });
      await dismiss.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByText("Acme 2.0 is out.")).toBeHidden();
    });

    test("navbar--sidebar-trigger: tombol membuka sidebar, Escape menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar--sidebar-trigger");
      await page.getByRole("button", { name: "Open sidebar" }).click();
      const dialog = page.getByRole("dialog", { name: "Workspace" });
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    });

    test("navbar--app: menu profil terbuka dengan keyboard", async ({
      page,
    }) => {
      await openFixture(page, framework, "navbar--app");
      await page.locator("[aria-haspopup=menu]").focus();
      await page.keyboard.press("ArrowDown");
      await expect(
        page.getByRole("menuitem", { name: "Profile" }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("menu")).toBeHidden();
    });

    for (const name of [...notFoundFixtures, ...navbarVariations]) {
      test(`${name}: tanpa overflow horizontal di lebar ${PHONE_WIDTH}`, async ({
        page,
      }) => {
        await openFixture(page, framework, name);
        await expectNoOverflow(page);
      });
    }
  });
}
