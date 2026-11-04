<script setup lang="ts">
import Tabs from "../../components/tabs/Tabs.vue";

const items = [
  { value: "account", label: "Account" },
  { value: "password", label: "Password" },
  { value: "notifications", label: "Notifications" },
];
</script>

<template>
  <Tabs :items="items" default-value="account">
    <template #account>Change your account name and email.</template>
    <template #password>Change your password regularly.</template>
    <template #notifications>Choose which emails you want to receive.</template>
  </Tabs>
</template>
