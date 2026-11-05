<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Modal from "../../components/modal/Modal.vue";
</script>

<template>
  <div class="flex justify-center">
    <Modal title="Invite a team member">
      <template #trigger>
        <Button>
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
              d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"
            />
          </svg>
          Invite member
        </Button>
      </template>

      <div class="grid gap-4">
        <Input name="invite-name" label="Name" placeholder="Sari Wijaya" />
        <Input
          name="invite-email"
          type="email"
          label="Email"
          placeholder="sari@company.com"
          hint="We will send a link to join the workspace."
        />
      </div>

      <template #footer>
        <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
        <Button type="submit" value="invite">Send invite</Button>
      </template>
    </Modal>
  </div>
</template>
