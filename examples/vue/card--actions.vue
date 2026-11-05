<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Card from "../../components/card/Card.vue";
</script>

<template>
  <Card
    title="Delete project"
    description="This removes the project, its files, and all deployments. This cannot be undone."
  >
    <p class="text-muted">
      Project: <span class="font-medium text-ink">marketing-site</span>
    </p>

    <template #footer>
      <Button variant="secondary" size="sm" class="ml-auto">Cancel</Button>
      <Button variant="danger" size="sm">Delete project</Button>
    </template>
  </Card>
</template>
