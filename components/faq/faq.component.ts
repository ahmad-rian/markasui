import { NgTemplateOutlet } from "@angular/common";
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  type ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  viewChild,
} from "@angular/core";

const root = "@container w-full [interpolate-size:allow-keywords]";
const header = "grid gap-2";
const lined = { list: "border-t border-line", item: "border-b border-line" };
const withTools = { root: "mx-auto grid max-w-3xl gap-6", header, ...lined };
const layouts = {
  simple: { root: "mx-auto grid max-w-3xl gap-8", header, ...lined },
  split: {
    root: "grid gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    header: "grid content-start gap-2",
    ...lined,
  },
  cards: {
    root: "grid gap-8",
    header,
    list: "grid items-start gap-3 @xl:grid-cols-2",
    item: "rounded-xl border border-line bg-surface px-5",
  },
  centered: {
    root: "mx-auto grid max-w-2xl gap-8 text-center",
    header: "grid justify-items-center gap-2",
    list: "grid gap-2 text-left",
    item: "rounded-lg bg-subtle px-4",
  },
  searchable: withTools,
  categories: withTools,
};
const titleClass =
  "text-2xl font-semibold tracking-tight text-balance text-ink";
const descriptionClass = "max-w-prose text-sm text-pretty text-muted";
const contactClass =
  "text-sm text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4";
const body = "grid content-start gap-4";
const details =
  "group details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none";
const answer = "pb-4 text-sm leading-relaxed text-pretty text-muted";
const search = "relative";
const searchIcon =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted";
const searchInput =
  "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const status = "contents";
const empty = "py-6 text-center text-sm text-muted";
const tablist = "flex flex-wrap gap-2";
const tab =
  "inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-on-primary motion-reduce:transition-none";

export type FaqItem = { question: string; answer: string; category?: string };
export type FaqVariant = keyof typeof layouts;

/** A question matches when its question or answer text contains the search term. */
const matches = (item: FaqItem, query: string) =>
  `${item.question} ${item.answer}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());

/** FAQPage structured data for search engines. `<` is escaped so it cannot close the script tag. */
const faqSchema = (items: FaqItem[]) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replace(/</g, "\\u003c");

/** Target tab index for the arrow keys, Home, and End (WAI-ARIA Tabs pattern). */
const targetTab = (key: string, index: number, count: number) =>
  (
    ({
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }) as Record<string, number>
  )[key];

let nextId = 0;

/**
 * Contact: the `contact` text input or an element with the `contact` attribute (an
 * ng-container works). Host stays out of layout; id, title, and class move to the section.
 */
@Component({
  selector: "markas-faq",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <ng-template #contactSlot><ng-content select="[contact]" /></ng-template>
    <ng-template #contactBlock>
      <div #contactBox [class]="contactClass" [hidden]="!hasContact()">
        {{ contact() }}<ng-container [ngTemplateOutlet]="contactSlot" />
      </div>
    </ng-template>
    <section
      #section
      [id]="baseId()"
      [attr.aria-labelledby]="title() ? baseId() + '-title' : null"
      [class]="rootClasses()"
    >
      <div [class]="layout().root">
        <div [class]="layout().header">
          @if (title()) {
            <h2 [id]="baseId() + '-title'" [class]="titleClass">
              {{ title() }}
            </h2>
          }
          @if (description()) {
            <p [class]="descriptionClass">{{ description() }}</p>
          }
          @if (variant() === "split") {
            <ng-container [ngTemplateOutlet]="contactBlock" />
          }
        </div>
        <div [class]="body">
          @if (searchable()) {
            <div [class]="search">
              <svg
                [class]="searchIcon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                #field
                type="search"
                autocomplete="off"
                [attr.aria-label]="searchLabel()"
                [placeholder]="searchLabel()"
                [value]="query()"
                (input)="query.set(field.value)"
                [class]="searchInput"
              />
            </div>
          }
          @if (categories().length) {
            <div
              role="tablist"
              [attr.aria-label]="categoriesLabel()"
              [class]="tablist"
              (keydown)="onTabKeydown($event)"
            >
              @for (
                category of categories();
                track category;
                let index = $index
              ) {
                <button
                  type="button"
                  role="tab"
                  [id]="baseId() + '-tab-' + index"
                  [attr.aria-controls]="baseId() + '-panel-' + index"
                  [attr.aria-selected]="index === active()"
                  [tabIndex]="index === active() ? 0 : -1"
                  [attr.data-state]="index === active() ? 'active' : 'inactive'"
                  (click)="active.set(index)"
                  [class]="tab"
                >
                  {{ category }}
                </button>
              }
            </div>
          }
          @for (group of groups(); track $index; let index = $index) {
            <div
              [attr.role]="hasPanels() ? 'tabpanel' : null"
              [attr.id]="hasPanels() ? baseId() + '-panel-' + index : null"
              [attr.aria-labelledby]="
                hasPanels() ? baseId() + '-tab-' + index : null
              "
              [hidden]="hasPanels() && index !== active()"
              [class]="layout().list"
            >
              @for (item of group; track item.question) {
                <details
                  [class]="details + ' ' + layout().item"
                  [attr.name]="exclusive() ? baseId() + '-item' : null"
                  [hidden]="searchable() && !matches(item, query())"
                >
                  <summary [class]="summary">
                    <span>{{ item.question }}</span>
                    <svg
                      [class]="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p [class]="answer">{{ item.answer }}</p>
                </details>
              }
            </div>
          }
          @if (searchable()) {
            <div role="status" [class]="status">
              @if (noMatches()) {
                <p [class]="empty">{{ emptyLabel() }}</p>
              }
            </div>
          }
        </div>
        @if (variant() !== "split") {
          <ng-container [ngTemplateOutlet]="contactBlock" />
        }
      </div>
    </section>
  `,
})
export class Faq {
  readonly items = input.required<FaqItem[]>();
  readonly title = input("");
  readonly description = input("");
  readonly variant = input<FaqVariant>("simple");
  readonly exclusive = input(false, { transform: booleanAttribute });
  readonly schema = input(false, { transform: booleanAttribute });
  /** Plain text contact line. For links, project an element with the contact attribute. */
  readonly contact = input("");
  readonly searchLabel = input("Search questions");
  readonly emptyLabel = input("No questions match your search");
  readonly categoriesLabel = input("Question categories");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly contactClass = contactClass;
  protected readonly titleClass = titleClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly body = body;
  protected readonly details = details;
  protected readonly summary = summary;
  protected readonly icon = icon;
  protected readonly answer = answer;
  protected readonly search = search;
  protected readonly searchIcon = searchIcon;
  protected readonly searchInput = searchInput;
  protected readonly status = status;
  protected readonly empty = empty;
  protected readonly tablist = tablist;
  protected readonly tab = tab;
  protected readonly matches = matches;

