<div class="flex flex-wrap items-center justify-center gap-2">
    <x-markas.dropdown-menu
        label="Sort"
        :items="[
            ['label' => 'Newest first', 'value' => 'newest'],
            ['label' => 'Oldest first', 'value' => 'oldest'],
            ['label' => 'Name A to Z', 'value' => 'name'],
        ]"
    />
    <x-markas.dropdown-menu
        label="Export"
        :items="[
            ['label' => 'CSV', 'value' => 'csv'],
            ['label' => 'PDF', 'value' => 'pdf'],
            ['label' => 'Excel', 'value' => 'xlsx', 'disabled' => true],
        ]"
    />
</div>
