<script setup lang="ts">
import BackgroundLines from "../../components/background-lines/BackgroundLines.vue";
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
</script>

<template>
  <BackgroundLines
    variant="lattice"
    color="muted"
    :count="16"
    speed="slow"
    class="rounded-xl border border-line bg-canvas px-6 py-10"
  >
    <form
      class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-1">
        <h3 class="text-lg font-semibold text-ink">Sign in</h3>
        <p class="text-sm text-muted">Use your work email to continue.</p>
      </div>
      <Input label="Email" type="email" placeholder="you@company.com" />
      <Button type="submit">Send magic link</Button>
    </form>
  </BackgroundLines>
</template>
