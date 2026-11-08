<script setup lang="ts">
import HeroHighlight from "../../components/hero-highlight/HeroHighlight.vue";
</script>

<template>
  <HeroHighlight
    speed="slow"
    :spacing="12"
    class="rounded-xl border border-line bg-surface px-6 py-10"
  >
    <figure class="grid gap-4">
      <blockquote class="text-lg leading-relaxed text-ink">
        We rebuilt our dashboard with MarkasUI in a weekend. Blade and React
        screens finally match, and <mark>nobody wants to go back</mark>.
      </blockquote>
      <figcaption class="text-sm text-muted">
        Dana Reyes, Frontend Lead in Jakarta
      </figcaption>
    </figure>
  </HeroHighlight>
</template>
