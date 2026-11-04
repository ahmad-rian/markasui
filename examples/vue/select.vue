<script setup lang="ts">
import { ref } from "vue";
import Select from "../../components/select/Select.vue";

const city = ref("bandung");
const role = ref("");
const plan = ref("free");
</script>

<template>
  <div class="grid gap-4">
    <Select v-model="city" name="city" label="City" hint="Choose your city.">
      <option value="jakarta">Jakarta</option>
      <option value="bandung">Bandung</option>
      <option value="surabaya">Surabaya</option>
    </Select>
    <Select v-model="role" name="role" label="Role" error="Role is required.">
      <option value="">Choose a role</option>
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
    </Select>
    <Select v-model="plan" name="plan" label="Plan" disabled>
      <option value="free">Free</option>
    </Select>
  </div>
</template>
