## Blade

```blade
<x-markas.table
    caption="Daftar pesanan terbaru"
    label="Tabel pesanan"
    :columns="[
        ['key' => 'kode', 'label' => 'Pesanan'],
        ['key' => 'pelanggan', 'label' => 'Pelanggan'],
        ['key' => 'total', 'label' => 'Total', 'align' => 'right'],
    ]"
    :rows="$orders->map(fn ($o) => ['kode' => $o->code, 'pelanggan' => $o->customer, 'total' => $o->total_label])->all()"
/>
```

## React

```tsx
import { Table } from "@/components/markas/Table";

<Table
  caption="Daftar pesanan terbaru"
  label="Tabel pesanan"
  columns={[
    { key: "kode", label: "Pesanan" },
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
    caption="Daftar pesanan terbaru"
    label="Tabel pesanan"
    :columns="[
      { key: 'kode', label: 'Pesanan' },
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

`cells` memetakan key kolom ke snippet yang menerima baris. Kolom lain menampilkan nilai teks.

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

Function child dijalankan untuk setiap sel. Kembalikan kosong untuk memakai nilai teks.

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

`cells` memetakan key kolom ke `ng-template` yang menerima baris sebagai `let-row`.

## Catatan

- Blade hanya menampilkan nilai teks yang di-escape. Untuk sel berisi komponen lain, tulis tabel langsung memakai class yang sama, atau siapkan string di controller.
- `renderCell` yang mengembalikan `undefined` memakai nilai teks bawaan, jadi cukup tangani kolom yang perlu diubah.
- Tambahkan `show-caption` (Blade, Vue) atau `showCaption` (React) untuk menampilkan caption di atas tabel.
- Sel tidak memotong baris (`whitespace-nowrap`). Di layar sempit tabel digulir horizontal di dalam pembungkusnya.
- Isi `rowKey` (React dan Vue, misalnya `rowKey="id"`) dengan nama field berisi id unik per baris saat baris bisa diurutkan, disaring, atau dihapus. Tanpa `rowKey`, key memakai indeks baris. Blade tidak membutuhkannya.
- Nama region diambil dari `label`, lalu `caption`, lalu "Table" (default bahasa Inggris). Isi `label` atau `caption` dalam Bahasa Indonesia, misalnya `label="Tabel pesanan"`.
- Tambahkan `bordered` untuk grid kotak dengan garis di setiap sel, `striped` untuk latar baris selang-seling, dan `size="sm"` untuk padding lebih rapat dengan teks 13px di tabel padat.
- Kirim baris total lewat `footer`, objek (array PHP di Blade) dengan key per kolom, misalnya `:footer="['item' => 'Total', 'value' => '$4,578.00']"` di Blade atau `footer={{ item: "Total", value: "$4,578.00" }}` di React. Hasilnya satu baris di `tfoot` dengan perataan sama seperti kolomnya.
