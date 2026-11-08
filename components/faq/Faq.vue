<script setup lang="ts">
import { computed, h, nextTick, ref, useId, useSlots } from "vue";

export type FaqItem = { question: string; answer: string; category?: string };
export type FaqVariant =
  "simple" | "split" | "cards" | "centered" | "searchable" | "categories";

const props = withDefaults(
  defineProps<{
    items: FaqItem[];
    title?: string;
    description?: string;
    variant?: FaqVariant;
    exclusive?: boolean;
    schema?: boolean;
    contact?: string;
    id?: string;
    searchLabel?: string;
    emptyLabel?: string;
    categoriesLabel?: string;
  }>(),
  {
    title: "",
    description: "",
    variant: "simple",
    exclusive: false,
    schema: false,
    contact: "",
    id: undefined,
    searchLabel: "Search questions",
    emptyLabel: "No questions match your search",
    categoriesLabel: "Question categories",
  },
);
const slots = useSlots();

const root = "@container w-full [interpolate-size:allow-keywords]";
const header = "grid gap-2";
const lined = { list: "border-t border-line", item: "border-b border-line" };
const withTools = { root: "mx-auto grid max-w-3xl gap-6", header, ...lined };
const layouts = {
  simple: { root: "mx-auto grid max-w-3xl gap-8", header, ...lined },
  split: {
    root: "grid gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
    header: "grid content-start gap-2",
    ...lined,
  },
  cards: {
    root: "grid gap-8",
    header,
    list: "grid items-start gap-3 @xl:grid-cols-2",
    item: "rounded-xl border border-line bg-surface px-5",
  },
  centered: {
    root: "mx-auto grid max-w-2xl gap-8 text-center",
    header: "grid justify-items-center gap-2",
    list: "grid gap-2 text-left",
    item: "rounded-lg bg-subtle px-4",
  },
  searchable: withTools,
  categories: withTools,
};
const titleClass =
  "text-2xl font-semibold tracking-tight text-balance text-ink";
const descriptionClass = "max-w-prose text-sm text-pretty text-muted";
const contactClass =
  "text-sm text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4";
const body = "grid content-start gap-4";
const details =
  "group details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none";
const answer = "pb-4 text-sm leading-relaxed text-pretty text-muted";
const search = "relative";
const searchIcon =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted";
const searchInput =
  "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const status = "contents";
const empty = "py-6 text-center text-sm text-muted";
const tablist = "flex flex-wrap gap-2";
const tab =
  "inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-on-primary motion-reduce:transition-none";

/** Pertanyaan cocok kalau teks pertanyaan atau jawabannya memuat kata kunci. */
const matches = (item: FaqItem, query: string) =>
  `${item.question} ${item.answer}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());

/** Data terstruktur FAQPage untuk mesin pencari. `<` di-escape supaya tidak bisa menutup tag script. */
const faqSchema = (items: FaqItem[]) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replace(/</g, "\\u003c");

/** Tag script JSON-LD. innerHTML dipakai supaya isi tidak di-escape saat SSR. */
const JsonLd = (p: { json: string }) =>
  h("script", { type: "application/ld+json", innerHTML: p.json });

/** Indeks tab tujuan untuk tombol panah, Home, dan End (pola Tabs WAI-ARIA). */
const targetTab = (key: string, index: number, count: number) =>
  ({
    ArrowRight: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  })[key];

const generatedId = useId();
const baseId = computed(() => props.id ?? generatedId);
const query = ref("");
const active = ref(0);
const layout = computed(() => layouts[props.variant]);
const searchable = computed(() => props.variant === "searchable");
const categories = computed(() =>
  props.variant === "categories"
    ? [...new Set(props.items.map((item) => item.category ?? ""))]
    : [],
);
const noMatches = computed(
  () =>
    searchable.value && !props.items.some((item) => matches(item, query.value)),
);
const hasContact = computed(() => Boolean(slots.contact || props.contact));
/** Satu panel per kategori (varian categories) atau satu daftar berisi semua pertanyaan. */
const groups = computed(() =>
  categories.value.length
    ? categories.value.map((category) =>
        props.items.filter((item) => (item.category ?? "") === category),
      )
    : [props.items],
);

async function onTabKeydown(event: KeyboardEvent) {
  const target = targetTab(event.key, active.value, categories.value.length);
  if (target === undefined) return;
  event.preventDefault();
  active.value = target;
  await nextTick();
  document.getElementById(`${baseId.value}-tab-${target}`)?.focus();
}
</script>

<template>
  <section
    :id="baseId"
    :aria-labelledby="props.title ? `${baseId}-title` : undefined"
    :class="root"
  >
    <div :class="layout.root">
      <div :class="layout.header">
        <h2 v-if="props.title" :id="`${baseId}-title`" :class="titleClass">
          {{ props.title }}
        </h2>
        <p v-if="props.description" :class="descriptionClass">
          {{ props.description }}
        </p>
        <div
          v-if="props.variant === 'split' && hasContact"
          :class="contactClass"
        >
          <slot name="contact">{{ props.contact }}</slot>
        </div>
      </div>
      <div :class="body">
        <div v-if="searchable" :class="search">
          <svg
            :class="searchIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            v-model="query"
            type="search"
            autocomplete="off"
            :aria-label="props.searchLabel"
            :placeholder="props.searchLabel"
            :class="searchInput"
          />
        </div>
        <div
          v-if="categories.length"
          role="tablist"
          :aria-label="props.categoriesLabel"
          :class="tablist"
          @keydown="onTabKeydown"
        >
          <button
            v-for="(category, index) in categories"
            :id="`${baseId}-tab-${index}`"
            :key="category"
            type="button"
            role="tab"
            :aria-controls="`${baseId}-panel-${index}`"
            :aria-selected="index === active ? 'true' : 'false'"
            :tabindex="index === active ? 0 : -1"
            :data-state="index === active ? 'active' : 'inactive'"
            :class="tab"
            @click="active = index"
          >
            {{ category }}
          </button>
        </div>
        <div
          v-for="(group, index) in groups"
          :id="categories.length ? `${baseId}-panel-${index}` : undefined"
          :key="index"
          :role="categories.length ? 'tabpanel' : undefined"
          :aria-labelledby="
            categories.length ? `${baseId}-tab-${index}` : undefined
          "
          :hidden="categories.length > 0 && index !== active"
          :class="layout.list"
        >
          <details
            v-for="item in group"
            :key="item.question"
            :class="[details, layout.item]"
            :name="props.exclusive ? `${baseId}-item` : undefined"
            :hidden="searchable && !matches(item, query)"
          >
            <summary :class="summary">
              <span>{{ item.question }}</span>
              <svg
                :class="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p :class="answer">{{ item.answer }}</p>
          </details>
        </div>
        <div v-if="searchable" role="status" :class="status">
          <p v-if="noMatches" :class="empty">{{ props.emptyLabel }}</p>
        </div>
      </div>
      <div v-if="props.variant !== 'split' && hasContact" :class="contactClass">
        <slot name="contact">{{ props.contact }}</slot>
      </div>
    </div>
    <JsonLd v-if="props.schema" :json="faqSchema(props.items)" />
  </section>
</template>
