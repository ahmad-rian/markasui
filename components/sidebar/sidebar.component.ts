import { NgTemplateOutlet } from "@angular/common";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  type ElementRef,
  input,
  linkedSignal,
  output,
  TemplateRef,
  viewChild,
} from "@angular/core";

export type SidebarItem = {
  label: string;
  /** Link target. Ignored when the item has children. */
  href?: string;
  /** SVG path data (d attribute) for a 24x24 stroke icon. */
  icon?: string;
  badge?: string | number;
  /** Marks the current page. */
  active?: boolean;
  disabled?: boolean;
  /** Sub-items. The parent item becomes an open/close button. */
  children?: SidebarItem[];
  /** Sub-items start open. Default: open when a sub-item is active. */
  open?: boolean;
};

export type SidebarSection = { title?: string; items: SidebarItem[] };

const root = "@container flex overflow-hidden bg-canvas";
const aside =
  "relative hidden w-56 shrink-0 flex-col bg-surface text-sm transition-[width] duration-200 ease-out data-[state=collapsed]:w-16 motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "border-r border-line",
  floating: "m-2 rounded-xl border border-line",
};
const showAside = { sm: "@sm:flex", md: "@2xl:flex", lg: "@4xl:flex" };
const hideBar = { sm: "@sm:hidden", md: "@2xl:hidden", lg: "@4xl:hidden" };
const headerClass = "flex h-14 shrink-0 items-center border-b border-line px-4";
/** Header and footer content is clipped at the content edge so the rail shows only the first 32px. */
const slotClass =
  "flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap";
const footerClass = "shrink-0 border-t border-line px-4 py-3";
const collapseButton =
  "absolute top-4 -right-3 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:text-ink";
const collapseIcon =
  "size-3.5 transition-transform duration-200 ease-out in-data-[state=collapsed]:rotate-180";
const navClass =
  "min-h-0 flex-1 overflow-y-auto p-3 in-data-[state=collapsed]:overflow-visible";
const listWrap = "relative grid gap-3 [anchor-scope:--active,--hover]";
const indicator =
  "absolute inset-[anchor(--hover_top,anchor(--active_top))_anchor(--hover_right,anchor(--active_right))_anchor(--hover_bottom,anchor(--active_bottom))_anchor(--hover_left,anchor(--active_left))] rounded-md bg-subtle transition-[inset] duration-200 ease-out";
const sectionClass =
  "grid gap-0.5 border-t border-line pt-3 first-of-type:border-t-0 first-of-type:pt-0";
const titleClass =
  "px-2.5 pb-1 text-xs font-medium text-faint in-data-[state=collapsed]:sr-only";
const listClass = "grid gap-0.5";
const item =
  "group/item relative flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] [&:has(+div_[aria-current=page])]:[anchor-name:--active]";
const iconClass = "size-5 shrink-0";
const labelClass = "min-w-0 flex-1 truncate in-data-[state=collapsed]:sr-only";
const badgeClass =
  "rounded-full bg-primary-soft px-1.5 py-0.5 text-xs leading-none font-medium text-primary in-data-[state=collapsed]:sr-only";
const dot =
  "absolute top-1.5 right-1.5 hidden size-2 rounded-full bg-primary in-data-[state=collapsed]:block";
const chevron =
  "size-4 shrink-0 text-faint transition-transform duration-200 ease-out group-aria-expanded/item:rotate-90 in-data-[state=collapsed]:hidden";
const tip =
  "absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-canvas shadow-overlay in-data-[state=collapsed]:group-hover/item:block in-data-[state=collapsed]:group-focus-visible/item:block";
const region =
  "invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=open]:visible data-[state=open]:grid-rows-[1fr] in-data-[state=collapsed]:hidden";
const regionInner = "min-h-0 overflow-hidden";
const subList = "ml-5 grid gap-0.5 border-l border-line py-1 pr-1 pl-2";
const subItem =
  "relative flex h-8 w-full items-center rounded-md px-2.5 text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] in-data-[state=closed]:[anchor-name:none]!";
const content = "flex min-w-0 flex-1 flex-col";
const mobileBar = "flex h-14 shrink-0 items-center border-b border-line px-3";
const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const dialogClass =
  "right-auto left-0 m-0 h-dvh max-h-dvh w-72 flex-col border-r border-line bg-surface p-0 text-sm text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 open:flex starting:open:-translate-x-full motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";

/** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for example) become "#". Whitespace and control characters are ignored as in browsers. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Static stroke icon markup, inlined into the template at compile time (ngc only evaluates plain constants). */
const chevronIcon = `<svg class="${chevron}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>`;
const collapseSvg = `<svg class="${collapseIcon}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>`;
const closeSvg = `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>`;
const menuSvg = `<svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>`;

/** Item content shared by links and group buttons (expects `entry` in scope). */
const body = `
  @if (entry.icon) {
    <svg class="${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="entry.icon" /></svg>
  }
  <span class="${labelClass}">{{ entry.label }}</span>
  @if (entry.badge != null && entry.badge !== "") {
    <span class="${badgeClass}">{{ entry.badge }}</span>
    <span aria-hidden="true" class="${dot}"></span>
  }
  @if (entry.children?.length) {
    ${chevronIcon}
  }
  <span aria-hidden="true" class="${tip}">{{ entry.label }}</span>
`;

let nextId = 0;

/**
 * Header and footer are templates (`<ng-template #header>`, `<ng-template #footer>`) because they
 * render twice: in the sidebar and in the mobile dialog. Everything else is the page content.
 * Host stays out of layout; id and class move to the root element.
 */
@Component({
  selector: "markas-sidebar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <!-- The same nav serves the desktop sidebar (prefix d) and the mobile dialog (prefix m). -->
    <ng-template #nav let-prefix let-rail="rail">
      <nav [attr.aria-label]="navLabel()" class="${navClass}">
        <div class="${listWrap}">
          <span aria-hidden="true" class="${indicator}"></span>
          @for (section of sections(); track $index; let s = $index) {
            <div class="${sectionClass}">
              @if (section.title) {
                <p aria-hidden="true" class="${titleClass}">
                  {{ section.title }}
                </p>
              }
              <ul
                [attr.aria-label]="section.title || null"
                class="${listClass}"
              >
                @for (entry of section.items; track $index; let i = $index) {
                  <li>
                    @if (entry.children?.length) {
                      <button
                        type="button"
                        [attr.aria-expanded]="!!groups()[s + '-' + i]"
                        [attr.aria-controls]="
                          rootId() + '-' + prefix + '-g' + s + '-' + i
                        "
                        class="${item}"
                        (click)="toggleGroup(s + '-' + i, rail)"
                      >
                        ${body}
                      </button>
                      <div
                        [id]="rootId() + '-' + prefix + '-g' + s + '-' + i"
                        [attr.data-state]="
                          groups()[s + '-' + i] ? 'open' : 'closed'
                        "
                        class="${region}"
                      >
                        <div class="${regionInner}">
                          <ul class="${subList}">
                            @for (child of entry.children; track $index) {
                              <li>
                                <a
                                  [attr.href]="
                                    child.disabled
                                      ? null
                                      : safeHref(child.href ?? '#')
                                  "
                                  [attr.aria-current]="
                                    !child.disabled && child.active
                                      ? 'page'
                                      : null
                                  "
                                  [attr.role]="child.disabled ? 'link' : null"
                                  [attr.aria-disabled]="
                                    child.disabled ? 'true' : null
                                  "
                                  class="${subItem}"
                                  >{{ child.label }}</a
                                >
                              </li>
                            }
                          </ul>
                        </div>
                      </div>
                    } @else {
                      <a
                        [attr.href]="
                          entry.disabled ? null : safeHref(entry.href ?? '#')
                        "
                        [attr.aria-current]="
                          !entry.disabled && entry.active ? 'page' : null
                        "
                        [attr.role]="entry.disabled ? 'link' : null"
                        [attr.aria-disabled]="entry.disabled ? 'true' : null"
                        class="${item}"
                      >
                        ${body}
                      </a>
                    }
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </nav>
    </ng-template>

    <div [id]="rootId()" [class]="rootClasses()">
      <aside
        [id]="rootId() + '-aside'"
        [attr.data-state]="isCollapsed() ? 'collapsed' : 'expanded'"
        [class]="asideClasses()"
      >
        @if (header(); as headerTpl) {
          <div class="${headerClass}">
            <div class="${slotClass}">
              <ng-container *ngTemplateOutlet="headerTpl" />
            </div>
          </div>
        }
        <ng-container
          *ngTemplateOutlet="
            nav;
            context: { $implicit: 'd', rail: isCollapsed() }
          "
        />
        @if (footer(); as footerTpl) {
          <div class="${footerClass}">
            <div class="${slotClass}">
              <ng-container *ngTemplateOutlet="footerTpl" />
            </div>
          </div>
        }
        <button
          type="button"
          [attr.aria-label]="isCollapsed() ? expandLabel() : collapseLabel()"
          [attr.aria-expanded]="!isCollapsed()"
          [attr.aria-controls]="rootId() + '-aside'"
          class="${collapseButton}"
          (click)="setCollapsed(!isCollapsed())"
        >
          ${collapseSvg}
        </button>
      </aside>
      <dialog
        #dialog
        [id]="rootId() + '-dialog'"
        [attr.aria-label]="navLabel()"
        class="${dialogClass}"
        (click)="onDialogClick($event)"
      >
        <div class="${headerClass}">
          <div class="${slotClass}">
            @if (header(); as headerTpl) {
              <ng-container *ngTemplateOutlet="headerTpl" />
            }
          </div>
          <form method="dialog">
            <button
              type="submit"
              [attr.aria-label]="closeLabel()"
              class="${iconButton}"
            >
              ${closeSvg}
            </button>
          </form>
        </div>
        <ng-container
          *ngTemplateOutlet="nav; context: { $implicit: 'm', rail: false }"
        />
        @if (footer(); as footerTpl) {
          <div class="${footerClass}">
            <div class="${slotClass}">
              <ng-container *ngTemplateOutlet="footerTpl" />
            </div>
          </div>
        }
      </dialog>
      <div class="${content}">
        <div [class]="mobileBarClasses()">
          <button
            type="button"
            [attr.aria-label]="openLabel()"
            aria-haspopup="dialog"
            [attr.aria-controls]="rootId() + '-dialog'"
            class="${iconButton}"
            (click)="dialogRef().nativeElement.showModal()"
          >
            ${menuSvg}
          </button>
        </div>
        <ng-content />
      </div>
    </div>
  `,
})
export class Sidebar {
  readonly sections = input<SidebarSection[]>([]);
  readonly variant = input<keyof typeof variants>("default");
  /** Minimum container width for the sidebar to sit next to the content: sm 24rem, md 42rem, lg 56rem. */
  readonly breakpoint = input<keyof typeof showAside>("md");
  /** Icon rail mode. Works with [(collapsed)]; a plain value sets the initial state. */
  readonly collapsed = input(false, { transform: booleanAttribute });
  readonly navLabel = input("Sidebar");
  readonly collapseLabel = input("Collapse sidebar");
  readonly expandLabel = input("Expand sidebar");
  readonly openLabel = input("Open sidebar");
  readonly closeLabel = input("Close sidebar");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  readonly collapsedChange = output<boolean>();

  protected readonly header = contentChild("header", { read: TemplateRef });
  protected readonly footer = contentChild("footer", { read: TemplateRef });
  protected readonly dialogRef =
    viewChild.required<ElementRef<HTMLDialogElement>>("dialog");

  protected readonly safeHref = safeHref;

  private readonly generatedId = `markas-sidebar-${nextId++}`;
  protected readonly rootId = computed(() => this.id() ?? this.generatedId);
  protected readonly isCollapsed = linkedSignal(() => this.collapsed());
  /** Sub-item groups start open when open is set or a sub-item is active. */
  protected readonly groups = linkedSignal<Record<string, boolean>>(() =>
    Object.fromEntries(
      this.sections().flatMap((section, s) =>
        section.items.map((entry, i) => [
          `${s}-${i}`,
          entry.open ?? !!entry.children?.some((child) => child.active),
        ]),
      ),
    ),
  );
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly asideClasses = computed(
    () =>
      `${aside} ${variants[this.variant()]} ${showAside[this.breakpoint()]}`,
  );
  protected readonly mobileBarClasses = computed(
    () => `${mobileBar} ${hideBar[this.breakpoint()]}`,
  );

  protected setCollapsed(next: boolean) {
    this.isCollapsed.set(next);
    this.collapsedChange.emit(next);
  }

  /** In the rail, a parent item expands the sidebar and opens its group. */
  protected toggleGroup(key: string, rail: boolean) {
    if (rail) this.setCollapsed(false);
    this.groups.update((current) => ({
      ...current,
      [key]: rail || !current[key],
    }));
  }

  protected onDialogClick(event: MouseEvent) {
    const target = event.target as Element;
    const dialog = event.currentTarget as HTMLDialogElement;
    if (target === dialog || target.closest("a[href]")) dialog.close();
  }
}
