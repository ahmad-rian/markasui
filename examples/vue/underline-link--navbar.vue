<script setup lang="ts">
import UnderlineLink from "../../components/underline-link/UnderlineLink.vue";
</script>

<template>
  <header
    class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3"
  >
    <span class="text-sm font-semibold text-ink">Kopi Kita</span>
    <nav
      aria-label="Main"
      class="flex items-center gap-5 text-sm font-medium text-muted"
    >
      <UnderlineLink
        href="#"
        variant="comes-in-goes-out"
        active
        class="text-ink"
        >Menu</UnderlineLink
      >
      <UnderlineLink href="#" variant="comes-in-goes-out" class="hover:text-ink"
        >Outlets</UnderlineLink
      >
      <UnderlineLink href="#" variant="comes-in-goes-out" class="hover:text-ink"
        >Rewards</UnderlineLink
      >
      <UnderlineLink href="#" variant="comes-in-goes-out" class="hover:text-ink"
        >About</UnderlineLink
      >
    </nav>
  </header>
</template>
