<div class="flex justify-center">
    <x-markas.dropdown-menu
        label="Project"
        :items="[
            ['label' => 'Rename', 'value' => 'rename'],
            ['label' => 'Transfer ownership', 'value' => 'transfer'],
            ['separator' => true],
            ['label' => 'Archive project', 'value' => 'archive', 'danger' => true],
            ['label' => 'Delete project', 'value' => 'delete', 'danger' => true],
        ]"
    />
</div>
