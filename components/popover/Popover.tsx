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
const panel =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const GAP = 4;
const FOCUSABLE =
  "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

type Side = "top" | "bottom";
type Align = "start" | "center" | "end";

/** Letakkan panel di sisi pilihan dengan perataan pilihan, pindah sisi kalau tidak muat. */
function placePanel(
  trigger: HTMLElement,
  target: HTMLElement,
  side: Side,
  align: Align,
) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = target.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const fitsAbove = above >= 0;
  const fitsBelow = below + height <= window.innerHeight;
  const onTop =
    side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
  const starts: Record<Align, number> = {
    start: anchor.left,
    center: anchor.left + anchor.width / 2 - width / 2,
    end: anchor.right - width,
  };
  const start = starts[align] ?? starts.start;
  const left = Math.max(GAP, Math.min(start, window.innerWidth - width - GAP));
  target.style.top = `${onTop ? above : below}px`;
  target.style.left = `${left}px`;
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

export type PopoverProps = ComponentProps<"div"> & {
  /** Teks tombol pemicu. */
  label?: string;
  /** Isi tombol pemicu kustom, menggantikan label. */
  trigger?: ReactNode;
  side?: Side;
  align?: Align;
};

export function Popover({
  label = "Open",
  trigger,
  side = "bottom",
  align = "start",
  id,
  className,
  children,
  ...props
}: PopoverProps) {
  const generatedId = useId();
  const panelId = id ?? generatedId;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const state = open ? "open" : "closed";

  const place = () => {
    if (triggerRef.current && panelRef.current)
      placePanel(triggerRef.current, panelRef.current, side, align);
  };

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (triggerRef.current && panelRef.current)
        placePanel(triggerRef.current, panelRef.current, side, align);
    });
  }, [open, side, align]);

  // beforetoggle berjalan sinkron, jadi status selalu terbaru untuk klik berikutnya.
  const handleBeforeToggle = (event: ToggleEvent<HTMLDivElement>) =>
    setOpen(event.newState === "open");
  const handleToggle = (event: ToggleEvent<HTMLDivElement>) => {
    const target = panelRef.current;
    if (!target) return;
    if (event.newState === "open") {
      place();
      target.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      return;
    }
    // Fokus kembali ke pemicu, kecuali user sudah memindahkannya ke elemen lain di luar panel.
    const active = document.activeElement;
    if (active === document.body || target.contains(active))
      triggerRef.current?.focus();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    panelRef.current?.hidePopover();
    triggerRef.current?.focus();
  };

  return (
    <div className={cx(root, className)} {...props}>
      <button
        ref={triggerRef}
        type="button"
        id={`${panelId}-trigger`}
        popoverTarget={panelId}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        data-state={state}
        className={triggerClass}
      >
        {trigger ?? label}
      </button>
      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        role="dialog"
        aria-labelledby={`${panelId}-trigger`}
        data-state={state}
        className={panel}
        onBeforeToggle={handleBeforeToggle}
        onToggle={handleToggle}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </div>
  );
}
