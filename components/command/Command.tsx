"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

const dialogClass =
  "mx-auto mt-24 mb-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const search = "flex items-center gap-2 border-b border-line px-4";
const searchIcon = "size-4 shrink-0 text-muted";
const input =
  "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted";
const list = "max-h-72 overflow-y-auto p-1";
const groupClass = "py-1";
const heading = "px-3 pt-1 pb-1.5 text-xs font-medium text-muted";
const option =
  "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out aria-selected:bg-subtle motion-reduce:transition-none";
const shortcutClass = "font-sans text-xs text-muted";
const empty = "px-4 py-6 text-center text-sm text-muted";
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

export type CommandItem = {
  group: string;
  label: string;
  value?: string;
  href?: string;
  shortcut?: string;
};

type Entry = { item: CommandItem; index: number };

/** Nama grup sesuai urutan kemunculan pertama. */
const groupNames = (items: CommandItem[]) => [
  ...new Set(items.map((entry) => entry.group)),
];

const matches = (item: CommandItem, query: string) =>
  item.label.toLowerCase().includes(query.trim().toLowerCase());

export type CommandProps = Omit<
  ComponentProps<"dialog">,
  "onSelect" | "ref" | "open"
> & {
  items: CommandItem[];
  trigger?: ReactNode;
  /** Ctrl+K atau Cmd+K membuka dan menutup palet. */
  hotkey?: boolean;
  placeholderLabel?: string;
  emptyLabel?: string;
  /** Label aksesibel kolom pencarian. */
  searchLabel?: string;
  /** Label aksesibel dialog dan daftar hasil. */
  dialogLabel?: string;
  onSelect?: (value: string) => void;
};

export function Command({
  items,
  trigger,
  hotkey = false,
  placeholderLabel = "Type a command or search...",
  emptyLabel = "No results found.",
  searchLabel = "Search commands",
  dialogLabel = "Command palette",
  onSelect,
  id,
  className,
  onClose,
  onClick,
  ...props
}: CommandProps) {
  const generatedId = useId();
  const dialogId = id ?? generatedId;
  const listId = `${dialogId}-list`;
  const optionId = (index: number) => `${dialogId}-option-${index}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const groups = groupNames(items).map((name, groupIndex) => ({
    name,
    id: `${dialogId}-group-${groupIndex}`,
    entries: items
      .map((item, index): Entry => ({ item, index }))
      .filter((entry) => entry.item.group === name)
      .filter((entry) => matches(entry.item, query)),
  }));
  const visible = groups.flatMap((group) => group.entries);
  const activeEntry = visible[Math.min(active, visible.length - 1)];
  const activeId = activeEntry ? optionId(activeEntry.index) : undefined;

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  useEffect(() => {
    if (!hotkey) return;
    const handleHotkey = (event: globalThis.KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
        return;
      event.preventDefault();
      const dialog = dialogRef.current;
      if (dialog?.open) return dialog.close();
      dialog?.showModal();
      setOpen(true);
    };
    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, [hotkey]);

  useEffect(() => {
    if (activeId)
      document.getElementById(activeId)?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  const select = (value: string) => {
    onSelect?.(value);
    dialogRef.current?.close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = visible.length;
    const steps: Record<string, number | undefined> = {
      ArrowDown: 1,
      ArrowUp: -1,
    };
    const step = steps[event.key];
    if (step !== undefined) {
      event.preventDefault();
      if (count > 0) setActive((current) => (current + step + count) % count);
      return;
    }
    if (event.key !== "Enter" || !activeId) return;
    event.preventDefault();
    document.getElementById(activeId)?.click();
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
    onClick?.(event);
  };

  const renderOption = ({ item, index }: Entry, position: number) => {
    const shared = {
      id: optionId(index),
      role: "option",
      "aria-selected": optionId(index) === activeId,
      tabIndex: -1,
      className: option,
      onMouseMove: () => setActive(position),
      onClick: () => select(item.value ?? item.label),
    };
    const content = (
      <>
        <span>{item.label}</span>
        {item.shortcut && <kbd className={shortcutClass}>{item.shortcut}</kbd>}
      </>
    );
    if (item.href)
      return (
        <a key={index} href={safeHref(item.href)} {...shared}>
          {content}
        </a>
      );
    return (
      <div key={index} {...shared}>
        {content}
      </div>
    );
  };

  return (
    <div className="contents">
      {trigger && (
        <div className="contents" onClick={show}>
          {trigger}
        </div>
      )}
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label={dialogLabel}
        data-state={open ? "open" : "closed"}
        className={cx(dialogClass, className)}
        onClose={(event) => {
          setOpen(false);
          setQuery("");
          setActive(0);
          onClose?.(event);
        }}
        onClick={handleClick}
        {...props}
      >
        <div className={search}>
          <svg
            className={searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            role="combobox"
            aria-label={searchLabel}
            aria-expanded={visible.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholderLabel}
            value={query}
            className={input}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          id={listId}
          role="listbox"
          aria-label={dialogLabel}
          hidden={visible.length === 0}
          className={list}
        >
          {groups.map(
            (group) =>
              group.entries.length > 0 && (
                <div
                  key={group.id}
                  role="group"
                  aria-labelledby={`${group.id}-heading`}
                  className={groupClass}
                >
                  <div id={`${group.id}-heading`} className={heading}>
                    {group.name}
                  </div>
                  {group.entries.map((entry) =>
                    renderOption(entry, visible.indexOf(entry)),
                  )}
                </div>
              ),
          )}
        </div>
        {visible.length === 0 && <p className={empty}>{emptyLabel}</p>}
      </dialog>
    </div>
  );
}
