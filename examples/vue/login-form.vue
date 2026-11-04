<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";
import Input from "../../components/input/Input.vue";

const email = ref("rani@jenderalcorp.com");
const password = ref("rahasia");
const ingat = ref(false);
</script>

<template>
  <form class="grid gap-4" method="POST" action="/masuk">
    <Input
      v-model="email"
      name="email"
      type="email"
      label="Email"
      autocomplete="email"
    />
    <Input
      v-model="password"
      name="password"
      type="password"
      label="Kata sandi"
      error="Kata sandi minimal 8 karakter."
      autocomplete="current-password"
    />
    <Checkbox
      v-model="ingat"
      name="ingat"
      label="Ingat saya di perangkat ini"
    />
    <Button type="submit" class="w-full">Masuk</Button>
  </form>
</template>
