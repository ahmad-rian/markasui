<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/input/Input.vue";

const prefix =
  "pointer-events-none absolute bottom-0 left-3 flex h-10 items-center text-sm text-muted";
const suffix =
  "pointer-events-none absolute right-3 bottom-0 flex h-10 items-center text-sm text-muted";
const addon =
  "pointer-events-none absolute bottom-0 left-0 flex h-10 items-center border-r border-line px-3 text-sm text-muted";
const username = ref("budisantoso");
</script>

<template>
  <div class="grid gap-4">
    <div class="relative">
      <Input
        name="price"
        label="Price"
        placeholder="0.00"
        inputmode="decimal"
        class="pr-14! pl-7!"
      />
      <span :class="prefix" aria-hidden="true">$</span>
      <span :class="suffix">USD</span>
    </div>
    <div class="relative">
      <Input
        name="website"
        label="Website"
        placeholder="example.com"
        class="pl-21!"
      />
      <span :class="addon">https://</span>
    </div>
    <div class="relative">
      <Input
        v-model="username"
        name="username"
        label="Username"
        class="pl-7!"
      />
      <span :class="prefix" aria-hidden="true">@</span>
    </div>
  </div>
</template>
