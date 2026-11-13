import {
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  ChangeDetectorRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from "@angular/core";

const root = "grid gap-5";
const group = "grid gap-2";
const heading =
  "flex items-center gap-2 px-1 text-xs font-medium text-muted transition-opacity duration-300 ease-out starting:opacity-0 motion-reduce:transition-none";
const count =
  "rounded-full bg-subtle px-1.5 text-[11px] leading-4 text-muted tabular-nums";
const list = "grid gap-1.5";
const itemClass =
  "relative flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 transition-colors duration-300 ease-out data-[pinned=true]:border-primary-line data-[pinned=true]:bg-primary-soft motion-reduce:transition-none";
const iconTile =
  "grid size-9 shrink-0 place-items-center rounded-lg bg-subtle text-ink transition-colors duration-300 ease-out in-data-[pinned=true]:bg-surface motion-reduce:transition-none";
const iconClass = "size-5";
const body = "grid min-w-0 flex-1";
const labelClass = "truncate text-sm font-medium text-ink";
const descriptionClass = "truncate text-xs text-muted";
const metaClass = "shrink-0 text-xs text-muted tabular-nums";
const pinButton =
  "group/pin grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:text-ink motion-reduce:transition-none";
const pinIcon =
  "size-4 rotate-45 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-aria-pressed/pin:rotate-0 group-aria-pressed/pin:fill-current motion-reduce:transition-none";
const srOnly = "sr-only";

const PIN_PATH =
  "M12 17v5M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2v.8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z";
/** Length and curve of the move between groups. */
const FLIP_DURATION = 350;
const FLIP_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const rows = (el: HTMLElement) =>
  Array.from(el.querySelectorAll<HTMLElement>("[data-value]"));

/** Position of every row before the change, keyed by value. */
const measure = (el: HTMLElement) =>
  new Map(
    rows(el).map((row) => [row.dataset.value, row.getBoundingClientRect()]),
  );

/** FLIP: start each row where it was and let it glide to its new place, then refocus the moved pin button. */
function flip(
  el: HTMLElement,
  before: Map<string | undefined, DOMRect>,
  moved: string,
) {
  const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const row of rows(el)) {
    if (row.dataset.value === moved) row.querySelector("button")?.focus();
    const old = before.get(row.dataset.value);
    const now = row.getBoundingClientRect();
    if (still || !old || !row.animate) continue;
    const [x, y] = [old.left - now.left, old.top - now.top];
    if (!x && !y) continue;
    const zIndex = row.dataset.value === moved ? 1 : 0;
    row.animate(
      [
        { transform: `translate(${x}px, ${y}px)`, zIndex },
        { transform: "none", zIndex },
      ],
      { duration: FLIP_DURATION, easing: FLIP_EASING },
    );
  }
}

export type PinnedListItem = {
  value: string;
  label: string;
  description?: string;
  /** Short text on the right, such as a time or count. */
  meta?: string;
  /** Path data (the d attribute) for a 24x24 stroked icon. */
  icon?: string;
};

/**
 * Pinning moves a row into the Pinned group with a FLIP animation. Supports [(pinned)].
 * The host stays out of layout; the user's class lands on the list.
 */
@Component({
  selector: "markas-pinned-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div #rootEl [class]="classes()">
      @for (part of groups(); track $index) {
        <div [hidden]="!part.items.length" [class]="group">
          <p [class]="heading">
            {{ part.label }}<span [class]="count">{{ part.items.length }}</span>
          </p>
          <ul [attr.aria-label]="part.label" [class]="list">
            @for (item of part.items; track item.value) {
              <li
                [attr.data-value]="item.value"
                [attr.data-pinned]="current().includes(item.value)"
                [class]="itemClass"
              >
                @if (item.icon) {
                  <span aria-hidden="true" [class]="iconTile">
                    <svg
                      [class]="iconClass"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path [attr.d]="item.icon" />
                    </svg>
                  </span>
                }
                <span [class]="body">
                  <span [class]="labelClass">{{ item.label }}</span>
                  @if (item.description) {
                    <span [class]="descriptionClass">{{
                      item.description
                    }}</span>
                  }
                </span>
                @if (item.meta) {
                  <span [class]="metaClass">{{ item.meta }}</span>
                }
                <button
                  type="button"
                  [attr.aria-pressed]="current().includes(item.value)"
                  [attr.aria-label]="label(pinLabel(), item)"
                  [attr.title]="
                    label(
                      current().includes(item.value)
                        ? unpinLabel()
                        : pinLabel(),
                      item
                    )
                  "
                  [class]="pinButton"
                  (click)="toggle(item)"
                >
                  <svg
                    [class]="pinIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path [attr.d]="PIN_PATH" />
                  </svg>
                </button>
              </li>
            }
          </ul>
        </div>
      }
      <p role="status" [class]="srOnly">{{ message() }}</p>
    </div>
  `,
})
export class PinnedList {
  readonly items = input.required<PinnedListItem[]>();
  readonly pinned = input<string[]>();
  readonly defaultPinned = input<string[]>([]);
  readonly pinLabel = input("Pin {label}");
  readonly unpinLabel = input("Unpin {label}");
  readonly pinnedLabel = input("Pinned");
  readonly allLabel = input("All");
  readonly pinnedMessage = input("{label} pinned");
  readonly unpinnedMessage = input("{label} unpinned");
  readonly userClass = input("", { alias: "class" });
  /** Emits the pinned values after every change. */
  readonly pinnedChange = output<string[]>();

  protected readonly group = group;
  protected readonly heading = heading;
  protected readonly count = count;
  protected readonly list = list;
  protected readonly itemClass = itemClass;
  protected readonly iconTile = iconTile;
  protected readonly iconClass = iconClass;
  protected readonly body = body;
  protected readonly labelClass = labelClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly metaClass = metaClass;
  protected readonly pinButton = pinButton;
  protected readonly pinIcon = pinIcon;
  protected readonly srOnly = srOnly;
  protected readonly PIN_PATH = PIN_PATH;

  protected readonly classes = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly current = linkedSignal(
    () => this.pinned() ?? this.defaultPinned(),
  );
  protected readonly message = signal("");
  protected readonly groups = computed(() => [
    {
      label: this.pinnedLabel(),
      items: this.items().filter((item) => this.current().includes(item.value)),
    },
    {
      label: this.allLabel(),
      items: this.items().filter(
        (item) => !this.current().includes(item.value),
      ),
    },
  ]);
  private readonly rootEl =
    viewChild.required<ElementRef<HTMLDivElement>>("rootEl");
  private readonly changes = inject(ChangeDetectorRef);

  protected label(template: string, item: PinnedListItem) {
    return template.replace("{label}", item.label);
  }

  protected toggle(item: PinnedListItem) {
    const current = this.current();
    const on = !current.includes(item.value);
    const next = on
      ? [...current, item.value]
      : current.filter((value) => value !== item.value);
    const el = this.rootEl().nativeElement;
    const before = measure(el);
    this.current.set(next);
    this.message.set(
      this.label(on ? this.pinnedMessage() : this.unpinnedMessage(), item),
    );
    this.pinnedChange.emit(next);
    // Render now so the rows can glide from their old place in the same frame.
    this.changes.detectChanges();
    flip(el, before, item.value);
  }
}
