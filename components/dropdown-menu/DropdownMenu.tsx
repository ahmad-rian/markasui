"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
  type ToggleEvent,
} from "react";

const root = "inline-block";
const triggerClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
const chevron = "size-4 text-muted";
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

/** Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. */
function placeMenu(trigger: HTMLElement, panel: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const below = anchor.bottom + GAP;
  const above = anchor.top - GAP - height;
  const fitsBelow = below + height <= window.innerHeight;
  const top = fitsBelow || above < 0 ? below : above;
  const left = Math.max(
    GAP,
    Math.min(anchor.left, window.innerWidth - width - GAP),
  );
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

export type DropdownMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

export type DropdownMenuProps = Omit<ComponentProps<"div">, "onSelect"> & {
  items: DropdownMenuItem[];
  label?: string;
  trigger?: ReactNode;
  onSelect?: (value: string) => void;
};

type FocusTarget = "first" | "last";

export function DropdownMenu({
  items,
  label = "Opsi",
  trigger,
  onSelect,
  id,
  className,
  ...props
}: DropdownMenuProps) {
  const generatedId = useId();
  const menuId = id ?? generatedId;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusTarget = useRef<FocusTarget>("first");
  const [open, setOpen] = useState(false);
  const state = open ? "open" : "closed";

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (triggerRef.current && menuRef.current)
        placeMenu(triggerRef.current, menuRef.current);
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
  const focusEdge = (target: FocusTarget) =>
    focusItem(target === "first" ? 0 : -1);

  const close = () => {
    menuRef.current?.hidePopover();
    triggerRef.current?.focus();
  };
  const select = (value: string) => {
    onSelect?.(value);
    close();
  };

  // beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
  const handleBeforeToggle = (event: ToggleEvent<HTMLDivElement>) =>
    setOpen(event.newState === "open");
  const handleToggle = (event: ToggleEvent<HTMLDivElement>) => {
    if (event.newState !== "open" || !triggerRef.current || !menuRef.current)
      return;
    placeMenu(triggerRef.current, menuRef.current);
    focusEdge(focusTarget.current);
    focusTarget.current = "first";
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const targets: Record<string, FocusTarget | undefined> = {
      ArrowDown: "first",
      ArrowUp: "last",
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    if (open) return focusEdge(target);
    focusTarget.current = target;
    menuRef.current?.showPopover();
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
    <div className={cx(root, className)} {...props}>
      <button
        ref={triggerRef}
        type="button"
        id={`${menuId}-trigger`}
        popoverTarget={menuId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        data-state={state}
        className={triggerClass}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger ?? label}
        <svg
          className={chevron}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        role="menu"
        aria-labelledby={`${menuId}-trigger`}
        data-state={state}
        className={menu}
        onBeforeToggle={handleBeforeToggle}
        onToggle={handleToggle}
        onKeyDown={handleMenuKeyDown}
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
