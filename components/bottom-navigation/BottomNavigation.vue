<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from "vue";

export type BottomNavigationItem = {
  value: string;
  label: string;
  /** Path data (the d attribute) for a 24x24 stroked icon. */
  icon: string;
  href?: string;
  /** Small count shown on the icon. */
  badge?: number | string;
};

const props = withDefaults(
  defineProps<{
    items: BottomNavigationItem[];
    defaultValue?: string;
    /** Collapse to icons while the content around the bar scrolls down. */
    shrinkOnScroll?: boolean;
    navLabel?: string;
    actionLabel?: string;
    badgeLabel?: string;
  }>(),
  {
    defaultValue: undefined,
    shrinkOnScroll: false,
    navLabel: "Main",
    actionLabel: "Create",
    badgeLabel: "{count} new",
  },
);
const model = defineModel<string>();
const emit = defineEmits<{ action: [] }>();
const slots = useSlots();

const root =
  "flex items-center gap-2 transition-transform duration-300 ease-out data-[state=collapsed]:translate-y-1 motion-reduce:transition-none";
const nav =
  "relative min-w-0 flex-1 rounded-full border border-line bg-surface/85 p-1.5 shadow-overlay backdrop-blur-md";
const pill =
  "absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/var(--bn-count))] translate-x-[calc(var(--bn-index)*100%)] rounded-full bg-primary-soft transition-transform duration-500 ease-[cubic-bezier(0.34,1.36,0.5,1)] motion-reduce:transition-none";
const list = "relative grid auto-cols-fr grid-flow-col";
const itemClass =
  "group/item relative flex h-14 w-full items-center justify-center rounded-full text-muted transition-[color,height] duration-300 ease-out select-none hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:text-ink motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:h-11";
const iconWrap =
  "relative transition-transform duration-300 ease-out group-active/item:scale-90 motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:-translate-y-2.5";
const iconClass = "size-6";
const badgeClass =
  "absolute -top-1 -right-2 h-4 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-on-primary";
const labelClass =
  "pointer-events-none absolute inset-x-1 bottom-1.5 translate-y-1 truncate text-center text-xs leading-4 font-medium opacity-0 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:translate-y-0 [[data-bottom-nav=expanded]_[aria-current=page]_&]:opacity-100";
const srOnly = "sr-only";
const actionClass =
  "grid size-14 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-overlay transition-[background-color,width,height,scale] duration-300 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:size-11";

/** Scroll distance before the bar reacts, and how far down the content must be before it collapses. */
const SCROLL_DELTA = 4;
const COLLAPSE_AFTER = 32;

/** Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#". */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const rootEl = ref<HTMLElement>();
const inner = ref(props.defaultValue ?? props.items[0]?.value);
const collapsed = ref(false);
const active = computed(() => model.value ?? inner.value);
const index = computed(() =>
  Math.max(
    props.items.findIndex((item) => item.value === active.value),
    0,
  ),
);
const state = computed(() => (collapsed.value ? "collapsed" : "expanded"));

function select(next: string) {
  inner.value = next;
  model.value = next;
  collapsed.value = false;
}

let last: EventTarget | null = null;
let lastTop = 0;
function onScroll(event: Event) {
  const target = event.target as Element | Document;
  const scope = rootEl.value?.parentElement;
  if (target !== document && !scope?.contains(target as Element)) return;
  const top = target === document ? scrollY : (target as Element).scrollTop;
  if (target !== last) [last, lastTop] = [target, 0];
  if (Math.abs(top - lastTop) < SCROLL_DELTA) return;
  collapsed.value = top > lastTop && top > COLLAPSE_AFTER;
  lastTop = top;
}
const options = { capture: true, passive: true };
onMounted(() => {
  if (props.shrinkOnScroll)
    document.addEventListener("scroll", onScroll, options);
});
onBeforeUnmount(() =>
  document.removeEventListener("scroll", onScroll, options),
);
</script>

<template>
  <div ref="rootEl" :data-state="state" :data-bottom-nav="state" :class="root">
    <nav
      :aria-label="props.navLabel"
      :class="nav"
      :style="{ '--bn-count': props.items.length, '--bn-index': index }"
    >
      <span aria-hidden="true" :class="pill" />
      <ul :class="list">
        <li v-for="item in props.items" :key="item.value">
          <component
            :is="item.href ? 'a' : 'button'"
            :href="item.href ? safeHref(item.href) : undefined"
            :type="item.href ? undefined : 'button'"
            :aria-current="item.value === active ? 'page' : undefined"
            :class="itemClass"
            @click="select(item.value)"
          >
            <span :class="iconWrap">
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
              <span
                v-if="item.badge !== undefined"
                aria-hidden="true"
                :class="badgeClass"
                >{{ item.badge }}</span
              >
            </span>
            <span :class="labelClass">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" :class="srOnly">{{
              props.badgeLabel.replace("{count}", String(item.badge))
            }}</span>
          </component>
        </li>
      </ul>
    </nav>
    <button
      v-if="slots.action"
      type="button"
      :aria-label="props.actionLabel"
      :class="actionClass"
      @click="emit('action')"
    >
      <slot name="action" />
    </button>
  </div>
</template>
