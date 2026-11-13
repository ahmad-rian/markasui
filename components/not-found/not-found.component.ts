import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";

const root =
  "@container grid w-full text-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:animate-none motion-reduce:**:transition-none";
const centered = "mx-auto max-w-lg justify-items-center text-center";
const layouts = {
  minimal: centered,
  split: "items-center gap-8 @xl:grid-cols-2",
  search: centered,
  glitch: centered,
  illustrated: centered,
  terminal: "mx-auto max-w-xl gap-6",
};
const big = "mb-2 text-8xl leading-none font-semibold tracking-tighter";
const eyebrow =
  "rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted";
const codes: Record<string, string> = {
  minimal: big,
  glitch: `${big} relative before:absolute before:inset-0 before:animate-[markas-glitch_2s_steps(1)_infinite] before:text-danger before:content-[attr(data-text)] after:absolute after:inset-0 after:animate-[markas-glitch_1.5s_steps(1)_infinite_reverse] after:text-success after:content-[attr(data-text)] motion-reduce:before:hidden motion-reduce:after:hidden`,
  illustrated: `${big} relative grid *:col-start-1 *:row-start-1`,
  split: eyebrow,
  search: eyebrow,
};
const content = "grid w-full gap-4 [justify-items:inherit]";
const shadow = "translate-2.5 text-primary/15";
const outline = "text-transparent [-webkit-text-stroke:2px_var(--color-ink)]";
const compass =
  "absolute -top-4 -right-10 size-12 rotate-12 rounded-full bg-canvas p-1 text-muted";
const art = "order-last mx-auto w-full max-w-xs";
const artSoft = "fill-primary-soft";
const artStroke = "fill-surface stroke-line";
const artInk = "fill-subtle stroke-ink";
const titleClass = "text-3xl font-semibold tracking-tight text-balance";
const descriptionClass = "max-w-prose text-pretty text-muted";
const terminal =
  "rounded-xl border border-line bg-surface p-4 text-left font-mono text-sm";
const prompt = "text-muted";
const terminalTitle = "text-danger";
const cursor = "inline-block h-4 w-2 animate-pulse bg-ink align-middle";
const searchWrap = "relative w-full text-sm";
const searchIcon = "absolute top-3 left-3 size-4 text-muted";
const searchInput =
  "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 placeholder:text-faint";
const list =
  "mt-3 divide-y divide-line rounded-xl border border-line bg-surface text-left";
const listLink =
  "flex justify-between rounded-xl px-4 py-3 font-medium hover:bg-subtle";
const arrow = "size-4 text-muted";
const empty = "text-muted not-empty:mt-3";
const actions = "flex flex-wrap gap-3";
const button =
  "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150 ease-out";
const primary = "bg-primary text-on-primary hover:bg-primary-strong";
const secondary = "border border-line bg-surface hover:bg-subtle";
const backIcon = "size-4";
const keyframes =
  "@keyframes markas-glitch{0%{clip-path:inset(20% 0 55% 0);translate:-3px 1px}33%{clip-path:inset(60% 0 10% 0);translate:3px -1px}66%{clip-path:inset(35% 0 40% 0);translate:-2px 2px}}";

/** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored, as browsers do. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

export type NotFoundLink = { label: string; href: string };
export type NotFoundVariant = keyof typeof layouts;

let nextId = 0;

/**
 * Host stays out of layout; id, title, and class move to the section. The glitch keyframes are
 * a global style, so encapsulation is off.
 */
