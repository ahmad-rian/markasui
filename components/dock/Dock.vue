<script setup lang="ts">
import { computed, ref } from "vue";

export type DockItem =
  | {
      separator?: false;
      label: string;
      /** Path data (the d attribute) for a 24x24 stroked icon. */
      icon: string;
      value?: string;
      href?: string;
      /** Shows the dot under the item, like an open app. */
      active?: boolean;
    }
  | { separator: true };

const props = withDefaults(
  defineProps<{
    items: DockItem[];
    /** How large the item under the pointer or focus grows. 1 turns it off. */
    magnification?: number;
    dockLabel?: string;
  }>(),
  { magnification: 1.6, dockLabel: "Dock" },
);
const emit = defineEmits<{ select: [value: string] }>();

const root =
  "relative inline-flex h-[60px] max-w-full min-w-0 items-end gap-2 rounded-2xl border border-line bg-surface/80 px-2.5 pb-2.5 shadow-overlay backdrop-blur-md";
const itemWrap =
  "relative h-10 w-[calc(2.5rem*var(--dock-scale,1))] transition-[width] duration-150 ease-out motion-reduce:transition-none";
const itemClass =
  "group/dock absolute bottom-0 left-0 grid aspect-square w-full place-items-center rounded-xl border border-line bg-linear-to-b from-surface to-subtle text-ink transition-colors duration-150 ease-out hover:to-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const iconClass = "size-[55%]";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-primary px-2 py-1 text-xs font-medium whitespace-nowrap text-on-primary opacity-0 shadow-overlay transition-[opacity,translate] duration-150 ease-out group-hover/dock:translate-y-0 group-hover/dock:opacity-100 group-focus-visible/dock:translate-y-0 group-focus-visible/dock:opacity-100 motion-reduce:transition-none";
const dot =
  "absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink";
const separator = "mx-0.5 mb-1 h-8 w-px shrink-0 bg-line";

/** Pointer distance in px over which neighbours still grow, and the launch bounce. */
const RANGE = 140;
const BOUNCE = [
  { transform: "none" },
  { transform: "translateY(-12px)" },
  { transform: "none" },
];
const BOUNCE_TIMING = { duration: 450, easing: "cubic-bezier(0.3, 0, 0.3, 1)" };

/** Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#". */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const rootEl = ref<HTMLElement>();
const focusIndex = ref(0);

/** Grow every item by its distance to x with a cosine falloff. x null resets the dock. */
function magnify(x: number | null) {
  const off = x === null || still();
  for (const item of rootEl.value?.querySelectorAll<HTMLElement>(
    "[data-dock-item]",
  ) ?? []) {
    const rect = item.getBoundingClientRect();
    const distance = off ? RANGE : Math.abs(x - rect.left - rect.width / 2);
    const scale =
      distance >= RANGE
        ? 1
        : 1 +
          ((props.magnification - 1) *
            (1 + Math.cos((Math.PI * distance) / RANGE))) /
            2;
    item.style.setProperty("--dock-scale", String(scale));
  }
}

const centerOf = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.left + rect.width / 2;
};
const controls = () =>
  Array.from(
    rootEl.value?.querySelectorAll<HTMLElement>(
      "[data-dock-item] > :first-child",
    ) ?? [],
  );

/** Position of each item among the focusable ones, -1 for separators. */
const positions = computed(() => {
  let position = -1;
  return props.items.map((item) => (item.separator ? -1 : ++position));
});

function onKeydown(event: KeyboardEvent) {
  const all = controls();
  const index = all.indexOf(event.target as HTMLElement);
  const targets: Record<string, number> = {
    ArrowRight: (index + 1) % all.length,
    ArrowLeft: (index - 1 + all.length) % all.length,
    Home: 0,
    End: all.length - 1,
  };
  const target = targets[event.key];
  if (index < 0 || target === undefined) return;
  event.preventDefault();
  all[target]?.focus();
}
function onFocusin(event: FocusEvent) {
  const index = controls().indexOf(event.target as HTMLElement);
  if (index < 0) return;
  focusIndex.value = index;
  magnify(centerOf(event.target as Element));
}
function onFocusout(event: FocusEvent) {
  if (!rootEl.value?.contains(event.relatedTarget as Node | null))
    magnify(null);
}
function onLeave() {
  const focused = rootEl.value?.contains(document.activeElement);
  magnify(focused ? centerOf(document.activeElement!) : null);
}
function launch(event: MouseEvent, value: string) {
  if (!still())
    (event.currentTarget as HTMLElement).animate?.(BOUNCE, BOUNCE_TIMING);
  emit("select", value);
}
</script>

<template>
  <div
    ref="rootEl"
    role="toolbar"
    :aria-label="props.dockLabel"
    aria-orientation="horizontal"
    :class="root"
    @keydown="onKeydown"
    @focusin="onFocusin"
    @focusout="onFocusout"
    @pointermove="magnify($event.clientX)"
    @pointerleave="onLeave"
  >
    <template v-for="(item, index) in props.items" :key="index">
      <div
        v-if="item.separator"
        role="separator"
        aria-orientation="vertical"
        :class="separator"
      />
      <div v-else data-dock-item="" :class="itemWrap">
        <component
          :is="item.href ? 'a' : 'button'"
          :href="item.href ? safeHref(item.href) : undefined"
          :type="item.href ? undefined : 'button'"
          :tabindex="positions[index] === focusIndex ? 0 : -1"
          :aria-current="item.active ? 'true' : undefined"
          :class="itemClass"
          @click="launch($event, item.value ?? item.label)"
        >
          <svg
            :class="iconClass"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="item.icon" />
          </svg>
          <span :class="tooltip">{{ item.label }}</span>
        </component>
        <span v-if="item.active" aria-hidden="true" :class="dot" />
      </div>
    </template>
  </div>
</template>
