<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import RippleBackground from "../../components/ripple-background/RippleBackground.vue";
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line bg-surface">
    <RippleBackground
      :size="88"
      :gap="56"
      class="grid h-48 place-items-center border-b border-line bg-canvas"
    >
      <span
        class="grid size-14 place-items-center rounded-full border border-line bg-surface text-ink"
      >
        <svg
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
          <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
        </svg>
      </span>
    </RippleBackground>
    <div class="grid justify-items-center gap-3 p-6 text-center">
      <h2 class="text-xl font-semibold text-ink">
        Connect your favorite tools
      </h2>
      <p class="max-w-72 text-sm text-muted">
        Bring in GitHub, Slack, and Figma. Updates flow both ways.
      </p>
      <Button>Browse integrations</Button>
    </div>
  </div>
</template>
