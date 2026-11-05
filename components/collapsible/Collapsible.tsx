import type { ComponentProps, ReactNode } from "react";

const root = "group w-full";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pt-2 pb-2 text-sm text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type CollapsibleProps = Omit<ComponentProps<"details">, "title"> & {
  title: ReactNode;
  open?: boolean;
};

export function Collapsible({
  title,
  open = false,
  className,
  children,
  ...props
}: CollapsibleProps) {
  return (
    <details className={cx(root, className)} open={open} {...props}>
      <summary className={summary}>
        <span>{title}</span>
        <svg
          className={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className={content}>{children}</div>
    </details>
  );
}
