"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

const root = "@container flex overflow-hidden bg-canvas";
const aside =
  "relative hidden w-56 shrink-0 flex-col bg-surface text-sm transition-[width] duration-200 ease-out data-[state=collapsed]:w-16 motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "border-r border-line",
  floating: "m-2 rounded-xl border border-line",
};
const showAside = { sm: "@sm:flex", md: "@2xl:flex", lg: "@4xl:flex" };
const hideBar = { sm: "@sm:hidden", md: "@2xl:hidden", lg: "@4xl:hidden" };
const headerClass = "flex h-14 shrink-0 items-center border-b border-line px-4";
/** Isi header dan footer dipotong di tepi konten agar rail hanya menampilkan 32px pertama. */
const slotClass =
  "flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap";
const footerClass = "shrink-0 border-t border-line px-4 py-3";
const collapseButton =
  "absolute top-4 -right-3 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:text-ink";
const collapseIcon =
  "size-3.5 transition-transform duration-200 ease-out in-data-[state=collapsed]:rotate-180";
const navClass =
  "min-h-0 flex-1 overflow-y-auto p-3 in-data-[state=collapsed]:overflow-visible";
const listWrap = "relative grid gap-3 [anchor-scope:--active,--hover]";
const indicator =
  "absolute inset-[anchor(--hover_top,anchor(--active_top))_anchor(--hover_right,anchor(--active_right))_anchor(--hover_bottom,anchor(--active_bottom))_anchor(--hover_left,anchor(--active_left))] rounded-md bg-subtle transition-[inset] duration-200 ease-out";
const sectionClass =
  "grid gap-0.5 border-t border-line pt-3 first-of-type:border-t-0 first-of-type:pt-0";
const titleClass =
  "px-2.5 pb-1 text-xs font-medium text-faint in-data-[state=collapsed]:sr-only";
const listClass = "grid gap-0.5";
const item =
  "group/item relative flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] [&:has(+div_[aria-current=page])]:[anchor-name:--active]";
const iconClass = "size-5 shrink-0";
const labelClass = "min-w-0 flex-1 truncate in-data-[state=collapsed]:sr-only";
const badgeClass =
  "rounded-full bg-primary-soft px-1.5 py-0.5 text-xs leading-none font-medium text-primary in-data-[state=collapsed]:sr-only";
const dot =
  "absolute top-1.5 right-1.5 hidden size-2 rounded-full bg-primary in-data-[state=collapsed]:block";
const chevron =
  "size-4 shrink-0 text-faint transition-transform duration-200 ease-out group-aria-expanded/item:rotate-90 in-data-[state=collapsed]:hidden";
const tip =
  "absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-canvas shadow-overlay in-data-[state=collapsed]:group-hover/item:block in-data-[state=collapsed]:group-focus-visible/item:block";
const region =
  "invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=open]:visible data-[state=open]:grid-rows-[1fr] in-data-[state=collapsed]:hidden";
const regionInner = "min-h-0 overflow-hidden";
const subList = "ml-5 grid gap-0.5 border-l border-line py-1 pr-1 pl-2";
const subItem =
  "relative flex h-8 w-full items-center rounded-md px-2.5 text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] in-data-[state=closed]:[anchor-name:none]!";
const content = "flex min-w-0 flex-1 flex-col";
const mobileBar = "flex h-14 shrink-0 items-center border-b border-line px-3";
const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const dialogClass =
  "right-auto left-0 m-0 h-dvh max-h-dvh w-72 flex-col border-r border-line bg-surface p-0 text-sm text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 open:flex starting:open:-translate-x-full motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

export type SidebarItem = {
  label: string;
  /** Tujuan link. Diabaikan bila item punya children. */
  href?: string;
  /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
  icon?: string;
  badge?: string | number;
  /** Tandai halaman yang sedang dibuka. */
  active?: boolean;
  disabled?: boolean;
  /** Sub-item. Item induk menjadi tombol buka/tutup. */
  children?: SidebarItem[];
  /** Sub-item terbuka di awal. Default: terbuka bila ada sub-item aktif. */
  open?: boolean;
};

export type SidebarSection = { title?: string; items: SidebarItem[] };

export type SidebarProps = ComponentProps<"div"> & {
  sections?: SidebarSection[];
  /** Brand atau workspace di atas sidebar. */
  header?: ReactNode;
  /** Profil pengguna di bawah sidebar. */
  footer?: ReactNode;
  variant?: keyof typeof variants;
  /** Lebar kontainer minimum agar sidebar tampil di samping konten: sm 24rem, md 42rem, lg 56rem. */
  breakpoint?: keyof typeof showAside;
  /** Mode rail ikon (terkontrol). */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  navLabel?: string;
  collapseLabel?: string;
  expandLabel?: string;
  openLabel?: string;
  closeLabel?: string;
};

const linkProps = (entry: SidebarItem) =>
  entry.disabled
    ? { role: "link", "aria-disabled": true }
    : {
        href: safeHref(entry.href ?? "#"),
        "aria-current": entry.active ? ("page" as const) : undefined,
      };

function Icon({ d, className }: { d: string; className: string }) {
  return (
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
      <path d={d} />
    </svg>
  );
}

