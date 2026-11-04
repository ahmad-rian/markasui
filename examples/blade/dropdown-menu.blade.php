<x-markas.dropdown-menu
    label="Actions"
    :items="[
        ['label' => 'Edit', 'value' => 'edit'],
        ['label' => 'Duplicate', 'value' => 'duplicate'],
        ['label' => 'Archive', 'value' => 'archive', 'disabled' => true],
        ['separator' => true],
        ['label' => 'Delete', 'value' => 'delete', 'danger' => true],
    ]"
/>
