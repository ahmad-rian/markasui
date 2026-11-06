"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type DragEvent,
  type ReactNode,
} from "react";

const root = "grid gap-3";
const zone =
  "group/zone grid cursor-pointer justify-items-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface px-6 py-8 text-center transition duration-200 ease-out hover:border-primary-line hover:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:opacity-50 data-[state=over]:border-primary data-[state=over]:bg-primary-soft data-[state=over]:ring-4 data-[state=over]:ring-primary/10 motion-reduce:transition-none";
const badge =
  "size-11 rounded-full bg-subtle p-3 text-ink transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=over]/zone:-translate-y-1.5 group-data-[state=over]/zone:scale-110 group-data-[state=over]/zone:bg-surface motion-reduce:transition-none";
const titleClass = "text-sm text-ink";
const browseClass = "font-medium underline underline-offset-4";
const hintClass = "text-xs text-muted";
const srOnly = "sr-only";
const list = "grid gap-2";
const item =
  "group/item flex items-center gap-3 rounded-lg border border-line bg-surface p-3 data-[state=error]:border-danger/40 data-[state=error]:bg-danger/5";
const fileIcon =
  "size-9 shrink-0 rounded-md bg-subtle p-2 text-ink group-data-[state=error]/item:bg-danger/10 group-data-[state=error]/item:text-danger";
const body = "grid min-w-0 flex-1 gap-1.5";
const row = "flex items-baseline justify-between gap-3 text-sm";
const nameClass = "truncate font-medium text-ink";
const sizeClass = "shrink-0 text-xs text-muted tabular-nums";
const errorClass = "text-xs text-danger";
const track = "h-1.5 overflow-hidden rounded-full bg-subtle";
const bar =
  "h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none";
const bars = { busy: "bg-primary", done: "bg-success" };
const remove =
  "size-8 shrink-0 rounded-md p-2 text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const smallIcon = "size-4";
const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** 24px stroked icons: the drop prompt, remove, and one per file kind. */
const UPLOAD = "M12 16V4M7 9l5-5 5 5M4 16v4h16v-4";
const REMOVE = "M6 6l12 12M18 6 6 18";
const FILE = "M14 3H5v18h14V8zM14 3v5h5M9 13h6M9 17h4";
const KINDS: Record<string, string> = {
  image: "M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15 8h.01",
  video: "M3 6h13v12H3zM16 10l5-3v10l-5-3",
  audio:
    "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
};

export type DropzoneFile = {
  name: string;
  /** Size in bytes. */
  size: number;
  type?: string;
  /** Upload progress 0 to 100. Leave out to hide the bar. */
  progress?: number;
  error?: string;
};
type Item = DropzoneFile & { key: number; file?: File };

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const fill = (template: string, value: string | number) =>
  template.replace(/\{\w+\}/, () => String(value));

/** 1536 -> "2 KB", 2400000 -> "2.3 MB". */
export function formatSize(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < 3) {
    value /= 1024;
    unit++;
  }
  return `${unit < 2 ? Math.round(value) : Number(value.toFixed(1))} ${["B", "KB", "MB", "GB"][unit]}`;
}

/** Same rules as the accept attribute: .ext, type/*, or an exact MIME type. */
export function accepts(file: { name: string; type?: string }, accept = "") {
  const type = (file.type ?? "").toLowerCase();
  return (
    !accept ||
    accept.split(",").some((raw) => {
      const rule = raw.trim().toLowerCase();
      if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      return type === rule;
    })
  );
}

const iconOf = ({ type = "" }: DropzoneFile) =>
  KINDS[type.split("/")[0]!] ?? FILE;

export type FileDropzoneProps = Omit<ComponentProps<"div">, "onChange"> & {
  name?: string;
  accept?: string;
  multiple?: boolean;
  /** Largest file in bytes. */
  maxSize?: number;
  /** Most files kept when multiple is on. */
  maxFiles?: number;
  disabled?: boolean;
  required?: boolean;
  /** Files already in the list, such as earlier uploads. They are shown, not submitted. */
  files?: DropzoneFile[];
  /** Live upload progress by file name, 0 to 100. */
  progress?: Record<string, number>;
  hint?: ReactNode;
  onFilesChange?: (files: File[]) => void;
  dropLabel?: string;
  browseLabel?: string;
  removeLabel?: string;
  tooLargeLabel?: string;
  typeLabel?: string;
  tooManyLabel?: string;
};

