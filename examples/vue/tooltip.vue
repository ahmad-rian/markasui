<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Tooltip from "../../components/tooltip/Tooltip.vue";
</script>

<template>
  <div class="flex justify-center py-10">
    <Tooltip content="Salin tautan ke papan klip">
      <Button variant="secondary">Salin tautan</Button>
    </Tooltip>
  </div>
</template>
