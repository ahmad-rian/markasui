<script setup lang="ts">
import Badge from "../../components/badge/Badge.vue";
import Table, { type TableColumn } from "../../components/table/Table.vue";

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

const columns: TableColumn[] = [
  { key: "invoice", label: "Invoice" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount", align: "right" },
];
const rows = [
  {
    invoice: "INV-1024",
    customer: "Budi Santoso",
    status: "Paid",
    amount: "$250.00",
  },
  {
    invoice: "INV-1025",
    customer: "Siti Aminah",
    status: "Pending",
    amount: "$85.00",
  },
  {
    invoice: "INV-1026",
    customer: "John Carter",
    status: "Overdue",
    amount: "$1,200.00",
  },
  {
    invoice: "INV-1027",
    customer: "Dewi Lestari",
    status: "Draft",
    amount: "$40.00",
  },
];
const statusVariants: Record<string, BadgeVariant> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
  Draft: "neutral",
};
</script>

<template>
  <Table caption="Invoices" :columns="columns" :rows="rows" row-key="invoice">
    <template #cell-status="{ row }">
      <Badge :variant="statusVariants[String(row.status)]">{{
        row.status
      }}</Badge>
    </template>
  </Table>
</template>
