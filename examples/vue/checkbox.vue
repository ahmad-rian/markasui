<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";

const terms = ref(true);
const updates = ref(false);
</script>

<template>
  <div class="grid gap-4">
    <Checkbox
      v-model="terms"
      name="terms"
      label="I agree to the terms of service"
    />
    <Checkbox
      v-model="updates"
      name="updates"
      label="Send me product updates"
      description="At most one email per month."
    />
    <Checkbox name="archive" label="Archive automatically" disabled />
  </div>
</template>
