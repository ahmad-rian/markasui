import { useId, type ComponentProps, type ReactNode } from "react";

const root =
  "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative mt-0.5 flex size-4 shrink-0";
const box =
  "peer size-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed aria-invalid:border-danger motion-reduce:transition-none";
const icon =
  "pointer-events-none absolute inset-0 size-4 text-on-primary opacity-0 peer-checked:opacity-100";
const text = "grid gap-0.5";
const labelClass = "text-sm font-medium text-ink";
const descriptionClass = "text-sm text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
};

export function Checkbox({
  label,
  description,
  id,
  className,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={root}>
      <span className={control}>
        <input
          id={checkboxId}
          aria-describedby={
            description ? `${checkboxId}-description` : undefined
          }
          className={cx(box, className)}
          {...props}
          type="checkbox"
        />
        <svg
          className={icon}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m4 8.5 2.5 2.5L12 5.5" />
        </svg>
      </span>
      {(label || description) && (
        <div className={text}>
          {label && (
            <label htmlFor={checkboxId} className={labelClass}>
              {label}
            </label>
          )}
          {description && (
            <p id={`${checkboxId}-description`} className={descriptionClass}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
