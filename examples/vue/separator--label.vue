<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Separator from "../../components/separator/Separator.vue";
</script>

<template>
  <div class="space-y-4 rounded-xl border border-line bg-surface p-4">
    <Button variant="secondary" class="w-full">Continue with GitHub</Button>
    <Separator label="or" />
    <Input type="email" label="Email" placeholder="you@example.com" />
  </div>
</template>
