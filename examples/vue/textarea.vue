<script setup lang="ts">
import { ref } from "vue";
import Textarea from "../../components/textarea/Textarea.vue";

const address = ref("12 Main Street");
</script>

<template>
  <div class="grid gap-4">
    <Textarea
      name="bio"
      label="Short bio"
      placeholder="Tell us a little about yourself"
      hint="Up to 200 characters."
    />
    <Textarea
      v-model="address"
      name="address"
      label="Address"
      :rows="2"
      error="Address is incomplete."
    />
  </div>
</template>
