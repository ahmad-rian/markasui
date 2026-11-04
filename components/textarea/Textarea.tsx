import { useId, type ComponentProps, type ReactNode } from "react";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "block w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type TextareaProps = ComponentProps<"textarea"> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
};

export function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const describedBy = error
    ? `${textareaId}-error`
    : hint
      ? `${textareaId}-hint`
      : undefined;

  return (
    <div className={wrapper}>
      {label && (
        <label htmlFor={textareaId} className={labelClass}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(field, className)}
        {...props}
      />
      {error ? (
        <p id={`${textareaId}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${textareaId}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
