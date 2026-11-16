import type { Locator, Page } from "@playwright/test";
import { recorder, SETTLE_MS, type Audit } from "../lib.ts";

/** Component state as rendered by Forms::state() in the #state element. */
type State = Record<string, unknown>;

const json = (value: unknown) => JSON.stringify(value);

/** UI values that must match the Livewire properties after the page loads and after setFromServer(). */
const readUi = (page: Page) =>
  page.evaluate(() => {
    const q = <T extends Element>(test: string, selector: string) =>
      document.querySelector<T>(`[data-test="${test}"] ${selector}`);
    const all = <T extends Element>(test: string, selector: string) => [
      ...document.querySelectorAll<T>(`[data-test="${test}"] ${selector}`),
    ];
    const pressed = (test: string) =>
      all(test, "button[aria-pressed=true]")
        .map((b) => b.textContent?.trim())
        .join(",");
    return {
      text: q<HTMLInputElement>("input", "input")?.value,
      city: q<HTMLSelectElement>("select", "select")?.value,
      agree: q<HTMLInputElement>("checkbox", "input")?.checked,
      notify: q<HTMLInputElement>("switch", "input")?.checked,
      plan: q<HTMLInputElement>("radio", "input:checked")?.value,
      volume: q<HTMLInputElement>("slider", "input[type=range]")?.value,
      volumeLabel: q("slider", "[aria-hidden=true]")?.textContent,
      country: q<HTMLInputElement>("combobox", "input")?.value,
      amount: q<HTMLInputElement>("currency", "input")?.value,
      code: all<HTMLInputElement>("otp", "input")
        .map((i) => i.value)
        .join(""),
      view: pressed("toggle-group"),
      styles: pressed("toggle-group-multi"),
      bold: q("toggle", "button")?.getAttribute("aria-pressed"),
      tags: all<HTMLInputElement>("tags", "input:checked")
        .map((i) => i.value)
        .join(","),
    };
  });

const INITIAL_UI = {
  volumeLabel: "30",
  volume: "30",
  amount: "50.000",
  view: "Week",
  plan: "pro",
  city: "bandung",
};
const SERVER_UI = {
  text: "server",
  city: "surabaya",
  agree: true,
  notify: true,
  plan: "business",
  volume: "80",
  volumeLabel: "80",
  country: "Japan",
  amount: "250.000",
  code: "123456",
  view: "Month",
  styles: "I",
  bold: "true",
  tags: "vue",
};

