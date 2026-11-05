<script setup lang="ts">
import Collapsible from "../../components/collapsible/Collapsible.vue";
</script>

<template>
  <div class="grid gap-3 rounded-xl border border-line bg-surface p-4">
    <div class="grid gap-1">
      <p class="text-sm font-medium text-ink">Invoice INV-0412</p>
      <p class="text-sm text-muted">Paid on 2 November, total Rp 1.250.000</p>
    </div>
    <Collapsible title="Payment breakdown" class="border-t border-line pt-2">
      Subtotal Rp 1.126.000, tax Rp 124.000, paid with bank transfer.
    </Collapsible>
  </div>
</template>
