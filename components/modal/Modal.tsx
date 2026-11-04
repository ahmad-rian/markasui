"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

const dialogClass =
  "m-auto w-full max-w-lg rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "grid gap-4 p-6";
const header = "flex items-start justify-between gap-4";
const titleClass = "text-lg font-semibold text-ink";
const body = "text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const close =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type ModalProps = Omit<
  ComponentProps<"dialog">,
  "title" | "ref" | "open"
> & {
  title: ReactNode;
  trigger?: ReactNode;
  footer?: ReactNode;
  /** Label aksesibel tombol tutup. */
  closeLabel?: string;
};

export function Modal({
  title,
  closeLabel = "Close",
  trigger,
  footer,
  id,
  className,
  children,
  onClose,
  onClick,
  ...props
}: ModalProps) {
  const generatedId = useId();
  const dialogId = id ?? generatedId;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
    onClick?.(event);
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
        aria-labelledby={`${dialogId}-title`}
        data-state={open ? "open" : "closed"}
        className={cx(dialogClass, className)}
        onClose={(event) => {
          setOpen(false);
          onClose?.(event);
        }}
        onClick={handleClick}
        {...props}
      >
        <div className={panel}>
          <div className={header}>
            <h2 id={`${dialogId}-title`} className={titleClass}>
              {title}
            </h2>
            <form method="dialog">
              <button type="submit" className={close} aria-label={closeLabel}>
                <svg
                  className="size-4"
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
            </form>
          </div>
          <div className={body}>{children}</div>
          {footer && (
            <form method="dialog" className={footerClass}>
              {footer}
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
