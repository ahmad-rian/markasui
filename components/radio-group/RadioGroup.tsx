"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

const root = "min-w-0";
const legendClass = "mb-3 text-sm font-medium text-ink";
const orientations = {
  vertical: "grid gap-3",
  horizontal: "flex flex-wrap gap-x-6 gap-y-3",
};
const item =
  "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative mt-0.5 flex size-4 shrink-0";
const radio =
  "peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
const dot =
  "pointer-events-none absolute inset-1 rounded-full bg-on-primary opacity-0 peer-checked:opacity-100";
const text = "grid gap-0.5";
const labelClass = "text-sm font-medium text-ink";
const descriptionClass = "text-sm text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
};

export type RadioGroupProps = Omit<
  ComponentProps<"fieldset">,
  "defaultValue"
> & {
  name: string;
  options: RadioOption[];
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  orientation?: keyof typeof orientations;
  onValueChange?: (value: string) => void;
};

export function RadioGroup({
  name,
  options,
  label,
  value,
  defaultValue,
  orientation = "vertical",
  onValueChange,
  id,
  className,
  ...props
}: RadioGroupProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const controlled = value !== undefined;

  return (
    <fieldset id={groupId} className={cx(root, className)} {...props}>
      {label && <legend className={legendClass}>{label}</legend>}
      <div className={orientations[orientation]}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <div key={option.value} className={item}>
              <span className={control}>
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={controlled ? option.value === value : undefined}
                  defaultChecked={
                    controlled ? undefined : option.value === defaultValue
                  }
                  aria-describedby={
                    option.description ? `${optionId}-description` : undefined
                  }
                  onChange={() => onValueChange?.(option.value)}
                  className={radio}
                />
                <span className={dot} aria-hidden="true" />
              </span>
              <div className={text}>
                <label htmlFor={optionId} className={labelClass}>
                  {option.label}
                </label>
                {option.description && (
                  <p
                    id={`${optionId}-description`}
                    className={descriptionClass}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
