"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ToggleEvent,
} from "react";

const root = "inline-flex";
const tooltip =
  "inset-auto m-0 max-w-64 rounded-md bg-ink px-2 py-1 text-xs font-medium text-canvas shadow-overlay";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const GAP = 6;
const SHOW_DELAY = 300;

type Side = "top" | "bottom";

/** Letakkan tooltip di tengah pemicu pada sisi yang dipilih, pindah sisi kalau tidak muat. */
function placeTooltip(trigger: HTMLElement, tip: HTMLElement, side: Side) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = tip.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const fitsAbove = above >= 0;
  const fitsBelow = below + height <= window.innerHeight;
  const onTop =
    side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
  const left = Math.max(
    GAP,
    Math.min(
      anchor.left + anchor.width / 2 - width / 2,
      window.innerWidth - width - GAP,
    ),
  );
  tip.style.top = `${onTop ? above : below}px`;
  tip.style.left = `${left}px`;
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

export type TooltipProps = ComponentProps<"span"> & {
  content: string;
  side?: Side;
};

export function Tooltip({
  content,
  side = "top",
  id,
  className,
  children,
  ...props
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const rootRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState(false);

  const show = () => {
    clearTimeout(timer.current);
    tipRef.current?.showPopover();
  };
  const showLater = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(show, SHOW_DELAY);
  };
  const hide = () => {
    clearTimeout(timer.current);
    tipRef.current?.hidePopover();
  };

  useEffect(() => {
    const trigger = rootRef.current?.firstElementChild;
    const described = trigger?.getAttribute("aria-describedby") ?? "";
    if (trigger && !described.split(" ").includes(tooltipId))
      trigger.setAttribute(
        "aria-describedby",
        [described, tooltipId].filter(Boolean).join(" "),
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      clearTimeout(timer.current);
      tipRef.current?.hidePopover();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
    };
  }, [tooltipId]);

  useEffect(() => {
    if (!open) return;
    return followViewport(() => {
      if (rootRef.current && tipRef.current)
        placeTooltip(rootRef.current, tipRef.current, side);
    });
  }, [open, side]);

  const handleToggle = (event: ToggleEvent<HTMLSpanElement>) => {
    const isOpen = event.newState === "open";
    setOpen(isOpen);
    if (isOpen && rootRef.current && tipRef.current)
      placeTooltip(rootRef.current, tipRef.current, side);
  };

  return (
    <span
      ref={rootRef}
      {...props}
      className={cx(root, className)}
      onMouseEnter={showLater}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span
        ref={tipRef}
        id={tooltipId}
        popover="manual"
        role="tooltip"
        data-state={open ? "open" : "closed"}
        className={tooltip}
        onToggle={handleToggle}
      >
        {content}
      </span>
    </span>
  );
}
