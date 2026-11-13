import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input as signalInput,
  signal,
  viewChild,
  booleanAttribute,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title?: string; links: FooterLink[] };
/** icon: SVG path data (the d attribute) for a 24x24 stroke icon. */
export type FooterSocial = { label: string; href: string; icon: string };

const root =
  "@container w-full border-t border-line bg-canvas text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const wrap = "grid gap-12 px-4 py-14 @2xl:px-8";
const main = "grid gap-10 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
const brandArea = "grid max-w-sm content-start gap-4";
const bottom =
  "flex flex-col gap-4 border-t border-line pt-6 @2xl:flex-row @2xl:items-center";
const row = "flex flex-wrap items-center justify-between gap-6";
const stack = "grid justify-items-center gap-4";
const contents = "contents";
/** Layout of each variant: [footer, main row, brand area, bottom row]. */
const layouts = {
  columns: [wrap, main, brandArea, bottom],
  newsletter: [wrap, main, brandArea, bottom],
  "big-brand": [
    "grid gap-12 overflow-hidden bg-linear-to-b to-primary-soft px-4 pt-14 @2xl:px-8",
    main,
    brandArea,
    bottom,
  ],
  centered: [
    "grid justify-items-center gap-8 bg-radial-[at_top] from-primary-soft to-70% px-4 py-14 text-center",
    "grid justify-items-center gap-6",
    "grid max-w-md justify-items-center gap-3",
    stack,
  ],
  cta: [wrap, row, contents, bottom],
  compact: [
    "flex flex-wrap items-center gap-x-5 gap-y-2 rounded-3xl border px-5 py-3 shadow-overlay @xl:rounded-full",
    contents,
    contents,
    contents,
  ],
};
const brandClass = "flex items-center gap-2 text-base font-semibold text-ink";
const descriptionClass = "leading-relaxed";
const actionsClass = "flex flex-wrap items-center gap-2";
const columnsNav =
  "grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))]";
const columnTitle = "font-medium text-ink";
const columnList = "mt-4 grid gap-2.5";
const flatList = "flex flex-wrap justify-center gap-x-6 gap-y-2";
const link =
  "rounded-sm transition-colors duration-150 ease-out hover:text-ink";
const copyrightClass = "@2xl:mr-auto";
const legalList = "flex flex-wrap gap-x-4 gap-y-2";
const socialList = "flex items-center gap-1";
const socialLink =
  "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-150 ease-out hover:border-primary-line hover:text-ink";
const icon = "size-4";
const topLink =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle";
const card =
  "grid gap-6 rounded-3xl border border-line bg-linear-to-br from-surface to-primary-soft p-6 @3xl:grid-cols-2 @3xl:items-center @3xl:p-10";
const cardTitle = "text-xl font-semibold tracking-tight text-balance text-ink";
const cardText = "mt-1.5 leading-relaxed";
const form = "grid gap-3";
const field =
  "flex items-center gap-1 rounded-full border border-line bg-canvas p-1 shadow-xs";
const input =
  "h-10 w-0 flex-1 rounded-full bg-transparent px-4 text-ink placeholder:text-faint";
const button =
  "h-10 shrink-0 cursor-pointer rounded-full bg-primary px-5 font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong";
const status =
  "flex items-center gap-2 px-4 font-medium text-ink before:size-1.5 before:rounded-full before:bg-success empty:sr-only";
const cta =
  "dark grid justify-items-start gap-6 rounded-3xl border border-line bg-surface bg-radial-[at_top_right] from-success/30 to-60% p-6 text-muted @2xl:p-12";
const ctaTitle =
  "max-w-xl text-2xl font-semibold tracking-tight text-balance text-ink @2xl:text-4xl";
const ctaText = "mt-3 max-w-lg text-base leading-relaxed";
const wordmarkBox =
  "-mx-4 h-[0.6em] overflow-hidden text-[calc(200cqw/var(--chars))] leading-none select-none @2xl:-mx-8";
const wordmarkText =
  "-mt-[0.08em] bg-linear-to-b from-ink via-ink/50 bg-clip-text text-center font-semibold tracking-tighter whitespace-nowrap text-transparent";

