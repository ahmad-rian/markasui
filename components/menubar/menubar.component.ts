import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

const bar =
  "inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1";
const wrapper = "contents";
const triggerClass =
  "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
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

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

const GAP = 4;
const TRIGGER_SELECTOR = ':scope > [role="none"] > [role="menuitem"]';
const MENU_SELECTOR = ':scope > [role="none"] > [role="menu"]';
const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

/** Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. */
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

/** Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. Mengembalikan fungsi pelepas. */
function followViewport(update: () => void) {
  const scrollOptions = { capture: true, passive: true };
  window.addEventListener("scroll", update, scrollOptions);
  window.addEventListener("resize", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update, scrollOptions);
    window.removeEventListener("resize", update);
  };
}

export type MenubarItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

export type MenubarMenu = { label: string; items: MenubarItem[] };

type FocusTarget = "first" | "last";
type Option = Exclude<MenubarItem, { separator: true }>;

const wrap = (index: number, length: number) => (index + length) % length;

let nextId = 0;

/** Host stays out of layout; id, title, and class move to the bar. */
@Component({
  selector: "markas-menubar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <div
      #bar
      [id]="baseId()"
      role="menubar"
      [attr.aria-label]="label()"
      [class]="barClasses()"
    >
      @for (entry of menus(); track $index; let menuIndex = $index) {
        <div role="none" [class]="wrapper">
          <button
            [id]="baseId() + '-trigger-' + menuIndex"
            type="button"
            role="menuitem"
            [tabIndex]="activeIndex() === menuIndex ? 0 : -1"
            [attr.popovertarget]="baseId() + '-menu-' + menuIndex"
            aria-haspopup="menu"
            [attr.aria-expanded]="openIndex() === menuIndex"
            [attr.aria-controls]="baseId() + '-menu-' + menuIndex"
            [attr.data-state]="openIndex() === menuIndex ? 'open' : 'closed'"
            [class]="triggerClass"
            (focus)="activeIndex.set(menuIndex)"
            (keydown)="handleTriggerKeydown(menuIndex, $event)"
          >
            {{ entry.label }}
          </button>
          <div
            [id]="baseId() + '-menu-' + menuIndex"
            popover="auto"
            role="menu"
            [attr.aria-labelledby]="baseId() + '-trigger-' + menuIndex"
            [attr.data-state]="openIndex() === menuIndex ? 'open' : 'closed'"
            [class]="menu"
            (beforetoggle)="handleBeforeToggle(menuIndex, $event)"
            (toggle)="handleToggle(menuIndex, $event)"
            (keydown)="handleMenuKeydown(menuIndex, $event)"
          >
            @for (option of entry.items; track $index) {
              @if (option.separator) {
                <div role="separator" [class]="separator"></div>
              } @else if (option.href && !option.disabled) {
                <a
                  [href]="safeHref(option.href)"
                  role="menuitem"
                  tabindex="-1"
                  [class]="itemClass(option)"
                  (click)="select(menuIndex, option)"
                  >{{ option.label }}</a
                >
              } @else {
                <button
                  type="button"
                  role="menuitem"
                  tabindex="-1"
                  [disabled]="option.disabled"
                  [class]="itemClass(option)"
                  (click)="select(menuIndex, option)"
                >
                  {{ option.label }}
                </button>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class Menubar {
  readonly menus = input.required<MenubarMenu[]>();
  /** Nama aksesibel bar (aria-label). */
  readonly label = input("Menu");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** Emits the item value (or label) when an item is selected. */
  readonly selected = output<string>();

  protected readonly wrapper = wrapper;
  protected readonly triggerClass = triggerClass;
  protected readonly menu = menu;
  protected readonly separator = separator;
  protected readonly safeHref = safeHref;
  protected readonly openIndex = signal<number | null>(null);
  protected readonly activeIndex = signal(0);
  private readonly generatedId = `markas-menubar-${nextId++}`;
  protected readonly baseId = computed(() => this.id() ?? this.generatedId);
  protected readonly barClasses = computed(() =>
    [bar, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>("bar");
  private readonly changes = inject(ChangeDetectorRef);
  private focusTarget: FocusTarget = "first";
  private unfollow?: () => void;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unfollow?.());
  }

  protected itemClass(option: Option) {
    return `${item} ${tones[option.danger ? "danger" : "default"]}`;
  }

  private triggers() {
    return Array.from(
      this.bar().nativeElement.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR),
    );
  }

  private panels() {
    return Array.from(
      this.bar().nativeElement.querySelectorAll<HTMLElement>(MENU_SELECTOR),
    );
  }

  private menuItems(index: number) {
    return Array.from(
      this.panels()[index]?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    );
  }

  private focusItem(menuIndex: number, index: number) {
    const list = this.menuItems(menuIndex);
    if (list.length === 0) return;
    list[wrap(index, list.length)]?.focus();
  }

  private focusEdge(menuIndex: number, target: FocusTarget) {
    this.focusItem(menuIndex, target === "first" ? 0 : -1);
  }

  private focusTrigger(index: number) {
    const next = wrap(index, this.menus().length);
    this.activeIndex.set(next);
    // Render the roving tabindex now (like React's sync update), so a Tab pressed right after lands correctly.
    this.changes.detectChanges();
    this.triggers()[next]?.focus();
    return next;
  }

  private openMenu(index: number, target: FocusTarget) {
    this.focusTarget = target;
    this.panels()[index]?.showPopover();
  }

  private close(index: number) {
    this.panels()[index]?.hidePopover();
    this.triggers()[index]?.focus();
  }

  protected select(index: number, option: Option) {
    this.selected.emit(option.value ?? option.label);
    this.close(index);
  }

  /** beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya. */
  protected handleBeforeToggle(index: number, event: Event) {
    if ((event as ToggleEvent).newState === "open") {
      this.openIndex.set(index);
      this.activeIndex.set(index);
      return;
    }
    this.openIndex.update((current) => (current === index ? null : current));
  }

  protected handleToggle(index: number, event: Event) {
    this.unfollow?.();
    this.unfollow = undefined;
    const open = this.openIndex();
    if (open !== null)
      this.unfollow = followViewport(() => {
        const trigger = this.triggers()[open];
        const panel = this.panels()[open];
        if (trigger && panel) placeMenu(trigger, panel);
      });
    const trigger = this.triggers()[index];
    const panel = this.panels()[index];
    if ((event as ToggleEvent).newState !== "open" || !trigger || !panel)
      return;
    placeMenu(trigger, panel);
    this.focusEdge(index, this.focusTarget);
    this.focusTarget = "first";
  }

  protected handleTriggerKeydown(index: number, event: KeyboardEvent) {
    const moves: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: -1,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      this.focusTrigger(move);
      return;
    }
    const targets: Record<string, FocusTarget | undefined> = {
      ArrowDown: "first",
      ArrowUp: "last",
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    if (this.openIndex() === index) return this.focusEdge(index, target);
    this.openMenu(index, target);
  }

  protected handleMenuKeydown(index: number, event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      return this.close(index);
    }
    if (event.key === "Tab") return this.panels()[index]?.hidePopover();
    const sideways: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
    };
    const side = sideways[event.key];
    if (side !== undefined) {
      event.preventDefault();
      // Tutup menu sekarang, pindah ke menu di sebelahnya, lalu buka.
      this.panels()[index]?.hidePopover();
      return this.openMenu(this.focusTrigger(side), "first");
    }
    const current = this.menuItems(index).indexOf(
      document.activeElement as HTMLElement,
    );
    const targets: Record<string, number | undefined> = {
      ArrowDown: current + 1,
      ArrowUp: current - 1,
      Home: 0,
      End: -1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    this.focusItem(index, target);
  }
}