export function FileDropzone({
  name,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled,
  required,
  files = [],
  progress = {},
  hint,
  onFilesChange,
  dropLabel = "Drop files here or",
  browseLabel = "browse",
  removeLabel = "Remove {name}",
  tooLargeLabel = "Larger than {size}",
  typeLabel = "File type not allowed",
  tooManyLabel = "Only {max} files allowed",
  id,
  className,
  ...props
}: FileDropzoneProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const input = useRef<HTMLInputElement>(null);
  const seq = useRef(files.length);
  const [items, setItems] = useState<Item[]>(() =>
    files.map((file, key) => ({ ...file, key })),
  );
  const [over, setOver] = useState(false);
  const limit = multiple ? (maxFiles ?? Infinity) : 1;

  /** Keep the native input's files equal to the valid picked files, so a form posts them. */
  const update = (next: Item[]) => {
    setItems(next);
    const picked = next.flatMap((i) => (i.file && !i.error ? [i.file] : []));
    if (input.current) {
      const transfer = new DataTransfer();
      picked.forEach((file) => transfer.items.add(file));
      input.current.files = transfer.files;
    }
    onFilesChange?.(picked);
  };

  const add = (incoming: File[]) => {
    const kept = multiple ? items : [];
    let count = kept.filter((i) => !i.error).length;
    const added = incoming.map((file) => {
      const error = !accepts(file, accept)
        ? typeLabel
        : maxSize !== undefined && file.size > maxSize
          ? fill(tooLargeLabel, formatSize(maxSize))
          : count >= limit
            ? fill(tooManyLabel, limit)
            : undefined;
      if (!error) count++;
      const { name, size, type } = file;
      return { key: seq.current++, name, size, type, file, error };
    });
    update([...kept, ...added]);
  };

  const drag = (event: DragEvent<HTMLLabelElement>, entering: boolean) => {
    event.preventDefault();
    if (entering) return setOver(!disabled);
    if (!event.currentTarget.contains(event.relatedTarget as Node | null))
      setOver(false);
  };

  return (
    <div {...props} className={cx(root, className)}>
      <label
        data-state={over ? "over" : "idle"}
        className={zone}
        onDragEnter={(event) => drag(event, true)}
        onDragOver={(event) => drag(event, true)}
        onDragLeave={(event) => drag(event, false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          if (!disabled) add([...event.dataTransfer.files]);
        }}
      >
        <input
          ref={input}
          id={inputId}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          className={srOnly}
          onChange={(event) => add([...(event.currentTarget.files ?? [])])}
        />
        <svg className={badge} {...svg}>
          <path d={UPLOAD} />
        </svg>
        <span className={titleClass}>
          {dropLabel} <span className={browseClass}>{browseLabel}</span>
        </span>
        {hint && <span className={hintClass}>{hint}</span>}
      </label>
      {items.length > 0 && (
        <ul className={list}>
          {items.map((file) => {
            const percent = progress[file.name] ?? file.progress;
            return (
              <li
                key={file.key}
                data-state={file.error ? "error" : "ok"}
                className={item}
              >
                <svg className={fileIcon} {...svg}>
                  <path d={iconOf(file)} />
                </svg>
                <div className={body}>
                  <div className={row}>
                    <span className={nameClass}>{file.name}</span>
                    <span className={sizeClass}>{formatSize(file.size)}</span>
                  </div>
                  {file.error ? (
                    <p role="alert" className={errorClass}>
                      {file.error}
                    </p>
                  ) : percent !== undefined ? (
                    <div
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-label={file.name}
                      className={track}
                    >
                      <div
                        className={cx(
                          bar,
                          bars[percent < 100 ? "busy" : "done"],
                        )}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label={fill(removeLabel, file.name)}
                  className={remove}
                  onClick={() => update(items.filter((i) => i !== file))}
                >
                  <svg className={smallIcon} {...svg}>
                    <path d={REMOVE} />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