/** Hrefs with a scheme other than http, https, mailto, and tel (such as javascript:) become "#". Spaces and control characters are ignored, as browsers do. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

export type FooterVariant = keyof typeof layouts;

/** True when a slot wrapper received an element or text (comments from ng-container do not count). */
const hasContent = (el: HTMLElement) =>
  el.childElementCount > 0 || (el.textContent ?? "").trim() !== "";

/**
 * Attribute selector on the native footer: the user's class, id, and aria-* stay on it.
 * Slots: elements with the `brand`, `actions`, or `newsletter` attribute (an ng-container works).
 * Without a `newsletter` slot the built-in subscribe form is shown.
 */
@Component({
  selector: "footer[markas-footer]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "classes()" },
  template: `
    <ng-template #actionsSlot><ng-content select="[actions]" /></ng-template>
    @if (variant() === "newsletter") {
      <div [class]="card">
        <div>
          <h2 [class]="cardTitle">{{ newsletterLabel() }}</h2>
          @if (newsletterDescription()) {
            <p [class]="cardText">{{ newsletterDescription() }}</p>
          }
        </div>
        <ng-content select="[newsletter]">
          <form [class]="form" (submit)="subscribe($event)">
            <div [class]="field">
              <input
                type="email"
                name="email"
                required
                autocomplete="email"
                [attr.aria-label]="emailLabel()"
                [placeholder]="emailLabel()"
                [class]="input"
              />
              <button type="submit" [class]="button">
                {{ subscribeLabel() }}
              </button>
            </div>
            <p
              role="status"
              [class]="status"
              [textContent]="subscribed() ? successLabel() : ''"
            ></p>
          </form>
        </ng-content>
      </div>
    }
    @if (isCta()) {
      <div [class]="cta">
        <div>
          @if (heading()) {
            <h2 [class]="ctaTitle">{{ heading() }}</h2>
          }
          @if (description()) {
            <p [class]="ctaText">{{ description() }}</p>
          }
        </div>
        <div #actionsBox [class]="actionsClass" [hidden]="!hasActions()">
          <ng-container [ngTemplateOutlet]="actionsSlot" />
        </div>
      </div>
    }
    <div [class]="layout()[1]">
      <div [class]="layout()[2]">
        <div #brandBox [class]="brandClass" [hidden]="!hasBrand()">
          <ng-content select="[brand]" />
        </div>
        @if (description() && !isCta() && variant() !== "compact") {
          <p [class]="descriptionClass">{{ description() }}</p>
        }
        @if (!isCta()) {
          <div #actionsBox [class]="actionsClass" [hidden]="!hasActions()">
            <ng-container [ngTemplateOutlet]="actionsSlot" />
          </div>
        }
      </div>
      @if (links().length > 0) {
        <nav
          [attr.aria-label]="navLabel()"
          [attr.class]="hasColumns() ? columnsNav : null"
        >
          @if (hasColumns()) {
            @for (column of columns(); track $index) {
              <div>
                @if (column.title) {
                  <h2 [class]="columnTitle">{{ column.title }}</h2>
                }
                <ng-container
                  [ngTemplateOutlet]="linkList"
                  [ngTemplateOutletContext]="{
                    items: column.links,
                    listClass: columnList,
                  }"
                />
              </div>
            }
          } @else {
            <ng-container
              [ngTemplateOutlet]="linkList"
              [ngTemplateOutletContext]="{
                items: links(),
                listClass: flatList,
              }"
            />
          }
        </nav>
      }
    </div>
    <div [class]="layout()[3]">
      @if (variant() === "centered") {
        <ng-container [ngTemplateOutlet]="socialsList" />
      }
      @if (copyright()) {
        <p [class]="copyrightClass">{{ copyright() }}</p>
      }
      @if (legal().length > 0) {
        <nav [attr.aria-label]="legalLabel()">
          <ng-container
            [ngTemplateOutlet]="linkList"
            [ngTemplateOutletContext]="{ items: legal(), listClass: legalList }"
          />
        </nav>
      }
      @if (variant() !== "centered") {
        <ng-container [ngTemplateOutlet]="socialsList" />
      }
      @if (backToTop()) {
        <a href="#top" [class]="topLink"
          >{{ backToTopLabel()
          }}<svg
            [class]="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" /></svg
        ></a>
      }
    </div>
    @if (variant() === "big-brand" && wordmark()) {
      <div
        aria-hidden="true"
        [class]="wordmarkBox"
        [style.--chars]="wordmark().length"
      >
        <p [class]="wordmarkText">{{ wordmark() }}</p>
      </div>
    }

    <ng-template #linkList let-items="items" let-listClass="listClass">
      <ul [class]="listClass">
        @for (item of items; track $index) {
          <li>
            <a [href]="safeHref(item.href)" [class]="link">{{ item.label }}</a>
          </li>
        }
      </ul>
    </ng-template>

    <ng-template #socialsList>
      @if (socials().length > 0) {
        <ul [attr.aria-label]="socialLabel()" [class]="socialList">
          @for (social of socials(); track $index) {
            <li>
              <a
                [href]="safeHref(social.href)"
                [attr.aria-label]="social.label"
                [class]="socialLink"
              >
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
                  <path [attr.d]="social.icon" />
                </svg>
              </a>
            </li>
          }
        </ul>
      }
    </ng-template>
  `,
})
export class Footer {
  readonly variant = signalInput<FooterVariant>("columns");
  readonly description = signalInput<string>();
  readonly columns = signalInput<FooterColumn[]>([]);
  readonly socials = signalInput<FooterSocial[]>([]);
  readonly legal = signalInput<FooterLink[]>([]);
  readonly copyright = signalInput<string>();
  /** Heading of the call to action block (cta variant). */
  readonly heading = signalInput<string>();
  /** Text under the newsletter card heading (newsletter variant). */
  readonly newsletterDescription = signalInput<string>();
  /** Giant wordmark (big-brand variant). */
  readonly wordmark = signalInput("");
  readonly backToTop = signalInput(false, { transform: booleanAttribute });
  readonly navLabel = signalInput("Footer");
  readonly legalLabel = signalInput("Legal");
  readonly socialLabel = signalInput("Social media");
  readonly newsletterLabel = signalInput("Subscribe to our newsletter");
  readonly emailLabel = signalInput("Email address");
  readonly subscribeLabel = signalInput("Subscribe");
  readonly successLabel = signalInput("Thanks for subscribing");
  readonly backToTopLabel = signalInput("Back to top");

