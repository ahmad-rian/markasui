<x-markas.context-menu
    :items="[
        ['label' => 'Open', 'value' => 'open'],
        ['label' => 'Rename', 'value' => 'rename'],
        ['label' => 'Duplicate', 'value' => 'duplicate'],
        ['label' => 'Archive', 'value' => 'archive', 'disabled' => true],
        ['separator' => true],
        ['label' => 'Delete', 'value' => 'delete', 'danger' => true],
    ]"
>
    <div class="flex h-36 items-center justify-center rounded-lg border border-dashed border-line text-sm text-muted">Right-click here</div>
</x-markas.context-menu>
