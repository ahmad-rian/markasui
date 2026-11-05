"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";

const wrapper = "contents";
const trigger =
  "group relative grid w-full content-start gap-3 rounded-xl border border-line bg-surface p-3 text-left text-ink transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:opacity-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const cardMedia = "block h-28 overflow-hidden rounded-lg bg-subtle";
const cardText = "grid gap-1 px-1 pb-1";
const cardTitle = "text-sm font-medium text-ink";
const cardDescription = "line-clamp-2 text-sm text-muted";
const expandIcon =
  "absolute top-5 right-5 inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-200 ease-out group-hover:rotate-90 motion-reduce:transition-none";
const dialogClass =
  "m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "relative";
const dialogMedia = "h-48 overflow-hidden bg-subtle";
const dialogBody = "grid gap-3 p-5";
const dialogTitle = "pr-10 text-lg font-semibold text-ink";
const dialogDescription = "text-sm text-muted";
const details = "grid gap-3 text-sm text-ink";
const footerClass = "flex flex-wrap justify-end gap-2 pt-2";
const close =
  "absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-4";

const OPEN_MS = 420;
const CLOSE_MS = 320;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const canAnimate = (el: HTMLElement) =>
  typeof el.animate === "function" &&
  !(
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );

/** Transform that puts the dialog exactly over the card (FLIP "first" frame). */
function overCard(card: DOMRect, dialog: HTMLElement) {
  const box = dialog.getBoundingClientRect();
  return `translate(${card.left - box.left}px, ${card.top - box.top}px) scale(${card.width / box.width}, ${card.height / box.height})`;
}

/** Grow the dialog out of the card, or shrink it back into it. */
function morph(
  dialog: HTMLElement,
  panelEl: HTMLElement,
  card: DOMRect,
  opening: boolean,
) {
  const duration = opening ? OPEN_MS : CLOSE_MS;
  // Stop a running grow or shrink first so the measurement below is not mid-flight.
  dialog
    .getAnimations?.({ subtree: true })
    .forEach((animation) => animation.cancel());
  const frames: Keyframe[] = [
    { transform: overCard(card, dialog), transformOrigin: "top left" },
    { transform: "none", transformOrigin: "top left" },
  ];
  const fade: Keyframe[] = [
    { opacity: 0 },
    { opacity: 0, offset: 0.35 },
    { opacity: 1 },
  ];
  // Closing holds the last frame until the dialog is closed, so it never flashes back to full size.
  const options: KeyframeAnimationOptions = {
    duration,
    easing: EASE,
    direction: opening ? "normal" : "reverse",
    fill: opening ? "none" : "forwards",
  };
  panelEl.animate(fade, options);
  dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
    ...options,
    pseudoElement: "::backdrop",
  });
  return dialog.animate(frames, options);
}

export type ExpandableCardProps = Omit<
  ComponentProps<"button">,
  "title" | "type"
> & {
  title: ReactNode;
  /** Short text, clamped to two lines on the card and shown in full when open. */
  description?: ReactNode;
  /** Image or illustration shown on top of the card and the open view. */
  media?: ReactNode;
  /** Actions at the bottom of the open view. */
  footer?: ReactNode;
  closeLabel?: string;
};

export function ExpandableCard({
  title,
  description,
  media,
  footer,
  closeLabel = "Close",
  id,
  className,
  children,
  onClick,
  ...props
}: ExpandableCardProps) {
  const generatedId = useId();
  const cardId = id ?? generatedId;
  const dialogId = `${cardId}-dialog`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);

  const show = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    const dialog = dialogRef.current;
    const card = triggerRef.current;
    if (event.defaultPrevented || !dialog || !card || dialog.open) return;
    const from = card.getBoundingClientRect();
    dialog.showModal();
    setOpen(true);
    if (canAnimate(dialog) && panelRef.current)
      morph(dialog, panelRef.current, from, true);
  };

  const hide = () => {
    const dialog = dialogRef.current;
    const card = triggerRef.current;
    if (!dialog?.open || closing.current) return;
    if (!card || !panelRef.current || !canAnimate(dialog)) {
      dialog.close();
      return;
    }
    closing.current = true;
    const animation = morph(
      dialog,
      panelRef.current,
      card.getBoundingClientRect(),
      false,
    );
    animation.onfinish = () => dialog.close();
  };

  const handleClosed = () => {
    dialogRef.current
      ?.getAnimations?.({ subtree: true })
      .forEach((animation) => animation.cancel());
    closing.current = false;
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    hide();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    hide();
  };
  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) hide();
  };

  return (
    <div className={wrapper}>
      <button
        ref={triggerRef}
        id={cardId}
        type="button"
        aria-haspopup="dialog"
        aria-controls={dialogId}
        data-state={open ? "open" : "closed"}
        className={cx(trigger, className)}
        onClick={show}
        {...props}
      >
        {media && <span className={cardMedia}>{media}</span>}
        <span className={cardText}>
          <span className={cardTitle}>{title}</span>
          {description && (
            <span className={cardDescription}>{description}</span>
          )}
        </span>
        <span aria-hidden="true" className={expandIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={icon}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={`${cardId}-title`}
        data-state={open ? "open" : "closed"}
        className={dialogClass}
        onClose={handleClosed}
        onCancel={handleCancel}
        onKeyDown={handleKeyDown}
        onClick={handleBackdrop}
      >
        <div ref={panelRef} className={panel}>
          <button
            type="button"
            aria-label={closeLabel}
            className={close}
            onClick={hide}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={icon}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          {media && <div className={dialogMedia}>{media}</div>}
          <div className={dialogBody}>
            <h2 id={`${cardId}-title`} className={dialogTitle}>
              {title}
            </h2>
            {description && <p className={dialogDescription}>{description}</p>}
            {children && <div className={details}>{children}</div>}
            {footer && <div className={footerClass}>{footer}</div>}
          </div>
        </div>
      </dialog>
    </div>
  );
}
