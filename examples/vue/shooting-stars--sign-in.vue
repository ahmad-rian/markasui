<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import ShootingStars from "../../components/shooting-stars/ShootingStars.vue";
</script>

<template>
  <ShootingStars
    :stars="120"
    frequency="low"
    trail-color="success"
    :seed="30"
    class="dark rounded-xl border border-line bg-canvas px-6 py-10"
  >
    <form
      class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-1">
        <h3 class="text-lg font-semibold text-ink">Night shift login</h3>
        <p class="text-sm text-muted">
          On call this week? Sign in to see open incidents.
        </p>
      </div>
      <Input label="Email" type="email" placeholder="you@company.com" />
      <Input label="Password" type="password" />
      <Button type="submit">Sign in</Button>
    </form>
  </ShootingStars>
</template>
