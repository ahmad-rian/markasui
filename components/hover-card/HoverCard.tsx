"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type ReactNode,
  type ToggleEvent,
} from "react";

const root = "inline-block";
const card =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const GAP = 8;
const SHOW_DELAY = 400;
/** Jeda singkat supaya pointer sempat pindah dari pemicu ke kartu. */
const HIDE_DELAY = 100;

/** Letakkan kartu di bawah tengah pemicu, pindah ke atas kalau tidak muat. */
function placeCard(trigger: HTMLElement, target: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = target.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const onTop = below + height > window.innerHeight && above >= 0;
  const left = Math.max(
    GAP,
    Math.min(
      anchor.left + anchor.width / 2 - width / 2,
      window.innerWidth - width - GAP,
    ),
  );
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

export type HoverCardProps = Omit<ComponentProps<"span">, "content"> & {
  /** Isi kartu pratinjau. */
  content: ReactNode;
};

export function HoverCard({
  content,
  id,
  className,
  children,
  ...props
}: HoverCardProps) {
  const generatedId = useId();
  const cardId = id ?? generatedId;
  const rootRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState(false);

  const show = () => {
    clearTimeout(timer.current);
    cardRef.current?.showPopover();
  };
  const showLater = () => {
    clearTimeout(timer.current);
    if (open) return;
    timer.current = setTimeout(show, SHOW_DELAY);
  };
  const hide = () => {
    clearTimeout(timer.current);
    cardRef.current?.hidePopover();
  };
  const hideLater = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(hide, HIDE_DELAY);
  };
  // Fokus yang pindah ke dalam kartu (misalnya link di kartu) tidak menutup kartu.
  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget)) hide();
  };

  useEffect(() => {
    const trigger = rootRef.current?.firstElementChild;
    const described = trigger?.getAttribute("aria-describedby") ?? "";
    if (
      trigger &&
      trigger !== cardRef.current &&
      !described.split(" ").includes(cardId)
    )
      trigger.setAttribute(
        "aria-describedby",
        [described, cardId].filter(Boolean).join(" "),
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      clearTimeout(timer.current);
      cardRef.current?.hidePopover();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
    };
  }, [cardId]);

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (rootRef.current && cardRef.current)
        placeCard(rootRef.current, cardRef.current);
    });
  }, [open]);

  const handleToggle = (event: ToggleEvent<HTMLSpanElement>) => {
    const isOpen = event.newState === "open";
    setOpen(isOpen);
    if (isOpen && rootRef.current && cardRef.current)
      placeCard(rootRef.current, cardRef.current);
  };

  return (
    <span
      ref={rootRef}
      {...props}
      className={cx(root, className)}
      onMouseEnter={showLater}
      onMouseLeave={hideLater}
      onFocus={show}
      onBlur={handleBlur}
    >
      {children}
      <span
        ref={cardRef}
        id={cardId}
        popover="manual"
        data-state={open ? "open" : "closed"}
        className={card}
        onToggle={handleToggle}
      >
        {content}
      </span>
    </span>
  );
}
