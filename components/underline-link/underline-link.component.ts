import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base =
  "group relative inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const lines = {
  "grow-center": [
    "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100",
  ],
  slide: [
    "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100",
  ],
  "comes-in-goes-out": [
    "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 group-aria-[current=page]:origin-left group-aria-[current=page]:scale-x-100",
  ],
  "goes-out-comes-in": [
    "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-right delay-300 group-hover:scale-x-0 group-hover:delay-0 group-focus-visible:scale-x-0 group-focus-visible:delay-0 motion-reduce:delay-0",
    "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-left scale-x-0 group-hover:scale-x-100 group-hover:delay-300 group-focus-visible:scale-x-100 group-focus-visible:delay-300 motion-reduce:delay-0",
  ],
  scribble: [],
};
const scribble =
  "pointer-events-none absolute inset-x-0 -bottom-2 h-2.5 w-full overflow-visible";
const scribblePath =
  "[stroke-dasharray:1_2] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-aria-[current=page]:[stroke-dashoffset:0] motion-reduce:transition-none";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href with a scheme other than http, https, mailto, or tel (javascript:, for example) becomes "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

export type UnderlineLinkVariant = keyof typeof lines;

/**
 * Attribute selector on the native link, so aria-*, target, rel, and the user's class stay on it.
 * The href is checked: a scheme other than http, https, mailto, or tel becomes "#".
 */
@Component({
  selector: "a[markas-underline-link]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.href]": "safeHref()",
    "[attr.aria-current]": "active() ? 'page' : null",
    "[class]": "base",
  },
  template: `<ng-content />
    @for (line of lines(); track $index) {
      <span aria-hidden="true" [class]="line"></span>
    }
    @if (variant() === "scribble") {
      <svg
        aria-hidden="true"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        fill="none"
        [class]="scribble"
      >
        <path
          d="M1 6.5C14 3.5 26 8.5 40 5.5S66 2.5 78 5.5 93 7 99 4"
          pathLength="1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
          [class]="scribblePath"
        />
      </svg>
    }`,
})
export class UnderlineLink {
  readonly href = input.required<string>();
  readonly variant = input<UnderlineLinkVariant>("grow-center");
  /** Mark the link as the current page (aria-current="page"); the line stays visible. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly base = base;
  protected readonly scribble = scribble;
  protected readonly scribblePath = scribblePath;
  protected readonly safeHref = computed(() => safeHref(this.href()));
  protected readonly lines = computed(() => lines[this.variant()]);
}
