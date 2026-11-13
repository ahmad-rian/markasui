import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  inject,
  input,
  model,
  signal,
  TemplateRef,
} from "@angular/core";

const root = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const item =
  "inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:bg-surface data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

export type ToggleGroupItem = {
  value: string;
  label: string;
  ariaLabel?: string;
};

const toArray = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value : value ? [value] : [];

/**
 * Replaces the label of the item with the same value, for example with an icon:
 * `<ng-template markasToggleGroupItem="left"><svg ...></svg></ng-template>`.
 */
@Directive({ selector: "ng-template[markasToggleGroupItem]" })
export class ToggleGroupItemTemplate {
  readonly value = input.required<string>({ alias: "markasToggleGroupItem" });
  readonly template = inject(TemplateRef);
}

/** Host stays out of layout (display: contents). class moves to the group. */
@Component({
  selector: "markas-toggle-group",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.label]": "null", "[attr.type]": "null" },
  template: `
    <div
      role="group"
      [attr.aria-label]="label() ?? null"
      [class]="rootClass()"
      (keydown)="handleKeydown($event)"
    >
      @for (entry of items(); track entry.value) {
        <button
          type="button"
          [attr.data-value]="entry.value"
          [attr.aria-pressed]="selected().includes(entry.value)"
          [attr.data-state]="selected().includes(entry.value) ? 'on' : 'off'"
          [tabIndex]="entry.value === tabStop() ? 0 : -1"
          [attr.aria-label]="entry.ariaLabel ?? null"
          [class]="item"
          (click)="toggle(entry.value)"
        >
          @if (templateFor(entry.value); as custom) {
            <ng-container [ngTemplateOutlet]="custom" />
          } @else {
            {{ entry.label }}
          }
        </button>
      }
    </div>
  `,
})
export class ToggleGroup {
  readonly items = input.required<ToggleGroupItem[]>();
  readonly label = input<string>();
  readonly type = input<"single" | "multiple">("single");
  readonly userClass = input("", { alias: "class" });
  /** Pressed items, two-way bindable with [(value)]. A string for single, an array for multiple. */
  readonly value = model<string | string[]>();

  protected readonly item = item;
  private readonly templates = contentChildren(ToggleGroupItemTemplate);
  private readonly focused = signal<string | undefined>(undefined);
  protected readonly selected = computed(() => toArray(this.value()));
  protected readonly tabStop = computed(
    () => this.focused() ?? this.selected()[0] ?? this.items()[0]?.value,
  );
  protected readonly rootClass = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );

  protected templateFor(value: string) {
    return this.templates().find((entry) => entry.value() === value)?.template;
  }

  protected toggle(key: string) {
    this.focused.set(key);
    const selected = this.selected();
    const wanted = selected.includes(key)
      ? selected.filter((entry) => entry !== key)
      : this.type() === "multiple"
        ? [...selected, key]
        : [key];
    const next = this.items()
      .map((entry) => entry.value)
      .filter((entry) => wanted.includes(entry));
    this.value.set(this.type() === "multiple" ? next : (next[0] ?? ""));
  }

  protected handleKeydown(event: KeyboardEvent) {
    const step = STEPS[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const group = event.currentTarget as HTMLElement;
    const buttons = Array.from(
      group.querySelectorAll<HTMLButtonElement>(":scope > button"),
    );
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const target = buttons[(index + step + buttons.length) % buttons.length];
    if (!target) return;
    this.focused.set(target.dataset["value"]);
    target.focus();
  }
}
