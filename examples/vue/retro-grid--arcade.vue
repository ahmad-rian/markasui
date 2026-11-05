<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import RetroGrid from "../../components/retro-grid/RetroGrid.vue";
</script>

<template>
  <RetroGrid
    color="warning"
    class="dark rounded-xl bg-canvas px-6 pt-10 pb-28 text-ink"
  >
    <div class="grid justify-items-center gap-4 text-center">
      <h3 class="text-3xl font-bold tracking-tight text-ink">Arcade mode</h3>
      <p class="max-w-72 text-sm text-muted">
        Turn your sprint into a game with streaks, points, and a weekly
        leaderboard.
      </p>
      <Button>Press start</Button>
    </div>
  </RetroGrid>
</template>
