<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import StarsBackground from "../../components/stars-background/StarsBackground.vue";
</script>

<template>
  <StarsBackground
    :count="150"
    :seed="3"
    color="muted"
    class="rounded-xl border border-line bg-canvas p-6"
  >
    <form class="grid gap-4">
      <div class="grid gap-1.5">
        <h3 class="text-lg font-semibold text-ink">Join the waitlist</h3>
        <p class="text-sm text-muted">
          Be first to try Orbit when invites open this spring.
        </p>
      </div>
      <div class="flex items-end gap-2">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          class="flex-1"
        />
        <Button type="submit">Request invite</Button>
      </div>
    </form>
  </StarsBackground>
</template>
