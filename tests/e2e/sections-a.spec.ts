import { expect, test } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("faq: Enter and Space open and close a question", async ({ page }) => {
      await openFixture(page, framework, "faq");
      const first = page.locator("#fixture details").first();
      await page.locator("#fixture summary").first().focus();
      await page.keyboard.press("Enter");
      await expect(first).toHaveAttribute("open", "");
      await page.keyboard.press("Space");
      await expect(first).not.toHaveAttribute("open");
    });

    test("faq--cards: exclusive keeps only one question open", async ({
      page,
    }) => {
      await openFixture(page, framework, "faq--cards");
      const details = page.locator("#fixture details");
      await details.nth(0).locator("summary").click();
      await expect(details.nth(0)).toHaveAttribute("open", "");
      await details.nth(1).locator("summary").click();
      await expect(details.nth(1)).toHaveAttribute("open", "");
      await expect(details.nth(0)).not.toHaveAttribute("open");
    });

    test("faq--searchable: typing filters questions and announces no results", async ({
      page,
    }) => {
      await openFixture(page, framework, "faq--searchable");
      const search = page.getByRole("searchbox", { name: "Search questions" });
      const visible = page.locator("#fixture details:visible");
      await search.fill("jakarta");
      await expect(visible).toHaveCount(1);
      await expect(visible).toContainText("Where is my data stored?");
      await search.fill("refund policy");
      await expect(visible).toHaveCount(0);
      await expect(page.getByRole("status")).toHaveText(
        "No questions match your search",
      );
      await search.fill("");
      await expect(visible).toHaveCount(4);
      // Empty live region: still in the DOM, so the next message is announced.
      await expect(page.locator("#fixture [role=status]")).toHaveText("");
    });

    test("faq--categories: tabs follow the WAI-ARIA keyboard pattern", async ({
      page,
    }) => {
      await openFixture(page, framework, "faq--categories");
      const tabs = page.getByRole("tab");
      await expect(tabs).toHaveText(["Billing", "Account", "Security"]);
      await tabs.first().focus();
      await page.keyboard.press("ArrowRight");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await expect(page.getByRole("tabpanel")).toContainText(
        "Can I invite my team?",
      );
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await expect(tabs.nth(2)).toBeFocused();
      await page.keyboard.press("Home");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("End");
      await expect(tabs.nth(2)).toHaveAttribute("tabindex", "0");
      await expect(tabs.first()).toHaveAttribute("tabindex", "-1");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("tabpanel").locator("summary").first(),
      ).toBeFocused();
    });

    test("logo-cloud--marquee: the copy is hidden and the loop pauses on hover", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "logo-cloud--marquee");
      const lists = page.locator("#fixture ul");
      await expect(lists).toHaveCount(2);
      await expect(lists.nth(1)).toHaveAttribute("aria-hidden", "true");
      await expect(lists.nth(1)).toHaveAttribute("inert", "");
      await expect(page.getByRole("listitem")).toHaveCount(6);
      const track = lists.first().locator("..");
      const playState = () =>
        track.evaluate((el) => getComputedStyle(el).animationPlayState);
      await expect.poll(playState).toBe("running");
      // hover() waits for a still element, so move the mouse by hand.
      const box = (await track.locator("..").boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await expect.poll(playState).toBe("paused");
    });

    test("logo-cloud--marquee: reduced motion shows one still list", async ({
      page,
    }) => {
      await openFixture(page, framework, "logo-cloud--marquee");
      await expect(page.locator("#fixture ul").nth(1)).toBeHidden();
      await expect(
        page
          .locator("#fixture ul")
          .first()
          .locator("..")
          .evaluate((el) => getComputedStyle(el).animationName),
      ).resolves.toBe("none");
    });

    test("logo-cloud--grid: linked logos are reachable with Tab", async ({
      page,
    }) => {
      await openFixture(page, framework, "logo-cloud--grid");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: "Nusantara Labs" }),
      ).toBeFocused();
    });
  });
}
