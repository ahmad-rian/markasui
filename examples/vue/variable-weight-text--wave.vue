<script setup lang="ts">
import VariableWeightText from "../../components/variable-weight-text/VariableWeightText.vue";
</script>

<template>
  <div class="text-center">
    <p class="text-5xl tracking-tight text-ink">
      <VariableWeightText
        text="Breathe in, breathe out"
        wave
        :min="200"
        :max="700"
      />
    </p>
  </div>
</template>
