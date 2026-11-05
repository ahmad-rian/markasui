<x-markas.menubar
    label="Project"
    :menus="[
        ['label' => 'Project', 'items' => [
            ['label' => 'Rename', 'value' => 'rename'],
            ['label' => 'Duplicate', 'value' => 'duplicate'],
            ['label' => 'Archive', 'value' => 'archive', 'disabled' => true],
            ['separator' => true],
            ['label' => 'Delete project', 'value' => 'delete', 'danger' => true],
        ]],
        ['label' => 'Members', 'items' => [
            ['label' => 'Invite people', 'value' => 'invite'],
            ['label' => 'Manage roles', 'value' => 'roles'],
            ['separator' => true],
            ['label' => 'Remove all guests', 'value' => 'remove-guests', 'danger' => true],
        ]],
        ['label' => 'Billing', 'items' => [
            ['label' => 'View invoices', 'value' => 'invoices'],
            ['label' => 'Change plan', 'value' => 'plan', 'disabled' => true],
        ]],
    ]"
/>
