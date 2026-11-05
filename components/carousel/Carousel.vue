<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  onMounted,
  reactive,
  useId,
  useSlots,
  useTemplateRef,
  type VNode,
} from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    perView?: 1 | 2 | 3;
    showDots?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    slideLabel?: string;
    dotLabel?: string;
    id?: string;
  }>(),
  {
    label: "Carousel",
    perView: 1,
    showDots: false,
    previousLabel: "Previous slide",
    nextLabel: "Next slide",
    slideLabel: "{index} of {total}",
    dotLabel: "Go to slide {index}",
    id: undefined,
  },
);

const root = "w-full";
const viewport =
  "relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden";
const slideClass = "min-w-0 shrink-0 snap-start";
const perViews = {
  1: "basis-full",
  2: "basis-[calc((100%-1rem)/2)]",
  3: "basis-[calc((100%-2rem)/3)]",
};
const controls = "mt-3 flex items-center gap-2";
const dots = "flex items-center";
const dot =
  "group inline-flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const dotMark =
  "h-2 w-2 rounded-full bg-faint transition-all duration-150 ease-out group-data-[state=active]:w-4 group-data-[state=active]:bg-primary motion-reduce:transition-none";
const buttons = "ml-auto flex items-center gap-2";
const navButton =
  "inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const icon = "size-4";

const slots = useSlots();
const generatedId = useId();
const carouselId = computed(() => props.id ?? generatedId);
const viewportId = computed(() => `${carouselId.value}-viewport`);
const viewportEl = useTemplateRef<HTMLDivElement>("viewportRef");

/** Ratakan Fragment (v-for) dan buang komentar atau spasi kosong supaya tiap elemen menjadi satu slide. */
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment) return flatten(node.children as VNode[]);
    if (node.type === Comment) return [];
    if (node.type === Text && String(node.children).trim() === "") return [];
    return [node];
  });
}

const slides = (): VNode[] => flatten(slots.default?.() ?? []);

const formatLabel = (template: string, index: number, total: number) =>
  template
    .replaceAll("{index}", String(index))
    .replaceAll("{total}", String(total));

const position = reactive({ index: 0, atStart: true, atEnd: false });

/** Baca slide terdekat dan apakah viewport sudah di ujung kiri atau kanan. */
function sync() {
  const el = viewportEl.value;
  if (!el) return;
  const items = Array.from(el.children) as HTMLElement[];
  const left = el.scrollLeft;
  position.index = items.reduce(
    (best, item, i) =>
      Math.abs(item.offsetLeft - left) <
      Math.abs((items[best]?.offsetLeft ?? 0) - left)
        ? i
        : best,
    0,
  );
  position.atStart = left <= 1;
  position.atEnd = left + el.clientWidth >= el.scrollWidth - 1;
}

function goTo(index: number) {
  const el = viewportEl.value;
  const target = el?.children[index] as HTMLElement | undefined;
  if (el && target) el.scrollTo({ left: target.offsetLeft });
}

function step(direction: 1 | -1, total: number) {
  goTo(Math.min(Math.max(position.index + direction, 0), total - 1));
}

function onKeydown(event: KeyboardEvent) {
  const directions: Record<string, 1 | -1 | undefined> = {
    ArrowRight: 1,
    ArrowLeft: -1,
  };
  const direction = directions[event.key];
  if (direction === undefined || event.defaultPrevented) return;
  event.preventDefault();
  step(direction, viewportEl.value?.children.length ?? 0);
}

position.atEnd = slides().length <= 1;
onMounted(sync);
</script>

<template>
  <div
    :id="carouselId"
    role="region"
    aria-roledescription="carousel"
    :aria-label="props.label"
    :class="root"
    @keydown="onKeydown"
  >
    <div
      :id="viewportId"
      ref="viewportRef"
      tabindex="0"
      :class="viewport"
      @scroll="sync"
    >
      <div
        v-for="(slide, index) in slides()"
        :key="index"
        role="group"
        aria-roledescription="slide"
        :aria-label="formatLabel(props.slideLabel, index + 1, slides().length)"
        :class="[slideClass, perViews[props.perView]]"
      >
        <component :is="slide" />
      </div>
    </div>
    <div :class="controls">
      <div v-if="props.showDots" :class="dots">
        <button
          v-for="(_, index) in slides()"
          :key="index"
          type="button"
          :aria-label="formatLabel(props.dotLabel, index + 1, slides().length)"
          :aria-controls="viewportId"
          :aria-current="index === position.index ? 'true' : undefined"
          :data-state="index === position.index ? 'active' : 'inactive'"
          :class="dot"
          @click="goTo(index)"
        >
          <span aria-hidden="true" :class="dotMark" />
        </button>
      </div>
      <div :class="buttons">
        <button
          type="button"
          :aria-label="props.previousLabel"
          :aria-controls="viewportId"
          :disabled="position.atStart"
          :class="navButton"
          @click="step(-1, slides().length)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="icon"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          :aria-label="props.nextLabel"
          :aria-controls="viewportId"
          :disabled="position.atEnd"
          :class="navButton"
          @click="step(1, slides().length)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="icon"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
