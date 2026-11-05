"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type ToggleEvent,
} from "react";

const root =
  "@container w-full **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "top-0 border-b border-line bg-surface",
  floating: "top-3 rounded-2xl border border-line bg-surface shadow-overlay",
  blur: "top-0 border-b border-line/60 bg-surface/70 backdrop-blur-md",
};
const stickyClass = "sticky z-40";
const bar = "flex h-14 items-center gap-4 px-4";
const brandClass =
  "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
const desktopNav = "relative hidden items-center @2xl:flex";
const indicator =
  "absolute inset-y-0 left-0 rounded-md bg-subtle transition-[translate,width] duration-200 ease-out";
const list = "relative flex items-center";
const item =
  "flex h-9 cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink aria-expanded:text-ink aria-[current]:bg-subtle aria-[current]:text-ink @max-2xl:hover:bg-subtle [&::-webkit-details-marker]:hidden";
const chevron =
  "size-3.5 text-faint transition-transform duration-200 ease-out in-aria-expanded:rotate-180 in-open:rotate-180";
const panel =
  "inset-auto m-0 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0";
const panelList = "grid grid-flow-col grid-rows-3 gap-1";
const panelLink =
  "flex w-64 items-start gap-3 rounded-lg p-3 text-sm transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle";
const iconClass =
  "size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]";
const linkBody = "grid gap-0.5";
const linkTitle = "font-medium";
const linkDescription = "text-muted";
const actionsClass = "ml-auto flex items-center gap-2";
const toggle =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle @2xl:hidden";
const openIcon = "size-5 in-aria-expanded:hidden";
const closeIcon = "hidden size-5 in-aria-expanded:block";
const mobilePanel =
  "border-t border-line px-4 py-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0 @2xl:hidden";
const mobileList = "grid gap-1";
const groupList =
  "my-1 ml-3 grid gap-1 border-l border-line pl-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. */
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;
/** Jarak panel dari pemicu dan dari tepi layar. */
const GAP = 8;

/**
 * Geser indikator ke item yang di-hover, panel terbuka, atau item aktif, lalu letakkan panel terbuka
 * di bawah pemicunya. Indikator adalah anak pertama nav, panel adalah saudara berikutnya dari pemicu.
 */
function sync(nav: Element) {
  const find = (selector: string) => nav.querySelector<HTMLElement>(selector);
  const open = find("[aria-expanded=true]");
  const target =
    find(":scope>ul>li:hover>:first-child") ?? open ?? find("[aria-current]");
  const pill = nav.firstElementChild as HTMLElement;
  pill.hidden = !target;
  if (target) {
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.translate = `${target.offsetLeft}px 0`;
  }
  const popover = open?.nextElementSibling as HTMLElement | undefined;
  if (!popover) return;
  const box = open!.getBoundingClientRect();
  const maxLeft = innerWidth - popover.offsetWidth - GAP;
  popover.style.top = `${box.bottom + GAP}px`;
  popover.style.left = `${Math.max(GAP, Math.min(box.left, maxLeft))}px`;
}

export type NavbarChild = {
  label: string;
  href: string;
  description?: string;
  /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
  icon?: string;
};

export type NavbarLink = {
  label: ReactNode;
  /** Tujuan link biasa. Diabaikan bila item punya children. */
  href?: string;
  active?: boolean;
  /** Link di dropdown. Item dengan children menjadi pemicu dropdown. */
  children?: NavbarChild[];
};

export type NavbarProps = ComponentProps<"header"> & {
  links?: NavbarLink[];
  brand?: ReactNode;
  actions?: ReactNode;
  /** default: garis bawah tipis, floating: mengambang membulat, blur: latar semi transparan. */
  variant?: keyof typeof variants;
  sticky?: boolean;
  /** Accessible label of the mobile menu button. */
  menuLabel?: string;
  /** Accessible label of the desktop nav element. */
  navLabel?: string;
  /** Accessible label of the mobile nav element. */
  mobileNavLabel?: string;
};

