<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Tooltip from "../../components/tooltip/Tooltip.vue";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3 py-10">
    <Tooltip content="Shown above the button">
      <Button variant="secondary">Top</Button>
    </Tooltip>
    <Tooltip content="Shown below the button" side="bottom">
      <Button variant="secondary">Bottom</Button>
    </Tooltip>
  </div>
</template>
