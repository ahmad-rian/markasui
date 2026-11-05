<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md";
    keys?: string[];
    separator?: string;
  }>(),
  { size: "md", keys: () => [], separator: "+" },
);

const keycap =
  "inline-flex items-center justify-center rounded-md bg-surface font-sans font-medium text-muted ring-1 ring-line";
const sizes = {
  sm: "h-5 min-w-5 px-1 text-[11px]",
  md: "h-6 min-w-6 px-1.5 text-xs",
};
const group = "inline-flex items-center gap-1 font-sans";
const joiner = "text-xs text-muted";
</script>

<template>
  <kbd v-if="props.keys.length > 0" :class="group"
    ><template v-for="(key, index) in props.keys" :key="index"
      ><span v-if="index > 0" :class="joiner">{{ props.separator }}</span
      ><kbd :class="[keycap, sizes[props.size]]">{{ key }}</kbd></template
    ></kbd
  >
  <kbd v-else :class="[keycap, sizes[props.size]]"><slot /></kbd>
</template>
