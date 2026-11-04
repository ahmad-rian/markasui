<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Modal from "../../components/modal/Modal.vue";
</script>

<template>
  <Modal title="Delete project?">
    <template #trigger>
      <Button variant="danger">Delete project</Button>
    </template>

    The project and all of its data will be deleted permanently.

    <template #footer>
      <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
      <Button variant="danger" type="submit" value="delete">Delete</Button>
    </template>
  </Modal>
</template>
