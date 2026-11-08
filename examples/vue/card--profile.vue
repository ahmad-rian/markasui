<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
import Button from "../../components/button/Button.vue";
import Card from "../../components/card/Card.vue";
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <div class="flex items-center gap-4">
      <Avatar name="Sarah Miller" size="lg" alt="" />
      <div class="grid gap-0.5">
        <h3 class="text-base font-semibold text-ink">Sarah Miller</h3>
        <p class="text-muted">Product designer at MarkasUI</p>
      </div>
    </div>
    <p class="mt-4 text-muted">
      Designs onboarding flows and keeps the component library tidy.
    </p>

    <template #footer>
      <Button size="sm">Message</Button>
      <Button variant="secondary" size="sm">View profile</Button>
    </template>
  </Card>
</template>
