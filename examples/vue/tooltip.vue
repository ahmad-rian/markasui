<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Tooltip from "../../components/tooltip/Tooltip.vue";
</script>

<template>
  <div class="flex justify-center py-10">
    <Tooltip content="Copy link to clipboard">
      <Button variant="secondary">Copy link</Button>
    </Tooltip>
  </div>
</template>
