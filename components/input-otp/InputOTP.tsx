"use client";

import {
  useRef,
  useState,
  type ClipboardEvent,
  type ComponentProps,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

const root = "m-0 min-w-0 border-0 p-0";
const legend = "mb-1.5 p-0 text-sm font-medium text-ink";
const group = "flex gap-2";
const box =
  "h-12 w-10 rounded-md border border-line bg-surface text-center text-lg font-medium text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const NON_DIGIT = /\D/g;

/** Pecah nilai menjadi tepat `length` karakter; posisi kosong berisi "". */
const toChars = (value: string, length: number) =>
  Array.from({ length }, (_, index) => value[index] ?? "");

const formatDigitLabel = (template: string, index: number, length: number) =>
  template
    .replace("{index}", String(index + 1))
    .replace("{length}", String(length));

export type InputOTPProps = Omit<
  ComponentProps<"fieldset">,
  "defaultValue" | "name"
> & {
  length?: number;
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  digitLabel?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

export function InputOTP({
  length = 6,
  label,
  name,
  value,
  defaultValue = "",
  digitLabel = "Digit {index} of {length}",
  onValueChange,
  onComplete,
  className,
  ...props
}: InputOTPProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState(() =>
    toChars(value ?? defaultValue, length),
  );
  // Nilai terkontrol dari luar menang, kecuali sama dengan isi kotak saat ini (menjaga posisi kotak kosong).
  const chars =
    value !== undefined && value !== internal.join("")
      ? toChars(value, length)
      : internal;
  const joined = chars.join("");

  const focusBox = (index: number) => {
    const target = groupRef.current?.children[index];
    if (target instanceof HTMLInputElement) target.focus();
  };

  const update = (next: string[]) => {
    const nextValue = next.join("");
    setInternal(next);
    if (nextValue === joined) return;
    onValueChange?.(nextValue);
    if (next.every(Boolean)) onComplete?.(nextValue);
  };

  /** Isi kotak mulai dari `start` dengan digit berurutan, lalu fokus ke kotak sesudahnya. */
  const fill = (start: number, digits: string) => {
    const next = chars.map((char, index) =>
      index >= start && index < start + digits.length
        ? (digits[index - start] ?? char)
        : char,
    );
    update(next);
    focusBox(Math.min(start + digits.length, length - 1));
  };

  const setChar = (index: number, char: string) =>
    update(chars.map((current, i) => (i === index ? char : current)));

  const handleInput = (index: number, event: FormEvent<HTMLInputElement>) => {
    const digits = event.currentTarget.value.replace(NON_DIGIT, "");
    if (digits === "") return setChar(index, "");
    fill(index, digits);
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    const moves: Record<string, number | undefined> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: length - 1,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      return focusBox(move);
    }
    if (event.key === "Delete") {
      event.preventDefault();
      return setChar(index, "");
    }
    if (event.key !== "Backspace") return;
    event.preventDefault();
    if (chars[index] || index === 0) return setChar(index, "");
    setChar(index - 1, "");
    focusBox(index - 1);
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const digits = event.clipboardData
      .getData("text")
      .replace(NON_DIGIT, "")
      .slice(0, length);
    if (digits === "") return;
    fill(digits.length >= length ? 0 : index, digits);
  };

  const selectContent = (event: FocusEvent<HTMLInputElement>) =>
    event.currentTarget.select();

  return (
    <fieldset className={cx(root, className)} {...props}>
      {label && <legend className={legend}>{label}</legend>}
      <div ref={groupRef} className={group}>
        {chars.map((char, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={formatDigitLabel(digitLabel, index, length)}
            value={char}
            className={box}
            onInput={(event) => handleInput(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
            onFocus={selectContent}
          />
        ))}
      </div>
      {name && <input type="hidden" name={name} value={joined} />}
    </fieldset>
  );
}
