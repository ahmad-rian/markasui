<script setup lang="ts">
const props = defineProps<{
  title?: string;
  description?: string;
}>();

const base = "grid gap-4 rounded-xl border border-line bg-surface p-6 text-ink";
const header = "grid gap-1.5";
const titleClass = "text-base font-semibold text-ink";
const descriptionClass = "text-sm text-muted";
const body = "text-sm text-ink";
const footerClass = "flex flex-wrap items-center gap-2";
</script>

<template>
  <article :class="base">
    <header v-if="props.title || props.description" :class="header">
      <h3 v-if="props.title" :class="titleClass">{{ props.title }}</h3>
      <p v-if="props.description" :class="descriptionClass">
        {{ props.description }}
      </p>
    </header>
    <div v-if="$slots.default" :class="body"><slot /></div>
    <div v-if="$slots.footer" :class="footerClass"><slot name="footer" /></div>
  </article>
</template>
