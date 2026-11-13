import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";

export type DropdownMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

const root = "inline-block";
const triggerClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
const chevron = "size-4 text-muted";
const menu =
  "inset-auto m-0 min-w-48 rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const item =
  "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const tones = {
  default: "text-ink hover:bg-subtle focus:bg-subtle",
  danger: "text-danger hover:bg-danger/10 focus:bg-danger/10",
};
const separator = "my-1 h-px bg-line";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Hrefs with a scheme other than http, https, mailto, and tel (such as javascript:) become "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

const GAP = 4;
const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

/** Places the menu below the trigger, aligned to its start, and flips above when it does not fit. */
function placeMenu(trigger: HTMLElement, panel: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const below = anchor.bottom + GAP;
  const above = anchor.top - GAP - height;
  const fitsBelow = below + height <= window.innerHeight;
  const top = fitsBelow || above < 0 ? below : above;
  const left = Math.max(
    GAP,
    Math.min(anchor.left, window.innerWidth - width - GAP),
  );
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}

type FocusTarget = "first" | "last";
type Entry = {
  separator: boolean;
  label: string;
  value: string;
  href: string | null;
  disabled: boolean;
  classes: string;
};

let nextId = 0;

/**
 * Slots: an element with the `trigger` attribute (an ng-container works) replaces the label
 * inside the trigger button. Host stays out of layout; id moves to the menu, class to the root.
 */
@Component({
  selector: "markas-dropdown-menu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <div [class]="rootClasses()">
      <button
        #trigger
        type="button"
        [id]="menuId() + '-trigger'"
        [attr.popovertarget]="menuId()"
        aria-haspopup="menu"
        [attr.aria-expanded]="open() ? 'true' : 'false'"
        [attr.aria-controls]="menuId()"
        [attr.data-state]="state()"
        [class]="triggerClass"
        (keydown)="handleTriggerKeydown($event)"
      >
        <ng-content select="[trigger]">{{ label() }}</ng-content>
        <svg
          [class]="chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        #menuEl
        [id]="menuId()"
        popover="auto"
        role="menu"
        [attr.aria-labelledby]="menuId() + '-trigger'"
        [attr.data-state]="state()"
        [class]="menu"
        (beforetoggle)="handleBeforeToggle($event)"
        (toggle)="handleToggle($event)"
        (keydown)="handleMenuKeydown($event)"
      >
        @for (entry of entries(); track $index) {
          @if (entry.separator) {
            <div role="separator" [class]="separator"></div>
          } @else if (entry.href !== null) {
            <a
              [href]="entry.href"
              role="menuitem"
              tabindex="-1"
              [class]="entry.classes"
              (click)="select(entry.value)"
              >{{ entry.label }}</a
            >
          } @else {
            <button
              type="button"
              role="menuitem"
              tabindex="-1"
              [disabled]="entry.disabled"
              [class]="entry.classes"
              (click)="select(entry.value)"
            >
              {{ entry.label }}
            </button>
          }
        }
      </div>
    </div>
  `,
})
export class DropdownMenu {
  readonly items = input.required<DropdownMenuItem[]>();
  readonly label = input("Options");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** Emits the value (or label) of the chosen item. */
  readonly selected = output<string>();

  protected readonly triggerClass = triggerClass;
  protected readonly chevron = chevron;
  protected readonly menu = menu;
  protected readonly separator = separator;
  protected readonly open = signal(false);
  protected readonly state = computed(() => (this.open() ? "open" : "closed"));
  private readonly generatedId = `markas-dropdown-menu-${nextId++}`;
  protected readonly menuId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly entries = computed(() =>
    this.items().map((entry): Entry =>
      entry.separator
        ? {
            separator: true,
            label: "",
            value: "",
            href: null,
            disabled: false,
            classes: "",
          }
        : {
            separator: false,
            label: entry.label,
            value: entry.value ?? entry.label,
            href: entry.href && !entry.disabled ? safeHref(entry.href) : null,
            disabled: entry.disabled ?? false,
            classes: `${item} ${tones[entry.danger ? "danger" : "default"]}`,
          },
    ),
  );
  private readonly triggerEl =
    viewChild.required<ElementRef<HTMLButtonElement>>("trigger");
  private readonly menuEl =
    viewChild.required<ElementRef<HTMLDivElement>>("menuEl");
  private focusTarget: FocusTarget = "first";
  private unfollow: (() => void) | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unfollow?.());
  }

  private readonly place = () =>
    placeMenu(this.triggerEl().nativeElement, this.menuEl().nativeElement);

  /** Re-runs placement while the page scrolls or the window resizes. */
  private follow() {
    this.unfollow?.();
    const scrollOptions = { capture: true, passive: true };
    window.addEventListener("scroll", this.place, scrollOptions);
    window.addEventListener("resize", this.place, { passive: true });
    this.unfollow = () => {
      window.removeEventListener("scroll", this.place, scrollOptions);
      window.removeEventListener("resize", this.place);
      this.unfollow = undefined;
    };
  }

  private menuItems() {
    return Array.from(
      this.menuEl().nativeElement.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
    );
  }

  private focusItem(index: number) {
    const list = this.menuItems();
    if (list.length === 0) return;
    list[(index + list.length) % list.length]?.focus();
  }

  private focusEdge(target: FocusTarget) {
    this.focusItem(target === "first" ? 0 : -1);
  }

  private close() {
    this.menuEl().nativeElement.hidePopover();
    this.triggerEl().nativeElement.focus();
  }

  protected select(value: string) {
    this.selected.emit(value);
    this.close();
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  protected handleBeforeToggle(event: Event) {
    this.open.set((event as ToggleEvent).newState === "open");
  }

  protected handleToggle(event: Event) {
    if ((event as ToggleEvent).newState !== "open") return this.unfollow?.();
    this.place();
    this.follow();
    this.focusEdge(this.focusTarget);
    this.focusTarget = "first";
  }

  protected handleTriggerKeydown(event: KeyboardEvent) {
    const targets: Record<string, FocusTarget | undefined> = {
      ArrowDown: "first",
      ArrowUp: "last",
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    if (this.open()) return this.focusEdge(target);
    this.focusTarget = target;
    this.menuEl().nativeElement.showPopover();
  }

  protected handleMenuKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      return this.close();
    }
    if (event.key === "Tab") return this.menuEl().nativeElement.hidePopover();
    const index = this.menuItems().indexOf(
      document.activeElement as HTMLElement,
    );
    const targets: Record<string, number | undefined> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: -1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    this.focusItem(target);
  }
}
