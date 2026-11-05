<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";

const comments = ref(true);
const mentions = ref(true);
</script>

<template>
  <fieldset class="min-w-0">
    <legend class="mb-3 text-sm font-medium text-ink">Email me when</legend>
    <div class="grid gap-4">
      <Checkbox
        v-model="comments"
        name="comments"
        label="Someone comments"
        description="Replies to your posts and threads you follow."
      />
      <Checkbox
        v-model="mentions"
        name="mentions"
        label="Someone mentions me"
        description="Any message that includes your username."
      />
      <Checkbox
        name="invites"
        label="I am invited to a project"
        description="Includes invitations from outside your workspace."
      />
    </div>
  </fieldset>
</template>
