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
  TemplateRef,
} from "@angular/core";

const root = "w-full";
const list = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const tab =
  "inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const panel =
  "mt-4 rounded-md text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export type TabItem = { value: string; label: string };

let nextId = 0;

/** Panel content for the tab with the same value: `<ng-template markasTabPanel="account">`. */
@Directive({ selector: "ng-template[markasTabPanel]" })
export class TabPanel {
  readonly value = input.required<string>({ alias: "markasTabPanel" });
  readonly template = inject(TemplateRef);
}

/**
 * Host stays out of layout (display: contents); id and class move to the root div.
 * The active tab supports two-way binding: `[(value)]`.
 */
@Component({
  selector: "markas-tabs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <div [id]="tabsId()" [class]="rootClasses()">
      <div
        role="tablist"
        aria-orientation="horizontal"
        [class]="list"
        (keydown)="handleKeydown($event)"
      >
        @for (item of items(); track item.value) {
          <button
            type="button"
            role="tab"
            [id]="tabsId() + '-tab-' + item.value"
            [attr.aria-controls]="tabsId() + '-panel-' + item.value"
            [attr.aria-selected]="item.value === active() ? 'true' : 'false'"
            [attr.tabindex]="item.value === active() ? 0 : -1"
            [attr.data-state]="item.value === active() ? 'active' : 'inactive'"
            [class]="tab"
            (click)="select(item.value)"
          >
            {{ item.label }}
          </button>
        }
      </div>
      @for (item of items(); track item.value) {
        <div
          role="tabpanel"
          [id]="tabsId() + '-panel-' + item.value"
          [attr.aria-labelledby]="tabsId() + '-tab-' + item.value"
          tabindex="0"
          [attr.data-state]="item.value === active() ? 'active' : 'inactive'"
          [hidden]="item.value !== active()"
          [class]="panel"
        >
          <ng-container [ngTemplateOutlet]="templateFor(item.value)" />
        </div>
      }
    </div>
  `,
})
export class Tabs {
  readonly items = input.required<TabItem[]>();
  readonly defaultValue = input<string>();
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** Active tab. Emits valueChange on every change, so `[(value)]` works. */
  readonly value = model<string>();

  protected readonly list = list;
  protected readonly tab = tab;
  protected readonly panel = panel;
  private readonly panels = contentChildren(TabPanel);
  private readonly generatedId = `markas-tabs-${nextId++}`;
  protected readonly tabsId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly active = computed(
    () => this.value() ?? this.defaultValue() ?? this.items()[0]?.value,
  );

  protected templateFor(value: string) {
    return (
      this.panels().find((item) => item.value() === value)?.template ?? null
    );
  }

  protected select(value: string) {
    this.value.set(value);
  }

  protected handleKeydown(event: KeyboardEvent) {
    const keys = this.items().map((item) => item.value);
    const index = keys.indexOf(this.active() ?? "");
    const targets: Record<string, string | undefined> = {
      ArrowRight: keys[(index + 1) % keys.length],
      ArrowLeft: keys[(index - 1 + keys.length) % keys.length],
      Home: keys[0],
      End: keys[keys.length - 1],
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    this.select(target);
    document.getElementById(`${this.tabsId()}-tab-${target}`)?.focus();
  }
}
