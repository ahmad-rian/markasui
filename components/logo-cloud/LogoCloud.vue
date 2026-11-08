<script setup lang="ts">
import { computed, useId } from "vue";

export type LogoCloudLogo = {
  name: string;
  href?: string;
  /** Path SVG (atribut d) yang diisi currentColor. */
  path?: string;
  viewBox?: string;
  /** Tampilkan nama sebagai teks di samping path. false: hanya SVG, nama jadi aria-label. */
  wordmark?: boolean;
  quote?: string;
  author?: string;
};
export type LogoCloudStat = { value: string; label: string };
export type LogoCloudVariant = "row" | "grid" | "marquee" | "cards" | "stats";

const props = withDefaults(
  defineProps<{
    logos: LogoCloudLogo[];
    title?: string;
    variant?: LogoCloudVariant;
    grayscale?: boolean;
    stats?: LogoCloudStat[];
    id?: string;
    logosLabel?: string;
  }>(),
  {
    title: "",
    variant: "row",
    grayscale: true,
    stats: () => [],
    id: undefined,
    logosLabel: "Customer logos",
  },
);
defineSlots<{
  /** Ganti seluruh isi satu logo, mis. elemen img. */
  logo?(props: { logo: LogoCloudLogo; index: number }): unknown;
}>();

const root = "@container w-full";
const layouts = {
  row: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
    item: "flex",
  },
  grid: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line @lg:grid-cols-3 @3xl:grid-cols-4",
    item: "flex h-24 items-center justify-center bg-surface px-4",
  },
  marquee: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0",
    item: "flex",
  },
  cards: {
    root: "grid gap-8",
    title: "text-center text-sm font-medium text-muted",
    list: "grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-3",
    item: "flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-5",
  },
  stats: {
    root: "grid items-center gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    title: "text-2xl font-semibold tracking-tight text-balance text-ink",
    list: "grid grid-cols-2 items-center gap-x-8 gap-y-6 @lg:grid-cols-3",
    item: "flex",
  },
};
const viewport =
  "group overflow-hidden mask-x-from-80% motion-reduce:mask-none";
const track =
  "flex w-max animate-[markas-logo-cloud_30s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none";
const copy = "motion-reduce:hidden";
const keyframes = "@keyframes markas-logo-cloud{to{translate:-50% 0}}";
const header = "grid gap-6";
const statList = "grid grid-cols-2 gap-6";
const stat = "flex flex-col-reverse gap-1";
const statValue = "text-3xl font-semibold tracking-tight text-ink";
const statLabel = "text-sm text-muted";
const logoBase =
  "inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tones = {
  gray: "text-muted grayscale transition-[color,filter] duration-200 ease-out hover:text-ink hover:grayscale-0 motion-reduce:transition-none",
  color: "text-ink",
};
const mark = "h-7 w-auto shrink-0";
const quote = "text-sm text-pretty text-ink";
const author = "mt-auto text-xs text-muted";
const COPIES = [0, 1];

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const generatedId = useId();
const baseId = computed(() => props.id ?? generatedId);
const layout = computed(() => layouts[props.variant]);
const tone = computed(() => (props.grayscale ? tones.gray : tones.color));
const showsWordmark = (logo: LogoCloudLogo) =>
  logo.wordmark !== false || !logo.path;
</script>

<template>
  <section
    :id="baseId"
    :aria-labelledby="props.title ? `${baseId}-title` : undefined"
    :aria-label="props.title ? undefined : props.logosLabel"
    :class="root"
  >
    <div :class="layout.root">
      <div v-if="props.variant === 'stats'" :class="header">
        <h2 v-if="props.title" :id="`${baseId}-title`" :class="layout.title">
          {{ props.title }}
        </h2>
        <dl v-if="props.stats.length" :class="statList">
          <div v-for="entry in props.stats" :key="entry.label" :class="stat">
            <dt :class="statLabel">{{ entry.label }}</dt>
            <dd :class="statValue">{{ entry.value }}</dd>
          </div>
        </dl>
      </div>
      <h2 v-else-if="props.title" :id="`${baseId}-title`" :class="layout.title">
        {{ props.title }}
      </h2>
      <div v-if="props.variant === 'marquee'" :class="viewport">
        <component :is="'style'">{{ keyframes }}</component>
        <div :class="track">
          <ul
            v-for="copyIndex in COPIES"
            :key="copyIndex"
            role="list"
            :aria-hidden="copyIndex > 0 ? 'true' : undefined"
            :inert="copyIndex > 0 ? true : undefined"
            :class="[layout.list, copyIndex > 0 && copy]"
          >
            <li
              v-for="(logo, index) in props.logos"
              :key="logo.name"
              :class="layout.item"
            >
              <component
                :is="logo.href ? 'a' : 'span'"
                :href="logo.href ? safeHref(logo.href) : undefined"
                :class="[logoBase, tone]"
              >
                <slot name="logo" :logo="logo" :index="index">
                  <svg
                    v-if="logo.path"
                    :class="mark"
                    :viewBox="logo.viewBox ?? '0 0 24 24'"
                    fill="currentColor"
                    :role="showsWordmark(logo) ? undefined : 'img'"
                    :aria-label="showsWordmark(logo) ? undefined : logo.name"
                    :aria-hidden="showsWordmark(logo) ? 'true' : undefined"
                  >
                    <path :d="logo.path" />
                  </svg>
                  <span v-if="showsWordmark(logo)">{{ logo.name }}</span>
                </slot>
              </component>
            </li>
          </ul>
        </div>
      </div>
      <ul v-else role="list" :class="layout.list">
        <li
          v-for="(logo, index) in props.logos"
          :key="logo.name"
          :class="layout.item"
        >
          <component
            :is="logo.href ? 'a' : 'span'"
            :href="logo.href ? safeHref(logo.href) : undefined"
            :class="[logoBase, tone]"
          >
            <slot name="logo" :logo="logo" :index="index">
              <svg
                v-if="logo.path"
                :class="mark"
                :viewBox="logo.viewBox ?? '0 0 24 24'"
                fill="currentColor"
                :role="showsWordmark(logo) ? undefined : 'img'"
                :aria-label="showsWordmark(logo) ? undefined : logo.name"
                :aria-hidden="showsWordmark(logo) ? 'true' : undefined"
              >
                <path :d="logo.path" />
              </svg>
              <span v-if="showsWordmark(logo)">{{ logo.name }}</span>
            </slot>
          </component>
          <blockquote
            v-if="props.variant === 'cards' && logo.quote"
            :class="quote"
          >
            {{ logo.quote }}
          </blockquote>
          <p v-if="props.variant === 'cards' && logo.author" :class="author">
            {{ logo.author }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
