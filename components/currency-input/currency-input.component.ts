import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from "@angular/core";

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
export type CurrencyCode = keyof typeof CURRENCIES;

const COUNT_MS = 400;

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

let nextId = 0;

/**
 * Host stays out of layout; id, name, placeholder, aria-label, and class move to the field.
 * `[(value)]` binds the amount (a number, or null when empty).
 */
@Component({
  selector: "markas-currency-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.placeholder]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <label [for]="inputId()" [class]="labelClass">{{ label() }}</label>
      }
      <div [class]="control">
        <span [id]="currencyId()" [class]="prefix">{{ c().symbol }}</span>
        <input
          [id]="inputId()"
          type="text"
          [attr.inputmode]="c().fraction ? 'decimal' : 'numeric'"
          autocomplete="off"
          [value]="text()"
          [disabled]="disabled()"
          [attr.placeholder]="placeholder() ?? null"
          [attr.aria-label]="ariaLabel() ?? null"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-describedby]="describedBy()"
          [class]="fieldClasses()"
          (input)="handleInput($event)"
          (keydown)="handleKeydown($event)"
          (blur)="handleBlur()"
        />
      </div>
      @if (name()) {
        <input type="hidden" [name]="name()" [value]="current() ?? ''" />
      }
      @if (error()) {
        <p [id]="inputId() + '-error'" [class]="errorClass">{{ error() }}</p>
      } @else if (hint()) {
        <p [id]="inputId() + '-hint'" [class]="hintClass">{{ hint() }}</p>
      }
      @if (presets().length > 0) {
        <div role="group" [attr.aria-label]="presetsLabel()" [class]="chips">
          @for (preset of presets(); track preset) {
            <button
              type="button"
              [attr.aria-pressed]="current() === preset"
              [disabled]="disabled()"
              [class]="chip"
              (click)="pick(preset)"
            >
              {{ short(preset) }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class CurrencyInput {
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly currency = input<CurrencyCode>("IDR");
  readonly min = input<number>();
  readonly max = input<number>();
  readonly defaultValue = input<number | null>(null);
  /** Amount. Emits valueChange on every change, so `[(value)]` works. */
  readonly value = model<number | null | undefined>(undefined);
  /** Quick amount chips below the field. */
  readonly presets = input<number[]>([]);
  readonly presetsLabel = input("Quick amounts");
  readonly name = input<string>();
  readonly placeholder = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly wrapper = wrapper;
  protected readonly labelClass = labelClass;
  protected readonly control = control;
  protected readonly prefix = prefix;
  protected readonly chips = chips;
  protected readonly chip = chip;
  protected readonly hintClass = hintClass;
  protected readonly errorClass = errorClass;
  protected readonly c = computed(() => CURRENCIES[this.currency()]);
  private readonly generatedId = `markas-currency-input-${nextId++}`;
  protected readonly inputId = computed(() => this.id() ?? this.generatedId);
  protected readonly currencyId = computed(() => `${this.inputId()}-currency`);
  protected readonly describedBy = computed(() => {
    const message = this.error()
      ? `${this.inputId()}-error`
      : this.hint()
        ? `${this.inputId()}-hint`
        : "";
    return [this.currencyId(), message].filter(Boolean).join(" ");
  });
  protected readonly fieldClasses = computed(() =>
    [field, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly current = signal<number | null>(null);
  protected readonly text = signal("");
  private frame = 0;

  constructor() {
    // The first value (value, else defaultValue) and later values set from outside reformat
    // the field; our own updates are skipped.
    let started = false;
    effect(() => {
      const outside = this.value();
      const next = started ? outside : (outside ?? this.defaultValue());
      if (next === undefined || next === untracked(this.current)) {
        started = true;
        return;
      }
      started = true;
      cancelAnimationFrame(this.frame);
      this.current.set(next);
      this.text.set(next === null ? "" : formatAmount(next, this.c()));
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  protected short(preset: number) {
    return shortAmount(preset, this.c());
  }

  private clamp(n: number) {
    return Math.min(
      Math.max(n, this.min() ?? -Infinity),
      this.max() ?? Infinity,
    );
  }

  private commit(next: number | null) {
    this.current.set(next);
    this.value.set(next);
  }

  protected handleInput(event: Event) {
    cancelAnimationFrame(this.frame);
    const c = this.c();
    const field = event.target as HTMLInputElement;
    const count = significant(
      field.value.slice(0, field.selectionStart ?? field.value.length),
      c,
    );
    const parsed = parseTyped(field.value, c);
    // Write the formatted text first so the caret can be placed before Angular renders.
    field.value = parsed.text;
    const position = caretAfter(parsed.text, count, c);
    field.setSelectionRange(position, position);
    this.text.set(parsed.text);
    this.commit(parsed.value);
  }

  /** Backspace or Delete next to a separator removes the digit behind it instead. */
  protected handleKeydown(event: KeyboardEvent) {
    const field = event.target as HTMLInputElement;
    const group = this.c().group;
    const at = field.selectionStart;
    if (at === null || at !== field.selectionEnd) return;
    if (event.key === "Backspace" && field.value[at - 1] === group)
      field.setSelectionRange(at - 1, at - 1);
    if (event.key === "Delete" && field.value[at] === group)
      field.setSelectionRange(at + 1, at + 1);
  }

  protected handleBlur() {
    const value = this.current();
    if (value === null) return;
    const next = this.clamp(value);
    this.text.set(formatAmount(next, this.c()));
    if (next !== value) this.commit(next);
  }

  /** Jump to a preset, counting the digits up or down on the way. */
  protected pick(preset: number) {
    const c = this.c();
    const target = this.clamp(preset);
    const from = this.current() ?? 0;
    this.commit(target);
    cancelAnimationFrame(this.frame);
    if (reducedMotion() || typeof requestAnimationFrame !== "function") {
      this.text.set(formatAmount(target, c));
      return;
    }
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      const step = 10 ** c.fraction;
      this.text.set(
        formatAmount(
          Math.round((from + (target - from) * eased) * step) / step,
          c,
        ),
      );
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }
}
