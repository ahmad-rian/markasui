import type { ComponentProps } from "react";

const root = "@container";
const list = "flex flex-wrap items-center gap-1";
const link =
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border border-transparent px-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-line data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const ellipsis =
  "inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted";
const icon = "size-4 shrink-0";
const label = "sr-only @lg:not-sr-only";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

export type PageItem = number | "ellipsis";

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

/** Logika sama persis dengan $pageRange di pagination.blade.php dan Pagination.vue. */
export function pageRange(
  page: number,
  total: number,
  siblings: number,
): PageItem[] {
  if (total < 1) return [];
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);
  const current = Math.min(Math.max(page, 1), total);
  const start = Math.min(
    Math.max(current - siblings, 3),
    total - 2 - siblings * 2,
  );
  const end = start + siblings * 2;

  return [
    1,
    start > 3 ? "ellipsis" : 2,
    ...range(start, end),
    end < total - 2 ? "ellipsis" : total - 1,
    total,
  ];
}

export type PaginationProps = ComponentProps<"nav"> & {
  page: number;
  total: number;
  href?: string;
  siblings?: number;
  /** Accessible label of the nav element. */
  navLabel?: string;
  /** Text of the previous page link. */
  previousLabel?: string;
  /** Text of the next page link. */
  nextLabel?: string;
};

const PrevIcon = () => (
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
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const NextIcon = () => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function Pagination({
  page,
  total,
  href = "?page={page}",
  siblings = 1,
  navLabel = "Pagination",
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
  ...props
}: PaginationProps) {
  const current = Math.min(Math.max(page, 1), Math.max(total, 1));
  const pages = pageRange(current, total, siblings);
  const hrefFor = (target: number) =>
    safeHref(href.replaceAll("{page}", String(target)));

  return (
    <nav aria-label={navLabel} className={cx(root, className)} {...props}>
      <ul className={list}>
        <li>
          {current > 1 ? (
            <a href={hrefFor(current - 1)} rel="prev" className={link}>
              <PrevIcon />
              <span className={label}>{previousLabel}</span>
            </a>
          ) : (
            <span aria-disabled="true" className={link}>
              <PrevIcon />
              <span className={label}>{previousLabel}</span>
            </span>
          )}
        </li>
        {pages.map((item, index) => (
          <li key={index}>
            {item === "ellipsis" ? (
              <span className={ellipsis} aria-hidden="true">
                …
              </span>
            ) : (
              <a
                href={hrefFor(item)}
                aria-current={item === current ? "page" : undefined}
                data-state={item === current ? "active" : "inactive"}
                className={link}
              >
                {item}
              </a>
            )}
          </li>
        ))}
        <li>
          {current < total ? (
            <a href={hrefFor(current + 1)} rel="next" className={link}>
              <span className={label}>{nextLabel}</span>
              <NextIcon />
            </a>
          ) : (
            <span aria-disabled="true" className={link}>
              <span className={label}>{nextLabel}</span>
              <NextIcon />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
