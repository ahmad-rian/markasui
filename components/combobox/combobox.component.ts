import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  type ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from "@angular/core";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full rounded-md border border-line bg-surface ps-3 pe-9 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const chevron =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const panel =
  "inset-auto m-0 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const optionClass =
  "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-subtle aria-selected:bg-subtle";
const check = "size-4 shrink-0 text-primary";
const emptyClass = "px-3 py-2 text-sm text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const GAP = 4;

export type ComboboxOption = { value: string; label: string };

const labelOf = (options: ComboboxOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? "";

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, aria-label, placeholder, and class move to
 * the text input; name goes to the hidden input that holds the selected value.
 */
@Component({
  selector: "markas-combobox",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.aria-label]": "null",
    "[attr.placeholder]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <label
          [id]="inputId() + '-label'"
          [for]="inputId()"
          [class]="labelClass"
          >{{ label() }}</label
        >
      }
      <div [class]="control">
        <input
          #field
          [id]="inputId()"
          type="text"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="inputId() + '-listbox'"
          [attr.aria-activedescendant]="
            active() >= 0 ? optionId(active()) : null
          "
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-label]="ariaLabel() ?? null"
          [attr.placeholder]="placeholder() ?? null"
          [attr.data-state]="open() ? 'open' : 'closed'"
          [disabled]="disabled()"
          [required]="required()"
          [class]="fieldClass()"
          [value]="text()"
          (input)="handleInput(field.value)"
          (keydown)="handleKeydown($event)"
          (blur)="hide()"
          (click)="show()"
        />
        <svg
          [attr.class]="chevron"
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
      </div>
      @if (name()) {
        <input type="hidden" [attr.name]="name()" [value]="value()" />
      }
      <div
        #popup
        [id]="inputId() + '-popup'"
        popover="manual"
        [attr.data-state]="open() ? 'open' : 'closed'"
        [class]="panel"
        (beforetoggle)="handleBeforeToggle($event)"
        (toggle)="handleToggle($event)"
        (mousedown)="$event.preventDefault()"
      >
        <ul
          [id]="inputId() + '-listbox'"
          role="listbox"
          [attr.aria-labelledby]="label() ? inputId() + '-label' : null"
        >
          @for (index of visible(); track index) {
            @let option = options()[index]!;
            @let checked = option.value === value() && value() !== "";
            <li
              [id]="optionId(index)"
              role="option"
              [attr.aria-selected]="index === active()"
              [attr.data-state]="checked ? 'checked' : 'unchecked'"
              [class]="optionClass"
              (click)="select(index)"
            >
              {{ option.label }}
              @if (checked) {
                <svg
                  [attr.class]="check"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
              }
            </li>
          }
        </ul>
        @if (visible().length === 0) {
          <p [class]="emptyClass">{{ emptyLabel() }}</p>
        }
      </div>
      @if (error()) {
        <p [id]="inputId() + '-error'" [class]="errorClass">{{ error() }}</p>
      } @else if (hint()) {
        <p [id]="inputId() + '-hint'" [class]="hintClass">{{ hint() }}</p>
      }
    </div>
  `,
})
export class Combobox {
  readonly options = input.required<ComboboxOption[]>();
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly name = input<string>();
  readonly emptyLabel = input("No results");
  readonly id = input<string>();
  readonly placeholder = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Selected option value, "" when cleared. Two-way bindable with [(value)]. */
  readonly value = model("");

  protected readonly wrapper = wrapper;
  protected readonly labelClass = labelClass;
  protected readonly control = control;
  protected readonly chevron = chevron;
  protected readonly panel = panel;
  protected readonly optionClass = optionClass;
  protected readonly check = check;
  protected readonly emptyClass = emptyClass;
  protected readonly hintClass = hintClass;
  protected readonly errorClass = errorClass;

  protected readonly text = signal("");
  protected readonly active = signal(-1);
  protected readonly open = signal(false);
  private readonly filter = signal("");
  private lastValue: string | undefined;
  private unfollow: (() => void) | null = null;
  private readonly field =
    viewChild.required<ElementRef<HTMLInputElement>>("field");
  private readonly panelRef =
    viewChild.required<ElementRef<HTMLElement>>("popup");

  private readonly generatedId = `markas-combobox-${nextId++}`;
  protected readonly inputId = computed(() => this.id() ?? this.generatedId);
  protected readonly describedBy = computed(() =>
    this.error()
      ? `${this.inputId()}-error`
      : this.hint()
        ? `${this.inputId()}-hint`
        : null,
  );
  protected readonly fieldClass = computed(() =>
    [field, this.userClass()].filter(Boolean).join(" "),
  );
  /** Indexes (in the original list) of options whose label contains the filter text. */
  protected readonly visible = computed(() => {
    const query = this.filter().trim().toLowerCase();
    return this.options().flatMap((option, index) =>
      option.label.toLowerCase().includes(query) ? [index] : [],
    );
  });

  constructor() {
    // A value changed from outside (or the first value) syncs the input text.
    effect(() => {
      const value = this.value();
      if (value === this.lastValue) return;
      this.lastValue = value;
      this.text.set(labelOf(this.options(), value));
    });
    inject(DestroyRef).onDestroy(() => this.unfollow?.());
  }

  protected optionId(index: number) {
    return `${this.inputId()}-option-${index}`;
  }

  private setActive(index: number) {
    this.active.set(index);
    if (index < 0) return;
    document
      .getElementById(this.optionId(index))
      ?.scrollIntoView?.({ block: "nearest" });
  }

  private commit(next: string) {
    if (next === this.value()) return;
    this.lastValue = next;
    this.value.set(next);
  }

  protected show() {
    if (!this.open()) this.panelRef().nativeElement.showPopover();
  }

  protected hide() {
    this.active.set(-1);
    if (this.open()) this.panelRef().nativeElement.hidePopover();
  }

  protected select(index: number) {
    const option = this.options()[index];
    if (!option) return;
    this.commit(option.value);
    this.text.set(option.label);
    // The DOM value may differ from the signal after typing, so set it directly.
    this.field().nativeElement.value = option.label;
    this.filter.set("");
    this.hide();
  }

  private move(step: 1 | -1) {
    const list = this.visible();
    if (list.length === 0) return;
    const position = list.indexOf(this.active());
    const next =
      position === -1
        ? step === 1
          ? 0
          : list.length - 1
        : (position + step + list.length) % list.length;
    this.setActive(list[next] ?? -1);
  }

  protected handleInput(text: string) {
    this.text.set(text);
    this.filter.set(text);
    this.active.set(-1);
    this.commit("");
    this.show();
  }

  protected handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      if (this.open()) return this.move(step);
      this.show();
      const list = this.visible();
      return this.setActive(
        (step === 1 ? list[0] : list[list.length - 1]) ?? -1,
      );
    }
    if (event.key === "Enter" && this.open() && this.active() >= 0) {
      event.preventDefault();
      return this.select(this.active());
    }
    if (event.key !== "Escape") return;
    event.preventDefault();
    if (this.open()) return this.hide();
    this.text.set("");
    this.field().nativeElement.value = "";
    this.filter.set("");
    this.commit("");
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  protected handleBeforeToggle(event: Event) {
    this.open.set((event as ToggleEvent).newState === "open");
  }

  protected handleToggle(event: Event) {
    if ((event as ToggleEvent).newState !== "open") return this.unfollow?.();
    this.place();
    this.follow();
  }

  /** Place the list below the input at its width, flip above when it does not fit. */
  private place() {
    const panelEl = this.panelRef().nativeElement;
    const anchor = this.field().nativeElement.getBoundingClientRect();
    panelEl.style.width = `${anchor.width}px`;
    const { height } = panelEl.getBoundingClientRect();
    const below = anchor.bottom + GAP;
    const above = anchor.top - GAP - height;
    const fitsBelow = below + height <= window.innerHeight;
    panelEl.style.top = `${fitsBelow || above < 0 ? below : above}px`;
    panelEl.style.left = `${anchor.left}px`;
  }

  /** Re-place the list while the page scrolls or the window resizes. */
  private follow() {
    this.unfollow?.();
    const update = () => this.place();
    const scrollOptions = { capture: true, passive: true };
    window.addEventListener("scroll", update, scrollOptions);
    window.addEventListener("resize", update, { passive: true });
    this.unfollow = () => {
      window.removeEventListener("scroll", update, scrollOptions);
      window.removeEventListener("resize", update);
      this.unfollow = null;
    };
  }
}
