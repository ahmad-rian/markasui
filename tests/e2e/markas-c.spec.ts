import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const files = [
  { name: "brief.pdf", mimeType: "application/pdf", buffer: Buffer.from("a") },
  { name: "logo.png", mimeType: "image/png", buffer: Buffer.from("b") },
];

const attach = (page: Page) =>
  page.locator("input[type=file]").setInputFiles(files);

const height = (page: Page) =>
  page
    .getByRole("textbox", { name: "Message" })
    .evaluate((el) => el.getBoundingClientRect().height);

const opacityOf = (page: Page, name: string) =>
  page
    .getByRole("group", { name })
    .first()
    .evaluate((el) => getComputedStyle(el).opacity);

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("prompt-input: grows, Shift+Enter adds a line, Enter sends and clears", async ({
      page,
    }) => {
      await openFixture(page, framework, "prompt-input");
      const field = page.getByRole("textbox", { name: "Message" });
      const send = page.getByRole("button", { name: "Send" });
      await expect(send).toBeDisabled();
      await expect(page.getByText("0/500")).toBeVisible();

      const start = await height(page);
      await field.click();
      await page.keyboard.type("Line one");
      await expect(send).toBeEnabled();
      await page.keyboard.press("Shift+Enter");
      await page.keyboard.type("Line two");
      await expect(field).toHaveValue("Line one\nLine two");
      await expect(page.getByText("17/500")).toBeVisible();
      expect(await height(page)).toBeGreaterThan(start);

      // Many lines stop at the max height and scroll.
      for (let i = 0; i < 12; i++) await page.keyboard.press("Shift+Enter");
      expect(await height(page)).toBeLessThanOrEqual(200);

      await page.keyboard.press("Enter");
      await expect(field).toHaveValue("");
      await expect(send).toBeDisabled();
      await expect.poll(() => height(page)).toBe(start);
    });

    test("prompt-input: attach button opens files, chips can be removed", async ({
      page,
    }) => {
      await openFixture(page, framework, "prompt-input");
      const chooser = page.waitForEvent("filechooser");
      await page.getByRole("button", { name: "Attach files" }).click();
      expect((await chooser).isMultiple()).toBe(true);

      await attach(page);
      await expect(page.getByRole("listitem")).toHaveText([
        "brief.pdf",
        "logo.png",
      ]);
      await page.getByRole("button", { name: "Remove brief.pdf" }).click();
      await expect(page.getByRole("listitem")).toHaveText(["logo.png"]);
      await expect(
        page.getByRole("textbox", { name: "Message" }),
      ).toBeFocused();

      await page.keyboard.type("Use this logo");
      await page.keyboard.press("Enter");
      await expect(page.getByRole("listitem")).toHaveCount(0);
    });

    test("prompt-input: keyboard reaches attach, model, and send in order", async ({
      page,
    }) => {
      await openFixture(page, framework, "prompt-input");
      const model = page.getByRole("combobox", { name: "Model" });
      await expect(model).toHaveValue("Markas Pro");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("textbox", { name: "Message" }),
      ).toBeFocused();
      await page.keyboard.type("Hi");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Attach files" }),
      ).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(model).toBeFocused();
      await model.selectOption("Markas Mini");
      await expect(model).toHaveValue("Markas Mini");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("button", { name: "Send" })).toBeFocused();
    });

    test("prompt-input: stop ends loading and the next send starts it again", async ({
      page,
    }) => {
      await openFixture(page, framework, "prompt-input--loading");
      const stop = page.getByRole("button", { name: "Stop" });
      await expect(stop).toHaveAttribute("data-state", "stop");
      await page.getByRole("textbox", { name: "Message" }).press("Enter");
      await expect(stop).toBeVisible();

      await stop.click();
      const send = page.getByRole("button", { name: "Send" });
      await expect(send).toBeEnabled();
      await expect(send).toHaveAttribute("data-state", "send");
      await send.click();
      await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
      await expect(page.getByRole("textbox", { name: "Message" })).toHaveValue(
        "",
      );
    });

    test("prompt-input: tool toggles in the actions slot", async ({ page }) => {
      await openFixture(page, framework, "prompt-input--tools");
      const search = page.getByRole("button", { name: "Search" });
      const reason = page.getByRole("button", { name: "Reason" });
      await expect(search).toHaveAttribute("aria-pressed", "true");
      await reason.focus();
      await page.keyboard.press("Space");
      await expect(reason).toHaveAttribute("aria-pressed", "true");
      await search.click();
      await expect(search).toHaveAttribute("aria-pressed", "false");
    });

    test("chat-message: actions appear on focus and hover", async ({
      page,
    }) => {
      await openFixture(page, framework, "chat-message");
      expect(await opacityOf(page, "Message actions")).toBe("0");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Copy" }).first(),
      ).toBeFocused();
      expect(await opacityOf(page, "Message actions")).toBe("1");

      await page.keyboard.press("Shift+Tab");
      await page.getByRole("article", { name: "Markas AI" }).first().hover();
      const group = page
        .getByRole("article", { name: "Markas AI" })
        .first()
        .getByRole("group", { name: "Message actions" });
      await expect(group).toHaveCSS("opacity", "1");
    });

    test("chat-message: like and dislike toggle with the keyboard", async ({
      page,
    }) => {
      await openFixture(page, framework, "chat-message");
      const like = page.getByRole("button", { name: "Good response" });
      const dislike = page.getByRole("button", { name: "Bad response" });
      await like.focus();
      await page.keyboard.press("Enter");
      await expect(like).toHaveAttribute("aria-pressed", "true");
      await page.keyboard.press("Tab");
      await expect(dislike).toBeFocused();
      await page.keyboard.press("Space");
      await expect(dislike).toHaveAttribute("aria-pressed", "true");
      await expect(like).toHaveAttribute("aria-pressed", "false");
      await page.keyboard.press("Space");
      await expect(dislike).toHaveAttribute("aria-pressed", "false");
    });

    test("chat-message: copy writes the message and shows the check", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await openFixture(page, framework, "chat-message");
      const answer = page.getByRole("article", { name: "Markas AI" }).first();
      const copy = answer.getByRole("button", { name: "Copy" });
      await copy.click();
      await expect(copy).toHaveAttribute("data-state", "copied");
      await expect(answer.getByRole("status")).toHaveText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        "Sure. Here is a simple layout for it:\nDesign and build, Rp 12.500.000\nVAT 11%, Rp 1.375.000\nTotal due, Rp 13.875.000",
      );
    });

    test("chat-message: typing dots are announced", async ({ page }) => {
      await openFixture(page, framework, "chat-message");
      const typing = page.getByRole("article", { name: "Markas AI" }).last();
      await expect(typing.getByRole("status")).toHaveText("Typing");
      await expect(typing.getByRole("group")).toHaveCount(0);
    });

    test("chat-message: streaming reveals the answer with motion", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "chat-message--streaming");
      const answer = page.getByRole("article", { name: "Markas AI" });
      const visible = answer.locator("span[aria-hidden=true]:not([class])");
      const full =
        "VAT for October is due by the end of November. Report it in your monthly return and pay before you file, so the payment code is already on record.";
      await expect(answer.locator(".sr-only").first()).toHaveText(full);
      const early = (await visible.textContent()) ?? "";
      expect(early.length).toBeLessThan(full.length);
      await expect(visible).toHaveText(full, { timeout: 5000 });
      await expect(answer.getByRole("group")).toBeVisible();
    });

    test("chat-message: streaming shows everything at once with reduced motion", async ({
      page,
    }) => {
      await openFixture(page, framework, "chat-message--streaming");
      const answer = page.getByRole("article", { name: "Markas AI" });
      await expect(
        answer.locator("span[aria-hidden=true]:not([class])"),
      ).toHaveText(/so the payment code is already on record\.$/);
      await expect(answer.getByRole("group")).toBeAttached();
    });

    test("dynamic-island: demo buttons switch states, hidden states are inert", async ({
      page,
    }) => {
      await openFixture(page, framework, "dynamic-island");
      const island = page.getByRole("region", { name: "Live activity" });
      const live = island.locator("[aria-live=polite]");
      await expect(island).toHaveAttribute("data-state", "compact");
      await expect(live).toHaveText("Focus timer running");
      // The expanded card is inert, so Tab skips it and lands on the demo buttons.
      await page.mouse.click(1, 1);
      await page.keyboard.press("Tab");
      await expect(page.getByRole("button", { name: "Idle" })).toBeFocused();

      await page.getByRole("button", { name: "Expanded" }).click();
      await expect(island).toHaveAttribute("data-state", "expanded");
      await expect(live).toHaveText("Focus timer, 12 minutes 48 seconds left");
      await expect(
        page.getByRole("button", { name: "Expanded" }),
      ).toHaveAttribute("aria-pressed", "true");
      expect((await island.boundingBox())!.height).toBeCloseTo(152, 0);

      // Tab from the page start reaches the buttons inside the expanded card.
      await page.mouse.click(1, 1);
      await page.keyboard.press("Tab");
      await expect(
        island.getByRole("button", { name: "Minimize" }),
      ).toBeFocused();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await expect(island).toHaveAttribute("data-state", "idle");
      await expect(live).toHaveText("");
      expect((await island.boundingBox())!.width).toBeCloseTo(120, 0);
    });

    test("dynamic-island: size morphs with motion", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "dynamic-island");
      const island = page.getByRole("region", { name: "Live activity" });
      const width = () =>
        island.evaluate((el) => el.getBoundingClientRect().width);
      expect(await width()).toBeCloseTo(240, 0);
      await page.getByRole("button", { name: "Expanded" }).click();
      const during = await width();
      expect(during).toBeLessThan(345);
      await expect.poll(width).toBeCloseTo(352, 0);
    });

    test("dynamic-island: call variant answers and declines", async ({
      page,
    }) => {
      await openFixture(page, framework, "dynamic-island--call");
      const island = page.getByRole("region", { name: "Live activity" });
      await expect(island.locator("[aria-live=polite]")).toHaveText(
        "Incoming call from Rina Santoso",
      );
      await island.getByRole("button", { name: "Accept" }).click();
      await expect(island).toHaveAttribute("data-state", "compact");
      await expect(island.getByText("0:42")).toBeVisible();
      await page.getByRole("button", { name: "Ringing" }).click();
      await island.getByRole("button", { name: "Decline" }).click();
      await expect(island).toHaveAttribute("data-state", "idle");
    });
  });
}

for (const theme of themes) {
  test(`prompt-input with chips and text (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "prompt-input",
      theme,
      async (p) => {
        await attach(p);
        await p.getByRole("textbox", { name: "Message" }).fill("Make it blue");
        await p.mouse.move(0, 0);
        return screenshot(p);
      },
    );
  });

  test(`chat-message hover with feedback (${theme}) looks the same`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "chat-message",
      theme,
      async (p) => {
        await p.getByRole("button", { name: "Good response" }).click();
        await p.getByRole("article", { name: "Markas AI" }).first().hover();
        return screenshot(p);
      },
    );
  });

  for (const state of ["Idle", "Expanded"])
    test(`dynamic-island ${state.toLowerCase()} (${theme}) looks the same`, async ({
      page,
    }, testInfo) => {
      await expectSameAcrossFrameworks(
        page,
        testInfo,
        "dynamic-island",
        theme,
        async (p) => {
          await p.getByRole("button", { name: state }).click();
          await p.mouse.move(0, 0);
          return screenshot(p);
        },
      );
    });
}
