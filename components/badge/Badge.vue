<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "neutral" | "primary" | "success" | "warning" | "danger";
  }>(),
  { variant: "neutral" },
);

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";
const variants = {
  neutral: "border-line bg-subtle text-ink",
  primary: "border-primary-line bg-primary-soft text-primary",
  success: "border-success/30 bg-success/10 text-ink",
  warning: "border-warning/30 bg-warning/10 text-ink",
  danger: "border-danger/30 bg-danger/10 text-ink",
};
const dotBase = "size-1.5 shrink-0 rounded-full";
const dots = {
  neutral: "bg-muted",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};
</script>

<template>
  <span :class="[base, variants[props.variant]]"
    ><span :class="[dotBase, dots[props.variant]]" aria-hidden="true" /><slot
  /></span>
</template>