/** wire:model in both directions, dialogs opened from the server, and wire:markas-* events on the /forms page. */
export const formsAudit: Audit = async ({ browser, base }) => {
  const { result, record } = recorder("wire:model, dialogs, and events");
  const page = await browser.newPage({
    viewport: { width: 1000, height: 900 },
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error).slice(0, 200)));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()))
      errors.push(message.text().slice(0, 200));
  });

  const state = async (): Promise<State> =>
    JSON.parse((await page.locator("#state").textContent()) ?? "{}");
  const t = (test: string): Locator => page.locator(`[data-test="${test}"]`);
  const check = async (
    label: string,
    act: () => Promise<unknown>,
    expect: (s: State) => boolean,
  ) => {
    try {
      await act();
      await page.waitForTimeout(SETTLE_MS);
      const s = await state();
      record(expect(s), label, json(s).slice(0, 300));
    } catch (error) {
      record(false, label, String(error).slice(0, 200));
    }
  };
  const compare = async (prefix: string, want: Record<string, unknown>) => {
    const ui: Record<string, unknown> = await readUi(page);
    for (const [key, value] of Object.entries(want))
      record(
        ui[key] === value,
        `${prefix} ${key}`,
        `got ${json(ui[key])}, want ${json(value)}`,
      );
  };
  const file = (name: string, mimeType = "text/plain") => ({
    name,
    mimeType,
    buffer: Buffer.from(name),
  });

  try {
    await page.goto(`${base}/forms`);
    await page.waitForFunction(() => (window.Livewire?.all().length ?? 0) > 0);
    await compare("initial ui", INITIAL_UI);

    await check(
      "input .live",
      async () => {
        await t("input").locator("input").click();
        await page.keyboard.type("hello", { delay: 120 });
      },
      (s) => s.text === "hello",
    );
    record(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest('[data-test="input"]')),
      ),
      "input keeps focus through live updates",
    );
    await check(
      "input .live.blur",
      async () => {
        await t("blur").locator("input").fill("later");
        await t("input").locator("input").click();
      },
      (s) => s.blurred === "later",
    );
    await check(
      "textarea .live.debounce",
      () => t("textarea").locator("textarea").fill("bio text"),
      (s) => s.bio === "bio text",
    );
    await check(
      "select",
      () => t("select").locator("select").selectOption("jakarta"),
      (s) => s.city === "jakarta",
    );
    await check(
      "checkbox",
      () => t("checkbox").locator("input").check(),
      (s) => s.agree === true,
    );
    await check(
      "checkbox array",
      () => t("tags").locator("input").first().check(),
      (s) => json(s.tags) === '["react"]',
    );
    await check(
      "switch",
      () => t("switch").locator("input").check(),
      (s) => s.notify === true,
    );
    await check(
      "radio-group",
      () => t("radio").locator("input[value=free]").check(),
      (s) => s.plan === "free",
    );
    await check(
      "slider",
      () => t("slider").locator("input[type=range]").fill("55"),
      (s) => Number(s.volume) === 55,
    );
    record(
      (await t("slider")
        .locator("[aria-hidden=true]")
        .first()
        .textContent()) === "55",
      "slider label follows",
    );
    await check(
      "combobox + wire:markas-change",
      async () => {
        await t("combobox").locator("input").click();
        await t("combobox").locator("li", { hasText: "Singapore" }).click();
      },
      (s) => s.country === "sg" && s.picked === "sg",
    );
    await check(
      "currency-input typing",
      async () => {
        await t("currency").locator("input").first().fill("");
        await t("currency")
          .locator("input")
          .first()
          .pressSequentially("12000", { delay: 50 });
      },
      (s) => Number(s.amount) === 12000,
    );
    await check(
      "currency-input preset",
      () => t("currency").locator("button").nth(1).click(),
      (s) => Number(s.amount) === 100000,
    );
    await check(
      "input-otp",
      async () => {
        await t("otp").locator("input").first().click();
        await page.keyboard.type("987654", { delay: 60 });
      },
      (s) => s.code === "987654",
    );
    await check(
      "toggle-group single",
      () => t("toggle-group").locator("button", { hasText: "Day" }).click(),
      (s) => s.view === "day",
    );
    await check(
      "toggle-group multiple",
      () => t("toggle-group-multi").locator("button", { hasText: "B" }).click(),
      (s) => json(s.styles) === '["bold"]',
    );
    await check(
      "toggle",
      () => t("toggle").locator("button").click(),
      (s) => s.bold === true,
    );
    await check(
      "file-dropzone single upload",
      () =>
        t("dropzone")
          .locator("input[type=file]")
          .first()
          .setInputFiles(file("one.png", "image/png")),
      (s) => s.upload === "one.png",
    );
    await check(
      "file-dropzone multiple upload",
      () =>
        t("dropzone-multi")
          .locator("input[type=file]")
          .first()
          .setInputFiles([file("a.txt"), file("b.txt")]),
      (s) => json(s.uploads) === '["a.txt","b.txt"]',
    );
    await check(
      "file-dropzone remove clears property",
      () => t("dropzone").locator("li button").first().click(),
      (s) => s.upload === null,
    );

    await check(
      "modal opens from server",
      () => page.click("#open-modal"),
      (s) => s.showModal === true,
    );
    record(
      await page.evaluate(() =>
        Boolean(
          document.querySelector<HTMLDialogElement>(
            '[data-test="modal"] dialog',
          )?.open,
        ),
      ),
      "modal dialog is open",
    );
    await page.click("#modal-done");
    await page.waitForTimeout(SETTLE_MS);
    record(
      await page.evaluate(
        () =>
          window.Livewire?.all()[0]?.$wire.showModal === false &&
          !document.querySelector<HTMLDialogElement>(
            '[data-test="modal"] dialog',
          )?.open,
      ),
      "modal close sets the deferred property to false",
    );
    await check(
      "drawer trigger sets .live property",
      () => t("drawer").locator("button", { hasText: "Open drawer" }).click(),
      (s) => s.showDrawer === true,
    );
    await check(
      "drawer Escape clears property",
      () => page.keyboard.press("Escape"),
      (s) => s.showDrawer === false,
    );
    await check(
      "alert-dialog wire:markas-action",
      async () => {
        await t("alert").locator("button", { hasText: "Ask" }).click();
        await page.waitForTimeout(200);
        await t("alert").locator("button", { hasText: "Continue" }).click();
      },
      (s) => s.confirmed === "yes" && s.confirmOpen === false,
    );
    await check(
      "dropdown-menu wire:markas-select",
      async () => {
        await t("dropdown").locator("button", { hasText: "Actions" }).click();
        await t("dropdown")
          .locator("[role=menuitem]", { hasText: "Delete" })
          .click();
      },
      (s) => s.picked === "delete",
    );
    await page.click("#server-toast");
    await page.waitForTimeout(SETTLE_MS);
    record(
      (await page.getByText("Saved from server").count()) === 1,
      "server dispatch shows one toast",
    );
    await check(
      "command wire:markas-select",
      async () => {
        await page.click("#open-command");
        await page.waitForTimeout(200);
        await t("command")
          .locator("[role=option]", { hasText: "Settings" })
          .click();
      },
      (s) => s.picked === "settings",
    );
    await check(
      "context-menu wire:markas-select",
      async () => {
        await page.locator("#ctx-area").click({ button: "right" });
        await t("ctx")
          .locator("[role=menuitem]", { hasText: "Rename" })
          .click();
      },
      (s) => s.picked === "rename",
    );

    await check(
      "properties set on the server",
      () => page.click("#set-server"),
      (s) => s.city === "surabaya",
    );
    await compare("server -> ui", SERVER_UI);
  } catch (error) {
    record(false, "forms page", String(error).slice(0, 200));
  } finally {
    await page.close();
  }

  for (const error of new Set(errors))
    result.failures.push(`browser error: ${error}`);
  return result;
};
