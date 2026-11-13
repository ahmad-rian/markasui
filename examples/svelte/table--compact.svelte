<script lang="ts">
  import Table, { type TableColumn } from "../../components/table/Table.svelte";

  const columns: TableColumn[] = [
    { key: "date", label: "Date" },
    { key: "invoice", label: "Invoice" },
    { key: "customer", label: "Customer" },
    { key: "method", label: "Method" },
    { key: "amount", label: "Amount", align: "right" },
  ];
  const rows = [
    {
      date: "Nov 1",
      invoice: "INV-2041",
      customer: "Budi Santoso",
      method: "Card",
      amount: "$120.00",
    },
    {
      date: "Nov 1",
      invoice: "INV-2042",
      customer: "Siti Aminah",
      method: "Transfer",
      amount: "$86.50",
    },
    {
      date: "Nov 2",
      invoice: "INV-2043",
      customer: "Agus Pratama",
      method: "Card",
      amount: "$42.00",
    },
    {
      date: "Nov 3",
      invoice: "INV-2044",
      customer: "Dewi Lestari",
      method: "Wallet",
      amount: "$310.00",
    },
    {
      date: "Nov 4",
      invoice: "INV-2045",
      customer: "Rani Wulandari",
      method: "Transfer",
      amount: "$58.25",
    },
    {
      date: "Nov 4",
      invoice: "INV-2046",
      customer: "Joko Widodo",
      method: "Card",
      amount: "$19.90",
    },
  ];
</script>

<Table
  caption="Recent transactions"
  {columns}
  {rows}
  bordered
  square
  size="sm"
/>
