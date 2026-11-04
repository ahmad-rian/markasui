"use client";

import {
  useId,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from "react";

const root =
  "flex items-center gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative inline-flex shrink-0";
const track =
  "peer h-6 w-10 shrink-0 cursor-pointer appearance-none rounded-full bg-faint transition-colors duration-150 ease-out checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
const thumb =
  "pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-surface transition-transform duration-150 ease-out peer-checked:translate-x-4 motion-reduce:transition-none";
const labelClass = "text-sm font-medium text-ink";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type SwitchProps = Omit<ComponentProps<"input">, "type" | "role"> & {
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  label,
  id,
  className,
  onChange,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.currentTarget.checked);
  };

  return (
    <div className={root}>
      <span className={control}>
        <input
          id={switchId}
          className={cx(track, className)}
          onChange={handleChange}
          {...props}
          type="checkbox"
          role="switch"
        />
        <span className={thumb} aria-hidden="true" />
      </span>
      {label && (
        <label htmlFor={switchId} className={labelClass}>
          {label}
        </label>
      )}
    </div>
  );
}
