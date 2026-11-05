"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type ToggleEvent,
} from "react";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full rounded-md border border-line bg-surface ps-3 pe-9 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const chevron =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const panel =
  "inset-auto m-0 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const optionClass =
  "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-subtle aria-selected:bg-subtle";
const check = "size-4 shrink-0 text-primary";
const emptyClass = "px-3 py-2 text-sm text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const GAP = 4;

/** Letakkan daftar di bawah input selebar input, pindah ke atas kalau tidak muat. */
function placeList(anchorEl: HTMLElement, panelEl: HTMLElement) {
  const anchor = anchorEl.getBoundingClientRect();
  panelEl.style.width = `${anchor.width}px`;
  const { height } = panelEl.getBoundingClientRect();
  const below = anchor.bottom + GAP;
  const above = anchor.top - GAP - height;
  const fitsBelow = below + height <= window.innerHeight;
  panelEl.style.top = `${fitsBelow || above < 0 ? below : above}px`;
  panelEl.style.left = `${anchor.left}px`;
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

export type ComboboxOption = { value: string; label: string };

/** Indeks opsi (di daftar asli) yang labelnya memuat teks filter. */
const matchingIndexes = (options: ComboboxOption[], filter: string) => {
  const query = filter.trim().toLowerCase();
  return options.flatMap((option, index) =>
    option.label.toLowerCase().includes(query) ? [index] : [],
  );
};

const labelOf = (options: ComboboxOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? "";

export type ComboboxProps = Omit<
  ComponentProps<"input">,
  "value" | "defaultValue" | "type" | "role" | "name"
> & {
  options: ComboboxOption[];
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  emptyLabel?: string;
  onValueChange?: (value: string) => void;
};

export function Combobox({
  options,
  label,
  hint,
  error,
  name,
  value,
  defaultValue = "",
  emptyLabel = "No results",
  onValueChange,
  id,
  className,
  onChange,
  onKeyDown,
  onBlur,
  onClick,
  ...props
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);
  const selected = value ?? internalValue;
  const [text, setText] = useState(() => labelOf(options, selected));
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const isOpen = useRef(false);
  const lastValue = useRef(selected);

  const visible = matchingIndexes(options, filter);
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;
  const optionId = (index: number) => `${inputId}-option-${index}`;

  // Nilai terkontrol yang berubah dari luar menyamakan teks input.
  useEffect(() => {
    if (selected === lastValue.current) return;
    lastValue.current = selected;
    setText(labelOf(options, selected));
  }, [selected, options]);

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (inputRef.current && panelRef.current)
        placeList(inputRef.current, panelRef.current);
    });
  }, [open]);

  useEffect(() => {
    if (active < 0) return;
    document.getElementById(optionId(active))?.scrollIntoView?.({
      block: "nearest",
    });
  });

  const commit = (next: string) => {
    if (next === selected) return;
    lastValue.current = next;
    setInternalValue(next);
    onValueChange?.(next);
  };

  const show = () => {
    if (!isOpen.current) panelRef.current?.showPopover();
  };
  const hide = () => {
    setActive(-1);
    if (isOpen.current) panelRef.current?.hidePopover();
  };

  const select = (index: number) => {
    const option = options[index];
    if (!option) return;
    commit(option.value);
    setText(option.label);
    setFilter("");
    hide();
  };

  const move = (step: 1 | -1) => {
    if (visible.length === 0) return;
    const position = visible.indexOf(active);
    const next =
      position === -1
        ? step === 1
          ? 0
          : visible.length - 1
        : (position + step + visible.length) % visible.length;
    setActive(visible[next] ?? -1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setText(event.currentTarget.value);
    setFilter(event.currentTarget.value);
    setActive(-1);
    commit("");
    show();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      if (isOpen.current) return move(step);
      show();
      const edge = step === 1 ? visible[0] : visible[visible.length - 1];
      return setActive(edge ?? -1);
    }
    if (event.key === "Enter" && isOpen.current && active >= 0) {
      event.preventDefault();
      return select(active);
    }
    if (event.key !== "Escape") return;
    event.preventDefault();
    if (isOpen.current) return hide();
    setText("");
    setFilter("");
    commit("");
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    hide();
  };

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    show();
  };

  // beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
  const handleBeforeToggle = (event: ToggleEvent<HTMLDivElement>) => {
    isOpen.current = event.newState === "open";
    setOpen(isOpen.current);
  };
  const handleToggle = (event: ToggleEvent<HTMLDivElement>) => {
    if (event.newState === "open" && inputRef.current && panelRef.current)
      placeList(inputRef.current, panelRef.current);
  };

  return (
    <div className={wrapper}>
      {label && (
        <label id={`${inputId}-label`} htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      <div className={control}>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? optionId(active) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          data-state={open ? "open" : "closed"}
          className={cx(field, className)}
          {...props}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onClick={handleClick}
        />
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
      </div>
      {name && <input type="hidden" name={name} value={selected} />}
      <div
        ref={panelRef}
        id={`${inputId}-popup`}
        popover="manual"
        data-state={open ? "open" : "closed"}
        className={panel}
        onBeforeToggle={handleBeforeToggle}
        onToggle={handleToggle}
        onMouseDown={(event) => event.preventDefault()}
      >
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={label ? `${inputId}-label` : undefined}
        >
          {visible.map((index) => {
            const option = options[index]!;
            const isSelected = option.value === selected && selected !== "";
            return (
              <li
                key={index}
                id={optionId(index)}
                role="option"
                aria-selected={index === active}
                data-state={isSelected ? "checked" : "unchecked"}
                className={optionClass}
                onClick={() => select(index)}
              >
                {option.label}
                {isSelected && (
                  <svg
                    className={check}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
        {visible.length === 0 && <p className={emptyClass}>{emptyLabel}</p>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className={errorClass}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className={hintClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
