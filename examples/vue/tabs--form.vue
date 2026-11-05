<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Tabs from "../../components/tabs/Tabs.vue";

const items = [
  { value: "profile", label: "Profile" },
  { value: "password", label: "Password" },
];
const name = ref("Siti Aminah");
const email = ref("siti@example.com");
</script>

<template>
  <Tabs :items="items" default-value="profile">
    <template #profile>
      <div class="grid gap-4">
        <Input v-model="name" name="name" label="Name" />
        <Input v-model="email" name="email" type="email" label="Email" />
        <div>
          <Button>Save changes</Button>
        </div>
      </div>
    </template>
    <template #password>
      <div class="grid gap-4">
        <Input
          name="current-password"
          type="password"
          label="Current password"
        />
        <Input
          name="new-password"
          type="password"
          label="New password"
          hint="At least 8 characters"
        />
        <div>
          <Button>Update password</Button>
        </div>
      </div>
    </template>
  </Tabs>
</template>
