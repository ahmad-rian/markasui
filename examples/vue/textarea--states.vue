<script setup lang="ts">
import { ref } from "vue";
import Textarea from "../../components/textarea/Textarea.vue";

const reason = ref("Wrong size");
const notes = ref("Customer upgraded to the Pro plan on 3 March.");
</script>

<template>
  <div class="grid gap-4">
    <Textarea
      name="bio"
      label="Short bio"
      :rows="3"
      placeholder="Tell us a little about yourself"
      hint="Shown on your public profile."
    />
    <Textarea
      v-model="reason"
      name="reason"
      label="Reason for refund"
      :rows="3"
      error="Please describe the issue in at least 20 characters."
    />
    <Textarea
      v-model="notes"
      name="notes"
      label="Internal notes"
      :rows="3"
      disabled
    />
  </div>
</template>
