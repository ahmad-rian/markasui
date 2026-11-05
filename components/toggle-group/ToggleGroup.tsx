"use client";

import {
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const root = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const item =
  "inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:bg-surface data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

export type ToggleGroupItem = {
  value: string;
  label: ReactNode;
  ariaLabel?: string;
};

type BaseProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "role"
> & {
  items: ToggleGroupItem[];
  label?: string;
};

export type ToggleGroupProps = BaseProps &
  (
    | {
        type?: "single";
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
      }
    | {
        type: "multiple";
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
      }
  );

const toArray = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value : value ? [value] : [];

export function ToggleGroup(props: ToggleGroupProps) {
  const {
    items,
    label,
    type = "single",
    value,
    defaultValue,
    onValueChange,
    className,
    ...rest
  } = props;
  const [internal, setInternal] = useState(() => toArray(defaultValue));
  const [focused, setFocused] = useState<string>();
  const selected = value === undefined ? internal : toArray(value);
  const tabStop = focused ?? selected[0] ?? items[0]?.value;

  const toggle = (key: string) => {
    setFocused(key);
    const isOn = selected.includes(key);
    const wanted = isOn
      ? selected.filter((entry) => entry !== key)
      : type === "multiple"
        ? [...selected, key]
        : [key];
    const next = items
      .map((entry) => entry.value)
      .filter((entry) => wanted.includes(entry));
    setInternal(next);
    (onValueChange as ((value: string | string[]) => void) | undefined)?.(
      type === "multiple" ? next : (next[0] ?? ""),
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = STEPS[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        ":scope > button",
      ),
    );
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const target = buttons[(index + step + buttons.length) % buttons.length];
    if (!target) return;
    setFocused(target.dataset.value);
    target.focus();
  };

  return (
    <div
      role="group"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cx(root, className)}
      {...rest}
    >
      {items.map((entry) => {
        const isOn = selected.includes(entry.value);
        return (
          <button
            key={entry.value}
            type="button"
            data-value={entry.value}
            aria-pressed={isOn}
            data-state={isOn ? "on" : "off"}
            tabIndex={entry.value === tabStop ? 0 : -1}
            aria-label={entry.ariaLabel}
            onClick={() => toggle(entry.value)}
            className={item}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
