import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

const root =
  "@container w-full **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "top-0 border-b border-line bg-surface",
  floating: "top-3 rounded-2xl border border-line bg-surface shadow-overlay",
  blur: "top-0 border-b border-line/60 bg-surface/70 backdrop-blur-md",
};
const stickyClass = "sticky z-40";
const bar = "flex h-14 items-center gap-4 px-4";
const brandClass =
  "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
const desktopNav = "relative hidden items-center @2xl:flex";
const indicator =
  "absolute inset-y-0 left-0 rounded-md bg-subtle transition-[translate,width] duration-200 ease-out";
const list = "relative flex items-center";
const item =
  "flex h-9 cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink aria-expanded:text-ink aria-[current]:bg-subtle aria-[current]:text-ink @max-2xl:hover:bg-subtle [&::-webkit-details-marker]:hidden";
const chevron =
  "size-3.5 text-faint transition-transform duration-200 ease-out in-aria-expanded:rotate-180 in-open:rotate-180";
const panel =
  "inset-auto m-0 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0";
const panelList = "grid grid-flow-col grid-rows-3 gap-1";
const panelLink =
  "flex w-64 items-start gap-3 rounded-lg p-3 text-sm transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle";
const iconClass =
  "size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]";
const linkBody = "grid gap-0.5";
const linkTitle = "font-medium";
const linkDescription = "text-muted";
const actionsClass = "ml-auto flex items-center gap-2";
const toggle =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle @2xl:hidden";
const openIcon = "size-5 in-aria-expanded:hidden";
const closeIcon = "hidden size-5 in-aria-expanded:block";
const mobilePanel =
  "border-t border-line px-4 py-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0 @2xl:hidden";
const mobileList = "grid gap-1";
const groupList =
  "my-1 ml-3 grid gap-1 border-l border-line pl-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0";

/** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored like browsers do. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Delay before a panel opens when the pointer lingers, and before it closes when the pointer leaves. */
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;
/** Distance of the panel from its trigger and from the viewport edge. */
const GAP = 8;

/**
 * Slide the indicator to the hovered item, the open panel, or the active item, then place the
 * open panel under its trigger. The indicator is the nav's first child, the panel is the trigger's next sibling.
 */
function sync(nav: Element) {
  const find = (selector: string) => nav.querySelector<HTMLElement>(selector);
  const open = find("[aria-expanded=true]");
  const target =
    find(":scope>ul>li:hover>:first-child") ?? open ?? find("[aria-current]");
  const pill = nav.firstElementChild as HTMLElement;
  pill.hidden = !target;
  if (target) {
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.translate = `${target.offsetLeft}px 0`;
  }
  const popover = open?.nextElementSibling as HTMLElement | undefined;
  if (!popover) return;
  const box = open!.getBoundingClientRect();
  const maxLeft = innerWidth - popover.offsetWidth - GAP;
  popover.style.top = `${box.bottom + GAP}px`;
  popover.style.left = `${Math.max(GAP, Math.min(box.left, maxLeft))}px`;
}

export type NavbarChild = {
  label: string;
  href: string;
  description?: string;
  /** SVG path data (d attribute) for a 24x24 stroke icon. */
  icon?: string;
};

export type NavbarLink = {
  label: string;
  /** Plain link target. Ignored when the item has children. */
  href?: string;
  active?: boolean;
  /** Dropdown links. An item with children becomes a dropdown trigger. */
  children?: NavbarChild[];
};

export type NavbarVariant = keyof typeof variants;

let nextId = 0;

/**
 * Attribute selector on the native header: id, class, data-*, and aria-* stay on the header.
 * Slots: an element with the `brand` attribute fills the left side, an element with the
 * `actions` attribute (an ng-container works) fills the right side.
 */
