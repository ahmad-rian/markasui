import type { ComponentProps } from "react";

const base = "text-sm font-medium text-ink";
const marker = "ms-0.5 text-danger";
const srOnly = "sr-only";
const optionalClass = "font-normal text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type LabelProps = ComponentProps<"label"> & {
  required?: boolean;
  optional?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
};

export function Label({
  required = false,
  optional = false,
  requiredLabel = "required",
  optionalLabel = "Optional",
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label className={cx(base, className)} {...props}>
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className={marker}>
            *
          </span>{" "}
          <span className={srOnly}>{requiredLabel}</span>
        </>
      ) : optional ? (
        <>
          {" "}
          <span className={optionalClass}>{optionalLabel}</span>
        </>
      ) : null}
    </label>
  );
}
