import { NgTemplateOutlet } from "@angular/common";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";

const root = "@container w-full";
const layouts = {
  row: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
    item: "flex",
  },
  grid: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line @lg:grid-cols-3 @3xl:grid-cols-4",
    item: "flex h-24 items-center justify-center bg-surface px-4",
  },
  marquee: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0",
    item: "flex",
  },
  cards: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-3",
    item: "flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-5",
  },
  stats: {
    root: "grid items-center gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    title: "text-2xl font-semibold tracking-tight text-balance text-ink",
    list: "grid grid-cols-2 items-center gap-x-8 gap-y-6 @lg:grid-cols-3",
    item: "flex",
  },
};
const viewport =
  "group overflow-hidden mask-x-from-80% motion-reduce:mask-none";
const track =
  "flex w-max animate-[markas-logo-cloud_30s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none";
const copy = "motion-reduce:hidden";
const keyframes = "@keyframes markas-logo-cloud{to{translate:-50% 0}}";
const header = "grid gap-6";
const statList = "grid grid-cols-2 gap-6";
const stat = "flex flex-col-reverse gap-1";
const statValue = "text-3xl font-semibold tracking-tight text-ink";
const statLabel = "text-sm text-muted";
const logoBase =
  "inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tones = {
  gray: "text-muted grayscale transition-[color,filter] duration-200 ease-out hover:text-ink hover:grayscale-0 motion-reduce:transition-none",
  color: "text-ink",
};
const mark = "h-7 w-auto shrink-0";
const quote = "text-sm text-pretty text-ink";
const author = "mt-auto text-xs text-muted";
const COPIES = [0, 1];

/** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored, as browsers do. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

export type LogoCloudLogo = {
  name: string;
  href?: string;
  /** SVG path (d attribute) filled with currentColor. */
  path?: string;
  viewBox?: string;
  /** Show the name as text next to the path. false: SVG only, the name becomes aria-label. */
  wordmark?: boolean;
  quote?: string;
  author?: string;
};
export type LogoCloudStat = { value: string; label: string };
export type LogoCloudVariant = keyof typeof layouts;

let nextId = 0;

/**
 * An ng-template child replaces the content of each logo (context: the logo, plus `index`).
 * Host stays out of layout; id, title, and class move to the section. The marquee keyframes
 * are a global style, so encapsulation is off.
 */
@Component({
  selector: "markas-logo-cloud",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet],
  styles: [keyframes],
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <ng-template #titleElement>
      @if (title()) {
        <h2 [id]="baseId() + '-title'" [class]="layout().title">
          {{ title() }}
        </h2>
      }
    </ng-template>
    <ng-template #list let-copyIndex>
      <ul
        role="list"
        [attr.aria-hidden]="copyIndex > 0 ? 'true' : null"
        [attr.inert]="copyIndex > 0 ? '' : null"
        [class]="copyIndex > 0 ? listCopyClasses() : layout().list"
      >
        @for (logo of logos(); track logo.name; let index = $index) {
          <li [class]="layout().item">
            @if (logo.href) {
              <a [href]="safeHref(logo.href)" [class]="logoClasses()"
                ><ng-container
                  [ngTemplateOutlet]="logoContent"
                  [ngTemplateOutletContext]="{ $implicit: logo, index }"
              /></a>
            } @else {
              <span [class]="logoClasses()"
                ><ng-container
                  [ngTemplateOutlet]="logoContent"
                  [ngTemplateOutletContext]="{ $implicit: logo, index }"
              /></span>
            }
            @if (variant() === "cards" && logo.quote) {
              <blockquote [class]="quote">{{ logo.quote }}</blockquote>
            }
            @if (variant() === "cards" && logo.author) {
              <p [class]="author">{{ logo.author }}</p>
            }
          </li>
        }
      </ul>
    </ng-template>
    <ng-template #logoContent let-logo let-index="index">
      @if (customLogo(); as custom) {
        <ng-container
          [ngTemplateOutlet]="custom"
          [ngTemplateOutletContext]="{ $implicit: logo, index }"
        />
      } @else {
        @if (logo.path) {
          <svg
            [class]="mark"
            [attr.viewBox]="logo.viewBox ?? '0 0 24 24'"
            fill="currentColor"
            [attr.role]="showsWordmark(logo) ? null : 'img'"
            [attr.aria-label]="showsWordmark(logo) ? null : logo.name"
            [attr.aria-hidden]="showsWordmark(logo) ? 'true' : null"
          >
            <path [attr.d]="logo.path" />
          </svg>
        }
        @if (showsWordmark(logo)) {
          <span>{{ logo.name }}</span>
        }
      }
    </ng-template>
    <section
      [id]="baseId()"
      [attr.aria-labelledby]="title() ? baseId() + '-title' : null"
      [attr.aria-label]="title() ? null : logosLabel()"
      [class]="rootClasses()"
    >
      <div [class]="layout().root">
        @if (variant() === "stats") {
          <div [class]="header">
            <ng-container [ngTemplateOutlet]="titleElement" />
            @if (stats().length) {
              <dl [class]="statList">
                @for (entry of stats(); track entry.label) {
                  <div [class]="stat">
                    <dt [class]="statLabel">{{ entry.label }}</dt>
                    <dd [class]="statValue">{{ entry.value }}</dd>
                  </div>
                }
              </dl>
            }
          </div>
        } @else {
          <ng-container [ngTemplateOutlet]="titleElement" />
        }
        @if (variant() === "marquee") {
          <div [class]="viewport">
            <div [class]="track">
              @for (copyIndex of copies; track copyIndex) {
                <ng-container
                  [ngTemplateOutlet]="list"
                  [ngTemplateOutletContext]="{ $implicit: copyIndex }"
                />
              }
            </div>
          </div>
        } @else {
          <ng-container
            [ngTemplateOutlet]="list"
            [ngTemplateOutletContext]="{ $implicit: 0 }"
          />
        }
      </div>
    </section>
  `,
})
export class LogoCloud {
  readonly logos = input.required<LogoCloudLogo[]>();
  readonly title = input("");
  readonly variant = input<LogoCloudVariant>("row");
  readonly grayscale = input(true, { transform: booleanAttribute });
  readonly stats = input<LogoCloudStat[]>([]);
  readonly logosLabel = input("Customer logos");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly customLogo = contentChild(TemplateRef);
  protected readonly viewport = viewport;
  protected readonly track = track;
  protected readonly header = header;
  protected readonly statList = statList;
  protected readonly stat = stat;
  protected readonly statValue = statValue;
  protected readonly statLabel = statLabel;
  protected readonly mark = mark;
  protected readonly quote = quote;
  protected readonly author = author;
  protected readonly copies = COPIES;
  protected readonly safeHref = safeHref;

  private readonly generatedId = `markas-logo-cloud-${nextId++}`;
  protected readonly baseId = computed(() => this.id() ?? this.generatedId);
  protected readonly layout = computed(() => layouts[this.variant()]);
  protected readonly listCopyClasses = computed(
    () => `${this.layout().list} ${copy}`,
  );
  protected readonly logoClasses = computed(
    () => `${logoBase} ${this.grayscale() ? tones.gray : tones.color}`,
  );
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );

  protected showsWordmark(logo: LogoCloudLogo) {
    return logo.wordmark !== false || !logo.path;
  }
}