@Component({
  selector: "header[markas-navbar]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.id]": "navbarId()",
    "[class]": "classes()",
    "(keydown)": "handleKeyDown($event)",
  },
  template: `
    <div [class]="bar">
      <div #brand [class]="brandClass" [hidden]="!hasBrand()">
        <ng-content select="[brand]" />
      </div>
      <nav [attr.aria-label]="navLabel()" [class]="desktopNav">
        <span aria-hidden="true" hidden [class]="indicator"></span>
        <ul [class]="list">
          @for (entry of links(); track $index) {
            @let panelId = navbarId() + "-panel-" + $index;
            <li
              (pointerenter)="handleHover($event)"
              (pointerleave)="handleHover($event)"
            >
              @if (entry.children?.length) {
                <button
                  type="button"
                  [attr.popovertarget]="panelId"
                  aria-expanded="false"
                  [attr.aria-controls]="panelId"
                  [class]="item"
                  (click)="handleClick($event)"
                  (keydown)="handleTriggerKeyDown($event)"
                >
                  {{ entry.label
                  }}<svg
                    [attr.class]="chevron"
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
                </button>
                <div
                  [id]="panelId"
                  popover="auto"
                  [class]="panel"
                  (beforetoggle)="handleToggle($event)"
                  (toggle)="handleToggle($event)"
                >
                  <ul [class]="panelList">
                    @for (child of entry.children; track $index) {
                      <li>
                        <a [href]="safeHref(child.href)" [class]="panelLink">
                          @if (child.icon) {
                            <svg
                              [attr.class]="iconClass"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              aria-hidden="true"
                            >
                              <path [attr.d]="child.icon" />
                            </svg>
                          }
                          <span [class]="linkBody">
                            <span [class]="linkTitle">{{ child.label }}</span>
                            @if (child.description) {
                              <span [class]="linkDescription">{{
                                child.description
                              }}</span>
                            }
                          </span>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              } @else {
                <a
                  [href]="safeHref(entry.href)"
                  [attr.aria-current]="entry.active ? 'page' : null"
                  [class]="item"
                  >{{ entry.label }}</a
                >
              }
            </li>
          }
        </ul>
      </nav>
      <div [class]="actionsClass">
        <ng-content select="[actions]" />
        <button
          #toggleButton
          type="button"
          [attr.aria-label]="menuLabel()"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="menuId()"
          [class]="toggle"
          (click)="open.set(!open())"
        >
          <svg
            [attr.class]="openIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            [attr.class]="closeIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div
      [id]="menuId()"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [hidden]="!open()"
      [class]="mobilePanel"
    >
      <nav [attr.aria-label]="mobileNavLabel()" [class]="mobileList">
        @for (entry of links(); track $index) {
          @if (entry.children?.length) {
            <details>
              <summary [class]="item">
                {{ entry.label
                }}<svg
                  [attr.class]="chevron"
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
              <div [class]="groupList">
                @for (child of entry.children; track $index) {
                  <a [href]="safeHref(child.href)" [class]="item">{{
                    child.label
                  }}</a>
                }
              </div>
            </details>
          } @else {
            <a
              [href]="safeHref(entry.href)"
              [attr.aria-current]="entry.active ? 'page' : null"
              [class]="item"
              >{{ entry.label }}</a
            >
          }
        }
      </nav>
    </div>
  `,
})
export class Navbar {
  readonly links = input<NavbarLink[]>([]);
  /** default: hairline bottom border, floating: rounded and floating, blur: translucent background. */
  readonly variant = input<NavbarVariant>("default");
  readonly sticky = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  /** Accessible label of the mobile menu button. */
  readonly menuLabel = input("Menu");
  /** Accessible label of the desktop nav element. */
  readonly navLabel = input("Main");
  /** Accessible label of the mobile nav element. */
  readonly mobileNavLabel = input("Main mobile");

  protected readonly bar = bar;
  protected readonly brandClass = brandClass;
  protected readonly desktopNav = desktopNav;
  protected readonly indicator = indicator;
  protected readonly list = list;
  protected readonly item = item;
  protected readonly chevron = chevron;
  protected readonly panel = panel;
  protected readonly panelList = panelList;
  protected readonly panelLink = panelLink;
  protected readonly iconClass = iconClass;
  protected readonly linkBody = linkBody;
  protected readonly linkTitle = linkTitle;
  protected readonly linkDescription = linkDescription;
  protected readonly actionsClass = actionsClass;
  protected readonly toggle = toggle;
  protected readonly openIcon = openIcon;
  protected readonly closeIcon = closeIcon;
  protected readonly mobilePanel = mobilePanel;
  protected readonly mobileList = mobileList;
  protected readonly groupList = groupList;
  protected readonly safeHref = safeHref;

  protected readonly open = signal(false);
  protected readonly hasBrand = signal(false);
  private readonly generatedId = `markas-navbar-${nextId++}`;
  protected readonly navbarId = computed(() => this.id() ?? this.generatedId);
  protected readonly menuId = computed(() => `${this.navbarId()}-menu`);
  protected readonly classes = computed(() =>
    [root, variants[this.variant()], this.sticky() && stickyClass]
      .filter(Boolean)
      .join(" "),
  );
  private readonly brand = viewChild.required<ElementRef<HTMLElement>>("brand");
  private readonly toggleButton =
    viewChild.required<ElementRef<HTMLButtonElement>>("toggleButton");
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() =>
      this.hasBrand.set(this.brand().nativeElement.hasChildNodes()),
    );
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape" || !this.open()) return;
    this.open.set(false);
    this.toggleButton().nativeElement.focus();
  }

  /** Mouse hover: entering a dropdown item opens it after a delay, leaving closes it after a delay. Items without a dropdown do not cancel the close delay. */
  protected handleHover(event: PointerEvent) {
    const entry = event.currentTarget as HTMLElement;
    const popover = entry.querySelector<HTMLElement>("[popover]");
    sync(entry.closest("nav")!);
    if (event.pointerType !== "mouse" || !popover) return;
    const enter = event.type === "pointerenter";
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => popover.togglePopover(enter),
      enter ? OPEN_DELAY : CLOSE_DELAY,
    );
  }

  /** A mouse click on a trigger that is already open (usually by hover) does not close it. */
  protected handleClick(event: MouseEvent) {
    const trigger = event.currentTarget as HTMLElement;
    if (event.detail && trigger.matches("[aria-expanded=true]"))
      event.preventDefault();
  }

  /** ArrowDown on a trigger opens the panel and focuses the first link. */
  protected handleTriggerKeyDown(event: KeyboardEvent) {
    const trigger = event.currentTarget as HTMLElement;
    const popover = trigger.nextElementSibling as HTMLElement;
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    popover.showPopover();
    popover.querySelector("a")?.focus();
  }

  /** beforetoggle runs synchronously so aria-expanded is always current; toggle places the panel once it shows. */
  protected handleToggle(event: Event) {
    const popover = event.currentTarget as HTMLElement;
    popover.previousElementSibling!.setAttribute(
      "aria-expanded",
      String((event as ToggleEvent).newState === "open"),
    );
    sync(popover.closest("nav")!);
  }
}
