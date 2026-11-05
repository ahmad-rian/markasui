<x-markas.table
    caption="Team members"
    show-caption
    :columns="[
        ['key' => 'name', 'label' => 'Name'],
        ['key' => 'role', 'label' => 'Role'],
        ['key' => 'joined', 'label' => 'Joined'],
    ]"
    :rows="[
        ['name' => 'Sarah Miller', 'role' => 'Owner', 'joined' => 'Jan 12, 2025'],
        ['name' => 'Budi Santoso', 'role' => 'Editor', 'joined' => 'Mar 3, 2025'],
        ['name' => 'Siti Aminah', 'role' => 'Viewer', 'joined' => 'Aug 21, 2025'],
    ]"
/>
