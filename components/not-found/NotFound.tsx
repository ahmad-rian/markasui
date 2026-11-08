"use client";

import {
  useId,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

const root =
  "@container grid w-full text-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:animate-none motion-reduce:**:transition-none";
const centered = "mx-auto max-w-lg justify-items-center text-center";
const layouts = {
  minimal: centered,
  split: "items-center gap-8 @xl:grid-cols-2",
  search: centered,
  glitch: centered,
  illustrated: centered,
  terminal: "mx-auto max-w-xl gap-6",
};
const big = "mb-2 text-8xl leading-none font-semibold tracking-tighter";
const eyebrow =
  "rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted";
const codes: Record<string, string> = {
  minimal: big,
  glitch: `${big} relative before:absolute before:inset-0 before:animate-[markas-glitch_2s_steps(1)_infinite] before:text-danger before:content-[attr(data-text)] after:absolute after:inset-0 after:animate-[markas-glitch_1.5s_steps(1)_infinite_reverse] after:text-success after:content-[attr(data-text)] motion-reduce:before:hidden motion-reduce:after:hidden`,
  illustrated: `${big} relative grid *:col-start-1 *:row-start-1`,
  split: eyebrow,
  search: eyebrow,
};
const content = "grid w-full gap-4 [justify-items:inherit]";
const shadow = "translate-2.5 text-primary/15";
const outline = "text-transparent [-webkit-text-stroke:2px_var(--color-ink)]";
const compass =
  "absolute -top-4 -right-10 size-12 rotate-12 rounded-full bg-canvas p-1 text-muted";
const art = "order-last mx-auto w-full max-w-xs";
const artSoft = "fill-primary-soft";
const artStroke = "fill-surface stroke-line";
const artInk = "fill-subtle stroke-ink";
const titleClass = "text-3xl font-semibold tracking-tight text-balance";
const descriptionClass = "max-w-prose text-pretty text-muted";
const terminal =
  "rounded-xl border border-line bg-surface p-4 text-left font-mono text-sm";
const prompt = "text-muted";
const terminalTitle = "text-danger";
const cursor = "inline-block h-4 w-2 animate-pulse bg-ink align-middle";
const searchWrap = "relative w-full text-sm";
const searchIcon = "absolute top-3 left-3 size-4 text-muted";
const searchInput =
  "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 placeholder:text-faint";
const list =
  "mt-3 divide-y divide-line rounded-xl border border-line bg-surface text-left";
const listLink =
  "flex justify-between rounded-xl px-4 py-3 font-medium hover:bg-subtle";
const arrow = "size-4 text-muted";
const empty = "text-muted not-empty:mt-3";
const actions = "flex flex-wrap gap-3";
const button =
  "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150 ease-out";
const primary = "bg-primary text-on-primary hover:bg-primary-strong";
const secondary = "border border-line bg-surface hover:bg-subtle";
const backIcon = "size-4";
const keyframes =
  "@keyframes markas-glitch{0%{clip-path:inset(20% 0 55% 0);translate:-3px 1px}33%{clip-path:inset(60% 0 10% 0);translate:3px -1px}66%{clip-path:inset(35% 0 40% 0);translate:-2px 2px}}";

const cx = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Kembali ke halaman sebelumnya; tanpa riwayat, link berjalan biasa ke homeHref. */
const goBack = (event: MouseEvent) => {
  if (history.length < 2) return;
  event.preventDefault();
  history.back();
};

const icon = (path: string, className: string) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

export type NotFoundLink = { label: string; href: string };

export type NotFoundProps = Omit<ComponentProps<"section">, "title"> & {
  /** minimal, split, search, glitch, illustrated, atau terminal. */
  variant?: keyof typeof layouts;
  /** Kode status, misalnya 404, 403, atau 500. */
  code?: string;
  title?: ReactNode;
  description?: ReactNode;
  homeHref?: string;
  /** Tautan populer yang bisa disaring di variant search. */
  links?: NotFoundLink[];
  /** Path yang tampil di variant terminal. */
  path?: string;
  homeLabel?: string;
  backLabel?: string;
  searchLabel?: string;
  emptyLabel?: string;
};

export function NotFound({
  variant = "minimal",
  code = "404",
  title = "Page not found",
  description = "The page you are looking for does not exist or has been moved.",
  homeHref = "/",
  links = [],
  path = "/page",
  homeLabel = "Back to home",
  backLabel = "Go back",
  searchLabel = "Search pages",
  emptyLabel = "No pages match your search",
  id,
  className,
  ...props
}: NotFoundProps) {
  const generatedId = useId();
  const titleId = `${id ?? generatedId}-title`;
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = links.filter((link) =>
    link.label.toLowerCase().includes(needle),
  );
  const isTerminal = variant === "terminal";
  const heading = (
    <h1 id={titleId} className={isTerminal ? terminalTitle : titleClass}>
      {isTerminal && `${code}: `}
      {title}
    </h1>
  );

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx(root, layouts[variant], className)}
      {...props}
    >
      {variant === "split" && (
        <svg viewBox="0 0 240 200" className={art} aria-hidden="true">
          <circle cx="150" cy="92" r="64" className={artSoft} />
          <rect
            x="34"
            y="48"
            width="92"
            height="92"
            rx="14"
            strokeWidth="2"
            className={artStroke}
          />
          <path d="M60 176 108 96l48 80z" strokeWidth="2" className={artInk} />
        </svg>
      )}
      {isTerminal && (
        <div className={terminal}>
          <p>
            <span className={prompt}>$ </span>cd {path}
          </p>
          {heading}
          <p aria-hidden="true">
            <span className={prompt}>$ </span>
            <span className={cursor} />
          </p>
        </div>
      )}
      <div className={content}>
        {codes[variant] && (
          <p aria-hidden="true" data-text={code} className={codes[variant]}>
            {variant === "glitch" && <style>{keyframes}</style>}
            {variant === "illustrated" ? (
              <>
                <span className={shadow}>{code}</span>
                <span className={outline}>{code}</span>
                {icon(
                  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3z",
                  compass,
                )}
              </>
            ) : (
              code
            )}
          </p>
        )}
        {!isTerminal && heading}
        <p className={descriptionClass}>{description}</p>
        {variant === "search" && (
          <div className={searchWrap}>
            {icon(
              "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
              searchIcon,
            )}
            <input
              type="search"
              aria-label={searchLabel}
              placeholder={searchLabel}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={searchInput}
            />
            {visible.length > 0 && (
              <ul className={list}>
                {visible.map((link) => (
                  <li key={link.href}>
                    <a href={safeHref(link.href)} className={listLink}>
                      {link.label}
                      {icon("M5 12h14m-6-6 6 6-6 6", arrow)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p role="status" className={empty}>
              {needle && !visible.length ? emptyLabel : ""}
            </p>
          </div>
        )}
        <div className={actions}>
          <a href={safeHref(homeHref)} className={cx(button, primary)}>
            {homeLabel}
          </a>
          <a
            href={safeHref(homeHref)}
            onClick={goBack}
            className={cx(button, secondary)}
          >
            {icon("M19 12H5m6 6-6-6 6-6", backIcon)}
            {backLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
