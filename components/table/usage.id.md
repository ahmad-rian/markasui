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

## Catatan

- Blade hanya menampilkan nilai teks yang di-escape. Untuk sel berisi komponen lain, tulis tabel langsung memakai class yang sama, atau siapkan string di controller.
- `renderCell` yang mengembalikan `undefined` memakai nilai teks bawaan, jadi cukup tangani kolom yang perlu diubah.
- Tambahkan `show-caption` (Blade, Vue) atau `showCaption` (React) untuk menampilkan caption di atas tabel.
- Sel tidak memotong baris (`whitespace-nowrap`). Di layar sempit tabel digulir horizontal di dalam pembungkusnya.
- Isi `rowKey` (React dan Vue, misalnya `rowKey="id"`) dengan nama field berisi id unik per baris saat baris bisa diurutkan, disaring, atau dihapus. Tanpa `rowKey`, key memakai indeks baris. Blade tidak membutuhkannya.
- Nama region diambil dari `label`, lalu `caption`, lalu "Table" (default bahasa Inggris). Isi `label` atau `caption` dalam Bahasa Indonesia, misalnya `label="Tabel pesanan"`.
- Tambahkan `bordered` untuk grid kotak dengan garis di setiap sel, `striped` untuk latar baris selang-seling, dan `size="sm"` untuk padding lebih rapat dengan teks 13px di tabel padat.
- Kirim baris total lewat `footer`, objek (array PHP di Blade) dengan key per kolom, misalnya `:footer="['item' => 'Total', 'value' => '$4,578.00']"` di Blade atau `footer={{ item: "Total", value: "$4,578.00" }}` di React. Hasilnya satu baris di `tfoot` dengan perataan sama seperti kolomnya.
