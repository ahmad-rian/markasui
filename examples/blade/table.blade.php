<x-markas.table
    caption="Daftar pesanan terbaru"
    :columns="[
        ['key' => 'kode', 'label' => 'Pesanan'],
        ['key' => 'pelanggan', 'label' => 'Pelanggan'],
        ['key' => 'status', 'label' => 'Status'],
        ['key' => 'total', 'label' => 'Total', 'align' => 'right'],
    ]"
    :rows="[
        ['kode' => 'INV-1024', 'pelanggan' => 'Budi Santoso', 'status' => 'Dibayar', 'total' => 'Rp250.000'],
        ['kode' => 'INV-1025', 'pelanggan' => 'Siti Aminah', 'status' => 'Menunggu', 'total' => 'Rp85.000'],
        ['kode' => 'INV-1026', 'pelanggan' => 'Dewi Lestari', 'status' => 'Dikirim', 'total' => 'Rp1.200.000'],
    ]"
/>
