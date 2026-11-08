"use client";

import {
  useState,
  type ComponentProps,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";

const root =
  "@container w-full border-t border-line bg-canvas text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const wrap = "grid gap-12 px-4 py-14 @2xl:px-8";
const main = "grid gap-10 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
const brandArea = "grid max-w-sm content-start gap-4";
const bottom =
  "flex flex-col gap-4 border-t border-line pt-6 @2xl:flex-row @2xl:items-center";
const row = "flex flex-wrap items-center justify-between gap-6";
const stack = "grid justify-items-center gap-4";
const contents = "contents";
/** Tata letak tiap varian: [footer, baris utama, area brand, baris bawah]. */
const layouts = {
  columns: [wrap, main, brandArea, bottom],
  newsletter: [wrap, main, brandArea, bottom],
  "big-brand": [
    "grid gap-12 overflow-hidden bg-linear-to-b to-primary-soft px-4 pt-14 @2xl:px-8",
    main,
    brandArea,
    bottom,
  ],
  centered: [
    "grid justify-items-center gap-8 bg-radial-[at_top] from-primary-soft to-70% px-4 py-14 text-center",
    "grid justify-items-center gap-6",
    "grid max-w-md justify-items-center gap-3",
    stack,
  ],
  cta: [wrap, row, contents, bottom],
  compact: [
    "flex flex-wrap items-center gap-x-5 gap-y-2 rounded-3xl border px-5 py-3 shadow-overlay @xl:rounded-full",
    contents,
    contents,
    contents,
  ],
};
const brandClass = "flex items-center gap-2 text-base font-semibold text-ink";
const descriptionClass = "leading-relaxed";
const actionsClass = "flex flex-wrap items-center gap-2";
const columnsNav =
  "grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))]";
const columnTitle = "font-medium text-ink";
const columnList = "mt-4 grid gap-2.5";
const flatList = "flex flex-wrap justify-center gap-x-6 gap-y-2";
const link =
  "rounded-sm transition-colors duration-150 ease-out hover:text-ink";
const copyrightClass = "@2xl:mr-auto";
const legalList = "flex flex-wrap gap-x-4 gap-y-2";
const socialList = "flex items-center gap-1";
const socialLink =
  "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-150 ease-out hover:border-primary-line hover:text-ink";
const icon = "size-4";
const topLink =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle";
const card =
  "grid gap-6 rounded-3xl border border-line bg-linear-to-br from-surface to-primary-soft p-6 @3xl:grid-cols-2 @3xl:items-center @3xl:p-10";
const cardTitle = "text-xl font-semibold tracking-tight text-balance text-ink";
const cardText = "mt-1.5 leading-relaxed";
const form = "grid gap-3";
const field =
  "flex items-center gap-1 rounded-full border border-line bg-canvas p-1 shadow-xs";
const input =
  "h-10 w-0 flex-1 rounded-full bg-transparent px-4 text-ink placeholder:text-faint";
const button =
  "h-10 shrink-0 cursor-pointer rounded-full bg-primary px-5 font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong";
const status =
  "flex items-center gap-2 px-4 font-medium text-ink before:size-1.5 before:rounded-full before:bg-success empty:sr-only";
const cta =
  "dark grid justify-items-start gap-6 rounded-3xl border border-line bg-surface bg-radial-[at_top_right] from-success/30 to-60% p-6 text-muted @2xl:p-12";
const ctaTitle =
  "max-w-xl text-2xl font-semibold tracking-tight text-balance text-ink @2xl:text-4xl";
const ctaText = "mt-3 max-w-lg text-base leading-relaxed";
const wordmarkBox =
  "-mx-4 h-[0.6em] overflow-hidden text-[calc(200cqw/var(--chars))] leading-none select-none @2xl:-mx-8";
const wordmarkText =
  "-mt-[0.08em] bg-linear-to-b from-ink via-ink/50 bg-clip-text text-center font-semibold tracking-tighter whitespace-nowrap text-transparent";

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title?: string; links: FooterLink[] };
/** icon: data path SVG (atribut d) untuk ikon 24x24 bergaris. */
export type FooterSocial = { label: string; href: string; icon: string };
export type FooterVariant = keyof typeof layouts;