  protected readonly query = signal("");
  protected readonly active = signal(0);
  private readonly projectedContact = signal(false);
  private readonly generatedId = `markas-faq-${nextId++}`;
  protected readonly baseId = computed(() => this.id() ?? this.generatedId);
  protected readonly layout = computed(() => layouts[this.variant()]);
  protected readonly searchable = computed(
    () => this.variant() === "searchable",
  );
  protected readonly categories = computed(() =>
    this.variant() === "categories"
      ? [...new Set(this.items().map((item) => item.category ?? ""))]
      : [],
  );
  protected readonly hasPanels = computed(() => this.categories().length > 0);
  /** One panel per category (categories variant) or one list with every question. */
  protected readonly groups = computed(() =>
    this.hasPanels()
      ? this.categories().map((category) =>
          this.items().filter((item) => (item.category ?? "") === category),
        )
      : [this.items()],
  );
  protected readonly noMatches = computed(
    () =>
      this.searchable() &&
      !this.items().some((item) => matches(item, this.query())),
  );
  protected readonly hasContact = computed(
    () => this.projectedContact() || this.contact() !== "",
  );
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );

  private readonly section =
    viewChild.required<ElementRef<HTMLElement>>("section");
  private readonly contactBox =
    viewChild.required<ElementRef<HTMLElement>>("contactBox");
  private readonly renderer = inject(Renderer2);

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => {
      const box = this.contactBox().nativeElement;
      this.projectedContact.set(
        (box.textContent ?? "").trim() !== this.contact().trim(),
      );
    });
    // Angular strips script tags from templates, so the JSON-LD is added through the renderer.
    let script: HTMLScriptElement | null = null;
    effect(() => {
      const section = this.section().nativeElement;
      if (script) this.renderer.removeChild(section, script);
      script = null;
      if (!this.schema()) return;
      script = this.renderer.createElement("script") as HTMLScriptElement;
      this.renderer.setAttribute(script, "type", "application/ld+json");
      this.renderer.appendChild(
        script,
        this.renderer.createText(faqSchema(this.items())),
      );
      this.renderer.appendChild(section, script);
    });
  }

  protected onTabKeydown(event: KeyboardEvent) {
    const target = targetTab(
      event.key,
      this.active(),
      this.categories().length,
    );
    if (target === undefined) return;
    event.preventDefault();
    this.active.set(target);
    document.getElementById(`${this.baseId()}-tab-${target}`)?.focus();
  }
}
