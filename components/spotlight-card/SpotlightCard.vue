<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: "primary" | "success" | "warning" | "danger";
  }>(),
  { color: "primary" },
);

const root =
  "group/spotlight relative isolate rounded-xl bg-line p-px [--spot-x:50%] [--spot-y:50%]";
const glow =
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(240px_circle_at_var(--spot-x)_var(--spot-y),var(--spot-color),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none";
const inner = "relative h-full overflow-hidden rounded-[11px] bg-surface";
const light =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),color-mix(in_oklab,var(--spot-color)_12%,transparent),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none";
const content = "relative";
const colors = {
  primary: "[--spot-color:var(--color-primary)]",
  success: "[--spot-color:var(--color-success)]",
  warning: "[--spot-color:var(--color-warning)]",
  danger: "[--spot-color:var(--color-danger)]",
};

/** Simpan posisi kursor relatif terhadap kartu sebagai CSS custom property. */
function follow(event: PointerEvent) {
  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
</script>

<template>
  <div :class="[root, colors[props.color]]" @pointermove="follow">
    <div aria-hidden="true" :class="glow"></div>
    <div :class="inner">
      <div aria-hidden="true" :class="light"></div>
      <div :class="content"><slot /></div>
    </div>
  </div>
</template>
