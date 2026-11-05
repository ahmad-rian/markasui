"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type SyntheticEvent,
} from "react";

const dialogClass =
  "m-auto w-full max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "grid gap-4 p-6";
const titleClass = "text-lg font-semibold text-ink";
const body = "text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const cancelClass = "border border-line bg-surface text-ink hover:bg-subtle";
const actionTones = {
  default: "bg-primary text-on-primary hover:bg-primary-strong",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const ACTION = "action";
const CANCEL = "cancel";

export type AlertDialogProps = Omit<
  ComponentProps<"dialog">,
  "title" | "ref" | "open" | "onCancel"
> & {
  title: ReactNode;
  trigger?: ReactNode;
  /** Warna tombol aksi. Pakai danger untuk aksi yang menghapus atau tidak bisa dibatalkan. */
  variant?: keyof typeof actionTones;
  cancelLabel?: string;
  actionLabel?: string;
  /** Dipanggil saat tombol aksi dipilih. */
  onAction?: () => void;
  /** Dipanggil saat dialog ditutup lewat tombol batal atau Escape. */
  onCancel?: () => void;
};

export function AlertDialog({
  title,
  trigger,
  variant = "default",
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  onAction,
  onCancel,
  id,
  className,
  children,
  onClose,
  ...props
}: AlertDialogProps) {
  const generatedId = useId();
  const dialogId = id ?? generatedId;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.returnValue = "";
    dialog.showModal();
    setOpen(true);
    cancelRef.current?.focus();
  };
  // Selain tombol aksi (tombol batal, Escape, close() dari kode) dihitung batal.
  const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    setOpen(false);
    if (dialog.returnValue === ACTION) onAction?.();
    else {
      dialog.returnValue = CANCEL;
      onCancel?.();
    }
    onClose?.(event);
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
        role="alertdialog"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-description`}
        data-state={open ? "open" : "closed"}
        className={cx(dialogClass, className)}
        onClose={handleClose}
        {...props}
      >
        <div className={panel}>
          <h2 id={`${dialogId}-title`} className={titleClass}>
            {title}
          </h2>
          <div id={`${dialogId}-description`} className={body}>
            {children}
          </div>
          <form method="dialog" className={footerClass}>
            <button
              ref={cancelRef}
              type="submit"
              value={CANCEL}
              className={cx(button, cancelClass)}
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              value={ACTION}
              className={cx(
                button,
                actionTones[variant] ?? actionTones.default,
              )}
            >
              {actionLabel}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