export type FooterProps = Omit<ComponentProps<"footer">, "children"> & {
  variant?: FooterVariant;
  brand?: ReactNode;
  description?: ReactNode;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  legal?: FooterLink[];
  copyright?: ReactNode;
  /** Judul blok ajakan (varian cta). */
  heading?: ReactNode;
  /** Teks di bawah judul kartu langganan (varian newsletter). */
  newsletterDescription?: ReactNode;
  /** Wordmark raksasa (varian big-brand). */
  wordmark?: string;
  backToTop?: boolean;
  /** Tombol atau konten tambahan. Varian cta: tombol di blok ajakan. */
  actions?: ReactNode;
  /** Pengganti form langganan bawaan (varian newsletter). */
  newsletter?: ReactNode;
  navLabel?: string;
  legalLabel?: string;
  socialLabel?: string;
  newsletterLabel?: string;
  emailLabel?: string;
  subscribeLabel?: string;
  successLabel?: string;
  backToTopLabel?: string;
};

const linkList = (links: FooterLink[], className: string) => (
  <ul className={className}>
    {links.map((item, index) => (
      <li key={index}>
        <a href={safeHref(item.href)} className={link}>
          {item.label}
        </a>
      </li>
    ))}
  </ul>
);

export function Footer({
  variant = "columns",
  brand,
  description,
  columns = [],
  socials = [],
  legal = [],
  copyright,
  heading,
  newsletterDescription,
  wordmark = "",
  backToTop = false,
  actions,
  newsletter,
  navLabel = "Footer",
  legalLabel = "Legal",
  socialLabel = "Social media",
  newsletterLabel = "Subscribe to our newsletter",
  emailLabel = "Email address",
  subscribeLabel = "Subscribe",
  successLabel = "Thanks for subscribing",
  backToTopLabel = "Back to top",
  className,
  ...props
}: FooterProps) {
  const [footerClass, mainClass, brandAreaClass, bottomClass] =
    layouts[variant];
  const [subscribed, setSubscribed] = useState(false);
  const isCta = variant === "cta";
  const hasColumns = mainClass === main;
  const links = columns.flatMap((column) => column.links);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSubscribed(true);
  };

  const socialsList = socials.length > 0 && (
    <ul aria-label={socialLabel} className={socialList}>
      {socials.map((social, index) => (
        <li key={index}>
          <a
            href={safeHref(social.href)}
            aria-label={social.label}
            className={socialLink}
          >
            <svg className={icon} {...svg}>
              <path d={social.icon} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer
      className={`${root} ${footerClass} ${className ?? ""}`.trim()}
      {...props}
    >
      {variant === "newsletter" && (
        <div className={card}>
          <div>
            <h2 className={cardTitle}>{newsletterLabel}</h2>
            {newsletterDescription && (
              <p className={cardText}>{newsletterDescription}</p>
            )}
          </div>
          {newsletter ?? (
            <form className={form} onSubmit={subscribe}>
              <div className={field}>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-label={emailLabel}
                  placeholder={emailLabel}
                  className={input}
                />
                <button type="submit" className={button}>
                  {subscribeLabel}
                </button>
              </div>
              <p role="status" className={status}>
                {subscribed ? successLabel : ""}
              </p>
            </form>
          )}
        </div>
      )}
      {isCta && (
        <div className={cta}>
          <div>
            {heading && <h2 className={ctaTitle}>{heading}</h2>}
            {description && <p className={ctaText}>{description}</p>}
          </div>
          {actions && <div className={actionsClass}>{actions}</div>}
        </div>
      )}
      <div className={mainClass}>
        <div className={brandAreaClass}>
          {brand && <div className={brandClass}>{brand}</div>}
          {description && !isCta && variant !== "compact" && (
            <p className={descriptionClass}>{description}</p>
          )}
          {actions && !isCta && <div className={actionsClass}>{actions}</div>}
        </div>
        {links.length > 0 && (
          <nav
            aria-label={navLabel}
            className={hasColumns ? columnsNav : undefined}
          >
            {hasColumns
              ? columns.map((column, index) => (
                  <div key={index}>
                    {column.title && (
                      <h2 className={columnTitle}>{column.title}</h2>
                    )}
                    {linkList(column.links, columnList)}
                  </div>
                ))
              : linkList(links, flatList)}
          </nav>
        )}
      </div>
      <div className={bottomClass}>
        {variant === "centered" && socialsList}
        {copyright && <p className={copyrightClass}>{copyright}</p>}
        {legal.length > 0 && (
          <nav aria-label={legalLabel}>{linkList(legal, legalList)}</nav>
        )}
        {variant !== "centered" && socialsList}
        {backToTop && (
          <a href="#top" className={topLink}>
            {backToTopLabel}
            <svg className={icon} {...svg}>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        )}
      </div>
      {variant === "big-brand" && wordmark && (
        <div
          aria-hidden="true"
          className={wordmarkBox}
          style={{ "--chars": wordmark.length } as CSSProperties}
        >
          <p className={wordmarkText}>{wordmark}</p>
        </div>
      )}
    </footer>
  );
}
