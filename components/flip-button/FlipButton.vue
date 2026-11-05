<script setup lang="ts">
const sizes = {
  sm: "h-8 rounded-md text-sm",
  md: "h-10 rounded-lg text-sm",
  lg: "h-12 rounded-lg text-base",
};
const facePadding = {
  sm: "px-3",
  md: "px-4",
  lg: "px-6",
};
const variants = {
  primary: "bg-primary text-on-primary",
  secondary: "border border-line bg-surface text-ink",
  ghost: "text-ink",
  danger: "bg-danger text-on-primary",
};
const backVariants = {
  primary: "rotate-x-180 bg-primary-strong text-on-primary",
  secondary: "rotate-x-180 border border-primary-line bg-primary-soft text-ink",
  ghost: "rotate-x-180 bg-subtle text-ink",
  danger: "rotate-x-180 bg-danger text-on-primary",
};

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Text on the back face, shown on hover and focus. The back slot wins, the label is the fallback. */
    backLabel?: string;
  }>(),
  { variant: "primary", size: "md", backLabel: "" },
);

const base =
  "group inline-grid font-medium whitespace-nowrap perspective-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";
const inner =
  "grid rounded-[inherit] transition-transform duration-500 ease-out transform-3d group-hover:rotate-x-180 group-focus-visible:rotate-x-180 motion-reduce:transition-none";
const face =
  "col-start-1 row-start-1 inline-flex items-center justify-center gap-2 rounded-[inherit] backface-hidden";
</script>

<template>
  <button type="button" :class="[base, sizes[props.size]]">
    <span :class="inner">
      <span :class="[face, facePadding[props.size], variants[props.variant]]">
        <slot />
      </span>
      <span
        :class="[face, facePadding[props.size], backVariants[props.variant]]"
        aria-hidden="true"
      >
        <slot v-if="$slots.back" name="back" />
        <template v-else-if="props.backLabel">{{ props.backLabel }}</template>
        <slot v-else />
      </span>
    </span>
  </button>
</template>
