<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Product", href: "/product", active: true },
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
];
</script>

<template>
  <div
    class="dark overflow-hidden rounded-2xl bg-canvas bg-[radial-gradient(70%_90%_at_20%_0%,color-mix(in_oklab,var(--color-success)_28%,transparent),transparent),radial-gradient(60%_80%_at_90%_10%,color-mix(in_oklab,var(--color-primary)_16%,transparent),transparent)] p-3 text-ink"
  >
    <Navbar :links="links" variant="blur" class="rounded-xl border">
      <template #brand>Acme</template>
      <template #actions>
        <Button size="sm">Start free</Button>
      </template>
    </Navbar>
    <div class="grid gap-3 px-3 pt-12 pb-10">
      <h2 class="text-3xl font-semibold tracking-tight text-balance">
        Ship your next launch in days
      </h2>
      <p class="text-muted">
        A translucent header keeps the hero visible as it scrolls under.
      </p>
    </div>
  </div>
</template>
