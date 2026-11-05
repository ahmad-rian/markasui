<script setup lang="ts">
import HoverCard from "../../components/hover-card/HoverCard.vue";
</script>

<template>
  <div class="text-sm leading-6 text-muted">
    This release was maintained by
    <HoverCard
      ><a
        href="https://github.com/rinawijaya"
        class="rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >Rina Wijaya</a
      ><template #content
        ><div class="grid gap-1">
          <p class="font-medium text-ink">Rina Wijaya</p>
          <p class="text-muted">
            Design engineer in Bandung. Works on forms and accessibility.
          </p>
        </div></template
      ></HoverCard
    >
    with help from 40 contributors.
  </div>
</template>