  protected readonly brandClass = brandClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly actionsClass = actionsClass;
  protected readonly columnsNav = columnsNav;
  protected readonly columnTitle = columnTitle;
  protected readonly columnList = columnList;
  protected readonly flatList = flatList;
  protected readonly link = link;
  protected readonly copyrightClass = copyrightClass;
  protected readonly legalList = legalList;
  protected readonly socialList = socialList;
  protected readonly socialLink = socialLink;
  protected readonly icon = icon;
  protected readonly topLink = topLink;
  protected readonly card = card;
  protected readonly cardTitle = cardTitle;
  protected readonly cardText = cardText;
  protected readonly form = form;
  protected readonly field = field;
  protected readonly input = input;
  protected readonly button = button;
  protected readonly status = status;
  protected readonly cta = cta;
  protected readonly ctaTitle = ctaTitle;
  protected readonly ctaText = ctaText;
  protected readonly wordmarkBox = wordmarkBox;
  protected readonly wordmarkText = wordmarkText;
  protected readonly safeHref = safeHref;

  protected readonly layout = computed(
    () => layouts[this.variant()] ?? layouts.columns,
  );
  protected readonly classes = computed(() => `${root} ${this.layout()[0]}`);
  protected readonly hasColumns = computed(() => this.layout()[1] === main);
  protected readonly isCta = computed(() => this.variant() === "cta");
  protected readonly links = computed(() =>
    this.columns().flatMap((column) => column.links),
  );
  protected readonly subscribed = signal(false);
  protected readonly hasBrand = signal(true);
  protected readonly hasActions = signal(true);
  private readonly brandBox =
    viewChild.required<ElementRef<HTMLElement>>("brandBox");
  private readonly actionsBox =
    viewChild<ElementRef<HTMLElement>>("actionsBox");

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => {
      this.hasBrand.set(hasContent(this.brandBox().nativeElement));
      const actions = this.actionsBox()?.nativeElement;
      this.hasActions.set(actions ? hasContent(actions) : false);
    });
  }

  protected subscribe(event: SubmitEvent) {
    event.preventDefault();
    (event.target as HTMLFormElement).reset();
    this.subscribed.set(true);
  }
}
