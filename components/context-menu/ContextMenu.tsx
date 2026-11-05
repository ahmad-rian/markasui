"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ToggleEvent,
} from "react";

const area =
  "block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const hint = "sr-only";
const menu =
  "inset-auto m-0 min-w-48 rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const item =
  "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const tones = {
  default: "text-ink hover:bg-subtle focus:bg-subtle",
  danger: "text-danger hover:bg-danger/10 focus:bg-danger/10",
};
const separator = "my-1 h-px bg-line";
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

const GAP = 4;
const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

type Offset = { x: number; y: number };

/** Letakkan menu di titik (relatif ke area), geser atau balik ke atas kalau tidak muat di layar. */
function placeMenu(target: HTMLElement, panel: HTMLElement, offset: Offset) {
  const anchor = target.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const x = anchor.left + offset.x;
  const y = anchor.top + offset.y;
  const fitsBelow = y + height <= window.innerHeight - GAP;
  const top = fitsBelow ? y : Math.max(GAP, y - height);
  const left = Math.max(GAP, Math.min(x, window.innerWidth - width - GAP));
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}

/** Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. Mengembalikan fungsi pelepas. */
function followViewport(update: () => void) {
  const scrollOptions = { capture: true, passive: true };
  window.addEventListener("scroll", update, scrollOptions);
  window.addEventListener("resize", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update, scrollOptions);
    window.removeEventListener("resize", update);
  };
}

/** Shift+F10 dan tombol ContextMenu membuka menu dari keyboard. */
const isMenuKey = (event: KeyboardEvent) =>
  event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");

export type ContextMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

export type ContextMenuProps = Omit<ComponentProps<"div">, "onSelect"> & {
  items: ContextMenuItem[];
  /** Label aksesibel panel menu. */
  menuLabel?: string;
  /** Petunjuk tersembunyi untuk pembaca layar tentang cara membuka menu. */
  hintLabel?: string;
  onSelect?: (value: string) => void;
};

export function ContextMenu({
  items,
  menuLabel = "Context menu",
  hintLabel = "Press Shift+F10 to open the context menu",
  onSelect,
  id,
  className,
  children,
  ...props
}: ContextMenuProps) {
  const generatedId = useId();
  const menuId = id ?? generatedId;
  const areaRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const offset = useRef<Offset>({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const state = open ? "open" : "closed";

  const place = () => {
    if (areaRef.current && menuRef.current)
      placeMenu(areaRef.current, menuRef.current, offset.current);
  };

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (areaRef.current && menuRef.current)
        placeMenu(areaRef.current, menuRef.current, offset.current);
    });
  }, [open]);

  const menuItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    );
  const focusItem = (index: number) => {
    const list = menuItems();
    if (list.length === 0) return;
    list[(index + list.length) % list.length]?.focus();
  };

  const openAt = (next: Offset) => {
    offset.current = next;
    // Tempatkan sinkron setelah showPopover; event toggle baru datang belakangan.
    if (!open) menuRef.current?.showPopover();
    place();
    focusItem(0);
  };
  const close = () => {
    menuRef.current?.hidePopover();
    areaRef.current?.focus();
  };
  const select = (value: string) => {
    onSelect?.(value);
    close();
  };

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const anchor = event.currentTarget.getBoundingClientRect();
    openAt({ x: event.clientX - anchor.left, y: event.clientY - anchor.top });
  };
  const handleAreaKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isMenuKey(event)) return;
    event.preventDefault();
    openAt({ x: 0, y: 0 });
  };

  // beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
  const handleBeforeToggle = (event: ToggleEvent<HTMLDivElement>) =>
    setOpen(event.newState === "open");
  const handleToggle = (event: ToggleEvent<HTMLDivElement>) => {
    if (event.newState !== "open") return;
    place();
    focusItem(0);
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      return close();
    }
    if (event.key === "Tab") return menuRef.current?.hidePopover();
    const index = menuItems().indexOf(document.activeElement as HTMLElement);
    const targets: Record<string, number | undefined> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: -1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusItem(target);
  };

  return (
    <div className="contents">
      <div
        {...props}
        ref={areaRef}
        role="group"
        tabIndex={0}
        aria-describedby={`${menuId}-hint`}
        data-state={state}
        className={cx(area, className)}
        onContextMenu={handleContextMenu}
        onKeyDown={handleAreaKeyDown}
      >
        {children}
      </div>
      <span id={`${menuId}-hint`} className={hint}>
        {hintLabel}
      </span>
      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        role="menu"
        aria-label={menuLabel}
        data-state={state}
        className={menu}
        onBeforeToggle={handleBeforeToggle}
        onToggle={handleToggle}
        onKeyDown={handleMenuKeyDown}
        onContextMenu={(event) => event.preventDefault()}
      >
        {items.map((entry, index) => {
          if (entry.separator)
            return <div key={index} role="separator" className={separator} />;
          const itemClass = cx(
            item,
            tones[entry.danger ? "danger" : "default"],
          );
          const handleClick = () => select(entry.value ?? entry.label);
          if (entry.href && !entry.disabled)
            return (
              <a
                key={index}
                href={safeHref(entry.href)}
                role="menuitem"
                tabIndex={-1}
                className={itemClass}
                onClick={handleClick}
              >
                {entry.label}
              </a>
            );
          return (
            <button
              key={index}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={entry.disabled}
              className={itemClass}
              onClick={handleClick}
            >
              {entry.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
