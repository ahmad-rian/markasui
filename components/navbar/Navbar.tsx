"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const root = "@container w-full border-b border-line bg-surface";
const bar = "flex h-14 items-center gap-4 px-4";
const brandClass =
  "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
const desktopNav = "hidden items-center gap-1 @3xl:flex";
const link =
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:text-ink motion-reduce:transition-none";
const actionsClass = "ml-auto flex items-center gap-2";
const toggle =
  "group inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none @3xl:hidden";
const openIcon = "size-5 group-data-[state=open]:hidden";
const closeIcon = "hidden size-5 group-data-[state=open]:block";
const panel = "border-t border-line px-4 py-2 @3xl:hidden";
const panelList = "grid gap-1";
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

export type NavbarLink = {
  label: ReactNode;
  href: string;
  active?: boolean;
};

export type NavbarProps = ComponentProps<"header"> & {
  links?: NavbarLink[];
  brand?: ReactNode;
  actions?: ReactNode;
  /** Accessible label of the mobile menu button. */
  menuLabel?: string;
  /** Accessible label of the desktop nav element. */
  navLabel?: string;
  /** Accessible label of the mobile nav element. */
  mobileNavLabel?: string;
};

function NavLinks({ links }: { links: NavbarLink[] }) {
  return links.map((item, index) => (
    <a
      key={index}
      href={safeHref(item.href)}
      aria-current={item.active ? "page" : undefined}
      data-state={item.active ? "active" : "inactive"}
      className={link}
    >
      {item.label}
    </a>
  ));
}

export function Navbar({
  links = [],
  brand,
  actions,
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

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
    onKeyDown?.(event);
  };

  return (
    <header
      id={navbarId}
      className={cx(root, className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={bar}>
        {brand && <div className={brandClass}>{brand}</div>}
        <nav aria-label={navLabel} className={desktopNav}>
          <NavLinks links={links} />
        </nav>
        <div className={actionsClass}>
          {actions}
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls={menuId}
            data-state={open ? "open" : "closed"}
            onClick={() => setOpen((value) => !value)}
            className={toggle}
          >
            <svg
              className={openIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={closeIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id={menuId}
        data-state={open ? "open" : "closed"}
        hidden={!open}
        className={panel}
      >
        <nav aria-label={mobileNavLabel} className={panelList}>
          <NavLinks links={links} />
        </nav>
      </div>
    </header>
  );
}
