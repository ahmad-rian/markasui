"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";

const root = "group grid gap-3 has-disabled:cursor-not-allowed";
const header = "flex items-center justify-between gap-4 text-sm";
const labelClass = "font-medium text-ink group-has-disabled:opacity-50";
const valueClass =
  "ml-auto text-muted tabular-nums group-has-disabled:text-faint";
const range =
  "h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const toPercent = (value: number, min: number, max: number) =>
  max > min ? ((value - min) / (max - min)) * 100 : 0;

export type SliderProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "min" | "max" | "step"
> & {
  label?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  showValue?: boolean;
  onValueChange?: (value: number) => void;
};

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  showValue = true,
  onValueChange,
  onChange,
  id,
  className,
  style,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const current = value ?? internal;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.currentTarget.valueAsNumber;
    setInternal(next);
    onChange?.(event);
    onValueChange?.(next);
  };

  return (
    <div className={root}>
      {(label || showValue) && (
        <div className={header}>
          {label && (
            <label htmlFor={sliderId} className={labelClass}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={valueClass} aria-hidden="true">
              {current}
            </span>
          )}
        </div>
      )}
      <input
        id={sliderId}
        min={min}
        max={max}
        step={step}
        value={current}
        style={
          {
            ...style,
            "--value": `${toPercent(current, min, max)}%`,
          } as CSSProperties
        }
        onChange={handleChange}
        className={cx(range, className)}
        {...props}
        type="range"
      />
    </div>
  );
}
