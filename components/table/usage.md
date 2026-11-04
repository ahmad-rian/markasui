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

## Notes

- Blade only shows escaped text values. For cells with other components, write the table by hand with the same classes, or prepare the string in the controller.
- A `renderCell` that returns `undefined` falls back to the plain text value, so only handle the columns that need it.
- Add `show-caption` (Blade, Vue) or `showCaption` (React) to show the caption above the table.
- Cells do not wrap (`whitespace-nowrap`). On narrow screens the table scrolls horizontally inside its wrapper.
- Set `rowKey` (React and Vue, such as `rowKey="id"`) to a field with a unique id per row when rows can be sorted, filtered, or removed. Without `rowKey`, the key is the row index. Blade does not need it.
- The region is named by `label`, then `caption`, then "Table". Set `label` or `caption` in your site's language.
