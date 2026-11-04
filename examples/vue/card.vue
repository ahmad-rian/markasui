<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Card from "../../components/card/Card.vue";
</script>

<template>
  <Card title="Pro plan" description="For small teams that are growing.">
    Includes 10 team members, 50 GB of storage, and monthly reports.

    <template #footer>
      <Button size="sm">Choose plan</Button>
      <Button variant="ghost" size="sm">Compare</Button>
    </template>
  </Card>
</template>
