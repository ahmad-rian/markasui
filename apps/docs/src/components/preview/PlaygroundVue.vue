<script setup lang="ts">
import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  type Component,
} from "vue";
import type { Built } from "../../lib/playgrounds";

const props = defineProps<{ name: string; initial: Built }>();
const modules = import.meta.glob<{ default: Component }>(
  "../../../../../components/*/*.vue",
  { eager: true },
);
const component = Object.entries(modules).find(([path]) =>
  path.includes(`/components/${props.name}/`),
)?.[1].default;

const built = shallowRef(props.initial);
const listener = (event: Event) => {
  const detail = (event as CustomEvent<{ name: string; built: Built }>).detail;
  if (detail.name === props.name) built.value = detail.built;
};
onMounted(() => document.addEventListener("markas:playground", listener));
onBeforeUnmount(() =>
  document.removeEventListener("markas:playground", listener),
);

/** Preview Vue yang menerima props baru dari panel pengaturan. */
const vnode = computed(() => {
  if (!component) return null;
  const attrs = Object.fromEntries(
    Object.entries(built.value.props).filter(
      ([, value]) => value !== null && value !== false,
    ),
  );
  return h(
    component,
    attrs,
    built.value.children ? { default: () => built.value.children } : undefined,
  );
});
</script>

<template>
  <component :is="() => vnode" />
</template>
