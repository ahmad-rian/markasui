<script setup lang="ts">
import { ref } from "vue";
import Select from "../../components/select/Select.vue";

const timezone = ref("asia-jakarta");
</script>

<template>
  <Select
    v-model="timezone"
    name="timezone"
    label="Time zone"
    hint="Meeting times are shown in this time zone."
  >
    <optgroup label="Asia">
      <option value="asia-jakarta">Jakarta (GMT+7)</option>
      <option value="asia-singapore">Singapore (GMT+8)</option>
      <option value="asia-tokyo">Tokyo (GMT+9)</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="europe-london">London (GMT+0)</option>
      <option value="europe-berlin">Berlin (GMT+1)</option>
    </optgroup>
    <optgroup label="Americas">
      <option value="america-new-york">New York (GMT-5)</option>
      <option value="america-los-angeles">Los Angeles (GMT-8)</option>
    </optgroup>
  </Select>
</template>
