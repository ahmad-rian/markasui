<script lang="ts" module>
  /** Separators and short units per currency. IDR follows id-ID, USD follows en-US. */
  const CURRENCIES = {
    IDR: {
      symbol: "Rp",
      group: ".",
      decimal: ",",
      fraction: 0,
      short: "",
      units: [
        [1e6, "jt"],
        [1e3, "rb"],
      ],
    },
    USD: {
      symbol: "$",
      group: ",",
      decimal: ".",
      fraction: 2,
      short: "$",
      units: [
        [1e6, "M"],
        [1e3, "K"],
      ],
    },
  } as const;
  type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];
  export type CurrencyCode = keyof typeof CURRENCIES;

  const groupDigits = (digits: string, c: Currency) =>
    digits.replace(/\B(?=(\d{3})+(?!\d))/g, c.group);

  /** 12500000 -> "12.500.000". Decimals show only when they are not zero. */
  function formatAmount(value: number, c: Currency) {
    const [int = "0", frac = ""] = Math.abs(value)
      .toFixed(c.fraction)
      .split(".");
    return groupDigits(int, c) + (/[1-9]/.test(frac) ? c.decimal + frac : "");
  }

  /** 50000 -> "50rb", 1500000 -> "1,5jt", 1000 USD -> "$1K". */
  function shortAmount(value: number, c: Currency) {
    const unit = c.units.find(([size]) => value >= size);
    if (!unit) return c.short + formatAmount(value, c);
    const scaled = String(Number((value / unit[0]).toFixed(1)));
    return c.short + scaled.replace(".", c.decimal) + unit[1];
  }

  /** Typed text -> clean grouped text and its number (null when empty). */
  function parseTyped(raw: string, c: Currency) {
    const [head = "", ...tail] = c.fraction ? raw.split(c.decimal) : [raw];
    const int = head.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    const hasDecimal = tail.length > 0;
    const frac = tail.join("").replace(/\D/g, "").slice(0, c.fraction);
    if (!int && !hasDecimal) return { text: "", value: null };
    const whole = int || "0";
    return {
      text: groupDigits(whole, c) + (hasDecimal ? c.decimal + frac : ""),
      value: Number(`${whole}.${frac || "0"}`),
    };
  }

  /** Digits (and the decimal mark) are what the caret position is counted in. */
  const significant = (text: string, c: Currency) =>
    [...text].filter(
      (ch) => /\d/.test(ch) || (c.fraction > 0 && ch === c.decimal),
    ).length;

  function caretAfter(text: string, count: number, c: Currency) {
    let position = 0;
    for (let seen = 0; position < text.length && seen < count; position++)
      if (significant(text[position] ?? "", c)) seen++;
    return position;
  }
</script>

