import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  input,
  signal,
  viewChild,
} from "@angular/core";

const base = "grid gap-4 rounded-xl border border-line bg-surface p-6 text-ink";
const header = "grid gap-1.5";
const titleClass = "text-base font-semibold text-ink";
const descriptionClass = "text-sm text-muted";
const body = "text-sm text-ink";
const footerClass = "flex flex-wrap items-center gap-2";

const hasContent = (element: HTMLElement) =>
  element.childElementCount > 0 || (element.textContent ?? "").trim() !== "";

/**
 * Attribute selector on a native article: the user's class and attributes stay on the card.
 * An element with the `footer` attribute (an ng-container works) fills the footer, everything
 * else is the body. The host title attribute is cleared so it never becomes a tooltip.
 */
@Component({
  selector: "article[markas-card]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "base", "[attr.title]": "null" },
  template: `
    @if (title() || description()) {
      <header [class]="header">
        @if (title()) {
          <h3 [class]="titleClass">{{ title() }}</h3>
        }
        @if (description()) {
          <p [class]="descriptionClass">{{ description() }}</p>
        }
      </header>
    }
    <div #bodyEl [class]="body" [hidden]="!hasBody()"><ng-content /></div>
    <div #footerEl [class]="footerClass" [hidden]="!hasFooter()">
      <ng-content select="[footer]" />
    </div>
  `,
})
export class Card {
  readonly title = input<string>();
  readonly description = input<string>();

  protected readonly base = base;
  protected readonly header = header;
  protected readonly titleClass = titleClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly body = body;
  protected readonly footerClass = footerClass;
  protected readonly hasBody = signal(false);
  protected readonly hasFooter = signal(false);
  private readonly bodyRef =
    viewChild.required<ElementRef<HTMLElement>>("bodyEl");
  private readonly footerRef =
    viewChild.required<ElementRef<HTMLElement>>("footerEl");

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => {
      this.hasBody.set(hasContent(this.bodyRef().nativeElement));
      this.hasFooter.set(hasContent(this.footerRef().nativeElement));
    });
  }
}
