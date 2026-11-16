import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import type { Page } from "@playwright/test";
import { recorder, trackErrors, waitForLivewire, type Audit } from "../lib.ts";

const componentsDir = resolve(import.meta.dirname, "../../../components");
const PARALLEL_PAGES = 4;

/** Mark every element, re-render the component, then count elements Livewire replaced and ids that changed. */
async function rerender(page: Page, tick: number) {
  await page.evaluate(() => {
    let index = 0;
    for (const el of document.querySelectorAll("#lw-example *"))
      el.__markasProbe = ++index;
    window.__markasIds = [...document.querySelectorAll("#lw-example [id]")].map(
      (el) => el.id,
    );
  });
  await page.click("#lw-bump");
  await page.waitForFunction(
    (n) =>
      document.querySelector("#lw-tick")?.textContent?.trim() === String(n),
    tick,
  );
  await page.waitForTimeout(100);
  return page.evaluate(() => {
    const replaced = [...document.querySelectorAll("#lw-example *")].filter(
      (el) => !el.__markasProbe,
    );
    const ids = [...document.querySelectorAll("#lw-example [id]")].map(
      (el) => el.id,
    );
    return {
      replaced: replaced.length,
      idsChanged: ids.filter((id) => !window.__markasIds?.includes(id)).length,
      sample: replaced
        .slice(0, 3)
        .map((el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : "")),
    };
  });
}

/** Every component example survives two Livewire re-renders: no element replaced, no id changed, no error. */
export const morphAudit: Audit = async ({ browser, base }) => {
  const { result, record } = recorder(
    "morph (every component re-renders in place)",
  );
  const queue = readdirSync(componentsDir).sort();

  const worker = async () => {
    for (let name = queue.shift(); name; name = queue.shift()) {
      const page = await browser.newPage({
        viewport: { width: 1000, height: 800 },
      });
      const errors = trackErrors(page);
      try {
        await page.goto(`${base}/c/${name}`);
        await waitForLivewire(page);
        await page.waitForTimeout(150);
        const first = await rerender(page, 1);
        const second = await rerender(page, 2);
        const ok =
          first.replaced + second.replaced + first.idsChanged === 0 &&
          errors.length === 0;
        record(
          ok,
          name,
          JSON.stringify({
            replaced: first.replaced,
            ids: first.idsChanged,
            sample: first.sample,
            errors: errors.slice(0, 2),
          }),
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
