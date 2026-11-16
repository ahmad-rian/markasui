import type { Page } from "@playwright/test";
import { recorder, trackErrors, waitForLivewire, type Audit } from "../lib.ts";

const PARALLEL_PAGES = 4;

/** Open, select, or type something in each component; the state must look the same after a re-render. */
const actions: Record<string, (page: Page) => Promise<unknown>> = {
  modal: (p) => p.locator("#lw-example button").first().click(),
  drawer: (p) => p.locator("#lw-example button").first().click(),
  "alert-dialog": (p) => p.locator("#lw-example button").first().click(),
  command: (p) => p.keyboard.press("Control+k"),
  "dropdown-menu": (p) =>
    p.locator("#lw-example button[popovertarget]").first().click(),
  popover: (p) =>
    p.locator("#lw-example button[popovertarget]").first().click(),
  combobox: (p) =>
    p.locator("#lw-example input[role=combobox]").first().click(),
  "context-menu": (p) =>
    p
      .locator("#lw-example")
      .getByText("Right-click here")
      .click({ button: "right" }),
  "hover-card": (p) => p.locator("#lw-example a").first().focus(),
  tooltip: (p) => p.locator("#lw-example button").first().focus(),
  menubar: (p) =>
    p.locator("#lw-example [role=menubar] button").first().click(),
  "navigation-menu": (p) => p.locator("#lw-example nav button").first().click(),
  tabs: (p) => p.locator("#lw-example [role=tab]").nth(1).click(),
  accordion: (p) => p.locator("#lw-example summary").nth(1).click(),
  collapsible: (p) => p.locator("#lw-example summary").first().click(),
  faq: (p) =>
    p
      .locator("#lw-example summary, #lw-example button[aria-expanded]")
      .nth(1)
      .click(),
  "toggle-group": (p) => p.locator("#lw-example button").nth(2).click(),
  toggle: (p) => p.locator("#lw-example button").first().click(),
  carousel: (p) =>
    p.locator("#lw-example button[aria-label*=ext]").first().click(),
  "expandable-card": (p) => p.locator("#lw-example button").first().click(),
  sidebar: (p) => p.locator("#lw-example button").first().click(),
  navbar: async (p) => {
    await p.setViewportSize({ width: 500, height: 800 });
    await p.locator("#lw-example header button:visible").last().click();
  },
  "theme-toggle": (p) => p.locator("#lw-example button").first().click(),
  "input-otp": (p) => p.locator("#lw-example input").first().fill("4"),
  slider: (p) => p.locator("#lw-example input[type=range]").first().fill("90"),
  "currency-input": (p) =>
    p.locator("#lw-example input[inputmode]").first().fill("777"),
  "dynamic-island": (p) =>
    p.locator("#lw-example button[aria-pressed]").nth(1).click(),
  "bottom-navigation": (p) =>
    p.locator("#lw-example a, #lw-example button").nth(1).click(),
  "prompt-input": (p) =>
    p.locator("#lw-example textarea").first().fill("hello"),
  "file-dropzone": (p) =>
    p
      .locator("#lw-example input[type=file]")
      .first()
      .setInputFiles({
        name: "a.png",
        mimeType: "image/png",
        buffer: Buffer.from("x"),
      }),
};

/** What the user can see: open dialogs, popovers (with position), open details, selected items, field values. */
const snapshot = (page: Page) =>
  page.evaluate(() => {
    const ex = document.querySelector("#lw-example");
    if (!ex) return null;
    return {
      dialogs: [...ex.querySelectorAll("dialog")].filter((d) => d.open).length,
      popovers: [...ex.querySelectorAll<HTMLElement>("[popover]")]
        .filter((p) => p.matches(":popover-open"))
        .map((p) => `${p.id}@${p.style.top},${p.style.left}`),
      details: [...ex.querySelectorAll("details")].filter((d) => d.open).length,
      selected: [
        ...ex.querySelectorAll(
          "[aria-selected=true],[aria-pressed=true],[aria-expanded=true],[data-state=open],[data-state=on],[data-state=active]",
        ),
      ].map((e) => e.id || e.tagName),
      panels: [...ex.querySelectorAll<HTMLElement>("[role=tabpanel]")].map(
        (p) => p.hidden,
      ),
      focused: document.activeElement?.id || document.activeElement?.tagName,
      values: [...ex.querySelectorAll<HTMLInputElement>("input,textarea")]
        .map((i) =>
          i.type === "file" ? String(i.files?.length ?? 0) : i.value,
        )
        .join("|"),
      items: ex.querySelectorAll("li").length,
    };
  });

/** Open dialogs, popovers, tabs, accordions, and filled fields keep their state across a Livewire re-render. */
export const stateAudit: Audit = async ({ browser, base }) => {
  const { result, record } = recorder("open state survives a re-render");
  const queue = Object.keys(actions);

  const worker = async () => {
    for (let name = queue.shift(); name; name = queue.shift()) {
      const page = await browser.newPage({
        viewport: { width: 1000, height: 800 },
      });
      const errors = trackErrors(page);
      try {
        await page.goto(`${base}/c/${name}`);
        await waitForLivewire(page);
        await actions[name]?.(page);
        await page.waitForTimeout(400);
        const before = JSON.stringify(await snapshot(page));
        await page.evaluate(() => window.Livewire?.all()[0]?.$wire.bump());
        await page.waitForTimeout(500);
        const after = JSON.stringify(await snapshot(page));
        record(
          before === after && errors.length === 0,
          name,
          before === after
            ? errors.slice(0, 2).join(" ; ")
            : `before ${before} after ${after}`,
        );
      } catch (error) {
        record(false, name, String(error).slice(0, 200));
      } finally {
        await page.close();
      }
    }
  };

  await Promise.all(Array.from({ length: PARALLEL_PAGES }, worker));
  return result;
};
