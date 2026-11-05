"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

const root =
  "relative block max-w-full overflow-x-auto p-1 text-sm **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const list = "flex items-center gap-1";
const topItem =
  "group inline-flex h-9 items-center gap-1.5 rounded-md px-3 font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink aria-[current]:text-ink aria-expanded:bg-subtle aria-expanded:text-ink";
const chevron =
  "size-3.5 text-faint transition-transform duration-200 ease-out group-aria-expanded:rotate-180";
const indicatorClass =
  "absolute bottom-0 left-0 h-0.5 rounded-full bg-primary opacity-0 transition-[translate,width,opacity] duration-200 ease-out data-[state=visible]:opacity-100";
const panel =
  "inset-auto m-0 w-[min(40rem,calc(100vw-1rem))] gap-2 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay open:grid transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0";
const featuredLayout = "sm:grid-cols-[13rem_1fr]";
const featuredClass =
  "group relative flex min-h-36 flex-col justify-between gap-6 overflow-hidden rounded-lg bg-primary p-4 text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong";
const featuredArrow =
  "relative size-5 self-end transition-transform duration-150 ease-out group-hover:translate-x-0.5";
const featuredPattern =
  "absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]";
const featuredBody = "relative grid gap-1";
const featuredTitle = "font-semibold";
const featuredText = "text-on-primary/75";
const linkGrid = "grid content-start gap-1 sm:grid-cols-2";
const panelLink =
  "flex items-start gap-3 rounded-lg p-3 transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle";
const iconClass =
  "size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]";
const linkBody = "grid gap-0.5";
const linkTitle = "font-medium";
const linkDescription = "text-muted";

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. */
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;
/** Jarak panel dari pemicu dan dari tepi layar. */
const GAP = 8;

/** Pemicu dan link tingkat atas, berurutan. Panel sebuah pemicu adalah saudara berikutnya. */
const tops = (nav: HTMLElement | null) =>
  Array.from(
    nav?.querySelectorAll<HTMLElement>(":scope > ul > li > :first-child") ?? [],
  );

/** Geser indikator ke panel terbuka atau item aktif, lalu letakkan panel terbuka di bawah pemicunya, rata kiri dengan nav. */
function sync(nav: HTMLElement | null, open: number | null, active: number) {
  const target = tops(nav)[open ?? Math.max(active, 0)];
  const bar = target?.closest("ul")?.nextElementSibling as HTMLElement;
  const panel =
    open === null ? null : (target?.nextElementSibling as HTMLElement);
  if (!nav || !target) return;
  bar.style.width = `${target.offsetWidth}px`;
  bar.style.translate = `${target.offsetLeft}px 0`;
  bar.dataset.state = open === null && active < 0 ? "hidden" : "visible";
  bar.hidden = false;
  if (!panel) return;
  const maxLeft = innerWidth - panel.offsetWidth - GAP;
  panel.style.top = `${target.getBoundingClientRect().bottom + GAP}px`;
  panel.style.left = `${Math.max(GAP, Math.min(nav.getBoundingClientRect().left, maxLeft))}px`;
}

export type NavigationMenuLink = {
  label: string;
  href: string;
  description?: string;
  /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
  icon?: string;
};

export type NavigationMenuFeatured = {
  title: string;
  href: string;
  description?: string;
};

export type NavigationMenuItem = {
  label: string;
  /** Tujuan link biasa. Diabaikan bila item punya links atau featured. */
  href?: string;
  links?: NavigationMenuLink[];
  featured?: NavigationMenuFeatured;
  /** Tandai halaman atau bagian yang sedang dibuka. */
  active?: boolean;
};

