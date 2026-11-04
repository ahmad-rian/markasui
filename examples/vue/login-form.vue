<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";
import Input from "../../components/input/Input.vue";

const email = ref("rani@jenderalcorp.com");
const password = ref("secret");
const remember = ref(false);
</script>

<template>
  <form class="grid gap-4" method="POST" action="/login">
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
      label="Password"
      error="Password must be at least 8 characters"
      autocomplete="current-password"
    />
    <Checkbox
      v-model="remember"
      name="remember"
      label="Remember me on this device"
    />
    <Button type="submit" class="w-full">Sign in</Button>
  </form>
</template>
