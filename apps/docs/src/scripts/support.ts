/**
 * /support form, supporters list and /support/thanks status (pages in src/pages/[...lang]/support). The form posts
 * JSON to /api/donate (deploy/donate/server.mjs) and navigates to the Sumopod checkout URL it returns. The supporters
 * list comes from /api/donate/supporters and is rendered with textContent only, never as HTML. CSP: every fetch is
 * same-origin (connect-src 'self'), and navigation is not limited by CSP.
 */
import {
  SUPPORTERS_SHOWN,
  SUPPORT_AMOUNT_PARAM,
  parseSupportAmount,
} from "../lib/support";
import { onPageLoad } from "./lifecycle";

/** Same list as CHECKOUT_PREFIXES in deploy/donate/server.mjs. */
const CHECKOUT_PREFIXES = [
  "https://pay.sumopod.com/",
  "https://checkout.pymnt.app/",
];
const ORDER_PATTERN = /^KOPI-\d{8}-[A-Z2-7]{16}$/;
const STATUS_ATTEMPTS = 5;
const STATUS_INTERVAL_MS = 3000;
const NAME_MAX = 40;
const MESSAGE_MAX = 140;

type FieldName = "amount" | "name" | "message";
type ThanksState = "checking" | "received" | "waiting" | "failed";

const digits = (text: string) =>
  text.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
const group = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** "Kamu mentraktir {what}, {amount}." with the placeholders filled in. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
const length = (text: string) => [...text].length;

/** Reformats "25000" as "25.000" while typing, keeping the caret after the same digit. */
function formatAmountInput(input: HTMLInputElement) {
  const caret = input.selectionStart ?? input.value.length;
  const digitsBefore = digits(input.value.slice(0, caret)).length;
  const next = group(digits(input.value).slice(0, 9));
  input.value = next;
  let position = 0;
  for (
    let seen = 0;
    position < next.length && seen < digitsBefore;
    position++
  ) {
    if (/\d/.test(next[position]!)) seen++;
  }
  if (document.activeElement === input)
    input.setSelectionRange(position, position);
}

function setupForm(form: HTMLFormElement) {
  if (form.dataset.ready) return;
  form.dataset.ready = "";
  const amountInput = form.querySelector<HTMLInputElement>("#support-amount")!;
  const nameInput = form.querySelector<HTMLInputElement>("#support-name")!;
  const messageInput =
    form.querySelector<HTMLTextAreaElement>("#support-message")!;
  const submit = form.querySelector<HTMLButtonElement>(
    "[data-support-submit]",
  )!;
  const alert = form.querySelector<HTMLElement>("[data-support-error]")!;
  const summary = form.querySelector<HTMLElement>("[data-support-summary]")!;
  const presets = [
    ...form.querySelectorAll<HTMLButtonElement>("[data-preset]"),
  ];
  const inputs: Record<FieldName, HTMLInputElement | HTMLTextAreaElement> = {
    amount: amountInput,
    name: nameInput,
    message: messageInput,
  };
  const min = Number(form.dataset.min);
  const max = Number(form.dataset.max);
  const text = (key: string) => form.dataset[key] ?? "";
  let busy = false;

  const amount = () => Number(digits(amountInput.value) || "0");
  const inRange = () => amount() >= min && amount() <= max;
  const syncSummary = () => {
    const chosen = presets.find(
      (button) => Number(button.dataset.preset) === amount(),
    );
    const values = {
      what: chosen?.dataset.phrase ?? "",
      amount: `Rp ${group(String(amount()))}`,
    };
    if (chosen) summary.textContent = fill(text("summaryPreset"), values);
    else
      summary.textContent = inRange()
        ? fill(text("summaryCustom"), values)
        : "";
  };
  const syncPresets = () => {
    for (const button of presets)
      button.setAttribute(
        "aria-pressed",
        String(Number(button.dataset.preset) === amount()),
      );
    syncSummary();
  };
  const setFieldError = (field: FieldName, message: string) => {
    const element = form.querySelector<HTMLElement>(
      `[data-field-error="${field}"]`,
    )!;
    element.textContent = message;
    element.hidden = !message;
    inputs[field].setAttribute("aria-invalid", String(Boolean(message)));
  };
  const setBusy = (value: boolean) => {
    busy = value;
    submit.disabled = value;
    submit.setAttribute("aria-busy", String(value));
    submit.querySelector<HTMLElement>("[data-label-idle]")!.hidden = value;
    submit.querySelector<HTMLElement>("[data-label-busy]")!.hidden = !value;
    for (const button of presets) button.disabled = value;
  };

  const validate = () => {
    const errors: Record<FieldName, string> = {
      amount:
        Number.isInteger(amount()) && inRange() ? "" : text("errorAmount"),
      name: length(nameInput.value.trim()) <= NAME_MAX ? "" : text("errorName"),
      message:
        length(messageInput.value.trim()) <= MESSAGE_MAX
          ? ""
          : text("errorMessage"),
    };
    for (const field of Object.keys(errors) as FieldName[])
      setFieldError(field, errors[field]);
    const first = (Object.keys(errors) as FieldName[]).find(
      (field) => errors[field],
    );
    if (first) inputs[first].focus();
    return !first;
  };

  for (const button of presets) {
    button.addEventListener("click", () => {
      amountInput.value = group(button.dataset.preset ?? "");
      syncPresets();
      setFieldError("amount", "");
    });
  }
  // ?amount= from the floating coffee card's chips preselects that amount.
  const requested = parseSupportAmount(
    new URLSearchParams(location.search).get(SUPPORT_AMOUNT_PARAM),
  );
  if (requested !== null) {
    amountInput.value = group(String(requested));
    syncPresets();
  }
  amountInput.addEventListener("input", () => {
    formatAmountInput(amountInput);
    syncPresets();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy) return;
    alert.textContent = "";
    if (!validate()) return;
    setBusy(true);
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount(),
          name: nameInput.value.trim() || undefined,
          message: messageInput.value.trim() || undefined,
          locale: form.dataset.locale,
        }),
      });
      const data: { url?: unknown } = response.ok ? await response.json() : {};
      if (
        typeof data.url === "string" &&
        CHECKOUT_PREFIXES.some((prefix) =>
          (data.url as string).startsWith(prefix),
        )
      ) {
        location.assign(data.url);
        return;
      }
      alert.textContent = text(
        response.status === 429
          ? "errorRate"
          : response.status === 400
            ? "errorAmount"
            : "errorGeneric",
      );
    } catch {
      alert.textContent = text("errorGeneric");
    }
    setBusy(false);
  });

  // Back from the checkout page (bfcache): the form must be usable again.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && form.isConnected) setBusy(false);
  });
  setBusy(false);
}

