<script setup lang="ts">
import AlertDialog from "../../components/alert-dialog/AlertDialog.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <div class="flex justify-center">
    <AlertDialog
      title="Delete your account?"
      variant="danger"
      action-label="Delete account"
    >
      <template #trigger>
        <Button variant="danger">Delete account</Button>
      </template>

      All of your projects, invoices, and team members will be removed. You
      cannot undo this action.
    </AlertDialog>
  </div>
</template>
