<script setup lang="ts">
import Kbd from "../../components/kbd/Kbd.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <div class="flex items-center gap-2">
      <Kbd size="sm">Enter</Kbd>
      <Kbd size="sm" :keys="['Shift', 'Tab']" />
    </div>
    <div class="flex items-center gap-2">
      <Kbd>Enter</Kbd>
      <Kbd :keys="['Shift', 'Tab']" />
    </div>
  </div>
</template>
