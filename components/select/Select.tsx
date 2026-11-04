import { useId, type ComponentProps, type ReactNode } from "react";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pr-9 pl-3 text-sm text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const icon =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type SelectProps = ComponentProps<"select"> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

export function Select({
  label,
  hint,
  error,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const describedBy = error
    ? `${selectId}-error`
    : hint
      ? `${selectId}-hint`
      : undefined;

  return (
    <div className={wrapper}>
      {label && (
        <label htmlFor={selectId} className={labelClass}>
          {label}
        </label>
      )}
      <div className={control}>
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(field, className)}
          {...props}
        >
          {children}
        </select>
        <svg
          className={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error ? (
        <p id={`${selectId}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${selectId}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
