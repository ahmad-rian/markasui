import type { ComponentProps, ReactNode } from "react";

const list = "flex flex-wrap items-center gap-1.5 text-sm text-muted";
const item = "inline-flex items-center gap-1.5";
const link =
  "rounded-md transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const current = "font-medium text-ink";
const separator = "size-3.5 shrink-0 text-faint";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
};

export type BreadcrumbProps = ComponentProps<"nav"> & {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className={list}>
        {items.map((crumb, index) => (
          <li key={index} className={item}>
            {index === lastIndex ? (
              <span aria-current="page" className={current}>
                {crumb.label}
              </span>
            ) : crumb.href ? (
              <a href={safeHref(crumb.href)} className={link}>
                {crumb.label}
              </a>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index !== lastIndex && (
              <svg
                className={separator}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