interface Supporter {
  name: string | null;
  message: string | null;
  date: string;
}

const isSupporter = (value: unknown): value is Supporter => {
  if (!value || typeof value !== "object") return false;
  const entry = value as Record<string, unknown>;
  const optionalText = (field: unknown) =>
    field === null || typeof field === "string";
  return (
    optionalText(entry.name) &&
    optionalText(entry.message) &&
    typeof entry.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
  );
};

/** Fills the supporters list on /support. Names and messages are set as text, so markup in them stays inert. */
async function loadSupporters(root: HTMLElement) {
  const list = root.querySelector<HTMLElement>("[data-supporters-list]")!;
  const template = document.querySelector<HTMLTemplateElement>(
    "[data-supporter-template]",
  )!;
  const show = (state: "list" | "empty" | "error") => {
    root.querySelector<HTMLElement>("[data-supporters-empty]")!.hidden =
      state !== "empty";
    root.querySelector<HTMLElement>("[data-supporters-error]")!.hidden =
      state !== "error";
    root.setAttribute("aria-busy", "false");
  };
  const dateFormat = new Intl.DateTimeFormat(
    root.dataset.locale === "id" ? "id-ID" : "en-GB",
    { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  );
  try {
    const response = await fetch(root.dataset.endpoint ?? "");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = (await response.json()) as { supporters?: unknown };
    const supporters = Array.isArray(body.supporters)
      ? body.supporters.filter(isSupporter).slice(0, SUPPORTERS_SHOWN)
      : [];
    if (!root.isConnected) return;
    list.replaceChildren(
      ...supporters.map((supporter) => {
        const item = template.content.firstElementChild!.cloneNode(
          true,
        ) as HTMLElement;
        const name = supporter.name || root.dataset.anonymous || "";
        item.querySelector("[data-initial]")!.textContent =
          [...name][0]?.toUpperCase() ?? "";
        item.querySelector("[data-name]")!.textContent = name;
        const time = item.querySelector<HTMLTimeElement>("[data-date]")!;
        time.dateTime = supporter.date;
        time.textContent = dateFormat.format(
          new Date(`${supporter.date}T00:00:00Z`),
        );
        const message = item.querySelector<HTMLElement>("[data-message]")!;
        if (supporter.message) message.textContent = supporter.message;
        else message.remove();
        return item;
      }),
    );
    show(supporters.length ? "list" : "empty");
  } catch (error) {
    if (!root.isConnected) return;
    show("error");
    console.warn("support: supporters list unavailable", error);
  }
}

function showThanks(root: HTMLElement, state: ThanksState) {
  root.dataset.supportStatus = state;
  root
    .querySelectorAll<HTMLElement>("[data-state]")
    .forEach((element) => (element.hidden = element.dataset.state !== state));
  const again = document.querySelector<HTMLElement>("[data-support-again]");
  if (again) again.hidden = state !== "failed";
}

async function pollStatus(root: HTMLElement, order: string) {
  showThanks(root, "checking");
  for (
    let attempt = 0;
    attempt < STATUS_ATTEMPTS && root.isConnected;
    attempt++
  ) {
    try {
      const response = await fetch(
        `/api/donate/status?order=${encodeURIComponent(order)}`,
        { cache: "no-store" },
      );
      const { status } = response.ok
        ? ((await response.json()) as { status?: string })
        : { status: undefined };
      if (status === "completed") return showThanks(root, "received");
      if (status === "failed" || status === "expired")
        return showThanks(root, "failed");
    } catch {
      // Network hiccup: try again, then fall back to "waiting".
    }
    if (attempt < STATUS_ATTEMPTS - 1)
      await new Promise((done) => setTimeout(done, STATUS_INTERVAL_MS));
  }
  if (root.isConnected) showThanks(root, "waiting");
}

onPageLoad(() => {
  const form = document.querySelector<HTMLFormElement>("[data-support-form]");
  if (form) setupForm(form);
  const supporters = document.querySelector<HTMLElement>("[data-supporters]");
  if (supporters) void loadSupporters(supporters);
  const status = document.querySelector<HTMLElement>("[data-support-status]");
  const order = new URLSearchParams(location.search).get("order") ?? "";
  if (status && ORDER_PATTERN.test(order)) void pollStatus(status, order);
});
