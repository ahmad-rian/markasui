## Blade

```blade
<x-markas.table
    caption="Daftar pesanan terbaru"
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

## Catatan

- Blade hanya menampilkan nilai teks yang di-escape. Untuk sel berisi komponen lain, tulis tabel langsung memakai class yang sama, atau siapkan string di controller.
- `renderCell` yang mengembalikan `undefined` memakai nilai teks bawaan, jadi cukup tangani kolom yang perlu diubah.
- Tambahkan `show-caption` (Blade, Vue) atau `showCaption` (React) untuk menampilkan caption di atas tabel.
- Sel tidak memotong baris (`whitespace-nowrap`). Di layar sempit tabel digulir horizontal di dalam pembungkusnya.
- Isi `rowKey` (React dan Vue, misalnya `rowKey="id"`) dengan nama field berisi id unik per baris saat baris bisa diurutkan, disaring, atau dihapus. Tanpa `rowKey`, key memakai indeks baris. Blade tidak membutuhkannya.
