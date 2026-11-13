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

export type ContextMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

const area =
  "block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const hint = "sr-only";
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

type Offset = { x: number; y: number };

/** Places the menu at the point (relative to the area), shifting or flipping up when it does not fit. */
function placeMenu(target: HTMLElement, panel: HTMLElement, offset: Offset) {
  const anchor = target.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const x = anchor.left + offset.x;
  const y = anchor.top + offset.y;
  const fitsBelow = y + height <= window.innerHeight - GAP;
  const top = fitsBelow ? y : Math.max(GAP, y - height);
  const left = Math.max(GAP, Math.min(x, window.innerWidth - width - GAP));
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}

/** Shift+F10 and the ContextMenu key open the menu from the keyboard. */
const isMenuKey = (event: KeyboardEvent) =>
  event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");

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
 * The content is the area that opens the menu on right-click, Shift+F10, or the ContextMenu key.
 * Host stays out of layout; id moves to the menu, class and aria-label to the area.
 */
@Component({
  selector: "markas-context-menu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div
      #area
      role="group"
      tabindex="0"
      [attr.aria-label]="ariaLabel() ?? null"
      [attr.aria-describedby]="menuId() + '-hint'"
      [attr.data-state]="state()"
      [class]="areaClasses()"
      (contextmenu)="handleContextMenu($event)"
      (keydown)="handleAreaKeydown($event)"
    >
      <ng-content />
    </div>
    <span [id]="menuId() + '-hint'" [class]="hint">{{ hintLabel() }}</span>
    <div
      #menuEl
      [id]="menuId()"
      popover="auto"
      role="menu"
      [attr.aria-label]="menuLabel()"
      [attr.data-state]="state()"
      [class]="menu"
      (beforetoggle)="handleBeforeToggle($event)"
      (toggle)="handleToggle($event)"
      (keydown)="handleMenuKeydown($event)"
      (contextmenu)="$event.preventDefault()"
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
  `,
})
export class ContextMenu {
  readonly items = input.required<ContextMenuItem[]>();
  /** Accessible label of the menu panel. */
  readonly menuLabel = input("Context menu");
  /** Hidden screen reader hint on how to open the menu. */
  readonly hintLabel = input("Press Shift+F10 to open the context menu");
  readonly id = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Emits the value (or label) of the chosen item. */
  readonly selected = output<string>();

  protected readonly hint = hint;
  protected readonly menu = menu;
  protected readonly separator = separator;
  protected readonly open = signal(false);
  protected readonly state = computed(() => (this.open() ? "open" : "closed"));
  private readonly generatedId = `markas-context-menu-${nextId++}`;
  protected readonly menuId = computed(() => this.id() ?? this.generatedId);
  protected readonly areaClasses = computed(() =>
    [area, this.userClass()].filter(Boolean).join(" "),
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
  private readonly areaEl =
    viewChild.required<ElementRef<HTMLDivElement>>("area");
  private readonly menuEl =
    viewChild.required<ElementRef<HTMLDivElement>>("menuEl");
  private offset: Offset = { x: 0, y: 0 };
  private unfollow: (() => void) | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unfollow?.());
  }

  private readonly place = () =>
    placeMenu(
      this.areaEl().nativeElement,
      this.menuEl().nativeElement,
      this.offset,
    );

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

  private openAt(next: Offset) {
    this.offset = next;
    // Place synchronously after showPopover; the toggle event arrives later.
    if (!this.open()) this.menuEl().nativeElement.showPopover();
    this.place();
    this.focusItem(0);
  }

  private close() {
    this.menuEl().nativeElement.hidePopover();
    this.areaEl().nativeElement.focus();
  }

  protected select(value: string) {
    this.selected.emit(value);
    this.close();
  }

  protected handleContextMenu(event: MouseEvent) {
    event.preventDefault();
    const anchor = this.areaEl().nativeElement.getBoundingClientRect();
    this.openAt({
      x: event.clientX - anchor.left,
      y: event.clientY - anchor.top,
    });
  }

  protected handleAreaKeydown(event: KeyboardEvent) {
    if (!isMenuKey(event)) return;
    event.preventDefault();
    this.openAt({ x: 0, y: 0 });
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  protected handleBeforeToggle(event: Event) {
    this.open.set((event as ToggleEvent).newState === "open");
  }

  protected handleToggle(event: Event) {
    if ((event as ToggleEvent).newState !== "open") return this.unfollow?.();
    this.place();
    this.follow();
    this.focusItem(0);
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
