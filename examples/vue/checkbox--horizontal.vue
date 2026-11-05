<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";

const email = ref(true);
const push = ref(true);
</script>

<template>
  <fieldset class="min-w-0">
    <legend class="mb-3 text-sm font-medium text-ink">Notify me by</legend>
    <div class="flex flex-wrap gap-x-6 gap-y-3">
      <Checkbox v-model="email" name="channels[]" value="email" label="Email" />
      <Checkbox name="channels[]" value="sms" label="SMS" />
      <Checkbox v-model="push" name="channels[]" value="push" label="Push" />
      <Checkbox name="channels[]" value="slack" label="Slack" />
    </div>
  </fieldset>
</template>
