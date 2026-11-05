<script setup lang="ts">
import { computed } from "vue";

type Orientation = "horizontal" | "vertical";

const props = withDefaults(
  defineProps<{
    orientation?: Orientation;
    decorative?: boolean;
    label?: string;
  }>(),
  { orientation: "horizontal", decorative: true, label: undefined },
);

const roots = {
  horizontal: "h-px w-full shrink-0 bg-line",
  vertical: "w-px shrink-0 self-stretch bg-line",
};
const labeledRoots = {
  horizontal: "flex w-full items-center gap-3 text-xs text-muted",
  vertical:
    "flex shrink-0 flex-col items-center gap-2 self-stretch text-xs text-muted",
};
const lines = {
  horizontal: "h-px flex-1 bg-line",
  vertical: "w-px flex-1 bg-line",
};

const semantics = computed(() =>
  props.decorative
    ? { role: "none" }
    : {
        role: "separator",
        "aria-orientation": props.orientation,
        "aria-label": props.label || undefined,
      },
);
</script>

<template>
  <div
    v-if="props.label"
    v-bind="semantics"
    :class="labeledRoots[props.orientation]"
  >
    <span :class="lines[props.orientation]" />
    <span>{{ props.label }}</span>
    <span :class="lines[props.orientation]" />
  </div>
  <div v-else v-bind="semantics" :class="roots[props.orientation]" />
</template>
