<script setup lang="ts">
import { onBeforeUnmount, ref, useId } from "vue";

export type NavbarChild = {
  label: string;
  href: string;
  description?: string;
  /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
  icon?: string;
};

export type NavbarLink = {
  label: string;
  /** Tujuan link biasa. Diabaikan bila item punya children. */
  href?: string;
  active?: boolean;
  /** Link di dropdown. Item dengan children menjadi pemicu dropdown. */
  children?: NavbarChild[];
};

const props = withDefaults(
  defineProps<{
    links?: NavbarLink[];
    /** default: garis bawah tipis, floating: mengambang membulat, blur: latar semi transparan. */
    variant?: "default" | "floating" | "blur";
    sticky?: boolean;
    id?: string;
    menuLabel?: string;
    navLabel?: string;
    mobileNavLabel?: string;
  }>(),
  {
    links: () => [],
    variant: "default",
    sticky: false,
    id: undefined,
    menuLabel: "Menu",
    navLabel: "Main",
    mobileNavLabel: "Main mobile",
  },
);

const root =
  "@container w-full **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "top-0 border-b border-line bg-surface",
  floating: "top-3 rounded-2xl border border-line bg-surface shadow-overlay",
  blur: "top-0 border-b border-line/60 bg-surface/70 backdrop-blur-md",
};
const stickyClass = "sticky z-40";
const bar = "flex h-14 items-center gap-4 px-3 @sm:px-4";
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

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href = "#") =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

/** Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. */
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;
/** Jarak panel dari pemicu dan dari tepi layar. */
const GAP = 8;

/**
 * Geser indikator ke item yang di-hover, panel terbuka, atau item aktif, lalu letakkan panel terbuka
 * di bawah pemicunya. Indikator adalah anak pertama nav, panel adalah saudara berikutnya dari pemicu.
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

const svgAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

const generatedId = useId();
const navbarId = props.id ?? generatedId;
const open = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => clearTimeout(timer));

function onEscape(event: KeyboardEvent) {
  if (!open.value) return;
  open.value = false;
  (event.currentTarget as Element)
    .querySelector<HTMLElement>("[aria-controls$=-menu]")
    ?.focus();
}

/** Hover mouse: masuk ke item dropdown membukanya setelah jeda, keluar menutupnya setelah jeda. Item tanpa dropdown tidak membatalkan jeda tutup. */
function onHover(event: PointerEvent) {
  const item = event.currentTarget as Element;
  const panel = item.querySelector<HTMLElement>("[popover]");
  sync(item.closest("nav")!);
  if (event.pointerType !== "mouse" || !panel) return;
  const enter = event.type === "pointerenter";
  clearTimeout(timer);
  timer = setTimeout(
    () => panel.togglePopover(enter),
    enter ? OPEN_DELAY : CLOSE_DELAY,
  );
}

// Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya.
function onClick(event: MouseEvent) {
  const trigger = event.currentTarget as Element;
  if (event.detail && trigger.matches("[aria-expanded=true]"))
    event.preventDefault();
}

// ArrowDown di pemicu membuka panel dan memfokuskan link pertama.
function onKeydown(event: KeyboardEvent) {
  const panel = (event.currentTarget as HTMLElement)
    .nextElementSibling as HTMLElement;
  if (event.key !== "ArrowDown") return;
  event.preventDefault();
  panel.showPopover();
  panel.querySelector("a")?.focus();
}

// beforetoggle berjalan sinkron sehingga aria-expanded selalu terbaru; toggle meletakkan panel setelah tampil.
function onToggle(event: ToggleEvent) {
  const panel = event.target as HTMLElement;
  panel.previousElementSibling!.setAttribute(
    "aria-expanded",
    String(event.newState === "open"),
  );
  sync(panel.closest("nav")!);
}
</script>

<template>
  <header
    :id="navbarId"
    :class="[root, variants[props.variant], props.sticky && stickyClass]"
    @keydown.escape="onEscape"
  >
    <div :class="bar">
      <div v-if="$slots.brand" :class="brandClass"><slot name="brand" /></div>
      <nav :aria-label="props.navLabel" :class="desktopNav">
        <span aria-hidden="true" hidden :class="indicator" />
        <ul :class="list">
          <li
            v-for="(entry, index) in props.links"
            :key="index"
            @pointerenter="onHover"
            @pointerleave="onHover"
          >
            <template v-if="entry.children?.length">
              <button
                type="button"
                :popovertarget="`${navbarId}-panel-${index}`"
                aria-expanded="false"
                :aria-controls="`${navbarId}-panel-${index}`"
                :class="item"
                @click="onClick"
                @keydown="onKeydown"
              >
                {{ entry.label
                }}<svg :class="chevron" v-bind="svgAttrs">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                :id="`${navbarId}-panel-${index}`"
                popover="auto"
                :class="panel"
                @beforetoggle="onToggle"
                @toggle="onToggle"
              >
                <ul :class="panelList">
                  <li
                    v-for="(child, childIndex) in entry.children"
                    :key="childIndex"
                  >
                    <a :href="safeHref(child.href)" :class="panelLink">
                      <svg
                        v-if="child.icon"
                        :class="iconClass"
                        v-bind="svgAttrs"
                      >
                        <path :d="child.icon" />
                      </svg>
                      <span :class="linkBody">
                        <span :class="linkTitle">{{ child.label }}</span>
                        <span
                          v-if="child.description"
                          :class="linkDescription"
                          >{{ child.description }}</span
                        >
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </template>
            <a
              v-else
              :href="safeHref(entry.href)"
              :aria-current="entry.active ? 'page' : undefined"
              :class="item"
              >{{ entry.label }}</a
            >
          </li>
        </ul>
      </nav>
      <div :class="actionsClass">
        <slot name="actions" />
        <button
          type="button"
          :aria-label="props.menuLabel"
          :aria-expanded="open ? 'true' : 'false'"
          :aria-controls="`${navbarId}-menu`"
          :class="toggle"
          @click="open = !open"
        >
          <svg :class="openIcon" v-bind="svgAttrs">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg :class="closeIcon" v-bind="svgAttrs">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div
      :id="`${navbarId}-menu`"
      :data-state="open ? 'open' : 'closed'"
      :hidden="!open"
      :class="mobilePanel"
    >
      <nav :aria-label="props.mobileNavLabel" :class="mobileList">
        <template v-for="(entry, index) in props.links" :key="index">
          <details v-if="entry.children?.length">
            <summary :class="item">
              {{ entry.label
              }}<svg :class="chevron" v-bind="svgAttrs">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div :class="groupList">
              <a
                v-for="(child, childIndex) in entry.children"
                :key="childIndex"
                :href="safeHref(child.href)"
                :class="item"
                >{{ child.label }}</a
              >
            </div>
          </details>
          <a
            v-else
            :href="safeHref(entry.href)"
            :aria-current="entry.active ? 'page' : undefined"
            :class="item"
            >{{ entry.label }}</a
          >
        </template>
      </nav>
    </div>
  </header>
</template>
