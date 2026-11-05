"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

const root = "overflow-hidden rounded-xl border border-line bg-subtle";
const header =
  "flex items-center gap-2 border-b border-line py-1.5 pr-1.5 pl-4";
const titleClass = "min-w-0 truncate text-xs font-medium text-muted";
const copyButton =
  "ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-4";
const pre =
  "overflow-x-auto p-4 font-mono text-sm leading-6 text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
const lineClass = "block min-h-6 whitespace-pre";
const lineNumber =
  "mr-4 inline-block min-w-6 text-right text-muted select-none";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const COPIED_DURATION = 2000;

/** Pecah kode per baris, abaikan satu baris kosong di akhir. */
export const splitLines = (code: string): string[] =>
  code.replace(/\r?\n$/, "").split(/\r?\n/);

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  code: string;
  title?: string;
  showLineNumbers?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
};

export function CodeBlock({
  code,
  title,
  showLineNumbers = false,
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      setCopied(false);
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_DURATION);
  };

  return (
    <div className={cx(root, className)} {...props}>
      <div className={header}>
        {title && <span className={titleClass}>{title}</span>}
        <button
          type="button"
          data-state={copied ? "copied" : "idle"}
          className={copyButton}
          onClick={copy}
        >
          {copied ? (
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
              <path d="m5 12 5 5L20 7" />
            </svg>
          ) : (
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
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          )}
          <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>
      <pre tabIndex={0} className={pre}>
        <code>
          {splitLines(code).map((line, index) => (
            <span key={index} className={lineClass}>
              {showLineNumbers && (
                <span aria-hidden="true" className={lineNumber}>
                  {index + 1}
                </span>
              )}
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
