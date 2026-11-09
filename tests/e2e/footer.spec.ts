import { expect, test, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const VARIANTS = [
  "footer",
  "footer--centered",
  "footer--newsletter",
  "footer--big-brand",
  "footer--cta",
  "footer--compact",
  "footer--sitemap",
  "footer--minimal-dark",
  "footer--stickers",
  "footer--playful",
  "footer--blobs",
  "footer--illustrated",
  "footer--retro",
  "footer--engraved",
];
const MOBILE = { width: 390, height: 844 };

/** Nama aksesibel elemen yang sedang fokus. */
const focusedName = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    return el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "";
  });

for (const framework of frameworks) {
  test.describe(`${framework} footer`, () => {
    test("footer: Tab berurutan dari status ke link kolom, legal, sosial, lalu Back to top", async ({
      page,
    }) => {
      await openFixture(page, framework, "footer");
      const expected = [
        "All systems normal",
        "Components",
        "Templates",
        "Themes",
        "Pricing",
        "Docs",
        "Changelog",
        "MCP server",
        "Status",
        "About",
        "Blog",
        "Careers",
        "Contact",
        "Privacy",
        "Terms",
        "License",
        "GitHub",
        "X",
        "LinkedIn",
        "YouTube",
        "Back to top",
      ];
      await page.locator("footer a").first().focus();
      const visited = [await focusedName(page)];
      for (let i = 1; i < expected.length; i++) {
        await page.keyboard.press("Tab");
        visited.push(await focusedName(page));
      }
      expect(visited).toEqual(expected);
      await expect(page.locator("footer a:focus-visible")).toHaveCount(1);
    });

    test("footer--centered: sosial difokus sebelum hak cipta, urutan DOM sama dengan visual", async ({
      page,
    }) => {
      await openFixture(page, framework, "footer--centered");
      await page.getByRole("link", { name: "Help" }).focus();
      await page.keyboard.press("Tab");
      expect(await focusedName(page)).toBe("X");
    });

    test("footer--newsletter: Enter dengan email kosong ditolak validasi, email valid menampilkan pesan sukses", async ({
      page,
    }) => {
      await openFixture(page, framework, "footer--newsletter");
      const email = page.getByRole("textbox", { name: "Email address" });
      const status = page.getByRole("status");
      await expect(status).toBeEmpty();

      await email.focus();
      await page.keyboard.press("Enter");
      expect(
        await email.evaluate((el: HTMLInputElement) => el.validity.valid),
      ).toBe(false);
      await expect(status).toBeEmpty();

      await page.keyboard.type("ani@markasui.dev");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Subscribe" }),
      ).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Enter");
      await expect(status).toHaveText("Thanks for subscribing");
      await expect(email).toHaveValue("");
    });

    test("footer: Back to top menggulir ke atas tanpa JavaScript", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1000, height: 400 });
      await openFixture(page, framework, "footer");
      const top = page.getByRole("link", { name: "Back to top" });
      await expect(top).toHaveAttribute("href", "#top");
      await top.scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
      await top.press("Enter");
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });

    test("footer: semua variasi muat di layar 390px tanpa overflow", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE);
      for (const name of VARIANTS) {
        await openFixture(page, framework, name);
        await page.evaluate(() => {
          document.getElementById("fixture")!.style.width = "100%";
        });
        const sizes = await page.evaluate(() => {
          const footer = document.querySelector("footer")!;
          return {
            page: document.documentElement.scrollWidth,
            footer: footer.scrollWidth - footer.clientWidth,
          };
        });
        expect(sizes.page, `${name} lebar halaman`).toBeLessThanOrEqual(
          MOBILE.width,
        );
        expect(sizes.footer, `${name} overflow footer`).toBeLessThanOrEqual(0);
      }
    });
  });
}
