<x-markas.table
    caption="Recent orders"
    :columns="[
        ['key' => 'code', 'label' => 'Order'],
        ['key' => 'customer', 'label' => 'Customer'],
        ['key' => 'status', 'label' => 'Status'],
        ['key' => 'total', 'label' => 'Total', 'align' => 'right'],
    ]"
    :rows="[
        ['code' => 'INV-1024', 'customer' => 'Budi Santoso', 'status' => 'Paid', 'total' => '$250.00'],
        ['code' => 'INV-1025', 'customer' => 'Siti Aminah', 'status' => 'Pending', 'total' => '$85.00'],
        ['code' => 'INV-1026', 'customer' => 'Dewi Lestari', 'status' => 'Shipped', 'total' => '$1,200.00'],
    ]"
/>
