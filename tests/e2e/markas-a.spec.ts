import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const dockScale = (page: Page, name: string) =>
  page
    .getByRole("button", { name })
    .evaluate((button) =>
      Number(button.parentElement!.style.getPropertyValue("--dock-scale") || 1),
    );

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("bottom-navigation: pressing an item makes it current and slides the pill", async ({
      page,
    }) => {
      await openFixture(page, framework, "bottom-navigation");
      const nav = page.getByRole("navigation", { name: "Main" });
      const home = nav.getByRole("button", { name: "Home" });
      const cards = nav.getByRole("button", { name: "Cards" });

      await expect(home).toHaveAttribute("aria-current", "page");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("region", { name: "Transactions" }),
      ).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(home).toBeFocused();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await expect(cards).toBeFocused();
      await page.keyboard.press("Enter");

      await expect(cards).toHaveAttribute("aria-current", "page");
      await expect(home).not.toHaveAttribute("aria-current");
      expect(
        await nav.evaluate((el) =>
          el.style.getPropertyValue("--bn-index").trim(),
        ),
      ).toBe("2");
    });

    test("bottom-navigation: the bar shrinks while the list scrolls down and returns on scroll up", async ({
      page,
    }) => {
      await openFixture(page, framework, "bottom-navigation");
      const region = page.getByRole("region", { name: "Transactions" });
      const bar = page.locator("[data-bottom-nav]");
      await expect(bar).toHaveAttribute("data-state", "expanded");

      await region.evaluate((el) => el.scrollTo({ top: 200 }));
      await expect(bar).toHaveAttribute("data-state", "collapsed");
      await region.evaluate((el) => el.scrollTo({ top: 120 }));
      await expect(bar).toHaveAttribute("data-state", "expanded");
    });

    test("bottom-navigation: the action button is named and badges are read", async ({
      page,
    }) => {
      await openFixture(page, framework, "bottom-navigation--action");
      await expect(
        page.getByRole("button", { name: "New post" }),
      ).toBeVisible();
      await openFixture(page, framework, "bottom-navigation--badges");
      await expect(
        page.getByRole("button", { name: "Updates 12 new" }),
      ).toHaveAttribute("aria-current", "page");
      await openFixture(page, framework, "bottom-navigation--links");
      await expect(
        page.getByRole("link", { name: "Orders 2 new" }),
      ).toHaveAttribute("href", "#orders");
    });

    test("pinned-list: Space pins a row into Pinned, focus follows, and the move is announced", async ({
      page,
    }) => {
      await openFixture(page, framework, "pinned-list");
      const pinnedList = page.getByRole("list", { name: "Pinned" });
      const allList = page.getByRole("list", { name: "All" });
      await expect(pinnedList.getByRole("listitem")).toHaveCount(1);

      await page.keyboard.press("Tab");
      const roadmap = page.getByRole("button", { name: "Pin Q4 roadmap" });
      await page.keyboard.press("Tab");
      await expect(roadmap).toBeFocused();
      await expect(roadmap).toHaveAttribute("aria-pressed", "false");
      await page.keyboard.press("Space");

      await expect(pinnedList.getByRole("listitem")).toHaveCount(2);
      await expect(pinnedList.getByText("Q4 roadmap")).toBeVisible();
      await expect(roadmap).toHaveAttribute("aria-pressed", "true");
      await expect(roadmap).toBeFocused();
      await expect(page.getByRole("status")).toHaveText("Q4 roadmap pinned");

      await page.keyboard.press("Enter");
      await expect(roadmap).toHaveAttribute("aria-pressed", "false");
      await expect(allList.getByRole("listitem").first()).toContainText(
        "Q4 roadmap",
      );
      await expect(page.getByRole("status")).toHaveText("Q4 roadmap unpinned");
    });

    test("pinned-list: rows glide with FLIP when motion is allowed", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "pinned-list");
      await page.getByRole("button", { name: "Pin Standup notes" }).click();
      expect(
        await page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => !(animation instanceof CSSTransition))
              .length,
        ),
      ).toBeGreaterThan(0);
    });

    test("dock: arrows, Home, and End move a single tab stop and show the label", async ({
      page,
    }) => {
      await openFixture(page, framework, "dock");
      const toolbar = page.getByRole("toolbar", { name: "Dock" });
      const files = toolbar.getByRole("button", { name: "Files" });
      const mail = toolbar.getByRole("button", { name: "Mail" });
      const trash = toolbar.getByRole("button", { name: "Trash" });

      await page.keyboard.press("Tab");
      await expect(files).toBeFocused();
      await expect(files).toHaveAttribute("aria-current", "true");
      await expect(files.getByText("Files")).toHaveCSS("opacity", "1");
      await page.keyboard.press("ArrowRight");
      await expect(mail).toBeFocused();
      await expect(mail).toHaveAttribute("tabindex", "0");
      await expect(files).toHaveAttribute("tabindex", "-1");
      await page.keyboard.press("End");
      await expect(trash).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(files).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await expect(trash).toBeFocused();
      await page.keyboard.press("Home");
      await expect(files).toBeFocused();
      await expect(toolbar.getByRole("separator")).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
      await page.keyboard.press("Tab");
      await expect(toolbar.locator(":focus")).toHaveCount(0);
    });

    test("dock: items grow toward the pointer and focus, and reduced motion keeps them still", async ({
      page,
    }) => {
      await openFixture(page, framework, "dock");
      await page.getByRole("button", { name: "Music" }).hover();
      expect(await dockScale(page, "Music")).toBe(1);

      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "dock");
      await page.getByRole("button", { name: "Music" }).hover();
      await expect.poll(() => dockScale(page, "Music")).toBeGreaterThan(1.4);
      expect(await dockScale(page, "Photos")).toBeGreaterThan(1);
      expect(await dockScale(page, "Files")).toBe(1);
      await page.mouse.move(0, 0);
      await expect.poll(() => dockScale(page, "Music")).toBe(1);

      await page.keyboard.press("Tab");
      await expect.poll(() => dockScale(page, "Files")).toBeGreaterThan(1.4);
    });
  });
}

for (const theme of themes) {
  test(`pinned-list after pinning (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "pinned-list",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Pin Brand guidelines" }).click();
        await p.mouse.move(0, 0);
        await p.locator("body").click({ position: { x: 1, y: 1 } });
        return screenshot(p);
      },
    );
  });

  test(`dock with keyboard focus (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "dock",
      theme,
      async (p) => {
        await p.keyboard.press("Tab");
        await p.keyboard.press("ArrowRight");
        return screenshot(p);
      },
    );
  });

  test(`bottom-navigation collapsed (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "bottom-navigation",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Activity" }).click();
        await p
          .getByRole("region", { name: "Transactions" })
          .evaluate((el) => el.scrollTo({ top: 200 }));
        await p.locator("[data-bottom-nav=collapsed]").waitFor();
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });
}
