import { Fragment, useId, type ComponentProps, type ReactNode } from "react";

const root = "@container w-full";
const layouts = {
  row: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
    item: "flex",
  },
  grid: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line @lg:grid-cols-3 @3xl:grid-cols-4",
    item: "flex h-24 items-center justify-center bg-surface px-4",
  },
  marquee: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0",
    item: "flex",
  },
  cards: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-3",
    item: "flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-5",
  },
  stats: {
    root: "grid items-center gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    title: "text-2xl font-semibold tracking-tight text-balance text-ink",
    list: "grid grid-cols-2 items-center gap-x-8 gap-y-6 @lg:grid-cols-3",
    item: "flex",
  },
};
const viewport =
  "group overflow-hidden mask-x-from-80% motion-reduce:mask-none";
const track =
  "flex w-max animate-[markas-logo-cloud_30s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none";
const copy = "motion-reduce:hidden";
const keyframes = "@keyframes markas-logo-cloud{to{translate:-50% 0}}";
const header = "grid gap-6";
const statList = "grid grid-cols-2 gap-6";
const stat = "flex flex-col-reverse gap-1";
const statValue = "text-3xl font-semibold tracking-tight text-ink";
const statLabel = "text-sm text-muted";
const logoBase =
  "inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tones = {
  gray: "text-muted grayscale transition-[color,filter] duration-200 ease-out hover:text-ink hover:grayscale-0 motion-reduce:transition-none",
  color: "text-ink",
};
const mark = "h-7 w-auto shrink-0";
const quote = "text-sm text-pretty text-ink";
const author = "mt-auto text-xs text-muted";
const COPIES = [0, 1];

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

export type LogoCloudLogo = {
  name: string;
  href?: string;
  /** Path SVG (atribut d) yang diisi currentColor. */
  path?: string;
  viewBox?: string;
  /** Tampilkan nama sebagai teks di samping path. false: hanya SVG, nama jadi aria-label. */
  wordmark?: boolean;
  /** Ganti seluruh isi logo, mis. elemen img. */
  logo?: ReactNode;
  quote?: string;
  author?: string;
};
export type LogoCloudStat = { value: string; label: string };
export type LogoCloudVariant = keyof typeof layouts;

export type LogoCloudProps = Omit<ComponentProps<"section">, "title"> & {
  logos: LogoCloudLogo[];
  title?: string;
  variant?: LogoCloudVariant;
  grayscale?: boolean;
  stats?: LogoCloudStat[];
  logosLabel?: string;
};

function Logo({ logo, tone }: { logo: LogoCloudLogo; tone: string }) {
  const wordmark = logo.wordmark !== false || !logo.path;
  const content = logo.logo ?? (
    <>
      {logo.path ? (
        <svg
          className={mark}
          viewBox={logo.viewBox ?? "0 0 24 24"}
          fill="currentColor"
          role={wordmark ? undefined : "img"}
          aria-label={wordmark ? undefined : logo.name}
          aria-hidden={wordmark ? true : undefined}
        >
          <path d={logo.path} />
        </svg>
      ) : null}
      {wordmark ? <span>{logo.name}</span> : null}
    </>
  );
  return logo.href ? (
    <a href={safeHref(logo.href)} className={cx(logoBase, tone)}>
      {content}
    </a>
  ) : (
    <span className={cx(logoBase, tone)}>{content}</span>
  );
}

export function LogoCloud({
  logos,
  title = "",
  variant = "row",
  grayscale = true,
  stats = [],
  logosLabel = "Customer logos",
  id,
  className,
  ...props
}: LogoCloudProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const layout = layouts[variant];
  const tone = grayscale ? tones.gray : tones.color;

  const list = (index = 0) => (
    <ul
      role="list"
      aria-hidden={index > 0 ? true : undefined}
      inert={index > 0}
      className={cx(layout.list, index > 0 && copy)}
    >
      {logos.map((logo) => (
        <li key={logo.name} className={layout.item}>
          <Logo logo={logo} tone={tone} />
          {variant === "cards" && logo.quote ? (
            <blockquote className={quote}>{logo.quote}</blockquote>
          ) : null}
          {variant === "cards" && logo.author ? (
            <p className={author}>{logo.author}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
  const titleElement = title ? (
    <h2 id={`${baseId}-title`} className={layout.title}>
      {title}
    </h2>
  ) : null;

  return (
    <section
      id={baseId}
      aria-labelledby={title ? `${baseId}-title` : undefined}
      aria-label={title ? undefined : logosLabel}
      className={cx(root, className)}
      {...props}
    >
      <div className={layout.root}>
        {variant === "stats" ? (
          <div className={header}>
            {titleElement}
            {stats.length ? (
              <dl className={statList}>
                {stats.map((entry) => (
                  <div key={entry.label} className={stat}>
                    <dt className={statLabel}>{entry.label}</dt>
                    <dd className={statValue}>{entry.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        ) : (
          titleElement
        )}
        {variant === "marquee" ? (
          <div className={viewport}>
            <style>{keyframes}</style>
            <div className={track}>
              {COPIES.map((index) => (
                <Fragment key={index}>{list(index)}</Fragment>
              ))}
            </div>
          </div>
        ) : (
          list()
        )}
      </div>
    </section>
  );
}
