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

const openAlertDialog = async (page: Page) => {
  await page.getByRole("button", { name: "Publish post" }).click();
  await page.locator("dialog[open]").waitFor();
};

const openPopover = async (page: Page) => {
  await page.getByRole("button", { name: "Share" }).click();
  await page.getByRole("dialog").waitFor();
};

const returnValue = (page: Page) =>
  page.locator("dialog").evaluate((el: HTMLDialogElement) => el.returnValue);

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("alert-dialog: Enter membuka, fokus di batal, Escape memilih batal", async ({
      page,
    }) => {
      await openFixture(page, framework, "alert-dialog");
      const trigger = page.getByRole("button", { name: "Publish post" });
      const dialog = page.getByRole("alertdialog", {
        name: "Publish this post?",
      });

      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-state", "open");
      await expect(dialog).toHaveAccessibleDescription(
        "Your post will be visible to everyone who follows your blog.",
      );
      await expect(page.getByRole("button", { name: "Cancel" })).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Continue" }),
      ).toBeFocused();
      await expectNoAxeViolations(page);

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(page.locator("dialog")).toHaveAttribute(
        "data-state",
        "closed",
      );
      await expect(trigger).toBeFocused();
      expect(await returnValue(page)).toBe("cancel");
    });

    test("alert-dialog: backdrop tidak menutup, tombol aksi dan batal menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "alert-dialog");
      const dialog = page.getByRole("alertdialog");

      await openAlertDialog(page);
      await page.mouse.click(5, 5);
      await expect(dialog).toBeVisible();

      await page.getByRole("button", { name: "Continue" }).click();
      await expect(dialog).toBeHidden();
      expect(await returnValue(page)).toBe("action");

      await openAlertDialog(page);
      expect(await returnValue(page)).toBe("");
      await page.getByRole("button", { name: "Cancel" }).click();
      await expect(dialog).toBeHidden();
      expect(await returnValue(page)).toBe("cancel");
    });

    test("popover: Enter membuka dan fokus masuk, Escape menutup ke pemicu", async ({
      page,
    }) => {
      await openFixture(page, framework, "popover");
      const trigger = page.getByRole("button", { name: "Share" });
      const panel = page.getByRole("dialog", { name: "Share" });

      await page.keyboard.press("Tab");
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await page.keyboard.press("Enter");
      await expect(panel).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toHaveAttribute("data-state", "open");
      await expect(
        page.getByRole("button", { name: "Copy link" }),
      ).toBeFocused();
      await expectNoAxeViolations(page);

      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");

      await page.keyboard.press("Space");
      await expect(panel).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
    });

    test("popover: posisi bawah rata awal, klik pemicu dan klik di luar menutup", async ({
      page,
    }) => {
      await openFixture(page, framework, "popover");
      const trigger = page.getByRole("button", { name: "Share" });
      const panel = page.getByRole("dialog");

      await openPopover(page);
      const triggerBox = (await trigger.boundingBox())!;
      const panelBox = (await panel.boundingBox())!;
      expect(panelBox.y).toBeGreaterThan(triggerBox.y + triggerBox.height);
      expect(Math.round(panelBox.x)).toBe(Math.round(triggerBox.x));

      await trigger.click();
      await expect(panel).toBeHidden();

      await openPopover(page);
      await page.mouse.click(700, 500);
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
    });

    test("popover: mengikuti pemicu saat tata letak berubah", async ({
      page,
    }) => {
      await openFixture(page, framework, "popover");
      const trigger = page.getByRole("button", { name: "Share" });
      const panel = page.getByRole("dialog");
      await openPopover(page);

      await page.evaluate(() => {
        document.getElementById("fixture")!.style.marginTop = "120px";
        window.dispatchEvent(new Event("resize"));
      });

      const triggerBox = (await trigger.boundingBox())!;
      const panelBox = (await panel.boundingBox())!;
      const triggerBottom = triggerBox.y + triggerBox.height;
      expect(triggerBox.y).toBeGreaterThan(120);
      expect(panelBox.y).toBeGreaterThanOrEqual(triggerBottom);
      expect(panelBox.y).toBeLessThanOrEqual(triggerBottom + 12);
    });

    test("popover: side top dan align end", async ({ page }) => {
      await openFixture(page, framework, "popover--top");
      const top = page.getByRole("button", { name: "Set status" });
      await top.click();
      const topBox = (await top.boundingBox())!;
      const topPanel = (await page.getByRole("dialog").boundingBox())!;
      expect(topPanel.y + topPanel.height).toBeLessThan(topBox.y);
      expect(
        Math.abs(
          topPanel.x + topPanel.width / 2 - (topBox.x + topBox.width / 2),
        ),
      ).toBeLessThan(2);

      await openFixture(page, framework, "popover--icon-trigger");
      const icon = page.getByRole("button", { name: "Notification settings" });
      await icon.click();
      const iconBox = (await icon.boundingBox())!;
      const endPanel = (await page.getByRole("dialog").boundingBox())!;
      expect(Math.round(endPanel.x + endPanel.width)).toBe(
        Math.round(iconBox.x + iconBox.width),
      );
      await expect(
        page.getByRole("checkbox", { name: "Mentions" }),
      ).toBeFocused();
    });

    test("hover-card: fokus menampilkan langsung, Escape menyembunyikan", async ({
      page,
    }) => {
      await openFixture(page, framework, "hover-card");
      const link = page.getByRole("link", { name: "@markasui" });
      const card = page.locator("[popover=manual]");

      await expect(card).toBeHidden();
      await expect(link).toHaveAccessibleDescription(/Markas UI/);
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute("data-state", "open");

      const linkBox = (await link.boundingBox())!;
      const cardBox = (await card.boundingBox())!;
      expect(cardBox.y).toBeGreaterThan(linkBox.y + linkBox.height);
      await expectNoAxeViolations(page);

      await page.keyboard.press("Escape");
      await expect(card).toBeHidden();
      await expect(link).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(card).toBeHidden();
    });

    test("hover-card: hover menunggu jeda, mouse keluar menyembunyikan", async ({
      page,
    }) => {
      await openFixture(page, framework, "hover-card");
      const card = page.locator("[popover=manual]");

      await page.getByRole("link", { name: "@markasui" }).hover();
      await page.waitForTimeout(150);
      await expect(card).toBeHidden();
      await expect(card).toBeVisible();

      await page.mouse.move(0, 0);
      await expect(card).toBeHidden();
    });
  });
}

for (const theme of themes) {
  test(`alert-dialog terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "alert-dialog",
      theme,
      async (p) => {
        await openAlertDialog(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`popover terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "popover",
      theme,
      async (p) => {
        await openPopover(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });

  test(`hover-card terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "hover-card",
      theme,
      async (p) => {
        await p.getByRole("link", { name: "@markasui" }).focus();
        await p.locator("[popover=manual]").waitFor();
        return screenshot(p, "page");
      },
    );
  });
}
