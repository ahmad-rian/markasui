<script setup lang="ts">
import AlertDialog from "../../components/alert-dialog/AlertDialog.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <div class="flex justify-center">
    <AlertDialog title="Sign out of all devices?" action-label="Sign out">
      <template #trigger>
        <Button variant="ghost">
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"
            />
          </svg>
          Sign out everywhere
        </Button>
      </template>

      You will need to sign in again on your phone, tablet, and other browsers.
    </AlertDialog>
  </div>
</template>
