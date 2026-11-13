import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";

const dialogClass =
  "mx-auto mt-24 mb-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const search = "flex items-center gap-2 border-b border-line px-4";
const searchIcon = "size-4 shrink-0 text-muted";
const inputClass =
  "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted";
const list = "max-h-72 overflow-y-auto p-1";
const groupClass = "py-1";
const heading = "px-3 pt-1 pb-1.5 text-xs font-medium text-muted";
const option =
  "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out aria-selected:bg-subtle motion-reduce:transition-none";
const shortcutClass = "font-sans text-xs text-muted";
const empty = "px-4 py-6 text-center text-sm text-muted";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href with a scheme other than http, https, mailto, and tel (such as javascript:) becomes "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

export type CommandItem = {
  group: string;
  label: string;
  value?: string;
  href?: string;
  shortcut?: string;
};

type Entry = { item: CommandItem; index: number };

const matches = (item: CommandItem, query: string) =>
  item.label.toLowerCase().includes(query.trim().toLowerCase());

let nextId = 0;

/**
 * Slot: an element with the `trigger` attribute opens the palette.
 * Host stays out of layout; id and class move to the dialog.
 */
@Component({
  selector: "markas-command",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "(window:keydown)": "handleHotkey($event)",
  },
  template: `
    <div class="contents" (click)="show()">
      <ng-content select="[trigger]" />
    </div>
    <dialog
      #dialog
      [id]="dialogId()"
      [attr.aria-label]="dialogLabel()"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [class]="dialogClasses()"
      (close)="handleClose()"
      (click)="handleClick($event)"
    >
      <div [class]="search">
        <svg
          [class]="searchIcon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          role="combobox"
          [attr.aria-label]="searchLabel()"
          [attr.aria-expanded]="visible().length > 0"
          [attr.aria-controls]="dialogId() + '-list'"
          aria-autocomplete="list"
          [attr.aria-activedescendant]="activeId() ?? null"
          autocomplete="off"
          spellcheck="false"
          [placeholder]="placeholderLabel()"
          [value]="query()"
          [class]="inputClass"
          (input)="handleInput($event)"
          (keydown)="handleKeydown($event)"
        />
      </div>
      <div
        [id]="dialogId() + '-list'"
        role="listbox"
        [attr.aria-label]="dialogLabel()"
        [hidden]="visible().length === 0"
        [class]="list"
      >
        @for (group of groups(); track group.id) {
          @if (group.entries.length > 0) {
            <div
              role="group"
              [attr.aria-labelledby]="group.id + '-heading'"
              [class]="groupClass"
            >
              <div [id]="group.id + '-heading'" [class]="heading">
                {{ group.name }}
              </div>
              @for (entry of group.entries; track entry.index) {
                @if (entry.item.href) {
                  <a
                    [href]="safeHref(entry.item.href)"
                    [id]="optionId(entry.index)"
                    role="option"
                    [attr.aria-selected]="optionId(entry.index) === activeId()"
                    tabindex="-1"
                    [class]="option"
                    (mousemove)="active.set(visible().indexOf(entry))"
                    (click)="select(entry.item)"
                  >
                    <span>{{ entry.item.label }}</span>
                    @if (entry.item.shortcut) {
                      <kbd [class]="shortcutClass">{{
                        entry.item.shortcut
                      }}</kbd>
                    }
                  </a>
                } @else {
                  <div
                    [id]="optionId(entry.index)"
                    role="option"
                    [attr.aria-selected]="optionId(entry.index) === activeId()"
                    tabindex="-1"
                    [class]="option"
                    (mousemove)="active.set(visible().indexOf(entry))"
                    (click)="select(entry.item)"
                  >
                    <span>{{ entry.item.label }}</span>
                    @if (entry.item.shortcut) {
                      <kbd [class]="shortcutClass">{{
                        entry.item.shortcut
                      }}</kbd>
                    }
                  </div>
                }
              }
            </div>
          }
        }
      </div>
      @if (visible().length === 0) {
        <p [class]="empty">{{ emptyLabel() }}</p>
      }
    </dialog>
  `,
})
export class Command {
  readonly items = input.required<CommandItem[]>();
  /** Ctrl+K or Cmd+K opens and closes the palette. */
  readonly hotkey = input(false, { transform: booleanAttribute });
  readonly placeholderLabel = input("Type a command or search...");
  readonly emptyLabel = input("No results found.");
  /** Accessible label of the search field. */
  readonly searchLabel = input("Search commands");
  /** Accessible label of the dialog and the result list. */
  readonly dialogLabel = input("Command palette");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** Emits the value (or label) of the chosen command. */
  readonly selected = output<string>();

