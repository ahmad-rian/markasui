<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
import HoverCard from "../../components/hover-card/HoverCard.vue";
</script>

<template>
  <div class="flex items-center justify-center gap-3 py-6">
    <HoverCard>
      <a
        href="https://github.com/dewilestari"
        class="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        ><Avatar name="Dewi Lestari"
      /></a>
      <template #content>
        <div class="grid gap-1">
          <p class="font-medium text-ink">Dewi Lestari</p>
          <p class="text-muted">
            Product designer. Leads the design system team.
          </p>
        </div>
      </template>
    </HoverCard>
    <HoverCard>
      <a
        href="https://github.com/budisantoso"
        class="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        ><Avatar name="Budi Santoso"
      /></a>
      <template #content>
        <div class="grid gap-1">
          <p class="font-medium text-ink">Budi Santoso</p>
          <p class="text-muted">
            Backend engineer. Maintains the registry and CLI.
          </p>
        </div>
      </template>
    </HoverCard>
  </div>
</template>
