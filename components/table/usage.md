## Blade

```blade
<x-markas.table
    caption="Recent orders"
    :columns="[
        ['key' => 'code', 'label' => 'Order'],
        ['key' => 'customer', 'label' => 'Customer'],
        ['key' => 'total', 'label' => 'Total', 'align' => 'right'],
    ]"
    :rows="$orders->map(fn ($o) => ['code' => $o->code, 'customer' => $o->customer, 'total' => $o->total_label])->all()"
/>
```

## React

```tsx
import { Table } from "@/components/markas/Table";

<Table
  caption="Recent orders"
  columns={[
    { key: "code", label: "Order" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" },
  ]}
  rows={orders}
  renderCell={(row, key) =>
    key === "status" ? <Badge>{row.status}</Badge> : undefined
  }
/>;
```

## Vue

```vue
<template>
  <Table
    caption="Recent orders"
    :columns="[
      { key: 'code', label: 'Order' },
      { key: 'status', label: 'Status' },
      { key: 'total', label: 'Total', align: 'right' },
    ]"
    :rows="orders"
  >
    <template #cell-status="{ row }">
      <Badge>{{ row.status }}</Badge>
    </template>
  </Table>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import Badge from "$lib/components/markas/Badge.svelte";
  import Table, { type TableRow } from "$lib/components/markas/Table.svelte";

  const columns = [
    { key: "code", label: "Order" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" as const },
  ];
</script>

{#snippet status(row: TableRow)}
  <Badge>{row.status}</Badge>
{/snippet}

<Table caption="Recent orders" {columns} rows={orders} cells={{ status }} />
```

`cells` maps a column key to a snippet that receives the row. Other columns show the plain value.

## Astro

```astro
---
import Badge from "@/components/markas/Badge.astro";
import Table, { type TableRow } from "@/components/markas/Table.astro";
---

<Table caption="Recent orders" columns={columns} rows={orders}>
  {
    (row: TableRow, key: string) =>
      key === "status" && <Badge>{row.status}</Badge>
  }
</Table>
```

The function child runs for every cell. Return nothing to keep the plain value.

## Angular

```ts
import { Component } from "@angular/core";
import { Badge } from "./markas/badge.component";
import { Table, type TableColumn } from "./markas/table.component";

@Component({
  selector: "app-orders",
  imports: [Badge, Table],
  template: `
    <div
      markas-table
      caption="Recent orders"
      [columns]="columns"
      [rows]="orders"
      [cells]="{ status: statusCell }"
    ></div>
    <ng-template #statusCell let-row>
      <span markas-badge>{{ row.status }}</span>
    </ng-template>
  `,
})
export class Orders {
  columns: TableColumn[] = [
    { key: "code", label: "Order" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" },
  ];
  orders = [{ code: "INV-1024", status: "Paid", total: "$250.00" }];
}
```

`cells` maps a column key to an `ng-template` that receives the row as `let-row`.

## Notes

- Blade only shows escaped text values. For cells with other components, write the table by hand with the same classes, or prepare the string in the controller.
- A `renderCell` that returns `undefined` falls back to the plain text value, so only handle the columns that need it.
- Add `show-caption` (Blade, Vue) or `showCaption` (React) to show the caption above the table.
- Cells do not wrap (`whitespace-nowrap`). On narrow screens the table scrolls horizontally inside its wrapper.
- Set `rowKey` (React and Vue, such as `rowKey="id"`) to a field with a unique id per row when rows can be sorted, filtered, or removed. Without `rowKey`, the key is the row index. Blade does not need it.
- The region is named by `label`, then `caption`, then "Table". Set `label` or `caption` in your site's language.
- Add `bordered` for a classic grid with lines around every cell, `striped` for alternating row backgrounds, and `size="sm"` for tighter padding with 13px text in dense tables.
- Pass totals through `footer`, an object (a PHP array in Blade) keyed by column, such as `:footer="['item' => 'Total', 'value' => '$4,578.00']"` in Blade or `footer={{ item: "Total", value: "$4,578.00" }}` in React. It renders one row in `tfoot` with the same alignment as each column.
