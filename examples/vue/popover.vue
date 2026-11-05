<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Popover from "../../components/popover/Popover.vue";
</script>

<template>
  <Popover label="Share">
    <div class="grid gap-3">
      <div class="grid gap-1">
        <p class="font-medium text-ink">Share project</p>
        <p class="text-muted">Anyone with the link can view this project.</p>
      </div>
      <Button size="sm">Copy link</Button>
    </div>
  </Popover>
</template>