  protected readonly search = search;
  protected readonly searchIcon = searchIcon;
  protected readonly inputClass = inputClass;
  protected readonly list = list;
  protected readonly groupClass = groupClass;
  protected readonly heading = heading;
  protected readonly option = option;
  protected readonly shortcutClass = shortcutClass;
  protected readonly empty = empty;
  protected readonly safeHref = safeHref;
  protected readonly open = signal(false);
  protected readonly query = signal("");
  protected readonly active = signal(0);
  private readonly generatedId = `markas-command-${nextId++}`;
  protected readonly dialogId = computed(() => this.id() ?? this.generatedId);
  protected readonly dialogClasses = computed(() =>
    [dialogClass, this.userClass()].filter(Boolean).join(" "),
  );
  /** Groups in order of first appearance, each with its matching entries. */
  protected readonly groups = computed(() => {
    const items = this.items();
    return [...new Set(items.map((item) => item.group))].map(
      (name, groupIndex) => ({
        name,
        id: `${this.dialogId()}-group-${groupIndex}`,
        entries: items
          .map((item, index): Entry => ({ item, index }))
          .filter((entry) => entry.item.group === name)
          .filter((entry) => matches(entry.item, this.query())),
      }),
    );
  });
  protected readonly visible = computed(() =>
    this.groups().flatMap((group) => group.entries),
  );
  protected readonly activeId = computed(() => {
    const visible = this.visible();
    const entry = visible[Math.min(this.active(), visible.length - 1)];
    return entry ? this.optionId(entry.index) : undefined;
  });
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>("dialog");

  constructor() {
    afterRenderEffect(() => {
      const id = this.activeId();
      if (id)
        document.getElementById(id)?.scrollIntoView?.({ block: "nearest" });
    });
  }

  /** Opens the palette. Also callable from a template reference: command.show(). */
  show() {
    this.dialog().nativeElement.showModal();
    this.open.set(true);
  }

  protected optionId(index: number) {
    return `${this.dialogId()}-option-${index}`;
  }

  protected handleHotkey(event: KeyboardEvent) {
    if (!this.hotkey()) return;
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
      return;
    event.preventDefault();
    const dialog = this.dialog().nativeElement;
    if (dialog.open) return dialog.close();
    this.show();
  }

  protected select(item: CommandItem) {
    this.selected.emit(item.value ?? item.label);
    this.dialog().nativeElement.close();
  }

  protected handleClose() {
    this.open.set(false);
    this.query.set("");
    this.active.set(0);
  }

  protected handleClick(event: MouseEvent) {
    // A click on the dialog itself (not its content) is a click on the backdrop.
    if (event.target === event.currentTarget)
      this.dialog().nativeElement.close();
  }

  protected handleInput(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
    this.active.set(0);
  }

  protected handleKeydown(event: KeyboardEvent) {
    const count = this.visible().length;
    const steps: Record<string, number | undefined> = {
      ArrowDown: 1,
      ArrowUp: -1,
    };
    const step = steps[event.key];
    if (step !== undefined) {
      event.preventDefault();
      if (count > 0)
        this.active.update((current) => (current + step + count) % count);
      return;
    }
    const activeId = this.activeId();
    if (event.key !== "Enter" || !activeId) return;
    event.preventDefault();
    document.getElementById(activeId)?.click();
  }
}
