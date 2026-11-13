import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

const root = "@container";
const list = "flex flex-wrap items-center gap-1";
const link =
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border border-transparent px-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-line data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const ellipsis =
  "inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted";
const icon = "size-4 shrink-0";
const label = "sr-only @lg:not-sr-only";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

export type PageItem = number | "ellipsis";

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

/** Logika sama persis dengan pageRange di Pagination.tsx dan $pageRange di pagination.blade.php. */
export function pageRange(
  page: number,
  total: number,
  siblings: number,
): PageItem[] {
  if (total < 1) return [];
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);
  const current = Math.min(Math.max(page, 1), total);
  const start = Math.min(
    Math.max(current - siblings, 3),
    total - 2 - siblings * 2,
  );
  const end = start + siblings * 2;

  return [
    1,
    start > 3 ? "ellipsis" : 2,
    ...range(start, end),
    end < total - 2 ? "ellipsis" : total - 1,
    total,
  ];
}

/**
 * Attribute selector on the native nav, so id, class, and other attributes stay on the nav.
 * Usage: `<nav markas-pagination page="5" total="10"></nav>`.
 */
@Component({
  selector: "nav[markas-pagination]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[attr.aria-label]": "navLabel()", "[class]": "root" },
  template: `
    <ng-template #prevIcon>
      <svg
        [attr.class]="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </ng-template>
    <ng-template #nextIcon>
      <svg
        [attr.class]="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </ng-template>
    <ul [class]="list">
      <li>
        @if (current() > 1) {
          <a [attr.href]="hrefFor(current() - 1)" rel="prev" [class]="link">
            <ng-container [ngTemplateOutlet]="prevIcon" />
            <span [class]="label">{{ previousLabel() }}</span>
          </a>
        } @else {
          <span aria-disabled="true" [class]="link">
            <ng-container [ngTemplateOutlet]="prevIcon" />
            <span [class]="label">{{ previousLabel() }}</span>
          </span>
        }
      </li>
      @for (item of pages(); track $index) {
        <li>
          @if (item === "ellipsis") {
            <span [class]="ellipsis" aria-hidden="true">…</span>
          } @else {
            <a
              [attr.href]="hrefFor(item)"
              [attr.aria-current]="item === current() ? 'page' : null"
              [attr.data-state]="item === current() ? 'active' : 'inactive'"
              [class]="link"
              >{{ item }}</a
            >
          }
        </li>
      }
      <li>
        @if (current() < total()) {
          <a [attr.href]="hrefFor(current() + 1)" rel="next" [class]="link">
            <span [class]="label">{{ nextLabel() }}</span>
            <ng-container [ngTemplateOutlet]="nextIcon" />
          </a>
        } @else {
          <span aria-disabled="true" [class]="link">
            <span [class]="label">{{ nextLabel() }}</span>
            <ng-container [ngTemplateOutlet]="nextIcon" />
          </span>
        }
      </li>
    </ul>
  `,
  imports: [NgTemplateOutlet],
})
export class Pagination {
  readonly page = input.required({ transform: numberAttribute });
  readonly total = input.required({ transform: numberAttribute });
  readonly href = input("?page={page}");
  readonly siblings = input(1, { transform: numberAttribute });
  /** Accessible label of the nav element. */
  readonly navLabel = input("Pagination");
  /** Text of the previous page link. */
  readonly previousLabel = input("Previous");
  /** Text of the next page link. */
  readonly nextLabel = input("Next");

  protected readonly root = root;
  protected readonly list = list;
  protected readonly link = link;
  protected readonly ellipsis = ellipsis;
  protected readonly icon = icon;
  protected readonly label = label;
  protected readonly current = computed(() =>
    Math.min(Math.max(this.page(), 1), Math.max(this.total(), 1)),
  );
  protected readonly pages = computed(() =>
    pageRange(this.current(), this.total(), this.siblings()),
  );

  protected hrefFor(target: number) {
    return safeHref(this.href().replaceAll("{page}", String(target)));
  }
}
