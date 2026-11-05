<x-markas.table
    caption="Team members"
    striped
    :columns="[
        ['key' => 'name', 'label' => 'Name'],
        ['key' => 'role', 'label' => 'Role'],
        ['key' => 'location', 'label' => 'Location'],
    ]"
    :rows="[
        ['name' => 'Rani Wulandari', 'role' => 'Designer', 'location' => 'Jakarta'],
        ['name' => 'Budi Santoso', 'role' => 'Engineer', 'location' => 'Bandung'],
        ['name' => 'Siti Aminah', 'role' => 'Product manager', 'location' => 'Surabaya'],
        ['name' => 'Agus Pratama', 'role' => 'Engineer', 'location' => 'Yogyakarta'],
        ['name' => 'Dewi Lestari', 'role' => 'Support', 'location' => 'Denpasar'],
    ]"
/>
