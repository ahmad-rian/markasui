<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Drawer from "../../components/drawer/Drawer.vue";
</script>

<template>
  <div class="flex justify-center">
    <Drawer title="Order #1042">
      <template #trigger>
        <Button variant="secondary">View order</Button>
      </template>

      <dl class="grid grid-cols-2 gap-y-3">
        <dt>Customer</dt>
        <dd class="text-ink">Rina Hartono</dd>
        <dt>Placed on</dt>
        <dd class="text-ink">12 Oct 2026</dd>
        <dt>Items</dt>
        <dd class="text-ink">3</dd>
        <dt>Total</dt>
        <dd class="font-medium text-ink">$128.00</dd>
      </dl>

      <template #footer>
        <Button variant="secondary" type="submit" value="close">Close</Button>
        <Button type="submit" value="ship">Mark as shipped</Button>
      </template>
    </Drawer>
  </div>
</template>
