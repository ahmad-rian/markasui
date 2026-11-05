<script setup lang="ts">
import { computed } from "vue";

const variants = {
  default: "bg-transparent",
  outline: "border border-line bg-surface",
};
const sizes = {
  sm: "h-8 min-w-8 px-2",
  md: "h-9 min-w-9 px-2.5",
  lg: "h-10 min-w-10 px-3",
};

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    defaultPressed?: boolean;
  }>(),
  { variant: "default", size: "md", defaultPressed: false },
);
const model = defineModel<boolean | undefined>({ default: undefined });

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-subtle data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";

const isPressed = computed(() => model.value ?? props.defaultPressed);
</script>

<template>
  <button
    type="button"
    :aria-pressed="isPressed ? 'true' : 'false'"
    :data-state="isPressed ? 'on' : 'off'"
    :class="[base, variants[props.variant], sizes[props.size]]"
    @click="model = !isPressed"
  >
    <slot />
  </button>
</template>
