<script lang="ts">
  import Table, { type TableRow } from "../../../components/table/Table.svelte";

  const columns = [
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" as const },
  ];
  const rows = [
    { id: 1, name: "Budi", status: "Paid", total: "$10" },
    { id: 2, name: "Siti", status: null, total: "$20" },
  ];
</script>

{#snippet status(row: TableRow)}
  <strong>{row.status ?? "None"}</strong>
{/snippet}

<Table
  caption="Orders"
  {columns}
  {rows}
  rowKey="id"
  cells={{ status }}
  bordered
  striped
  footer={{ name: "Total", total: "$30" }}
  class="mt-2"
/>
