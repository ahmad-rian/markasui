import { useId, type ComponentProps, type ReactNode } from "react";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type InputProps = ComponentProps<"input"> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

export function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className={wrapper}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(field, className)}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