@Component({
  selector: "markas-not-found",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <section
      [attr.id]="id() ?? null"
      [attr.aria-labelledby]="titleId()"
      [class]="rootClasses()"
    >
      @if (variant() === "split") {
        <svg viewBox="0 0 240 200" [class]="art" aria-hidden="true">
          <circle cx="150" cy="92" r="64" [class]="artSoft" />
          <rect
            x="34"
            y="48"
            width="92"
            height="92"
            rx="14"
            stroke-width="2"
            [class]="artStroke"
          />
          <path d="M60 176 108 96l48 80z" stroke-width="2" [class]="artInk" />
        </svg>
      }
      @if (variant() === "terminal") {
        <div [class]="terminal">
          <p><span [class]="prompt">$ </span>cd {{ path() }}</p>
          <h1 [id]="titleId()" [class]="terminalTitle">
            {{ code() }}: {{ title() }}
          </h1>
          <p aria-hidden="true">
            <span [class]="prompt">$ </span><span [class]="cursor"></span>
          </p>
        </div>
      }
      <div [class]="content">
        @if (codeClass()) {
          <p aria-hidden="true" [attr.data-text]="code()" [class]="codeClass()">
            @if (variant() === "illustrated") {
              <span [class]="shadow">{{ code() }}</span
              ><span [class]="outline">{{ code() }}</span
              ><svg
                [class]="compass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3z"
                />
              </svg>
            } @else {
              {{ code() }}
            }
          </p>
        }
        @if (variant() !== "terminal") {
          <h1 [id]="titleId()" [class]="titleClass">{{ title() }}</h1>
        }
        <p [class]="descriptionClass">{{ description() }}</p>
        @if (variant() === "search") {
          <div [class]="searchWrap">
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
              <path d="m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
            </svg>
            <input
              #field
              type="search"
              [attr.aria-label]="searchLabel()"
              [placeholder]="searchLabel()"
              [value]="query()"
              (input)="query.set(field.value)"
              [class]="searchInput"
            />
            @if (visible().length) {
              <ul [class]="list">
                @for (link of visible(); track link.href) {
                  <li>
                    <a [href]="safeHref(link.href)" [class]="listLink"
                      >{{ link.label
                      }}<svg
                        [class]="arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" /></svg
                    ></a>
                  </li>
                }
              </ul>
            }
            <p role="status" [class]="empty">{{ emptyMessage() }}</p>
          </div>
        }
        <div [class]="actions">
          <a [href]="home()" [class]="primaryClasses">{{ homeLabel() }}</a>
          <a [href]="home()" [class]="secondaryClasses" (click)="goBack($event)"
            ><svg
              [class]="backIcon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5m6 6-6-6 6-6" /></svg
            >{{ backLabel() }}</a
          >
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  /** minimal, split, search, glitch, illustrated, or terminal. */
  readonly variant = input<NotFoundVariant>("minimal");
  /** Status code, for example 404, 403, or 500. */
  readonly code = input("404");
  readonly title = input("Page not found");
  readonly description = input(
    "The page you are looking for does not exist or has been moved.",
  );
  readonly homeHref = input("/");
  /** Popular links that can be filtered in the search variant. */
  readonly links = input<NotFoundLink[]>([]);
  /** Path shown in the terminal variant. */
  readonly path = input("/page");
  readonly homeLabel = input("Back to home");
  readonly backLabel = input("Go back");
  readonly searchLabel = input("Search pages");
  readonly emptyLabel = input("No pages match your search");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly art = art;
  protected readonly artSoft = artSoft;
  protected readonly artStroke = artStroke;
  protected readonly artInk = artInk;
  protected readonly terminal = terminal;
  protected readonly prompt = prompt;
  protected readonly terminalTitle = terminalTitle;
  protected readonly cursor = cursor;
  protected readonly content = content;
  protected readonly shadow = shadow;
  protected readonly outline = outline;
  protected readonly compass = compass;
  protected readonly titleClass = titleClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly searchWrap = searchWrap;
  protected readonly searchIcon = searchIcon;
  protected readonly searchInput = searchInput;
  protected readonly list = list;
  protected readonly listLink = listLink;
  protected readonly arrow = arrow;
  protected readonly empty = empty;
  protected readonly actions = actions;
  protected readonly backIcon = backIcon;
  protected readonly primaryClasses = `${button} ${primary}`;
  protected readonly secondaryClasses = `${button} ${secondary}`;
  protected readonly safeHref = safeHref;

  protected readonly query = signal("");
  private readonly generatedId = `markas-not-found-${nextId++}`;
  protected readonly titleId = computed(
    () => `${this.id() ?? this.generatedId}-title`,
  );
  protected readonly rootClasses = computed(() =>
    [root, layouts[this.variant()], this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly codeClass = computed(() => codes[this.variant()] ?? "");
  protected readonly home = computed(() => safeHref(this.homeHref()));
  private readonly needle = computed(() => this.query().trim().toLowerCase());
  protected readonly visible = computed(() =>
    this.links().filter((link) =>
      link.label.toLowerCase().includes(this.needle()),
    ),
  );
  protected readonly emptyMessage = computed(() =>
    this.needle() && !this.visible().length ? this.emptyLabel() : "",
  );

  /** Go back to the previous page; without history the link simply goes to homeHref. */
  protected goBack(event: MouseEvent) {
    if (history.length < 2) return;
    event.preventDefault();
    history.back();
  }
}