const svg = (path: string, className: string) => (
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

/** Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya. */
const handleClick = (event: MouseEvent<HTMLElement>) => {
  if (event.detail && event.currentTarget.matches("[aria-expanded=true]"))
    event.preventDefault();
};

/** ArrowDown di pemicu membuka panel dan memfokuskan link pertama. */
const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
  const panel = event.currentTarget.nextElementSibling as HTMLElement;
  if (event.key !== "ArrowDown") return;
  event.preventDefault();
  panel.showPopover();
  panel.querySelector("a")?.focus();
};

/** beforetoggle berjalan sinkron sehingga aria-expanded selalu terbaru; toggle meletakkan panel setelah tampil. */
const handleToggle = (event: ToggleEvent<HTMLElement>) => {
  const panel = event.currentTarget;
  panel.previousElementSibling!.setAttribute(
    "aria-expanded",
    String(event.newState === "open"),
  );
  sync(panel.closest("nav")!);
};

export function Navbar({
  links = [],
  brand,
  actions,
  variant = "default",
  sticky = false,
  menuLabel = "Menu",
  navLabel = "Main",
  mobileNavLabel = "Main mobile",
  id,
  className,
  onKeyDown,
  ...props
}: NavbarProps) {
  const generatedId = useId();
  const navbarId = id ?? generatedId;
  const menuId = `${navbarId}-menu`;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
    onKeyDown?.(event);
  };

  /** Hover mouse: masuk ke item dropdown membukanya setelah jeda, keluar menutupnya setelah jeda. Item tanpa dropdown tidak membatalkan jeda tutup. */
  const handleHover = (event: PointerEvent<HTMLElement>) => {
    const item = event.currentTarget;
    const panel = item.querySelector<HTMLElement>("[popover]");
    sync(item.closest("nav")!);
    if (event.pointerType !== "mouse" || !panel) return;
    const enter = event.type === "pointerenter";
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => panel.togglePopover(enter),
      enter ? OPEN_DELAY : CLOSE_DELAY,
    );
  };

  return (
    <header
      id={navbarId}
      className={cx(root, variants[variant], sticky && stickyClass, className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={bar}>
        {brand && <div className={brandClass}>{brand}</div>}
        <nav aria-label={navLabel} className={desktopNav}>
          <span aria-hidden="true" hidden className={indicator} />
          <ul className={list}>
            {links.map((entry, index) => {
              const panelId = `${navbarId}-panel-${index}`;
              return (
                <li
                  key={index}
                  onPointerEnter={handleHover}
                  onPointerLeave={handleHover}
                >
                  {entry.children?.length ? (
                    <>
                      <button
                        type="button"
                        popoverTarget={panelId}
                        aria-expanded="false"
                        aria-controls={panelId}
                        className={item}
                        onClick={handleClick}
                        onKeyDown={handleTriggerKeyDown}
                      >
                        {entry.label}
                        {svg("m6 9 6 6 6-6", chevron)}
                      </button>
                      <div
                        id={panelId}
                        popover="auto"
                        className={panel}
                        onBeforeToggle={handleToggle}
                        onToggle={handleToggle}
                      >
                        <ul className={panelList}>
                          {entry.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <a
                                href={safeHref(child.href)}
                                className={panelLink}
                              >
                                {child.icon && svg(child.icon, iconClass)}
                                <span className={linkBody}>
                                  <span className={linkTitle}>
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className={linkDescription}>
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a
                      href={safeHref(entry.href)}
                      aria-current={entry.active ? "page" : undefined}
                      className={item}
                    >
                      {entry.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={actionsClass}>
          {actions}
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className={toggle}
          >
            {svg("M4 6h16M4 12h16M4 18h16", openIcon)}
            {svg("M18 6 6 18M6 6l12 12", closeIcon)}
          </button>
        </div>
      </div>
      <div
        id={menuId}
        data-state={open ? "open" : "closed"}
        hidden={!open}
        className={mobilePanel}
      >
        <nav aria-label={mobileNavLabel} className={mobileList}>
          {links.map((entry, index) =>
            entry.children?.length ? (
              <details key={index}>
                <summary className={item}>
                  {entry.label}
                  {svg("m6 9 6 6 6-6", chevron)}
                </summary>
                <div className={groupList}>
                  {entry.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={safeHref(child.href)}
                      className={item}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </details>
            ) : (
              <a
                key={index}
                href={safeHref(entry.href)}
                aria-current={entry.active ? "page" : undefined}
                className={item}
              >
                {entry.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
