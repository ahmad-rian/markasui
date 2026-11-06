"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

const root =
  "grid gap-1 rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 ease-out has-[textarea:focus-visible]:border-primary-line has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-offset-2 has-[textarea:focus-visible]:outline-primary motion-reduce:transition-none";
const chips = "flex flex-wrap gap-1.5 px-1 pt-1";
const chip =
  "inline-flex h-7 max-w-full items-center gap-1.5 rounded-md border border-line bg-subtle pr-1 pl-2 text-xs font-medium text-ink";
const chipName = "max-w-40 truncate";
const chipRemove =
  "grid size-5 shrink-0 place-items-center rounded text-muted transition-colors duration-150 ease-out hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary motion-reduce:transition-none";
const field =
  "block min-h-10 w-full resize-none overflow-y-auto bg-transparent px-2 py-2 text-sm leading-6 text-ink outline-none field-sizing-content placeholder:text-faint";
const bar = "flex items-center gap-1";
const iconButton =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const select =
  "h-8 max-w-40 cursor-pointer truncate rounded-full bg-transparent px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const counter =
  "ml-auto px-1.5 text-xs text-muted tabular-nums data-[state=limit]:text-danger";
const send =
  "group grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-[background-color,opacity,scale] duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";
const sendIcon =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-50 group-data-[state=stop]:opacity-0 motion-reduce:transition-none";
const stopIcon =
  "col-start-1 row-start-1 size-3 scale-50 rounded-xs bg-current opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-100 group-data-[state=stop]:opacity-100 motion-reduce:transition-none";
const icon = "size-4";
const smallIcon = "size-3";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Browsers without field-sizing grow the textarea by hand. */
function grow(el: HTMLTextAreaElement | null) {
  if (!el || globalThis.CSS?.supports?.("field-sizing", "content")) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

const Svg = ({ d, className }: { d: string; className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

export type PromptInputValue = { text: string; files: File[] };
export type PromptInputModel = string | { value: string; label: string };

export type PromptInputProps = Omit<
  ComponentProps<"form">,
  "onSubmit" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (text: string) => void;
  /** Fires on the send button or Enter with the text and attached files. */
  onSend?: (value: PromptInputValue) => void;
  /** Fires when the stop button is pressed while loading. */
  onStop?: () => void;
  /** Turns the send button into a stop button. */
  loading?: boolean;
  /** Character limit. Shows a counter next to the send button. */
  maxLength?: number;
  /** Tallest the field grows before it scrolls, in px. */
  maxHeight?: number;
  /** Shows the attach button. */
  attachments?: boolean;
  accept?: string;
  /** Options of the small model picker on the left. */
  models?: PromptInputModel[];
  model?: string;
  onModelChange?: (model: string) => void;
  /** Extra tools on the left of the action row. */
  actions?: ReactNode;
  placeholderLabel?: string;
  inputLabel?: string;
  sendLabel?: string;
  stopLabel?: string;
  attachLabel?: string;
  /** Name of each remove button. Accepts {name}. */
  removeLabel?: string;
  modelLabel?: string;
};

export function PromptInput({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  onStop,
  loading = false,
  maxLength,
  maxHeight = 200,
  attachments = true,
  accept,
  models = [],
  model,
  onModelChange,
  actions,
  placeholderLabel = "Ask anything",
  inputLabel = "Message",
  sendLabel = "Send",
  stopLabel = "Stop",
  attachLabel = "Attach files",
  removeLabel = "Remove {name}",
  modelLabel = "Model",
  className,
  ...props
}: PromptInputProps) {
  const [inner, setInner] = useState(defaultValue);
  const [files, setFiles] = useState<File[]>([]);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const text = value ?? inner;
  const canSend = text.trim() !== "" && !loading;

  useEffect(() => grow(fieldRef.current), [text]);

  const setText = (next: string) => {
    setInner(next);
    onValueChange?.(next);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) return;
    onSend?.({ text, files });
    setText("");
    setFiles([]);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };
  /** The button turns into submit during this click, so keep it from sending. */
  const stop = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onStop?.();
  };
  const remove = (index: number) => {
    setFiles((list) => list.filter((_, i) => i !== index));
    fieldRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={cx(root, className)} {...props}>
      {files.length > 0 && (
        <ul className={chips}>
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className={chip}>
              <span className={chipName}>{file.name}</span>
              <button
                type="button"
                aria-label={removeLabel.replace("{name}", file.name)}
                className={chipRemove}
                onClick={() => remove(index)}
              >
                <Svg d="M18 6 6 18M6 6l12 12" className={smallIcon} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <textarea
        ref={fieldRef}
        rows={1}
        value={text}
        maxLength={maxLength}
        aria-label={inputLabel}
        placeholder={placeholderLabel}
        style={{ maxHeight }}
        className={field}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={bar}>
        {attachments && (
          <>
            <button
              type="button"
              aria-label={attachLabel}
              className={iconButton}
              onClick={() => fileRef.current?.click()}
            >
              <Svg
                d="m21 11-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6L15 7.6"
                className={icon}
              />
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              hidden
              tabIndex={-1}
              accept={accept}
              onChange={(event) => {
                const picked = Array.from(event.target.files ?? []);
                setFiles((list) => [...list, ...picked]);
                event.target.value = "";
              }}
            />
          </>
        )}
        {models.length > 0 && (
          <select
            aria-label={modelLabel}
            defaultValue={model}
            className={select}
            onChange={(event) => onModelChange?.(event.target.value)}
          >
            {models.map((option) => {
              const item =
                typeof option === "string"
                  ? { value: option, label: option }
                  : option;
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        )}
        {actions}
        <span
          data-state={
            maxLength !== undefined && text.length >= maxLength ? "limit" : "ok"
          }
          className={counter}
        >
          {maxLength !== undefined ? `${text.length}/${maxLength}` : ""}
        </span>
        <button
          type={loading ? "button" : "submit"}
          aria-label={loading ? stopLabel : sendLabel}
          data-state={loading ? "stop" : "send"}
          disabled={!loading && !canSend}
          className={send}
          onClick={loading ? stop : undefined}
        >
          <Svg d="M12 19V5M6 11l6-6 6 6" className={sendIcon} />
          <span aria-hidden="true" className={stopIcon} />
        </button>
      </div>
    </form>
  );
}
