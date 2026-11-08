"use client";

import {
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const root = "@container w-full [interpolate-size:allow-keywords]";
const header = "grid gap-2";
const lined = { list: "border-t border-line", item: "border-b border-line" };
const withTools = { root: "mx-auto grid max-w-3xl gap-6", header, ...lined };
const layouts = {
  simple: { root: "mx-auto grid max-w-3xl gap-8", header, ...lined },
  split: {
    root: "grid gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    header: "grid content-start gap-2",
    ...lined,
  },
  cards: {
    root: "grid gap-8",
    header,
    list: "grid items-start gap-3 @xl:grid-cols-2",
    item: "rounded-xl border border-line bg-surface px-5",
  },
  centered: {
    root: "mx-auto grid max-w-2xl gap-8 text-center",
    header: "grid justify-items-center gap-2",
    list: "grid gap-2 text-left",
    item: "rounded-lg bg-subtle px-4",
  },
  searchable: withTools,
  categories: withTools,
};
const titleClass =
  "text-2xl font-semibold tracking-tight text-balance text-ink";
const descriptionClass = "max-w-prose text-sm text-pretty text-muted";
const contactClass =
  "text-sm text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4";
const body = "grid content-start gap-4";
const details =
  "group details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none";
const answer = "pb-4 text-sm leading-relaxed text-pretty text-muted";
const search = "relative";
const searchIcon =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted";
const searchInput =
  "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const status = "contents";
const empty = "py-6 text-center text-sm text-muted";
const tablist = "flex flex-wrap gap-2";
const tab =
  "inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-on-primary motion-reduce:transition-none";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type FaqItem = { question: string; answer: string; category?: string };
export type FaqVariant = keyof typeof layouts;

/** Pertanyaan cocok kalau teks pertanyaan atau jawabannya memuat kata kunci. */
const matches = (item: FaqItem, query: string) =>
  `${item.question} ${item.answer}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());

/** Data terstruktur FAQPage untuk mesin pencari. `<` di-escape supaya tidak bisa menutup tag script. */
const faqSchema = (items: FaqItem[]) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replace(/</g, "\\u003c");

/** Indeks tab tujuan untuk tombol panah, Home, dan End (pola Tabs WAI-ARIA). */
const targetTab = (key: string, index: number, count: number) =>
  ({
    ArrowRight: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  })[key];

export type FaqProps = Omit<ComponentProps<"section">, "title"> & {
  items: FaqItem[];
  title?: string;
  description?: string;
  variant?: FaqVariant;
  exclusive?: boolean;
  schema?: boolean;
  contact?: ReactNode;
  searchLabel?: string;
  emptyLabel?: string;
  categoriesLabel?: string;
};

export function Faq({
  items,
  title = "",
  description = "",
  variant = "simple",
  exclusive = false,
  schema = false,
  contact,
  searchLabel = "Search questions",
  emptyLabel = "No questions match your search",
  categoriesLabel = "Question categories",
  id,
  className,
  ...props
}: FaqProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const layout = layouts[variant];
  const searchable = variant === "searchable";
  const categories =
    variant === "categories"
      ? [...new Set(items.map((item) => item.category ?? ""))]
      : [];
  /** Satu panel per kategori (varian categories) atau satu daftar berisi semua pertanyaan. */
  const groups = categories.length
    ? categories.map((category) =>
        items.filter((item) => (item.category ?? "") === category),
      )
    : [items];
  const noMatches = searchable && !items.some((item) => matches(item, query));

  const focusTab = (index: number) => {
    setActive(index);
    document.getElementById(`${baseId}-tab-${index}`)?.focus();
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = targetTab(event.key, active, categories.length);
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  const renderItem = (item: FaqItem) => (
    <details
      key={item.question}
      className={cx(details, layout.item)}
      name={exclusive ? `${baseId}-item` : undefined}
      hidden={searchable && !matches(item, query)}
    >
      <summary className={summary}>
        <span>{item.question}</span>
        <svg
          className={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <p className={answer}>{item.answer}</p>
    </details>
  );
  const contactBlock = contact ? (
    <div className={contactClass}>{contact}</div>
  ) : null;

  return (
    <section
      id={baseId}
      aria-labelledby={title ? `${baseId}-title` : undefined}
      className={cx(root, className)}
      {...props}
    >
      <div className={layout.root}>
        <div className={layout.header}>
          {title ? (
            <h2 id={`${baseId}-title`} className={titleClass}>
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={descriptionClass}>{description}</p>
          ) : null}
          {variant === "split" ? contactBlock : null}
        </div>
        <div className={body}>
          {searchable ? (
            <div className={search}>
              <svg
                className={searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                autoComplete="off"
                aria-label={searchLabel}
                placeholder={searchLabel}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className={searchInput}
              />
            </div>
          ) : null}
          {categories.length ? (
            <div
              role="tablist"
              aria-label={categoriesLabel}
              className={tablist}
              onKeyDown={onTabKeyDown}
            >
              {categories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-controls={`${baseId}-panel-${index}`}
                  aria-selected={index === active}
                  tabIndex={index === active ? 0 : -1}
                  data-state={index === active ? "active" : "inactive"}
                  onClick={() => setActive(index)}
                  className={tab}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}
          {groups.map((group, index) => {
            const panel = categories.length > 0;
            return (
              <div
                key={index}
                role={panel ? "tabpanel" : undefined}
                id={panel ? `${baseId}-panel-${index}` : undefined}
                aria-labelledby={panel ? `${baseId}-tab-${index}` : undefined}
                hidden={panel && index !== active}
                className={layout.list}
              >
                {group.map(renderItem)}
              </div>
            );
          })}
          {searchable ? (
            <div role="status" className={status}>
              {noMatches ? <p className={empty}>{emptyLabel}</p> : null}
            </div>
          ) : null}
        </div>
        {variant === "split" ? null : contactBlock}
      </div>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema(items) }}
        />
      ) : null}
    </section>
  );
}