<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const labelClass = "text-sm font-medium text-ink";
  const control =
    "flex h-11 w-full items-center gap-2 rounded-md border border-line bg-surface px-3 text-base transition-colors duration-150 ease-out has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[[aria-invalid=true]]:border-danger motion-reduce:transition-none";
  const prefix = "shrink-0 font-medium text-muted select-none";
  const field =
    "h-full min-w-0 flex-1 bg-transparent font-medium text-ink tabular-nums outline-none placeholder:text-faint disabled:cursor-not-allowed disabled:text-muted";
  const chips = "flex flex-wrap gap-2 pt-1";
  const chip =
    "inline-flex h-8 items-center rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink tabular-nums transition-[background-color,border-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 aria-pressed:border-primary aria-pressed:bg-primary-soft motion-reduce:transition-none";
  const hintClass = "text-sm text-muted";
  const errorClass = "text-sm text-danger";

  const COUNT_MS = 400;

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  type Props = Omit<
    HTMLInputAttributes,
    "type" | "value" | "min" | "max" | "children"
  > & {
    label?: string;
    hint?: string;
    error?: string;
    currency?: CurrencyCode;
    min?: number;
    max?: number;
    /** Amount, bindable with bind:value. */
    value?: number | null;
    defaultValue?: number | null;
    /** Quick amount chips below the field. */
    presets?: number[];
    presetsLabel?: string;
    onValueChange?: (value: number | null) => void;
  };

  let {
    label,
    hint,
    error,
    currency = "IDR",
    min,
    max,
    value = $bindable(),
    defaultValue = null,
    presets = [],
    presetsLabel = "Quick amounts",
    onValueChange,
    name,
    id,
    disabled,
    class: className,
    onkeydown,
    onblur,
    ...rest
  }: Props = $props();

  const c = $derived(CURRENCIES[currency]);
  const generatedId = $props.id();
  const inputId = $derived(id ?? generatedId);
  const currencyId = $derived(`${inputId}-currency`);
  const messageId = $derived(
    error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined,
  );
  let current = $state<number | null>(
    untrack(() => value ?? defaultValue ?? null),
  );
  let text = $state(
    untrack(() => (current === null ? "" : formatAmount(current, c))),
  );
  let frame = 0;
  // onDestroy juga berjalan saat render server, tempat cancelAnimationFrame tidak ada.
  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
  });

  // Values set from outside (bind:value) reformat the field; our own updates are skipped.
  $effect.pre(() => {
    const next = value;
    if (next === undefined || next === untrack(() => current)) return;
    cancelAnimationFrame(frame);
    current = next;
    text =
      next === null
        ? ""
        : formatAmount(
            next,
            untrack(() => c),
          );
  });

  const clamp = (n: number) =>
    Math.min(Math.max(n, min ?? -Infinity), max ?? Infinity);

  function commit(next: number | null) {
    current = next;
    value = next;
    onValueChange?.(next);
  }

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    cancelAnimationFrame(frame);
    const input = event.currentTarget;
    const count = significant(
      input.value.slice(0, input.selectionStart ?? input.value.length),
      c,
    );
    const parsed = parseTyped(input.value, c);
    // Write the formatted text first so the caret can be placed before Svelte updates.
    input.value = parsed.text;
    const position = caretAfter(parsed.text, count, c);
    input.setSelectionRange(position, position);
    text = parsed.text;
    commit(parsed.value);
  }

  /** Backspace or Delete next to a separator removes the digit behind it instead. */
  function handleKeydown(
    event: KeyboardEvent & { currentTarget: HTMLInputElement },
  ) {
    onkeydown?.(event);
    const input = event.currentTarget;
    const at = input.selectionStart;
    if (at === null || at !== input.selectionEnd) return;
    if (event.key === "Backspace" && input.value[at - 1] === c.group)
      input.setSelectionRange(at - 1, at - 1);
    if (event.key === "Delete" && input.value[at] === c.group)
      input.setSelectionRange(at + 1, at + 1);
  }

  function handleBlur(event: FocusEvent & { currentTarget: HTMLInputElement }) {
    onblur?.(event);
    if (current === null) return;
    const next = clamp(current);
    text = formatAmount(next, c);
    if (next !== current) commit(next);
  }

  /** Jump to a preset, counting the digits up or down on the way. */
  function pick(preset: number) {
    const target = clamp(preset);
    const from = current ?? 0;
    commit(target);
    cancelAnimationFrame(frame);
    if (reducedMotion() || typeof requestAnimationFrame !== "function") {
      text = formatAmount(target, c);
      return;
    }
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      const step = 10 ** c.fraction;
      text = formatAmount(
        Math.round((from + (target - from) * eased) * step) / step,
        c,
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }
</script>

<div class={wrapper}>
  {#if label}
    <label for={inputId} class={labelClass}>{label}</label>
  {/if}
  <div class={control}>
    <span id={currencyId} class={prefix}>{c.symbol}</span>
    <input
      id={inputId}
      type="text"
      inputmode={c.fraction ? "decimal" : "numeric"}
      autocomplete="off"
      value={text}
      {disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={[currencyId, messageId].filter(Boolean).join(" ")}
      class={[field, className]}
      {...rest}
      oninput={handleInput}
      onkeydown={handleKeydown}
      onblur={handleBlur}
    />
  </div>
  {#if name}
    <input type="hidden" {name} value={current ?? ""} />
  {/if}
  {#if error}
    <p id={`${inputId}-error`} class={errorClass}>{error}</p>
  {:else if hint}
    <p id={`${inputId}-hint`} class={hintClass}>{hint}</p>
  {/if}
  {#if presets.length > 0}
    <div role="group" aria-label={presetsLabel} class={chips}>
      {#each presets as preset (preset)}
        <button
          type="button"
          aria-pressed={current === preset}
          {disabled}
          class={chip}
          onclick={() => pick(preset)}>{shortAmount(preset, c)}</button
        >
      {/each}
    </div>
  {/if}
</div>
