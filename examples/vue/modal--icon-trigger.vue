<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Modal from "../../components/modal/Modal.vue";
</script>

<template>
  <div class="flex justify-center">
    <Modal title="Share project">
      <template #trigger>
        <Button variant="secondary" aria-label="Share" class="size-10 px-0">
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
              d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13"
            />
          </svg>
        </Button>
      </template>

      Anyone with the link can view this project. Only members can edit it.

      <template #footer>
        <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
        <Button type="submit" value="copy">Copy link</Button>
      </template>
    </Modal>
  </div>
</template>
