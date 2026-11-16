import type { Page } from "@playwright/test";
import { recorder, trackErrors, waitForLivewire, type Audit } from "../lib.ts";

const ROUND_TRIPS = 5;

/** Count window and document listeners per event type through the Chrome DevTools protocol. */
async function countListeners(page: Page): Promise<Record<string, number>> {
  const cdp = await page.context().newCDPSession(page);
  const counts: Record<string, number> = {};
  for (const target of ["window", "document"]) {
    const { result } = await cdp.send("Runtime.evaluate", {
      expression: target,
    });
    if (!result.objectId) continue;
    const { listeners } = await cdp.send("DOMDebugger.getEventListeners", {
      objectId: result.objectId,
    });
    for (const listener of listeners) {
      const key = `${target}:${listener.type}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  await cdp.detach();
  return counts;
}

/** Navigating back and forth with wire:navigate never stacks listeners, dialogs, or toasts. */
export const navigateAudit: Audit = async ({ browser, base }) => {
  const { result, record } = recorder("wire:navigate");
  const page = await browser.newPage({
    viewport: { width: 1000, height: 800 },
  });
  const errors = trackErrors(page);
  const go = async (link: string, marker: string) => {
    await page.click(link);
    await page.waitForSelector(marker);
    await page.waitForTimeout(400);
  };

  try {
    await page.goto(`${base}/nav/a`);
    await waitForLivewire(page);
    await page.waitForTimeout(500);
    await go("#to-b", "#page-b");
    await go("#to-a", "#page-a");
    const first = await countListeners(page);
    for (let i = 0; i < ROUND_TRIPS; i++) {
      await go("#to-b", "#page-b");
      await go("#to-a", "#page-a");
    }
    const later = await countListeners(page);
    const grew = Object.keys(later)
      .filter((key) => (later[key] ?? 0) > (first[key] ?? 0))
      .map((key) => `${key} ${first[key] ?? 0} -> ${later[key]}`);
    record(
      grew.length === 0,
      `no listener growth after ${ROUND_TRIPS} round trips`,
      grew.join(", "),
    );

    await page.keyboard.press("Control+k");
    await page.waitForTimeout(300);
    const dialogs = await page.evaluate(
      () =>
        [...document.querySelectorAll("dialog")].filter((d) => d.open).length,
    );
    record(
      dialogs === 1,
      "Ctrl+K opens exactly one command dialog",
      `open dialogs: ${dialogs}`,
    );
    await page.keyboard.press("Escape");

    await page.evaluate(() =>
      window.dispatchEvent(
        new CustomEvent("markas-toast", { detail: { title: "Saved" } }),
      ),
    );
    await page.waitForTimeout(400);
    const toasts = await page.evaluate(
      () =>
        [...document.querySelectorAll("#page-a *")].filter(
          (el) =>
            el.children.length === 0 && el.textContent?.trim() === "Saved",
        ).length,
    );
    record(toasts === 1, "one toast per event", `toasts: ${toasts}`);

    await page.click("#lw-bump");
    await page.waitForTimeout(400);
    record(
      errors.length === 0,
      "no errors after navigating and re-rendering",
      errors.slice(0, 3).join(" ; "),
    );
  } catch (error) {
    record(false, "navigate pages", String(error).slice(0, 200));
  } finally {
    await page.close();
  }
  return result;
};

/** Livewire 4 islands: ids, an open popover, and the active tab inside an island survive the island's own re-render. */
export const islandsAudit: Audit = async ({ browser, base }) => {
  const { result, record } = recorder("islands (Livewire 4)");
  const page = await browser.newPage({
    viewport: { width: 1000, height: 800 },
  });
  const errors = trackErrors(page);
  const ids = () =>
    page.evaluate(() =>
      [...document.querySelectorAll("[id^=markas-]")]
        .map((el) => el.id)
        .filter((id) => !/-(tab|panel|trigger)/.test(id)),
    );

  try {
    await page.goto(`${base}/islands`);
    await waitForLivewire(page);
    const before = await ids();
    await page.locator("#island [role=tab]").nth(1).click();
    await page.locator("#island button[popovertarget]").click();
    await page.evaluate(() =>
      document
        .querySelectorAll("#island *")
        .forEach((el) => (el.__markasProbe = 1)),
    );
    for (let tick = 1; tick <= 2; tick++) {
      // A DOM click: a real pointer click outside the open popover would light-dismiss it.
      await page.evaluate(() =>
        document.querySelector<HTMLElement>("#lw-bump")?.click(),
      );
      await page.waitForFunction(
        (n) =>
          document.querySelector("#lw-tick")?.textContent?.trim() === String(n),
        tick,
      );
      await page.waitForTimeout(300);
    }
    const after = await ids();
    record(
      JSON.stringify(before) === JSON.stringify(after),
      "ids stay the same",
      `${before} -> ${after}`,
    );
    const island = await page.evaluate(() => ({
      replaced: [...document.querySelectorAll("#island *")].filter(
        (el) => !el.__markasProbe,
      ).length,
      popoverOpen: Boolean(
        document.querySelector("#island [popover]")?.matches(":popover-open"),
      ),
      activeTab: document.querySelector(
        "#island [role=tab][aria-selected=true]",
      )?.textContent,
    }));
    record(
      island.replaced === 0,
      "no element replaced",
      `replaced: ${island.replaced}`,
    );
    record(island.popoverOpen, "popover stays open");
    record(
      island.activeTab === "Y",
      "active tab stays",
      `active: ${island.activeTab}`,
    );
    record(errors.length === 0, "no errors", errors.slice(0, 3).join(" ; "));
  } catch (error) {
    record(false, "islands page", String(error).slice(0, 200));
  } finally {
    await page.close();
  }
  return result;
};
