<script setup lang="ts">
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";
import Button from "../../components/button/Button.vue";

const items = [
  { label: "Projects", href: "/projects" },
  { label: "Website redesign", href: "/projects/website" },
  { label: "Settings" },
];
</script>

<template>
  <div class="grid gap-3">
    <Breadcrumb :items="items" />
    <div class="flex items-start justify-between gap-4">
      <div class="grid gap-1">
        <h1 class="text-xl font-semibold text-ink">Settings</h1>
        <p class="text-sm text-muted">
          Manage access and notifications for this project.
        </p>
      </div>
      <Button size="sm">Save</Button>
    </div>
  </div>
</template>