export function Sidebar({
  sections = [],
  header,
  footer,
  variant = "default",
  breakpoint = "md",
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  navLabel = "Sidebar",
  collapseLabel = "Collapse sidebar",
  expandLabel = "Expand sidebar",
  openLabel = "Open sidebar",
  closeLabel = "Close sidebar",
  id,
  className,
  children,
  ...props
}: SidebarProps) {
  const generatedId = useId();
  const rootId = id ?? generatedId;
  const asideId = `${rootId}-aside`;
  const dialogId = `${rootId}-dialog`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed);
  const [groups, setGroups] = useState(() =>
    Object.fromEntries(
      sections.flatMap((section, s) =>
        section.items.map((entry, i) => [
          `${s}-${i}`,
          entry.open ?? !!entry.children?.some((child) => child.active),
        ]),
      ),
    ),
  );
  const isCollapsed = collapsed ?? localCollapsed;

  const setCollapsed = (next: boolean) => {
    setLocalCollapsed(next);
    onCollapsedChange?.(next);
  };
  const toggleGroup = (key: string, rail: boolean) => {
    if (rail) setCollapsed(false);
    setGroups((current) => ({ ...current, [key]: rail || !current[key] }));
  };

  const showMobile = () => dialogRef.current?.showModal();
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as Element;
    if (target === event.currentTarget || target.closest("a[href]"))
      event.currentTarget.close();
  };
  /** Nav yang sama dipakai di sidebar desktop (prefix d) dan dialog seluler (prefix m). */
  const nav = (prefix: string, rail: boolean) => (
    <nav aria-label={navLabel} className={navClass}>
      <div className={listWrap}>
        <span aria-hidden="true" className={indicator} />
        {sections.map((section, s) => (
          <div key={s} className={sectionClass}>
            {section.title && (
              <p aria-hidden="true" className={titleClass}>
                {section.title}
              </p>
            )}
            <ul aria-label={section.title} className={listClass}>
              {section.items.map((entry, i) => {
                const key = `${s}-${i}`;
                const regionId = `${rootId}-${prefix}-g${key}`;
                const hasBadge = entry.badge != null && entry.badge !== "";
                const body = (
                  <>
                    {entry.icon && (
                      <Icon d={entry.icon} className={iconClass} />
                    )}
                    <span className={labelClass}>{entry.label}</span>
                    {hasBadge && (
                      <span className={badgeClass}>{entry.badge}</span>
                    )}
                    {hasBadge && <span aria-hidden="true" className={dot} />}
                    {!!entry.children?.length && (
                      <Icon d="m9 6 6 6-6 6" className={chevron} />
                    )}
                    <span aria-hidden="true" className={tip}>
                      {entry.label}
                    </span>
                  </>
                );
                return (
                  <li key={i}>
                    {entry.children?.length ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={!!groups[key]}
                          aria-controls={regionId}
                          className={item}
                          onClick={() => toggleGroup(key, rail)}
                        >
                          {body}
                        </button>
                        <div
                          id={regionId}
                          data-state={groups[key] ? "open" : "closed"}
                          className={region}
                        >
                          <div className={regionInner}>
                            <ul className={subList}>
                              {entry.children.map((child, c) => (
                                <li key={c}>
                                  <a {...linkProps(child)} className={subItem}>
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <a {...linkProps(entry)} className={item}>
                        {body}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <div id={rootId} className={cx(root, className)} {...props}>
      <aside
        id={asideId}
        data-state={isCollapsed ? "collapsed" : "expanded"}
        className={cx(aside, variants[variant], showAside[breakpoint])}
      >
        {header && (
          <div className={headerClass}>
            <div className={slotClass}>{header}</div>
          </div>
        )}
        {nav("d", isCollapsed)}
        {footer && (
          <div className={footerClass}>
            <div className={slotClass}>{footer}</div>
          </div>
        )}
        <button
          type="button"
          aria-label={isCollapsed ? expandLabel : collapseLabel}
          aria-expanded={!isCollapsed}
          aria-controls={asideId}
          className={collapseButton}
          onClick={() => setCollapsed(!isCollapsed)}
        >
          <Icon d="m15 6-6 6 6 6" className={collapseIcon} />
        </button>
      </aside>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label={navLabel}
        className={dialogClass}
        onClick={onDialogClick}
      >
        <div className={headerClass}>
          <div className={slotClass}>{header}</div>
          <form method="dialog">
            <button
              type="submit"
              aria-label={closeLabel}
              className={iconButton}
            >
              <Icon d="M18 6 6 18M6 6l12 12" className={iconClass} />
            </button>
          </form>
        </div>
        {nav("m", false)}
        {footer && (
          <div className={footerClass}>
            <div className={slotClass}>{footer}</div>
          </div>
        )}
      </dialog>
      <div className={content}>
        <div className={cx(mobileBar, hideBar[breakpoint])}>
          <button
            type="button"
            aria-label={openLabel}
            aria-haspopup="dialog"
            aria-controls={dialogId}
            className={iconButton}
            onClick={showMobile}
          >
            <Icon d="M4 6h16M4 12h16M4 18h16" className={iconClass} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
