<script setup lang="ts">
import { computed } from "vue";

type Size = "sm" | "md" | "lg";
export type AvatarGroupItem = { name: string; src?: string | null };

const props = withDefaults(
  defineProps<{
    items: AvatarGroupItem[];
    max?: number;
    size?: Size;
    groupLabel?: string;
    moreLabel?: string;
  }>(),
  { max: 4, size: "md", groupLabel: "Members", moreLabel: "{count} more" },
);

const root = "group/avatars isolate flex items-center";
const item =
  "group/avatar relative shrink-0 transition-[margin] duration-200 ease-out hover:z-10 motion-reduce:transition-none";
const face =
  "flex items-center justify-center overflow-hidden rounded-full font-medium ring-2 ring-[var(--avatar-ring,var(--color-canvas))] transition-[translate,scale] duration-200 ease-out select-none group-hover/avatar:-translate-y-1 group-hover/avatar:scale-110 motion-reduce:transition-none";
const image = "object-cover";
const fallback = "bg-primary-soft text-primary";
const more = "bg-subtle text-ink";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition duration-150 ease-out group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100 motion-reduce:transition-none";
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};
const overlaps = {
  sm: "not-first:-ml-1.5 group-hover/avatars:not-first:ml-0.5",
  md: "not-first:-ml-2 group-hover/avatars:not-first:ml-1",
  lg: "not-first:-ml-2.5 group-hover/avatars:not-first:ml-1.5",
};

/** Huruf pertama kata pertama dan terakhir, sama dengan versi Blade dan React. */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("")
    .toUpperCase();
}

const shown = computed(() => props.items.slice(0, props.max));
const hidden = computed(() => props.items.slice(props.max));
const hiddenNames = computed(() =>
  hidden.value.map((person) => person.name).join(", "),
);
const moreText = computed(() =>
  props.moreLabel.replace("{count}", String(hidden.value.length)),
);
</script>

<template>
  <div role="group" :aria-label="props.groupLabel" :class="root">
    <span
      v-for="(person, index) in shown"
      :key="index"
      :class="[item, overlaps[props.size]]"
    >
      <img
        v-if="person.src"
        :src="person.src"
        :alt="person.name"
        :class="[face, image, sizes[props.size]]"
      />
      <span
        v-else
        role="img"
        :aria-label="person.name"
        :class="[face, fallback, sizes[props.size]]"
        >{{ getInitials(person.name) }}</span
      >
      <span aria-hidden="true" :class="tooltip">{{ person.name }}</span>
    </span>
    <span v-if="hidden.length > 0" :class="[item, overlaps[props.size]]">
      <span :class="[face, more, sizes[props.size]]"
        ><span aria-hidden="true">+{{ hidden.length }}</span
        ><span class="sr-only">{{ moreText }}</span></span
      >
      <span aria-hidden="true" :class="tooltip">{{ hiddenNames }}</span>
    </span>
  </div>
</template>
