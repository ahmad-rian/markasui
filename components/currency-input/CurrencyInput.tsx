"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

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

const COUNT_MS = 400;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const groupDigits = (digits: string, c: Currency) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, c.group);

/** 12500000 -> "12.500.000". Decimals show only when they are not zero. */
function formatAmount(value: number, c: Currency) {
  const [int = "0", frac = ""] = Math.abs(value).toFixed(c.fraction).split(".");
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

export type CurrencyInputProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "min" | "max"
> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  currency?: keyof typeof CURRENCIES;
  min?: number;
  max?: number;
  defaultValue?: number | null;
  /** Quick amount chips below the field. */
  presets?: number[];
  presetsLabel?: string;
  onValueChange?: (value: number | null) => void;
};

export function CurrencyInput({
  label,
  hint,
  error,
  currency = "IDR",
  min,
  max,
  defaultValue = null,
  presets = [],
  presetsLabel = "Quick amounts",
  onValueChange,
  name,
  id,
  disabled,
  className,
  onKeyDown,
  onBlur,
  ...props
}: CurrencyInputProps) {
  const c = CURRENCIES[currency];
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const currencyId = `${inputId}-currency`;
  const messageId = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;
  const [value, setValue] = useState<number | null>(defaultValue);
  const [text, setText] = useState(() =>
    defaultValue === null ? "" : formatAmount(defaultValue, c),
  );
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const clamp = (n: number) =>
    Math.min(Math.max(n, min ?? -Infinity), max ?? Infinity);
  const commit = (next: number | null) => {
    setValue(next);
    onValueChange?.(next);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    cancelAnimationFrame(frame.current);
    const input = event.currentTarget;
    const count = significant(
      input.value.slice(0, input.selectionStart ?? input.value.length),
      c,
    );
    const parsed = parseTyped(input.value, c);
    // Write the formatted text first so the caret can be placed before React re-renders.
    input.value = parsed.text;
    const position = caretAfter(parsed.text, count, c);
    input.setSelectionRange(position, position);
    setText(parsed.text);
    commit(parsed.value);
  };

  /** Backspace or Delete next to a separator removes the digit behind it instead. */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    const input = event.currentTarget;
    const at = input.selectionStart;
    if (at === null || at !== input.selectionEnd) return;
    if (event.key === "Backspace" && input.value[at - 1] === c.group)
      input.setSelectionRange(at - 1, at - 1);
    if (event.key === "Delete" && input.value[at] === c.group)
      input.setSelectionRange(at + 1, at + 1);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    if (value === null) return;
    const next = clamp(value);
    setText(formatAmount(next, c));
    if (next !== value) commit(next);
  };

  /** Jump to a preset, counting the digits up or down on the way. */
  const pick = (preset: number) => {
    const target = clamp(preset);
    const from = value ?? 0;
    commit(target);
    cancelAnimationFrame(frame.current);
    if (reducedMotion() || typeof requestAnimationFrame !== "function") {
      setText(formatAmount(target, c));
      return;
    }
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      const step = 10 ** c.fraction;
      setText(
        formatAmount(
          Math.round((from + (target - from) * eased) * step) / step,
          c,
        ),
      );
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <div className={wrapper}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      <div className={control}>
        <span id={currencyId} className={prefix}>
          {c.symbol}
        </span>
        <input
          id={inputId}
          type="text"
          inputMode={c.fraction ? "decimal" : "numeric"}
          autoComplete="off"
          value={text}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={cx(currencyId, messageId)}
          className={cx(field, className)}
          {...props}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      {error ? (
        <p id={`${inputId}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {presets.length > 0 && (
        <div role="group" aria-label={presetsLabel} className={chips}>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-pressed={value === preset}
              disabled={disabled}
              className={chip}
              onClick={() => pick(preset)}
            >
              {shortAmount(preset, c)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