export type NavigationMenuProps = ComponentProps<"nav"> & {
  items: NavigationMenuItem[];
  /** Accessible name of the nav element (aria-label). */
  navLabel?: string;
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

function PanelContent({ featured, links = [] }: NavigationMenuItem) {
  return (
    <>
      {featured && (
        <a href={safeHref(featured.href)} className={featuredClass}>
          <span aria-hidden="true" className={featuredPattern} />
          {icon("M5 12h14m-6-6 6 6-6 6", featuredArrow)}
          <span className={featuredBody}>
            <span className={featuredTitle}>{featured.title}</span>
            {featured.description && (
              <span className={featuredText}>{featured.description}</span>
            )}
          </span>
        </a>
      )}
      {links.length > 0 && (
        <ul className={linkGrid}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={safeHref(link.href)} className={panelLink}>
                {link.icon && icon(link.icon, iconClass)}
                <span className={linkBody}>
                  <span className={linkTitle}>{link.label}</span>
                  {link.description && (
                    <span className={linkDescription}>{link.description}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function NavigationMenu({
  items,
  navLabel = "Main",
  id,
  className,
  ...props
}: NavigationMenuProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeIndex = items.findIndex((item) => item.active);

  // Indikator dan panel terbuka mengikuti perubahan, gulir, ukuran jendela, dan font yang selesai dimuat.
  useLayoutEffect(() => {
    const update = () => sync(navRef.current, openIndex, activeIndex);
    update();
    document.fonts?.ready.then(update);
    addEventListener("scroll", update, true);
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update, true);
      removeEventListener("resize", update);
    };
  }, [openIndex, activeIndex]);

  useEffect(() => () => clearTimeout(timer.current), []);

  /** Hover mouse: masuk membuka setelah jeda (langsung bila panel lain terbuka), keluar menutup panel dari hover. */
  const handleHover = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(timer.current);
    const open = navRef.current?.querySelector<HTMLElement>(
      "[aria-expanded=true] + *",
    );
    const target =
      event.type === "pointerenter"
        ? event.currentTarget.querySelector<HTMLElement>("[popover]")
        : null;
    if (target && target === open) return;
    timer.current = setTimeout(
      () => {
        if (target) target.showPopover();
        else open?.hidePopover();
      },
      target ? (open ? 0 : OPEN_DELAY) : CLOSE_DELAY,
    );
  };

  // Link di panel menutup panelnya. Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya.
  const handleClick = (event: MouseEvent) => {
    const element = event.target as Element;
    const panel = element.closest<HTMLElement>("[popover]");
    if (panel) return element.closest("a") && panel.hidePopover();
    clearTimeout(timer.current);
    if (event.detail && element.closest("[aria-expanded=true]"))
      event.preventDefault();
  };

  // Panah kiri/kanan, Home, dan End berpindah antar item tingkat atas; ArrowDown membuka panel dan memfokuskan link pertama; Escape di panel menutupnya.
  const handleKeyDown = (event: KeyboardEvent) => {
    const element = event.target as HTMLElement;
    const panel = element.closest<HTMLElement>("[popover]");
    if (panel) {
      if (event.key !== "Escape") return;
      panel.hidePopover();
      return (panel.previousElementSibling as HTMLElement).focus();
    }
    const all = tops(navRef.current);
    const current = all.indexOf(element);
    const own = element.nextElementSibling as HTMLElement | null;
    const target = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: -1,
    }[event.key];
    if (target === undefined && (event.key !== "ArrowDown" || !own)) return;
    event.preventDefault();
    if (target !== undefined) return all.at(target % all.length)?.focus();
    own!.showPopover();
    own!.querySelector("a")?.focus();
  };

  // Fokus keluar dari entri (pemicu dan panelnya) menutup panel.
  const handleBlur = (event: FocusEvent) => {
    const panel = (event.target.closest("[popover]") ??
      event.target.nextElementSibling) as HTMLElement | null;
    const next = event.relatedTarget;
    if (next && panel && !panel.parentElement?.contains(next))
      panel.hidePopover();
  };

  return (
    <nav
      ref={navRef}
      id={baseId}
      aria-label={navLabel}
      className={`${root} ${className ?? ""}`}
      {...props}
    >
      <ul
        className={list}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`;
          return (
            <li
              key={index}
              onPointerEnter={handleHover}
              onPointerLeave={handleHover}
            >
              {item.links?.length || item.featured ? (
                <>
                  <button
                    type="button"
                    popoverTarget={panelId}
                    aria-expanded={openIndex === index}
                    aria-controls={panelId}
                    aria-current={item.active ? "true" : undefined}
                    className={topItem}
                  >
                    <span>{item.label}</span>
                    {icon("m6 9 6 6 6-6", chevron)}
                  </button>
                  <div
                    id={panelId}
                    popover="auto"
                    className={`${panel} ${item.featured ? featuredLayout : ""}`}
                    // beforetoggle berjalan sinkron; posisi panel diatur efek setelah status berubah.
                    onBeforeToggle={(event) =>
                      setOpenIndex((current) =>
                        event.newState === "open"
                          ? index
                          : current === index
                            ? null
                            : current,
                      )
                    }
                    onToggle={(event) =>
                      event.newState === "open" &&
                      sync(navRef.current, index, activeIndex)
                    }
                  >
                    <PanelContent {...item} />
                  </div>
                </>
              ) : (
                <a
                  href={safeHref(item.href ?? "#")}
                  aria-current={item.active ? "page" : undefined}
                  className={topItem}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <span
        aria-hidden="true"
        data-state="hidden"
        hidden
        className={indicatorClass}
      />
    </nav>
  );
}
