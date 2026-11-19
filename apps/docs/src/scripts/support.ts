/**
 * /support form and /support/thanks status (pages in src/pages/[...lang]/support). The form posts JSON to
 * /api/donate (deploy/donate/server.mjs) and navigates to the Sumopod checkout URL it returns. CSP: the fetch is
 * same-origin (connect-src 'self'), and navigation is not limited by CSP.
 */
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
  const syncPresets = () => {
    for (const button of presets)
      button.setAttribute(
        "aria-pressed",
        String(Number(button.dataset.preset) === amount()),
      );
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
        Number.isInteger(amount()) && amount() >= min && amount() <= max
          ? ""
          : text("errorAmount"),
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
  const status = document.querySelector<HTMLElement>("[data-support-status]");
  const order = new URLSearchParams(location.search).get("order") ?? "";
  if (status && ORDER_PATTERN.test(order)) void pollStatus(status, order);
});
