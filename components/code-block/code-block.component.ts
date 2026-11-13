import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";

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

const COPIED_DURATION = 2000;

/** Split code into lines, ignoring one trailing empty line. */
export const splitLines = (code: string): string[] =>
  code.replace(/\r?\n$/, "").split(/\r?\n/);

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The host title attribute is cleared so the file name never becomes a tooltip.
 */
@Component({
  selector: "div[markas-code-block]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root", "[attr.title]": "null" },
  template: `
    <div [class]="header">
      @if (title()) {
        <span [class]="titleClass">{{ title() }}</span>
      }
      <button
        type="button"
        [attr.data-state]="copied() ? 'copied' : 'idle'"
        [class]="copyButton"
        (click)="copy()"
      >
        @if (copied()) {
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [attr.class]="icon"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        } @else {
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [attr.class]="icon"
          >
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
          </svg>
        }
        <span aria-live="polite">{{
          copied() ? copiedLabel() : copyLabel()
        }}</span>
      </button>
    </div>
    <pre
      tabindex="0"
      [class]="pre"
    ><code>@for (line of lines(); track $index) {<span [class]="lineClass">@if (showLineNumbers()) {<span aria-hidden="true" [class]="lineNumber">{{ $index + 1 }}</span>}{{ line }}</span>}</code></pre>
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly title = input<string>();
  readonly showLineNumbers = input(false, { transform: booleanAttribute });
  readonly copyLabel = input("Copy code");
  readonly copiedLabel = input("Copied");

  protected readonly root = root;
  protected readonly header = header;
  protected readonly titleClass = titleClass;
  protected readonly copyButton = copyButton;
  protected readonly icon = icon;
  protected readonly pre = pre;
  protected readonly lineClass = lineClass;
  protected readonly lineNumber = lineNumber;
  protected readonly copied = signal(false);
  protected readonly lines = computed(() => splitLines(this.code()));
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy() {
    try {
      await navigator.clipboard.writeText(this.code());
    } catch {
      this.copied.set(false);
      return;
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), COPIED_DURATION);
  }
}
