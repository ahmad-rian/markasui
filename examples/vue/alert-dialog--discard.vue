<script setup lang="ts">
import AlertDialog from "../../components/alert-dialog/AlertDialog.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4"
  >
    <div class="grid gap-1">
      <p class="text-sm font-medium text-ink">Draft: Q3 product update</p>
      <p class="text-sm text-muted">3 unsaved changes</p>
    </div>
    <AlertDialog
      title="Discard unsaved changes?"
      variant="danger"
      cancel-label="Keep editing"
      action-label="Discard"
    >
      <template #trigger>
        <Button variant="secondary">Close editor</Button>
      </template>

      Your edits since the last save will be lost.
    </AlertDialog>
  </div>
</template>
