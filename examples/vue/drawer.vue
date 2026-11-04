<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Drawer from "../../components/drawer/Drawer.vue";
</script>

<template>
  <Drawer title="Filter products">
    <template #trigger>
      <Button variant="secondary">Open filters</Button>
    </template>

    Choose a category and price range to filter the product list.

    <template #footer>
      <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
      <Button type="submit" value="apply">Apply</Button>
    </template>
  </Drawer>
</template>
