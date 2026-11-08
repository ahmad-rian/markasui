<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import HeroHighlight from "../../components/hero-highlight/HeroHighlight.vue";
import Input from "../../components/input/Input.vue";
</script>

<template>
  <HeroHighlight
    color="warning"
    :spacing="20"
    :radius="200"
    class="dark rounded-xl bg-canvas px-6 py-10 text-ink"
  >
    <form class="mx-auto grid max-w-80 gap-4">
      <h3 class="text-2xl leading-snug font-semibold text-ink">
        Join <mark>4,000 makers</mark> shipping every week
      </h3>
      <Input label="Work email" type="email" placeholder="you@studio.com" />
      <Button type="submit">Create account</Button>
    </form>
  </HeroHighlight>
</template>
