import type { ComponentProps, ReactNode } from "react";

const base = "grid gap-4 rounded-xl border border-line bg-surface p-6 text-ink";
const header = "grid gap-1.5";
const titleClass = "text-base font-semibold text-ink";
const descriptionClass = "text-sm text-muted";
const body = "text-sm text-ink";
const footerClass = "flex flex-wrap items-center gap-2";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type CardProps = Omit<ComponentProps<"article">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
};

export function Card({
  title,
  description,
  footer,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <article className={cx(base, className)} {...props}>
      {(title || description) && (
        <header className={header}>
          {title && <h3 className={titleClass}>{title}</h3>}
          {description && <p className={descriptionClass}>{description}</p>}
        </header>
      )}
      {children != null && children !== false && (
        <div className={body}>{children}</div>
      )}
      {footer && <div className={footerClass}>{footer}</div>}
    </article>
  );
}
