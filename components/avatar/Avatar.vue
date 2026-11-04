<script lang="ts">
/** Huruf pertama kata pertama dan terakhir, sama dengan versi Blade dan React. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("")
    .toUpperCase();
}
</script>

<script setup lang="ts">
import { computed, ref } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string | null;
    alt?: string;
    size?: "sm" | "md" | "lg";
  }>(),
  { src: null, alt: undefined, size: "md" },
);

const base =
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle";
const image = "object-cover";
const fallback = "bg-primary-soft font-medium text-primary select-none";
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

const failedSrc = ref<string | null>(null);
const label = computed(() => props.alt ?? props.name);
const showFallback = computed(
  () => !props.src || failedSrc.value === props.src,
);
const initials = computed(() => getInitials(props.name));
</script>

<template>
  <span
    v-if="showFallback"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    :class="[base, fallback, sizes[props.size], $attrs.class]"
    >{{ initials }}</span
  >
  <img
    v-else
    :src="props.src ?? undefined"
    :alt="label"
    :class="[base, image, sizes[props.size]]"
    v-bind="$attrs"
    @error="failedSrc = props.src"
  />
</template>
