<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Modal from "../../components/modal/Modal.vue";
</script>

<template>
  <div class="flex justify-center">
    <Modal title="What's new in version 2.4">
      <template #trigger>
        <Button variant="secondary">View release notes</Button>
      </template>

      <ul class="grid list-disc gap-2 pl-5">
        <li>Dark mode now follows your system setting.</li>
        <li>Export reports to CSV from any table.</li>
        <li>Search results load twice as fast.</li>
      </ul>

      <template #footer>
        <Button type="submit" value="close">Got it</Button>
      </template>
    </Modal>
  </div>
</template>
