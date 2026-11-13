import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type TemplateRef,
} from "@angular/core";

const root = "w-full divide-y divide-line border-y border-line";
const item = "group";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pb-4 text-sm text-muted";

export type AccordionItem = {
  value: string;
  title: string;
  /** Plain text or an ng-template reference for rich content. */
  content?: string | TemplateRef<unknown>;
};

let nextId = 0;

/**
 * Host stays out of layout; the user's class moves to the root element.
 * Rich content: `<ng-template #pro>...</ng-template>` and `content: pro` in the item.
 */
@Component({
  selector: "markas-accordion",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents" },
  template: `
    <div [class]="rootClasses()">
      @for (entry of items(); track entry.value) {
        <details
          [class]="item"
          [attr.name]="name()"
          [open]="openValues().includes(entry.value)"
        >
          <summary [class]="summary">
            <span>{{ entry.title }}</span>
            <svg
              [class]="icon"
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
          </summary>
          <div [class]="content">
            @if (isTemplate(entry.content)) {
              <ng-container [ngTemplateOutlet]="entry.content" />
            } @else {
              {{ entry.content ?? "" }}
            }
          </div>
        </details>
      }
    </div>
  `,
})
export class Accordion {
  readonly items = input.required<AccordionItem[]>();
  readonly type = input<"single" | "multiple">("single");
  readonly defaultValue = input<string | string[]>();
  readonly userClass = input("", { alias: "class" });

  protected readonly item = item;
  protected readonly summary = summary;
  protected readonly icon = icon;
  protected readonly content = content;
  private readonly generatedName = `markas-accordion-${nextId++}`;
  protected readonly openValues = computed(() => {
    const defaults = ([] as string[]).concat(this.defaultValue() ?? []);
    return this.type() === "single" ? defaults.slice(0, 1) : defaults;
  });
  protected readonly name = computed(() =>
    this.type() === "single" ? this.generatedName : null,
  );
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );

  protected isTemplate(
    value: AccordionItem["content"],
  ): value is TemplateRef<unknown> {
    return typeof value === "object";
  }
}
